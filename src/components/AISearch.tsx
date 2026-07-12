/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Search, Mic, X, Sparkles, SlidersHorizontal, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

interface AISearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export default function AISearch({ isOpen, onClose, onSelectProduct }: AISearchProps) {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // Basic filtering states
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [selectedSuta, setSelectedSuta] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState(false);

  // Results
  const [results, setResults] = useState<Product[]>(PRODUCTS);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // AI-like response generator (Client Heuristics for speedy responses)
  const generateAIResult = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setAiResponse(null);
      setAiSuggestions([
        'Spicy snacks with low fat',
        'Jumbo raw makhana for diabetic diet',
        'High protein makhana for kids',
        'Organic sweet makhana'
      ]);
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      const q = searchQuery.toLowerCase();
      
      // Heuristic replies simulating a premium LLM advice
      if (q.includes('spicy') || q.includes('hot') || q.includes('peri') || q.includes('mint') || q.includes('pudina')) {
        setAiResponse("Based on your taste profile, I recommend our **Gourmet Pudina Mint Herb Makhana** or our **Gourmet Flavors Quartet Gift Box**. They are slow-roasted to a precise airy crunch and dusted with premium organic herbs.");
        setSelectedCategory('roasted');
        setResults(PRODUCTS.filter(p => p.id === 'roasted-pudina-mint' || p.id === 'combo-gourmet-quad'));
      } else if (q.includes('diabetic') || q.includes('diabetes') || q.includes('blood sugar') || q.includes('organic')) {
        setAiResponse("For managing blood sugar, raw organic makhana is supreme. I recommend our **Mithila Gold 5 Suta Raw Makhana** or **Colossal Jumbo Handpicked Makhana**. They have an extremely low Glycemic Index (GI), letting complex carbs process slowly, thus avoiding sudden insulin spikes.");
        setSelectedCategory('raw');
        setResults(PRODUCTS.filter(p => p.category === 'raw'));
      } else if (q.includes('weight loss') || q.includes('diet') || q.includes('slim')) {
        setAiResponse("For weight loss, our **Mithila Gold 5 Suta Raw Makhana** or **Workplace Healthy Snacking Bundle** are excellent. Abundant dietary fibers trigger early fullness, decreasing total daily calorie absorption efficiently.");
        setResults(PRODUCTS.filter(p => p.id === 'raw-5-suta' || p.id === 'combo-healthy-snacking'));
      } else if (q.includes('kid') || q.includes('child') || q.includes('school') || q.includes('snack')) {
        setAiResponse("Our **Workplace Healthy Snacking Bundle** and **Gourmet Pudina Mint Herb Makhana** are huge hits. They provide abundant natural dietary fibers with zero cholesterol!");
        setResults(PRODUCTS.filter(p => p.id === 'combo-healthy-snacking' || p.id === 'roasted-pudina-mint'));
      } else if (q.includes('sweet') || q.includes('chocolate') || q.includes('dessert') || q.includes('gift')) {
        setAiResponse("Indulge or gift beautifully! Our **Gourmet Flavors Quartet Gift Box** features an elegant sustainable gift carton filled with roasted treats. High in heart-healthy antioxidants!");
        setResults(PRODUCTS.filter(p => p.id === 'combo-gourmet-quad'));
      } else if (q.includes('jumbo') || q.includes('large') || q.includes('7 suta') || q.includes('colossal')) {
        setAiResponse("If you want the absolute largest makhana on earth, go for our **Colossal Jumbo Handpicked Makhana**. Perfect for premium gifting, dry-frying, or custom culinary works.");
        setResults(PRODUCTS.filter(p => p.sutaSize?.includes('7 Suta') || p.id === 'raw-jumbo'));
      } else {
        // Standard textual matching
        const filtered = PRODUCTS.filter(p => 
          p.name.toLowerCase().includes(q) || 
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.benefits.some(b => b.toLowerCase().includes(q))
        );
        setResults(filtered);
        setAiResponse(filtered.length ? `Found **${filtered.length} products** matching your query. Let me know if you would like me to narrow down the benefits!` : "No direct matches found. Please try simple keyphrases like 'spicy', 'diabetic friendly', 'cheese' or 'jumbo raw'.");
      }
      setIsGenerating(false);
    }, 600);
  };

  // Run normal filter + query sync
  useEffect(() => {
    let filtered = PRODUCTS;

    if (query && !aiResponse) {
      const q = query.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (selectedSuta !== 'all') {
      filtered = filtered.filter(p => p.sutaSize && p.sutaSize.includes(selectedSuta));
    }

    filtered = filtered.filter(p => p.price <= maxPrice);

    if (inStockOnly) {
      filtered = filtered.filter(p => p.stockStatus !== 'Out of Stock');
    }

    // Only update if AI hasn't taken over results
    if (!aiResponse) {
      setResults(filtered);
    }
  }, [query, selectedCategory, maxPrice, selectedSuta, inStockOnly, aiResponse]);

  const handleMicClick = () => {
    setIsListening(true);
    setQuery('Listening for premium flavours...');
    setTimeout(() => {
      setIsListening(false);
      // Simulating a voice search string
      const voicePrompts = [
        'Show me premium organic high calcium makhana',
        'Recommend highly spicy peri peri snacks',
        'Help me find snacks for weight loss',
        'Recommend chocolate makhana for kids'
      ];
      const randomPrompt = voicePrompts[Math.floor(Math.random() * voicePrompts.length)];
      setQuery(randomPrompt);
      generateAIResult(randomPrompt);
    }, 2000);
  };

  const handleSuggestionClick = (sug: string) => {
    setQuery(sug);
    generateAIResult(sug);
  };

  const handleClose = () => {
    setQuery('');
    setAiResponse(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm transition-all duration-300">
      <div className="min-h-screen px-4 text-center md:px-0">
        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-amber-50/95 border border-amber-100 rounded-3xl shadow-2xl">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-amber-100 bg-[#111111] text-white">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#D4AF37] animate-pulse" />
              <span className="font-serif text-lg tracking-wider font-semibold">Farmingo Nuts Intelligent AI Search</span>
            </div>
            <button onClick={handleClose} className="p-1 rounded-full hover:bg-white/10 transition-colors">
              <X className="w-6 h-6 text-gray-300" />
            </button>
          </div>

          <div className="p-6">
            {/* Search Bar Container */}
            <div className="relative flex items-center mb-6">
              <Search className="absolute left-4 w-5 h-5 text-[#2E7D32]" />
              <input
                type="text"
                placeholder="Ask our AI search: 'Suggest a gluten-free snack for office' or 'Jumbo raw makhana'..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && generateAIResult(query)}
                className="w-full py-4 pl-12 pr-24 text-base bg-white border-2 border-amber-100 rounded-full shadow-inner focus:border-[#2E7D32] focus:ring-2 focus:ring-green-100 focus:outline-none transition-all placeholder:text-gray-400"
              />
              <div className="absolute right-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleMicClick}
                  className={`p-2 rounded-full cursor-pointer hover:bg-gray-100 transition-colors ${isListening ? 'bg-red-100 text-red-600 animate-bounce' : 'text-gray-500'}`}
                  title="Voice Search"
                >
                  <Mic className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => generateAIResult(query)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#2E7D32] rounded-full hover:bg-[#2E7D32]/90 transition-colors"
                >
                  Ask AI
                </button>
              </div>
            </div>

            {/* Quick Suggestions */}
            {!query && (
              <div className="mb-6">
                <span className="text-xs font-semibold tracking-wider text-[#2E7D32] uppercase block mb-3">AI Quick Suggestions</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Spicy flavors with low fat',
                    'High protein for weight loss',
                    'Organic makhana for diabetes',
                    'Jumbo sizes for curries',
                    'Healthy kids snacks'
                  ].map((sug, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestionClick(sug)}
                      className="px-3.5 py-1.5 text-xs text-stone-700 bg-white border border-stone-200 hover:border-[#2E7D32] hover:bg-[#2E7D32]/5 rounded-full transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                      {sug}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Extra Manual Filters Toggle */}
            <div className="mb-6">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-[#111111] hover:text-[#2E7D32] transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#D4AF37]" />
                {showFilters ? 'Hide Advanced Filters' : 'Show Advanced Filters & Sliders'}
              </button>

              {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 mt-3 bg-white border border-amber-100 rounded-2xl animate-fadeIn">
                  {/* Category filter */}
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1.5">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => {
                        setAiResponse(null);
                        setSelectedCategory(e.target.value);
                      }}
                      className="w-full p-2 text-xs border border-stone-200 rounded-lg outline-none focus:border-[#2E7D32]"
                    >
                      <option value="all">All Categories</option>
                      <option value="raw">Raw Makhana</option>
                      <option value="roasted">Roasted Gourmet</option>
                      <option value="bulk-export">Wholesale Bulk</option>
                    </select>
                  </div>

                  {/* Suta Size */}
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1.5">Specification / Size</label>
                    <select
                      value={selectedSuta}
                      onChange={(e) => {
                        setAiResponse(null);
                        setSelectedSuta(e.target.value);
                      }}
                      className="w-full p-2 text-xs border border-stone-200 rounded-lg outline-none focus:border-[#2E7D32]"
                    >
                      <option value="all">Any Size</option>
                      <option value="4 Suta">4 Suta (Medium)</option>
                      <option value="5 Suta">5 Suta (Large)</option>
                      <option value="6 Suta">6 Suta (Super Large)</option>
                      <option value="Jumbo">7 Suta Jumbo</option>
                    </select>
                  </div>

                  {/* Price range */}
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">Max Price: ₹{maxPrice}</label>
                    <input
                      type="range"
                      min="100"
                      max="1500"
                      step="50"
                      value={maxPrice}
                      onChange={(e) => {
                        setAiResponse(null);
                        setMaxPrice(Number(e.target.value));
                      }}
                      className="w-full h-1 bg-stone-200 rounded-lg appearance-none accent-[#2E7D32] cursor-pointer"
                    />
                  </div>

                  {/* In stock check */}
                  <div className="flex items-center pt-5">
                    <input
                      type="checkbox"
                      id="instock-search"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="w-4 h-4 text-[#2E7D32] border-stone-300 rounded focus:ring-[#2E7D32] accent-[#2E7D32]"
                    />
                    <label htmlFor="instock-search" className="ml-2 text-xs text-stone-700 select-none cursor-pointer font-medium">
                      In Stock Only
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* AI Response Block */}
            {isGenerating && (
              <div className="p-4 mb-6 bg-emerald-50/50 border border-emerald-100 rounded-2xl flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-[#2E7D32] border-t-transparent rounded-full animate-spin"></div>
                <span className="text-xs font-medium text-[#2E7D32] animate-pulse">Consulting Makhana Nutritional Heuristics...</span>
              </div>
            )}

            {aiResponse && !isGenerating && (
              <div className="p-5 mb-6 bg-gradient-to-r from-emerald-50 to-amber-50 border border-[#2E7D32]/20 rounded-2xl relative shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#2E7D32]/10 rounded-xl text-[#2E7D32]">
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#2E7D32] uppercase tracking-wider mb-1">Farmingo Nuts AI Sommelier Advice</h5>
                    <p className="text-sm text-stone-800 leading-relaxed font-sans">
                      {aiResponse.split('**').map((piece, i) => i % 2 === 1 ? <strong key={i} className="text-[#2E7D32] font-semibold">{piece}</strong> : piece)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setQuery('');
                    setAiResponse(null);
                  }}
                  className="absolute top-3 right-3 text-stone-400 hover:text-stone-600 cursor-pointer"
                  title="Clear AI advice"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Search Results */}
            <div>
              <div className="flex items-center justify-between mb-4 px-2">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                  Matches & Filtered Catalog ({results.length})
                </span>
                {aiResponse && (
                  <button
                    onClick={() => {
                      setQuery('');
                      setAiResponse(null);
                    }}
                    className="text-xs text-[#2E7D32] hover:underline"
                  >
                    Reset & Show All Products
                  </button>
                )}
              </div>

              {results.length === 0 ? (
                <div className="text-center py-10 bg-white border border-stone-100 rounded-2xl">
                  <p className="text-stone-500 font-medium text-sm">We couldn't find matching makhana variants.</p>
                  <p className="text-xs text-stone-400">Try checking the spelling or resetting active filters.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[360px] overflow-y-auto pr-2">
                  {results.slice(0, 6).map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        onSelectProduct(product);
                        handleClose();
                      }}
                      className="flex gap-4 p-3 bg-white hover:bg-stone-50 border border-stone-100 hover:border-amber-200 rounded-2xl cursor-pointer transition-all shadow-sm duration-200 group"
                    >
                      <div className="w-20 h-20 bg-stone-50 rounded-xl overflow-hidden flex-shrink-0 border border-stone-100">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex flex-col justify-between flex-grow">
                        <div>
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-[10px] font-bold text-white px-2 py-0.5 bg-[#2E7D32] rounded-full uppercase">
                              {product.category}
                            </span>
                            {product.sutaSize && (
                              <span className="text-[10px] font-bold text-stone-600 px-2 py-0.5 bg-amber-100 rounded-full">
                                {product.sutaSize}
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm font-bold text-[#111111] group-hover:text-[#2E7D32] transition-colors leading-tight line-clamp-1">
                            {product.name}
                          </h4>
                          <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">
                            {product.description}
                          </p>
                        </div>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-sm font-bold text-[#111111]">₹{product.price}</span>
                          <span className="text-xs text-stone-400 line-through">₹{product.mrp}</span>
                          <span className="text-[10px] font-bold text-[#2E7D32]">
                            {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center pr-2">
                        <div className="p-1 rounded-full bg-stone-100 text-[#2E7D32] group-hover:bg-[#2E7D32] group-hover:text-white transition-colors duration-200">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Sourcing Trust Seal Footer */}
          <div className="px-6 py-4 bg-stone-100 border-t border-amber-50 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-stone-500 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>Direct Farm Transparency Guaranteed</span>
            </div>
            <div className="flex items-center gap-1">
              {['100% Organic', 'Gluten Free', 'Baked Snack', 'Mithila Sourced'].map((tag, i) => (
                <span key={i} className="text-[10px] font-bold text-stone-500 bg-white border border-stone-200 rounded-full px-2.5 py-0.5">
                  ✓ {tag}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
