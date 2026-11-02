import React from 'react';
import { Instagram, Twitter, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { ProductCategory } from '../types';

interface FooterProps {
  onSelectCategory: (cat: ProductCategory) => void;
  onNavigateStory: () => void;
  onOpenAdmin?: () => void;
  contactEmail?: string;
  instagramHandle?: string;
}

export function Footer({
  onSelectCategory,
  onNavigateStory,
  onOpenAdmin,
  contactEmail = 'support@muslimsshirts.com',
  instagramHandle = '@muslimsshirts'
}: FooterProps) {
  return (
    <footer className="bg-[#09090b] text-zinc-400 border-t border-zinc-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col">
              <span className="font-brand text-2xl font-extrabold tracking-[0.25em] text-white uppercase">
                MUSLIMS
              </span>
              <span className="text-[10px] tracking-[0.45em] text-emerald-400 font-semibold -mt-1 uppercase">
                SHIRTS &bull; EST. 2026
              </span>
            </div>

            <p className="text-zinc-400 text-xs leading-relaxed max-w-sm">
              Contemporary Muslim-inspired streetwear engineered with 280-480 GSM combed cotton, modest boxy cuts, and faith-inspired typography. Made for identity, clarity, and steadfast patience.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-emerald-400 hover:border-zinc-700 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-emerald-400 hover:border-zinc-700 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop Categories */}
          <div className="space-y-3">
            <h4 className="font-brand text-xs font-bold uppercase tracking-wider text-white">
              Collections
            </h4>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <button
                  onClick={() => onSelectCategory('Oversized T-Shirts')}
                  className="hover:text-white transition-colors"
                >
                  Oversized T-Shirts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Hoodies')}
                  className="hover:text-white transition-colors"
                >
                  Heavyweight Hoodies
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Graphic T-Shirts')}
                  className="hover:text-white transition-colors"
                >
                  Graphic T-Shirts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Minimalist T-Shirts')}
                  className="hover:text-white transition-colors"
                >
                  Minimalist T-Shirts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Sweatshirts')}
                  className="hover:text-white transition-colors"
                >
                  Sweatshirts & Crews
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Accessories')}
                  className="hover:text-white transition-colors"
                >
                  Accessories
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="font-brand text-xs font-bold uppercase tracking-wider text-white">
              Customer Care
            </h4>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <button onClick={onNavigateStory} className="hover:text-white transition-colors">
                  Our Brand Manifesto
                </button>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Shipping & Handling Policy
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  14-Day Free Exchange Policy
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Oversized Fit & Sizing Chart
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Fabric Care & Longevity Guide
                </span>
              </li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div className="space-y-3">
            <h4 className="font-brand text-xs font-bold uppercase tracking-wider text-white">
              Inquiries
            </h4>
            <div className="space-y-2 text-zinc-400">
              <p>Customer Support:</p>
              <p className="font-semibold text-white">{contactEmail}</p>
              <p>Social Direct:</p>
              <p className="font-semibold text-white">{instagramHandle}</p>
              <p className="text-[11px] text-zinc-500 pt-1">
                Cairo &bull; Alexandria &bull; Worldwide Delivery
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-12 mt-12 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 text-[11px]">
          <p>
            &copy; {new Date().getFullYear()} MUSLIMS SHIRTS. All rights reserved. Crafted with modesty and contemporary streetwear pride.
          </p>

          <div className="flex items-center space-x-6">
            <span>Privacy Policy</span>
            <span>&bull;</span>
            <span>Terms of Service</span>
            <span>&bull;</span>
            <span>Security Verification</span>
            {onOpenAdmin && (
              <>
                <span>&bull;</span>
                <button
                  onClick={onOpenAdmin}
                  className="text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer underline"
                >
                  Admin Portal
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
}
