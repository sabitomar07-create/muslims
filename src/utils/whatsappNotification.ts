/**
 * Pure WhatsApp notification formatting and dispatch helper
 */

export function formatWhatsAppPhoneNumber(phone: string): string {
  if (!phone) return '';
  // Remove all non-digit characters except leading plus if any
  let cleaned = phone.replace(/[^\d+]/g, '');

  if (cleaned.startsWith('+')) {
    cleaned = cleaned.substring(1);
  } else if (cleaned.startsWith('00')) {
    cleaned = cleaned.substring(2);
  } else if (cleaned.startsWith('01') && cleaned.length === 11) {
    // Egyptian local mobile numbers starting with 01X (11 digits) -> +201X
    cleaned = '20' + cleaned.substring(1);
  }

  return cleaned;
}

export function createSubscriberWhatsAppMessage(
  email: string,
  timestamp: string = new Date().toISOString(),
  source: string = 'Storefront Newsletter'
): string {
  const formattedTime = new Date(timestamp).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  return [
    `🔔 *MUSLIMS SHIRTS — NEW SUBSCRIBER ALERT!*`,
    ``,
    `👤 *Customer Email:* ${email}`,
    `📅 *Registered At:* ${formattedTime}`,
    `📍 *Source:* ${source}`,
    `🛍️ *Brand:* MUSLIMS SHIRTS (Cairo • Global)`,
    ``,
    `⚡ Customer is waiting for new streetwear drop announcements and VIP coupons.`
  ].join('\n');
}

export function createOrderWhatsAppMessage(
  orderNumber: string,
  customerName: string,
  email: string,
  phone: string,
  totalAmount: string,
  city: string,
  itemsCount: number
): string {
  return [
    `📦 *MUSLIMS SHIRTS — NEW ORDER RECEIVED!*`,
    ``,
    `🧾 *Order ID:* ${orderNumber}`,
    `👤 *Customer:* ${customerName}`,
    `📞 *Phone:* ${phone}`,
    `📧 *Email:* ${email}`,
    `📍 *Delivery City:* ${city}`,
    `👕 *Items Count:* ${itemsCount}`,
    `💰 *Total:* ${totalAmount}`,
    ``,
    `🚀 Check Admin Dashboard to confirm and dispatch courier package.`
  ].join('\n');
}

export function createWhatsAppDirectUrl(phoneNumber: string, message: string): string {
  const cleanPhone = formatWhatsAppPhoneNumber(phoneNumber);
  const encodedText = encodeURIComponent(message);
  
  if (cleanPhone) {
    return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodedText}`;
  }
  return `https://api.whatsapp.com/send?text=${encodedText}`;
}

export interface WhatsAppDispatchPayload {
  email: string;
  phone?: string;
  source?: string;
  orderNumber?: string;
  total?: string;
  customerName?: string;
}

export interface WhatsAppDispatchResult {
  success: boolean;
  message: string;
  mode: 'cloud_api' | 'webhook' | 'direct_link' | 'logged';
  whatsappUrl: string;
  recipientPhone: string;
  formattedMessage: string;
}
