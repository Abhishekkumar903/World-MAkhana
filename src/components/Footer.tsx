/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Send, Sparkles, MapPin, Mail, Phone, ShieldCheck, 
  ChevronRight, ArrowUp, MessageCircle
} from 'lucide-react';
import { getAssetUrl } from '../utils/assetHelper';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  
  const [emailSub, setEmailSub] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailSub) return;
    setSubscribed(true);
    setEmailSub('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#111111] text-white pt-16 pb-12 relative border-t-4 border-[#2E7D32]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4 grid column layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-stone-800">
          
          {/* Col 1 Brand Statement (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full overflow-hidden shadow border border-stone-800 bg-stone-900">
                <img 
                  src={getAssetUrl("/assets/images/farmingo_nuts_logo_1783843254906.jpg")} 
                  alt="Farmingo Nuts Logo" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h2 className="font-serif text-lg tracking-wider font-extrabold uppercase text-white">
                Farmingo Nuts
              </h2>
            </div>
            
            <p className="text-xs text-stone-400 leading-relaxed font-sans font-medium">
              We process, grade and roast the absolute finest water lilies (fox nuts) straight from traditional farming pools in Mithila, Bihar. Our state-certified 5 Suta, 6 Suta and Jumbo kernels offer unmatched airy crunch.
            </p>

            <div className="space-y-2 text-xs text-stone-400 font-medium">
              <span className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37]" /> Sourcing Hub: Phase-2, Plot No. GH-01A, Sector-16 Noida, Greater Noida, Uttar Pradesh 201009
              </span>
              <span className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37]" /> Info@farmingonuts.com
              </span>
              <span className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37]" /> WhatsApp Hotline: +91 93107 30291
              </span>
            </div>
          </div>

          {/* Col 2 Quick Products (2 cols) */}
          <div className="md:col-span-2 space-y-4 text-xs font-semibold">
            <h4 className="text-sm font-serif font-bold text-[#D4AF37] uppercase tracking-wider">Makhana Catalog</h4>
            <div className="flex flex-col gap-2.5 pl-1.5 text-stone-400">
              {['Raw 4 Suta Size', 'Raw 5 Suta Size', 'Raw 6 Suta Selection', 'Colossal Jumbo 7 Suta', 'Gourmet Roasted Herbs', 'Cheddar Cheese Pops', 'Fiery Spicy Peri Peri', 'Festival Combo Sets'].map((item) => (
                <button 
                  key={item} 
                  onClick={() => onNavigate('shop')}
                  className="text-left hover:text-[#2E7D32] hover:translate-x-1 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Col 3 Sourcing & Portal Links (3 cols) */}
          <div className="md:col-span-3 space-y-4 text-xs font-semibold">
            <h4 className="text-sm font-serif font-bold text-[#D4AF37] uppercase tracking-wider">Transparent Links</h4>
            <div className="flex flex-col gap-2.5 pl-1.5 text-stone-400">
              {[
                { id: 'benefits', label: 'Nutritional Benefits' },
                { id: 'bulk', label: 'Wholesale Pricing MOQ' },
                { id: 'export', label: 'Export Certifications' },
                { id: 'blog', label: 'Farming Wellness Blog' },
                { id: 'about', label: 'Our Sponsoring Journey' },
                { id: 'policies', label: 'Regulatory Policies' },
                { id: 'gallery', label: 'Soil Photo Gallery' }
              ].map((link) => (
                <button 
                  key={link.id} 
                  onClick={() => onNavigate(link.id)}
                  className="text-left hover:text-[#2E7D32] hover:translate-x-1 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Col 4 Newsletter & Seals (3 cols) */}
          <div className="md:col-span-3 space-y-4 text-xs">
            <h4 className="text-sm font-serif font-bold text-[#D4AF37] uppercase tracking-wider">Export newsletter</h4>
            <p className="text-stone-400 leading-relaxed font-sans font-medium">
              Join 1,200+ global wholesales getting monthly harvest market logs and pricing trends directly from Darbhanga.
            </p>

            <form onSubmit={handleSubscribe} className="relative mt-2">
              <input
                type="email"
                placeholder="Submit your email address..."
                value={emailSub}
                onChange={(e) => setEmailSub(e.target.value)}
                className="w-full py-3 pl-3 pr-12 text-xs bg-stone-900 border border-stone-800 rounded-xl focus:outline-none focus:border-[#2E7D32] text-white"
                required
              />
              <button
                type="submit"
                className="absolute right-1 top-1 p-2 bg-[#2E7D32] hover:bg-green-700 rounded-lg cursor-pointer transition-colors text-white"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            {subscribed && (
              <span className="text-[10px] text-[#2E7D32] font-semibold block uppercase">
                ✓ Thank you. Regional harvest data active.
              </span>
            )}

            {/* Regulatory certification icons stamp preview */}
            <div className="pt-4 border-t border-stone-800/80 space-y-2">
              <span className="text-[9px] text-stone-500 font-bold uppercase block tracking-wider">Regulatory Compliance:</span>
              <div className="flex gap-2">
                {['FSSAI Central', 'APEDA Registered', 'USDA Organic', 'ISO 22000'].map((cert, i) => (
                  <span key={i} className="text-[8px] font-bold bg-[#111111] text-stone-400 px-2.5 py-1 rounded border border-stone-800">
                    {cert}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Regulatory footer & farmer transparency citation */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-stone-500 text-[10px] uppercase tracking-widest font-bold">
          
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span>© 2026 Farmingo Nuts Pvt. Ltd. Sourced ethically in Bihar, India.</span>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={() => onNavigate('policies')} className="hover:text-stone-300">Privacy Policy</button>
            <span>•</span>
            <button onClick={() => onNavigate('policies')} className="hover:text-stone-300">Refund Terms</button>
            <span>•</span>
            <button onClick={() => onNavigate('policies')} className="hover:text-stone-300">Shipping Policy</button>
            <span>•</span>
            <button onClick={() => onNavigate('policies')} className="hover:text-stone-300">Legal Terms</button>
          </div>

        </div>

      </div>
    </footer>
  );
}
