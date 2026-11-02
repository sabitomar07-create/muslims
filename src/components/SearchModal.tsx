import React, { useState, useMemo, useEffect } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { formatPrice } from '../utils/cartRules';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  currency?: string;
}

const QUICK_TAGS = ['Oversized', 'Sabr', 'Heavyweight Hoodie', 'Tawhid', 'Black', 'Emerald', 'Minimalist', 'French Terry'];

export function SearchModal({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  currency = 'EGP'
}: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isOpen) {
      setSearchTerm('');
    }
  }, [isOpen]);

  const results = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return [];

    return products.filter(p => {
      const matchName = p.name.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchCat = p.category.toLowerCase().includes(q);
      const matchCol = p.collection.toLowerCase().includes(q);
      const matchColor = p.colors.some(c => c.name.toLowerCase().includes(q));
      return matchName || matchDesc || matchCat || matchCol || matchColor;
    }).slice(0, 8);
  }, [searchTerm, products]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 p-4 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#121214] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl text-zinc-100">
        
        {/* Search Header Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-zinc-800 gap-3">
          <Search className="w-5 h-5 text-emerald-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search streetwear by name, collection, fit or color..."
            className="flex-1 bg-transparent text-sm sm:text-base text-white placeholder-zinc-500 focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs uppercase tracking-wider font-bold text-zinc-400 hover:text-white px-2 py-1"
          >
            Esc
          </button>
        </div>

        {/* Quick Search Chips */}
        <div className="px-4 py-3 bg-zinc-900/60 border-b border-zinc-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 shrink-0">
            Suggested:
          </span>
          {QUICK_TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => setSearchTerm(tag)}
              className="shrink-0 px-2.5 py-1 rounded-full bg-zinc-800 text-[11px] text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-4 divide-y divide-zinc-800/60">
          {searchTerm.trim() ? (
            results.length > 0 ? (
              results.map(prod => (
                <div
                  key={prod.id}
                  onClick={() => {
                    onSelectProduct(prod);
                    onClose();
                  }}
                  className="py-3 px-2 flex items-center justify-between gap-4 hover:bg-zinc-900/70 rounded-lg cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      className="w-12 h-14 rounded object-cover bg-zinc-900 shrink-0"
                    />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold uppercase text-white group-hover:text-emerald-400 transition-colors">
                        {prod.name}
                      </h4>
                      <p className="text-[11px] text-zinc-400">
                        {prod.category} &bull; {prod.collection}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-right">
                    <div>
                      <span className="text-xs font-bold text-white block">
                        {formatPrice(prod.salePrice || prod.price, currency)}
                      </span>
                      {prod.salePrice && (
                        <span className="text-[10px] text-zinc-500 line-through">
                          {formatPrice(prod.price, currency)}
                        </span>
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-emerald-400 transition-colors" />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-zinc-400 text-xs">
                <p className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                  No matching drops found
                </p>
                <p>Try searching for terms like &ldquo;Hoodie&rdquo;, &ldquo;Oversized&rdquo;, &ldquo;Sabr&rdquo;, or &ldquo;Tawhid&rdquo;.</p>
              </div>
            )
          ) : (
            <div className="text-center py-10 text-zinc-500 text-xs">
              Type to instantly search our 48 original streetwear garments.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
