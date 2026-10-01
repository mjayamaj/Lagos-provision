async function runTest() {
  const payload = {
    customerName: 'Adeola Johnson',
    customerPhone: '08012345678',
    customerEmail: 'adeola@example.com',
    shippingStreet: '12B, Adekunle Fajuyi Street',
    shippingLga: 'Ikeja',
    shippingNeighbourhood: 'Ikeja GRA',
    shippingLandmark: 'Near Ikeja City Mall',
    deliveryInstructions: 'Please call upon arrival.',
    items: [
      { productId: 'prod-rice-10kg-design', quantity: 1 },
      { productId: 'prod-garri-5kg-design', quantity: 1 },
      { productId: 'prod-tomato-stew-400g-design', quantity: 2 },
      { productId: 'prod-golden-penny-oil-1l-design', quantity: 1 },
      { productId: 'prod-milo-soap-200g-design', quantity: 3 },
    ],
  };

  console.log('--- 1. Testing Quote Endpoint ---');
  const quoteRes = await fetch('http://localhost:3000/api/checkout/quote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items: payload.items, lga: payload.shippingLga }),
  });
  const quoteData = await quoteRes.json();
  console.log('Quote status:', quoteRes.status);
  console.log('Subtotal kobo:', quoteData.subtotal_kobo, '₦' + quoteData.subtotal_kobo / 100);
  console.log('Delivery kobo:', quoteData.delivery_fee_kobo, '₦' + quoteData.delivery_fee_kobo / 100);
  console.log('Total kobo:', quoteData.total_kobo, '₦' + quoteData.total_kobo / 100);

  if (quoteData.total_kobo !== 3640000) {
    throw new Error(`Total mismatch! Expected 3640000, got ${quoteData.total_kobo}`);
  }

  console.log('\n--- 2. Testing Place Order Endpoint ---');
  const orderRes = await fetch('http://localhost:3000/api/checkout/place-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const orderData = await orderRes.json();
  console.log('Order status:', orderRes.status);
  console.log('Order success:', orderData.success);
  console.log('Order Number:', orderData.orderNumber);

  if (!orderData.success || !orderData.orderNumber) {
    throw new Error(`Place order failed: ${JSON.stringify(orderData)}`);
  }

  console.log('\n--- 3. Testing Get Order Endpoint ---');
  const getRes = await fetch(`http://localhost:3000/api/orders/${orderData.orderNumber}`);
  const getData = await getRes.json();
  console.log('Get Order status:', getRes.status);
  console.log('Order customer name:', getData.order.customer_name);
  console.log('Order total kobo:', getData.order.total_kobo);
  console.log('Order payment method:', getData.order.payment_method);
  console.log('Order status:', getData.order.status);
  console.log('Order items count:', getData.order.items.length);

  console.log('\n=== ALL END-TO-END FLOWS VERIFIED SUCCESSFULLY ===');
}

runTest().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});
