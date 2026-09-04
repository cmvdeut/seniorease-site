import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import {
  parseClientReferenceId,
  resolveFulfillmentOrder,
} from '@/lib/lesmateriaal-fulfillment';
import { sendLesmateriaalFulfillmentEmail } from '@/lib/lesmateriaal-fulfillment-email';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/** Best-effort dedupe binnen één serverless instance */
const processedSessions = new Set<string>();

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) throw new Error('STRIPE_SECRET_KEY ontbreekt');
  return new Stripe(key);
}

export async function POST(request: NextRequest) {
  const signature = request.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();

  if (!signature || !webhookSecret) {
    console.error('Stripe webhook: signature of STRIPE_WEBHOOK_SECRET ontbreekt');
    return NextResponse.json({ error: 'Webhook niet geconfigureerd' }, { status: 500 });
  }

  const body = await request.text();
  let event: Stripe.Event;

  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Stripe webhook signature failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const orderId = session.id;

  if (processedSessions.has(orderId)) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  const email =
    session.customer_details?.email?.trim() ||
    session.customer_email?.trim() ||
    undefined;

  let parsed = parseClientReferenceId(session.client_reference_id);
  if (!parsed || !email) {
    console.error('Lesmateriaal fulfillment: geen geldige client_reference_id of e-mail', {
      orderId,
      client_reference_id: session.client_reference_id,
      email,
    });
    // 200 zodat Stripe niet eindeloos retry’t op ongeldige handmatige tests
    return NextResponse.json({ received: true, skipped: 'bad_reference' });
  }
  parsed = { ...parsed, email: email.toLowerCase() };

  const order = resolveFulfillmentOrder(parsed);
  if (!order) {
    console.error('Lesmateriaal fulfillment: geen catalogus-mapping', parsed);
    return NextResponse.json({ received: true, skipped: 'no_assets' });
  }

  try {
    const result = await sendLesmateriaalFulfillmentEmail({ order, orderId });
    if (!result.ok) {
      console.error('Lesmateriaal fulfillment mail error:', result.error);
      return NextResponse.json(
        { error: 'Mail verzenden mislukt', detail: result.error },
        { status: 500 },
      );
    }
    processedSessions.add(orderId);
    console.log('Lesmateriaal fulfillment OK:', {
      orderId,
      email: order.email,
      kind: order.kind,
      files: order.assets.length,
    });
    return NextResponse.json({ received: true, fulfilled: true });
  } catch (err) {
    console.error('Lesmateriaal fulfillment exception:', err);
    return NextResponse.json({ error: 'Fulfillment failed' }, { status: 500 });
  }
}
