import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatWhatsAppPhoneNumber,
  createSubscriberWhatsAppMessage,
  createOrderWhatsAppMessage,
  createWhatsAppDirectUrl,
} from './whatsappNotification.ts';

test('formatWhatsAppPhoneNumber cleans and standardizes phone numbers', () => {
  // Empty or invalid input
  assert.equal(formatWhatsAppPhoneNumber(''), '');

  // International format with +
  assert.equal(formatWhatsAppPhoneNumber('+20 100 123 4567'), '201001234567');

  // Double zero prefix
  assert.equal(formatWhatsAppPhoneNumber('00201001234567'), '201001234567');

  // Egyptian local number starting with 01X (11 digits)
  assert.equal(formatWhatsAppPhoneNumber('01012345678'), '201012345678');
  assert.equal(formatWhatsAppPhoneNumber('01123456789'), '201123456789');

  // Standard digits already with country code
  assert.equal(formatWhatsAppPhoneNumber('201099887766'), '201099887766');
});

test('createSubscriberWhatsAppMessage includes email and brand identifier', () => {
  const msg = createSubscriberWhatsAppMessage('testcustomer@example.com', '2026-05-15T12:00:00Z', 'Footer VIP Club');
  assert.match(msg, /MUSLIMS SHIRTS/);
  assert.match(msg, /testcustomer@example.com/);
  assert.match(msg, /Footer VIP Club/);
});

test('createOrderWhatsAppMessage formats order details cleanly', () => {
  const orderMsg = createOrderWhatsAppMessage(
    'MS-2026-9999',
    'Tariq Mansour',
    'tariq@example.com',
    '+201000000000',
    '1,250 EGP',
    'Cairo',
    2
  );
  assert.match(orderMsg, /MS-2026-9999/);
  assert.match(orderMsg, /Tariq Mansour/);
  assert.match(orderMsg, /1,250 EGP/);
  assert.match(orderMsg, /Cairo/);
});

test('createWhatsAppDirectUrl generates valid https URL with encoded text', () => {
  const url = createWhatsAppDirectUrl('01012345678', 'Hello World & Muslims Shirts!');
  assert.ok(url.startsWith('https://api.whatsapp.com/send?phone=201012345678&text='));
  assert.ok(url.includes(encodeURIComponent('Hello World & Muslims Shirts!')));

  const fallbackUrl = createWhatsAppDirectUrl('', 'Just text');
  assert.ok(fallbackUrl.startsWith('https://api.whatsapp.com/send?text='));
});
