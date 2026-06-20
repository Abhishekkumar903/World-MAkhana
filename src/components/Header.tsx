/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ShoppingBag, Heart, Search, Users, Sparkles, ChevronDown, 
  Menu, X, Phone, Compass, MessageSquare, BookOpen, AlertCircle
} from 'lucide-react';
import { CartItem, Product } from '../types';

interface HeaderProps {
  cart: CartItem[];
  wishlist: Product[];
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAISearch: () => void;
  onOpenAdmin: () => void;
  activeView: string;
  onNavigate: (view: string) => void;
}

export default function Header({
  cart, wishlist, onOpenCart, onOpenWishlist, onOpenAISearch, onOpenAdmin, activeView, onNavigate
}: HeaderProps) {
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuCategory, setMegaMenuCategory] = useState<string | null>(null);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop Gourmet' },
    { id: 'benefits', label: 'Health Benefits' },
    { id: 'bulk', label: 'Bulk Orders' },
    { id: 'export', label: 'Direct Export' },
    { id: 'blog', label: 'Wholesome Blog' },
    { id: 'gallery', label: 'Our Farm Gallery' },
    { id: 'about', label: 'About Mithila' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-amber-50/90 backdrop-blur-md border-b border-amber-100 shadow-sm">
      
      {/* Top Banner (Mini info slider) */}
      <div className="bg-[#111111] text-white text-[10px] md:text-xs py-2 px-4 flex justify-between items-center tracking-wider uppercase font-semibold">
        <div className="flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
          <span>Award-winning premium Mithila grade export makhana</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-stone-300">
          <span className="flex items-center gap-1">
            <Phone className="w-3 h-3 text-[#D4AF37]" /> Sourcing Line: +91 94302 60869
          </span>
          <span>|</span>
          <span className="text-[#D4AF37] hover:underline cursor-pointer" onClick={onOpenAdmin}>
            ✓ Partner Portal
          </span>
        </div>
      </div>

      {/* Main Bar Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Brand Brand Strategist Layout */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}>
            <div className="w-11 h-11 rounded-full overflow-hidden shadow border border-amber-200 relative bg-amber-50">
              <img 
                src="/assets/images/makhana_world_logo_1781948519020.jpg" 
                alt="Makhana World Mascot" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#D4AF37] rounded-full border border-white animate-pulse"></span>
            </div>
            <div>
              <h1 className="font-serif text-lg tracking-wider font-extrabold text-[#111111] uppercase leading-tight">
                Makhana World
              </h1>
              <span className="text-[9px] text-[#2E7D32] tracking-widest uppercase block font-semibold">
                Premium Makhana From Bihar
              </span>
            </div>
          </div>

          {/* Desktop Links with Elegant Mega Menu */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-bold text-stone-700">
            {navLinks.slice(0, 7).map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMegaMenuCategory(null);
                }}
                className={`transition-colors relative py-1 hover:text-[#2E7D32] cursor-pointer ${activeView === link.id ? 'text-[#2E7D32]' : ''}`}
              >
                {link.label}
                {activeView === link.id && (
                  <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#2E7D32] rounded-full"></span>
                )}
              </button>
            ))}

            {/* Custom Interactive Mega Menu Dropdown */}
            <div className="relative">
              <button
                onClick={() => setMegaMenuCategory(megaMenuCategory === 'more' ? null : 'more')}
                className="flex items-center gap-1 py-1 hover:text-[#2E7D32] cursor-pointer font-bold"
              >
                More Stories <ChevronDown className="w-4 h-4 text-[#D4AF37]" />
              </button>

              {megaMenuCategory === 'more' && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-amber-50/95 border border-amber-100 rounded-2xl shadow-xl p-3 grid grid-cols-1 gap-1 pl-4 z-50 animate-fadeIn">
                  <span className="text-[9px] font-bold text-[#2E7D32] uppercase tracking-wider block mb-1">Company & Farming</span>
                  
                  <button onClick={() => { onNavigate('about'); setMegaMenuCategory(null); }} className="w-full text-left py-1 text-xs hover:text-[#2E7D32] font-semibold flex items-center gap-2">
                    <Compass className="w-3.5 h-3.5 text-[#D4AF37]" /> Our Sourcing Journey
                  </button>
                  <button onClick={() => { onNavigate('gallery'); setMegaMenuCategory(null); }} className="w-full text-left py-1 text-xs hover:text-[#2E7D32] font-semibold flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" /> Farmers Photo Gallery
                  </button>
                  <button onClick={() => { onNavigate('policies'); setMegaMenuCategory(null); }} className="w-full text-left py-1 text-xs hover:text-[#2E7D32] font-semibold flex items-center gap-2">
                    <AlertCircle className="w-3.5 h-3.5 text-[#D4AF37]" /> Quality Policy & Certificates
                  </button>
                  
                  <div className="border-t border-stone-200 my-1.5 pt-1.5"></div>
                  <button 
                    onClick={() => { onOpenAdmin(); setMegaMenuCategory(null); }} 
                    className="w-full text-left py-1 text-[10px] uppercase tracking-widest text-[#2E7D32] hover:underline font-bold"
                  >
                    Partner Portal Admin →
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Interactive Core Control Area (AI search, cart, wishlist, admin) */}
          <div className="flex items-center gap-3 md:gap-4.5">
            {/* AI Search Icon */}
            <button
              onClick={onOpenAISearch}
              className="p-2.5 rounded-full hover:bg-[#2E7D32]/10 text-stone-700 hover:text-[#2E7D32] transition-colors relative cursor-pointer"
              title="Open AI Intelligent Search Drawer"
            >
              <Search className="w-5.5 h-5.5" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#D4AF37] rounded-full animate-ping"></span>
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={onOpenWishlist}
              className="p-2.5 rounded-full hover:bg-orange-50 text-stone-700 hover:text-red-500 transition-all relative cursor-pointer"
              title="View Wishlisted Items"
            >
              <Heart className="w-5.5 h-5.5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white font-black text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white shadow">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Icon */}
            <button
              onClick={onOpenCart}
              className="px-3.5 py-2.5 rounded-2xl bg-gradient-to-r from-[#2E7D32] to-emerald-800 text-white flex items-center gap-2 shadow hover:opacity-95 transition-all relative cursor-pointer font-bold text-xs"
              title="Shopping Cart Drawer"
            >
              <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
              <span className="hidden sm:inline">₹{cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)}</span>
              {cartCount > 0 && (
                <span className="bg-[#D4AF37] text-[#111111] font-black text-[9px] w-5 h-5 rounded-full flex items-center justify-center border border-[#111111] absolute -top-1.5 -right-1">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Admin Switcher profile layout */}
            <button
              onClick={onOpenAdmin}
              className="p-2.5 rounded-full border border-amber-200 bg-white text-[#2E7D32] hover:bg-stone-50 hover:text-[#111111] transition-all cursor-pointer shadow-sm"
              title="Partner Portal Admin Panel"
            >
              <Users className="w-5 h-5" />
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 lg:hidden cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Sidebar Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-amber-100 bg-[#F8F5F0] animate-fadeIn p-4 space-y-3 shadow-inner">
          <div className="grid grid-cols-2 gap-2 text-xs font-bold pl-2 pb-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`py-2 text-left pl-2.5 rounded-lg transition-colors cursor-pointer ${activeView === link.id ? 'bg-[#2E7D32]/10 text-[#2E7D32]' : 'text-stone-700 hover:bg-stone-100'}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="border-t border-amber-100/60 pt-3 flex flex-col gap-2 pl-4 text-xs">
            <span className="text-stone-500 font-semibold">Active direct support lines:</span>
            <a href="tel:+919430260869" className="text-[#2E7D32] hover:underline font-extrabold flex items-center gap-1">
              📞 Call Sourcing Hub (+91 94302 60869)
            </a>
            <button 
              onClick={() => { onOpenAdmin(); setMobileMenuOpen(false); }}
              className="text-[#D4AF37] bg-[#111111] py-2 px-4 rounded-xl text-center font-bold"
            >
              Partner Admin Portal CMS →
            </button>
          </div>
        </div>
      )}

    </header>
  );
}
