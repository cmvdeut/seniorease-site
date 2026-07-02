import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Ongeldig verzoek' },
        { status: 400 }
      );
    }

    const email = typeof body.email === 'string' ? body.email.trim() : '';

    if (!email) {
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

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      console.error('BREVO_API_KEY ontbreekt in omgevingsvariabelen');
      return NextResponse.json(
        { success: false, error: 'Nieuwsbrief is tijdelijk niet beschikbaar. Probeer het later opnieuw.' },
        { status: 503 }
      );
    }

    const payload: {
      email: string;
      updateEnabled: boolean;
      listIds?: number[];
    } = {
      email,
      updateEnabled: true,
    };

    const listId = process.env.BREVO_LIST_ID;
    if (listId) {
      const parsedListId = Number.parseInt(listId, 10);
      if (!Number.isNaN(parsedListId)) {
        payload.listIds = [parsedListId];
      }
    }

    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify(payload),
    });

    if (response.status === 201 || response.status === 204) {
      return NextResponse.json({
        success: true,
        message: 'Aanmelding gelukt',
      });
    }

    const data = await response.json().catch(() => null);
    console.error('Brevo API fout:', response.status, data);

    return NextResponse.json(
      { success: false, error: 'Aanmelden mislukt. Controleer uw e-mailadres en probeer het opnieuw.' },
      { status: 502 }
    );
  } catch (error) {
    console.error('Nieuwsbrief API error:', error);
    return NextResponse.json(
      { success: false, error: 'Er ging iets mis. Probeer het later opnieuw.' },
      { status: 500 }
    );
  }
}
