import React, { useState, useEffect } from 'react';
import {
  X,
  Package,
  ShoppingBag,
  Star,
  Tag,
  Users,
  Settings,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  ShieldAlert,
  Save,
  Check,
  MessageSquare,
  Send,
  ExternalLink,
  Bell
} from 'lucide-react';
import { Product, Order, Review, DiscountCode, SiteSettings, NewsletterSubscriber } from '../types';
import {
  formatWhatsAppPhoneNumber,
  createSubscriberWhatsAppMessage,
  createWhatsAppDirectUrl
} from '../utils/whatsappNotification';
import {
  getProducts,
  saveProduct,
  deleteProduct,
  getAllOrders,
  updateOrderStatus,
  getAllReviews,
  updateReviewStatus,
  deleteReview,
  getDiscountCodes,
  saveDiscountCode,
  deleteDiscountCode,
  getSiteSettings,
  updateSiteSettings,
  getAllSubscribers
} from '../firebase/db';
import { formatPrice } from '../utils/cartRules';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onRefreshCatalog: () => void;
}

type AdminTab = 'overview' | 'products' | 'orders' | 'reviews' | 'discounts' | 'subscribers' | 'settings';

export function AdminDashboard({ isOpen, onClose, onRefreshCatalog }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Data states
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Product edit modal state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreatingProduct, setIsCreatingProduct] = useState<boolean>(false);

  // New discount code state
  const [newCodeName, setNewCodeName] = useState('');
  const [newCodePercent, setNewCodePercent] = useState<number>(10);
  const [newCodeMinSpend, setNewCodeMinSpend] = useState<number>(500);

  // Settings form state
  const [announcementInput, setAnnouncementInput] = useState('');
  const [currencyInput, setCurrencyInput] = useState('EGP');
  const [freeShippingInput, setFreeShippingInput] = useState<number>(1200);
  const [whatsappPhoneInput, setWhatsappPhoneInput] = useState('+20 100 000 0000');
  const [enableAlertsInput, setEnableAlertsInput] = useState(true);
  const [settingsSavedToast, setSettingsSavedToast] = useState(false);
  const [whatsappTestStatus, setWhatsappTestStatus] = useState<string | null>(null);
  const [whatsappTestUrl, setWhatsappTestUrl] = useState<string | null>(null);
  const [isSendingTest, setIsSendingTest] = useState(false);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [prods, ords, revs, codes, subs, siteSettings] = await Promise.all([
        getProducts(),
        getAllOrders(),
        getAllReviews(),
        getDiscountCodes(),
        getAllSubscribers(),
        getSiteSettings()
      ]);

      setProducts(prods);
      setOrders(ords);
      setReviews(revs);
      setDiscountCodes(codes);
      setSubscribers(subs);
      setSettings(siteSettings);

      if (siteSettings) {
        setAnnouncementInput(siteSettings.announcementText || '');
        setCurrencyInput(siteSettings.currency || 'EGP');
        setFreeShippingInput(siteSettings.freeShippingThreshold || 1200);
        setWhatsappPhoneInput(siteSettings.whatsappNotificationPhone || '+20 100 000 0000');
        setEnableAlertsInput(siteSettings.enableWhatsAppAlerts ?? true);
      }
    } catch (e) {
      console.error('Failed to load admin data', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadAllData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Overview metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const lowStockCount = products.filter(p => p.stock <= 10).length;
  const pendingReviewsCount = reviews.filter(r => r.status === 'pending').length;

  // Handle Order Status change
  const handleStatusChange = async (orderId: string, status: Order['status']) => {
    await updateOrderStatus(orderId, status);
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  // Handle Review Moderation
  const handleModerateReview = async (reviewId: string, status: 'approved' | 'rejected') => {
    await updateReviewStatus(reviewId, status);
    setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, status } : r));
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (confirm('Are you sure you want to delete this review?')) {
      await deleteReview(reviewId);
      setReviews(prev => prev.filter(r => r.id !== reviewId));
    }
  };

  // Handle Product Save
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    await saveProduct(editingProduct);
    setEditingProduct(null);
    setIsCreatingProduct(false);
    await loadAllData();
    onRefreshCatalog();
  };

  const handleDeleteProduct = async (productId: string) => {
    if (confirm('Are you sure you want to permanently remove this product?')) {
      await deleteProduct(productId);
      setProducts(prev => prev.filter(p => p.id !== productId));
      onRefreshCatalog();
    }
  };

  // Handle Discount Code add
  const handleAddDiscountCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCodeName.trim()) return;

    const newCode: DiscountCode = {
      id: `code-${Date.now()}`,
      code: newCodeName.trim().toUpperCase(),
      discountPercent: Number(newCodePercent),
      minSpend: Number(newCodeMinSpend),
      isActive: true
    };

    await saveDiscountCode(newCode);
    setDiscountCodes(prev => [newCode, ...prev]);
    setNewCodeName('');
  };

  const handleToggleCode = async (code: DiscountCode) => {
    const updated = { ...code, isActive: !code.isActive };
    await saveDiscountCode(updated);
    setDiscountCodes(prev => prev.map(c => c.id === code.id ? updated : c));
  };

  const handleDeleteCode = async (codeId: string) => {
    await deleteDiscountCode(codeId);
    setDiscountCodes(prev => prev.filter(c => c.id !== codeId));
  };

  // Handle Settings Save
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated = await updateSiteSettings({
      announcementText: announcementInput,
      currency: currencyInput,
      freeShippingThreshold: Number(freeShippingInput),
      whatsappNotificationPhone: whatsappPhoneInput,
      enableWhatsAppAlerts: enableAlertsInput
    });
    setSettings(updated);
    setSettingsSavedToast(true);
    setTimeout(() => setSettingsSavedToast(false), 3000);
  };

  const handleSendTestWhatsApp = async () => {
    setIsSendingTest(true);
    setWhatsappTestStatus(null);
    setWhatsappTestUrl(null);
    try {
      const res = await fetch('/api/notify-whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'sabitomar07@gmail.com',
          source: 'Admin Settings Test Dispatch',
          targetPhone: whatsappPhoneInput
        })
      });
      const data = await res.json();
      if (data.success) {
        setWhatsappTestStatus(`Alert created successfully for ${data.recipientPhone} (mode: ${data.mode})`);
        setWhatsappTestUrl(data.whatsappUrl);
      } else {
        setWhatsappTestStatus(`Failed: ${data.error || 'Server error'}`);
      }
    } catch (err: any) {
      setWhatsappTestStatus(`Error: ${err?.message || 'Network error'}`);
    } finally {
      setIsSendingTest(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-6xl bg-[#121214] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl text-zinc-100 max-h-[92vh] flex flex-col">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-[#161619]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              MS
            </div>
            <div>
              <h2 className="font-brand text-sm sm:text-base font-extrabold uppercase tracking-wider text-white">
                MUSLIMS SHIRTS • Admin Master Control
              </h2>
              <span className="text-[11px] text-emerald-400 font-semibold">Store Operator: sabitomar07@gmail.com</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-zinc-800 px-6 bg-zinc-900/60 overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'products', label: `Products (${products.length})`, icon: Package },
            { id: 'orders', label: `Orders (${orders.length})`, icon: ShoppingBag },
            { id: 'reviews', label: `Reviews (${reviews.length})`, icon: Star },
            { id: 'discounts', label: 'Discount Codes', icon: Tag },
            { id: 'subscribers', label: `Subscribers (${subscribers.length})`, icon: Users },
            { id: 'settings', label: 'Store Settings', icon: Settings },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`py-3.5 px-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 shrink-0 transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-emerald-400 text-white'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Content Area */}
        <div className="overflow-y-auto p-6 flex-1 space-y-6">
          {loading ? (
            <div className="text-center py-16 text-zinc-400 text-xs">
              Synchronizing with Firestore database...
            </div>
          ) : (
            <>
              {/* 1. OVERVIEW TAB */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* KPI Stat Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-lg">
                      <span className="text-xs uppercase font-bold text-zinc-400">Total Recorded Revenue</span>
                      <p className="text-2xl font-black text-white mt-1">
                        {formatPrice(totalRevenue, settings?.currency || 'EGP')}
                      </p>
                      <span className="text-[11px] text-emerald-400 font-medium">From {orders.length} lifetime orders</span>
                    </div>

                    <div className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-lg">
                      <span className="text-xs uppercase font-bold text-zinc-400">Total Products</span>
                      <p className="text-2xl font-black text-white mt-1">{products.length}</p>
                      <span className="text-[11px] text-zinc-400">Across 7 distinct categories</span>
                    </div>

                    <div className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-lg">
                      <span className="text-xs uppercase font-bold text-zinc-400">Pending Reviews</span>
                      <p className="text-2xl font-black text-amber-400 mt-1">{pendingReviewsCount}</p>
                      <span className="text-[11px] text-zinc-400">Awaiting moderation queue</span>
                    </div>

                    <div className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-lg">
                      <span className="text-xs uppercase font-bold text-zinc-400">Low Stock Alerts</span>
                      <p className="text-2xl font-black text-red-400 mt-1">{lowStockCount}</p>
                      <span className="text-[11px] text-zinc-400">Items with &le; 10 units left</span>
                    </div>
                  </div>

                  {/* Recent Orders Preview */}
                  <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-5">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-brand text-xs font-bold uppercase tracking-wider text-white">
                        Recent Store Orders
                      </h3>
                      <button
                        onClick={() => setActiveTab('orders')}
                        className="text-xs text-emerald-400 hover:underline"
                      >
                        View All
                      </button>
                    </div>

                    {orders.slice(0, 5).map(o => (
                      <div key={o.id} className="py-2.5 border-b border-zinc-800/60 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-mono font-bold text-white">{o.orderNumber}</span>
                          <span className="text-zinc-400 ml-2">{o.customer.fullName} &bull; {o.customer.city}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-emerald-400">{formatPrice(o.total, settings?.currency || 'EGP')}</span>
                          <span className="uppercase text-[10px] bg-zinc-800 px-2 py-0.5 rounded text-zinc-300 font-bold">{o.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. PRODUCTS TAB */}
              {activeTab === 'products' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-zinc-400">
                      Manage {products.length} garments in the database.
                    </p>
                    <button
                      onClick={() => {
                        setIsCreatingProduct(true);
                        setEditingProduct({
                          id: `custom-prod-${Date.now()}`,
                          name: '',
                          slug: '',
                          description: '',
                          category: 'Oversized T-Shirts',
                          collection: 'Tawhid & Sabr Chapter 1',
                          price: 650,
                          salePrice: null,
                          images: ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80'],
                          colors: [{ name: 'Onyx Black', hex: '#111111' }],
                          sizes: ['S', 'M', 'L', 'XL'],
                          variants: [],
                          sku: `SKU-${Date.now()}`,
                          stock: 50,
                          rating: 5.0,
                          reviewCount: 0,
                          isFeatured: false,
                          isBestSeller: false,
                          isNewArrival: true,
                          isPublished: true,
                          createdAt: new Date().toISOString()
                        });
                      }}
                      className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase tracking-wider px-4 py-2 rounded transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Product</span>
                    </button>
                  </div>

                  {/* Product Table */}
                  <div className="border border-zinc-800 rounded-lg overflow-x-auto bg-zinc-900/40">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-zinc-900 text-zinc-400 uppercase font-bold text-[10px] border-b border-zinc-800">
                        <tr>
                          <th className="p-3">Product</th>
                          <th className="p-3">Category</th>
                          <th className="p-3">Price</th>
                          <th className="p-3">Stock</th>
                          <th className="p-3">Featured</th>
                          <th className="p-3">Best Seller</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/80 text-zinc-300">
                        {products.map(p => (
                          <tr key={p.id} className="hover:bg-zinc-800/30">
                            <td className="p-3 flex items-center gap-2.5">
                              <img src={p.images[0]} alt="" className="w-9 h-11 rounded object-cover bg-black" />
                              <div>
                                <span className="font-bold text-white uppercase block line-clamp-1">{p.name}</span>
                                <span className="text-[10px] text-zinc-500">{p.collection}</span>
                              </div>
                            </td>
                            <td className="p-3">{p.category}</td>
                            <td className="p-3 font-semibold text-white">
                              {p.salePrice ? (
                                <span>
                                  {formatPrice(p.salePrice, settings?.currency || 'EGP')}{' '}
                                  <span className="line-through text-zinc-500 text-[10px]">
                                    {formatPrice(p.price, settings?.currency || 'EGP')}
                                  </span>
                                </span>
                              ) : (
                                formatPrice(p.price, settings?.currency || 'EGP')
                              )}
                            </td>
                            <td className="p-3">
                              <span className={`font-bold ${p.stock <= 10 ? 'text-red-400' : 'text-emerald-400'}`}>
                                {p.stock} units
                              </span>
                            </td>
                            <td className="p-3">
                              {p.isFeatured ? (
                                <span className="text-emerald-400 font-bold">Yes</span>
                              ) : (
                                <span className="text-zinc-600">No</span>
                              )}
                            </td>
                            <td className="p-3">
                              {p.isBestSeller ? (
                                <span className="text-emerald-400 font-bold">Yes</span>
                              ) : (
                                <span className="text-zinc-600">No</span>
                              )}
                            </td>
                            <td className="p-3 text-right space-x-2">
                              <button
                                onClick={() => {
                                  setEditingProduct(p);
                                  setIsCreatingProduct(false);
                                }}
                                className="p-1 text-zinc-400 hover:text-white"
                                title="Edit Product"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(p.id)}
                                className="p-1 text-zinc-500 hover:text-red-400"
                                title="Delete Product"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 3. ORDERS TAB */}
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  <p className="text-xs text-zinc-400">
                    Review and update order fulfillment statuses.
                  </p>

                  <div className="space-y-3">
                    {orders.length > 0 ? (
                      orders.map(o => (
                        <div key={o.id} className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 space-y-3">
                          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-zinc-800 text-xs">
                            <div>
                              <span className="font-mono font-bold text-white text-sm">{o.orderNumber}</span>
                              <span className="text-zinc-400 ml-2">Customer: <strong className="text-white">{o.customer.fullName}</strong> ({o.customer.phone})</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="font-bold text-emerald-400 text-sm">
                                {formatPrice(o.total, settings?.currency || 'EGP')}
                              </span>

                              {/* Status Select */}
                              <select
                                value={o.status}
                                onChange={e => handleStatusChange(o.id, e.target.value as Order['status'])}
                                aria-label="Update order status"
                                className="bg-zinc-800 border border-zinc-700 text-white rounded px-2 py-1 text-xs focus:outline-none"
                              >
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </div>
                          </div>

                          <div className="text-xs text-zinc-300 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <span className="text-[10px] uppercase font-bold text-zinc-500 block">Delivery Address</span>
                              <p>{o.customer.address}, {o.customer.city}</p>
                              {o.customer.notes && <p className="text-zinc-400 italic mt-1">Note: {o.customer.notes}</p>}
                            </div>
                            <div>
                              <span className="text-[10px] uppercase font-bold text-zinc-500 block">Items Purchased</span>
                              <div className="space-y-1 mt-0.5">
                                {o.items.map((item, idx) => (
                                  <div key={idx} className="text-zinc-300">
                                    {item.quantity}x {item.name} ({item.color}, {item.size})
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12 text-zinc-500 text-xs">
                        No orders recorded yet.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 4. REVIEWS MODERATION TAB */}
              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-zinc-400">
                      Moderate customer reviews, approve quality ratings, and remove spam.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {reviews.length > 0 ? (
                      reviews.map(rev => (
                        <div key={rev.id} className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 space-y-2 text-xs">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white">{rev.userName}</span>
                              <span className="text-zinc-500">&bull; {rev.userEmail}</span>
                              <span className="text-zinc-400">on <strong className="text-white">{rev.productName || rev.productId}</strong></span>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                                rev.status === 'approved' ? 'bg-emerald-500/20 text-emerald-400' :
                                rev.status === 'rejected' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                              }`}>
                                {rev.status}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="flex text-amber-400">
                              {[1, 2, 3, 4, 5].map(s => (
                                <Star key={s} className={`w-3.5 h-3.5 ${s <= rev.rating ? 'fill-amber-400' : 'text-zinc-700'}`} />
                              ))}
                            </div>
                            <span className="font-bold text-white">{rev.title}</span>
                          </div>

                          <p className="text-zinc-300">{rev.comment}</p>

                          <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-800/60">
                            {rev.status !== 'approved' && (
                              <button
                                onClick={() => handleModerateReview(rev.id, 'approved')}
                                className="px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-black text-[11px] font-bold rounded uppercase tracking-wider"
                              >
                                Approve
                              </button>
                            )}
                            {rev.status !== 'rejected' && (
                              <button
                                onClick={() => handleModerateReview(rev.id, 'rejected')}
                                className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[11px] font-bold rounded uppercase tracking-wider"
                              >
                                Reject
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteReview(rev.id)}
                              className="px-2 py-1 text-red-400 hover:text-red-300"
                              title="Delete Review"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12 text-zinc-500 text-xs">
                        No reviews submitted yet.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 5. DISCOUNT CODES TAB */}
              {activeTab === 'discounts' && (
                <div className="space-y-6">
                  {/* Add Code Form */}
                  <form onSubmit={handleAddDiscountCode} className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg flex flex-wrap gap-3 items-end text-xs">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">Coupon Code</label>
                      <input
                        type="text"
                        required
                        value={newCodeName}
                        onChange={e => setNewCodeName(e.target.value)}
                        placeholder="e.g. DROP25"
                        className="bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-white uppercase"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">Discount %</label>
                      <input
                        type="number"
                        required
                        min={1}
                        max={100}
                        value={newCodePercent}
                        onChange={e => setNewCodePercent(Number(e.target.value))}
                        className="bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-white w-24"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">Min Spend ({settings?.currency || 'EGP'})</label>
                      <input
                        type="number"
                        required
                        min={0}
                        value={newCodeMinSpend}
                        onChange={e => setNewCodeMinSpend(Number(e.target.value))}
                        className="bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-white w-28"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase text-xs px-4 py-2 rounded"
                    >
                      Create Code
                    </button>
                  </form>

                  {/* Codes List */}
                  <div className="border border-zinc-800 rounded-lg overflow-hidden bg-zinc-900/40">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-zinc-900 text-zinc-400 uppercase font-bold text-[10px] border-b border-zinc-800">
                        <tr>
                          <th className="p-3">Code</th>
                          <th className="p-3">Discount</th>
                          <th className="p-3">Min Spend</th>
                          <th className="p-3">Status</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/80 text-zinc-300">
                        {discountCodes.map(code => (
                          <tr key={code.id}>
                            <td className="p-3 font-mono font-bold text-white">{code.code}</td>
                            <td className="p-3 text-emerald-400 font-bold">{code.discountPercent}%</td>
                            <td className="p-3">{formatPrice(code.minSpend || 0, settings?.currency || 'EGP')}</td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                                code.isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800 text-zinc-500'
                              }`}>
                                {code.isActive ? 'Active' : 'Disabled'}
                              </span>
                            </td>
                            <td className="p-3 text-right space-x-2">
                              <button
                                onClick={() => handleToggleCode(code)}
                                className="text-xs text-zinc-400 hover:text-white underline"
                              >
                                {code.isActive ? 'Disable' : 'Enable'}
                              </button>
                              <button
                                onClick={() => handleDeleteCode(code.id)}
                                className="text-zinc-500 hover:text-red-400 p-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 6. SUBSCRIBERS TAB */}
              {activeTab === 'subscribers' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <p className="text-zinc-400">
                      {subscribers.length} customer emails subscribed to drop notices.
                    </p>
                    <div className="flex items-center gap-2 text-emerald-400 text-[11px]">
                      <Bell className="w-3.5 h-3.5" />
                      <span>WhatsApp notifications are active</span>
                    </div>
                  </div>

                  <div className="bg-zinc-900 border border-zinc-800 rounded-lg divide-y divide-zinc-800 text-xs">
                    {subscribers.length > 0 ? (
                      subscribers.map((sub, i) => {
                        const alertUrl = createWhatsAppDirectUrl(
                          whatsappPhoneInput,
                          createSubscriberWhatsAppMessage(sub.email, sub.subscribedAt, 'Storefront Newsletter')
                        );

                        return (
                          <div key={sub.id || i} className="p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <div className="text-white font-mono font-medium">{sub.email}</div>
                              <div className="text-zinc-500 text-[11px]">
                                Subscribed on {new Date(sub.subscribedAt).toLocaleDateString()} at {new Date(sub.subscribedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </div>

                            <a
                              href={alertUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-300 font-semibold text-[11px] transition-colors w-fit"
                            >
                              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                              <span>WhatsApp Alert</span>
                              <ExternalLink className="w-3 h-3 text-emerald-400" />
                            </a>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center py-10 text-zinc-500">No subscribers yet.</div>
                    )}
                  </div>
                </div>
              )}

              {/* 7. SETTINGS TAB */}
              {activeTab === 'settings' && (
                <div className="space-y-6 max-w-xl text-xs">
                  <form onSubmit={handleSaveSettings} className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg space-y-4">
                    <h3 className="font-brand text-xs font-bold uppercase tracking-wider text-white border-b border-zinc-800 pb-2">
                      Global Store Settings
                    </h3>

                    {settingsSavedToast && (
                      <div className="p-3 bg-emerald-950 border border-emerald-800 text-emerald-200 rounded flex items-center gap-2">
                        <Check className="w-4 h-4" />
                        <span>Settings saved successfully!</span>
                      </div>
                    )}

                    <div>
                      <label className="text-[11px] uppercase font-bold text-zinc-400 block mb-1">
                        Announcement Bar Notice
                      </label>
                      <textarea
                        rows={2}
                        value={announcementInput}
                        onChange={e => setAnnouncementInput(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] uppercase font-bold text-zinc-400 block mb-1">
                          Store Currency
                        </label>
                        <select
                          value={currencyInput}
                          onChange={e => setCurrencyInput(e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-white"
                        >
                          <option value="EGP">Egyptian Pound (EGP)</option>
                          <option value="USD">US Dollar (USD)</option>
                          <option value="EUR">Euro (EUR)</option>
                          <option value="SAR">Saudi Riyal (SAR)</option>
                          <option value="AED">UAE Dirham (AED)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] uppercase font-bold text-zinc-400 block mb-1">
                          Free Shipping Threshold
                        </label>
                        <input
                          type="number"
                          value={freeShippingInput}
                          onChange={e => setFreeShippingInput(Number(e.target.value))}
                          className="w-full bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-white"
                        />
                      </div>
                    </div>

                    {/* WhatsApp Notification Configuration */}
                    <div className="pt-4 border-t border-zinc-800 space-y-3">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-emerald-400" />
                        <h4 className="font-brand text-xs font-bold uppercase tracking-wider text-emerald-400">
                          WhatsApp Notification API Settings
                        </h4>
                      </div>

                      <p className="text-zinc-400 text-[11px] leading-relaxed">
                        Whenever someone puts their email in the newsletter drop box or completes an order checkout, an instant notification is dispatched to this WhatsApp phone number.
                      </p>

                      <div>
                        <label className="text-[11px] uppercase font-bold text-zinc-400 block mb-1">
                          Store Owner WhatsApp Phone Number
                        </label>
                        <input
                          type="text"
                          value={whatsappPhoneInput}
                          onChange={e => setWhatsappPhoneInput(e.target.value)}
                          placeholder="+20 100 000 0000"
                          className="w-full bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-white font-mono"
                        />
                        <span className="text-[10px] text-zinc-500 mt-1 block">
                          Supports Egyptian (+20 10X XXX XXXX) and international formats.
                        </span>
                      </div>

                      <label className="flex items-center gap-2 cursor-pointer pt-1">
                        <input
                          type="checkbox"
                          checked={enableAlertsInput}
                          onChange={e => setEnableAlertsInput(e.target.checked)}
                          className="text-emerald-500 rounded bg-zinc-950 border-zinc-700"
                        />
                        <span className="text-zinc-200 text-xs">
                          Enable automatic WhatsApp notification on customer email signup
                        </span>
                      </label>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase text-xs px-5 py-2.5 rounded transition-colors cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Store Settings</span>
                      </button>
                    </div>
                  </form>

                  {/* Test WhatsApp Alert Trigger Box */}
                  <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-brand text-xs font-bold uppercase tracking-wider text-zinc-300">
                        Test WhatsApp API Notification
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 text-[10px] uppercase font-mono">
                        Live Route /api/notify-whatsapp
                      </span>
                    </div>

                    <p className="text-zinc-400 text-[11px]">
                      Send a simulated subscriber notification for <strong className="text-zinc-200">sabitomar07@gmail.com</strong> to test your connection and verify the WhatsApp link.
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <button
                        type="button"
                        onClick={handleSendTestWhatsApp}
                        disabled={isSendingTest}
                        className="inline-flex items-center gap-2 bg-white hover:bg-zinc-200 text-black font-bold uppercase text-xs px-4 py-2 rounded transition-colors disabled:opacity-50 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{isSendingTest ? 'Sending Test...' : 'Send Test Notification'}</span>
                      </button>

                      {whatsappTestUrl && (
                        <a
                          href={whatsappTestUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded bg-emerald-900/60 hover:bg-emerald-900 text-emerald-300 border border-emerald-700 font-semibold text-xs transition-colors"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Open in WhatsApp</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                    {whatsappTestStatus && (
                      <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-300 font-mono">
                        {whatsappTestStatus}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

      </div>

      {/* Product Edit / Create Modal Sub-dialog */}
      {editingProduct && (
        <div className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-4">
          <form
            onSubmit={handleSaveProduct}
            className="bg-[#18181b] border border-zinc-700 rounded-lg max-w-2xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto text-xs"
          >
            <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
              <h3 className="font-brand text-sm font-bold uppercase text-white tracking-wider">
                {isCreatingProduct ? 'Create New Streetwear Piece' : `Edit: ${editingProduct.name}`}
              </h3>
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded p-2 text-white"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">Category</label>
                <select
                  value={editingProduct.category}
                  onChange={e => setEditingProduct({ ...editingProduct, category: e.target.value as Product['category'] })}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded p-2 text-white"
                >
                  <option value="Oversized T-Shirts">Oversized T-Shirts</option>
                  <option value="Graphic T-Shirts">Graphic T-Shirts</option>
                  <option value="Minimalist T-Shirts">Minimalist T-Shirts</option>
                  <option value="Hoodies">Hoodies</option>
                  <option value="Sweatshirts">Sweatshirts</option>
                  <option value="Long-Sleeve Shirts">Long-Sleeve Shirts</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">Description</label>
              <textarea
                rows={3}
                required
                value={editingProduct.description}
                onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-700 rounded p-2 text-white"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">Price</label>
                <input
                  type="number"
                  required
                  value={editingProduct.price}
                  onChange={e => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded p-2 text-white"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">Sale Price (Optional)</label>
                <input
                  type="number"
                  value={editingProduct.salePrice || ''}
                  onChange={e => setEditingProduct({ ...editingProduct, salePrice: e.target.value ? Number(e.target.value) : null })}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded p-2 text-white"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">Stock Units</label>
                <input
                  type="number"
                  required
                  value={editingProduct.stock}
                  onChange={e => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded p-2 text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">Image URL</label>
              <input
                type="url"
                required
                value={editingProduct.images[0] || ''}
                onChange={e => setEditingProduct({ ...editingProduct, images: [e.target.value] })}
                className="w-full bg-zinc-950 border border-zinc-700 rounded p-2 text-white"
              />
            </div>

            <div className="flex gap-4 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingProduct.isFeatured}
                  onChange={e => setEditingProduct({ ...editingProduct, isFeatured: e.target.checked })}
                  className="text-emerald-500 rounded"
                />
                <span>Featured on Homepage</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingProduct.isBestSeller}
                  onChange={e => setEditingProduct({ ...editingProduct, isBestSeller: e.target.checked })}
                  className="text-emerald-500 rounded"
                />
                <span>Mark as Best Seller</span>
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-zinc-800">
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase px-5 py-2 rounded"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
