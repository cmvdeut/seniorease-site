import { NextRequest, NextResponse } from 'next/server';

// Stripe webhook endpoint voor automatische licentie activering
// Configureer deze URL in Stripe Dashboard → Webhooks
// https://jouw-domein.nl/api/stripe-webhook

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'No signature' },
        { status: 400 }
      );
    }

    // In productie: verifieer de signature met Stripe
    // const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
    
    // Voor nu: parse de event (zonder verificatie in development)
    let event;
    try {
      event = JSON.parse(body);
    } catch (e) {
      return NextResponse.json(
        { error: 'Invalid JSON' },
        { status: 400 }
      );
    }

    // Handle checkout.session.completed event
    if (event.type === 'checkout.session.completed' || event.type === 'payment_intent.succeeded') {
      const session = event.data.object;
      const customerEmail = session.customer_email || session.customer_details?.email;
      const clientReferenceId = session.client_reference_id;

      // TODO: Hier zou je normaal gesproken de licentie activeren in een database
      // Voor nu loggen we alleen
      console.log('Payment successful:', {
        email: customerEmail || clientReferenceId,
        amount: session.amount_total,
        currency: session.currency
      });

      // In productie: Sla licentie op in database en stuur bevestigingsmail
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}

