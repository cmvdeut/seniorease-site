import { NextRequest, NextResponse } from 'next/server';

// Poll submit endpoint - voor het verzenden van poll resultaten
// Dit endpoint kan gebruikt worden voor polls of formulieren

type EmailResult = 
  | false 
  | { success: boolean; error: any; emailId?: undefined }
  | { success: boolean; emailId: any; error?: undefined };

// Type guard functie
function isEmailResultObject(result: EmailResult): result is Exclude<EmailResult, false> {
  return result !== false && typeof result === 'object';
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Valideer input
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    // TODO: Implementeer poll submit logica hier
    // Voor nu: return success
    console.log('Poll submit received:', body);

    // Voorbeeld email notificatie (als geïmplementeerd)
    // Dit is een placeholder - pas aan naar je eigen email service
    const emailResult: EmailResult = false; // Placeholder - vervang met echte email service
    
    // TypeScript fix: gebruik type guard
    if (isEmailResultObject(emailResult)) {
      if (emailResult.success) {
        console.log('✅ Email notificatie verstuurd! ID:', emailResult.emailId);
      } else {
        console.error('❌ Email notificatie mislukt:', emailResult.error);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Poll submitted successfully'
    });
  } catch (error: any) {
    console.error('Poll submit error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

