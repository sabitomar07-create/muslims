import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, X, RotateCcw, ChevronDown } from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  activeCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  onQuickView: (product: Product) => void;
  searchQuery?: string;
  onClearSearch?: () => void;
  currency?: string;
}

type SortOption = 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'bestseller' | 'rating';

const ALL_SIZES = ['S', 'M', 'L', 'XL', 'XXL'];
const ALL_CATEGORIES: ProductCategory[] = [
  'All',
  'Oversized T-Shirts',
  'Graphic T-Shirts',
  'Minimalist T-Shirts',
  'Hoodies',
  'Sweatshirts',
  'Long-Sleeve Shirts',
  'Accessories'
];

export function ProductGrid({
  products,
  activeCategory,
  onSelectCategory,
  onQuickView,
  searchQuery = '',
  onClearSearch,
  currency = 'EGP'
}: ProductGridProps) {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [onlyOnSale, setOnlyOnSale] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [showFilterDrawer, setShowFilterDrawer] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState<number>(16);

  // Toggle size filter
  const toggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    onSelectCategory('All');
    setSelectedSizes([]);
    setOnlyInStock(false);
    setOnlyOnSale(false);
    setSortBy('featured');
    if (onClearSearch) onClearSearch();
  };

  const hasActiveFilters = Boolean(
    activeCategory !== 'All' ||
    selectedSizes.length > 0 ||
    onlyInStock ||
    onlyOnSale ||
    searchQuery.trim().length > 0
  );

  // Filter and sort computation
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // 1. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        const matchesCat = p.category.toLowerCase().includes(q);
        const matchesCol = p.collection.toLowerCase().includes(q);
        const matchesColor = p.colors.some(c => c.name.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesCat && !matchesCol && !matchesColor) {
          return false;
        }
      }

      // 2. Category
      if (activeCategory !== 'All' && p.category !== activeCategory) {
        return false;
      }

      // 3. Size
      if (selectedSizes.length > 0) {
        const hasMatchingSize = p.sizes.some(s => selectedSizes.includes(s));
        if (!hasMatchingSize) return false;
      }

      // 4. In Stock
      if (onlyInStock && p.stock <= 0) {
        return false;
      }

      // 5. On Sale
      if (onlyOnSale && (!p.salePrice || p.salePrice >= p.price)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = a.salePrice || a.price;
      const priceB = b.salePrice || b.price;

      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'price-asc':
          return priceA - priceB;
        case 'price-desc':
          return priceB - priceA;
        case 'bestseller':
          return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
        case 'rating':
          return b.rating - a.rating;
        case 'featured':
        default:
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
    });
  }, [products, searchQuery, activeCategory, selectedSizes, onlyInStock, onlyOnSale, sortBy]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  return (
    <section id="shop-catalog" className="py-12 sm:py-16 bg-[#0d0d0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
          <div>
            <h2 className="font-brand text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-wide">
              {activeCategory === 'All' ? 'Streetwear Catalog' : activeCategory}
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Showing {displayedProducts.length} of {filteredProducts.length} pieces
              {searchQuery && <span> matching &ldquo;{searchQuery}&rdquo;</span>}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Filter Toggle Mobile/Desktop */}
            <button
              onClick={() => setShowFilterDrawer(!showFilterDrawer)}
              className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-400" />
              <span>Filters</span>
              {(selectedSizes.length > 0 || onlyInStock || onlyOnSale) && (
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as SortOption)}
                aria-label="Sort products by"
                className="appearance-none bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs font-semibold px-4 py-2 pr-8 rounded focus:outline-none focus:border-zinc-600 uppercase tracking-wider cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="newest">Newest Drops</option>
                <option value="bestseller">Best Sellers</option>
                <option value="rating">Highest Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="py-4 flex items-center space-x-2 overflow-x-auto no-scrollbar border-b border-zinc-800/60">
          {ALL_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-white text-black shadow'
                  : 'bg-zinc-900/90 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Expandable Filter Panel */}
        {showFilterDrawer && (
          <div className="bg-[#121214] border border-zinc-800 rounded-lg p-5 my-6 space-y-5 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-300">
                Refine Selection
              </span>
              <button
                onClick={resetFilters}
                className="text-xs text-zinc-400 hover:text-emerald-400 flex items-center gap-1 font-semibold transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Sizes Filter */}
              <div>
                <span className="text-xs uppercase font-bold text-zinc-400 block mb-2 tracking-wider">
                  Select Size
                </span>
                <div className="flex flex-wrap gap-2">
                  {ALL_SIZES.map(size => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`w-9 h-9 rounded text-xs font-bold border transition-colors cursor-pointer ${
                        selectedSizes.includes(size)
                          ? 'bg-emerald-400 text-black border-emerald-400'
                          : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div>
                <span className="text-xs uppercase font-bold text-zinc-400 block mb-2 tracking-wider">
                  Availability & Offers
                </span>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={onlyInStock}
                      onChange={e => setOnlyInStock(e.target.checked)}
                      className="rounded border-zinc-700 bg-zinc-900 text-emerald-500 focus:ring-emerald-400"
                    />
                    <span>In Stock Only</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={onlyOnSale}
                      onChange={e => setOnlyOnSale(e.target.checked)}
                      className="rounded border-zinc-700 bg-zinc-900 text-emerald-500 focus:ring-emerald-400"
                    />
                    <span>Sale & Promotional Drops</span>
                  </label>
                </div>
              </div>

              {/* Active Badges */}
              <div>
                <span className="text-xs uppercase font-bold text-zinc-400 block mb-2 tracking-wider">
                  Active Filters
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeCategory !== 'All' && (
                    <span className="inline-flex items-center gap-1 bg-zinc-800 text-zinc-200 text-[11px] px-2.5 py-1 rounded">
                      {activeCategory}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => onSelectCategory('All')} />
                    </span>
                  )}
                  {selectedSizes.map(s => (
                    <span key={s} className="inline-flex items-center gap-1 bg-zinc-800 text-zinc-200 text-[11px] px-2.5 py-1 rounded">
                      Size: {s}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => toggleSize(s)} />
                    </span>
                  ))}
                  {onlyInStock && (
                    <span className="inline-flex items-center gap-1 bg-zinc-800 text-zinc-200 text-[11px] px-2.5 py-1 rounded">
                      In Stock
                      <X className="w-3 h-3 cursor-pointer" onClick={() => setOnlyInStock(false)} />
                    </span>
                  )}
                  {onlyOnSale && (
                    <span className="inline-flex items-center gap-1 bg-zinc-800 text-zinc-200 text-[11px] px-2.5 py-1 rounded">
                      On Sale
                      <X className="w-3 h-3 cursor-pointer" onClick={() => setOnlyOnSale(false)} />
                    </span>
                  )}
                  {!hasActiveFilters && (
                    <span className="text-xs text-zinc-500">None</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Product Grid Layout */}
        {displayedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-6">
            {displayedProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                currency={currency}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        ) : (
          /* Empty Search / Filter State */
          <div className="text-center py-20 bg-[#121214] border border-zinc-800 rounded-lg p-8 my-6">
            <div className="w-12 h-12 rounded-full bg-zinc-800 text-zinc-400 mx-auto flex items-center justify-center mb-3">
              <Filter className="w-6 h-6" />
            </div>
            <h3 className="font-brand text-lg font-bold uppercase text-white tracking-wider">
              No matching pieces found
            </h3>
            <p className="text-xs text-zinc-400 max-w-md mx-auto mt-1 mb-6">
              We couldn&rsquo;t find anything matching your exact filter combination. Try clearing your filters or exploring our other drops.
            </p>
            <button
              onClick={resetFilters}
              className="bg-white text-black text-xs font-bold uppercase tracking-widest px-6 py-2.5 rounded hover:bg-emerald-400 transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center pt-12">
            <button
              onClick={() => setVisibleCount(prev => prev + 16)}
              className="inline-flex items-center justify-center bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-700/80 text-xs uppercase tracking-widest font-extrabold px-8 py-3.5 rounded transition-all cursor-pointer"
            >
              Load More Pieces ({filteredProducts.length - displayedProducts.length} remaining)
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
