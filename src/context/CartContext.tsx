import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Product, DiscountCode } from '../types';
import { calculateCartTotals, validateDiscountCode, CartCalculationResult } from '../utils/cartRules';
import { getDiscountCodes, getSiteSettings } from '../firebase/db';

const CART_STORAGE_KEY = 'ms_streetwear_cart';
const COUPON_STORAGE_KEY = 'ms_applied_coupon';

interface CartContextType {
  items: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, color: string, size: string, quantity?: number) => { success: boolean; message: string };
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  appliedCode: string;
  discountPercent: number;
  discountMessage: string;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
  currency: string;
  freeShippingThreshold: number;
  calculation: CartCalculationResult;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCode, setAppliedCode] = useState<string>(() => {
    try {
      return localStorage.getItem(COUPON_STORAGE_KEY) || '';
    } catch {
      return '';
    }
  });

  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [discountMessage, setDiscountMessage] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState<number>(1200);
  const [standardShippingFee, setStandardShippingFee] = useState<number>(60);
  const [currency, setCurrency] = useState<string>('EGP');

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to local storage', e);
    }
  }, [items]);

  useEffect(() => {
    getSiteSettings().then(settings => {
      if (settings) {
        setCurrency(settings.currency || 'EGP');
        setFreeShippingThreshold(settings.freeShippingThreshold || 1200);
        setStandardShippingFee(settings.standardShippingFee || 60);
      }
    });
  }, []);

  // Revalidate coupon when items change or on mount
  useEffect(() => {
    if (!appliedCode) {
      setDiscountPercent(0);
      setDiscountMessage('');
      return;
    }

    getDiscountCodes().then(codes => {
      const subtotal = items.reduce((sum, item) => {
        const p = item.salePrice && item.salePrice > 0 ? item.salePrice : item.price;
        return sum + p * item.quantity;
      }, 0);

      const res = validateDiscountCode(appliedCode, codes, subtotal);
      if (res.valid) {
        setDiscountPercent(res.discountPercent);
        setDiscountMessage(res.message);
      } else {
        setDiscountPercent(0);
        setDiscountMessage(res.message);
      }
    });
  }, [appliedCode, items]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (
    product: Product,
    color: string,
    size: string,
    quantity: number = 1
  ): { success: boolean; message: string } => {
    if (!color) {
      return { success: false, message: 'Please select a color option.' };
    }
    if (!size) {
      return { success: false, message: 'Please select a size.' };
    }

    // Check variant stock
    const variant = product.variants.find(v => v.color === color && v.size === size);
    const availableStock = variant ? variant.stock : product.stock;

    if (availableStock <= 0) {
      return { success: false, message: 'Selected size and color is currently out of stock.' };
    }

    const uniqueId = `${product.id}-${color}-${size}`;
    let success = true;

    setItems(prev => {
      const existing = prev.find(i => i.id === uniqueId);
      if (existing) {
        const nextQty = existing.quantity + quantity;
        if (nextQty > availableStock) {
          success = false;
          return prev;
        }
        return prev.map(i =>
          i.id === uniqueId ? { ...i, quantity: nextQty } : i
        );
      } else {
        if (quantity > availableStock) {
          success = false;
          return prev;
        }
        const colorObj = product.colors.find(c => c.name === color);
        const itemImage = colorObj?.image || product.images[0];

        return [
          ...prev,
          {
            id: uniqueId,
            productId: product.id,
            name: product.name,
            slug: product.slug,
            price: product.price,
            salePrice: product.salePrice,
            image: itemImage,
            color,
            size,
            quantity,
            stock: availableStock
          }
        ];
      }
    });

    if (!success) {
      return { success: false, message: `Only ${availableStock} items available in stock.` };
    }

    setIsCartOpen(true);
    return { success: true, message: `Added ${product.name} (${color}, ${size}) to cart.` };
  };

  const removeFromCart = (itemId: string) => {
    setItems(prev => prev.filter(i => i.id !== itemId));
  };

  const updateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems(prev =>
      prev.map(item => {
        if (item.id === itemId) {
          const clampedQty = Math.min(newQty, item.stock);
          return { ...item, quantity: clampedQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
    removeCoupon();
  };

  const applyCoupon = async (code: string): Promise<{ success: boolean; message: string }> => {
    const codes = await getDiscountCodes();
    const subtotal = items.reduce((sum, item) => {
      const p = item.salePrice && item.salePrice > 0 ? item.salePrice : item.price;
      return sum + p * item.quantity;
    }, 0);

    const res = validateDiscountCode(code, codes, subtotal);
    if (res.valid) {
      setAppliedCode(code.trim().toUpperCase());
      localStorage.setItem(COUPON_STORAGE_KEY, code.trim().toUpperCase());
      setDiscountPercent(res.discountPercent);
      setDiscountMessage(res.message);
      return { success: true, message: res.message };
    } else {
      return { success: false, message: res.message };
    }
  };

  const removeCoupon = () => {
    setAppliedCode('');
    localStorage.removeItem(COUPON_STORAGE_KEY);
    setDiscountPercent(0);
    setDiscountMessage('');
  };

  const calculation = calculateCartTotals(
    items.map(i => ({
      id: i.id,
      price: i.price,
      salePrice: i.salePrice,
      quantity: i.quantity,
      stock: i.stock
    })),
    discountPercent,
    freeShippingThreshold,
    standardShippingFee
  );

  const totalItems = items.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isCartOpen,
        setIsCartOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        appliedCode,
        discountPercent,
        discountMessage,
        applyCoupon,
        removeCoupon,
        currency,
        freeShippingThreshold,
        calculation,
        totalItems
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
