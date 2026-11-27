import { useCallback, useEffect, useState } from 'react';
import type { CartItem, Product } from '../types';

const STORAGE_KEY = 'cart';

function readCart(): CartItem[] {
  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function writeCart(items: CartItem[]) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage can be unavailable or full; the cart still works in memory.
  }
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(readCart);

  useEffect(() => {
    writeCart(items);
  }, [items]);

  const addItem = (product: Product) => {
    const existing = items.find((item) => item.product.id === product.id);
    if (existing) {
      existing.quantity += 1;
      setItems(items);
    } else {
      setItems([...items, { product, quantity: 1 }]);
    }
  };

  const updateQuantity = useCallback((index: number, quantity: number) => {
    setItems((current) => current.map((item, i) => (i === index ? { ...item, quantity } : item)));
  }, []);

  const removeItem = useCallback((index: number) => {
    setItems((current) => current.filter((_, i) => i !== index));
  }, []);

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return { items, total, count, addItem, updateQuantity, removeItem };
}
