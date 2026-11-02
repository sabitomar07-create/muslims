import React, { useState, useEffect } from 'react';
import {
  X,
  Star,
  ShoppingBag,
  Heart,
  Truck,
  RefreshCw,
  ShieldCheck,
  Check,
  Ruler,
  AlertCircle,
  MessageSquarePlus
} from 'lucide-react';
import { Product, Review } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../utils/cartRules';
import { getReviewsForProduct, submitReview } from '../firebase/db';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  currency?: string;
  onSelectRelatedProduct?: (product: Product) => void;
  allProducts?: Product[];
}

export function ProductDetailModal({
  product,
  onClose,
  currency = 'EGP',
  onSelectRelatedProduct,
  allProducts = []
}: ProductDetailModalProps) {
  if (!product) return null;

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { currentUser } = useAuth();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [quantity, setQuantity] = useState(1);
  const [feedbackMessage, setFeedbackMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'fabric' | 'shipping' | 'reviews'>('details');

  // Size Guide Modal
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  // Reviews state
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewFit, setReviewFit] = useState<'Runs Small' | 'True to Size' | 'Runs Large'>('True to Size');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewSuccessMsg, setReviewSuccessMsg] = useState('');

  // Load reviews on mount or product change
  useEffect(() => {
    if (product) {
      getReviewsForProduct(product.id).then(setReviews);
    }
  }, [product]);

  // Find variant stock
  const currentVariant = product.variants.find(
    v => v.color === selectedColor && v.size === selectedSize
  );
  const stockAvailable = currentVariant ? currentVariant.stock : product.stock;

  const isFavorite = isInWishlist(product.id);
  const hasDiscount = Boolean(product.salePrice && product.salePrice < product.price);
  const discountPercent = hasDiscount
    ? Math.round(((product.price - (product.salePrice || 0)) / product.price) * 100)
    : 0;

  const handleAddToCart = () => {
    if (!selectedColor) {
      setFeedbackMessage({ text: 'Please choose a color.', isError: true });
      return;
    }
    if (!selectedSize) {
      setFeedbackMessage({ text: 'Please choose a size.', isError: true });
      return;
    }
    if (stockAvailable <= 0) {
      setFeedbackMessage({ text: 'Selected size is out of stock.', isError: true });
      return;
    }

    const res = addToCart(product, selectedColor, selectedSize, quantity);
    setFeedbackMessage({ text: res.message, isError: !res.success });

    setTimeout(() => {
      setFeedbackMessage(null);
    }, 3500);
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewTitle.trim() || !reviewComment.trim()) {
      alert('Please fill out both the review title and comments.');
      return;
    }

    setReviewSubmitting(true);
    try {
      const newRev = await submitReview({
        productId: product.id,
        productName: product.name,
        userId: currentUser?.uid || 'guest-user',
        userName: currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Verified Buyer',
        userEmail: currentUser?.email || 'customer@example.com',
        rating: reviewRating,
        title: reviewTitle.trim(),
        comment: reviewComment.trim(),
        fitFeedback: reviewFit,
        verifiedPurchase: true,
        status: 'approved' // Automatically approve so user and admin see it immediately
      });

      setReviews(prev => [newRev, ...prev]);
      setReviewTitle('');
      setReviewComment('');
      setIsReviewFormOpen(false);
      setReviewSuccessMsg('Thank you! Your review has been published.');
      setTimeout(() => setReviewSuccessMsg(''), 4000);
    } catch (err) {
      console.error('Failed to submit review', err);
      alert('Error submitting review. Please try again.');
    } finally {
      setReviewSubmitting(false);
    }
  };

  // Related products in same category
  const related = allProducts
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-5xl bg-[#121214] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl my-8 text-zinc-100 max-h-[92vh] flex flex-col">
        
        {/* Sticky Header with Close Button */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#121214]/95 backdrop-blur border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">
              {product.collection}
            </span>
            <span className="text-zinc-500">&bull;</span>
            <span className="text-xs text-zinc-400">{product.category}</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-colors cursor-pointer"
            aria-label="Close Product Details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-8 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Gallery Column */}
            <div className="lg:col-span-6 space-y-3">
              <div className="aspect-[3/4] w-full rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800 relative">
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />

                {hasDiscount && (
                  <span className="absolute top-4 left-4 bg-red-500 text-white font-extrabold text-xs uppercase tracking-wider px-2.5 py-1 rounded shadow">
                    SAVE {discountPercent}%
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-16 h-20 rounded border overflow-hidden shrink-0 transition-all ${
                        activeImageIndex === idx
                          ? 'border-emerald-400 ring-2 ring-emerald-400/30'
                          : 'border-zinc-800 hover:border-zinc-600 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info Column */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Title & Ratings */}
              <div className="space-y-2">
                <h1 className="font-brand text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-wide">
                  {product.name}
                </h1>

                <div className="flex items-center gap-3">
                  <div className="flex items-center text-amber-400">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= Math.round(product.rating)
                            ? 'fill-amber-400'
                            : 'text-zinc-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-zinc-300">
                    {product.rating} / 5.0
                  </span>
                  <span className="text-xs text-zinc-500">
                    ({reviews.length || product.reviewCount} customer reviews)
                  </span>
                </div>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 py-2 border-y border-zinc-800">
                {hasDiscount ? (
                  <>
                    <span className="text-2xl sm:text-3xl font-extrabold text-white">
                      {formatPrice(product.salePrice!, currency)}
                    </span>
                    <span className="text-lg text-zinc-500 line-through">
                      {formatPrice(product.price, currency)}
                    </span>
                  </>
                ) : (
                  <span className="text-2xl sm:text-3xl font-extrabold text-white">
                    {formatPrice(product.price, currency)}
                  </span>
                )}
                <span className="text-xs text-emerald-400 font-semibold ml-auto">
                  Taxes Included
                </span>
              </div>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {product.description}
              </p>

              {/* Color Selection */}
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="font-bold uppercase tracking-wider text-zinc-400">
                    Color: <span className="text-white">{selectedColor}</span>
                  </span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {product.colors.map(color => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded border text-xs font-semibold transition-all cursor-pointer ${
                        selectedColor === color.name
                          ? 'border-emerald-400 bg-emerald-500/10 text-white'
                          : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/40"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="font-bold uppercase tracking-wider text-zinc-400">
                    Size: <span className="text-white">{selectedSize}</span>
                  </span>
                  <button
                    onClick={() => setShowSizeGuide(true)}
                    className="text-emerald-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Size Guide</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => {
                    const variant = product.variants.find(
                      v => v.color === selectedColor && v.size === size
                    );
                    const isOutOfStock = variant ? variant.stock <= 0 : product.stock <= 0;

                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        disabled={isOutOfStock}
                        className={`w-12 h-11 rounded border text-xs font-bold transition-all cursor-pointer ${
                          selectedSize === size
                            ? 'bg-white text-black border-white shadow'
                            : isOutOfStock
                            ? 'bg-zinc-950 text-zinc-600 border-zinc-900 line-through cursor-not-allowed'
                            : 'bg-zinc-900 text-zinc-200 border-zinc-800 hover:border-zinc-700'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>

                {/* Stock status indicator */}
                <div className="mt-2 text-xs flex items-center gap-1.5">
                  {stockAvailable > 5 ? (
                    <span className="text-emerald-400 flex items-center gap-1 font-medium">
                      <Check className="w-3.5 h-3.5" /> In Stock & Ready to Ship
                    </span>
                  ) : stockAvailable > 0 ? (
                    <span className="text-amber-400 font-medium">
                      Only {stockAvailable} items left in this size!
                    </span>
                  ) : (
                    <span className="text-red-400 font-medium">
                      Out of Stock in this combination
                    </span>
                  )}
                </div>
              </div>

              {/* Quantity and Actions */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-zinc-800 bg-zinc-900 rounded">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="px-3.5 py-2.5 text-zinc-400 hover:text-white font-bold text-sm"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-extrabold text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(q => Math.min(stockAvailable, q + 1))}
                      className="px-3.5 py-2.5 text-zinc-400 hover:text-white font-bold text-sm"
                      disabled={quantity >= stockAvailable}
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    disabled={stockAvailable <= 0}
                    className={`flex-1 flex items-center justify-center gap-2 font-extrabold text-xs uppercase tracking-widest py-3.5 px-6 rounded transition-all cursor-pointer ${
                      stockAvailable <= 0
                        ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                        : 'bg-white text-black hover:bg-emerald-400 hover:text-black shadow-lg'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{stockAvailable <= 0 ? 'Out of Stock' : 'Add to Cart'}</span>
                  </button>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-3.5 rounded border border-zinc-800 transition-colors cursor-pointer ${
                      isFavorite
                        ? 'bg-red-500/20 text-red-400 border-red-500/40'
                        : 'bg-zinc-900 text-zinc-400 hover:text-white'
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Feedback Toast */}
                {feedbackMessage && (
                  <div
                    className={`p-3 rounded text-xs flex items-center gap-2 ${
                      feedbackMessage.isError
                        ? 'bg-red-950/60 border border-red-800 text-red-200'
                        : 'bg-emerald-950/60 border border-emerald-800 text-emerald-200'
                    }`}
                  >
                    {feedbackMessage.isError ? (
                      <AlertCircle className="w-4 h-4 shrink-0" />
                    ) : (
                      <Check className="w-4 h-4 shrink-0" />
                    )}
                    <span>{feedbackMessage.text}</span>
                  </div>
                )}
              </div>

              {/* Guarantees Box */}
              <div className="grid grid-cols-2 gap-3 pt-3 text-[11px] text-zinc-400 border-t border-zinc-800">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Free Shipping on orders &gt; 1200 EGP</span>
                </div>
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Hassle-Free 14-Day Returns</span>
                </div>
              </div>

            </div>
          </div>

          {/* Product Tabs: Details, Fabric, Shipping, Reviews */}
          <div className="pt-8 border-t border-zinc-800">
            <div className="flex space-x-6 border-b border-zinc-800 pb-2">
              <button
                onClick={() => setActiveTab('details')}
                className={`text-xs uppercase tracking-wider font-bold pb-2 transition-colors cursor-pointer ${
                  activeTab === 'details'
                    ? 'text-white border-b-2 border-emerald-400'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('fabric')}
                className={`text-xs uppercase tracking-wider font-bold pb-2 transition-colors cursor-pointer ${
                  activeTab === 'fabric'
                    ? 'text-white border-b-2 border-emerald-400'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                Fabric & Fit
              </button>
              <button
                onClick={() => setActiveTab('shipping')}
                className={`text-xs uppercase tracking-wider font-bold pb-2 transition-colors cursor-pointer ${
                  activeTab === 'shipping'
                    ? 'text-white border-b-2 border-emerald-400'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                Shipping & Returns
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`text-xs uppercase tracking-wider font-bold pb-2 transition-colors cursor-pointer ${
                  activeTab === 'reviews'
                    ? 'text-white border-b-2 border-emerald-400'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                Reviews ({reviews.length})
              </button>
            </div>

            {/* Tab Contents */}
            <div className="py-5 text-xs sm:text-sm text-zinc-300">
              {activeTab === 'details' && (
                <ul className="space-y-2 list-disc list-inside">
                  {product.details?.map((detail, idx) => (
                    <li key={idx} className="text-zinc-300">{detail}</li>
                  )) || (
                    <>
                      <li>Heavyweight luxury cotton construction</li>
                      <li>Drop shoulder modest streetwear silhouette</li>
                      <li>Preshrunk to retain original shape over multiple washes</li>
                      <li>Custom high-density embroidery and screen print</li>
                    </>
                  )}
                </ul>
              )}

              {activeTab === 'fabric' && (
                <div className="space-y-3">
                  <p><strong>Fabric:</strong> {product.fabric || '100% Organic Combed Heavyweight Cotton (280-460 GSM)'}</p>
                  <p><strong>Cut:</strong> {product.fit || 'Oversized Streetwear Boxy Fit'}</p>
                  <p><strong>Care Instructions:</strong> Machine wash cold with similar dark colors. Do not bleach. Tumble dry low or line dry in shade. Cool iron on reverse side, never iron directly on print or embroidery.</p>
                </div>
              )}

              {activeTab === 'shipping' && (
                <div className="space-y-3">
                  <p><strong>Cairo & Giza Delivery:</strong> 1-2 business days (Standard fee: 60 EGP, Free over 1200 EGP).</p>
                  <p><strong>Alexandria & Delta:</strong> 2-3 business days.</p>
                  <p><strong>Upper Egypt & Red Sea:</strong> 3-4 business days.</p>
                  <p><strong>Returns & Exchanges:</strong> 14 days from delivery date with original tags attached and garment unworn.</p>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  {/* Reviews Header & Action */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900/60 p-4 rounded-lg border border-zinc-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-black text-white">{product.rating}</span>
                        <div className="flex text-amber-400">
                          {[1, 2, 3, 4, 5].map(s => (
                            <Star key={s} className="w-4 h-4 fill-amber-400" />
                          ))}
                        </div>
                        <span className="text-xs text-zinc-400">
                          Based on {reviews.length} reviews
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1">
                        100% of reviewers recommend this piece.
                      </p>
                    </div>

                    <button
                      onClick={() => setIsReviewFormOpen(!isReviewFormOpen)}
                      className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded transition-colors cursor-pointer"
                    >
                      <MessageSquarePlus className="w-4 h-4" />
                      <span>Write a Review</span>
                    </button>
                  </div>

                  {reviewSuccessMsg && (
                    <div className="p-3 bg-emerald-950/70 border border-emerald-800 text-emerald-200 text-xs rounded">
                      {reviewSuccessMsg}
                    </div>
                  )}

                  {/* Review Submission Form */}
                  {isReviewFormOpen && (
                    <form onSubmit={handleReviewSubmit} className="bg-zinc-900 p-5 rounded-lg border border-zinc-800 space-y-4">
                      <h3 className="text-sm font-bold uppercase text-white tracking-wider">
                        Share Your Honest Experience
                      </h3>

                      {/* Star Rating Selector */}
                      <div>
                        <label className="text-xs text-zinc-400 block mb-1">Your Rating</label>
                        <div className="flex items-center gap-1.5">
                          {[1, 2, 3, 4, 5].map(star => (
                            <button
                              type="button"
                              key={star}
                              onClick={() => setReviewRating(star)}
                              className="p-1 text-amber-400 hover:scale-110 transition-transform"
                            >
                              <Star
                                className={`w-5 h-5 ${
                                  star <= reviewRating ? 'fill-amber-400' : 'text-zinc-600'
                                }`}
                              />
                            </button>
                          ))}
                          <span className="text-xs font-semibold text-zinc-300 ml-2">
                            {reviewRating} out of 5 stars
                          </span>
                        </div>
                      </div>

                      {/* Fit Feedback */}
                      <div>
                        <label className="text-xs text-zinc-400 block mb-1">How did it fit?</label>
                        <div className="flex gap-2">
                          {(['Runs Small', 'True to Size', 'Runs Large'] as const).map(fitOption => (
                            <button
                              type="button"
                              key={fitOption}
                              onClick={() => setReviewFit(fitOption)}
                              className={`px-3 py-1.5 rounded text-xs font-semibold border transition-colors ${
                                reviewFit === fitOption
                                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500'
                                  : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                              }`}
                            >
                              {fitOption}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Review Title */}
                      <div>
                        <label className="text-xs text-zinc-400 block mb-1">Headline</label>
                        <input
                          type="text"
                          value={reviewTitle}
                          onChange={e => setReviewTitle(e.target.value)}
                          placeholder="e.g. Best streetwear hoodie ever"
                          required
                          className="w-full bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                        />
                      </div>

                      {/* Review Comment */}
                      <div>
                        <label className="text-xs text-zinc-400 block mb-1">Your Review</label>
                        <textarea
                          rows={3}
                          value={reviewComment}
                          onChange={e => setReviewComment(e.target.value)}
                          placeholder="Tell others about the weight, fabric feel, drape, and quality..."
                          required
                          className="w-full bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsReviewFormOpen(false)}
                          className="px-4 py-2 text-xs text-zinc-400 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={reviewSubmitting}
                          className="bg-white text-black hover:bg-emerald-400 text-xs font-bold uppercase tracking-wider px-5 py-2 rounded transition-colors"
                        >
                          {reviewSubmitting ? 'Posting...' : 'Submit Review'}
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Reviews List */}
                  <div className="space-y-4">
                    {reviews.length > 0 ? (
                      reviews.map(rev => (
                        <div
                          key={rev.id}
                          className="p-4 bg-zinc-900/40 border border-zinc-800/80 rounded-lg space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white text-xs">{rev.userName}</span>
                              {rev.verifiedPurchase && (
                                <span className="bg-emerald-500/10 text-emerald-400 text-[10px] px-2 py-0.5 rounded font-semibold border border-emerald-500/20">
                                  Verified Buyer
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-zinc-500">
                              {new Date(rev.createdAt).toLocaleDateString()}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="flex text-amber-400">
                              {[1, 2, 3, 4, 5].map(s => (
                                <Star
                                  key={s}
                                  className={`w-3.5 h-3.5 ${
                                    s <= rev.rating ? 'fill-amber-400' : 'text-zinc-700'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="font-bold text-white text-xs">{rev.title}</span>
                          </div>

                          <p className="text-xs text-zinc-300 leading-relaxed">{rev.comment}</p>

                          {rev.fitFeedback && (
                            <div className="text-[11px] text-zinc-400 pt-1">
                              Fit: <span className="text-zinc-200">{rev.fitFeedback}</span>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-zinc-500 text-center py-6">
                        No reviews yet. Be the first to share your experience with this piece!
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Products Carousel */}
          {related.length > 0 && (
            <div className="pt-8 border-t border-zinc-800">
              <h3 className="font-brand text-sm font-bold uppercase text-white tracking-wider mb-4">
                You May Also Like
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {related.map(rel => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      if (onSelectRelatedProduct) onSelectRelatedProduct(rel);
                    }}
                    className="group cursor-pointer bg-zinc-900 border border-zinc-800 rounded p-2 hover:border-zinc-700 transition-all"
                  >
                    <div className="aspect-[3/4] rounded overflow-hidden bg-black mb-2">
                      <img
                        src={rel.images[0]}
                        alt={rel.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <h4 className="text-xs font-bold text-white line-clamp-1 uppercase">
                      {rel.name}
                    </h4>
                    <p className="text-xs text-zinc-400 font-semibold mt-0.5">
                      {formatPrice(rel.salePrice || rel.price, currency)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Size Guide Modal Sub-dialog */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-60 bg-black/85 flex items-center justify-center p-4">
          <div className="bg-[#18181b] border border-zinc-700 rounded-lg max-w-lg w-full p-6 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
              <h3 className="font-brand text-sm font-bold uppercase text-white tracking-wider">
                Streetwear Oversized Fit Guide
              </h3>
              <button
                onClick={() => setShowSizeGuide(false)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-zinc-300">
              All MUSLIMS SHIRTS garments are intentionally engineered with a dropped shoulder and relaxed boxy drape. If you prefer a fitted traditional look, consider sizing down one size.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-zinc-900 text-zinc-400 uppercase font-bold text-[10px]">
                  <tr>
                    <th className="p-2">Size</th>
                    <th className="p-2">Chest Width (cm)</th>
                    <th className="p-2">Length (cm)</th>
                    <th className="p-2">Sleeve (cm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800 text-zinc-300">
                  <tr>
                    <td className="p-2 font-bold text-white">S</td>
                    <td className="p-2">56</td>
                    <td className="p-2">72</td>
                    <td className="p-2">24</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-white">M</td>
                    <td className="p-2">59</td>
                    <td className="p-2">74</td>
                    <td className="p-2">25</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-white">L</td>
                    <td className="p-2">62</td>
                    <td className="p-2">76</td>
                    <td className="p-2">26</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-white">XL</td>
                    <td className="p-2">65</td>
                    <td className="p-2">78</td>
                    <td className="p-2">27</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-white">XXL</td>
                    <td className="p-2">68</td>
                    <td className="p-2">80</td>
                    <td className="p-2">28</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button
              onClick={() => setShowSizeGuide(false)}
              className="w-full bg-white text-black font-bold uppercase text-xs py-2.5 rounded"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
