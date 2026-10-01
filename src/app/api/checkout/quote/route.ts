import { NextRequest, NextResponse } from 'next/server';
import { calculateOrderQuote } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, lga } = body;

    if (!Array.isArray(items)) {
      return NextResponse.json(
        { error: 'Invalid items array' },
        { status: 400 }
      );
    }

    const quote = await calculateOrderQuote(items, lga);
    return NextResponse.json(quote);
  } catch (error: any) {
    console.error('Error calculating quote:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to calculate quote' },
      { status: 500 }
    );
  }
}
