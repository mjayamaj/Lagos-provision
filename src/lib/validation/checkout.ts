import { z } from 'zod';
import { LAGOS_LGAS, normalizeNigerianPhone } from '@/config/delivery';

export const checkoutFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name cannot exceed 100 characters'),
  phone: z
    .string()
    .trim()
    .refine(
      (val) => {
        const norm = normalizeNigerianPhone(val);
        return norm.isValid;
      },
      {
        message: 'Please enter a valid 10-digit Nigerian phone number (e.g. +234 801 234 5678 or 08012345678)',
      }
    ),
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address for your order confirmation'),
  street: z
    .string()
    .trim()
    .min(5, 'Please enter your street address and house number')
    .max(150, 'Street address is too long'),
  lga: z
    .string()
    .refine((val) => (LAGOS_LGAS as readonly string[]).includes(val), {
      message: 'Please select a valid Lagos Local Government Area (LGA)',
    }),
  neighbourhood: z
    .string()
    .trim()
    .min(2, 'Please enter your city / neighbourhood (e.g. Ikeja, Lekki, Yaba)')
    .max(80, 'Neighbourhood is too long'),
  landmark: z
    .string()
    .trim()
    .max(120, 'Landmark cannot exceed 120 characters')
    .optional()
    .or(z.literal('')),
  instructions: z
    .string()
    .trim()
    .max(200, 'Delivery instructions cannot exceed 200 characters')
    .optional()
    .or(z.literal('')),
  paymentMethod: z
    .literal('cod')
    .default('cod'),
});

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;

export const placeOrderApiSchema = z.object({
  customerName: z.string().min(2),
  customerPhone: z.string().min(10),
  customerEmail: z.string().email(),
  shippingStreet: z.string().min(5),
  shippingLga: z.string(),
  shippingNeighbourhood: z.string().min(2),
  shippingLandmark: z.string().optional().nullable(),
  deliveryInstructions: z.string().max(200).optional().nullable(),
  items: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number().int().min(1).max(99),
      })
    )
    .min(1, 'At least one item is required in cart'),
  idempotencyKey: z.string().optional(),
});
