import React, { useState, useEffect } from 'react';
import { X, User, Package, Heart, LogOut, Clock, CheckCircle2, ChevronRight, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { getOrdersForUser, getProducts } from '../firebase/db';
import { Order, Product } from '../types';
import { formatPrice } from '../utils/cartRules';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency?: string;
  onSelectProduct: (product: Product) => void;
}

export function AccountModal({
  isOpen,
  onClose,
  currency = 'EGP',
  onSelectProduct
}: AccountModalProps) {
  const { currentUser, logout, isAdmin } = useAuth();
  const { wishlistIds, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist'>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    if (isOpen && currentUser) {
      setLoadingOrders(true);
      getOrdersForUser(currentUser.uid)
        .then(setOrders)
        .finally(() => setLoadingOrders(false));

      getProducts().then(allProds => {
        setWishlistProducts(allProds.filter(p => wishlistIds.includes(p.id)));
      });
    }
  }, [isOpen, currentUser, wishlistIds]);

  if (!isOpen || !currentUser) return null;

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return <span className="bg-emerald-500/20 text-emerald-400 text-[10px] uppercase font-bold px-2 py-0.5 rounded border border-emerald-500/30">Delivered</span>;
      case 'shipped':
        return <span className="bg-blue-500/20 text-blue-400 text-[10px] uppercase font-bold px-2 py-0.5 rounded border border-blue-500/30">In Transit</span>;
      case 'confirmed':
      case 'processing':
        return <span className="bg-amber-500/20 text-amber-400 text-[10px] uppercase font-bold px-2 py-0.5 rounded border border-amber-500/30">Processing</span>;
      case 'cancelled':
        return <span className="bg-red-500/20 text-red-400 text-[10px] uppercase font-bold px-2 py-0.5 rounded border border-red-500/30">Cancelled</span>;
      case 'pending':
      default:
        return <span className="bg-zinc-800 text-zinc-300 text-[10px] uppercase font-bold px-2 py-0.5 rounded border border-zinc-700">Pending</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#121214] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl text-zinc-100 max-h-[90vh] flex flex-col">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-[#161619]">
          <div className="flex items-center gap-3">
            {currentUser.photoURL ? (
              <img
                src={currentUser.photoURL}
                alt=""
                className="w-10 h-10 rounded-full object-cover border border-zinc-700"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-sm border border-emerald-500/30">
                {(currentUser.displayName || currentUser.email || 'U')[0].toUpperCase()}
              </div>
            )}
            <div>
              <h2 className="font-brand text-sm sm:text-base font-bold uppercase text-white">
                {currentUser.displayName || 'Streetwear Enthusiast'}
              </h2>
              <p className="text-xs text-zinc-400">{currentUser.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="p-2 text-zinc-400 hover:text-red-400 rounded transition-colors text-xs flex items-center gap-1 font-semibold"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-zinc-800 px-6 bg-zinc-900/50">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3.5 px-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'orders'
                ? 'border-emerald-400 text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>My Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`py-3.5 px-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'wishlist'
                ? 'border-emerald-400 text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Wishlist ({wishlistProducts.length})</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="overflow-y-auto p-6 flex-1 space-y-4">
          {activeTab === 'orders' && (
            <div>
              {loadingOrders ? (
                <div className="text-center py-12 text-zinc-500 text-xs">
                  Loading your order history...
                </div>
              ) : orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map(order => (
                    <div
                      key={order.id}
                      className="bg-zinc-900/60 border border-zinc-800 rounded-lg p-5 space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-zinc-800 text-xs">
                        <div>
                          <span className="font-mono font-bold text-white text-sm">
                            {order.orderNumber}
                          </span>
                          <span className="text-zinc-500 ml-2">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          {getStatusBadge(order.status)}
                          <span className="font-bold text-white text-sm">
                            {formatPrice(order.total, currency)}
                          </span>
                        </div>
                      </div>

                      {/* Item Previews */}
                      <div className="divide-y divide-zinc-800/40">
                        {order.items.map((item, i) => (
                          <div key={i} className="py-2 flex items-center justify-between text-xs">
                            <div className="flex items-center gap-3">
                              <img
                                src={item.image}
                                alt=""
                                className="w-10 h-12 rounded object-cover bg-zinc-950 shrink-0"
                              />
                              <div>
                                <p className="font-bold text-white uppercase">{item.name}</p>
                                <p className="text-[11px] text-zinc-400">{item.color} &bull; Size {item.size} &bull; Qty {item.quantity}</p>
                              </div>
                            </div>
                            <span className="text-zinc-300 font-medium">
                              {formatPrice(item.price * item.quantity, currency)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="text-[11px] text-zinc-500 pt-1 flex justify-between">
                        <span>Payment: {order.paymentMethod}</span>
                        <span>Delivering to: {order.customer.city}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 text-zinc-500 space-y-2">
                  <Package className="w-10 h-10 mx-auto text-zinc-600" />
                  <p className="font-bold text-white text-sm uppercase">No orders placed yet</p>
                  <p className="text-xs">Your completed purchases will appear here with live tracking updates.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div>
              {wishlistProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {wishlistProducts.map(prod => (
                    <div
                      key={prod.id}
                      className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 flex gap-3 items-center justify-between"
                    >
                      <div
                        onClick={() => {
                          onSelectProduct(prod);
                          onClose();
                        }}
                        className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                      >
                        <img
                          src={prod.images[0]}
                          alt=""
                          className="w-14 h-18 rounded object-cover bg-zinc-950 shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-white uppercase truncate">
                            {prod.name}
                          </h4>
                          <p className="text-[11px] text-zinc-400">{prod.category}</p>
                          <p className="text-xs font-bold text-emerald-400 mt-1">
                            {formatPrice(prod.salePrice || prod.price, currency)}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleWishlist(prod.id)}
                        className="p-2 text-zinc-500 hover:text-red-400"
                        title="Remove from Wishlist"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 text-zinc-500 space-y-2">
                  <Heart className="w-10 h-10 mx-auto text-zinc-600" />
                  <p className="font-bold text-white text-sm uppercase">Your wishlist is empty</p>
                  <p className="text-xs">Click the heart icon on any product to save it for later.</p>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
