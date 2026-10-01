import { Category, Product, Order, OrderItem, Payment, EmailLog } from '@/types';
import { CATEGORIES, PRODUCTS } from '@/data/catalog';
import { DEFAULT_DELIVERY_FEE_KOBO, LAGOS_LGAS } from '@/config/delivery';
import { getSupabaseAdmin } from '@/lib/supabase/server';

// Local storage cache for orders and logs when running locally or before Supabase is connected
const localOrders = new Map<string, Order>();
const localEmailLogs: EmailLog[] = [];

export interface GetProductsFilter {
  category?: string; // category slug or id
  search?: string;
  brand?: string;
  sort?: 'price_asc' | 'price_desc' | 'name_asc' | 'best_seller';
  featured?: boolean;
  bestSeller?: boolean;
  limit?: number;
  offset?: number;
}

export async function getCategories(): Promise<Category[]> {
  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) {
        return data as Category[];
      }
    } catch {
      // Fallback to local catalog
    }
  }
  return CATEGORIES.filter((c) => c.is_active);
}

export async function getProducts(filter: GetProductsFilter = {}): Promise<{
  products: Product[];
  total: number;
}> {
  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      let query = supabase.from('products').select('*', { count: 'exact' }).eq('is_active', true);

      if (filter.category) {
        // Find category id if slug was passed
        const matchedCat = CATEGORIES.find(
          (c) => c.slug === filter.category || c.id === filter.category
        );
        if (matchedCat) {
          query = query.eq('category_id', matchedCat.id);
        }
      }

      if (filter.search) {
        query = query.ilike('name', `%${filter.search}%`);
      }

      if (filter.brand) {
        query = query.eq('brand', filter.brand);
      }

      if (filter.featured) {
        query = query.eq('is_featured', true);
      }

      if (filter.bestSeller) {
        query = query.eq('is_best_seller', true);
      }

      if (filter.sort === 'price_asc') {
        query = query.order('price_kobo', { ascending: true });
      } else if (filter.sort === 'price_desc') {
        query = query.order('price_kobo', { ascending: false });
      } else if (filter.sort === 'name_asc') {
        query = query.order('name', { ascending: true });
      } else {
        query = query.order('sort_order', { ascending: true });
      }

      const offset = filter.offset || 0;
      const limit = filter.limit || 100;
      query = query.range(offset, offset + limit - 1);

      const { data, error, count } = await query;
      if (!error && data && data.length > 0) {
        return {
          products: data as Product[],
          total: count || data.length,
        };
      }
    } catch {
      // Fallback to local catalog
    }
  }

  // Filter in memory from comprehensive catalog
  let list = PRODUCTS.filter((p) => p.is_active);

  if (filter.category) {
    const matchedCat = CATEGORIES.find(
      (c) => c.slug === filter.category || c.id === filter.category
    );
    if (matchedCat) {
      list = list.filter((p) => p.category_id === matchedCat.id || p.category_slug === matchedCat.slug);
    }
  }

  if (filter.search) {
    const q = filter.search.toLowerCase().trim();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.descriptor.toLowerCase().includes(q) ||
        (p.brand && p.brand.toLowerCase().includes(q)) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  if (filter.brand) {
    list = list.filter((p) => p.brand === filter.brand);
  }

  if (filter.featured) {
    list = list.filter((p) => p.is_featured);
  }

  if (filter.bestSeller) {
    list = list.filter((p) => p.is_best_seller);
  }

  if (filter.sort === 'price_asc') {
    list.sort((a, b) => a.price_kobo - b.price_kobo);
  } else if (filter.sort === 'price_desc') {
    list.sort((a, b) => b.price_kobo - a.price_kobo);
  } else if (filter.sort === 'name_asc') {
    list.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    list.sort((a, b) => a.sort_order - b.sort_order);
  }

  const total = list.length;
  const offset = filter.offset || 0;
  const limit = filter.limit !== undefined ? filter.limit : list.length;
  const products = list.slice(offset, offset + limit);

  return { products, total };
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .single();
      if (!error && data) {
        return data as Product;
      }
    } catch {
      // Fallback
    }
  }
  return PRODUCTS.find((p) => p.slug === slug && p.is_active) || null;
}

export async function getProductById(id: string): Promise<Product | null> {
  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
      if (!error && data) {
        return data as Product;
      }
    } catch {
      // Fallback
    }
  }
  return PRODUCTS.find((p) => p.id === id) || null;
}

/**
 * Server-side calculate accurate totals
 * Never trust client prices
 */
export async function calculateOrderQuote(
  items: Array<{ productId: string; quantity: number }>,
  lga?: string
): Promise<{
  isValid: boolean;
  error?: string;
  items: Array<{
    product: Product;
    quantity: number;
    unit_price_kobo: number;
    line_total_kobo: number;
  }>;
  subtotal_kobo: number;
  delivery_fee_kobo: number;
  total_kobo: number;
}> {
  if (!items || items.length === 0) {
    return {
      isValid: false,
      error: 'Your cart is empty',
      items: [],
      subtotal_kobo: 0,
      delivery_fee_kobo: 0,
      total_kobo: 0,
    };
  }

  const resolvedItems = [];
  let subtotal_kobo = 0;

  for (const item of items) {
    const product = await getProductById(item.productId);
    if (!product) {
      return {
        isValid: false,
        error: `Product with ID "${item.productId}" was not found`,
        items: [],
        subtotal_kobo: 0,
        delivery_fee_kobo: 0,
        total_kobo: 0,
      };
    }

    if (!product.is_active) {
      return {
        isValid: false,
        error: `"${product.name}" is currently unavailable`,
        items: [],
        subtotal_kobo: 0,
        delivery_fee_kobo: 0,
        total_kobo: 0,
      };
    }

    const quantity = Math.max(1, Math.min(99, item.quantity));
    const line_total_kobo = product.price_kobo * quantity;
    subtotal_kobo += line_total_kobo;

    resolvedItems.push({
      product,
      quantity,
      unit_price_kobo: product.price_kobo,
      line_total_kobo,
    });
  }

  // Delivery fee is flat ₦2,000 for Lagos LGAs
  const delivery_fee_kobo = DEFAULT_DELIVERY_FEE_KOBO;
  const total_kobo = subtotal_kobo + delivery_fee_kobo;

  return {
    isValid: true,
    items: resolvedItems,
    subtotal_kobo,
    delivery_fee_kobo,
    total_kobo,
  };
}

export function generateOrderNumber(): string {
  const randomSuffix = Math.floor(100000 + Math.random() * 900000);
  return `LP-2026-${randomSuffix}`;
}

export interface CreateOrderParams {
  orderNumber?: string;
  userId?: string | null;
  guestEmail?: string | null;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  shippingStreet: string;
  shippingLga: string;
  shippingNeighbourhood: string;
  shippingLandmark?: string | null;
  deliveryInstructions?: string | null;
  items: Array<{ productId: string; quantity: number }>;
}

export async function createOrder(params: CreateOrderParams): Promise<{
  success: boolean;
  order?: Order;
  error?: string;
}> {
  // 1. Calculate authoritative quote
  const quote = await calculateOrderQuote(params.items, params.shippingLga);
  if (!quote.isValid || quote.items.length === 0) {
    return { success: false, error: quote.error || 'Invalid order items' };
  }

  const orderNumber = params.orderNumber || generateOrderNumber();
  const orderId = `ord-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const orderItems: OrderItem[] = quote.items.map((it, idx) => ({
    id: `item-${Date.now()}-${idx}`,
    order_id: orderId,
    product_id: it.product.id,
    name_snapshot: it.product.name,
    size_snapshot: it.product.size_label,
    unit_price_kobo: it.unit_price_kobo,
    quantity: it.quantity,
    line_total_kobo: it.line_total_kobo,
  }));

  const payment: Payment = {
    id: `pay-${Date.now()}`,
    order_id: orderId,
    amount_due_kobo: quote.total_kobo,
    amount_collected_kobo: null,
    collection_method: null,
    status: 'pending',
    collected_at: null,
    created_at: new Date().toISOString(),
  };

  const newOrder: Order = {
    id: orderId,
    order_number: orderNumber,
    user_id: params.userId || null,
    guest_email: params.guestEmail || params.customerEmail,
    customer_name: params.customerName,
    customer_phone: params.customerPhone,
    customer_email: params.customerEmail,
    shipping_street: params.shippingStreet,
    shipping_lga: params.shippingLga,
    shipping_neighbourhood: params.shippingNeighbourhood,
    shipping_landmark: params.shippingLandmark || null,
    delivery_instructions: params.deliveryInstructions || null,
    subtotal_kobo: quote.subtotal_kobo,
    delivery_fee_kobo: quote.delivery_fee_kobo,
    total_kobo: quote.total_kobo,
    payment_method: 'cod',
    status: 'confirmed',
    items: orderItems,
    payment,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  // Try saving to Supabase if configured
  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      const { data: dbOrder, error: orderErr } = await supabase
        .from('orders')
        .insert({
          order_number: orderNumber,
          user_id: params.userId || null,
          guest_email: params.guestEmail || params.customerEmail,
          customer_name: params.customerName,
          customer_phone: params.customerPhone,
          customer_email: params.customerEmail,
          shipping_street: params.shippingStreet,
          shipping_lga: params.shippingLga,
          shipping_neighbourhood: params.shippingNeighbourhood,
          shipping_landmark: params.shippingLandmark || null,
          delivery_instructions: params.deliveryInstructions || null,
          subtotal_kobo: quote.subtotal_kobo,
          delivery_fee_kobo: quote.delivery_fee_kobo,
          total_kobo: quote.total_kobo,
          payment_method: 'cod',
          status: 'confirmed',
        })
        .select()
        .single();

      if (!orderErr && dbOrder) {
        const actualOrderId = dbOrder.id;

        // Insert items
        await supabase.from('order_items').insert(
          quote.items.map((it) => ({
            order_id: actualOrderId,
            product_id: it.product.id,
            name_snapshot: it.product.name,
            size_snapshot: it.product.size_label,
            unit_price_kobo: it.unit_price_kobo,
            quantity: it.quantity,
            line_total_kobo: it.line_total_kobo,
          }))
        );

        // Insert payment
        await supabase.from('payments').insert({
          order_id: actualOrderId,
          amount_due_kobo: quote.total_kobo,
          status: 'pending',
        });

        newOrder.id = actualOrderId;
      }
    } catch (e) {
      console.error('Supabase write error, persisting locally:', e);
    }
  }

  // Always store in memory cache as well
  localOrders.set(orderNumber, newOrder);
  localOrders.set(newOrder.id, newOrder);

  return { success: true, order: newOrder };
}

export async function getOrderByNumber(orderNumber: string): Promise<Order | null> {
  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      const { data: orderData, error } = await supabase
        .from('orders')
        .select('*, order_items(*), payments(*)')
        .eq('order_number', orderNumber)
        .single();

      if (!error && orderData) {
        return {
          ...orderData,
          items: orderData.order_items,
          payment: orderData.payments?.[0] || orderData.payments,
        } as Order;
      }
    } catch {
      // Fallback to local
    }
  }

  return localOrders.get(orderNumber) || null;
}

export async function getUserOrders(userId: string): Promise<Order[]> {
  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*), payments(*)')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (!error && data) {
        return data as Order[];
      }
    } catch {
      // Fallback
    }
  }

  return Array.from(localOrders.values()).filter((o) => o.user_id === userId);
}

export async function logEmail(log: Omit<EmailLog, 'id' | 'created_at'>): Promise<void> {
  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      await supabase.from('email_logs').insert({
        order_id: log.order_id || null,
        to_email: log.to_email,
        template: log.template,
        status: log.status,
        mailgun_message_id: log.mailgun_message_id || null,
        error: log.error || null,
        attempts: log.attempts || 1,
      });
    } catch (e) {
      console.error('Supabase logEmail error:', e);
    }
  }

  localEmailLogs.push({
    ...log,
    id: `log-${Date.now()}`,
    created_at: new Date().toISOString(),
  });
}
