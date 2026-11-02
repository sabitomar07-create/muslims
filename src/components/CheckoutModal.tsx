import React, { useState } from 'react';
import { X, CheckCircle, Truck, CreditCard, ShieldCheck, ArrowLeft, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../utils/cartRules';
import { createOrder } from '../firebase/db';
import { Order, CustomerDetails } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (order: Order) => void;
}

export function CheckoutModal({ isOpen, onClose, onOrderSuccess }: CheckoutModalProps) {
  const { items, calculation, currency, appliedCode, clearCart } = useCart();
  const { currentUser } = useAuth();

  const [customer, setCustomer] = useState<CustomerDetails>({
    fullName: currentUser?.displayName || '',
    email: currentUser?.email || '',
    phone: '',
    address: '',
    city: 'Cairo',
    governorate: 'Cairo Governorate',
    postalCode: '',
    notes: ''
  });

  const [paymentMethod, setPaymentMethod] = useState<'Cash on Delivery (COD)' | 'Online Card Payment'>('Cash on Delivery (COD)');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      setErrorMessage('Your cart is empty.');
      return;
    }

    if (!customer.fullName.trim() || !customer.email.trim() || !customer.phone.trim() || !customer.address.trim()) {
      setErrorMessage('Please fill out all required shipping fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const orderNumber = `MS-2026-${Math.floor(100000 + Math.random() * 900000)}`;

      const orderData: Omit<Order, 'id' | 'createdAt'> = {
        orderNumber,
        userId: currentUser?.uid || null,
        userEmail: customer.email.trim(),
        customer,
        items: items.map(i => ({
          productId: i.productId,
          name: i.name,
          price: i.salePrice || i.price,
          color: i.color,
          size: i.size,
          quantity: i.quantity,
          image: i.image
        })),
        subtotal: calculation.subtotal,
        discount: calculation.discountAmount,
        discountCode: appliedCode || undefined,
        shipping: calculation.shippingFee,
        total: calculation.total,
        paymentMethod,
        paymentStatus: paymentMethod === 'Online Card Payment' ? 'paid' : 'unpaid',
        status: 'pending'
      };

      const created = await createOrder(orderData);
      setConfirmedOrder(created);
      clearCart();
      onOrderSuccess(created);

      // Send WhatsApp notification to store owner
      try {
        fetch('/api/notify-whatsapp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: created.userEmail,
            phone: created.customer.phone,
            orderNumber: created.orderNumber,
            total: `${created.total} EGP`,
            customerName: created.customer.fullName,
            source: 'Streetwear Checkout'
          })
        }).catch(e => console.warn('Order WhatsApp alert dispatch error:', e));
      } catch (waErr) {
        console.warn('Order WhatsApp trigger error:', waErr);
      }
    } catch (err) {
      console.error('Order creation error', err);
      setErrorMessage('Could not place order. Please verify your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-[#121214] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl my-8 text-zinc-100 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-[#161619]">
          <div className="flex items-center gap-2">
            <span className="font-brand text-sm font-extrabold uppercase tracking-widest text-white">
              {confirmedOrder ? 'Order Confirmation' : 'Secure Streetwear Checkout'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-6 flex-1">
          {confirmedOrder ? (
            /* Order Success View */
            <div className="text-center py-8 max-w-lg mx-auto space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">
                  ALHAMDULILLAH &bull; ORDER RECEIVED
                </span>
                <h2 className="font-brand text-2xl font-bold uppercase text-white mt-1">
                  Thank You for Your Order!
                </h2>
                <p className="text-xs text-zinc-400 mt-2">
                  Order Number: <strong className="text-white font-mono">{confirmedOrder.orderNumber}</strong>
                </p>
                <p className="text-xs text-zinc-400">
                  A confirmation email has been dispatched to <strong className="text-zinc-200">{confirmedOrder.userEmail}</strong>.
                </p>
              </div>

              {/* Order Receipt Box */}
              <div className="bg-[#18181b] border border-zinc-800 rounded-lg p-5 text-left text-xs space-y-3">
                <div className="font-bold uppercase text-white border-b border-zinc-800 pb-2 flex justify-between">
                  <span>Shipping To</span>
                  <span className="text-emerald-400">{confirmedOrder.paymentMethod}</span>
                </div>
                <div className="text-zinc-300">
                  <p className="font-semibold text-white">{confirmedOrder.customer.fullName}</p>
                  <p>{confirmedOrder.customer.address}, {confirmedOrder.customer.city}</p>
                  <p>Phone: {confirmedOrder.customer.phone}</p>
                </div>

                <div className="border-t border-zinc-800 pt-2 space-y-1.5">
                  {confirmedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-zinc-400">
                      <span>{item.quantity}x {item.name} ({item.color}, {item.size})</span>
                      <span className="text-white">{formatPrice(item.price * item.quantity, currency)}</span>
                    </div>
                  ))}
                  <div className="border-t border-zinc-800 pt-2 flex justify-between font-bold text-white text-sm">
                    <span>Total Paid/Due</span>
                    <span className="text-emerald-400">{formatPrice(confirmedOrder.total, currency)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="bg-white text-black font-extrabold text-xs uppercase tracking-widest px-8 py-3.5 rounded hover:bg-emerald-400 transition-colors w-full"
              >
                Return to Shop
              </button>
            </div>
          ) : (
            /* Checkout Form View */
            <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Shipping Form */}
              <div className="lg:col-span-7 space-y-6">
                <h3 className="font-brand text-xs font-bold uppercase tracking-wider text-white border-b border-zinc-800 pb-2">
                  1. Shipping Information
                </h3>

                {errorMessage && (
                  <div className="p-3 bg-red-950/60 border border-red-800 text-red-200 text-xs rounded flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] uppercase font-bold text-zinc-400 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customer.fullName}
                      onChange={e => setCustomer({ ...customer, fullName: e.target.value })}
                      placeholder="e.g. Omar Sabit"
                      className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase font-bold text-zinc-400 block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customer.phone}
                      onChange={e => setCustomer({ ...customer, phone: e.target.value })}
                      placeholder="e.g. 0100 000 0000"
                      className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase font-bold text-zinc-400 block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={customer.email}
                    onChange={e => setCustomer({ ...customer, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase font-bold text-zinc-400 block mb-1">
                    Street Address, Building & Apt *
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.address}
                    onChange={e => setCustomer({ ...customer, address: e.target.value })}
                    placeholder="e.g. 15 Street 9, Maadi, Apt 4"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] uppercase font-bold text-zinc-400 block mb-1">
                      City / Governorate *
                    </label>
                    <select
                      value={customer.city}
                      onChange={e => setCustomer({ ...customer, city: e.target.value, governorate: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                    >
                      <option value="Cairo">Cairo (القاهرة)</option>
                      <option value="Giza">Giza (الجيزة)</option>
                      <option value="Alexandria">Alexandria (الإسكندرية)</option>
                      <option value="Mansoura">Mansoura (المنصورة)</option>
                      <option value="Tanta">Tanta (طنطا)</option>
                      <option value="Port Said">Port Said (بورسعيد)</option>
                      <option value="Suez">Suez (السويس)</option>
                      <option value="Assiut">Assiut (أسيوط)</option>
                      <option value="Hurghada">Hurghada (الغردقة)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase font-bold text-zinc-400 block mb-1">
                      Postal Code (Optional)
                    </label>
                    <input
                      type="text"
                      value={customer.postalCode || ''}
                      onChange={e => setCustomer({ ...customer, postalCode: e.target.value })}
                      placeholder="e.g. 11728"
                      className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase font-bold text-zinc-400 block mb-1">
                    Special Delivery Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={customer.notes || ''}
                    onChange={e => setCustomer({ ...customer, notes: e.target.value })}
                    placeholder="Gate code, delivery timing, or landmark..."
                    className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>

                {/* Payment Selection */}
                <div className="pt-2">
                  <h3 className="font-brand text-xs font-bold uppercase tracking-wider text-white border-b border-zinc-800 pb-2 mb-3">
                    2. Payment Method
                  </h3>

                  <div className="space-y-3">
                    <label className={`flex items-start gap-3 p-3.5 rounded-lg border cursor-pointer transition-colors ${
                      paymentMethod === 'Cash on Delivery (COD)'
                        ? 'border-emerald-400 bg-emerald-500/10'
                        : 'border-zinc-800 bg-zinc-900'
                    }`}>
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'Cash on Delivery (COD)'}
                        onChange={() => setPaymentMethod('Cash on Delivery (COD)')}
                        className="mt-0.5 text-emerald-500 focus:ring-emerald-400"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-white flex items-center gap-1.5">
                          <Truck className="w-3.5 h-3.5 text-emerald-400" />
                          Cash on Delivery (COD) &bull; Recommended
                        </span>
                        <p className="text-zinc-400 mt-0.5">
                          Inspect your package and pay the courier cash upon delivery anywhere in Egypt.
                        </p>
                      </div>
                    </label>

                    <label className={`flex items-start gap-3 p-3.5 rounded-lg border cursor-pointer transition-colors ${
                      paymentMethod === 'Online Card Payment'
                        ? 'border-emerald-400 bg-emerald-500/10'
                        : 'border-zinc-800 bg-zinc-900'
                    }`}>
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'Online Card Payment'}
                        onChange={() => setPaymentMethod('Online Card Payment')}
                        className="mt-0.5 text-emerald-500 focus:ring-emerald-400"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-white flex items-center gap-1.5">
                          <CreditCard className="w-3.5 h-3.5 text-zinc-400" />
                          Credit / Debit Card (Visa, Mastercard, Meeza)
                        </span>
                        <p className="text-zinc-400 mt-0.5">
                          Encrypted 256-bit checkout. For immediate dispatch.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

              </div>

              {/* Right Column: Order Summary */}
              <div className="lg:col-span-5 bg-[#18181b] p-5 rounded-lg border border-zinc-800 flex flex-col justify-between">
                <div>
                  <h3 className="font-brand text-xs font-bold uppercase tracking-wider text-white border-b border-zinc-800 pb-2 mb-4">
                    Order Summary ({items.length} items)
                  </h3>

                  {/* Items Review */}
                  <div className="space-y-3 max-h-56 overflow-y-auto pr-1 divide-y divide-zinc-800/60">
                    {items.map(item => (
                      <div key={item.id} className="pt-2 flex items-center gap-3">
                        <img
                          src={item.image}
                          alt=""
                          className="w-12 h-14 rounded object-cover bg-zinc-900 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-white truncate uppercase">{item.name}</p>
                          <p className="text-[11px] text-zinc-400">{item.color} &bull; {item.size} &bull; Qty {item.quantity}</p>
                        </div>
                        <span className="text-xs font-semibold text-white">
                          {formatPrice((item.salePrice || item.price) * item.quantity, currency)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Calculations */}
                  <div className="space-y-2 pt-4 border-t border-zinc-800 text-xs text-zinc-400 mt-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-white">{formatPrice(calculation.subtotal, currency)}</span>
                    </div>

                    {calculation.discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-400">
                        <span>Discount Promo</span>
                        <span>-{formatPrice(calculation.discountAmount, currency)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Shipping Fee</span>
                      <span className="text-white">
                        {calculation.shippingFee === 0 ? 'FREE' : formatPrice(calculation.shippingFee, currency)}
                      </span>
                    </div>

                    <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-zinc-800">
                      <span>Total</span>
                      <span className="text-emerald-400">{formatPrice(calculation.total, currency)}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 space-y-3">
                  <button
                    type="submit"
                    disabled={isSubmitting || items.length === 0}
                    className="w-full bg-white hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-widest py-4 rounded transition-all shadow-xl disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? 'Securing Order...' : `Confirm Order • ${formatPrice(calculation.total, currency)}`}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>256-Bit SSL Encrypted &bull; 100% Quality Guaranteed</span>
                  </div>
                </div>

              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
