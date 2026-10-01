import { NextRequest, NextResponse } from 'next/server';
import { getOrderByNumber } from '@/lib/db';

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ orderNumber: string }> }
) {
  try {
    const { orderNumber } = await props.params;

    if (!orderNumber) {
      return NextResponse.json({ error: 'Order number is required' }, { status: 400 });
    }

    const order = await getOrderByNumber(orderNumber);
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ order });
  } catch (error: any) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
