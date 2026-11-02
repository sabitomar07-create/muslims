import React from 'react';
import { Compass, Feather, Layers, Sparkles } from 'lucide-react';

export function BrandStorySection() {
  return (
    <section id="our-story" className="py-20 sm:py-28 bg-[#0a0a0c] border-b border-zinc-800 text-zinc-100 relative overflow-hidden">
      {/* Background Islamic Geometric Watermark */}
      <div className="absolute -right-24 -top-24 w-96 h-96 opacity-5 pointer-events-none rounded-full border-[30px] border-white/20 blur-sm" />
      <div className="absolute -left-24 -bottom-24 w-96 h-96 opacity-5 pointer-events-none rounded-full border-[30px] border-emerald-500/20 blur-sm" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="text-xs uppercase font-bold tracking-[0.3em] text-emerald-400">
            THE MANIFESTO &bull; بيان الهوية
          </span>
          <h2 className="font-brand text-3xl sm:text-5xl font-extrabold uppercase text-white tracking-wide">
            WEAR YOUR IDENTITY WITH UNCOMPROMISING CRAFT.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
            MUSLIMS SHIRTS was founded on a simple realization: young Muslims and streetwear enthusiasts shouldn&rsquo;t have to choose between genuine modesty and cutting-edge fashion design.
          </p>
        </div>

        {/* Story Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-[#121214] border border-zinc-800 p-8 rounded-xl space-y-4 relative group hover:border-zinc-600 transition-all">
            <div className="w-12 h-12 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-brand text-base font-bold uppercase tracking-wider text-white">
              Faith-Rooted Meaning
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Every graphic, micro-detail, and typography choice draws from timeless principles of Tawhid (unity), Sabr (steadfast patience), and Ihsan (excellence in action), rendered through sleek contemporary design.
            </p>
          </div>

          <div className="bg-[#121214] border border-zinc-800 p-8 rounded-xl space-y-4 relative group hover:border-zinc-600 transition-all">
            <div className="w-12 h-12 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="font-brand text-base font-bold uppercase tracking-wider text-white">
              Modest Streetwear Geometry
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Engineered with intentionally relaxed boxy drape, dropped shoulder seams, and extended coverage. Garments that drape effortlessly without cling, feeling comfortable in prayer, university, or on the city street.
            </p>
          </div>

          <div className="bg-[#121214] border border-zinc-800 p-8 rounded-xl space-y-4 relative group hover:border-zinc-600 transition-all">
            <div className="w-12 h-12 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <Feather className="w-6 h-6" />
            </div>
            <h3 className="font-brand text-base font-bold uppercase tracking-wider text-white">
              Heavyweight Luxury Handfeel
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              We exclusively mill 280 to 480 GSM Egyptian and organic French terry cotton. Ultra-dense collars that never bacon, reinforced flatlock seams, and rich garment-dye palettes built for years of wear.
            </p>
          </div>

        </div>

        {/* Arabic Typography Banner */}
        <div className="mt-16 bg-gradient-to-r from-zinc-900 via-zinc-900/80 to-zinc-900 border border-zinc-800 rounded-xl p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="font-arabic text-2xl sm:text-3xl text-emerald-400 font-bold block">
              &ldquo;إِنَّ اللَّهَ جَمِيلٌ يُحِبُّ الْجَمَالَ&rdquo;
            </span>
            <p className="text-xs text-zinc-400">
              &ldquo;God is beautiful and He loves beauty.&rdquo; &bull; Authentic inspiration for contemporary streetwear culture.
            </p>
          </div>

          <div className="shrink-0">
            <span className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase border border-zinc-800 px-3 py-1.5 rounded">
              CAIRO &bull; LONDON &bull; GLOBAL
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
