import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ProductCategory } from '../types';

interface CategoryCardData {
  title: string;
  category: ProductCategory;
  description: string;
  image: string;
  count: string;
}

const CATEGORIES: CategoryCardData[] = [
  {
    title: 'Oversized T-Shirts',
    category: 'Oversized T-Shirts',
    description: '280-310 GSM Drop-Shoulder Silhouettes',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    count: '6 Styles'
  },
  {
    title: 'Heavyweight Hoodies',
    category: 'Hoodies',
    description: '440-480 GSM Thermal Fleece & French Terry',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    count: '12 Styles'
  },
  {
    title: 'Minimalist T-Shirts',
    category: 'Minimalist T-Shirts',
    description: 'Micro Kufic Typography & Clean Tonal Hues',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
    count: '6 Styles'
  },
  {
    title: 'Graphic T-Shirts',
    category: 'Graphic T-Shirts',
    description: 'Islamic Geometry & Bold Statements',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
    count: '5 Styles'
  },
  {
    title: 'Sweatshirts & Crews',
    category: 'Sweatshirts',
    description: '380-420 GSM Boxy Streetwear Layers',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80',
    count: '8 Styles'
  },
  {
    title: 'Long-Sleeve Shirts',
    category: 'Long-Sleeve Shirts',
    description: 'Mockneck & Sleeve Calligraphy Pieces',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80',
    count: '6 Styles'
  },
  {
    title: 'Streetwear Accessories',
    category: 'Accessories',
    description: 'Canvas Totes, 5-Panel Caps, Jacquard Scarves',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80',
    count: '6 Styles'
  }
];

interface CategorySectionProps {
  onSelectCategory: (cat: ProductCategory) => void;
}

export function CategorySection({ onSelectCategory }: CategorySectionProps) {
  return (
    <section className="py-16 sm:py-24 bg-[#0d0d0f] border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-zinc-800">
          <div>
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-emerald-400">
              EXPLORE OUR CUTS
            </span>
            <h2 className="font-brand text-2xl sm:text-4xl font-extrabold uppercase text-white tracking-wide mt-1">
              SHOP BY CATEGORY
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md mt-2 sm:mt-0">
            Tailored specifically for modest contemporary street fashion with heavyweight luxury textures.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => onSelectCategory(cat.category)}
              className="group relative h-72 sm:h-80 rounded-lg overflow-hidden cursor-pointer border border-zinc-800 bg-zinc-900 shadow-md hover:border-zinc-600 transition-all duration-300"
            >
              {/* Category Background Image */}
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-[0.7] group-hover:brightness-[0.85]"
                loading="lazy"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              {/* Floating content */}
              <div className="absolute inset-0 p-5 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-300 bg-black/60 px-2.5 py-1 rounded backdrop-blur-sm">
                    {cat.count}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-emerald-400 text-white group-hover:text-black flex items-center justify-center transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className="font-brand text-lg font-bold uppercase tracking-wider text-white group-hover:text-emerald-300 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-zinc-300 line-clamp-1 mt-0.5">
                    {cat.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
