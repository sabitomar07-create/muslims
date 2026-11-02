import React, { useState } from 'react';
import { Search, ShoppingBag, Heart, User as UserIcon, Menu, X, Shield, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { ProductCategory } from '../types';

interface NavbarProps {
  onSelectCategory: (category: ProductCategory) => void;
  onOpenSearch: () => void;
  onOpenAuth: () => void;
  onOpenAccount: () => void;
  onOpenAdmin: () => void;
  onNavigateHome: () => void;
  onNavigateShop: () => void;
  onNavigateStory: () => void;
  activeCategory: ProductCategory;
}

export function Navbar({
  onSelectCategory,
  onOpenSearch,
  onOpenAuth,
  onOpenAccount,
  onOpenAdmin,
  onNavigateHome,
  onNavigateShop,
  onNavigateStory,
  activeCategory
}: NavbarProps) {
  const { totalItems, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const { currentUser, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { label: 'Home', action: () => { onNavigateHome(); setMobileMenuOpen(false); } },
    { label: 'Shop All', action: () => { onNavigateShop(); onSelectCategory('All'); setMobileMenuOpen(false); } },
    { label: 'T-Shirts', action: () => { onNavigateShop(); onSelectCategory('Oversized T-Shirts'); setMobileMenuOpen(false); } },
    { label: 'Hoodies', action: () => { onNavigateShop(); onSelectCategory('Hoodies'); setMobileMenuOpen(false); } },
    { label: 'Sweatshirts', action: () => { onNavigateShop(); onSelectCategory('Sweatshirts'); setMobileMenuOpen(false); } },
    { label: 'Accessories', action: () => { onNavigateShop(); onSelectCategory('Accessories'); setMobileMenuOpen(false); } },
    { label: 'Our Story', action: () => { onNavigateStory(); setMobileMenuOpen(false); } },
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#0d0d0f]/95 backdrop-blur-md border-b border-[#222226]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-400 hover:text-white transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Wordmark Logo */}
          <div className="flex items-center cursor-pointer" onClick={onNavigateHome}>
            <div className="flex flex-col">
              <span className="font-brand text-xl sm:text-2xl font-extrabold tracking-[0.25em] text-white hover:text-emerald-400 transition-colors uppercase">
                MUSLIMS
              </span>
              <span className="text-[9px] tracking-[0.45em] text-zinc-400 font-semibold -mt-1 uppercase">
                SHIRTS &bull; EST. 2026
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link, idx) => (
              <button
                key={idx}
                onClick={link.action}
                className="text-xs uppercase tracking-wider font-semibold text-zinc-300 hover:text-white transition-colors relative py-1.5 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-emerald-400 transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-zinc-300 hover:text-white transition-colors hover:bg-zinc-800/50 rounded-full"
              aria-label="Search Products"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenAccount}
              className="p-2 text-zinc-300 hover:text-white transition-colors hover:bg-zinc-800/50 rounded-full relative"
              aria-label="View Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-500 text-black font-bold text-[10px] rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="p-2 text-zinc-300 hover:text-white transition-colors hover:bg-zinc-800/50 rounded-full relative group"
              aria-label="Open Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 text-zinc-200 group-hover:text-emerald-400 transition-colors" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-white text-black font-extrabold text-[10px] rounded-full flex items-center justify-center animate-scale">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Account / User Menu */}
            <div className="relative">
              {currentUser ? (
                <div>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-1.5 p-1 rounded-full border border-zinc-700 hover:border-zinc-500 transition-colors"
                    aria-label="User Account Menu"
                  >
                    {currentUser.photoURL ? (
                      <img
                        src={currentUser.photoURL}
                        alt={currentUser.displayName || 'Account'}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">
                        {(currentUser.displayName || currentUser.email || 'U')[0].toUpperCase()}
                      </div>
                    )}
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-[#18181b] border border-zinc-800 rounded-lg shadow-2xl py-2 z-50">
                      <div className="px-4 py-2 border-b border-zinc-800">
                        <p className="text-xs font-semibold text-white truncate">
                          {currentUser.displayName || 'Customer'}
                        </p>
                        <p className="text-[11px] text-zinc-400 truncate">{currentUser.email}</p>
                      </div>

                      <button
                        onClick={() => {
                          onOpenAccount();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white flex items-center gap-2"
                      >
                        <UserIcon className="w-4 h-4 text-zinc-400" />
                        My Account & Orders
                      </button>

                      {isAdmin && (
                        <button
                          onClick={() => {
                            onOpenAdmin();
                            setUserDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-xs text-emerald-400 hover:bg-zinc-800 flex items-center gap-2 font-medium"
                        >
                          <Shield className="w-4 h-4 text-emerald-400" />
                          Admin Dashboard
                        </button>
                      )}

                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-zinc-800 flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={onOpenAuth}
                  className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-zinc-200 hover:text-white bg-zinc-800/80 hover:bg-zinc-800 px-3.5 py-1.5 rounded-full border border-zinc-700/80 transition-colors"
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Sign In</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#121214] border-b border-zinc-800 px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link, idx) => (
              <button
                key={idx}
                onClick={link.action}
                className="text-left text-sm uppercase tracking-wider font-medium text-zinc-300 hover:text-white py-1"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-zinc-800 flex flex-col gap-2">
            {currentUser ? (
              <>
                <button
                  onClick={() => { onOpenAccount(); setMobileMenuOpen(false); }}
                  className="text-left text-sm text-zinc-200 py-1 flex items-center gap-2"
                >
                  <UserIcon className="w-4 h-4 text-zinc-400" />
                  My Account & Orders
                </button>
                {isAdmin && (
                  <button
                    onClick={() => { onOpenAdmin(); setMobileMenuOpen(false); }}
                    className="text-left text-sm text-emerald-400 font-medium py-1 flex items-center gap-2"
                  >
                    <Shield className="w-4 h-4 text-emerald-400" />
                    Admin Dashboard
                  </button>
                )}
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="text-left text-sm text-red-400 py-1 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => { onOpenAuth(); setMobileMenuOpen(false); }}
                className="w-full bg-white text-black text-xs uppercase tracking-widest font-bold py-2.5 rounded text-center"
              >
                Sign In / Register
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
