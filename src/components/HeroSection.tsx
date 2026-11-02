import React from 'react';
import { ArrowRight, Flame, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

interface HeroSectionProps {
  onShopNow: () => void;
  onExploreCollection: () => void;
}

export function HeroSection({ onShopNow, onExploreCollection }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#0d0d0f] border-b border-zinc-800/80">
      {/* Background Graphic Overlay */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-700/70 text-xs font-semibold text-emerald-400 uppercase tracking-widest">
              <Flame className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
              <span>THE TAWHID & SABR CHAPTER 1 DROP</span>
            </div>

            <div className="space-y-3">
              <h1 className="font-brand text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase leading-[1.05]">
                WEAR YOUR <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
                  IDENTITY.
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-zinc-300 max-w-xl font-normal leading-relaxed">
                Modern streetwear. Meaningful design. Engineered with ultra-heavyweight combed cotton, relaxed dropped shoulders, and faith-inspired contemporary calligraphy.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onShopNow}
                className="inline-flex items-center justify-center gap-3 bg-white text-black hover:bg-emerald-400 hover:text-black font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded transition-all duration-300 shadow-xl group cursor-pointer"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onExploreCollection}
                className="inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-700/80 font-bold text-xs uppercase tracking-widest px-8 py-4 rounded transition-all cursor-pointer"
              >
                EXPLORE COLLECTION
              </button>
            </div>

            {/* Trust Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-zinc-800/80 text-zinc-400 text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>280-480 GSM Cotton</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Free Express Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>14-Day Free Exchange</span>
              </div>
            </div>
          </div>

          {/* Right Visual Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Backing decorative glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-zinc-600/20 rounded-2xl blur-xl opacity-60" />

              <div className="relative rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80"
                  alt="MUSLIMS SHIRTS Heavyweight Streetwear Hoodie"
                  className="w-full h-[450px] sm:h-[520px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />

                {/* Editorial floating card */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#121214]/90 backdrop-blur-md p-4 rounded-lg border border-zinc-700/70 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">
                      FEATURED PIECE
                    </span>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      Tawhid Heavyweight Hoodie
                    </h3>
                    <p className="text-xs text-zinc-400">460 GSM Fleece &bull; French Terry</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-white">1,250 EGP</span>
                    <span className="block text-[11px] text-zinc-500 line-through">1,450 EGP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
