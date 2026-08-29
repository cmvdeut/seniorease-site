import { NextResponse } from 'next/server';
import { isLesmateriaalCheckoutEnabled } from '@/lib/lesmateriaal-checkout';

export const dynamic = 'force-dynamic';

/** Alleen booleans — geen Stripe-URL's. Handig om Vercel env-vars te controleren. */
export async function GET() {
  return NextResponse.json({
    pakket: isLesmateriaalCheckoutEnabled('pakket'),
    los: isLesmateriaalCheckoutEnabled('los'),
    compleet: isLesmateriaalCheckoutEnabled('compleet'),
  });
}
