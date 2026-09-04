import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import {
  buildDownloadUrl,
  createDownloadToken,
  getSiteBaseUrl,
  parseClientReferenceId,
  resolveAssetAbsolutePath,
  resolveFulfillmentOrder,
  zipBundleAvailable,
  zipBundleLabel,
  zipFileIdForOrder,
} from '@/lib/lesmateriaal-fulfillment';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) return null;
  return new Stripe(key);
}

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get('session_id')?.trim();
  if (!sessionId || !sessionId.startsWith('cs_')) {
    return NextResponse.json({ error: 'Ongeldige session_id' }, { status: 400 });
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: 'Stripe niet geconfigureerd' },
      { status: 503 },
    );
  }

  let session: Stripe.Checkout.Session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch (err) {
    console.error('order-status retrieve failed:', err);
    return NextResponse.json({ error: 'Sessie niet gevonden' }, { status: 404 });
  }

  if (session.payment_status !== 'paid' && session.status !== 'complete') {
    return NextResponse.json({
      status: 'pending',
      message: 'Betaling is nog niet afgerond.',
    });
  }

  const email =
    session.customer_details?.email?.trim()?.toLowerCase() ||
    session.customer_email?.trim()?.toLowerCase() ||
    undefined;

  let parsed = parseClientReferenceId(session.client_reference_id);
  if (parsed && email) {
    parsed = { ...parsed, email };
  }

  if (!parsed || !email) {
    return NextResponse.json({
      status: 'paid',
      email: email ?? null,
      label: 'Uw bestelling',
      message:
        'Betaling ontvangen. De downloadlinks staan in uw e-mail. Controleer ook ongewenste e-mail.',
      downloads: [],
    });
  }

  const order = resolveFulfillmentOrder(parsed);
  if (!order) {
    return NextResponse.json({
      status: 'paid',
      email: parsed.email,
      label: 'Uw bestelling',
      message: 'Betaling ontvangen. Neem contact op als u geen e-mail heeft gekregen.',
      downloads: [],
    });
  }

  const baseUrl = getSiteBaseUrl();
  let downloads: {
    label: string;
    url: string;
    available: boolean;
    primary?: boolean;
  }[] = [];

  try {
    const zipId = zipFileIdForOrder(order);
    if (zipId) {
      const token = createDownloadToken({
        fileId: zipId,
        orderId: session.id,
        email: order.email,
      });
      downloads.push({
        label: zipBundleLabel(zipId),
        url: buildDownloadUrl(baseUrl, token),
        available: zipBundleAvailable(zipId),
        primary: true,
      });
    }

    downloads.push(
      ...order.assets.map((asset) => {
        const token = createDownloadToken({
          fileId: asset.fileId,
          orderId: session.id,
          email: order.email,
        });
        return {
          label: asset.label,
          url: buildDownloadUrl(baseUrl, token),
          available: resolveAssetAbsolutePath(asset) !== null,
        };
      }),
    );
  } catch (err) {
    console.error('order-status token error:', err);
    return NextResponse.json({
      status: 'paid',
      email: order.email,
      label: order.label,
      message:
        'Betaling ontvangen. Downloadlinks staan in uw e-mail (of volgen zo).',
      downloads: [],
    });
  }

  return NextResponse.json({
    status: 'paid',
    email: order.email,
    label: order.label,
    price: order.price,
    kind: order.kind,
    message:
      'Uw betaling is gelukt. U kunt hieronder downloaden; dezelfde links staan in uw e-mail.',
    downloads,
  });
}
