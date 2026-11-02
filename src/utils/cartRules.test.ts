import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateCartTotals,
  validateDiscountCode,
  formatPrice,
  checkStockAvailability,
  calculateAverageRating,
  type CartItemInput,
  type DiscountCodeRule
} from './cartRules';

test('calculateCartTotals computes subtotal, discount, and standard shipping correctly', () => {
  const items: CartItemInput[] = [
    { id: '1', price: 500, quantity: 2, stock: 10 }, // 1000
    { id: '2', price: 600, salePrice: 400, quantity: 1, stock: 5 }, // 400
  ];

  // Subtotal = 1400. Above 1200 threshold, so shipping is 0.
  const result = calculateCartTotals(items, 10, 1200, 60);
  assert.equal(result.subtotal, 1400);
  assert.equal(result.discountAmount, 140);
  assert.equal(result.shippingFee, 0);
  assert.equal(result.total, 1260);
  assert.equal(result.qualifiesForFreeShipping, true);
  assert.equal(result.amountNeededForFreeShipping, 0);
});

test('calculateCartTotals adds shipping fee if subtotal below free shipping threshold', () => {
  const items: CartItemInput[] = [
    { id: '1', price: 450, quantity: 1, stock: 10 }
  ];

  const result = calculateCartTotals(items, 0, 1200, 60);
  assert.equal(result.subtotal, 450);
  assert.equal(result.shippingFee, 60);
  assert.equal(result.total, 510);
  assert.equal(result.qualifiesForFreeShipping, false);
  assert.equal(result.amountNeededForFreeShipping, 750);
});

test('validateDiscountCode validates active codes, minSpend and expired status', () => {
  const codes: DiscountCodeRule[] = [
    { code: 'SABR10', discountPercent: 10, isActive: true },
    { code: 'BIGSPEND20', discountPercent: 20, minSpend: 1500, isActive: true },
    { code: 'EXPIRED15', discountPercent: 15, isActive: false },
  ];

  const validRes = validateDiscountCode('sabr10', codes, 800);
  assert.equal(validRes.valid, true);
  assert.equal(validRes.discountPercent, 10);

  const minSpendFail = validateDiscountCode('BIGSPEND20', codes, 1000);
  assert.equal(minSpendFail.valid, false);

  const minSpendPass = validateDiscountCode('BIGSPEND20', codes, 1600);
  assert.equal(minSpendPass.valid, true);
  assert.equal(minSpendPass.discountPercent, 20);

  const inactiveRes = validateDiscountCode('EXPIRED15', codes, 2000);
  assert.equal(inactiveRes.valid, false);

  const notFound = validateDiscountCode('FAKECODE', codes, 1000);
  assert.equal(notFound.valid, false);
});

test('formatPrice outputs currency and thousands separator', () => {
  assert.equal(formatPrice(1450, 'EGP'), '1,450 EGP');
  assert.equal(formatPrice(799, 'USD'), '799 USD');
});

test('checkStockAvailability handles stock boundary conditions', () => {
  const item: CartItemInput = { id: 'tee-1', price: 650, quantity: 1, stock: 3 };
  assert.deepEqual(checkStockAvailability(item, 2), { available: true, maxAllowed: 3 });
  assert.deepEqual(checkStockAvailability(item, 4), { available: false, maxAllowed: 3 });
});

test('calculateAverageRating accurately calculates average and count', () => {
  const ratings = [5, 4, 5, 4, 5];
  const { average, count } = calculateAverageRating(ratings);
  assert.equal(average, 4.6);
  assert.equal(count, 5);
});
