/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  X, Heart, Share2, ShoppingBag, CreditCard, RotateCcw, 
  Video, Leaf, Shield, Award, Percent, StepForward, Star, 
  Truck, ArrowRight, BookOpen, AlertCircle
} from 'lucide-react';
import { Product, CartItem } from '../types';
import { PRODUCTS } from '../data/products';

interface ProductDetailsModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
  onAddToWishlist: (product: Product) => void;
  onBuyNow: (item: CartItem) => void;
  isWishlisted: boolean;
  similarProducts: Product[];
}

export default function ProductDetailsModal({
  product, isOpen, onClose, onAddToCart, onAddToWishlist, onBuyNow, isWishlisted, similarProducts
}: ProductDetailsModalProps) {
  
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedWeight, setSelectedWeight] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'facts' | 'ing' | 'benefits' | 'shipping'>('desc');
  
  // Custom Interaction states
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({});
  const [view360, setView360] = useState(false);
  const [angleIndex, setAngleIndex] = useState(0); // 0, 1, 2 for 360 degree mockup
  const [showVideo, setShowVideo] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  // Frequently Bought Together configuration
  const [addAddonProduct, setAddAddonProduct] = useState(true);
  const addonProduct = PRODUCTS.find(p => p.id === 'roasted-pudina-mint') || PRODUCTS[0];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Reset defaults
      setActiveImageIdx(0);
      setQuantity(1);
      setView360(false);
      setShowVideo(false);
      setCopiedShare(false);
      if (product.weightOptions && product.weightOptions.length > 0) {
        setSelectedWeight(product.weightOptions[0]);
      }
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, product]);

  if (!isOpen) return null;

  // Custom weight pricing ratio
  const getDynamicPriceAndMrp = () => {
    let basePrice = product.price;
    let baseMrp = product.mrp;
    
    // Simple scaling multipliers for weights
    if (selectedWeight.includes('250g')) {
      basePrice = Math.round(product.price * 2 * 0.9);
      baseMrp = Math.round(product.mrp * 2);
    } else if (selectedWeight.includes('500g')) {
      basePrice = Math.round(product.price * 4 * 0.85);
      baseMrp = Math.round(product.mrp * 4);
    } else if (selectedWeight.includes('1kg')) {
      basePrice = Math.round(product.price * 8 * 0.75);
      baseMrp = Math.round(product.mrp * 8);
    } else if (selectedWeight.includes('5kg')) {
      basePrice = Math.round(product.price * 40 * 0.65);
      baseMrp = Math.round(product.mrp * 40);
    } else if (selectedWeight.includes('10kg')) {
      basePrice = Math.round(product.price * 80 * 0.6);
      baseMrp = Math.round(product.mrp * 80);
    } else if (selectedWeight.includes('Combo') || selectedWeight.includes('Total')) {
      basePrice = product.price;
      baseMrp = product.mrp;
    }
    
    return { price: basePrice, mrp: baseMrp };
  };

  const { price: currentPrice, mrp: currentMrp } = getDynamicPriceAndMrp();
  const savings = currentMrp - currentPrice;
  const savingsPercent = Math.round((savings / currentMrp) * 100);

  // Zoom Handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(1.8)',
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transform: 'scale(1)',
      transformOrigin: 'center center'
    });
  };

  // 360 degree spin images mock
  const anglesImages = [
    product.images[0],
    product.images[1] || '/assets/images/raw_makhana_jumbo_1781940261968.jpg',
    '/assets/images/roasted_makhana_golden_1781940274693.jpg'
  ];

  const handleShare = () => {
    setCopiedShare(true);
    navigator.clipboard.writeText(`${window.location.origin}/#product/${product.id}`);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const handleAddCartAction = (buyNow = false) => {
    const mainItem: CartItem = {
      product: { ...product, price: currentPrice, mrp: currentMrp },
      selectedWeight,
      quantity
    };

    if (buyNow) {
      onBuyNow(mainItem);
    } else {
      onAddToCart(mainItem);
    }

    if (addAddonProduct && !buyNow) {
      // Add frequently bought together item too
      onAddToCart({
        product: addonProduct,
        selectedWeight: addonProduct.weightOptions[0] || '100g',
        quantity: 1
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-6xl bg-amber-50/95 border border-amber-100 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-fadeIn">
        
        {/* Custom video overlay modal */}
        {showVideo && (
          <div className="absolute inset-0 z-50 bg-black/90 flex flex-col justify-center items-center p-4">
            <button 
              onClick={() => setShowVideo(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="w-full max-w-3xl aspect-video rounded-2xl overflow-hidden shadow-2xl bg-stone-900 flex flex-col justify-center items-center p-4 text-center">
              <Video className="w-16 h-16 text-[#D4AF37] mb-4 animate-pulse" />
              <h3 className="text-xl font-serif text-white tracking-widest font-semibold mb-2">Sustainable Farming & Cracking process in Mithila, Bihar</h3>
              <p className="text-sm text-stone-400 max-w-lg leading-relaxed mb-6">
                Watch how our traditional farmers harvest Lotus Fox Seeds from ecological deep-water reservoirs, sundry them, and woodfire-heat them before wooden cracking to yield 100% organic puffing.
              </p>
              <div className="w-full h-4 bg-stone-800 rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-[#2E7D32] rounded-full animate-pulse"></div>
              </div>
              <span className="text-xs text-stone-500 mt-2">Simulated HD Documentary Stream</span>
            </div>
          </div>
        )}

        {/* Header Close */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-40 p-2 rounded-full bg-stone-950/15 hover:bg-stone-950/20 text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Visual Left Showcase (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              
              {/* Main Canvas Viewer */}
              <div className="relative aspect-square rounded-2xl bg-white border border-amber-100 overflow-hidden shadow-sm group">
                {product.sutaSize && (
                  <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-[#111111] text-white text-[10px] font-bold uppercase tracking-widest rounded-full flex items-center gap-1.5 shadow">
                    <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                    {product.sutaSize} Grade
                  </span>
                )}

                {/* Video Play Trigger Icon */}
                <button 
                  onClick={() => setShowVideo(true)}
                  className="absolute bottom-4 left-4 z-10 p-2.5 bg-[#2E7D32] hover:bg-[#2E7D32]/90 text-white rounded-full flex items-center gap-1.5 shadow-md cursor-pointer transition-transform hover:scale-105"
                  title="Play Sourcing Video"
                >
                  <Video className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-wider pr-1">Video</span>
                </button>

                {/* 360 View Switcher Trigger */}
                <button 
                  onClick={() => setView360(!view360)}
                  className={`absolute bottom-4 right-4 z-10 p-2.5 rounded-full flex items-center gap-1.5 shadow-md text-xs font-bold transition-all cursor-pointer hover:scale-105 ${view360 ? 'bg-[#D4AF37] text-[#111111]' : 'bg-white/90 text-[#111111]'}`}
                >
                  <RotateCcw className={`w-4 h-4 ${view360 ? 'animate-spin' : ''}`} />
                  <span className="uppercase tracking-wider text-[10px]">360° View</span>
                </button>

                {/* Real interactive image or 360 drag image */}
                {view360 ? (
                  <div className="w-full h-full flex flex-col justify-center items-center bg-white p-4">
                    <img 
                      src={anglesImages[angleIndex]} 
                      alt="360 angle view" 
                      className="w-full h-full object-contain pointer-events-none"
                    />
                    <div className="absolute inset-x-6 bottom-16 flex flex-col items-center gap-1 bg-stone-900/10 p-2 rounded-xl">
                      <span className="text-[10px] font-semibold text-stone-600 block">DRAG OR ADJUST ANGLE TO ROTATE</span>
                      <input 
                        type="range" 
                        min="0" 
                        max="2" 
                        value={angleIndex} 
                        onChange={(e) => setAngleIndex(Number(e.target.value))}
                        className="w-full accent-[#2E7D32] h-1.5 bg-stone-300 rounded cursor-pointer"
                      />
                    </div>
                  </div>
                ) : (
                  <div 
                    className="w-full h-full overflow-hidden cursor-zoom-in"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  >
                    <img 
                      src={product.images[activeImageIdx]} 
                      alt={product.name} 
                      style={zoomStyle}
                      className="w-full h-full object-cover transition-transform duration-100 ease-out"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
              </div>

              {/* Thumbnails list */}
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setView360(false);
                      setActiveImageIdx(idx);
                    }}
                    className={`w-16 h-16 rounded-xl border-2 overflow-hidden flex-shrink-0 transition-all cursor-pointer ${idx === activeImageIdx && !view360 ? 'border-[#2E7D32] scale-105 shadow-sm' : 'border-stone-100 hover:border-amber-200'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
                {/* 360 thumb */}
                <button
                  onClick={() => setView360(true)}
                  className={`w-16 h-16 rounded-xl border-2 overflow-hidden bg-emerald-50 flex flex-col justify-center items-center flex-shrink-0 transition-all cursor-pointer ${view360 ? 'border-[#D4AF37] scale-105 shadow-sm' : 'border-stone-100'}`}
                >
                  <RotateCcw className="w-5 h-5 text-[#2E7D32]" />
                  <span className="text-[9px] font-bold uppercase mt-1">360°</span>
                </button>
              </div>

              {/* Premium trust icons block */}
              <div className="grid grid-cols-3 gap-3 p-4 bg-white/75 border border-amber-100 rounded-2xl mt-2">
                <div className="flex flex-col items-center text-center">
                  <Leaf className="w-5 h-5 text-[#2E7D32] mb-1" />
                  <span className="text-[10px] font-bold text-[#111111]">100% Organic</span>
                  <span className="text-[8px] text-stone-500">Pesticide Free</span>
                </div>
                <div className="flex flex-col items-center text-center border-x border-stone-100">
                  <Shield className="w-5 h-5 text-[#2E7D32] mb-1" />
                  <span className="text-[10px] font-bold text-[#111111]">Kid Approved</span>
                  <span className="text-[8px] text-stone-500">Baked (Non-Fried)</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Award className="w-5 h-5 text-[#D4AF37] mb-1" />
                  <span className="text-[10px] font-bold text-[#111111]">Mithila Origin</span>
                  <span className="text-[8px] text-stone-500">Premium Grading</span>
                </div>
              </div>

            </div>

            {/* Information Right Details (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              
              {/* Product header info */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold tracking-widest text-[#2E7D32] bg-[#2E7D32]/10 px-3 py-1 rounded-full uppercase">
                    {product.category === 'raw' ? 'Bihar Wetland Raw Crop' : 'Baked Gourmet Snack'}
                  </span>
                  
                  {product.isBestSeller && (
                    <span className="text-[10px] font-bold tracking-widest text-[#111111] bg-[#D4AF37]/30 px-3 py-1 rounded-full uppercase">
                      ★ Best Seller
                    </span>
                  )}
                  {product.isTodayDeal && (
                    <span className="text-[10px] font-bold tracking-widest text-white bg-red-600 px-3 py-1 rounded-full uppercase">
                      % Today's Deal
                    </span>
                  )}
                </div>

                <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#111111] tracking-tight leading-tight mb-2">
                  {product.name}
                </h1>

                {/* Rating display */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 fill-current ${i < Math.floor(product.rating) ? 'text-amber-500' : 'text-gray-300'}`} />
                    ))}
                    <span className="text-sm font-bold text-stone-800 ml-1.5">{product.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-stone-300">|</span>
                  <button className="text-xs font-semibold text-stone-600 hover:text-[#2E7D32] underline cursor-pointer">
                    {product.reviewsCount} Verified Buyer Reviews
                  </button>
                </div>
              </div>

              {/* Dynamic Price Box */}
              <div className="p-4 bg-white border border-amber-100 rounded-2xl flex items-center justify-between shadow-sm">
                <div>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-3xl font-bold text-[#111111]">₹{currentPrice}</span>
                    <span className="text-sm text-stone-400 line-through">MRP ₹{currentMrp}</span>
                    <span className="text-sm font-bold text-white bg-[#2E7D32] px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow">
                      {savingsPercent}% OFF
                    </span>
                  </div>
                  <p className="text-xs text-[#2E7D32] font-semibold mt-1">
                    You Save: ₹{savings} (Inclusive of all local GST taxes)
                  </p>
                </div>

                <div className="text-right">
                  <span className={`text-xs font-bold px-2.5 py-1.5 rounded-lg inline-block shadow-sm ${product.stockStatus === 'In Stock' ? 'bg-emerald-100 text-emerald-800' : product.stockStatus === 'Low Stock' ? 'bg-amber-100 text-amber-800 animate-pulse' : 'bg-stone-200 text-stone-600'}`}>
                    ● {product.stockStatus === 'In Stock' ? 'Freshly Packed & Active' : product.stockStatus === 'Low Stock' ? 'Only a few bags left' : 'Out of Stock'}
                  </span>
                  <span className="block text-[8px] text-stone-400 font-bold mt-1 uppercase">Shipped within 12 Hrs</span>
                </div>
              </div>

              {/* Short tagline description */}
              <p className="text-sm text-stone-600 leading-relaxed font-sans font-medium italic border-l-4 border-[#2E7D32] pl-3">
                "{product.description}"
              </p>

              {/* Weight Options Picker */}
              <div>
                <span className="text-xs font-bold tracking-wider text-stone-600 block uppercase mb-2">Select Packing Size Weight:</span>
                <div className="flex flex-wrap gap-2.5">
                  {product.weightOptions.map((weight) => (
                    <button
                      key={weight}
                      onClick={() => setSelectedWeight(weight)}
                      className={`px-4 py-2.5 text-xs font-bold border rounded-xl transition-all cursor-pointer ${weight === selectedWeight ? 'border-[#2E7D32] bg-[#2E7D32] text-white shadow' : 'border-stone-200 bg-white text-[#111111] hover:border-amber-300 hover:bg-amber-50'}`}
                    >
                      {weight}
                    </button>
                  ))}
                </div>
                <span className="text-[10px] block text-[#2E7D32] font-bold mt-1.5 uppercase">✓ Bulk boxes pack larger suta sizes and save up to 40% margin</span>
              </div>

              {/* Quantity Selector & Wishlist & Actions Box */}
              <div className="flex flex-col sm:flex-row gap-3.5 pt-1">
                {/* Quantity */}
                <div className="flex items-center border border-stone-200 bg-white rounded-xl overflow-hidden h-12 w-32 justify-between flex-shrink-0 shadow-sm">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-stone-500 hover:text-stone-800 font-bold hover:bg-stone-100 text-lg cursor-pointer"
                  >
                    -
                  </button>
                  <span className="font-bold text-[#111111] text-sm">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-stone-500 hover:text-stone-800 font-bold hover:bg-stone-100 text-lg cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={() => handleAddCartAction(false)}
                  disabled={product.stockStatus === 'Out of Stock'}
                  className="flex-1 h-12 bg-white hover:bg-[#2E7D32]/5 text-[#2E7D32] border-2 border-[#2E7D32] hover:border-[#2E7D32] rounded-xl flex items-center justify-center gap-2.5 text-sm font-bold shadow-sm cursor-pointer active:scale-[0.98] transition-transform disabled:opacity-50"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Shopping Cart
                </button>

                {/* Buy Now */}
                <button
                  onClick={() => handleAddCartAction(true)}
                  disabled={product.stockStatus === 'Out of Stock'}
                  className="flex-1 h-12 bg-[#2E7D32] hover:bg-[#2E7D32]/90 text-white rounded-xl flex items-center justify-center gap-2.5 text-sm font-bold shadow-md cursor-pointer active:scale-[0.98] transition-transform disabled:opacity-50"
                >
                  <CreditCard className="w-4 h-4 text-[#D4AF37]" />
                  Express Purchase
                </button>

                {/* Wishlist and Share */}
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => onAddToWishlist(product)}
                    className={`p-3 rounded-xl border flex items-center justify-center cursor-pointer transition-all ${isWishlisted ? 'border-red-200 bg-red-50 text-red-500' : 'border-stone-200 bg-white text-stone-500 hover:text-red-500'}`}
                    title="Add to Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-3 rounded-xl border border-stone-200 bg-white text-stone-500 hover:text-[#2E7D32] flex items-center justify-center cursor-pointer transition-all"
                    title="Copy Share Link"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {copiedShare && (
                <div className="p-2 py-1.5 bg-[#2E7D32]/10 border border-[#2E7D32]/20 text-[#2E7D32] text-xs font-semibold rounded-lg text-center font-mono">
                  Copied share link to clipboard! Standard tracking token active.
                </div>
              )}

              {/* Tabs list (Description, Nutrition, Ingredients, Shipping) */}
              <div className="mt-4 border-b border-stone-200">
                <div className="flex overflow-x-auto gap-4 md:gap-6 -mb-px">
                  {[
                    { id: 'desc', label: 'Overviews' },
                    { id: 'facts', label: 'Nutrition facts' },
                    { id: 'ing', label: 'Ingredients' },
                    { id: 'benefits', label: 'Health Benefits' },
                    { id: 'shipping', label: 'Shipping Details' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`pb-2.5 text-xs font-bold uppercase tracking-wider border-b-2 cursor-pointer transition-all whitespace-nowrap ${activeTab === tab.id ? 'border-[#2E7D32] text-[#2E7D32]' : 'border-transparent text-stone-500 hover:text-stone-800'}`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content Rendering */}
              <div className="bg-white p-5 border border-amber-100 rounded-2xl min-h-[140px] text-stone-600 text-xs leading-relaxed">
                {activeTab === 'desc' && (
                  <div>
                    <h4 className="font-bold text-[#111111] text-sm mb-2 font-serif">Aesthetic Integrity & Sourcing:</h4>
                    <p className="mb-3">{product.fullDescription}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {product.benefits.slice(0, 3).map((b, i) => (
                        <span key={i} className="bg-emerald-50 text-[#2E7D32] border border-emerald-100 px-2.5 py-1 rounded-full text-[10px] font-bold">
                          ✓ {b}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'facts' && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="p-3 bg-stone-50 rounded-xl text-center">
                      <span className="block text-[10px] text-stone-500 font-bold uppercase">Energy (100g)</span>
                      <span className="text-base font-bold text-[#111111]">{product.nutritionalFacts.calories}</span>
                    </div>
                    <div className="p-3 bg-stone-50 rounded-xl text-center">
                      <span className="block text-[10px] text-stone-500 font-bold uppercase">Agrade Protein</span>
                      <span className="text-base font-bold text-[#2E7D32]">{product.nutritionalFacts.protein}</span>
                    </div>
                    <div className="p-3 bg-stone-50 rounded-xl text-center">
                      <span className="block text-[10px] text-stone-500 font-bold uppercase">Dietary Fiber</span>
                      <span className="text-base font-bold text-[#111111]">{product.nutritionalFacts.fiber}</span>
                    </div>
                    <div className="p-3 bg-stone-50 rounded-xl text-center">
                      <span className="block text-[10px] text-stone-500 font-bold uppercase">Calcium content</span>
                      <span className="text-base font-bold text-[#111111]">{product.nutritionalFacts.calcium}</span>
                    </div>
                    <div className="p-2.5 bg-[#2E7D32]/5 border border-emerald-100 col-span-full rounded-xl flex items-center gap-2">
                      <Leaf className="w-4 h-4 text-[#2E7D32] flex-shrink-0" />
                      <span className="text-[10px] text-stone-600 font-medium font-sans">
                        Makhana contains up to 10g of bioavailable vegetable proteins and is rich in heart-healthy magnesium minerals. Gluten-free, allergen-safe.
                      </span>
                    </div>
                  </div>
                )}

                {activeTab === 'ing' && (
                  <div>
                    <span className="block font-serif text-sm font-bold text-[#111111] mb-2">Falsification-Free Ingredients List:</span>
                    <ul className="list-disc pl-5 space-y-1 text-stone-600">
                      {product.ingredients.map((ing, idx) => (
                        <li key={idx} className="font-sans font-medium">{ing}</li>
                      ))}
                    </ul>
                    <p className="mt-3 text-stone-400 text-[10px] uppercase font-bold">
                      Made on a dedicated gluten-free and peanut-free line. Light salted variants use natural Himalayan mineral rock crystals.
                    </p>
                  </div>
                )}

                {activeTab === 'benefits' && (
                  <div>
                    <h4 className="font-bold text-[#111111] text-sm mb-2 font-serif">Clinical Benefits & Wellness:</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {product.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#2E7D32] font-extrabold text-sm select-none">✦</span>
                          <span className="font-sans text-stone-700 font-medium">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'shipping' && (
                  <div className="space-y-2">
                    <p className="font-sans text-stone-700 font-medium">
                      All products are double-bagged inside moisture-barrier jars with active oxygen freshers. This prevents moisture re-absorption, holding uniform crispy properties over longer shelf lives.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-1">
                      <span className="text-[10px] font-bold text-stone-500 flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5 text-[#2E7D32]" /> Standard Dispatch: Within 12-24 Hours
                      </span>
                      <span className="text-[10px] font-bold text-stone-500 flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-[#2E7D32]" /> Free delivery above ₹499 order bulk
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Frequently Bought Together Combo Box */}
              <div className="p-4 bg-gradient-to-r from-amber-50 to-white border border-amber-200/50 rounded-2xl">
                <span className="text-[10px] font-bold tracking-wider text-[#2E7D32] block uppercase mb-3">
                  Frequently Bought Together (Save ₹50 Combo)
                </span>
                
                <div className="flex flex-wrap md:flex-nowrap items-center gap-4 justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-lg overflow-hidden border border-amber-100 flex-shrink-0">
                      <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xl text-[#2E7D32] font-semibold font-serif">+</span>
                    <div className="w-12 h-12 bg-white rounded-lg overflow-hidden border border-amber-100 flex-shrink-0">
                      <img src={addonProduct.images[0]} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h6 className="text-xs font-bold text-stone-800 line-clamp-1">
                        Add {addonProduct.name}
                      </h6>
                      <p className="text-[10px] text-stone-500">
                        Top Selling slow-roasted item at just <strong className="text-stone-800">₹{addonProduct.price}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="fbt-addon" 
                      checked={addAddonProduct}
                      onChange={(e) => setAddAddonProduct(e.target.checked)}
                      className="w-4 h-4 text-[#2E7D32] border-stone-300 rounded focus:ring-[#2E7D32] accent-[#2E7D32]"
                    />
                    <label htmlFor="fbt-addon" className="text-xs text-stone-700 cursor-pointer font-bold select-none whitespace-nowrap">
                      Add Joint Combo Discount
                    </label>
                  </div>
                </div>
              </div>

              {/* Review section preview */}
              <div className="border-t border-stone-200 pt-3">
                <span className="text-xs font-extrabold tracking-wider text-[#111111] uppercase block mb-3">
                  Highlighted Customer Review:
                </span>
                <div className="p-3 bg-[#111111]/5 rounded-xl border border-stone-200/30">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-stone-300 flex items-center justify-center font-extrabold text-[10px] text-stone-800 uppercase">
                        S
                      </span>
                      <span className="text-xs font-bold text-stone-800">Swarup Patil</span>
                      <span className="text-[9px] text-green-700 bg-green-50 px-1.5 py-0.5 rounded-full font-bold">✓ Verified Purchase</span>
                    </div>
                    <div className="flex items-center text-amber-500">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                    </div>
                  </div>
                  <p className="text-xs italic text-stone-600">
                    "This is the real deal. In Bihar, we take our makhana seriously. The sizing is exceptionally uniform, and there are absolutely no hard grit hulls that chip your teeth. Will buy the 5kg wholesale pouch next."
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Similar / Related Products Section */}
          {similarProducts.length > 0 && (
            <div className="mt-10 pt-8 border-t border-stone-200">
              <h3 className="font-serif text-lg font-bold text-stone-800 mb-5">
                Related Makhana Selections
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {similarProducts.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      // Navigate inside modal
                      window.scrollTo(0, 0);
                      const customUrl = `${window.location.origin}/#product/${item.id}`;
                      // Triggers reload in App
                      window.location.href = `/#product/${item.id}`;
                    }}
                    className="group bg-white p-2.5 border border-stone-100 rounded-2xl cursor-pointer hover:border-amber-200 transition-all shadow-sm"
                  >
                    <div className="aspect-square bg-stone-50 rounded-xl overflow-hidden mb-2.5">
                      <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <span className="text-[9px] font-extrabold text-stone-400 uppercase tracking-widest block mb-1">
                      {item.category}
                    </span>
                    <h5 className="text-xs font-bold text-[#111111] line-clamp-1 group-hover:text-[#2E7D32] transition-colors leading-tight">
                      {item.name}
                    </h5>
                    <div className="flex items-center justify-between mt-1 pt-1 border-t border-stone-50">
                      <span className="text-xs font-bold text-[#111111]">₹{item.price}</span>
                      <span className="text-[10px] font-bold text-[#2E7D32]">{item.sutaSize || 'Roasted'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
