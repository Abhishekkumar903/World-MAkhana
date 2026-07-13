/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Heart, ShoppingBag, Search, Sparkles, Star, ChevronRight, ChevronDown, Filter,
  MapPin, Check, Plus, ShoppingCart, Trash2, ShieldCheck, 
  ArrowRight, Award, Compass, Gift, Hammer, Info, Leaf, 
  Moon, Sun, Trash, Play, RefreshCw, Layers, CheckSquare, 
  MessageSquare, FileText, Globe, Truck, HelpCircle, User, 
  Eye, CornerRightDown, Phone, Wheat, Ban
} from 'lucide-react';

import { Product, CartItem, Order, BulkEnquiry, ExportEnquiry, Recipe, BlogArticle } from './types';
import { PRODUCTS, RECIPES, BLOGS, HEALTH_BENEFITS, CERTIFICATES, TESTIMONIALS, FAQS, SPECIALTY_SIZES } from './data/products';

import Header from './components/Header';
import Footer from './components/Footer';
import AISearch from './components/AISearch';
import ProductDetailsModal from './components/ProductDetailsModal';
import { motion } from 'motion/react';

const categoryTree = [
  {
    id: 'raw',
    name: 'Raw',
    subcategories: [
      { id: 'premium-raw', name: 'Premium Raw Makhana' },
      { id: 'medium-raw', name: 'Medium Raw Makhana' },
      { id: 'jumbo-raw', name: 'Jumbo Raw Makhana' },
      { id: 'roasted-raw', name: 'Roasted Raw Makhana' },
      { id: 'organic-raw', name: 'Organic Raw Makhana' }
    ]
  },
  {
    id: 'roasted',
    name: 'Flavors',
    subcategories: [
      { id: 'peri-peri', name: 'Peri Peri' },
      { id: 'cheese', name: 'Cheese' },
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

const categoryNamesMap: Record<string, string> = {
  'premium-raw': 'Premium Raw Makhana',
  'medium-raw': 'Medium Raw Makhana',
  'jumbo-raw': 'Jumbo Raw Makhana',
  'roasted-raw': 'Roasted Raw Makhana',
  'organic-raw': 'Organic Raw Makhana',
  'peri-peri': 'Peri Peri',
  'cheese': 'Cheese',
  'cream-onion': 'Cream & Onion',
  'pudina-mint': 'Pudina Mint',
  'tomato-tangy': 'Tomato Tangy',
  'black-pepper': 'Black Pepper',
  'pink-salt': 'Himalayan Pink Salt',
  'chilli-garlic': 'Chilli Garlic',
  'barbecue': 'Barbecue',
  'masala-mix': 'Masala Mix',
};

export default function App() {
  
  // Navigation
  const [activeView, setActiveView] = useState<string>('home');
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<string>('raw');
  const [aiSearchOpen, setAiSearchOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);
  
  // Persistent States in localStorage (With lazy init)
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('mw_cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('mw_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('mw_orders');
    return saved ? JSON.parse(saved) : [
      {
        id: '94821',
        date: '19-Jun-2026',
        items: [
          { product: PRODUCTS[0], selectedWeight: '1kg', quantity: 1 }
        ],
        totalAmount: 1990,
        status: 'Delivered',
        paymentMethod: 'Razorpay UPI',
        paymentStatus: 'Paid',
        shippingAddress: {
          name: 'Abhishek Sharma',
          address: 'B2, Green Meadows, Koregaon Park',
          city: 'Pune, Maharashtra',
          pincode: '411001',
          phone: '+91 93107 30291'
        }
      }
    ];
  });

  const [bulkEnquiries, setBulkEnquiries] = useState<BulkEnquiry[]>(() => {
    const saved = localStorage.getItem('mw_bulk');
    return saved ? JSON.parse(saved) : [
      {
        id: 'BLK-472',
        name: 'Johnathan Miller',
        companyName: 'Breathe Health Foods Inc.',
        email: 'jmiller@breathefoods.com',
        phone: '+1 415 908 1142',
        role: 'Distributor',
        quantityRequired: '500 Kilograms',
        message: 'Looking for prompt premium 6 Suta raw makhana containers. Kindly share custom FOB Mumbai port pricing sheet.',
        date: '18-Jun-2026',
        status: 'New'
      }
    ];
  });

  const [exportEnquiries, setExportEnquiries] = useState<ExportEnquiry[]>(() => {
    const saved = localStorage.getItem('mw_export');
    return saved ? JSON.parse(saved) : [
      {
        id: 'EXP-841',
        name: 'Hanoko Tanaka',
        companyName: 'Kyoto Zen Snacks Ltd.',
        country: 'Japan',
        email: 'tanaka@zensnacks.co.jp',
        phone: '+81 3 4402 1184',
        interestedProducts: ['Organic Raw Makhana', 'Himalayan Pink Salt Roasted'],
        packagingType: 'Private Label OEM Pouches',
        message: 'Interested in retail private label packs. Let us know the phytosanitary chemical test reports for Japan customs clearance.',
        date: '19-Jun-2026',
        status: 'New'
      }
    ];
  });

  // Active Interactive Modal Product
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // States for Shop page sorting & filters query
  const [shopCategory, setShopCategory] = useState<string>('all');
  const [shopSubcategory, setShopSubcategory] = useState<string>('all');
  const [rawExpanded, setRawExpanded] = useState<boolean>(true);
  const [flavorsExpanded, setFlavorsExpanded] = useState<boolean>(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);
  const [shopSearch, setShopSearch] = useState<string>('');
  
  // Custom interactive user details states (Checkout context)
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'payment' | 'placed'>('cart');
  const [activePromo, setActivePromo] = useState<string>('');
  const [promoError, setPromoError] = useState<string>('');
  const [promoDiscountPct, setPromoDiscountPct] = useState<number>(0);
  const [checkoutName, setCheckoutName] = useState('Abhishek Sharma');
  const [checkoutAddress, setCheckoutAddress] = useState('Plot No. 44, Mithila Orchid Towers');
  const [checkoutCity, setCheckoutCity] = useState('Darbhanga, Bihar');
  const [checkoutPincode, setCheckoutPincode] = useState('846004');
  const [checkoutPhone, setCheckoutPhone] = useState('+91 93107 30291');
  const [paymentMethod, setPaymentMethod] = useState<'Razorpay' | 'UPI' | 'COD'>('Razorpay');
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [pincodeValidated, setPincodeValidated] = useState<string | null>(null);

  // Bulk Enquiry Form State
  const [bulkFormName, setBulkFormName] = useState('');
  const [bulkFormCompany, setBulkFormCompany] = useState('');
  const [bulkFormEmail, setBulkFormEmail] = useState('');
  const [bulkFormPhone, setBulkFormPhone] = useState('');
  const [bulkFormRole, setBulkFormRole] = useState<'Dealer' | 'Distributor' | 'Retailer' | 'Hotel/Restaurant' | 'Corporate' | 'Other'>('Distributor');
  const [bulkFormQty, setBulkFormQty] = useState('100kg');
  const [bulkFormMsg, setBulkFormMsg] = useState('');
  const [bulkSuccess, setBulkSuccess] = useState(false);

  // Export Enquiry Form State
  const [expFormName, setExpFormName] = useState('');
  const [expFormCompany, setExpFormCompany] = useState('');
  const [expFormCountry, setExpFormCountry] = useState('');
  const [expFormEmail, setExpFormEmail] = useState('');
  const [expFormPhone, setExpFormPhone] = useState('');
  const [expFormInterests, setExpFormInterests] = useState<string[]>([]);
  const [expFormPacking, setExpFormPacking] = useState('Direct Wholesale Sacks');
  const [expFormMsg, setExpFormMsg] = useState('');
  const [expSuccess, setExpSuccess] = useState(false);

  // Private Label Customizer State
  const [plBrandName, setPlBrandName] = useState('Nourish Organics');
  const [plFlavor, setPlFlavor] = useState('Classic Roasted Ghee');
  const [plMaterial, setPlMaterial] = useState('Matte Gold Foil');
  const [plSize, setPlSize] = useState('100g Standup Pouch');
  const [plQty, setPlQty] = useState(10000);
  const [plName, setPlName] = useState('');
  const [plCompany, setPlCompany] = useState('');
  const [plEmail, setPlEmail] = useState('');
  const [plPhone, setPlPhone] = useState('');
  const [plSuccess, setPlSuccess] = useState(false);

  // Chat Concierge State
  const [chatMessages, setChatMessages] = useState<{ sender: 'ai' | 'user'; text: string }[]>([
    { sender: 'ai', text: 'Welcome to the Farmingo Nuts Premium Concierge Desk. How can I assist you with your B2B/B2C global fox nuts inquiries today?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Culinary recipe walkthrough state
  const [activeRecipeInCookMode, setActiveRecipeInCookMode] = useState<Recipe | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([]);

  // Blog reading article full view
  const [activeBlogId, setActiveBlogId] = useState<string | null>(null);

  // Sync state changes to storage
  useEffect(() => {
    localStorage.setItem('mw_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('mw_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('mw_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('mw_bulk', JSON.stringify(bulkEnquiries));
  }, [bulkEnquiries]);

  useEffect(() => {
    localStorage.setItem('mw_export', JSON.stringify(exportEnquiries));
  }, [exportEnquiries]);

  // Handle Cart Operations
  const handleAddToCart = (item: CartItem) => {
    const existingIdx = cart.findIndex(
      c => c.product.id === item.product.id && c.selectedWeight === item.selectedWeight
    );

    if (existingIdx > -1) {
      const updated = [...cart];
      updated[existingIdx].quantity += item.quantity;
      setCart(updated);
    } else {
      setCart([...cart, item]);
    }
  };

  const handleUpdateCartQty = (idx: number, change: number) => {
    const updated = [...cart];
    updated[idx].quantity = Math.max(1, updated[idx].quantity + change);
    setCart(updated);
  };

  const handleRemoveCartItem = (idx: number) => {
    setCart(cart.filter((_, i) => i !== idx));
  };

  // Wishlist Action
  const handleAddToWishlist = (product: Product) => {
    const isPresent = wishlist.some(w => w.id === product.id);
    if (isPresent) {
      setWishlist(wishlist.filter(w => w.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  // Express Purchase
  const handleBuyNow = (item: CartItem) => {
    handleAddToCart(item);
    setActiveView('checkout');
    setCheckoutStep('shipping');
  };

  // Pincode Validator simulation
  const checkPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkoutPincode.length !== 6 || isNaN(Number(checkoutPincode))) {
      setPincodeValidated("Invalid Pincode format. Please supply a 6-digit number.");
      return;
    }
    // Simple state simulation: Bihar / West Bengal / Maharashtra delivery
    if (checkoutPincode.startsWith('80') || checkoutPincode.startsWith('84') || checkoutPincode.startsWith('85')) {
      setPincodeValidated("Express Sourcing Active: Express 24-48 Hrs Delivery dispatch straight from Mithila!");
    } else {
      setPincodeValidated("Express Active: Standard 3-5 Working Days Delivery available (Air transport standard routing).");
    }
  };

  // Coupon promo validator
  const checkPromoCode = () => {
    const code = activePromo.trim().toUpperCase();
    if (code === 'ORGANIC20') {
      setPromoDiscountPct(20);
      setPromoError('');
    } else if (code === 'FESTIVAL30') {
      setPromoDiscountPct(30);
      setPromoError('');
    } else if (code === 'FREEBY') {
      setPromoDiscountPct(10);
      setPromoError('');
    } else {
      setPromoError('Invalid coupon code. Try ORGANIC20 or FESTIVAL30.');
      setPromoDiscountPct(0);
    }
  };

  // Checkout Total Calculator
  const getSubtotal = () => cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const getDiscount = () => Math.round(getSubtotal() * (promoDiscountPct / 100));
  const getTax = () => Math.round((getSubtotal() - getDiscount()) * 0.05); // 5% Food GST
  const getShipping = () => {
    const finalAmount = getSubtotal() - getDiscount();
    return finalAmount > 499 || finalAmount === 0 ? 0 : 60;
  };
  const getGrandTotal = () => getSubtotal() - getDiscount() + getTax() + getShipping();

  // Create Checkout Order Placing
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const newOrder: Order = {
      id: String(Math.floor(10000 + Math.random() * 90000)),
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/\s/g, '-'),
      items: cart,
      totalAmount: getGrandTotal(),
      status: 'Pending',
      paymentMethod: `${paymentMethod} Online`,
      paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Paid',
      shippingAddress: {
        name: checkoutName,
        address: checkoutAddress,
        city: checkoutCity,
        pincode: checkoutPincode,
        phone: checkoutPhone
      }
    };

    setOrders([newOrder, ...orders]);
    setPlacedOrder(newOrder);
    setCart([]); // Clear cart
    setCheckoutStep('placed');
  };

  // Handle Bulk Enquiries Submission
  const handleBulkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkFormName || !bulkFormCompany || !bulkFormPhone) return;

    const newEnquiry: BulkEnquiry = {
      id: `BLK-${Math.floor(100 + Math.random() * 900)}`,
      name: bulkFormName,
      companyName: bulkFormCompany,
      email: bulkFormEmail,
      phone: bulkFormPhone,
      role: bulkFormRole,
      quantityRequired: bulkFormQty,
      message: bulkFormMsg || 'No additional remarks.',
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/\s/g, '-'),
      status: 'New'
    };

    setBulkEnquiries([newEnquiry, ...bulkEnquiries]);
    setBulkSuccess(true);
    setBulkFormName('');
    setBulkFormCompany('');
    setBulkFormEmail('');
    setBulkFormPhone('');
    setBulkFormMsg('');
    setTimeout(() => setBulkSuccess(false), 9000);
  };

  // Handle International Export Submission
  const handleExportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expFormName || !expFormCompany || !expFormCountry) return;

    const newExport: ExportEnquiry = {
      id: `EXP-${Math.floor(100 + Math.random() * 900)}`,
      name: expFormName,
      companyName: expFormCompany,
      country: expFormCountry,
      email: expFormEmail,
      phone: expFormPhone,
      interestedProducts: expFormInterests.length > 0 ? expFormInterests : ['Raw 6 Suta Bulk', 'Gourmet Packs'],
      packagingType: expFormPacking,
      message: expFormMsg || 'No special remarks.',
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/\s/g, '-'),
      status: 'New'
    };

    setExportEnquiries([newExport, ...exportEnquiries]);
    setExpSuccess(true);
    setExpFormName('');
    setExpFormCompany('');
    setExpFormCountry('');
    setExpFormEmail('');
    setExpFormPhone('');
    setExpFormMsg('');
    setExpFormInterests([]);
    setTimeout(() => setExpSuccess(false), 9000);
  };

  // Admin Callbacks
  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const handleReplyBulk = (id: string, text: string) => {
    setBulkEnquiries(bulkEnquiries.map(b => b.id === id ? { ...b, status: 'Replied' } : b));
    alert(`Quotation notification emailed successfully to dealer: ${text}`);
  };

  const handleReplyExport = (id: string, text: string) => {
    setExportEnquiries(exportEnquiries.map(e => e.id === id ? { ...e, status: 'Reviewed' } : e));
    alert(`Customs phytosanitary clearance documents dispatched: ${text}`);
  };

  // Modify stock level in real-time
  const [shopProducts, setShopProducts] = useState<Product[]>(PRODUCTS);
  const handleUpdateProductStock = (id: string, stock: Product['stockStatus']) => {
    setShopProducts(shopProducts.map(p => p.id === id ? { ...p, stockStatus: stock } : p));
  };

  const handleSelectProductFromList = (product: Product) => {
    // Look up latest stock from active state config
    const liveInstance = shopProducts.find(p => p.id === product.id) || product;
    setSelectedProduct(liveInstance);
    setModalOpen(true);
  };

  // Heuristic matching list for normal shop category
  const getFilteredShopProducts = () => {
    return shopProducts.filter(p => {
      const matchCat = shopCategory === 'all' || p.category === shopCategory;
      const matchSubcat = shopSubcategory === 'all' || p.subcategory === shopSubcategory;
      const matchSearch = p.name.toLowerCase().includes(shopSearch.toLowerCase()) || 
                          p.description.toLowerCase().includes(shopSearch.toLowerCase());
      return matchCat && matchSubcat && matchSearch;
    });
  };

  const renderCategoryTree = (isMobile: boolean) => {
    return (
      <div className="space-y-3.5">
        {/* All Products header option */}
        <button
          onClick={() => {
            setShopCategory('all');
            setShopSubcategory('all');
            if (isMobile) setMobileFiltersOpen(false);
          }}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            shopCategory === 'all' && shopSubcategory === 'all'
              ? 'bg-emerald-50 text-[#2E7D32]'
              : 'text-stone-600 hover:bg-stone-50 hover:text-stone-950 bg-white border border-stone-100 lg:border-none'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-stone-400 font-extrabold">•</span>
            <span>All Products</span>
          </div>
          <span className="bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full text-[9px] font-mono">
            {shopProducts.length}
          </span>
        </button>

        {/* Hierarchical sections */}
        {categoryTree.map((cat) => {
          const isExpanded = cat.id === 'raw' ? rawExpanded : flavorsExpanded;
          const setExpanded = cat.id === 'raw' ? setRawExpanded : setFlavorsExpanded;
          const isActiveCat = shopCategory === cat.id && shopSubcategory === 'all';
          const hasActiveSubcatInThisCat = shopCategory === cat.id && shopSubcategory !== 'all';

          return (
            <div key={cat.id} className="space-y-1.5 border-t border-stone-100 pt-3.5 first:border-none first:pt-0">
              {/* Parent Category Row */}
              <div className="flex items-center justify-between gap-1 w-full">
                <button
                  onClick={() => {
                    setShopCategory(cat.id);
                    setShopSubcategory('all');
                    setExpanded(true); // Auto-expand when selecting parent
                    if (isMobile) setMobileFiltersOpen(false);
                  }}
                  className={`flex-grow flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-serif font-extrabold text-left transition-all cursor-pointer ${
                    isActiveCat
                      ? 'bg-emerald-50 text-[#2E7D32]'
                      : 'text-stone-800 hover:bg-stone-50'
                  }`}
                >
                  <span className={`text-[9px] transition-transform duration-200 ${isExpanded ? 'rotate-90' : 'rotate-0'}`}>
                    ▶
                  </span>
                  <span className="uppercase tracking-wider">{cat.name}</span>
                  {hasActiveSubcatInThisCat && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32]" />
                  )}
                </button>

                {/* Expansion toggle arrow button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpanded(!isExpanded);
                  }}
                  className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                  title={isExpanded ? "Collapse" : "Expand"}
                >
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Subcategories (Expandable with animation/transition) */}
              <div 
                className={`pl-4 space-y-1 overflow-hidden transition-all duration-300 ${
                  isExpanded ? 'max-h-[500px] opacity-100 py-1' : 'max-h-0 opacity-0 py-0'
                }`}
              >
                {cat.subcategories.map((subcat) => {
                  const isActiveSubcat = shopSubcategory === subcat.id;
                  const subcatCount = shopProducts.filter(p => p.subcategory === subcat.id).length;

                  return (
                    <button
                      key={subcat.id}
                      onClick={() => {
                        setShopCategory(cat.id);
                        setShopSubcategory(subcat.id);
                        if (isMobile) setMobileFiltersOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        isActiveSubcat
                          ? 'text-[#2E7D32] bg-emerald-50/50 font-bold'
                          : 'text-stone-500 hover:text-stone-900 hover:bg-stone-50'
                      }`}
                    >
                      <span className="truncate flex items-center gap-1.5">
                        <span className={`text-[8px] ${isActiveSubcat ? 'text-[#2E7D32]' : 'text-stone-300'}`}>
                          •
                        </span>
                        <span>{subcat.name}</span>
                      </span>
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                        isActiveSubcat ? 'bg-emerald-100 text-[#2E7D32] font-semibold' : 'bg-stone-50 text-stone-400'
                      }`}>
                        {subcatCount}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Wholesale & Bulk category option at bottom */}
        <button
          onClick={() => {
            setShopCategory('bulk-export');
            setShopSubcategory('all');
            if (isMobile) setMobileFiltersOpen(false);
          }}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            shopCategory === 'bulk-export' && shopSubcategory === 'all'
              ? 'bg-emerald-50 text-[#2E7D32]'
              : 'text-stone-600 hover:bg-stone-50 hover:text-stone-950 bg-white border border-stone-100 lg:border-none'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-stone-400 font-extrabold">•</span>
            <span>Wholesale & Bulk</span>
          </div>
          <span className="bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full text-[9px] font-mono">
            {shopProducts.filter(p => p.category === 'bulk-export').length}
          </span>
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0] text-stone-900 font-sans flex flex-col selection:bg-[#2E7D32]/20 selection:text-emerald-950">
      
      {/* Mega Header Navigation */}
      <Header
        cart={cart}
        wishlist={wishlist}
        onOpenCart={() => { setActiveView('checkout'); setCheckoutStep('cart'); }}
        onOpenWishlist={() => setActiveView('wishlist')}
        onOpenAISearch={() => setAiSearchOpen(true)}
        activeView={activeView}
        onNavigate={(view) => {
          setActiveView(view);
          window.scrollTo(0, 0);
        }}
        onSelectCategory={(category, subcategory) => {
          setShopCategory(category);
          setShopSubcategory(subcategory);
          if (category === 'raw') {
            setRawExpanded(true);
          } else if (category === 'roasted') {
            setFlavorsExpanded(true);
          }
          setActiveView('shop');
          window.scrollTo(0, 0);
        }}
      />

      {/* Pages Container */}
      <main className="flex-grow">
        
        {/* VIEW 1: HOME PAGE */}
        {activeView === 'home' && (
          <div className="space-y-16 pb-20">
            
            {/* Premium Luxury Hero Section */}
            <section className="relative overflow-hidden bg-[#F6F1EA] py-12 md:py-20 lg:py-24 min-h-[460px] md:min-h-[560px] lg:min-h-[620px] flex items-center">
              
              {/* Mockup Background Image */}
              <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none">
                <img 
                  src="./assets/images/farmingo_luxury_hero_1783858291837.jpg?v=3" 
                  alt="Farmingo Nuts Premium Background" 
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                {/* Responsive soft overlay: solid-ish cream on mobile for readability, fully transparent on desktop */}
                <div className="absolute inset-0 bg-[#F6F1EA]/85 md:bg-transparent"></div>
              </div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  
                  {/* Left Column: Text, Seals & Buttons (sitting directly on background, NO glass bubble card) */}
                  <motion.div 
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className="md:col-span-7 lg:col-span-6 space-y-5 md:space-y-6 text-left"
                  >
                    <div className="space-y-1">
                      {/* Premium script tagline */}
                      <span className="font-cursive text-2.5xl md:text-3.5xl text-[#2E7D32] italic block leading-none font-medium mb-1">
                        Premium Indian Makhana
                      </span>
                      
                      {/* Pure, Nutritious, Globally Loved Headings in high-contrast serif */}
                      <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-stone-900 leading-[1.1] tracking-tight">
                        PURE. NUTRITIOUS.<br />
                        <span className="text-[#2E7D32]">GLOBALLY LOVED.</span>
                      </h1>
                    </div>

                    {/* Decorative elegant divider line with a leaf in the center */}
                    <div className="flex items-center gap-3 w-full max-w-[280px] py-1">
                      <div className="h-[1px] bg-[#2E7D32]/35 flex-grow"></div>
                      <Leaf className="w-4 h-4 text-[#2E7D32] flex-shrink-0" />
                      <div className="h-[1px] bg-[#2E7D32]/35 flex-grow"></div>
                    </div>

                    {/* Subtitle */}
                    <p className="text-stone-850 text-sm md:text-base leading-relaxed font-sans font-semibold max-w-md">
                      From the finest farms of India to your table.<br />
                      Healthy snacking with natural goodness.
                    </p>

                    {/* Premium Seals Section (Icons on top, label below, thin dividers) */}
                    <div className="flex items-center justify-between gap-1 sm:gap-2 max-w-md py-4 border-t border-b border-stone-300/60 my-2">
                      {/* 100% Natural */}
                      <div className="flex flex-col items-center flex-1">
                        <div className="w-11 h-11 rounded-full border border-[#2E7D32]/30 bg-white/70 flex items-center justify-center text-[#2E7D32] shadow-sm">
                          <Leaf className="w-4 h-4 text-[#2E7D32]" />
                        </div>
                        <span className="text-[9px] md:text-[10px] font-extrabold text-stone-700 text-center mt-2.5 tracking-wide uppercase leading-tight">100% Natural</span>
                      </div>
                      
                      {/* Divider */}
                      <div className="h-8 w-[1px] bg-stone-300/80"></div>

                      {/* High Protein */}
                      <div className="flex flex-col items-center flex-1">
                        <div className="w-11 h-11 rounded-full border border-[#2E7D32]/30 bg-white/70 flex items-center justify-center text-[#2E7D32] shadow-sm">
                          <Award className="w-4 h-4 text-[#2E7D32]" />
                        </div>
                        <span className="text-[9px] md:text-[10px] font-extrabold text-stone-700 text-center mt-2.5 tracking-wide uppercase leading-tight">High in Protein</span>
                      </div>

                      {/* Divider */}
                      <div className="h-8 w-[1px] bg-stone-300/80"></div>

                      {/* Gluten Free */}
                      <div className="flex flex-col items-center flex-1">
                        <div className="w-11 h-11 rounded-full border border-[#2E7D32]/30 bg-white/70 flex items-center justify-center text-[#2E7D32] shadow-sm">
                          <Wheat className="w-4 h-4 text-[#2E7D32]" />
                        </div>
                        <span className="text-[9px] md:text-[10px] font-extrabold text-stone-700 text-center mt-2.5 tracking-wide uppercase leading-tight">Gluten Free</span>
                      </div>

                      {/* Divider */}
                      <div className="h-8 w-[1px] bg-stone-300/80"></div>

                      {/* No Preservatives */}
                      <div className="flex flex-col items-center flex-1">
                        <div className="w-11 h-11 rounded-full border border-[#2E7D32]/30 bg-white/70 flex items-center justify-center text-[#2E7D32] shadow-sm">
                          <Ban className="w-4 h-4 text-[#2E7D32]" />
                        </div>
                        <span className="text-[9px] md:text-[10px] font-extrabold text-stone-700 text-center mt-2.5 tracking-wide uppercase leading-tight">No Preservatives</span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap gap-3.5 pt-2">
                      <button
                        onClick={() => setActiveView('shop')}
                        className="px-8 py-3.5 bg-[#2E7D32] hover:bg-[#1E5631] text-white rounded-lg flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Shop Now
                      </button>
                      
                      <button
                        onClick={() => {
                          setActiveView('categories');
                          window.scrollTo(0, 0);
                        }}
                        className="px-8 py-3.5 bg-transparent hover:bg-stone-900/5 text-stone-900 border border-stone-800 rounded-lg flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest transition-all hover:-translate-y-0.5 cursor-pointer"
                      >
                        Explore Products →
                      </button>
                    </div>
                  </motion.div>
                  
                </div>
              </div>
            </section>

            {/* SHOP BY CATEGORY SECTION (CAROUSEL WITH LEFT/RIGHT ARROWS) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
              <div className="text-center space-y-1">
                <span className="text-xs font-bold text-[#2E7D32] uppercase tracking-widest block">Explore Our World</span>
                <h2 className="font-serif text-2.5xl md:text-3.5xl font-extrabold text-[#111111]">Shop by Category</h2>
              </div>

              {/* Slider Container Wrapper with Relative Navigation Arrows */}
              <div className="relative px-8">
                {/* Left Arrow */}
                <button
                  onClick={() => {
                    const el = document.getElementById('category-scroll-container');
                    if (el) el.scrollBy({ left: -260, behavior: 'smooth' });
                  }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-stone-200 bg-white shadow-sm hover:shadow flex items-center justify-center text-stone-700 hover:text-[#2E7D32] hover:border-[#2E7D32]/30 transition-all z-10 cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Categories Scroll Container */}
                <div
                  id="category-scroll-container"
                  className="flex items-center justify-start md:justify-center gap-6 overflow-x-auto scrollbar-none py-4 px-2"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {[
                    {
                      name: 'Raw Makhana',
                      image: './assets/images/raw_makhana_jumbo_1781940261968.jpg?v=3',
                      onClick: () => {
                        setShopCategory('raw');
                        setShopSubcategory('all');
                        setRawExpanded(true);
                        setActiveView('shop');
                        window.scrollTo(0, 0);
                      }
                    },
                    {
                      name: 'Roasted Makhana',
                      image: './assets/images/roasted_makhana_golden_1781940274693.jpg?v=3',
                      onClick: () => {
                        setShopCategory('raw');
                        setShopSubcategory('roasted-raw');
                        setRawExpanded(true);
                        setActiveView('shop');
                        window.scrollTo(0, 0);
                      }
                    },
                    {
                      name: 'Flavoured Makhana',
                      image: './assets/images/cheese_makhana_cheddar_1781940285526.jpg?v=3',
                      onClick: () => {
                        setShopCategory('roasted');
                        setShopSubcategory('all');
                        setFlavorsExpanded(true);
                        setActiveView('shop');
                        window.scrollTo(0, 0);
                      }
                    },
                    {
                      name: 'Organic Makhana',
                      image: './assets/images/suta_6_makhana_1781947102519.jpg?v=3',
                      onClick: () => {
                        setShopCategory('raw');
                        setShopSubcategory('organic-raw');
                        setRawExpanded(true);
                        setActiveView('shop');
                        window.scrollTo(0, 0);
                      }
                    }
                  ].map((cat, idx) => (
                    <div
                      key={idx}
                      onClick={cat.onClick}
                      className="flex flex-col items-center flex-shrink-0 w-28 sm:w-32 md:w-36 group cursor-pointer"
                    >
                      {/* Round Circle Wrapper with custom shadow and golden border */}
                      <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden border border-amber-100 bg-stone-50 p-1.5 shadow-sm group-hover:shadow-md group-hover:border-[#2E7D32]/45 transition-all duration-300">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      {/* Name below circle */}
                      <span className="text-xs sm:text-sm font-semibold text-stone-800 group-hover:text-[#2E7D32] text-center mt-3 tracking-wide transition-colors">
                        {cat.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Right Arrow */}
                <button
                  onClick={() => {
                    const el = document.getElementById('category-scroll-container');
                    if (el) el.scrollBy({ left: 260, behavior: 'smooth' });
                  }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-stone-200 bg-white shadow-sm hover:shadow flex items-center justify-center text-stone-700 hover:text-[#2E7D32] hover:border-[#2E7D32]/30 transition-all z-10 cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </section>

            {/* BEST SELLERS SECTION */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
              <div className="text-center space-y-2">
                <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-[#111111] tracking-wider uppercase">
                  Best Sellers
                </h2>
                {/* Beautiful custom green leaf divider */}
                <div className="flex items-center justify-center gap-3 w-full max-w-[200px] mx-auto py-1">
                  <div className="h-[1px] bg-[#2E7D32]/35 flex-grow"></div>
                  <Leaf className="w-4 h-4 text-[#2E7D32] flex-shrink-0" />
                  <div className="h-[1px] bg-[#2E7D32]/35 flex-grow"></div>
                </div>
              </div>

              {/* Grid of 6 Cards mimicking the uploaded image layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
                {[
                  {
                    id: 'roasted-plain-raw',
                    displayName: 'Premium Classic Makhana (100g)',
                    realName: 'Slow-Roasted Crisp Plain Makhana',
                    price: 199,
                    mrp: 260,
                    rating: 4.9,
                    reviewsCount: 142,
                    image: './assets/images/classic_makhana_pouch_1783860782473.jpg?v=3'
                  },
                  {
                    id: 'roasted-pink-salt',
                    displayName: 'Himalayan Salt Makhana (100g)',
                    realName: 'Himalayan Pink Salt Slow-Baked Makhana',
                    price: 219,
                    mrp: 285,
                    rating: 4.9,
                    reviewsCount: 167,
                    image: './assets/images/himalayan_makhana_pouch_1783861060681.jpg?v=3'
                  },
                  {
                    id: 'roasted-peri-peri',
                    displayName: 'Peri Peri Makhana (100g)',
                    realName: 'Fiery Spicy Peri Peri Gourmet Makhana',
                    price: 229,
                    mrp: 295,
                    rating: 4.7,
                    reviewsCount: 322,
                    image: './assets/images/peri_peri_makhana_pouch_1783861321396.jpg?v=3'
                  },
                  {
                    id: 'roasted-cheese',
                    displayName: 'Cheese Makhana (100g)',
                    realName: 'Creamy Cheddar Cheese Gold Makhana',
                    price: 229,
                    mrp: 295,
                    rating: 4.8,
                    reviewsCount: 245,
                    image: './assets/images/cheese_makhana_pouch_1783861925140.jpg?v=3'
                  },
                  {
                    id: 'roasted-pudina-mint',
                    displayName: 'Mint Makhana (100g)',
                    realName: 'Gourmet Pudina Mint Herb Makhana',
                    price: 219,
                    mrp: 285,
                    rating: 4.7,
                    reviewsCount: 142,
                    image: './assets/images/mint_makhana_pouch_1783862500660.jpg?v=3'
                  },
                  {
                    id: 'roasted-combo-pack',
                    displayName: 'Premium Combo Pack (4 x 100g)',
                    realName: 'Premium Combo Pack (4 x 100g)',
                    price: 799,
                    mrp: 999,
                    rating: 4.9,
                    reviewsCount: 382,
                    image: './assets/images/combo_makhana_pouch_1783862785114.jpg?v=3'
                  }
                ].map((card, idx) => {
                  const targetProduct = shopProducts.find(p => p.id === card.id);
                  const isWishlisted = wishlist.some(w => w.id === card.id);
                  return (
                    <div
                      key={idx}
                      className="bg-white border border-stone-100 rounded-3xl p-3.5 flex flex-col justify-between hover:shadow-lg hover:border-[#2E7D32]/10 transition-all duration-300"
                    >
                      {/* Product Image click opens detail */}
                      <div
                        onClick={() => {
                          if (targetProduct) {
                            handleSelectProductFromList(targetProduct);
                          }
                        }}
                        className="aspect-square bg-stone-50 rounded-2xl overflow-hidden relative cursor-pointer group border border-stone-50/50"
                      >
                        <img
                          src={card.image}
                          alt={card.displayName}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                        {/* Elegant Discount Badge */}
                        <span className="absolute top-2 left-2 bg-[#2E7D32] text-white font-extrabold text-[9px] px-2.5 py-0.5 rounded-full shadow-sm">
                          {Math.round(((card.mrp - card.price) / card.mrp) * 100)}% OFF
                        </span>
                      </div>

                      {/* Info Area */}
                      <div className="mt-3.5 space-y-1.5 flex-1 flex flex-col justify-between">
                        <div>
                          <h4
                            onClick={() => {
                              if (targetProduct) {
                                handleSelectProductFromList(targetProduct);
                              }
                            }}
                            className="font-serif font-bold text-xs text-stone-900 hover:text-[#2E7D32] transition-colors leading-snug line-clamp-2 cursor-pointer h-10 mb-1"
                          >
                            {card.displayName}
                          </h4>

                          {/* Star Rating Row */}
                          <div className="flex items-center text-amber-500 gap-0.5 text-[10px] font-bold">
                            <span className="text-sm">★</span>
                            <span className="text-stone-500">
                              {card.rating} ({card.reviewsCount})
                            </span>
                          </div>
                        </div>

                        {/* Price block */}
                        <div className="pt-1 flex items-baseline gap-1.5">
                          <span className="font-extrabold text-stone-900 text-base">₹{card.price}</span>
                          <span className="text-[10px] text-stone-400 line-through">₹{card.mrp}</span>
                        </div>
                      </div>

                      {/* Action buttons matching the image style */}
                      <div className="pt-3 mt-3 border-t border-stone-100 flex gap-2 items-center">
                        {/* ADD TO CART button (full width-ish) */}
                        <button
                          onClick={() => {
                            if (targetProduct) {
                              handleAddToCart({
                                product: targetProduct,
                                selectedWeight: card.id === 'roasted-combo-pack' ? '4 x 100g Pack' : '100g',
                                quantity: 1
                              });
                              alert(`Added ${card.displayName} to your Cart successfully!`);
                            }
                          }}
                          className="flex-grow py-2.5 bg-[#2E7D32] hover:bg-emerald-800 text-white font-bold text-[10px] uppercase tracking-wider rounded-xl shadow-sm hover:shadow transition-all cursor-pointer text-center"
                        >
                          Add to Cart
                        </button>

                        {/* Heart Icon on side */}
                        <button
                          onClick={() => {
                            if (targetProduct) {
                              handleAddToWishlist(targetProduct);
                            }
                          }}
                          className={`p-2.5 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                            isWishlisted
                              ? 'bg-red-50 border-red-200 text-red-500'
                              : 'bg-white border-stone-200 text-stone-400 hover:text-red-500 hover:border-red-200'
                          }`}
                          title="Add to Wishlist"
                        >
                          <Heart className="w-4 h-4" fill={isWishlisted ? "currentColor" : "none"} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SUTA SIZE GUIDE EXPLAINED TAB (BRAND STRATEGIST FEATURE OUTSTANDING) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="p-8 sm:p-12 md:p-16 bg-white border border-amber-100/60 rounded-3xl text-stone-900 shadow-sm relative overflow-hidden">
                {/* Decorative subtle leaf branch SVG background */}
                <svg className="absolute top-4 right-4 w-40 h-40 sm:w-64 sm:h-64 text-[#2E7D32]/5 pointer-events-none select-none" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
                  <path d="M20,95 C45,75 70,55 85,25" />
                  <path d="M35,80 C48,78 60,82 72,88 C62,82 52,70 35,80 Z" fill="currentColor" fillOpacity="0.02" />
                  <path d="M48,65 C62,58 75,58 87,66 C76,62 64,54 48,65 Z" fill="currentColor" fillOpacity="0.02" />
                  <path d="M60,48 C72,36 84,32 92,42 C82,35 70,36 60,48 Z" fill="currentColor" fillOpacity="0.02" />
                  <path d="M72,30 C82,18 90,12 96,22 C86,15 76,18 72,30 Z" fill="currentColor" fillOpacity="0.02" />
                </svg>

                <div className="max-w-4xl mb-12 text-center md:text-left relative z-10">
                  <div className="inline-flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-bold tracking-widest text-[#2E7D32] uppercase block">Our Grading Integrity</span>
                    <div className="w-12 h-[1px] bg-[#2E7D32]/40"></div>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-3 text-stone-900">
                    Understanding <span className="text-[#2E7D32]">Suta Classification</span> & Sizing
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 max-w-2xl leading-relaxed font-sans font-medium">
                    In standard food markets, fox nuts are often bleached to cover grades mix. Makhana World pledges strict raw size sorting for even baking and crispness.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                  {[
                    {
                      suta: '4 Suta',
                      size: 'Medium (9mm - 11mm)',
                      desc: 'Ideal for everyday cooking, curries, and standard roasting.',
                      img: './assets/images/suta_4_makhana_1781947059850.jpg',
                      gauge: '9mm - 11mm',
                      icon: (
                        <svg className="w-6 h-6 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M4 10h16M4 10c0-3 1.5-5 4-5h8c2.5 0 4 2 4 5M4 10v8c0 2 2 3 5 3h6c3 0 5-1 5-3v-8M9 5V3h6v2M12 14v4" />
                        </svg>
                      )
                    },
                    {
                      suta: '5 Suta',
                      size: 'Large (11mm - 13mm)',
                      desc: 'Premium uniform size preferred for commercial popping and spices.',
                      img: './assets/images/suta_5_makhana_1781947090931.jpg',
                      gauge: '11mm - 13mm',
                      icon: (
                        <svg className="w-6 h-6 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M2 10h20M4 10c0 4 2.5 8 8 8s8-4 8-8M12 4v3M8 5v2M16 5v2" />
                        </svg>
                      )
                    },
                    {
                      suta: '6 Suta',
                      size: 'Super Large (13mm - 15mm)',
                      desc: 'Selected large sized kernels offering incredible airy crunch.',
                      img: './assets/images/suta_6_makhana_1781947102519.jpg',
                      gauge: '13mm - 15mm',
                      icon: (
                        <svg className="w-6 h-6 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M3 11c0 4.5 3.5 8 9 8s9-3.5 9-8H3z" />
                          <path d="M12 6.5C11.5 5 9.5 4 8.5 5c-1.5 1.5 1 4 3.5 5 2.5-1 5-3.5 3.5-5-1-1-3 0-3.5 1.5z" />
                        </svg>
                      )
                    },
                    {
                      suta: '7 Suta (Jumbo)',
                      size: 'Colossal (15mm+)',
                      desc: 'Supreme grade handpicked colossal kernels. Pure visual and culinary gold.',
                      img: './assets/images/suta_7_makhana_1781947116055.jpg',
                      gauge: '15mm+',
                      icon: (
                        <svg className="w-6 h-6 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M3 6l3 12h12l3-12-5 4-4-6-4 6-5-4zM6 18h12" />
                        </svg>
                      )
                    }
                  ].map((spec, i) => (
                    <div key={i} className="flex flex-col bg-white border border-stone-150 border-stone-200/50 rounded-2xl p-4 sm:p-5 hover:border-[#2E7D32]/30 hover:shadow-lg transition-all duration-500 group text-center h-full">
                      {/* Image container */}
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-stone-100 bg-stone-50 shadow-sm mb-6">
                        <img 
                          src={spec.img} 
                          alt={spec.suta} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/10 to-transparent"></div>
                        
                        {/* Size badge circles */}
                        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center z-10 w-full">
                          <div className="w-10 h-10 rounded-full border border-[#D4AF37] bg-white flex items-center justify-center shadow-sm">
                            <svg className="w-4 h-4 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M5 6h14v12H5z" />
                              <path d="M9 6v4M13 6v4M17 6v4" />
                            </svg>
                          </div>
                          <div className="mt-1 bg-[#FFFDF9] border border-[#D4AF37] px-2.5 py-0.5 rounded-full shadow-sm text-[9px] font-extrabold text-[#D4AF37] whitespace-nowrap">
                            {spec.gauge}
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="mt-4 flex-1 flex flex-col items-center">
                        <h4 className="text-[#2E7D32] font-serif font-extrabold text-xl sm:text-2xl mb-1 tracking-tight group-hover:text-[#2E7D32] transition-colors">
                          {spec.suta}
                        </h4>
                        <span className="text-[11px] sm:text-xs text-stone-700 font-extrabold tracking-wide font-sans mb-3">
                          {spec.size}
                        </span>
                        
                        {/* Golden separator line */}
                        <div className="w-8 h-[1px] bg-[#D4AF37]/50 group-hover:w-12 transition-all duration-500 mb-3"></div>
                        
                        <p className="text-[11px] sm:text-xs text-stone-500 leading-relaxed font-sans max-w-[210px] mb-6 flex-1">
                          {spec.desc}
                        </p>
                        
                        {/* Custom Utensils Icon */}
                        <div className="mt-auto pt-2 text-[#D4AF37] opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                          {spec.icon}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            {/* HEALTH BENEFITS CAROUSEL PREVIEW (SEO WEALTH) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
              <div className="text-center space-y-2">
                <span className="text-xs font-bold text-[#2E7D32] uppercase tracking-widest block">Wellness Heuristics</span>
                <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-[#111111]">6 Clinical Health Advantages Of Foxnuts</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {HEALTH_BENEFITS.map((benefit, idx) => (
                  <div key={idx} className="p-5 bg-white border border-stone-100 rounded-2xl relative shadow-sm overflow-hidden hover:border-[#2E7D32] transition-all">
                    <span className="text-stone-100 font-extrabold text-5xl absolute top-3 right-4 select-none leading-none">
                      0{idx + 1}
                    </span>
                    <h4 className="font-serif font-bold text-base text-[#111111] mb-2">{benefit.title}</h4>
                    <p className="text-xs text-stone-500 leading-relaxed font-sans">{benefit.description}</p>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <button
                  onClick={() => setActiveView('benefits')}
                  className="px-6 py-3 border-2 border-[#2E7D32] text-[#2E7D32] hover:bg-[#2E7D32]/5 rounded-xl font-bold text-xs cursor-pointer inline-flex items-center gap-1.5"
                >
                  Read Detailed Clinical Sizing Data →
                </button>
              </div>
            </section>


            {/* FAQs Preview */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="text-center space-y-1">
                <span className="text-xs font-bold text-[#2E7D32] uppercase tracking-widest block">Customer Support</span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold">Frequently Asked questions</h3>
              </div>

              <div className="space-y-4">
                {FAQS.slice(0, 3).map((faq, i) => (
                  <div key={i} className="p-4 bg-white border border-stone-100 rounded-2xl shadow-sm">
                    <h5 className="font-serif font-bold text-stone-900 text-sm mb-1.5 flex gap-2">
                      <HelpCircle className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                      {faq.question}
                    </h5>
                    <p className="text-xs text-stone-500 pl-6 leading-relaxed font-sans">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}

        {/* VIEW 2: SHOP PAGE (ULTRA HIGH-INTEGRITY FILTERS & ITEMS) */}
        {activeView === 'shop' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            <div className="border-b border-stone-200 pb-5">
              <span className="text-xs font-bold text-[#2E7D32] uppercase tracking-widest block">Mithila Warehouse Inventory</span>
              <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-[#111111]">Explore Our Premium Makhana Catalog</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Categories Sidebar */}
              <div className="lg:col-span-3 lg:sticky lg:top-24 space-y-4">
                {/* Desktop Sidebar: hidden on mobile/tablet */}
                <div className="hidden lg:block bg-white border border-amber-100 rounded-3xl p-5 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 text-stone-900 font-serif font-extrabold text-base pb-2 border-b border-stone-100">
                    <span className="text-[#2E7D32] text-xs">▶</span>
                    <span>Categories</span>
                  </div>
                  {renderCategoryTree(false)}
                </div>

                {/* Mobile Sidebar Toggle: visible only on mobile/tablet */}
                <div className="lg:hidden">
                  <button 
                    onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                    className="w-full flex items-center justify-between bg-white border border-amber-100 rounded-2xl p-4 shadow-sm text-sm font-bold text-[#111111] hover:bg-stone-50 transition-all cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-[#2E7D32]" />
                      <span>Category: {
                        shopSubcategory !== 'all' 
                          ? categoryNamesMap[shopSubcategory] || shopSubcategory 
                          : shopCategory === 'all' 
                            ? 'All Products' 
                            : shopCategory === 'raw' 
                              ? 'Raw' 
                              : shopCategory === 'roasted' 
                                ? 'Flavors' 
                                : 'Wholesale & Bulk'
                      }</span>
                    </span>
                    <ChevronDown className={`w-4 h-4 text-stone-500 transition-transform duration-300 ${mobileFiltersOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Mobile Collapsible Body */}
                  <div 
                    className={`mt-2 bg-white border border-amber-100 rounded-2xl p-4 shadow-sm space-y-4 transition-all duration-300 overflow-hidden ${
                      mobileFiltersOpen ? 'max-h-[800px] opacity-100 py-4' : 'max-h-0 opacity-0 py-0 border-none pointer-events-none'
                    }`}
                  >
                    {renderCategoryTree(true)}
                  </div>
                </div>
              </div>

              {/* Right Column: Search & Products Grid */}
              <div className="lg:col-span-9 space-y-6">
                {/* Search filter drawer */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search catalog for flavors, sizes, or keywords (e.g. 'Peri Peri', '5 Suta')..."
                    value={shopSearch}
                    onChange={(e) => setShopSearch(e.target.value)}
                    className="w-full p-3.5 pl-11 bg-white border border-amber-100 rounded-2xl shadow-inner text-sm focus:border-[#2E7D32] focus:outline-none"
                  />
                  <Search className="absolute left-4 top-4.5 w-4.5 h-4.5 text-stone-400" />
                </div>

                {/* Products grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {getFilteredShopProducts().map((product) => {
                const offPercent = Math.round(((product.mrp - product.price) / product.mrp) * 100);
                return (
                  <div
                    key={product.id}
                    className="p-3 bg-white border border-stone-150 border-stone-100 rounded-2xl flex flex-col justify-between hover:shadow-lg transition-all duration-300"
                  >
                    <div 
                      className="aspect-square rounded-xl overflow-hidden bg-stone-50 relative border border-stone-50 cursor-pointer group"
                      onClick={() => handleSelectProductFromList(product)}
                    >
                      <img 
                        src={product.images[0]} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-2 left-2 bg-gradient-to-r from-[#2E7D32] to-emerald-800 text-white font-extrabold text-[9px] px-2.5 py-0.5 rounded-full shadow-sm">
                        {offPercent}% OFF
                      </span>
                    </div>

                    <div className="mt-3.5 space-y-1 pl-1">
                      <div className="flex justify-between items-center text-[10px] font-bold text-stone-400">
                        <span>{product.category.toUpperCase()}</span>
                        {product.sutaSize && <span className="text-[#2E7D32]">{product.sutaSize}</span>}
                      </div>

                      <h4 
                        onClick={() => handleSelectProductFromList(product)}
                        className="font-serif font-bold text-sm text-stone-900 hover:text-[#2E7D32] transition-colors leading-tight line-clamp-1 cursor-pointer"
                      >
                        {product.name}
                      </h4>

                      <div className="flex items-center text-amber-500 gap-1 text-[11px] font-bold">
                        ★ <span>{product.rating} ({product.reviewsCount})</span>
                      </div>
                    </div>

                    <div className="pt-2.5 mt-2 border-t border-stone-50 flex items-center justify-between gap-3 pl-1">
                      <div>
                        <span className="block text-[10px] text-stone-400 line-through">₹{product.mrp}</span>
                        <span className="font-bold text-stone-900 text-base">₹{product.price}</span>
                      </div>

                      <button
                        onClick={() => handleSelectProductFromList(product)}
                        className="p-2 bg-gradient-to-r from-[#2E7D32] to-emerald-800 text-white rounded-xl shadow hover:opacity-90 transition-opacity cursor-pointer"
                        title="Configure specs & weights"
                      >
                        <ShoppingCart className="w-4.5 h-4.5" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

            {getFilteredShopProducts().length === 0 && (
              <div className="text-center py-20 bg-white border border-stone-100 rounded-3xl">
                <p className="text-stone-500 font-bold mb-1">No products found matching active constraints.</p>
                <button onClick={() => { setShopCategory('all'); setShopSearch(''); }} className="text-xs text-[#2E7D32] font-semibold underline">
                  Show All 14+ In Stock Variants
                </button>
              </div>
            )}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: HEALTH BENEFITS DETAILED */}
        {activeView === 'benefits' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold text-[#2E7D32] uppercase tracking-widest block">Clinical Wellness Reports</span>
              <h2 className="font-serif text-2xl md:text-4xl font-extrabold text-[#111111]">Makhana: The Alkaline Superfood</h2>
              <p className="text-sm text-stone-500">Traditional Ayurvedic texts pair makhana with deep digestive restoration and cardiac fitness. Modern cellular diagnostics explain why.</p>
            </div>

            {/* Structured Table breakdown */}
            <div className="p-6 bg-white border border-amber-100 rounded-3xl space-y-6">
              <h3 className="font-serif font-bold text-stone-800 text-lg">Nutritional Comparison Guide (Per 100g serving)</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-stone-600 font-sans border-collapse">
                  <thead className="bg-[#111111] text-[#D4AF37] font-serif uppercase tracking-widest text-[9px]">
                    <tr>
                      <th className="p-3.5">Metric / Crop nutrient</th>
                      <th className="p-3.5">Makhana (Fox Nuts)</th>
                      <th className="p-3.5">White Potato Chips</th>
                      <th className="p-3.5">Popped Popcorn</th>
                      <th className="p-3.5">Salted Roasted Peanuts</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    <tr className="hover:bg-amber-100/10">
                      <td className="p-3 font-bold text-stone-900">Total Fats (Fray-Free)</td>
                      <td className="p-3 font-semibold text-[#2E7D32] bg-green-50/50">0.1g - 0.3g (Baked)</td>
                      <td className="p-3 text-stone-500">35.0g (Heavy trans oils)</td>
                      <td className="p-3 text-stone-500">4.5g</td>
                      <td className="p-3 text-stone-500">49.2g</td>
                    </tr>
                    <tr className="hover:bg-amber-100/10">
                      <td className="p-3 font-bold text-stone-900">Plant Bio-Proteins</td>
                      <td className="p-3 font-semibold text-[#2E7D32] bg-green-50/50">9.7g - 11.2g</td>
                      <td className="p-3 text-stone-500">5.3g</td>
                      <td className="p-3 text-stone-500">12.0g</td>
                      <td className="p-3 text-stone-500">25.8g (Heavy allergens)</td>
                    </tr>
                    <tr className="hover:bg-amber-100/10">
                      <td className="p-3 font-bold text-stone-900">Skeletal Calcium</td>
                      <td className="p-3 font-semibold text-[#2E7D32] bg-green-50/50">60mg - 85mg</td>
                      <td className="p-3 text-stone-500">12mg</td>
                      <td className="p-3 text-stone-500">8mg</td>
                      <td className="p-3 text-stone-500">92mg</td>
                    </tr>
                    <tr className="hover:bg-amber-100/10">
                      <td className="p-3 font-bold text-stone-900">Magnesium Minerals</td>
                      <td className="p-3 font-semibold text-[#2E7D32] bg-green-50/50">210mg</td>
                      <td className="p-3 text-stone-500">35mg</td>
                      <td className="p-3 text-stone-500">144mg</td>
                      <td className="p-3 text-stone-500">168mg</td>
                    </tr>
                    <tr className="hover:bg-amber-100/10">
                      <td className="p-3 font-bold text-stone-900">Glycemic Index (GI) Value</td>
                      <td className="p-3 font-semibold text-[#2E7D32] bg-green-50/50">Extremely Low (~35-40)</td>
                      <td className="p-3 text-stone-500">Very High (95+)</td>
                      <td className="p-3 text-stone-500">Moderate (~55)</td>
                      <td className="p-3 text-stone-500">Low (~15)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-[#2E7D32]/5 border border-emerald-100 rounded-2xl flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#2E7D32] flex-shrink-0 mt-0.5" />
                <p className="text-xs text-stone-700">
                  <strong>Clinical Summary:</strong> Unlike standard root tubers or seed pods, popped Euryale fox nuts have low moisture affinity, allowing them to remain crispy without chemical preservatives. They slow glucose entering the circulatory stream, giving athletes, children and diabetic patients deep, consistent energy focus.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 5: BULK TRANSACTION RFQ (DEALER REGISTRATION) */}
        {activeView === 'bulk' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Info Col 5 cols */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-bold text-[#2E7D32] uppercase tracking-widest block">Commercial B2B Trading</span>
                <h2 className="font-serif text-2xl md:text-3.5xl font-extrabold text-[#111111]">Wholesale Distribution Portal</h2>
                <p className="text-xs text-stone-500 mt-1">Get custom farm-gate bulk quotes straight from Bihar farmer unions.</p>
              </div>

              <div className="p-4 bg-white border border-amber-100 rounded-2xl space-y-3 font-sans">
                <span className="block text-xs font-bold text-stone-850 uppercase text-stone-800">Available services:</span>
                <ul className="text-xs text-stone-605 space-y-2 text-stone-600">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#2E7D32] flex-shrink-0" />
                    <span><strong>Distributor & Dealer Licenses:</strong> Register to represent Makhana World raw or roasted collections inside your county.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#2E7D32] flex-shrink-0" />
                    <span><strong>Institution & Corporate Offices:</strong> Secure curated work snacks pouches or custom diwali festival corporate boxes.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#2E7D32] flex-shrink-0" />
                    <span><strong>MOQ Guidelines:</strong> Standard raw crop MOQ starts at 50kg bag loads. Roasted starts at 100 canisters combo.</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-[#111111] text-white rounded-2xl">
                <span className="block text-[10px] text-[#D4AF37] uppercase tracking-widest font-mono font-bold">Trading Help desk line</span>
                <span className="block text-base font-serif font-bold mt-1">Sourcing Office, Greater Noida:</span>
                <a href="tel:+919310730291" className="text-base text-gradient bg-gradient-to-r from-emerald-400 to-[#D4AF37] block font-bold mt-1">
                  📞 +91 93107 30291 (Trading Desk)
                </a>
              </div>
            </div>

            {/* Form Col 7 cols */}
            <div className="lg:col-span-7 bg-white border border-amber-100 rounded-3xl p-6 md:p-8">
              <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">Request Wholesales Quotation</h3>
              <p className="text-xs text-stone-400 mb-6">Complete this dealer registry. Submissions populate our partner operations panel for quick phytosanitary pricing.</p>

              {bulkSuccess ? (
                <div className="p-5 bg-gradient-to-r from-[#2E7D32]/10 to-emerald-50 border border-[#2E7D32]/20 text-[#2E7D32] text-xs font-bold rounded-2xl text-center space-y-2">
                  <p className="uppercase text-sm tracking-wider">✦ RFQ Submission registered successfully!</p>
                  <p className="font-sans font-medium text-stone-600">
                    Your dealer application has been uploaded into the local Bihar warehouse system. An official representative is drafting quote terms based on your quantity needs.
                  </p>
                  <span className="block text-[10px] text-stone-400 mt-2 font-mono">Enquiry active in Partner portal.</span>
                </div>
              ) : (
                <form onSubmit={handleBulkSubmit} className="space-y-4 text-xs font-semibold text-stone-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-stone-500 uppercase mb-1">Your Name</label>
                      <input
                        type="text"
                        value={bulkFormName}
                        onChange={(e) => setBulkFormName(e.target.value)}
                        placeholder="e.g. Swarup Patil"
                        className="w-full p-2.5 bg-[#F8F5F0] border border-stone-200 rounded-lg outline-none focus:border-[#2E7D32]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-stone-500 uppercase mb-1">Company / Organization</label>
                      <input
                        type="text"
                        value={bulkFormCompany}
                        onChange={(e) => setBulkFormCompany(e.target.value)}
                        placeholder="e.g. Swarup Organic Stores"
                        className="w-full p-2.5 bg-[#F8F5F0] border border-stone-200 rounded-lg outline-none focus:border-[#2E7D32]"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-stone-500 uppercase mb-1">Corporate Email Address</label>
                      <input
                        type="email"
                        value={bulkFormEmail}
                        onChange={(e) => setBulkFormEmail(e.target.value)}
                        placeholder="e.g. swarup@organicstores.com"
                        className="w-full p-2.5 bg-[#F8F5F0] border border-stone-200 rounded-lg outline-none focus:border-[#2E7D32]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-stone-500 uppercase mb-1">Phone Number (Calling / Whatsapp)</label>
                      <input
                        type="tel"
                        value={bulkFormPhone}
                        onChange={(e) => setBulkFormPhone(e.target.value)}
                        placeholder="e.g. +91 93107 30291"
                        className="w-full p-2.5 bg-[#F8F5F0] border border-stone-200 rounded-lg outline-none focus:border-[#2E7D32]"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-stone-500 uppercase mb-1">Distribution Role</label>
                      <select
                        value={bulkFormRole}
                        onChange={(e) => setBulkFormRole(e.target.value as any)}
                        className="w-full p-2.5 bg-[#F8F5F0] border border-stone-200 rounded-lg outline-none focus:border-[#2E7D32]"
                      >
                        <option value="Distributor">Regional Importer / Distributor</option>
                        <option value="Dealer">Gourmet Food Retailer / Dealer</option>
                        <option value="Hotel/Restaurant">Hotel & Restaurant Supply</option>
                        <option value="Corporate">Corporate Satiety Gifting</option>
                        <option value="Other">Other Category</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-stone-500 uppercase mb-1">Target Quantity Needed</label>
                      <select
                        value={bulkFormQty}
                        onChange={(e) => setBulkFormQty(e.target.value)}
                        className="w-full p-2.5 bg-[#F8F5F0] border border-stone-200 rounded-lg outline-none focus:border-[#2E7D32]"
                      >
                        <option value="50kg Bags Load">50kg (Wholesale starter load)</option>
                        <option value="250 Kilograms">250kg - 500kg Sacks</option>
                        <option value="1 Metric Ton">Cardboard container loads (1MT+)</option>
                        <option value="Full Export Load">Sea FCL Dry cargo Container (8MT+)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-500 uppercase mb-1">Detailed Sourcing Requirements & Cargo terms</label>
                    <textarea
                      value={bulkFormMsg}
                      onChange={(e) => setBulkFormMsg(e.target.value)}
                      placeholder="Please note desired suta sizes (e.g. 5 Suta, 6 Suta raw), white-label branding specifications, shipping address, etc."
                      className="w-full p-2.5 bg-[#F8F5F0] border border-stone-200 rounded-lg outline-none focus:border-[#2E7D32]"
                      rows={4}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full h-12 bg-[#2E7D32] hover:bg-[#2E7D32]/95 text-white font-bold rounded-2xl shadow-md cursor-pointer hover:scale-[1.01] transition-transform"
                  >
                    ✓ Complete Wholesaler registration & Dispatch RFQ
                  </button>
                </form>
              )}

            </div>
          </div>
        )}

        {/* VIEW 6: DIRECT EXPORT PORTAL */}
        {activeView === 'export' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Info Col */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-bold text-[#2E7D32] uppercase tracking-widest block">Direct Export Registry</span>
                <h2 className="font-serif text-2xl md:text-3.5xl font-extrabold text-[#111111]">Mithila International Sea Cargo Shipping</h2>
                <p className="text-xs text-stone-500 mt-1">Connecting the wetlands of Bihar direct to global grocery chains (US, UK, Japan, UAE, Europe).</p>
              </div>

              {/* Certificates checklist */}
              <div className="p-4 bg-white border border-amber-100 rounded-2xl space-y-3 font-sans">
                <span className="block text-xs font-bold text-stone-800 uppercase">Official phytosanitary credentials:</span>
                <div className="space-y-2">
                  {CERTIFICATES.map((cert, idx) => (
                    <div key={idx} className="flex gap-2.5 text-xs text-stone-600">
                      <ShieldCheck className="w-5 h-5 text-[#2E7D32] flex-shrink-0" />
                      <div>
                        <strong className="text-stone-850 block">{cert.name}</strong>
                        <span className="text-[10px] text-stone-400 uppercase font-bold">{cert.body} | Code: {cert.code}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-stone-900 text-white rounded-2xl">
                <span className="block text-[10px] text-[#D4AF37] uppercase tracking-widest font-mono">Export Operations Desk</span>
                <p className="text-xs text-stone-400 mt-1.5 leading-relaxed font-sans font-medium">
                  All sea cargo loads comply strictly with standard food safety regulations globally. FCL dry containers are ventilated and packed inside multi-layered, poly-lined, heavy-duty moisture-proof sacks.
                </p>
              </div>
            </div>

            {/* Form Col */}
            <div className="lg:col-span-7 bg-white border border-amber-100 rounded-3xl p-6 md:p-8">
              <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">Request International FOB/CIF Quote</h3>
              <p className="text-xs text-stone-400 mb-6">Complete our maritime trading registration. Leads populate the partner cargo panel for custom custom clearances.</p>

              {expSuccess ? (
                <div className="p-5 bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold rounded-2xl text-center space-y-2">
                  <p className="uppercase text-sm tracking-wider">✦ International cargo RFQ registered! ✦</p>
                  <p className="font-sans font-medium text-stone-600">
                    Your export request has entered our global customs trading desk queue. An officer coordinates raw container sorting rates straight from our Bihar cooperatives.
                  </p>
                  <span className="block text-[10px] text-indigo-400 mt-2 font-mono">Clearance profile compiled in Partner CMS.</span>
                </div>
              ) : (
                <form onSubmit={handleExportSubmit} className="space-y-4 text-xs font-semibold text-stone-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-stone-500 uppercase mb-1">Cargo Contact Name</label>
                      <input
                        type="text"
                        value={expFormName}
                        onChange={(e) => setExpFormName(e.target.value)}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full p-2.5 bg-[#F8F5F0] border border-stone-200 rounded-lg outline-none focus:border-[#2E7D32]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-stone-500 uppercase mb-1">Company / Importer Name</label>
                      <input
                        type="text"
                        value={expFormCompany}
                        onChange={(e) => setExpFormCompany(e.target.value)}
                        placeholder="e.g. Whole Foods LLC UK"
                        className="w-full p-2.5 bg-[#F8F5F0] border border-stone-200 rounded-lg outline-none focus:border-[#2E7D32]"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-stone-500 uppercase mb-1">Target Country</label>
                      <input
                        type="text"
                        value={expFormCountry}
                        onChange={(e) => setExpFormCountry(e.target.value)}
                        placeholder="e.g. United Kingdom"
                        className="w-full p-2.5 bg-[#F8F5F0] border border-stone-200 rounded-lg outline-none focus:border-[#2E7D32]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-stone-500 uppercase mb-1">Importer Email address</label>
                      <input
                        type="email"
                        value={expFormEmail}
                        onChange={(e) => setExpFormEmail(e.target.value)}
                        placeholder="e.g. sjenkins@wholefoods.co.uk"
                        className="w-full p-2.5 bg-[#F8F5F0] border border-stone-200 rounded-lg outline-none focus:border-[#2E7D32]"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-stone-500 uppercase mb-1">Phone Number (Maritime Direct)</label>
                      <input
                        type="tel"
                        value={expFormPhone}
                        onChange={(e) => setExpFormPhone(e.target.value)}
                        placeholder="e.g. +44 20 7946 0958"
                        className="w-full p-2.5 bg-[#F8F5F0] border border-stone-200 rounded-lg outline-none focus:border-[#2E7D32]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-stone-500 uppercase mb-1">Cargo packaging preference</label>
                      <select
                        value={expFormPacking}
                        onChange={(e) => setExpFormPacking(e.target.value)}
                        className="w-full p-2.5 bg-[#F8F5F0] border border-stone-200 rounded-lg outline-none focus:border-[#2E7D32]"
                      >
                        <option value="Direct Wholesale Sacks">Direct Bulk Multi-wall Woven sacks</option>
                        <option value="Private Label OEM Pouches">Private Label OEM Custom Pouches</option>
                        <option value="Vacuum Fresh Jars pack">Vacuum sealed Fresh glass canisters</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-500 uppercase mb-1">Specific Sourcing requirements (Moisture limits, Organic standard flags...)</label>
                    <textarea
                      value={expFormMsg}
                      onChange={(e) => setExpFormMsg(e.target.value)}
                      placeholder="Please note customs chemical tests criteria, preferred port of discharge (e.g. London Gateway, port of Tokyo) and private labeling parameters."
                      className="w-full p-2.5 bg-[#F8F5F0] border border-stone-200 rounded-lg outline-none focus:border-[#2E7D32]"
                      rows={4}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full h-12 bg-stone-900 hover:bg-stone-950 text-[#D4AF37] font-bold rounded-2xl shadow-md cursor-pointer hover:scale-[1.01] transition-transform border border-stone-800"
                  >
                    ✓ Complete Maritime registration & Submit Cargo RFQ
                  </button>
                </form>
              )}

            </div>
          </div>
        )}

        {/* VIEW 7: WHOLESOME BLOG ARTICLES */}
        {activeView === 'blog' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
            <div className="border-b border-gray-200 pb-5">
              <span className="text-xs font-bold text-[#2E7D32] uppercase tracking-widest block">Wholesome Living</span>
              <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-[#111111]">Makhana World Wellness Blog Articles</h2>
              <p className="text-xs text-stone-500 mt-1">SEO optimized scientific tutorials about agricultural sifting, health diets and organic wet preservation.</p>
            </div>

            {activeBlogId ? (
              <div className="bg-white border border-amber-100 rounded-3xl p-6 md:p-8 space-y-6 animate-fadeIn">
                <button
                  onClick={() => setActiveBlogId(null)}
                  className="text-xs font-bold text-[#2E7D32] hover:underline cursor-pointer"
                >
                  ← Back to Wellness Articles Grid
                </button>

                {(() => {
                  const article = BLOGS.find(b => b.id === activeBlogId);
                  if (!article) return null;
                  return (
                    <article className="space-y-6">
                      <div className="space-y-2">
                        <span className="text-xs font-bold bg-[#2E7D32]/10 text-[#2E7D32] px-3 py-1 rounded-full uppercase">
                          {article.tags[0]}
                        </span>
                        <h1 className="font-serif text-2xl md:text-4.5xl font-extrabold text-[#111111] leading-tight">
                          {article.title}
                        </h1>

                        <div className="flex flex-wrap gap-4 text-xs text-stone-500 font-mono uppercase">
                          <span>By {article.author}</span>
                          <span>|</span>
                          <span>Published {article.date}</span>
                          <span>|</span>
                          <span className="text-[#2E7D32] font-semibold">✓ Peer Reviewed Wellness Log</span>
                        </div>
                      </div>

                      <div className="aspect-video w-full rounded-2xl overflow-hidden shadow">
                        <img src={article.image} alt="" className="w-full h-full object-cover" />
                      </div>

                      <div className="text-sm font-sans text-stone-700 leading-relaxed space-y-4 prose max-w-none">
                        {article.content.split('\n\n').map((para, i) => {
                          if (para.startsWith('###')) {
                            return <h3 key={i} className="font-serif text-lg font-bold text-stone-900 pt-3">{para.replace('###', '')}</h3>;
                          }
                          return <p key={i}>{para}</p>;
                        })}
                      </div>
                    </article>
                  );
                })()}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {BLOGS.map((article) => (
                  <div key={article.id} className="bg-white border border-stone-100 rounded-2xl overflow-hidden flex flex-col justify-between shadow-sm group">
                    <div>
                      <div className="h-44 bg-stone-50 overflow-hidden relative">
                        <img src={article.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        <span className="absolute bottom-3 left-3 bg-[#111111]/80 text-white font-mono text-[9px] px-2 py-0.5 rounded uppercase">
                          {article.readTime}
                        </span>
                      </div>
                      <div className="p-4 space-y-2">
                        <span className="text-[10px] font-extrabold uppercase text-[#2E7D32]">
                          {article.tags[0]}
                        </span>
                        <h4 className="font-serif font-bold text-base text-stone-900 group-hover:text-[#2E7D32] leading-tight transition-colors line-clamp-1">
                          {article.title}
                        </h4>
                        <p className="text-xs text-stone-500 line-clamp-3 leading-relaxed font-sans font-medium">
                          {article.excerpt}
                        </p>
                      </div>
                    </div>
                    <div className="p-4 border-t border-stone-50 flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold text-stone-400 font-mono">By {article.author.split(',')[0]}</span>
                      <button
                        onClick={() => {
                          setActiveBlogId(article.id);
                          window.scrollTo(0, 0);
                        }}
                        className="text-xs font-bold text-[#2E7D32] hover:underline cursor-pointer"
                      >
                        Read scientific break →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW 8: FORMERS PHOTO GALLERY */}
        {activeView === 'gallery' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
            <div className="border-b border-gray-200 pb-5">
              <span className="text-xs font-bold text-[#2E7D32] uppercase tracking-widest block">Impact Journalism</span>
              <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-[#111111]">Mithila Sourcing: Visual Farming Soil Gallery</h2>
              <p className="text-xs text-stone-500 mt-1">Pictures taken directly from the aquatic reserves and processing plants of Darbhanga, Bihar.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Barefoot Aquatic Sweeping', desc: 'Sieving makhana seed follicles from the wetland silt.', img: './assets/images/makhana_pond_harvest_1781940339830.jpg' },
                { title: 'The Grading Gaanj', desc: 'Using age-old woven sieves to grade raw kernels into sizes (Sutas).', img: './assets/images/makhana_sorting_quality_1781940352972.jpg' },
                { title: 'Woodfired Thermal Popping', desc: 'Roasting in earthen kadhais followed by wooden mallet cracking.', img: './assets/images/raw_makhana_jumbo_1781940261968.jpg' },
                { title: 'Gourmet Olive Coating', desc: 'Tumbling colossal jumbo kernels under spice-mist cold spray.', img: './assets/images/roasted_makhana_golden_1781940274693.jpg' },
                { title: 'Multi-layer Oxygen Bags', desc: 'Double-bagging wholesale packs to block aquatic humidity.', img: './assets/images/makhana_footer_pack_1781940382172.jpg' },
                { title: 'Darbhanga Farmer Union', desc: 'Generational growers celebrating a fairtrade premium payout.', img: './assets/images/makhana_export_warehouse_1781940369377.jpg' }
              ].map((grid, index) => (
                <div key={index} className="bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="h-48 relative bg-stone-50">
                    <img src={grid.img} alt={grid.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4 space-y-1">
                    <h4 className="font-serif font-bold text-sm text-[#111111]">{grid.title}</h4>
                    <p className="text-xs text-stone-500 font-sans leading-relaxed">{grid.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 9: ABOUT MITHILA COMPANY STORY */}
        {activeView === 'about' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <span className="text-xs font-bold text-[#2E7D32] uppercase tracking-widest block">Our Sponsoring Origin</span>
              <h2 className="font-serif text-2xl md:text-4xl font-extrabold text-[#111111]">Farmingo Nuts: Sourcing with Integrity</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white p-6 md:p-8 rounded-3xl border border-amber-100 shadow-sm leading-relaxed text-sm text-stone-650 text-stone-600">
              <div className="space-y-4 font-sans font-medium">
                <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">Our Company Story</h3>
                <p>
                  Farmingo Nuts was founded on a simple insight: although Bihar supplies over 90% of global fox nuts, the family pools waders remained economically marginalized. Middlemen bleach the nuts to blend low-grade Sutas under premium labels.
                </p>
                <p>
                  We established direct alliances with the Farmer Unions of Darbhanga and Madhubani. By establishing automated grading sieves right next to the lakes, we eliminate bleaching completely, ensuring 100% genuine sun-dried raw crop grade density and returning up to 60% of retail sale profits straight to native family accounts.
                </p>
              </div>

              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative shadow">
                <img 
                  src="./assets/images/makhana_pond_harvest_1781940339830.jpg" 
                  alt="Harvesting wetlands in Bihar" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Mission Vision */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="p-6 bg-stone-900 text-white rounded-3xl border border-stone-800">
                <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-widest block mb-2">✦ Sourcing Vision</span>
                <p className="font-sans leading-relaxed text-stone-300">
                  To turn the wetlands of Mithila into global centers of premium sustainable agroforestry. We seek is to eradicate food bleaching completely, substituting with clean sun-drying and olive oil slow convection baking methods.
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-[#2E7D32] to-emerald-900 text-white rounded-3xl">
                <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-widest block mb-2">✦ Sourcing Mission</span>
                <p className="font-sans leading-relaxed text-stone-100">
                  To provide direct grocery waders transparent salaries, medical coverage, and digital harvest measurement tools—ensuring every metric ton packed meets USDA and FSSAI Central clean chemical logs.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 10: USER WISHLIST MANAGING */}
        {activeView === 'wishlist' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            <h2 className="font-serif text-2xl font-bold text-stone-900 border-b border-stone-200 pb-4">
              My Saved Wishlist Favorites ({wishlist.length})
            </h2>

            {wishlist.length === 0 ? (
              <div className="p-16 text-center bg-white border border-stone-100 rounded-3xl">
                <p className="text-stone-500 font-medium mb-3">Your saved list is currently empty.</p>
                <button onClick={() => setActiveView('shop')} className="px-5 py-2.5 bg-[#2E7D32] text-white rounded-xl text-xs font-bold cursor-pointer">
                  Go Shopping
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {wishlist.map((product) => (
                  <div key={product.id} className="p-3 bg-white border border-stone-100 rounded-2xl flex flex-col justify-between hover:shadow-lg transition-all duration-300">
                    <div className="aspect-square bg-stone-50 rounded-xl overflow-hidden relative cursor-pointer" onClick={() => handleSelectProductFromList(product)}>
                      <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="p-2 space-y-1">
                      <h4 className="font-serif font-bold text-sm text-stone-900 line-clamp-1 truncate">{product.name}</h4>
                      <span className="text-base font-bold text-[#111111]">₹{product.price}</span>
                    </div>

                    <div className="w-full flex gap-2 pt-2 border-t border-stone-50">
                      <button
                        onClick={() => handleSelectProductFromList(product)}
                        className="flex-grow py-2 bg-[#2E7D32] hover:bg-[#2E7D32]/90 text-white font-bold text-xs rounded-lg cursor-pointer"
                      >
                        Buy / Specs
                      </button>
                      <button
                        onClick={() => handleAddToWishlist(product)}
                        className="p-2 border border-red-150 text-red-500 bg-red-50 hover:bg-red-100 rounded-lg cursor-pointer"
                        title="Remove"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW 11: CART & PAYMENT CHECKOUT ENGINE */}
        {activeView === 'checkout' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            
            {/* Step navigation */}
            <div className="flex justify-center items-center gap-4 border-b border-stone-200 pb-6 mb-8 text-xs font-bold font-mono">
              {[
                { id: 'cart', label: '1. Shopping Cart' },
                { id: 'shipping', label: '2. Shipping Dispatch' },
                { id: 'payment', label: '3. Payment Complete' }
              ].map((step) => {
                const isActive = checkoutStep === step.id;
                return (
                  <span
                    key={step.id}
                    className={`pb-1 uppercase tracking-widest ${isActive ? 'text-[#2E7D32] border-b-2 border-[#2E7D32]' : 'text-stone-400'}`}
                  >
                    {step.label}
                  </span>
                );
              })}
            </div>

            {/* Cart list screen */}
            {checkoutStep === 'cart' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* cart list 8 cols */}
                <div className="lg:col-span-8 bg-white border border-amber-100 rounded-3xl p-6 space-y-4">
                  <h3 className="font-serif text-lg font-bold text-stone-900 border-b border-stone-100 pb-3">My Shopping Cart ({cart.length} items)</h3>
                  
                  {cart.length === 0 ? (
                    <div className="py-12 text-center text-stone-500">
                      <p className="font-medium mb-3">Your shopping cart is empty.</p>
                      <button onClick={() => setActiveView('shop')} className="px-6 py-2.5 bg-[#2E7D32] text-white rounded-xl text-xs font-bold cursor-pointer">
                        See Flavors Selection
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4 divide-y divide-stone-100">
                      {cart.map((item, idx) => (
                        <div key={idx} className="flex gap-4 pt-4 first:pt-0 group">
                          <div className="w-16 h-16 bg-stone-50 rounded-xl overflow-hidden border border-stone-100 flex-shrink-0">
                            <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                          </div>
                          
                          <div className="flex-grow flex flex-col justify-between">
                            <div>
                              <h4 className="font-serif font-bold text-sm text-[#111111] group-hover:text-[#2E7D32] transition-colors leading-tight line-clamp-1">{item.product.name}</h4>
                              <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider block">Packing Size: {item.selectedWeight}</span>
                            </div>

                            <div className="flex items-center justify-between mt-1">
                              {/* Qty */}
                              <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden shrink-0">
                                <button onClick={() => handleUpdateCartQty(idx, -1)} className="px-2 py-0.5 text-stone-500 font-bold hover:bg-stone-50">-</button>
                                <span className="px-3 text-xs font-bold text-stone-900">{item.quantity}</span>
                                <button onClick={() => handleUpdateCartQty(idx, 1)} className="px-2 py-0.5 text-stone-500 font-bold hover:bg-stone-50">+</button>
                              </div>

                              <div className="flex items-baseline gap-2">
                                <span className="text-xs text-stone-400 line-through">₹{(item.product.mrp * item.quantity)}</span>
                                <span className="text-sm font-bold text-stone-900">₹{(item.product.price * item.quantity)}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center">
                            <button onClick={() => handleRemoveCartItem(idx)} className="p-2 rounded hover:bg-stone-50 text-stone-400 hover:text-red-500 cursor-pointer" title="Remove Item">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* billing sum 4 cols */}
                <div className="lg:col-span-4 bg-white border border-amber-100 rounded-3xl p-6 space-y-4">
                  <h4 className="font-serif font-bold text-stone-900 text-base mb-2">Order pricing breakdowns</h4>
                  
                  {/* Coupon card wrapper */}
                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-2xl">
                    <span className="text-[10px] font-bold text-stone-500 uppercase block mb-1.5">Apply Promo Code</span>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Try ORGANIC20"
                        value={activePromo}
                        onChange={(e) => setActivePromo(e.target.value)}
                        className="flex-grow p-1.5 text-xs bg-white border border-stone-200 rounded-lg outline-none uppercase"
                      />
                      <button onClick={checkPromoCode} className="px-3 bg-stone-950 text-[#D4AF37] rounded-lg text-[10px] font-bold cursor-pointer">Apply</button>
                    </div>
                    {promoError && <p className="text-[10px] text-red-500 font-semibold mt-1">{promoError}</p>}
                    {promoDiscountPct > 0 && <p className="text-[10px] text-[#2E7D32] font-semibold mt-1">✓ Verified promo: {promoDiscountPct}% direct discount applied!</p>}
                  </div>

                  <div className="space-y-2 text-xs leading-relaxed text-stone-605 text-stone-600 font-medium font-sans">
                    <div className="flex justify-between">
                      <span>Total crop MRP</span>
                      <span>₹{cart.reduce((sum, item) => sum + (item.product.mrp * item.quantity), 0)}</span>
                    </div>
                    <div className="flex justify-between text-green-750 text-[#2E7D32] font-semibold">
                      <span>Store Sourcing Savings</span>
                      <span>-₹{cart.reduce((sum, item) => sum + ((item.product.mrp - item.product.price) * item.quantity), 0)}</span>
                    </div>
                    {promoDiscountPct > 0 && (
                      <div className="flex justify-between text-[#2E7D32] font-semibold">
                        <span>Coupon promo: {activePromo.toUpperCase()}</span>
                        <span>-₹{getDiscount()}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Standard Satiety 5% GST</span>
                      <span>₹{getTax()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping dispatch</span>
                      <span>{getShipping() === 0 ? <strong className="text-[#2E7D32] uppercase">FREE Delivery</strong> : `₹${getShipping()}`}</span>
                    </div>
                    <div className="flex justify-between border-t border-stone-100 pt-3 font-serif font-bold text-stone-900 text-sm">
                      <span>Grand Total Amount</span>
                      <span className="text-[#2E7D32] font-mono">₹{getGrandTotal()}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setCheckoutStep('shipping')}
                    disabled={cart.length === 0}
                    className="w-full h-11 bg-[#2E7D32] hover:bg-[#2E7D32]/95 text-white rounded-xl text-xs font-bold shadow cursor-pointer disabled:opacity-50"
                  >
                    Proceed with Shipping Address →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Shipping address */}
            {checkoutStep === 'shipping' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <form onSubmit={(e) => { e.preventDefault(); setCheckoutStep('payment'); }} className="lg:col-span-8 bg-white border border-amber-100 rounded-3xl p-6 space-y-4">
                  <h3 className="font-serif text-lg font-bold text-stone-900 border-b border-stone-100 pb-3">Delivery Shipping Information</h3>
                  
                  {/* Pincode checker live support */}
                  <div className="p-4 bg-[#F8F5F0] border border-amber-100 rounded-2xl relative shadow-inner">
                    <span className="text-[10px] font-bold text-stone-500 uppercase block mb-1.5">Postal Pincode Evaluator</span>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter 6-digit PIN code (e.g. 846004 for Bihar dispatch)"
                        value={checkoutPincode}
                        onChange={(e) => {
                          setCheckoutPincode(e.target.value);
                          setPincodeValidated(null);
                        }}
                        className="flex-grow p-2 text-xs bg-white border border-stone-200 rounded-lg outline-none"
                      />
                      <button onClick={checkPincode} className="px-4 py-2 bg-stone-950 text-[#D4AF37] rounded-lg text-xs font-bold cursor-pointer">check dispatch</button>
                    </div>
                    {pincodeValidated && (
                      <p className="text-[10px] text-[#2E7D32] font-bold mt-2 font-mono uppercase">{pincodeValidated}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold text-stone-700">
                    <div>
                      <label className="block text-stone-500 uppercase mb-1">Customer Full Name</label>
                      <input
                        type="text"
                        value={checkoutName}
                        onChange={(e) => setCheckoutName(e.target.value)}
                        className="w-full p-2.5 bg-[#F8F5F0] border border-stone-200 rounded-lg outline-none focus:border-[#2E7D32]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-stone-500 uppercase mb-1">Contact Phone (for delivery courier)</label>
                      <input
                        type="tel"
                        value={checkoutPhone}
                        onChange={(e) => setCheckoutPhone(e.target.value)}
                        className="w-full p-2.5 bg-[#F8F8F0] bg-[#F8F5F0] border border-stone-200 rounded-lg outline-none focus:border-[#2E7D32]"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold text-stone-700">
                    <div className="md:col-span-2">
                      <label className="block text-stone-500 uppercase mb-1">Full Shipping address</label>
                      <input
                        type="text"
                        value={checkoutAddress}
                        onChange={(e) => setCheckoutAddress(e.target.value)}
                        className="w-full p-2.5 bg-[#F8F5F0] border border-stone-200 rounded-lg outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-stone-500 uppercase mb-1">City / State</label>
                      <input
                        type="text"
                        value={checkoutCity}
                        onChange={(e) => setCheckoutCity(e.target.value)}
                        className="w-full p-2.5 bg-[#F8F5F0] border border-stone-200 rounded-lg outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex gap-3.5 pt-4 border-t border-stone-100">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep('cart')}
                      className="px-6 h-11 bg-stone-100 text-stone-600 rounded-xl text-xs font-bold cursor-pointer"
                    >
                      ← Back to Cart details
                    </button>
                    <button
                      type="submit"
                      className="flex-grow h-11 bg-[#2E7D32] text-white rounded-xl text-xs font-bold shadow cursor-pointer text-center"
                    >
                      Proceed to checkout Payment selection →
                    </button>
                  </div>
                </form>

                {/* Summary side */}
                <div className="lg:col-span-4 bg-[#111111] text-white rounded-3xl p-6 space-y-4">
                  <h4 className="font-serif font-bold text-[#D4AF37] tracking-wider uppercase text-xs mb-2">Maritime Shipping Summary</h4>
                  
                  <div className="text-xs space-y-2.5 leading-relaxed text-stone-400">
                    <p className="font-sans font-medium">Your products will be packed in <strong>oxygen-fresh moisture barrier jars</strong> inside heavy fiber box panels. Safe delivery to standard courier services in 12-24 Hours.</p>
                    <div className="border-t border-stone-800 pt-3">
                      <span className="block text-stone-500 text-[10px] font-bold uppercase mb-1">Target Delivery destination:</span>
                      <p className="font-bold text-white uppercase">{checkoutName}</p>
                      <p className="text-[11px] leading-tight mt-0.5">{checkoutAddress}, {checkoutCity} PIN: {checkoutPincode}</p>
                    </div>

                    <div className="border-t border-stone-800 pt-3.5 font-bold text-white text-sm flex justify-between">
                      <span>Payable Amount:</span>
                      <span className="text-[#D4AF37] font-mono">₹{getGrandTotal()}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Payment select */}
            {checkoutStep === 'payment' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <form onSubmit={handlePlaceOrder} className="lg:col-span-8 bg-white border border-amber-100 rounded-3xl p-6 space-y-4">
                  <h3 className="font-serif text-lg font-bold text-stone-900 border-b border-stone-100 pb-3">Complete Direct Payment Gateway</h3>
                  
                  {/* Select card option */}
                  <div className="space-y-3">
                    {[
                      { id: 'Razorpay', label: 'Razorpay Secure Netbanking (Credit/Debit standard cards option)', desc: 'Processes cards instantly via standard ISO certificates.' },
                      { id: 'UPI', label: 'UPI QR Pay (Instant GPay, PhonePe, Paytm)', desc: 'Displays secure custom UPI code credentials.' },
                      { id: 'COD', label: 'Cash on Delivery (COD) dispatch', desc: 'Slightly higher risk postal delays. Pay cash upon dispatch box delivery.' }
                    ].map((opt) => (
                      <label
                        key={opt.id}
                        className={`p-4 border rounded-2xl cursor-pointer flex gap-3 transition-all ${paymentMethod === opt.id ? 'border-[#2E7D32] bg-green-50/20' : 'border-stone-200 hover:bg-stone-50'}`}
                      >
                        <input
                          type="radio"
                          name="pay-opt"
                          checked={paymentMethod === opt.id}
                          onChange={() => setPaymentMethod(opt.id as any)}
                          className="w-4 h-4 text-[#2E7D32] border-stone-300 rounded focus:ring-[#2E7D32] accent-[#2E7D32] mt-0.5"
                        />
                        <div>
                          <strong className="text-xs text-stone-900 uppercase tracking-wide block">{opt.label}</strong>
                          <span className="text-[10px] text-stone-400 block font-sans font-medium mt-0.5">{opt.desc}</span>
                        </div>
                      </label>
                    ))}
                  </div>

                  <div className="flex gap-3.5 pt-4 border-t border-stone-100">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep('shipping')}
                      className="px-6 h-11 bg-stone-100 text-stone-600 rounded-xl text-xs font-bold cursor-pointer"
                    >
                      ← Back to Address Details
                    </button>
                    <button
                      type="submit"
                      className="flex-grow h-11 bg-[#2E7D32] hover:bg-[#2E7D32]/95 text-white rounded-xl text-xs font-bold shadow hover:scale-[1.01] transition-transform cursor-pointer font-serif tracking-wider"
                    >
                      ✓ Complete Secure Payment (₹{getGrandTotal()})
                    </button>
                  </div>
                </form>

                {/* Secure Trust Seal */}
                <div className="lg:col-span-4 bg-white border border-amber-150 border-amber-100 rounded-3xl p-5 space-y-4 text-center">
                  <ShieldCheck className="w-12 h-12 text-[#2E7D32] mx-auto animate-pulse" />
                  <h4 className="font-serif font-bold text-stone-903 text-stone-900 text-sm">Falsaﬁcation-Free Trading Guarantee</h4>
                  <p className="text-xs text-stone-500 leading-relaxed font-sans">
                    All financial operations processed on our servers utilize banking-grade 256-bit SSL encryption. We holds zero card detail registry, fully complying with regional Indian payments mandates.
                  </p>
                </div>
              </div>
            )}

            {/* Placed successfully */}
            {checkoutStep === 'placed' && placedOrder && (
              <div className="max-w-xl mx-auto bg-white border border-amber-100 rounded-3xl p-6 md:p-8 space-y-6 text-center animate-fadeIn">
                <div className="w-16 h-16 bg-gradient-to-tr from-[#2E7D32] to-emerald-800 text-white rounded-full flex items-center justify-center mx-auto shadow shadow-[#2E7D32]">
                  <Check className="w-8 h-8 text-[#D4AF37] stroke-[3]" />
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-[#2E7D32] uppercase tracking-wider">Purchase Successful!</span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 leading-tight">Order #{placedOrder.id} Placed</h3>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto">
                    Thank you. We are preparing your fresh crop package inside our wetlands packing center in Bihar!
                  </p>
                </div>

                {/* Printable Invoice wrapper */}
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl text-left text-xs font-sans space-y-3">
                  <div className="flex justify-between items-center border-b border-stone-200 pb-2">
                    <span className="font-serif font-bold text-[#111111] uppercase tracking-wider">Makhana World Invoice receipt</span>
                    <span className="text-[10px] text-stone-400 font-mono">Date: {placedOrder.date}</span>
                  </div>

                  <div className="space-y-1.5 text-stone-600">
                    <div className="flex justify-between font-semibold">
                      <span>Delivery Target Client:</span>
                      <span className="text-stone-950">{placedOrder.shippingAddress.name}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Shipping address:</span>
                      <span className="text-stone-950 text-right">{placedOrder.shippingAddress.address}, {placedOrder.shippingAddress.city}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Online transaction:</span>
                      <span className="text-stone-950">{placedOrder.paymentMethod}</span>
                    </div>
                  </div>

                  <div className="border-t border-stone-200 pt-2 space-y-1">
                    <span className="block text-[10px] text-stone-400 uppercase font-bold">Line Items:</span>
                    {placedOrder.items.map((item, i) => (
                      <div key={i} className="flex justify-between font-medium">
                        <span>{item.quantity}x {item.product.name} ({item.selectedWeight})</span>
                        <span className="font-mono">₹{item.product.price * item.quantity}</span>
                      </div>
                    ))}
                    <div className="flex justify-between border-t border-stone-200 pt-2 font-bold text-stone-900 mt-1">
                      <span>Grand Total Amount</span>
                      <span className="text-[#2E7D32] font-mono">₹{placedOrder.totalAmount}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      window.print();
                    }}
                    className="w-full py-2 bg-stone-900 text-white rounded-lg text-[10px] font-bold cursor-pointer text-center hover:bg-stone-950"
                  >
                    🖨 Print Invoice PDF Receipt
                  </button>
                </div>

                {/* Order tracking steps simulated visually */}
                <div className="p-4 bg-[#F8F5F0] border border-amber-100 rounded-2xl text-left space-y-3">
                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">Live Delivery Carrier Milestones:</span>
                  
                  <div className="flex justify-between items-center text-[10px] font-bold text-stone-400 font-mono">
                    <div className="flex flex-col items-center">
                      <div className="w-5 h-5 rounded-full bg-[#2E7D32] text-white flex items-center justify-center text-[8px]">✓</div>
                      <span className="text-[#2E7D32] mt-1">Sourced</span>
                    </div>
                    <div className="h-0.5 bg-stone-200 flex-grow mx-1 mt-[-10px]"></div>
                    <div className="flex flex-col items-center opacity-50">
                      <div className="w-5 h-5 rounded-full bg-stone-300 text-stone-600 flex items-center justify-center text-[8px]">2</div>
                      <span className="mt-1">In Transit</span>
                    </div>
                    <div className="h-0.5 bg-stone-200 flex-grow mx-1 mt-[-10px]"></div>
                    <div className="flex flex-col items-center opacity-50">
                      <div className="w-5 h-5 rounded-full bg-stone-300 text-stone-600 flex items-center justify-center text-[8px]">3</div>
                      <span className="mt-1 font-sans">Delivered</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveView('home')}
                  className="w-full py-3 border-2 border-[#2E7D32] text-[#2E7D32] rounded-xl font-bold text-xs hover:bg-[#2E7D32]/5 cursor-pointer"
                >
                  Return to Home page
                </button>
              </div>
            )}

          </div>
        )}

        {/* VIEW 12: REGULATORY POLICIES LIST SHEET */}
        {activeView === 'policies' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 bg-white border border-amber-100 rounded-3xl mt-12 mb-16 leading-relaxed text-sm text-stone-650 text-stone-600">
            <h1 className="font-serif text-2xl md:text-3.5xl font-extrabold text-stone-900 border-b border-stone-200 pb-4">
              Farmingo Nuts Legal Regulatory Policies
            </h1>

            <section className="space-y-3 font-sans">
              <h3 className="font-serif font-bold text-stone-900 text-lg flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#D4AF37]" /> Refund & Cancellation Policy
              </h3>
              <p className="font-medium">
                Our food products are prepared fresh and sun-dried immediately after water lily harvest. To guarantee maximum cellular protection and hygiene standards, edible items cannot be returned post-delivery unless there is a physical seal rupture or transportation package crash. If there is transit defect, email photos to Info@farmingonuts.com within 24 Hours for a full refund or express replacement box.
              </p>
            </section>

            <section className="space-y-3 font-sans border-t border-stone-100 pt-6">
              <h3 className="font-serif font-bold text-stone-900 text-lg flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#D4AF37]" /> Maritime Shipping Policy
              </h3>
              <p className="font-medium">
                All raw and roasted orders dispatch within 12-24 Hours using registered shipping partners (BlueDart, IndiaPost Air logs). Standard delivery within India averages 3-5 working days. International sea cargo is shipped CIF / FOB using ventilated container guidelines from Darbhanga via Mumbai Port Trust cargo clearing desks. All phytosanitary tests results will accompany cargo logs.
              </p>
            </section>

            <section className="space-y-3 font-sans border-t border-stone-100 pt-6">
              <h3 className="font-serif font-bold text-stone-900 text-lg flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#D4AF37]" /> Privacy & Terms of Service
              </h3>
              <p className="font-medium">
                Your transaction registry, contact numbers, and delivery PIN address are encrypted in compliance with secure ISO guidelines. Farmingo Nuts pledges 100% advertising transparency – we formulate zero mock products and run strict pesticide-free compliance audits across member farms annually.
              </p>
            </section>
          </div>
        )}

        {/* VIEW 13: CATEGORIES EXPLORER */}
        {activeView === 'categories' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold text-[#2E7D32] uppercase tracking-widest block font-mono">Premium Collections</span>
              <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-[#111111]">Explore Our Varieties</h2>
              <p className="text-xs sm:text-sm text-stone-500">
                Choose a category to browse our exquisite range of Mithila makhana. From hand-sorted raw sizes to gourmet kettle-roasted blends.
              </p>
            </div>

            {/* Circular Category Slider Row exactly like in the user's reference image */}
            <div className="relative px-8">
              {/* Left Arrow */}
              <button
                onClick={() => {
                  const el = document.getElementById('tab-category-scroll-container');
                  if (el) el.scrollBy({ left: -260, behavior: 'smooth' });
                }}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-stone-200 bg-white shadow-sm hover:shadow flex items-center justify-center text-stone-700 hover:text-[#2E7D32] hover:border-[#2E7D32]/30 transition-all z-10 cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Categories Scroll Container */}
              <div
                id="tab-category-scroll-container"
                className="flex items-center justify-start md:justify-center gap-6 overflow-x-auto scrollbar-none py-4 px-2"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {[
                  {
                    id: 'raw',
                    name: 'Raw Makhana',
                    image: './assets/images/raw_makhana_jumbo_1781940261968.jpg'
                  },
                  {
                    id: 'roasted',
                    name: 'Roasted Makhana',
                    image: './assets/images/roasted_makhana_golden_1781940274693.jpg'
                  },
                  {
                    id: 'flavored',
                    name: 'Flavoured Makhana',
                    image: './assets/images/cheese_makhana_cheddar_1781940285526.jpg'
                  },
                  {
                    id: 'organic',
                    name: 'Organic Makhana',
                    image: './assets/images/suta_6_makhana_1781947102519.jpg'
                  }
                ].map((cat) => {
                  const isActive = selectedCategoryTab === cat.id;
                  return (
                    <div
                      key={cat.id}
                      onClick={() => setSelectedCategoryTab(cat.id)}
                      className="flex flex-col items-center flex-shrink-0 w-28 sm:w-32 group cursor-pointer"
                    >
                      {/* Round Circle Wrapper */}
                      <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border p-1.5 shadow-sm transition-all duration-300 ${
                        isActive
                          ? 'border-[#2E7D32] bg-emerald-50/30 scale-105 shadow-md ring-2 ring-[#2E7D32]/20'
                          : 'border-amber-100 bg-stone-50 group-hover:shadow-md group-hover:border-[#2E7D32]/45'
                      }`}>
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      {/* Name below circle */}
                      <span className={`text-xs sm:text-sm font-semibold text-center mt-3 tracking-wide transition-colors ${
                        isActive ? 'text-[#2E7D32] font-bold' : 'text-stone-800 group-hover:text-[#2E7D32]'
                      }`}>
                        {cat.name}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Right Arrow */}
              <button
                onClick={() => {
                  const el = document.getElementById('tab-category-scroll-container');
                  if (el) el.scrollBy({ left: 260, behavior: 'smooth' });
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-stone-200 bg-white shadow-sm hover:shadow flex items-center justify-center text-stone-700 hover:text-[#2E7D32] hover:border-[#2E7D32]/30 transition-all z-10 cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* DYNAMIC PRODUCTS SECTION BELOW CATEGORY TABS */}
            <div className="space-y-8 pt-6 border-t border-stone-100">
              <div className="text-center space-y-2">
                <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-[#111111] tracking-wider uppercase">
                  {selectedCategoryTab === 'best-sellers' && 'Best Sellers'}
                  {selectedCategoryTab === 'raw' && 'Raw makhana Seeds'}
                  {selectedCategoryTab === 'roasted' && 'Classic Roasted Selection'}
                  {selectedCategoryTab === 'flavored' && 'Gourmet Flavored Bites'}
                  {selectedCategoryTab === 'organic' && 'Organic Certified Batches'}
                  {selectedCategoryTab === 'combo' && 'Curated Combo Packages'}
                  {selectedCategoryTab === 'gift' && 'Luxury Gift Pack Assortments'}
                </h3>
                {/* Beautiful custom green leaf divider */}
                <div className="flex items-center justify-center gap-3 w-full max-w-[200px] mx-auto py-1">
                  <div className="h-[1px] bg-[#2E7D32]/35 flex-grow"></div>
                  <Leaf className="w-4 h-4 text-[#2E7D32] flex-shrink-0" />
                  <div className="h-[1px] bg-[#2E7D32]/35 flex-grow"></div>
                </div>
              </div>

              {/* Grid of Dynamic Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
                {(() => {
                  // Filter logic based on tab selected
                  let list = [];
                  if (selectedCategoryTab === 'best-sellers') {
                    list = [
                      { id: 'roasted-plain-raw', displayName: 'Premium Classic Makhana (100g)', price: 199, mrp: 260, rating: 4.9, reviewsCount: 142, image: './assets/images/classic_makhana_pouch_1783860782473.jpg' },
                      { id: 'roasted-pink-salt', displayName: 'Himalayan Salt Makhana (100g)', price: 219, mrp: 285, rating: 4.9, reviewsCount: 167, image: './assets/images/himalayan_makhana_pouch_1783861060681.jpg' },
                      { id: 'roasted-peri-peri', displayName: 'Peri Peri Makhana (100g)', price: 229, mrp: 295, rating: 4.7, reviewsCount: 322, image: './assets/images/peri_peri_makhana_pouch_1783861321396.jpg' },
                      { id: 'roasted-cheese', displayName: 'Cheese Makhana (100g)', price: 229, mrp: 295, rating: 4.8, reviewsCount: 245, image: './assets/images/cheese_makhana_pouch_1783861925140.jpg' },
                      { id: 'roasted-pudina-mint', displayName: 'Mint Makhana (100g)', price: 219, mrp: 285, rating: 4.7, reviewsCount: 142, image: './assets/images/mint_makhana_pouch_1783862500660.jpg' },
                      { id: 'roasted-combo-pack', displayName: 'Premium Combo Pack (4 x 100g)', price: 799, mrp: 999, rating: 4.9, reviewsCount: 382, image: './assets/images/combo_makhana_pouch_1783862785114.jpg' }
                    ];
                  } else {
                    // Pull actual products from PRODUCTS array dynamically matching the category filter
                    let matchedProducts = [];
                    if (selectedCategoryTab === 'raw') {
                      matchedProducts = shopProducts.filter(p => p.category === 'raw');
                    } else if (selectedCategoryTab === 'roasted') {
                      matchedProducts = shopProducts.filter(p => p.category === 'roasted' && (p.subcategory?.includes('plain') || p.id === 'roasted-plain-raw' || p.id === 'roasted-pink-salt'));
                    } else if (selectedCategoryTab === 'flavored') {
                      matchedProducts = shopProducts.filter(p => p.category === 'roasted' && !p.id.includes('plain') && p.id !== 'roasted-plain-raw');
                    } else if (selectedCategoryTab === 'organic') {
                      matchedProducts = shopProducts.filter(p => p.subcategory?.includes('organic') || p.description.toLowerCase().includes('organic') || p.fullDescription.toLowerCase().includes('organic'));
                    } else if (selectedCategoryTab === 'combo') {
                      matchedProducts = shopProducts.filter(p => p.id === 'roasted-combo-pack' || p.name.toLowerCase().includes('combo') || p.name.toLowerCase().includes('assortment'));
                    } else if (selectedCategoryTab === 'gift') {
                      matchedProducts = shopProducts.filter(p => p.id === 'roasted-combo-pack' || p.id === 'raw-jumbo');
                    }

                    // Fallback to make sure we always have elements to show
                    if (matchedProducts.length === 0) {
                      matchedProducts = shopProducts.slice(0, 6);
                    }

                    list = matchedProducts.map(p => ({
                      id: p.id,
                      displayName: p.name,
                      price: p.price,
                      mrp: p.mrp,
                      rating: p.rating,
                      reviewsCount: p.reviewsCount,
                      image: p.images[0] || './assets/images/roasted_makhana_golden_1781940274693.jpg'
                    }));
                  }

                  return list.map((card, idx) => {
                    const targetProduct = shopProducts.find(p => p.id === card.id);
                    const isWishlisted = wishlist.some(w => w.id === card.id);
                    return (
                      <div
                        key={idx}
                        className="bg-white border border-stone-100 rounded-3xl p-3.5 flex flex-col justify-between hover:shadow-lg hover:border-[#2E7D32]/10 transition-all duration-300"
                      >
                        {/* Image area */}
                        <div
                          onClick={() => {
                            if (targetProduct) {
                              handleSelectProductFromList(targetProduct);
                            }
                          }}
                          className="aspect-square bg-stone-50 rounded-2xl overflow-hidden relative cursor-pointer group border border-stone-50/50"
                        >
                          <img
                            src={card.image}
                            alt={card.displayName}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                          <span className="absolute top-2 left-2 bg-[#2E7D32] text-white font-extrabold text-[9px] px-2.5 py-0.5 rounded-full shadow-sm">
                            {Math.round(((card.mrp - card.price) / card.mrp) * 100)}% OFF
                          </span>
                        </div>

                        {/* Text details */}
                        <div className="mt-3.5 space-y-1.5 flex-1 flex flex-col justify-between">
                          <div>
                            <h4
                              onClick={() => {
                                if (targetProduct) {
                                  handleSelectProductFromList(targetProduct);
                                }
                              }}
                              className="font-serif font-bold text-xs text-stone-900 hover:text-[#2E7D32] transition-colors leading-snug line-clamp-2 cursor-pointer h-10 mb-1"
                            >
                              {card.displayName}
                            </h4>

                            {/* Stars & review counts */}
                            <div className="flex items-center text-amber-500 gap-0.5 text-[10px] font-bold">
                              <span className="text-sm">★</span>
                              <span className="text-stone-500">
                                {card.rating} ({card.reviewsCount})
                              </span>
                            </div>
                          </div>

                          {/* Prices */}
                          <div className="pt-1 flex items-baseline gap-1.5">
                            <span className="font-extrabold text-stone-900 text-base">₹{card.price}</span>
                            <span className="text-[10px] text-stone-400 line-through">₹{card.mrp}</span>
                          </div>
                        </div>

                        {/* Bottom action row */}
                        <div className="pt-3 mt-3 border-t border-stone-100 flex gap-2 items-center">
                          <button
                            onClick={() => {
                              if (targetProduct) {
                                handleAddToCart({
                                  product: targetProduct,
                                  selectedWeight: card.id === 'roasted-combo-pack' ? '4 x 100g Pack' : (targetProduct.weightOptions[0] || '100g'),
                                  quantity: 1
                                });
                                alert(`Added ${card.displayName} to your Cart successfully!`);
                              }
                            }}
                            className="flex-grow py-2.5 bg-[#2E7D32] hover:bg-emerald-800 text-white font-bold text-[10px] uppercase tracking-wider rounded-xl shadow-sm hover:shadow transition-all cursor-pointer text-center"
                          >
                            Add to Cart
                          </button>

                          <button
                            onClick={() => {
                              if (targetProduct) {
                                handleAddToWishlist(targetProduct);
                              }
                            }}
                            className={`p-2.5 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                              isWishlisted
                                ? 'bg-red-50 border-red-200 text-red-500'
                                : 'bg-white border-stone-200 text-stone-400 hover:text-red-500 hover:border-red-200'
                            }`}
                          >
                            <Heart className="w-4 h-4" fill={isWishlisted ? "currentColor" : "none"} />
                          </button>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>

            {/* General grading statistics badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white border border-amber-100/60 rounded-3xl text-center shadow-sm">
              <div>
                <span className="block text-xl md:text-2xl font-extrabold text-[#2E7D32]">98%</span>
                <span className="text-[9px] uppercase font-bold text-stone-400 tracking-wider">Moisture Retention Score</span>
              </div>
              <div className="border-l border-stone-200">
                <span className="block text-xl md:text-2xl font-extrabold text-[#2E7D32]">1,200+</span>
                <span className="text-[9px] uppercase font-bold text-stone-400 tracking-wider">Grower Farmer Members</span>
              </div>
              <div className="border-l border-stone-200">
                <span className="block text-xl md:text-2xl font-extrabold text-[#2E7D32]">0%</span>
                <span className="text-[9px] uppercase font-bold text-stone-400 tracking-wider">Chlorine Bleach Chemical</span>
              </div>
              <div className="border-l border-stone-200">
                <span className="block text-xl md:text-2xl font-extrabold text-[#2E7D32]">100%</span>
                <span className="text-[9px] uppercase font-bold text-stone-400 tracking-wider">Direct Fair-Wage Trade</span>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 14: PRIVATE LABEL OEM CUSTOMIZER */}
        {activeView === 'private-label' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
            
            {/* Header info */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-stone-200 pb-5">
              <div>
                <span className="text-xs font-bold text-[#2E7D32] uppercase tracking-widest block">OEM Private Label Workspace</span>
                <h2 className="font-serif text-2xl md:text-3.5xl font-extrabold text-[#111111]">Design Your Custom Makhana Packaging</h2>
                <p className="text-xs text-stone-500 mt-1">Configure materials, colors, weights, and calculate custom MOQ pricing for your brand launch.</p>
              </div>
              <div className="px-4 py-2 bg-amber-50 border border-amber-100 rounded-xl text-stone-700 text-[11px] font-bold">
                💡 Estimated Project Cost: ₹{(plQty * (plSize.includes('50g') ? 14 : plSize.includes('100g') ? 22 : plSize.includes('250g') ? 48 : 85)).toLocaleString('en-IN')}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* Left Column - Customizer controls */}
              <div className="lg:col-span-5 bg-white border border-amber-100 rounded-3xl p-6 space-y-5">
                <h3 className="font-serif text-lg font-bold text-stone-900 border-b border-stone-100 pb-2">1. Brand & Spec parameters</h3>
                
                <div className="space-y-4 text-xs font-semibold text-stone-700">
                  <div>
                    <label className="block text-stone-500 uppercase mb-1">Your Brand Logo Name</label>
                    <input
                      type="text"
                      value={plBrandName}
                      onChange={(e) => setPlBrandName(e.target.value)}
                      placeholder="e.g. Pure Crunch Co."
                      className="w-full p-2.5 bg-[#F8F5F0] border border-stone-200 rounded-xl outline-none focus:border-[#2E7D32]"
                      maxLength={24}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-stone-500 uppercase mb-1">Select Foil Theme</label>
                      <select
                        value={plMaterial}
                        onChange={(e) => setPlMaterial(e.target.value)}
                        className="w-full p-2.5 bg-[#F8F5F0] border border-stone-200 rounded-xl outline-none focus:border-[#2E7D32]"
                      >
                        <option value="Matte Gold Foil">Matte Royal Gold</option>
                        <option value="Forest Green Recycled Kraft">Forest Green Kraft</option>
                        <option value="Cosmic Charcoal Minimalist">Cosmic Charcoal</option>
                        <option value="Festive Saffron Metallic">Saffron Metallic</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-stone-500 uppercase mb-1">Bag / Size Sizing</label>
                      <select
                        value={plSize}
                        onChange={(e) => setPlSize(e.target.value)}
                        className="w-full p-2.5 bg-[#F8F5F0] border border-stone-200 rounded-xl outline-none focus:border-[#2E7D32]"
                      >
                        <option value="50g Standup Pouch">50g Pouch (4 Suta)</option>
                        <option value="100g Standup Pouch">100g Pouch (5 Suta)</option>
                        <option value="250g Standup Pouch">250g Pouch (6 Suta)</option>
                        <option value="500g Standup Pouch">500g Pouch (7 Suta)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-500 uppercase mb-1">Makhana Savor Flavor Coat</label>
                    <select
                      value={plFlavor}
                      onChange={(e) => setPlFlavor(e.target.value)}
                      className="w-full p-2.5 bg-[#F8F5F0] border border-stone-200 rounded-xl outline-none focus:border-[#2E7D32]"
                    >
                      <option value="Classic Roasted Ghee">Classic Roasted A2 Ghee</option>
                      <option value="Spicy Peri Peri Flare">Spicy Peri Peri Flare</option>
                      <option value="Zesty Lime Mint Pudina">Zesty Lime Mint Pudina</option>
                      <option value="Creamy White Cheddar">Creamy White Cheddar</option>
                      <option value="Himalayan Rock Pink Salt">Himalayan Rock Pink Salt</option>
                    </select>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-stone-500 uppercase">Production Volume Quantity</label>
                      <span className="text-[#2E7D32] font-mono text-[10px] font-bold">{plQty.toLocaleString()} Units</span>
                    </div>
                    <input
                      type="range"
                      min="5000"
                      max="100000"
                      step="5000"
                      value={plQty}
                      onChange={(e) => setPlQty(Number(e.target.value))}
                      className="w-full h-1 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#2E7D32]"
                    />
                    <span className="text-[10px] text-stone-400 font-medium">Standard packaging cylinder setup requires minimum 5,000 unit MOQ run.</span>
                  </div>
                </div>

                <div className="border-t border-stone-100 pt-4 space-y-3">
                  <h4 className="font-serif text-sm font-bold text-stone-800">Estimate Pricing Card</h4>
                  
                  {(() => {
                    const pricePerUnit = plSize.includes('50g') ? 14 : plSize.includes('100g') ? 22 : plSize.includes('250g') ? 48 : 85;
                    const cylFee = 12000;
                    const totalCost = (plQty * pricePerUnit) + cylFee;
                    return (
                      <div className="p-3 bg-[#F8F5F0] rounded-2xl font-mono text-[11px] font-semibold text-stone-600 space-y-1.5">
                        <div className="flex justify-between">
                          <span>Unit Production Cost:</span>
                          <span className="text-stone-900">₹{pricePerUnit} / pouch</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cylinder Gravure Plates:</span>
                          <span className="text-stone-900">₹{cylFee.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between border-t border-stone-200 pt-1.5 font-bold">
                          <span className="text-stone-800">Estimated Total (FOB):</span>
                          <span className="text-[#2E7D32]">₹{totalCost.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Center Column - Real-time custom bag vector simulator */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-stone-900 rounded-3xl border border-stone-800 relative min-h-[420px] shadow-2xl">
                
                {/* Simulated Pouch Render */}
                <div className="relative w-56 h-80 rounded-2xl p-5 flex flex-col justify-between shadow-2xl overflow-hidden transition-all duration-500"
                     style={{
                       background: plMaterial.includes('Gold') ? 'linear-gradient(135deg, #CF9F3C 0%, #7C5C1A 100%)' :
                                   plMaterial.includes('Kraft') ? 'linear-gradient(135deg, #1A472A 0%, #0C2B14 100%)' :
                                   plMaterial.includes('Charcoal') ? 'linear-gradient(135deg, #2A2A2A 0%, #151515 100%)' :
                                   'linear-gradient(135deg, #D95420 0%, #7E2A0B 100%)',
                       color: plMaterial.includes('Kraft') || plMaterial.includes('Charcoal') ? '#FFFDF9' : '#111111'
                     }}>
                  
                  {/* Glossy Overlay Shading */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 pointer-events-none"></div>
                  
                  {/* Top Seal Seam */}
                  <div className="absolute top-0 inset-x-0 h-4 border-b border-black/10 flex items-center justify-center"
                       style={{ background: 'repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(0,0,0,0.15) 4px, rgba(0,0,0,0.15) 8px)' }}>
                  </div>

                  {/* Top Header details */}
                  <div className="pt-3 text-center space-y-0.5 relative z-10">
                    <span className="text-[7px] font-bold uppercase tracking-widest opacity-80 font-mono">Certified Premium Organic</span>
                    <div className="w-6 h-[0.5px] bg-current opacity-40 mx-auto"></div>
                  </div>

                  {/* Pouch Main Logo brand name */}
                  <div className="text-center py-4 space-y-1 relative z-10">
                    <span className="text-xs font-serif font-extrabold tracking-wider uppercase block truncate max-w-[180px]">
                      {plBrandName || 'MY BRAND'}
                    </span>
                    <div className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-black/10 border border-white/10 rounded-full">
                      <Sparkles className="w-2.5 h-2.5 text-[#D4AF37]" />
                      <span className="text-[6px] font-bold uppercase tracking-widest text-[#D4AF37]">Premium grade</span>
                    </div>
                  </div>

                  {/* Bottom half details: flavor and makhana graphic */}
                  <div className="space-y-2 text-center relative z-10">
                    
                    {/* Simulated white puffed makhana drawing */}
                    <div className="w-14 h-14 bg-white/95 rounded-full mx-auto flex items-center justify-center shadow-md relative border border-white/50">
                      <div className="w-10 h-10 bg-[#F4EDE2] rounded-full flex items-center justify-center border border-dashed border-stone-300">
                        <Sparkles className="w-4 h-4 text-[#CF9F3C]" />
                      </div>
                      {/* Fluffy makhana bounds */}
                      <span className="absolute -top-1 w-3 h-3 bg-white rounded-full"></span>
                      <span className="absolute -bottom-1 w-3 h-3 bg-white rounded-full"></span>
                      <span className="absolute -left-1.5 w-3.5 h-3.5 bg-white rounded-full"></span>
                      <span className="absolute -right-1 w-3.5 h-3.5 bg-white rounded-full"></span>
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-[10px] font-sans font-bold uppercase block tracking-wider text-[#D4AF37]">
                        {plFlavor}
                      </span>
                      <span className="text-[8px] font-mono opacity-85 block tracking-widest font-semibold">
                        Gourmet Fox Nuts • {plSize.split(' ')[0]} Net Weight
                      </span>
                    </div>
                  </div>

                  {/* Bottom pouch seal */}
                  <div className="absolute bottom-0 inset-x-0 h-4 border-t border-black/10 flex items-center justify-center"
                       style={{ background: 'repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(0,0,0,0.15) 4px, rgba(0,0,0,0.15) 8px)' }}>
                  </div>
                </div>

                <span className="text-[10px] text-stone-400 font-mono mt-4">Real-time dynamic pouch simulator v1.2</span>
              </div>

              {/* Right Column - Submission Request form */}
              <div className="lg:col-span-3 bg-white border border-amber-100 rounded-3xl p-6">
                <h3 className="font-serif text-base font-bold text-stone-900 mb-2 border-b border-stone-100 pb-2">2. Register Brand RFQ</h3>
                <p className="text-[11px] text-stone-400 mb-4 font-sans leading-normal">Submit your customized parameters. Leads feed into the partner CMS dashboard for custom container quote clearings.</p>

                {plSuccess ? (
                  <div className="p-4 bg-[#2E7D32]/10 border border-[#2E7D32]/20 text-[#2E7D32] rounded-2xl text-center space-y-2">
                    <CheckSquare className="w-7 h-7 mx-auto text-[#D4AF37]" />
                    <span className="block text-xs font-bold uppercase tracking-wider">OEM RFQ Registered!</span>
                    <p className="text-[10px] text-stone-500 font-sans leading-normal">Our production manager is reviewing your cylinder setup parameters. Quotation dispatched to your email.</p>
                  </div>
                ) : (
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (!plName || !plCompany || !plEmail) return;
                    
                    // Inject custom request into bulkEnquiries state to show integration!
                    const newPLInquiry: BulkEnquiry = {
                      id: `PL-${Math.floor(100 + Math.random() * 900)}`,
                      name: plName,
                      companyName: plCompany,
                      email: plEmail,
                      phone: plPhone || '+91 93107 30291',
                      role: 'Corporate',
                      quantityRequired: `${plQty.toLocaleString()} units of Private Label`,
                      message: `[Private Label RFQ Configured] Foil Theme: ${plMaterial}, Sizing: ${plSize}, Flavor: ${plFlavor}. Estimated units: ${plQty}. Brand Name: ${plBrandName}.`,
                      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/\s/g, '-'),
                      status: 'New'
                    };
                    setBulkEnquiries([newPLInquiry, ...bulkEnquiries]);
                    setPlSuccess(true);
                    setPlName('');
                    setPlCompany('');
                    setPlEmail('');
                    setPlPhone('');
                    setTimeout(() => setPlSuccess(false), 9000);
                  }} className="space-y-3.5 text-xs font-semibold text-stone-700">
                    <div>
                      <label className="block text-stone-500 uppercase mb-1">Contact Name</label>
                      <input
                        type="text"
                        value={plName}
                        onChange={(e) => setPlName(e.target.value)}
                        placeholder="e.g. Johnathan Miller"
                        className="w-full p-2 bg-[#F8F5F0] border border-stone-200 rounded-lg outline-none focus:border-[#2E7D32]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-stone-500 uppercase mb-1">Company / Retail Brand</label>
                      <input
                        type="text"
                        value={plCompany}
                        onChange={(e) => setPlCompany(e.target.value)}
                        placeholder="e.g. Healthy Snacks Inc."
                        className="w-full p-2 bg-[#F8F5F0] border border-stone-200 rounded-lg outline-none focus:border-[#2E7D32]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-stone-500 uppercase mb-1">Business Email address</label>
                      <input
                        type="email"
                        value={plEmail}
                        onChange={(e) => setPlEmail(e.target.value)}
                        placeholder="e.g. jmiller@healthysnacks.com"
                        className="w-full p-2 bg-[#F8F5F0] border border-stone-200 rounded-lg outline-none focus:border-[#2E7D32]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-stone-500 uppercase mb-1">WhatsApp Sourcing Phone</label>
                      <input
                        type="tel"
                        value={plPhone}
                        onChange={(e) => setPlPhone(e.target.value)}
                        placeholder="e.g. +1 415 908 1142"
                        className="w-full p-2 bg-[#F8F5F0] border border-stone-200 rounded-lg outline-none focus:border-[#2E7D32]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#2E7D32] hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
                    >
                      ✓ Request Custom Quote
                    </button>
                  </form>
                )}
              </div>

            </div>
          </div>
        )}

        {/* VIEW 15: CUSTOMER DASHBOARD */}
        {activeView === 'dashboard' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
            
            {/* Upper Stats Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-5 bg-white border border-amber-100 rounded-3xl space-y-1 shadow-sm">
                <span className="text-[10px] font-mono font-bold text-[#2E7D32] uppercase tracking-wider block">Total Lifetime spendings</span>
                <div className="flex items-baseline gap-1 text-stone-900">
                  <span className="text-xl sm:text-2xl font-extrabold">₹{(1990 + orders.reduce((sum, o) => sum + o.totalAmount, 0)).toLocaleString()}</span>
                  <span className="text-[10px] text-stone-400 font-semibold font-sans">INR</span>
                </div>
              </div>
              <div className="p-5 bg-white border border-amber-100 rounded-3xl space-y-1 shadow-sm">
                <span className="text-[10px] font-mono font-bold text-[#2E7D32] uppercase tracking-wider block">Active Carrier Shipments</span>
                <div className="flex items-baseline gap-1 text-stone-900">
                  <span className="text-xl sm:text-2xl font-extrabold">{orders.filter(o => o.status !== 'Delivered').length || '1'} Active</span>
                </div>
              </div>
              <div className="p-5 bg-[#2E7D32]/10 border border-[#2E7D32]/20 rounded-3xl space-y-1 shadow-sm">
                <span className="text-[10px] font-mono font-bold text-[#2E7D32] uppercase tracking-wider block">Eco Carbon Offset Score</span>
                <div className="flex items-baseline gap-1.5 text-[#2E7D32]">
                  <Leaf className="w-5 h-5 text-[#D4AF37] animate-pulse" />
                  <span className="text-xl sm:text-2xl font-extrabold">{3 + orders.length} Trees Funded</span>
                </div>
              </div>
              <div className="p-5 bg-white border border-amber-100 rounded-3xl space-y-1 shadow-sm">
                <span className="text-[10px] font-mono font-bold text-[#2E7D32] uppercase tracking-wider block">Direct Loyalty Points</span>
                <div className="flex items-baseline gap-1 text-[#2E7D32]">
                  <Gift className="w-5 h-5 text-[#D4AF37]" />
                  <span className="text-xl sm:text-2xl font-extrabold">{250 + Math.round(orders.reduce((sum, o) => sum + (o.totalAmount * 0.1), 0))} Points</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Active tracking status & Recent orders list */}
              <div className="lg:col-span-8 space-y-8">
                
                {/* Active Tracking Step timeline */}
                <div className="p-6 bg-white border border-amber-100 rounded-3xl space-y-6 shadow-sm">
                  <div className="flex justify-between items-center border-b border-stone-100 pb-3">
                    <span className="text-xs font-bold text-stone-800 uppercase tracking-wide">Live Carrier Delivery shipment tracker</span>
                    <span className="bg-[#2E7D32]/10 text-[#2E7D32] text-[9px] uppercase font-mono font-bold px-2 py-0.5 rounded-full">Cargo ID: FMT-94821</span>
                  </div>

                  <div className="grid grid-cols-5 text-center text-[10px] font-bold text-stone-400 font-sans relative">
                    <div className="space-y-2 relative z-10">
                      <div className="w-6 h-6 rounded-full bg-[#2E7D32] text-white flex items-center justify-center mx-auto shadow font-mono text-[9px]">✓</div>
                      <span className="text-[#2E7D32] block">Order placed</span>
                    </div>
                    <div className="space-y-2 relative z-10">
                      <div className="w-6 h-6 rounded-full bg-[#2E7D32] text-white flex items-center justify-center mx-auto shadow font-mono text-[9px]">✓</div>
                      <span className="text-[#2E7D32] block">Darbhanga Sourcing</span>
                    </div>
                    <div className="space-y-2 relative z-10">
                      <div className="w-6 h-6 rounded-full bg-[#2E7D32] text-white flex items-center justify-center mx-auto shadow font-mono text-[9px]">✓</div>
                      <span className="text-[#2E7D32] block">Graded & Cleaned</span>
                    </div>
                    <div className="space-y-2 relative z-10">
                      <div className="w-6 h-6 rounded-full bg-[#D4AF37] text-white flex items-center justify-center mx-auto shadow font-mono text-[9px] animate-pulse">🚚</div>
                      <span className="text-[#D4AF37] block">Dispatch Cargo Hub</span>
                    </div>
                    <div className="space-y-2 relative z-10 opacity-40">
                      <div className="w-6 h-6 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center mx-auto shadow font-mono text-[9px]">5</div>
                      <span className="block">Delivered Target</span>
                    </div>

                    {/* Timeline slider background rail */}
                    <div className="absolute top-3 left-[10%] right-[10%] h-[2px] bg-stone-100 -z-0"></div>
                    <div className="absolute top-3 left-[10%] w-[60%] h-[2px] bg-[#2E7D32] -z-0"></div>
                  </div>
                </div>

                {/* Orders table list */}
                <div className="p-6 bg-white border border-amber-100 rounded-3xl space-y-4 shadow-sm">
                  <h3 className="font-serif text-lg font-bold text-stone-900 border-b border-stone-100 pb-2">Purchase History & Styled Receipts</h3>
                  
                  <div className="space-y-3">
                    {orders.map((order) => (
                      <div key={order.id} className="p-4 bg-[#F8F5F0] border border-stone-200 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-serif font-bold text-stone-900 text-sm">Order #{order.id}</span>
                            <span className={`text-[9px] font-bold font-mono px-2 py-0.5 rounded uppercase ${order.status === 'Delivered' ? 'bg-emerald-100 text-[#2E7D32]' : 'bg-amber-100 text-[#D4AF37]'}`}>
                              {order.status}
                            </span>
                          </div>
                          <span className="text-[10px] text-stone-400 font-semibold uppercase block">Date: {order.date} • Total units: {order.items.reduce((sum, i) => sum + i.quantity, 0)} • {order.paymentMethod}</span>
                        </div>

                        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                          <span className="font-bold text-[#2E7D32] text-sm">₹{order.totalAmount.toLocaleString('en-IN')}</span>
                          
                          {/* Printable Invoice PDF trigger */}
                          <button
                            onClick={() => {
                              setPlacedOrder(order);
                              setCheckoutStep('placed');
                              setActiveView('checkout');
                            }}
                            className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-950 text-white font-bold text-[10px] rounded-xl shadow cursor-pointer transition-all uppercase tracking-wide flex items-center gap-1"
                          >
                            <FileText className="w-3.5 h-3.5 text-[#D4AF37]" /> View Invoice PDF
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Address Profile management */}
              <div className="lg:col-span-4 bg-white border border-amber-100 rounded-3xl p-6 space-y-4 shadow-sm">
                <h3 className="font-serif text-base font-bold text-stone-900 border-b border-stone-100 pb-2">User Profile & Dispatch Address</h3>
                
                <div className="space-y-3.5 text-xs font-semibold text-stone-700">
                  <div>
                    <label className="block text-stone-400 uppercase mb-1">Full Delivery Name</label>
                    <input
                      type="text"
                      value={checkoutName}
                      onChange={(e) => setCheckoutName(e.target.value)}
                      className="w-full p-2 bg-[#F8F5F0] border border-stone-200 rounded-lg outline-none focus:border-[#2E7D32]"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-400 uppercase mb-1">Delivery Address</label>
                    <input
                      type="text"
                      value={checkoutAddress}
                      onChange={(e) => setCheckoutAddress(e.target.value)}
                      className="w-full p-2 bg-[#F8F5F0] border border-stone-200 rounded-lg outline-none focus:border-[#2E7D32]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-stone-400 uppercase mb-1">City, State</label>
                      <input
                        type="text"
                        value={checkoutCity}
                        onChange={(e) => setCheckoutCity(e.target.value)}
                        className="w-full p-2 bg-[#F8F5F0] border border-stone-200 rounded-lg outline-none focus:border-[#2E7D32]"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-400 uppercase mb-1">Pincode PIN</label>
                      <input
                        type="text"
                        value={checkoutPincode}
                        onChange={(e) => setCheckoutPincode(e.target.value)}
                        className="w-full p-2 bg-[#F8F5F0] border border-stone-200 rounded-lg outline-none focus:border-[#2E7D32]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-stone-400 uppercase mb-1">Phone Number Helpline</label>
                    <input
                      type="text"
                      value={checkoutPhone}
                      onChange={(e) => setCheckoutPhone(e.target.value)}
                      className="w-full p-2 bg-[#F8F5F0] border border-stone-200 rounded-lg outline-none focus:border-[#2E7D32]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => alert('Default dispatch address updated in browser secure state registry!')}
                      className="w-full py-2.5 bg-[#2E7D32] hover:bg-emerald-800 text-white rounded-xl font-bold text-[10px] uppercase tracking-wider cursor-pointer"
                    >
                      ✓ Update Default Address
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* VIEW 16: CONTACT & LIVE CONCIERGE CHAT SUPPORT */}
        {activeView === 'contact' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
            
            {/* Header */}
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-bold text-[#2E7D32] uppercase tracking-widest block">Operational Sourcing desk</span>
              <h2 className="font-serif text-2xl md:text-3.5xl font-extrabold text-[#111111]">Get in Touch With Us</h2>
              <p className="text-xs text-stone-500">Contact our Darbhanga sourcing headquarter or chat with our automated concierge agent for instant quotations.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* Left Column: Contact cards & vector simulated map */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Sourcing card */}
                <div className="p-5 bg-white border border-amber-100 rounded-3xl space-y-4 shadow-sm font-sans text-xs font-medium text-stone-600">
                  <h4 className="font-serif text-sm font-bold text-stone-900 border-b border-stone-100 pb-2 flex items-center gap-2">
                    <MapPin className="w-4.5 h-4.5 text-[#D4AF37]" /> Sourcing Headquarters
                  </h4>
                  <div className="space-y-3">
                    <div className="flex gap-2.5">
                      <MapPin className="w-5 h-5 text-[#2E7D32] flex-shrink-0" />
                      <div>
                        <strong>Bihar Sourcing Hub:</strong>
                        <span className="block text-stone-400 mt-0.5">Plot No. 12, Sourcing Union Gali, Darbhanga Court Road, Bihar - 846004</span>
                      </div>
                    </div>
                    <div className="flex gap-2.5 border-t border-stone-100 pt-3">
                      <Phone className="w-5 h-5 text-[#2E7D32] flex-shrink-0" />
                      <div>
                        <strong>Helpline Sourcing:</strong>
                        <span className="block text-[#2E7D32] font-bold mt-0.5">+91 93107 30291</span>
                      </div>
                    </div>
                    <div className="flex gap-2.5 border-t border-stone-100 pt-3">
                      <Globe className="w-5 h-5 text-[#2E7D32] flex-shrink-0" />
                      <div>
                        <strong>Corporate Mail:</strong>
                        <span className="block text-stone-900 font-bold mt-0.5">Info@farmingonuts.com</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simulated illustration map */}
                <div className="p-5 bg-stone-900 text-white rounded-3xl border border-stone-800 flex flex-col justify-between shadow-lg relative overflow-hidden h-[180px]">
                  {/* Glowing routes */}
                  <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
                  <div className="absolute top-1/3 left-2/3 w-2 h-2 bg-amber-500 rounded-full animate-ping"></div>
                  
                  <div className="relative z-10 space-y-1">
                    <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest block">Global Trading Logistics</span>
                    <h5 className="font-serif font-bold text-sm">Direct Mithila Marine Routes</h5>
                    <p className="text-[10px] text-stone-400 leading-relaxed font-sans max-w-[210px]">Ventilated maritime container routes from Mumbai cargo hub straight to Europe, USA, and East Asia docks.</p>
                  </div>
                  
                  <span className="text-[9px] uppercase tracking-widest font-bold text-[#2E7D32] font-mono block relative z-10 mt-2">✓ Phytosanitary Certified</span>
                </div>

              </div>

              {/* Middle Column: Chat Concierge Desk */}
              <div className="lg:col-span-5 bg-white border border-amber-100 rounded-3xl flex flex-col justify-between shadow-md overflow-hidden min-h-[460px]">
                
                {/* Chat header */}
                <div className="px-5 py-4 bg-[#111111] text-white flex items-center justify-between border-b border-stone-800">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="font-serif text-sm tracking-wide font-bold">Farmingo Nuts Chat Concierge</span>
                  </div>
                  <span className="text-[9px] text-stone-400 uppercase font-mono tracking-wider">Type queries below</span>
                </div>

                {/* Chat window body */}
                <div className="flex-grow p-4 space-y-3.5 overflow-y-auto max-h-[300px] min-h-[220px]">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`p-3 rounded-2xl text-xs max-w-[80%] leading-relaxed ${msg.sender === 'user' ? 'bg-[#2E7D32] text-white rounded-tr-none' : 'bg-[#F8F5F0] text-stone-800 rounded-tl-none border border-stone-200 font-medium'}`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick select pills */}
                <div className="px-4 py-2 border-t border-stone-100 flex flex-wrap gap-1.5 bg-[#FFFDF9]">
                  {[
                    { q: 'Minimum export MOQ?', a: 'Our standard maritime export MOQ is 500 kg (100 multi-wall woven sacks) or 10,000 custom units of Private Label packaging.' },
                    { q: 'How are Sutas sorted?', a: 'Raw makhana lotus seeds are sun-dried and graded using steel mechanical sieves into 4 Suta, 5 Suta, 6 Suta, and 7 Suta Jumbo grades with absolutely zero chlorine bleaching.' },
                    { q: 'Where are nuts grown?', a: 'Our fox nuts are harvested in chest-deep waters from muddy ecological wetlands in Darbhanga and Madhubani district of Bihar, India by 1,200 grower members.' }
                  ].map((pill, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        // User clicks, feeds response instantly
                        const userMsg = { sender: 'user' as const, text: pill.q };
                        const aiMsg = { sender: 'ai' as const, text: pill.a };
                        setChatMessages((prev) => [...prev, userMsg, aiMsg]);
                      }}
                      className="px-2 py-1 bg-amber-50 hover:bg-[#2E7D32]/10 border border-[#2E7D32]/20 rounded-full text-[9px] font-bold text-[#2E7D32] cursor-pointer"
                    >
                      {pill.q}
                    </button>
                  ))}
                </div>

                {/* Chat input form footer */}
                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (!chatInput) return;
                  const userMsg = { sender: 'user' as const, text: chatInput };
                  
                  // Standard fallback responder
                  let reply = `Thank you for your inquiry about "${chatInput}". To coordinate direct wholesales container sheets, let us register a call. Kindly call our sourcing helpline at +91 93107 30291 or submit an RFQ.`;
                  if (chatInput.toLowerCase().includes('moq') || chatInput.toLowerCase().includes('bulk')) {
                    reply = 'Our standard export container MOQ is 500kg or 10,000 retail private-label packaging bags. Custom container rates are coordinated from Darbhanga.';
                  } else if (chatInput.toLowerCase().includes('suta') || chatInput.toLowerCase().includes('size')) {
                    reply = 'Our seeds are graded into 4, 5, 6 Suta, and Jumbo 7 Suta. Larger sizes are preferred for premium gourmet popping and packaging uniform crunch.';
                  } else if (chatInput.toLowerCase().includes('recipe') || chatInput.toLowerCase().includes('cook')) {
                    reply = 'Learn our Royal Makhana Kheer sweet pudding or Cast-iron Cast Roasted Makhana snacks recipes on our Wholesome Recipes section!';
                  }

                  const aiMsg = { sender: 'ai' as const, text: reply };
                  setChatMessages((prev) => [...prev, userMsg, aiMsg]);
                  setChatInput('');
                }} className="p-3 border-t border-stone-100 flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask about shipping, Suta size, or private labeling..."
                    className="flex-grow p-2.5 bg-[#F8F5F0] border border-stone-200 rounded-xl text-xs outline-none focus:border-[#2E7D32]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-stone-900 hover:bg-stone-950 text-white font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Send
                  </button>
                </form>
              </div>

              {/* Right Column: Instant ticket inquiry form */}
              <div className="lg:col-span-3 bg-white border border-amber-100 rounded-3xl p-5 shadow-sm">
                <h3 className="font-serif text-base font-bold text-stone-900 border-b border-stone-100 pb-2">Operational Ticketing</h3>
                <p className="text-[10px] text-stone-400 mb-4 font-sans leading-normal">Submit immediate ticket messages. Tickets synchronize into our customer assistance database queue.</p>

                {plSuccess ? (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-2xl text-center">
                    ✓ Ticket Dispatched successfully!
                  </div>
                ) : (
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    setPlSuccess(true);
                    setTimeout(() => setPlSuccess(false), 8000);
                  }} className="space-y-3.5 text-xs font-semibold text-stone-700">
                    <div>
                      <label className="block text-stone-500 uppercase mb-1">Your Full Name</label>
                      <input type="text" required className="w-full p-2 bg-[#F8F5F0] border border-stone-200 rounded-lg outline-none focus:border-[#2E7D32]" />
                    </div>
                    <div>
                      <label className="block text-stone-500 uppercase mb-1">Email Address</label>
                      <input type="email" required className="w-full p-2 bg-[#F8F5F0] border border-stone-200 rounded-lg outline-none focus:border-[#2E7D32]" />
                    </div>
                    <div>
                      <label className="block text-stone-500 uppercase mb-1">Ticket Message</label>
                      <textarea required rows={4} className="w-full p-2 bg-[#F8F5F0] border border-stone-200 rounded-lg outline-none focus:border-[#2E7D32]" placeholder="Describe your query..."></textarea>
                    </div>

                    <button type="submit" className="w-full py-2.5 bg-[#2E7D32] hover:bg-emerald-800 text-white rounded-xl font-bold uppercase tracking-wider text-[10px] cursor-pointer">
                      Submit Ticket
                    </button>
                  </form>
                )}
              </div>

            </div>
          </div>
        )}

      </main>

      {/* Footer block */}
      <Footer onNavigate={(val) => {
        setActiveView(val);
        window.scrollTo(0, 0);
      }} />

      {/* AI Search modal drawer */}
      <AISearch
        isOpen={aiSearchOpen}
        onClose={() => setAiSearchOpen(false)}
        onSelectProduct={handleSelectProductFromList}
      />

      {/* Detailed Product info Modal */}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          isOpen={modalOpen}
          onClose={() => { setModalOpen(false); setSelectedProduct(null); }}
          onAddToCart={handleAddToCart}
          onAddToWishlist={handleAddToWishlist}
          onBuyNow={handleBuyNow}
          isWishlisted={wishlist.some(w => w.id === selectedProduct.id)}
          similarProducts={shopProducts.filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id)}
        />
      )}

    </div>
  );
}
