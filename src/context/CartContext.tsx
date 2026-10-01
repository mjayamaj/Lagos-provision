'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product, CartItem } from '@/types';
import { DEFAULT_DELIVERY_FEE_KOBO } from '@/config/delivery';
import { PRODUCTS, SEED_DESIGN_CART_ITEMS } from '@/data/catalog';

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotalKobo: number;
  deliveryFeeKobo: number;
  totalKobo: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  loadDesignSeedCart: () => void;
  getItemQuantity: (productId: string) => number;
  isLoaded: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'lagos_provision_cart_v1';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed: Array<{ productId: string; quantity: number }> = JSON.parse(stored);
        const resolved: CartItem[] = [];
        for (const item of parsed) {
          const product = PRODUCTS.find((p) => p.id === item.productId);
          if (product && product.is_active) {
            resolved.push({
              product_id: product.id,
              product,
              quantity: item.quantity,
            });
          }
        }
        setItems(resolved);
      }
    } catch (e) {
      console.error('Error loading cart from storage:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage when items change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      const toStore = items.map((it) => ({
        productId: it.product_id,
        quantity: it.quantity,
      }));
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(toStore));
    } catch (e) {
      console.error('Error saving cart to storage:', e);
    }
  }, [items, isLoaded]);

  const addItem = (product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((it) => it.product_id === product.id);
      if (existing) {
        return prev.map((it) =>
          it.product_id === product.id
            ? { ...it, quantity: Math.min(99, it.quantity + quantity) }
            : it
        );
      }
      return [...prev, { product_id: product.id, product, quantity }];
    });
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((it) => it.product_id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((it) =>
        it.product_id === productId
          ? { ...it, quantity: Math.min(99, quantity) }
          : it
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const loadDesignSeedCart = () => {
    const seed: CartItem[] = [];
    for (const item of SEED_DESIGN_CART_ITEMS) {
      const product = PRODUCTS.find((p) => p.id === item.productId);
      if (product) {
        seed.push({
          product_id: product.id,
          product,
          quantity: item.quantity,
        });
      }
    }
    setItems(seed);
  };

  const getItemQuantity = (productId: string): number => {
    const found = items.find((it) => it.product_id === productId);
    return found ? found.quantity : 0;
  };

  const itemCount = items.reduce((sum, it) => sum + it.quantity, 0);

  const subtotalKobo = items.reduce(
    (sum, it) => sum + it.product.price_kobo * it.quantity,
    0
  );

  const deliveryFeeKobo = items.length > 0 ? DEFAULT_DELIVERY_FEE_KOBO : 0;
  const totalKobo = subtotalKobo + deliveryFeeKobo;

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotalKobo,
        deliveryFeeKobo,
        totalKobo,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        loadDesignSeedCart,
        getItemQuantity,
        isLoaded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
