/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ShoppingBag, Heart, Search, Sparkles, ChevronDown, 
  Menu, X, Phone, Compass, MessageSquare, BookOpen, AlertCircle
} from 'lucide-react';
import { CartItem, Product } from '../types';

interface HeaderProps {
  cart: CartItem[];
  wishlist: Product[];
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAISearch: () => void;
  activeView: string;
  onNavigate: (view: string) => void;
  onSelectCategory?: (category: string, subcategory: string) => void;
}

const categoryTree = [
  {
    id: 'raw',
    name: 'Raw Makhana',
    subcategories: [
      { id: 'premium-raw', name: 'Premium Raw' },
      { id: 'medium-raw', name: 'Medium Raw' },
      { id: 'jumbo-raw', name: 'Jumbo Raw' },
      { id: 'roasted-raw', name: 'Roasted Raw' },
      { id: 'organic-raw', name: 'Organic Raw' }
    ]
  },
  {
    id: 'roasted',
    name: 'Flavored Makhana',
    subcategories: [
      { id: 'peri-peri', name: 'Peri Peri' },
      { id: 'cheese', name: 'Cheddar Cheese' },
      { id: 'cream-onion', name: 'Cream & Onion' },
      { id: 'pudina-mint', name: 'Pudina Mint' },
      { id: 'tomato-tangy', name: 'Tomato Tangy' },
      { id: 'black-pepper', name: 'Black Pepper' },
      { id: 'pink-salt', name: 'Himalayan Pink Salt' },
      { id: 'chilli-garlic', name: 'Chilli Garlic' },
      { id: 'barbecue', name: 'Barbecue' },
      { id: 'masala-mix', name: 'Masala Mix' }
    ]
  }
];

export default function Header({
  cart, wishlist, onOpenCart, onOpenWishlist, onOpenAISearch, activeView, onNavigate, onSelectCategory
}: HeaderProps) {
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCategoriesExpanded, setMobileCategoriesExpanded] = useState(false);
  const [megaMenuCategory, setMegaMenuCategory] = useState<string | null>(null);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'categories', label: 'Categories' },
    { id: 'about', label: 'About Us' },
    { id: 'export', label: 'Global Export' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-amber-50/90 backdrop-blur-md border-b border-amber-100 shadow-sm">
      
      {/* Main Bar Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Brand Brand Strategist Layout */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}>
            <div className="w-11 h-11 rounded-full overflow-hidden shadow border border-amber-200 relative bg-amber-50">
              <img 
                src="/assets/images/farmingo_nuts_logo_1783843254906.jpg" 
                alt="Farmingo Nuts Logo" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#D4AF37] rounded-full border border-white animate-pulse"></span>
            </div>
            <div>
              <h1 className="font-serif text-lg tracking-wider font-extrabold text-[#111111] uppercase leading-tight">
                Farmingo Nuts
              </h1>
              <span className="text-[9px] text-[#2E7D32] tracking-widest uppercase block font-semibold">
                Premium Global Fox Nuts
              </span>
            </div>
          </div>

          {/* Desktop Links with Elegant Mega Menu */}
          <nav className="hidden lg:flex items-center gap-5 text-xs font-bold text-stone-700 h-full">
            {navLinks.map((link) => {
              if (link.id === 'categories') {
                return (
                  <div key={link.id} className="relative group py-5">
                    <button
                      onClick={() => {
                        onNavigate('categories');
                      }}
                      className={`transition-colors flex items-center gap-1.5 hover:text-[#2E7D32] cursor-pointer ${
                        activeView === 'categories' || activeView === 'shop' ? 'text-[#2E7D32]' : ''
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown className="w-3 h-3 text-stone-400 group-hover:text-[#2E7D32] transition-transform duration-200 group-hover:rotate-180" />
                    </button>
                    
                    {/* Elegant Mega Menu Dropdown */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 hidden group-hover:grid grid-cols-2 gap-8 bg-white border border-amber-100 rounded-3xl p-6 shadow-xl w-[480px] z-50 animate-fadeIn">
                      {categoryTree.map((cat) => (
                        <div key={cat.id} className="space-y-3 text-left">
                          <button
                            onClick={() => {
                              if (onSelectCategory) {
                                onSelectCategory(cat.id, 'all');
                              } else {
                                onNavigate('shop');
                              }
                            }}
                            className="font-serif font-extrabold text-stone-900 text-sm hover:text-[#2E7D32] transition-colors block text-left uppercase tracking-wider border-b border-stone-100 pb-1.5 w-full cursor-pointer"
                          >
                            {cat.name}
                          </button>
                          <ul className="space-y-1.5">
                            {cat.subcategories.map((subcat) => (
                              <li key={subcat.id}>
                                <button
                                  onClick={() => {
                                    if (onSelectCategory) {
                                      onSelectCategory(cat.id, subcat.id);
                                    } else {
                                      onNavigate('shop');
                                    }
                                  }}
                                  className="text-stone-500 hover:text-[#2E7D32] hover:translate-x-1 transition-all text-[11px] block text-left w-full cursor-pointer font-medium"
                                >
                                  • {subcat.name}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      
                      {/* B2B Promo Footer in Dropdown */}
                      <div className="col-span-2 border-t border-stone-100 pt-3 flex justify-between items-center text-[10px] text-stone-400">
                        <span>Direct Mithila Warehouse Sourcing</span>
                        <button
                          onClick={() => {
                            if (onSelectCategory) {
                              onSelectCategory('bulk-export', 'all');
                            } else {
                              onNavigate('shop');
                            }
                          }}
                          className="text-[#2E7D32] font-bold hover:underline cursor-pointer"
                        >
                          Wholesale Sacks & Export →
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                  }}
                  className={`transition-colors relative py-5 hover:text-[#2E7D32] cursor-pointer ${
                    activeView === link.id ? 'text-[#2E7D32]' : ''
                  }`}
                >
                  {link.label}
                  {activeView === link.id && (
                    <span className="absolute bottom-4 inset-x-0 h-0.5 bg-[#2E7D32] rounded-full"></span>
                  )}
                </button>
              );
            })}
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
            {navLinks.map((link) => {
              if (link.id === 'categories') {
                return (
                  <div key={link.id} className="col-span-2 space-y-1">
                    <button
                      onClick={() => {
                        setMobileCategoriesExpanded(!mobileCategoriesExpanded);
                      }}
                      className={`w-full py-2 flex items-center justify-between pl-2.5 pr-2 rounded-lg transition-colors cursor-pointer ${
                        activeView === 'categories' || activeView === 'shop' 
                          ? 'bg-[#2E7D32]/10 text-[#2E7D32]' 
                          : 'text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${mobileCategoriesExpanded ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {mobileCategoriesExpanded && (
                      <div className="pl-4 pr-2 py-1.5 bg-white/50 rounded-xl border border-amber-100/40 space-y-2.5">
                        {categoryTree.map((cat) => (
                          <div key={cat.id} className="space-y-1 text-left">
                            <button
                              onClick={() => {
                                if (onSelectCategory) {
                                  onSelectCategory(cat.id, 'all');
                                } else {
                                  onNavigate('shop');
                                }
                                setMobileMenuOpen(false);
                              }}
                              className="text-left w-full text-[11px] font-extrabold text-stone-800 uppercase tracking-wider py-1 hover:text-[#2E7D32] cursor-pointer"
                            >
                              {cat.name}
                            </button>
                            <div className="grid grid-cols-2 gap-1.5 pl-2">
                              {cat.subcategories.map((subcat) => (
                                <button
                                  key={subcat.id}
                                  onClick={() => {
                                    if (onSelectCategory) {
                                      onSelectCategory(cat.id, subcat.id);
                                    } else {
                                      onNavigate('shop');
                                    }
                                    setMobileMenuOpen(false);
                                  }}
                                  className="text-left text-[10px] text-stone-500 hover:text-[#2E7D32] py-0.5 truncate cursor-pointer"
                                >
                                  • {subcat.name}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                        <button
                          onClick={() => {
                            onNavigate('categories');
                            setMobileMenuOpen(false);
                          }}
                          className="w-full text-center text-[10px] text-[#2E7D32] font-bold py-1 border-t border-stone-100 mt-1 cursor-pointer block"
                        >
                          View All Collections →
                        </button>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`py-2 text-left pl-2.5 rounded-lg transition-colors cursor-pointer ${
                    activeView === link.id ? 'bg-[#2E7D32]/10 text-[#2E7D32]' : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="border-t border-amber-100/60 pt-3 flex flex-col gap-2 pl-4 text-xs">
            <span className="text-stone-500 font-semibold">Active direct support lines:</span>
            <a href="tel:+919310730291" className="text-[#2E7D32] hover:underline font-extrabold flex items-center gap-1">
              📞 Call Sourcing Hub (+91 93107 30291)
            </a>
          </div>
        </div>
      )}

    </header>
  );
}
