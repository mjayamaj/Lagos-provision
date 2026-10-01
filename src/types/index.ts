export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  image_url?: string;
  sort_order: number;
  is_active: boolean;
  item_count?: number;
}

export interface Product {
  id: string;
  category_id: string;
  category_slug?: string;
  name: string;
  slug: string;
  description: string;
  descriptor: string; // e.g., "Premium Long Grain"
  size_label: string; // e.g., "10kg"
  price_kobo: number; // Stored in integer kobo (100 kobo = ₦1)
  image_url: string;
  brand?: string;
  unit?: string; // e.g., 'kg', 'L', 'pack'
  is_featured: boolean;
  is_best_seller: boolean;
  is_perishable: boolean;
  price_is_placeholder: boolean;
  tags: string[];
  sort_order: number;
  stock_qty: number;
  is_active: boolean;
  created_at?: string;
}

export interface CartItem {
  product_id: string;
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  subtotal_kobo: number;
  delivery_fee_kobo: number;
  total_kobo: number;
}

export interface Address {
  id?: string;
  user_id?: string;
  full_name: string;
  phone_e164: string;
  street: string;
  lga: string;
  neighbourhood: string;
  landmark?: string;
  is_default?: boolean;
}

export type OrderStatus =
  | 'confirmed'
  | 'processing'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export type PaymentStatus = 'pending' | 'collected' | 'not_collected';

export type CollectionMethod = 'cash' | 'pos' | 'transfer';

export interface OrderItem {
  id?: string;
  order_id?: string;
  product_id: string;
  name_snapshot: string;
  size_snapshot?: string;
  unit_price_kobo: number;
  quantity: number;
  line_total_kobo: number;
}

export interface Payment {
  id?: string;
  order_id: string;
  amount_due_kobo: number;
  amount_collected_kobo?: number | null;
  collection_method?: CollectionMethod | null;
  status: PaymentStatus;
  collected_at?: string | null;
  created_at?: string;
}

export interface Order {
  id: string;
  order_number: string;
  user_id?: string | null;
  guest_email?: string | null;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  shipping_street: string;
  shipping_lga: string;
  shipping_neighbourhood: string;
  shipping_landmark?: string | null;
  delivery_instructions?: string | null;
  subtotal_kobo: number;
  delivery_fee_kobo: number;
  total_kobo: number;
  payment_method: 'cod'; // Pay on delivery only
  status: OrderStatus;
  items?: OrderItem[];
  payment?: Payment;
  created_at: string;
  updated_at?: string;
}

export interface DeliveryZone {
  id: string;
  lga: string;
  fee_kobo: number;
  is_active: boolean;
}

export interface EmailLog {
  id: string;
  order_id?: string | null;
  to_email: string;
  template: string;
  status: 'sent' | 'failed' | 'queued';
  mailgun_message_id?: string | null;
  error?: string | null;
  attempts: number;
  created_at: string;
}

export interface Profile {
  id: string;
  email: string;
  full_name?: string | null;
  avatar_url?: string | null;
  phone?: string | null;
  created_at: string;
}
