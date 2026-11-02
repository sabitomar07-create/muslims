import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/cartRules';

interface CartDrawerProps {
  onProceedToCheckout: () => void;
  onExploreProducts: () => void;
}

export function CartDrawer({ onProceedToCheckout, onExploreProducts }: CartDrawerProps) {
  const {
    items,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    appliedCode,
    applyCoupon,
    removeCoupon,
    discountPercent,
    discountMessage,
    currency,
    calculation,
    totalItems
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [couponSubmitting, setCouponSubmitting] = useState(false);
  const [localCouponErr, setLocalCouponErr] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    setCouponSubmitting(true);
    setLocalCouponErr('');

    const res = await applyCoupon(promoInput);
    if (!res.success) {
      setLocalCouponErr(res.message);
    } else {
      setPromoInput('');
    }
    setCouponSubmitting(false);
  };

  // Free shipping progress percentage
  const freeShippingThreshold = 1200;
  const progressPercent = Math.min(100, Math.round((calculation.subtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm animate-fade-in flex justify-end">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={closeCart} />

      <aside aria-label="Shopping Cart Drawer" className="relative w-full max-w-md bg-[#121214] border-l border-zinc-800 text-zinc-100 flex flex-col h-full z-10 shadow-2xl">
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-emerald-400" />
            <h2 className="font-brand text-sm sm:text-base font-extrabold uppercase tracking-wider text-white">
              Shopping Cart ({totalItems})
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 text-zinc-400 hover:text-white rounded transition-colors"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="bg-[#18181b] px-6 py-3 border-b border-zinc-800">
          <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
            <span className="flex items-center gap-1.5 text-zinc-300">
              <Truck className="w-3.5 h-3.5 text-emerald-400" />
              {calculation.qualifiesForFreeShipping ? (
                <span className="text-emerald-400 font-bold">You unlocked FREE Express Delivery!</span>
              ) : (
                <span>
                  Add <strong className="text-white">{formatPrice(calculation.amountNeededForFreeShipping, currency)}</strong> for Free Delivery
                </span>
              )}
            </span>
            <span className="text-zinc-400">{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-400 transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-zinc-800/80">
          {items.length > 0 ? (
            items.map(item => (
              <div key={item.id} className="py-4 flex gap-4">
                {/* Thumbnail */}
                <div className="w-20 h-24 rounded overflow-hidden bg-zinc-900 border border-zinc-800 shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-brand text-xs font-bold uppercase tracking-wider text-white line-clamp-1">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-zinc-500 hover:text-red-400 p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] text-zinc-400 mt-0.5">
                      {item.color} &bull; Size {item.size}
                    </p>
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border border-zinc-800 bg-zinc-900 rounded">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-zinc-400 hover:text-white font-bold text-xs"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-bold text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-zinc-400 hover:text-white font-bold text-xs"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-xs font-bold text-white">
                      {formatPrice((item.salePrice || item.price) * item.quantity, currency)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 mb-4">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h3 className="font-brand text-base font-bold uppercase text-white tracking-wider">
                Your cart is empty
              </h3>
              <p className="text-xs text-zinc-400 max-w-xs mt-1 mb-6">
                Discover our latest drop of heavyweight hoodies, oversized tees, and accessories.
              </p>
              <button
                onClick={() => {
                  closeCart();
                  onExploreProducts();
                }}
                className="bg-white text-black font-extrabold text-xs uppercase tracking-widest px-6 py-3 rounded hover:bg-emerald-400 transition-colors"
              >
                Shop New Arrivals
              </button>
            </div>
          )}
        </div>

        {/* Footer with promo code and totals */}
        {items.length > 0 && (
          <div className="border-t border-zinc-800 bg-[#141417] p-6 space-y-4">
            
            {/* Promo Code Input */}
            <div>
              {appliedCode ? (
                <div className="flex items-center justify-between p-2.5 bg-emerald-950/40 border border-emerald-800/80 rounded text-xs text-emerald-300">
                  <div className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Promo Code: <strong>{appliedCode}</strong> ({discountPercent}% Off)</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-zinc-400 hover:text-white text-[11px] underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={e => setPromoInput(e.target.value.toUpperCase())}
                    placeholder="Enter Promo Code (e.g. SABR10)"
                    className="flex-1 bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-xs text-white placeholder-zinc-500 uppercase focus:outline-none focus:border-zinc-600"
                  />
                  <button
                    type="submit"
                    disabled={couponSubmitting || !promoInput.trim()}
                    className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded transition-colors disabled:opacity-50"
                  >
                    Apply
                  </button>
                </form>
              )}

              {localCouponErr && (
                <p className="text-[11px] text-red-400 mt-1">{localCouponErr}</p>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-zinc-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white font-medium">{formatPrice(calculation.subtotal, currency)}</span>
              </div>

              {calculation.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount ({discountPercent}%)</span>
                  <span>-{formatPrice(calculation.discountAmount, currency)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-white font-medium">
                  {calculation.shippingFee === 0 ? 'FREE' : formatPrice(calculation.shippingFee, currency)}
                </span>
              </div>

              <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-zinc-800">
                <span className="font-brand uppercase tracking-wider">Estimated Total</span>
                <span>{formatPrice(calculation.total, currency)}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={() => {
                closeCart();
                onProceedToCheckout();
              }}
              className="w-full bg-white hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-widest py-4 rounded transition-all duration-300 flex items-center justify-center gap-2 shadow-xl group cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        )}

      </aside>
    </div>
  );
}
