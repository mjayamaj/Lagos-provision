import { NextRequest, NextResponse } from 'next/server';
import { placeOrderApiSchema } from '@/lib/validation/checkout';
import { normalizeNigerianPhone } from '@/config/delivery';
import { createOrder } from '@/lib/db';
import { sendOrderConfirmationEmail } from '@/lib/email/mailgun';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json();

    // 1. Zod schema validation
    const parsed = placeOrderApiSchema.safeParse(rawBody);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: parsed.error.format(),
        },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // 2. Validate and normalize Nigerian phone
    const phoneNorm = normalizeNigerianPhone(data.customerPhone);
    if (!phoneNorm.isValid) {
      return NextResponse.json(
        {
          success: false,
          error: phoneNorm.error || 'Invalid Nigerian phone number',
        },
        { status: 400 }
      );
    }

    // 3. Create order with authoritative server calculation
    const result = await createOrder({
      customerName: data.customerName,
      customerPhone: phoneNorm.e164,
      customerEmail: data.customerEmail,
      shippingStreet: data.shippingStreet,
      shippingLga: data.shippingLga,
      shippingNeighbourhood: data.shippingNeighbourhood,
      shippingLandmark: data.shippingLandmark || null,
      deliveryInstructions: data.deliveryInstructions || null,
      items: data.items,
    });

    if (!result.success || !result.order) {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to place order' },
        { status: 400 }
      );
    }

    const order = result.order;

    // 4. Send transactional confirmation email via Mailgun (non-blocking)
    try {
      await sendOrderConfirmationEmail(order);
    } catch (emailErr) {
      console.error('Email dispatch error (order created successfully):', emailErr);
    }

    return NextResponse.json({
      success: true,
      orderNumber: order.order_number,
      order,
    });
  } catch (error: any) {
    console.error('Error placing order:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
