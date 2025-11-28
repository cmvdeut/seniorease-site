import { NextRequest, NextResponse } from 'next/server';

// Email configuratie
const RECIPIENT_EMAIL = process.env.POLL_NOTIFICATION_EMAIL || 'info@seniorease.nl';
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@seniorease.nl';

// Helper functie om email te versturen via Resend API
async function sendEmailNotification(data: {
  selected: string[];
  suggestions: Record<string, string>;
  other: string;
  timestamp: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    console.warn('⚠️ RESEND_API_KEY niet gevonden. Email wordt niet verstuurd.');
    return false;
  }

  // Maak email body
  const optionLabels: Record<string, string> = {
    'bibliotheek': '📚 Bibliotheek tips & tricks',
    'video': '🎬 Nieuwe video tutorials',
    'tech': '💡 Handige technologie tips',
    'app': '📱 App updates & features',
    'faq': '❓ Veelgestelde vragen',
    'website': '🎨 Website verbeteringen',
  };

  let emailBody = `
<h2>📊 Nieuwe Poll Feedback - SeniorEase</h2>

<p><strong>Tijdstip:</strong> ${new Date(data.timestamp).toLocaleString('nl-NL')}</p>

<h3>Geselecteerde Onderwerpen:</h3>
<ul>
${data.selected.map(id => `<li>${optionLabels[id] || id}</li>`).join('')}
</ul>

`;

  // Voeg suggesties toe
  if (Object.keys(data.suggestions).length > 0) {
    emailBody += `<h3>Suggesties:</h3><ul>`;
    data.selected.forEach(id => {
      if (data.suggestions[id]) {
        emailBody += `<li><strong>${optionLabels[id] || id}:</strong><br>${data.suggestions[id]}</li>`;
      }
    });
    emailBody += `</ul>`;
  }

  // Voeg andere onderwerpen toe
  if (data.other.trim()) {
    emailBody += `<h3>Andere Onderwerpen:</h3><p>${data.other}</p>`;
  }

  try {
    console.log('📧 Versturen email naar:', RECIPIENT_EMAIL);
    console.log('📧 Van:', FROM_EMAIL);
    console.log('📧 API Key aanwezig:', apiKey ? 'Ja' : 'Nee');
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: RECIPIENT_EMAIL,
        subject: '📊 Nieuwe Poll Feedback - SeniorEase',
        html: emailBody,
      }),
    });

    const responseData = await response.json();
    
    if (!response.ok) {
      console.error('❌ Resend API error:', response.status, responseData);
      return { success: false, error: responseData };
    }

    console.log('✅ Email verstuurd! ID:', responseData.id);
    return { success: true, emailId: responseData.id };
  } catch (error: any) {
    console.error('❌ Error sending email:', error.message || error);
    return { success: false, error: error.message || 'Unknown error' };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { selected, suggestions, other, timestamp } = body;

    // Log de resultaten
    console.log('📊 Poll Resultaten Ontvangen:');
    console.log('Geselecteerde onderwerpen:', selected);
    console.log('Suggesties:', suggestions);
    console.log('Andere onderwerpen:', other);
    console.log('Tijdstip:', timestamp);

    // Stuur email notificatie
    const emailResult = await sendEmailNotification({
      selected,
      suggestions,
      other,
      timestamp,
    });

    if (emailResult.success) {
      console.log('✅ Email notificatie verstuurd! ID:', emailResult.emailId);
    } else {
      console.error('❌ Email notificatie mislukt:', emailResult.error);
      // Log maar ga door - poll submission is succesvol
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Bedankt voor uw feedback!' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing poll submission:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Er ging iets mis. Probeer het later opnieuw.' 
      },
      { status: 500 }
    );
  }
}

