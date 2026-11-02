/**
 * Pure cart and pricing business logic
 */

export interface CartItemInput {
  id: string;
  price: number;
  salePrice?: number | null;
  quantity: number;
  stock: number;
}

export interface DiscountCodeRule {
  code: string;
  discountPercent: number; // e.g. 10 for 10%
  minSpend?: number;
  isActive: boolean;
  validUntil?: string;
}

export interface CartCalculationResult {
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  total: number;
  qualifiesForFreeShipping: boolean;
  amountNeededForFreeShipping: number;
}

export function calculateCartTotals(
  items: CartItemInput[],
  discountPercent: number = 0,
  freeShippingThreshold: number = 1200,
  standardShippingFee: number = 60
): CartCalculationResult {
  const subtotal = items.reduce((sum, item) => {
    const itemPrice = item.salePrice && item.salePrice > 0 ? item.salePrice : item.price;
    return sum + itemPrice * Math.max(0, item.quantity);
  }, 0);

  const safeDiscountPercent = Math.min(Math.max(0, discountPercent), 100);
  const discountAmount = Math.round((subtotal * safeDiscountPercent) / 100);

  const qualifiesForFreeShipping = subtotal >= freeShippingThreshold || items.length === 0;
  const shippingFee = items.length === 0 ? 0 : qualifiesForFreeShipping ? 0 : standardShippingFee;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  return {
    subtotal,
    discountAmount,
    shippingFee,
    total,
    qualifiesForFreeShipping,
    amountNeededForFreeShipping
  };
}

export function validateDiscountCode(
  code: string,
  availableCodes: DiscountCodeRule[],
  subtotal: number
): { valid: boolean; discountPercent: number; message: string } {
  const trimmedCode = code.trim().toUpperCase();
  if (!trimmedCode) {
    return { valid: false, discountPercent: 0, message: 'Please enter a discount code' };
  }

  const match = availableCodes.find(c => c.code.toUpperCase() === trimmedCode);
  if (!match) {
    return { valid: false, discountPercent: 0, message: 'Invalid promo code' };
  }

  if (!match.isActive) {
    return { valid: false, discountPercent: 0, message: 'This promo code is no longer active' };
  }

  if (match.minSpend && subtotal < match.minSpend) {
    return {
      valid: false,
      discountPercent: 0,
      message: `Minimum order of ${match.minSpend} required for this code`
    };
  }

  if (match.validUntil && new Date(match.validUntil).getTime() < Date.now()) {
    return { valid: false, discountPercent: 0, message: 'This promo code has expired' };
  }

  return {
    valid: true,
    discountPercent: match.discountPercent,
    message: `${match.discountPercent}% discount applied successfully!`
  };
}

export function formatPrice(amount: number, currency: string = 'EGP'): string {
  const formatted = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0
  }).format(amount);

  return `${formatted} ${currency}`;
}

export function checkStockAvailability(item: CartItemInput, requestedQty: number): {
  available: boolean;
  maxAllowed: number;
} {
  const available = item.stock >= requestedQty;
  const maxAllowed = Math.max(0, item.stock);
  return { available, maxAllowed };
}

export function calculateAverageRating(ratings: number[]): { average: number; count: number } {
  if (!ratings || ratings.length === 0) {
    return { average: 5.0, count: 0 };
  }
  const sum = ratings.reduce((acc, r) => acc + r, 0);
  const average = Number((sum / ratings.length).toFixed(1));
  return { average, count: ratings.length };
}
