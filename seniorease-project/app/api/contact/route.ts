import { NextRequest, NextResponse } from 'next/server';

// Contact formulier endpoint
// Verzendt contact formulier data en stuurt email notificatie

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Valideer input
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = body;

    // Server-side validatie
    if (!name || !name.trim()) {
      return NextResponse.json(
        { success: false, error: 'Naam is verplicht' },
        { status: 400 }
      );
    }

    if (!email || !email.trim()) {
      return NextResponse.json(
        { success: false, error: 'E-mailadres is verplicht' },
        { status: 400 }
      );
    }

    if (!email.includes('@') || !email.includes('.')) {
      return NextResponse.json(
        { success: false, error: 'Ongeldig e-mailadres' },
        { status: 400 }
      );
    }

    if (!subject || !subject.trim()) {
      return NextResponse.json(
        { success: false, error: 'Onderwerp is verplicht' },
        { status: 400 }
      );
    }

    if (!message || !message.trim() || message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: 'Bericht moet minimaal 10 tekens bevatten' },
        { status: 400 }
      );
    }

    // Log contact formulier (voor nu - later email service toevoegen)
    console.log('📧 Contact formulier ontvangen:', {
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      timestamp: new Date().toISOString(),
    });

    // TODO: Implementeer email verzending hier
    // Opties:
    // 1. Resend API (https://resend.com)
    // 2. SendGrid
    // 3. Nodemailer met SMTP
    // 4. Vercel Email (https://vercel.com/docs/email)
    
    // Voorbeeld met Resend (uncomment en configureer):
    /*
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (RESEND_API_KEY) {
      const resend = new Resend(RESEND_API_KEY);
      
      await resend.emails.send({
        from: 'contact@seniorease.nl',
        to: 'info@seniorease.nl',
        subject: `Contact: ${subject}`,
        html: `
          <h2>Nieuw contact formulier bericht</h2>
          <p><strong>Van:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Onderwerp:</strong> ${subject}</p>
          <p><strong>Bericht:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      });
    }
    */

    // Return success
    return NextResponse.json({
      success: true,
      message: 'Contact formulier verzonden'
    });

  } catch (error: any) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

