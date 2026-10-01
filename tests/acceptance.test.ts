import { test, describe } from 'node:test';
import assert from 'node:assert';
import { normalizeNigerianPhone, formatNaira, LAGOS_LGAS } from '../src/config/delivery';
import { checkoutFormSchema, placeOrderApiSchema } from '../src/lib/validation/checkout';
import { CATEGORIES, PRODUCTS, SEED_DESIGN_CART_ITEMS } from '../src/data/catalog';
import { calculateOrderQuote, generateOrderNumber } from '../src/lib/db';

describe('1. Acceptance Criteria: Catalog & Categories', () => {
  test('Catalog contains at least 150 products', () => {
    assert.ok(
      PRODUCTS.length >= 150,
      `Expected at least 150 products, got ${PRODUCTS.length}`
    );
  });

  test('All 14 specified Nigerian market categories exist', () => {
    assert.strictEqual(CATEGORIES.length, 14);
    const categorySlugs = CATEGORIES.map((c) => c.slug);
    assert.ok(categorySlugs.includes('rice-beans-grains'));
    assert.ok(categorySlugs.includes('garri-flour-swallow'));
    assert.ok(categorySlugs.includes('pasta-noodles'));
    assert.ok(categorySlugs.includes('oils-fats'));
    assert.ok(categorySlugs.includes('tomatoes-canned-food-sauces'));
    assert.ok(categorySlugs.includes('spices-seasonings'));
    assert.ok(categorySlugs.includes('soup-ingredients-dried-foods'));
    assert.ok(categorySlugs.includes('beverages-drinks'));
    assert.ok(categorySlugs.includes('cereals-breakfast-baby'));
    assert.ok(categorySlugs.includes('snacks-biscuits'));
    assert.ok(categorySlugs.includes('sugar-baking'));
    assert.ok(categorySlugs.includes('household-cleaning'));
    assert.ok(categorySlugs.includes('personal-care'));
    assert.ok(categorySlugs.includes('fresh-produce-eggs-frozen'));
  });

  test('All 20 Lagos Local Government Areas are represented', () => {
    assert.strictEqual(LAGOS_LGAS.length, 20);
    assert.ok(LAGOS_LGAS.includes('Ikeja'));
    assert.ok(LAGOS_LGAS.includes('Eti-Osa'));
    assert.ok(LAGOS_LGAS.includes('Alimosho'));
    assert.ok(LAGOS_LGAS.includes('Surulere'));
  });
});

describe('2. Acceptance Criteria: Design Mock Totals (PRD §5.3 Acceptance Test)', () => {
  test('Seed design items compute exactly Subtotal ₦34,400 + Delivery ₦2,000 = Total ₦36,400', async () => {
    const items = SEED_DESIGN_CART_ITEMS.map((it) => ({
      productId: it.productId,
      quantity: it.quantity,
    }));

    const quote = await calculateOrderQuote(items, 'Ikeja');

    assert.strictEqual(quote.isValid, true);
    // Subtotal: 18,500 (rice) + 7,200 (garri) + 2,400 (stew x2) + 4,800 (oil) + 1,500 (soap x3) = 34,400
    assert.strictEqual(quote.subtotal_kobo, 3440000);
    assert.strictEqual(formatNaira(quote.subtotal_kobo), '₦34,400');

    // Delivery Fee: ₦2,000
    assert.strictEqual(quote.delivery_fee_kobo, 200000);
    assert.strictEqual(formatNaira(quote.delivery_fee_kobo), '₦2,000');

    // Total: ₦36,400
    assert.strictEqual(quote.total_kobo, 3640000);
    assert.strictEqual(formatNaira(quote.total_kobo), '₦36,400');
  });
});

describe('3. Acceptance Criteria: Phone Normalization', () => {
  test('Normalizes 08012345678 to E.164 +2348012345678', () => {
    const result = normalizeNigerianPhone('08012345678');
    assert.strictEqual(result.isValid, true);
    assert.strictEqual(result.e164, '+2348012345678');
  });

  test('Normalizes formatted +234 801 234 5678 to E.164 +2348012345678', () => {
    const result = normalizeNigerianPhone('+234 801 234 5678');
    assert.strictEqual(result.isValid, true);
    assert.strictEqual(result.e164, '+2348012345678');
  });

  test('Rejects invalid phone numbers', () => {
    const tooShort = normalizeNigerianPhone('0801234');
    assert.strictEqual(tooShort.isValid, false);

    const nonNigerian = normalizeNigerianPhone('+15551234567');
    assert.strictEqual(nonNigerian.isValid, false);
  });
});

describe('4. Acceptance Criteria: Zod Validation & Schema', () => {
  test('Valid checkout payload passes schema validation', () => {
    const payload = {
      fullName: 'Adeola Johnson',
      phone: '+234 801 234 5678',
      email: 'adeola@example.com',
      street: '12B, Adekunle Fajuyi Street',
      lga: 'Ikeja',
      neighbourhood: 'Ikeja GRA',
      landmark: 'Near Ikeja City Mall',
      instructions: 'Please call when you reach the gate.',
      paymentMethod: 'cod' as const,
    };

    const res = checkoutFormSchema.safeParse(payload);
    assert.strictEqual(res.success, true);
  });

  test('Enforces Pay on Delivery (paymentMethod = cod only)', () => {
    const payload = {
      fullName: 'Adeola Johnson',
      phone: '+234 801 234 5678',
      email: 'adeola@example.com',
      street: '12B, Adekunle Fajuyi Street',
      lga: 'Ikeja',
      neighbourhood: 'Ikeja GRA',
      paymentMethod: 'card', // Invalid! Only 'cod' is allowed
    };

    const res = checkoutFormSchema.safeParse(payload);
    assert.strictEqual(res.success, false);
  });
});

describe('5. Acceptance Criteria: Order Number Format', () => {
  test('Order number matches LP-2026-XXXXXX pattern', () => {
    const orderNum = generateOrderNumber();
    assert.match(orderNum, /^LP-2026-\d{6}$/);
  });
});
