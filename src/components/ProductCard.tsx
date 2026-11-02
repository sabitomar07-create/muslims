import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';
import { Product } from '../types';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice } from '../utils/cartRules';

interface ProductCardProps {
  product: Product;
  currency?: string;
  onQuickView: (product: Product) => void;
  onAddToCartDirect?: (product: Product) => void;
}

export function ProductCard({
  product,
  currency = 'EGP',
  onQuickView,
  onAddToCartDirect
}: ProductCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const isFavorite = isInWishlist(product.id);

  // Discount calculation
  const hasDiscount = Boolean(product.salePrice && product.salePrice < product.price);
  const discountPercent = hasDiscount
    ? Math.round(((product.price - (product.salePrice || 0)) / product.price) * 100)
    : 0;

  const activeColor = product.colors[selectedColorIndex];
  const currentImage = (activeColor?.image) || product.images[0];

  return (
    <article className="group relative bg-[#121214] border border-zinc-800/80 rounded-lg overflow-hidden flex flex-col transition-all duration-300 hover:border-zinc-600 hover:shadow-2xl">
      {/* Image Container */}
      <div 
        className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-900 cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        {!imageError ? (
          <img
            src={currentImage}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-zinc-950 text-zinc-400">
            <span className="font-brand text-xs tracking-widest text-emerald-400 uppercase">MUSLIMS SHIRTS</span>
            <span className="text-sm font-bold text-white mt-1 uppercase">{product.name}</span>
            <span className="text-xs text-zinc-500 mt-1">{product.category}</span>
          </div>
        )}

        {/* Badges Container */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {hasDiscount && (
            <span className="bg-red-500/90 text-white font-extrabold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded backdrop-blur-sm shadow">
              SAVE {discountPercent}%
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-emerald-500 text-black font-extrabold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded shadow">
              NEW DROP
            </span>
          )}
          {product.isBestSeller && !product.isNewArrival && (
            <span className="bg-zinc-800/90 text-white font-semibold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded backdrop-blur-sm border border-zinc-700">
              BEST SELLER
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-300 z-10 ${
            isFavorite
              ? 'bg-red-500/90 text-white'
              : 'bg-black/40 text-zinc-300 hover:text-white hover:bg-black/70'
          }`}
          aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Hover Bar */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex-1 bg-white/95 hover:bg-white text-black text-xs font-bold uppercase tracking-wider py-2.5 px-3 rounded shadow-lg flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
            <span className="uppercase text-[10px] tracking-wider font-semibold text-emerald-400">
              {product.category}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="text-[11px] font-medium text-zinc-300">{product.rating}</span>
              <span className="text-[10px] text-zinc-500">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => onQuickView(product)}
            className="font-brand text-sm font-bold uppercase tracking-wide text-white hover:text-emerald-400 transition-colors line-clamp-1 cursor-pointer"
          >
            {product.name}
          </h3>

          {/* Subtitle / Fabric info */}
          <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">
            {product.fabric || product.collection}
          </p>
        </div>

        {/* Colors and Pricing Row */}
        <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between">
          {/* Color Swatches */}
          <div className="flex items-center space-x-1.5">
            {product.colors.map((c, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColorIndex(i);
                }}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColorIndex === i
                    ? 'border-emerald-400 ring-2 ring-emerald-400/30 scale-110'
                    : 'border-zinc-600 hover:border-zinc-400'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
                aria-label={`Select color ${c.name}`}
              />
            ))}
          </div>

          {/* Price */}
          <div className="text-right">
            {hasDiscount ? (
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-zinc-500 line-through">
                  {formatPrice(product.price, currency)}
                </span>
                <span className="text-sm font-bold text-white">
                  {formatPrice(product.salePrice!, currency)}
                </span>
              </div>
            ) : (
              <span className="text-sm font-bold text-white">
                {formatPrice(product.price, currency)}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
