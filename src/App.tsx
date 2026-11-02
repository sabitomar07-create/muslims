import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategorySection } from './components/CategorySection';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SearchModal } from './components/SearchModal';
import { AuthModal } from './components/AuthModal';
import { AccountModal } from './components/AccountModal';
import { AdminDashboard } from './components/AdminDashboard';
import { BrandStorySection } from './components/BrandStorySection';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';

import { Product, ProductCategory, Order, SiteSettings } from './types';
import { getProducts, getSiteSettings, seedDatabaseIfEmpty } from './firebase/db';
import { testFirestoreConnection } from './firebase/config';
import { Flame, Sparkles } from 'lucide-react';

function Storefront() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  // Modals state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Fetch initial data
  const loadStoreData = async () => {
    try {
      await testFirestoreConnection();
      await seedDatabaseIfEmpty();
      const [prods, siteSettings] = await Promise.all([
        getProducts(),
        getSiteSettings()
      ]);
      setProducts(prods);
      setSettings(siteSettings);
    } catch (err) {
      console.warn('Bootstrapping local store data', err);
    }
  };

  useEffect(() => {
    loadStoreData();
  }, []);

  const handleNavigateHome = () => {
    setActiveCategory('All');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateShop = () => {
    const el = document.getElementById('shop-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateStory = () => {
    const el = document.getElementById('our-story');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0f] text-[#f5f5f5] flex flex-col selection:bg-emerald-500 selection:text-black">
      {/* 1. Announcement Bar */}
      <AnnouncementBar
        text={settings?.announcementText || 'NEW DROP: THE TAWHID & SABR CHAPTER 1 — FREE EXPRESS SHIPPING OVER 1200 EGP'}
      />

      {/* 2. Top Navigation Bar */}
      <Navbar
        activeCategory={activeCategory}
        onSelectCategory={cat => {
          setActiveCategory(cat);
          handleNavigateShop();
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onNavigateHome={handleNavigateHome}
        onNavigateShop={handleNavigateShop}
        onNavigateStory={handleNavigateStory}
      />

      <main className="flex-1">
        {/* 3. Hero Section */}
        <HeroSection
          onShopNow={handleNavigateShop}
          onExploreCollection={() => {
            setActiveCategory('Oversized T-Shirts');
            handleNavigateShop();
          }}
        />

        {/* 4. Shop By Category Visual Cards */}
        <CategorySection
          onSelectCategory={cat => {
            setActiveCategory(cat);
            handleNavigateShop();
          }}
        />

        {/* 5. Featured Capsule Showcase */}
        <section className="py-12 bg-[#0a0a0c] border-b border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-900 border border-zinc-800 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-xl text-center md:text-left">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase tracking-widest">
                  <Flame className="w-3.5 h-3.5" />
                  LIMITED CAPSULE DROP
                </span>
                <h2 className="font-brand text-2xl sm:text-4xl font-extrabold uppercase text-white tracking-wide">
                  THE TAWHID &amp; SABR CHAPTER 1 COLLECTION
                </h2>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Crafted for the modern youth who carry timeless values. Featuring 460 GSM heavyweight fleece hoodies, boxy oversized tees with subtle Arabic typography, and tactical raw canvas totes.
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleNavigateShop}
                    className="bg-white text-black hover:bg-emerald-400 font-extrabold text-xs uppercase tracking-widest px-8 py-3.5 rounded transition-all cursor-pointer shadow-lg"
                  >
                    View All 48 Pieces
                  </button>
                </div>
              </div>

              <div className="flex -space-x-4 overflow-hidden py-2 shrink-0">
                {products.slice(0, 3).map((p, idx) => (
                  <img
                    key={idx}
                    src={p.images[0]}
                    alt={p.name}
                    className="inline-block h-40 w-32 sm:h-48 sm:w-36 rounded-lg object-cover ring-2 ring-zinc-800 shadow-xl"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 6. Complete Product Catalog Grid with Filters & Search */}
        <ProductGrid
          products={products}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          onQuickView={prod => setSelectedProduct(prod)}
          currency={settings?.currency || 'EGP'}
        />

        {/* 7. Brand Story Section */}
        <BrandStorySection />

        {/* 8. Newsletter Subscription */}
        <NewsletterSection />
      </main>

      {/* 9. Brand Footer */}
      <Footer
        onSelectCategory={cat => {
          setActiveCategory(cat);
          handleNavigateShop();
        }}
        onNavigateStory={handleNavigateStory}
        onOpenAdmin={() => setIsAdminOpen(true)}
        contactEmail={settings?.contactEmail || 'support@muslimsshirts.com'}
        instagramHandle={settings?.instagramHandle || '@muslimsshirts'}
      />

      {/* Interactive Overlays & Modals */}
      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        currency={settings?.currency || 'EGP'}
        allProducts={products}
        onSelectRelatedProduct={prod => setSelectedProduct(prod)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        onExploreProducts={handleNavigateShop}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderSuccess={(order: Order) => {
          // Re-fetch products to reflect latest stock if needed
          loadStoreData();
        }}
      />

      {/* Instant Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={prod => setSelectedProduct(prod)}
        currency={settings?.currency || 'EGP'}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      {/* Customer Account & Orders Modal */}
      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        currency={settings?.currency || 'EGP'}
        onSelectProduct={prod => setSelectedProduct(prod)}
      />

      {/* Admin Dashboard */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onRefreshCatalog={loadStoreData}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <Storefront />
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}
