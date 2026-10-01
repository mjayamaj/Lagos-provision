export const LAGOS_LGAS = [
  'Agege',
  'Ajeromi-Ifelodun',
  'Alimosho',
  'Amuwo-Odofin',
  'Apapa',
  'Badagry',
  'Epe',
  'Eti-Osa',
  'Ibeju-Lekki',
  'Ifako-Ijaiye',
  'Ikeja',
  'Ikorodu',
  'Kosofe',
  'Lagos Island',
  'Lagos Mainland',
  'Mushin',
  'Ojo',
  'Oshodi-Isolo',
  'Shomolu',
  'Surulere',
] as const;

export type LagosLGA = (typeof LAGOS_LGAS)[number];

export const DEFAULT_DELIVERY_FEE_KOBO = 200000; // ₦2,000

export const ACCEPTED_DOOR_PAYMENT_METHODS = [
  {
    id: 'cash',
    name: 'Cash',
    instruction: 'Please have the exact amount ready if possible.',
    shortLabel: 'Exact cash ready',
  },
  {
    id: 'pos',
    name: 'POS (debit card terminal)',
    instruction: 'The rider carries a POS terminal. Verve, Mastercard and Visa accepted.',
    shortLabel: 'Verve, Mastercard & Visa',
  },
  {
    id: 'transfer',
    name: 'Bank transfer',
    instruction: 'Transfer to the account details the rider shows you and confirm the alert before the rider leaves.',
    shortLabel: 'Instant door bank transfer',
  },
] as const;

export const BRAND_TAGLINE = 'FRESH GROCERIES. LOCAL GOODNESS.';
export const FOOTER_TAGLINE = 'GOOD FOOD  /  STRONG FAMILIES  /  A GREATER LAGOS';
export const DELIVERY_TIMEFRAME_LABEL = 'Within 24–48 hours across Lagos';

/**
 * Format kobo integer to Nigerian Naira string (e.g. 1850000 -> "₦18,500")
 */
export function formatNaira(kobo: number): string {
  const naira = Math.round(kobo / 100);
  return `₦${naira.toLocaleString('en-NG')}`;
}

/**
 * Normalize Nigerian phone number to E.164 (+234XXXXXXXXXX)
 * Accepts:
 *   - 08012345678 -> +2348012345678
 *   - +2348012345678 -> +2348012345678
 *   - 2348012345678 -> +2348012345678
 *   - +234 801 234 5678 -> +2348012345678
 */
export function normalizeNigerianPhone(input: string): {
  isValid: boolean;
  e164: string;
  formatted: string;
  error?: string;
} {
  if (!input) {
    return { isValid: false, e164: '', formatted: '', error: 'Phone number is required' };
  }

  // Remove spaces, hyphens, parentheses
  const cleaned = input.replace(/[\s\-\(\)]/g, '');

  let digitsAfterPrefix = '';

  if (cleaned.startsWith('+234')) {
    digitsAfterPrefix = cleaned.slice(4);
  } else if (cleaned.startsWith('234')) {
    digitsAfterPrefix = cleaned.slice(3);
  } else if (cleaned.startsWith('0')) {
    digitsAfterPrefix = cleaned.slice(1);
  } else if (cleaned.length === 10 && /^[789]/.test(cleaned)) {
    digitsAfterPrefix = cleaned;
  } else {
    return {
      isValid: false,
      e164: '',
      formatted: input,
      error: 'Please enter a valid Nigerian phone number (e.g. +234 801 234 5678 or 08012345678)',
    };
  }

  // A Nigerian phone number has 10 digits after the country code / leading 0
  if (!/^\d{10}$/.test(digitsAfterPrefix)) {
    return {
      isValid: false,
      e164: '',
      formatted: input,
      error: 'Nigerian phone number must have 10 digits after the prefix',
    };
  }

  const e164 = `+234${digitsAfterPrefix}`;
  // Formatted for display: +234 801 234 5678
  const formatted = `+234 ${digitsAfterPrefix.slice(0, 3)} ${digitsAfterPrefix.slice(3, 6)} ${digitsAfterPrefix.slice(6)}`;

  return {
    isValid: true,
    e164,
    formatted,
  };
}
