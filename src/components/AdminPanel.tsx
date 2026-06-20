/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  BarChart3, ShoppingCart, Users, Notebook, MessageSquare, 
  Settings, TrendingUp, Ship, ClipboardList, CheckCircle2, 
  X, HelpCircle, Save, Plus, Trash2, Edit3, Send
} from 'lucide-react';
import { Product, Order, BulkEnquiry, ExportEnquiry, BlogArticle } from '../types';
import { PRODUCTS, BLOGS } from '../data/products';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  bulkEnquiries: BulkEnquiry[];
  onReplyBulk: (id: string, replyText: string) => void;
  exportEnquiries: ExportEnquiry[];
  onReplyExport: (id: string, replyText: string) => void;
  customProducts: Product[];
  onUpdateProductStock: (id: string, stock: Product['stockStatus']) => void;
}

export default function AdminPanel({
  isOpen, onClose, orders, onUpdateOrderStatus, bulkEnquiries, onReplyBulk, exportEnquiries, onReplyExport, customProducts, onUpdateProductStock
}: AdminPanelProps) {
  
  const [activeTab, setActiveTab] = useState<'stats' | 'orders' | 'products' | 'bulk' | 'export' | 'coupons' | 'blogs'>('stats');
  
  // Local states for adding coupons, blogs or responding to queries
  const [coupons, setCoupons] = useState([
    { code: 'ORGANIC20', discount: 20, desc: '20% Off flat on Raw organic items', active: true },
    { code: 'FESTIVAL30', discount: 30, desc: '30% Off on gourmet festival combos', active: true },
    { code: 'FREEBY', discount: 10, desc: '10% Off and free standard delivery', active: true }
  ]);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState(10);
  const [newCouponDesc, setNewCouponDesc] = useState('');

  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  // Blog admin
  const [blogsList, setBlogsList] = useState<BlogArticle[]>(BLOGS);
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogTag, setNewBlogTag] = useState('');
  const [newBlogContent, setNewBlogContent] = useState('');

  if (!isOpen) return null;

  // Simple analytics calculations
  const totalRevenue = orders.reduce((sum, o) => o.paymentStatus === 'Paid' ? sum + o.totalAmount : sum, 0);
  const unpaidRevenue = orders.reduce((sum, o) => o.paymentStatus === 'Pending' ? sum + o.totalAmount : sum, 0);
  
  const totalCompletedOrders = orders.filter(o => o.status === 'Delivered').length;
  const pendingOrders = orders.filter(o => o.status !== 'Delivered');

  // Handle coupon addition
  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode) return;
    setCoupons([
      ...coupons,
      {
        code: newCouponCode.toUpperCase().replace(/\s+/g, ''),
        discount: newCouponDiscount,
        desc: newCouponDesc || `${newCouponDiscount}% Discount coupon`,
        active: true
      }
    ]);
    setNewCouponCode('');
    setNewCouponDesc('');
  };

  const handleToggleCoupon = (code: string) => {
    setCoupons(coupons.map(c => c.code === code ? { ...c, active: !c.active } : c));
  };

  const handleRemoveCoupon = (code: string) => {
    setCoupons(coupons.filter(c => c.code !== code));
  };

  // Handle adding custom blog article
  const handleAddBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlogTitle || !newBlogContent) return;
    const newArticle: BlogArticle = {
      id: `blog-${Date.now()}`,
      title: newBlogTitle,
      excerpt: newBlogContent.slice(0, 100) + '...',
      content: newBlogContent,
      image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=600&auto=format&fit=crop',
      author: 'Makhana World Editor-in-Chief',
      date: 'Just Now',
      readTime: '3 min read',
      tags: newBlogTag ? [newBlogTag] : ['Healthy Living'],
      views: 0
    };
    setBlogsList([newArticle, ...blogsList]);
    setNewBlogTitle('');
    setNewBlogTag('');
    setNewBlogContent('');
    alert('Blog article posted successfully on index metadata!');
  };

  // Mock static values for interactive SVG charts
  const monthlySales = [
    { label: 'Jan', amt: 22000 },
    { label: 'Feb', amt: 35000 },
    { label: 'Mar', amt: 41000 },
    { label: 'Apr', amt: 58000 },
    { label: 'May', amt: 84000 },
    { label: 'Jun', amt: 124000 }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-stone-900 border border-stone-800 text-white rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-fadeIn">
        
        {/* Admin Header */}
        <div className="px-6 py-4 bg-[#111111] border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#2E7D32] flex items-center justify-center">
              <Settings className="w-4.5 h-4.5 text-[#D4AF37] animate-spin" />
            </div>
            <div>
              <h2 className="font-serif text-lg tracking-wider font-semibold">Makhana World CMS Admin</h2>
              <span className="text-[10px] text-stone-400 uppercase tracking-widest font-mono">Operations & Distribution control panel v1.x</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Sidebar + Workspace layout */}
        <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
          
          {/* Nav rail */}
          <div className="w-full md:w-56 bg-stone-950 p-4 border-r border-stone-800 flex flex-row md:flex-col gap-1.5 overflow-x-auto md:overflow-x-visible">
            {[
              { id: 'stats', label: 'Dashboard Stats', icon: BarChart3 },
              { id: 'orders', label: 'Orders List', icon: ShoppingCart },
              { id: 'products', label: 'Inventory', icon: ClipboardList },
              { id: 'bulk', label: 'Dealer Queries', icon: Notebook },
              { id: 'export', label: 'Export Queries', icon: Ship },
              { id: 'coupons', label: 'Promo Coupons', icon: CheckCircle2 },
              { id: 'blogs', label: 'Blog & CMS', icon: MessageSquare }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold cursor-pointer flex items-center gap-3 transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-[#2E7D32] text-white shadow' : 'text-stone-400 hover:text-white hover:bg-stone-800/50'}`}
                >
                  <Icon className="w-4 h-4 text-[#D4AF37]" />
                  {tab.label}
                  {tab.id === 'orders' && orders.length > 0 && (
                    <span className="ml-auto bg-[#D4AF37] text-stone-950 font-extrabold text-[9px] px-1.5 py-0.5 rounded-full">
                      {orders.length}
                    </span>
                  )}
                  {tab.id === 'bulk' && bulkEnquiries.filter(e => e.status === 'New').length > 0 && (
                    <span className="ml-auto bg-red-600 text-white font-bold text-[9px] px-1.5 py-0.5 rounded-full">
                      {bulkEnquiries.filter(e => e.status === 'New').length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Work Area */}
          <div className="flex-grow p-6 overflow-y-auto bg-stone-900">
            
            {/* stats tab */}
            {activeTab === 'stats' && (
              <div className="space-y-6">
                
                {/* Cards row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800">
                    <span className="text-[10px] uppercase text-stone-400 font-bold block mb-1">Total Paid Sales</span>
                    <h3 className="text-2xl font-bold text-[#D4AF37]">₹{totalRevenue.toLocaleString('en-IN')}</h3>
                    <div className="flex items-center gap-1 text-[10px] text-[#2E7D32] font-bold mt-1">
                      <TrendingUp className="w-3 h-3" /> +24% YoY growth
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800">
                    <span className="text-[10px] uppercase text-stone-400 font-bold block mb-1">Unpaid / COD values</span>
                    <h3 className="text-2xl font-bold text-stone-300">₹{unpaidRevenue.toLocaleString('en-IN')}</h3>
                    <span className="text-[9px] text-stone-400 block mt-1.5">Awaiting physical COD deliver</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800">
                    <span className="text-[10px] uppercase text-stone-400 font-bold block mb-1">Total Orders</span>
                    <h3 className="text-2xl font-bold text-white">{orders.length}</h3>
                    <span className="text-[9px] text-[#2E7D32] font-semibold block mt-1.5">{totalCompletedOrders} delivered successfully</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800">
                    <span className="text-[10px] uppercase text-stone-400 font-bold block mb-1">Bulk Lead Inquiries</span>
                    <h3 className="text-2xl font-bold text-emerald-400">{bulkEnquiries.length + exportEnquiries.length}</h3>
                    <span className="text-[9px] text-stone-400 block mt-1.5">{bulkEnquiries.filter(e => e.status === 'New').length} new wholesale bids</span>
                  </div>
                </div>

                {/* Vector SVG Graph (Handmade clean vector chart) */}
                <div className="p-5 bg-stone-950 border border-stone-800 rounded-2xl">
                  <div className="mb-4 flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-bold font-serif text-[#D4AF37] tracking-wider uppercase">Semi-Annual Growth Analytics</h4>
                      <p className="text-xs text-stone-400">Total generated revenue processed online & bulk invoice (INR)</p>
                    </div>
                    <span className="bg-[#2E7D32]/20 text-[#2E7D32] font-bold text-[10px] px-3 py-1 rounded-full border border-green-800">
                      LIVE STREAM ACTIVE
                    </span>
                  </div>

                  {/* SVG Chart */}
                  <div className="h-44 w-full flex items-end justify-between pt-4 px-2">
                    {monthlySales.map((item, index) => {
                      // Normalize heights to fit in 120px max scale
                      const maxAmount = Math.max(...monthlySales.map(m => m.amt));
                      const heightPercent = `${(item.amt / maxAmount) * 100}%`;
                      return (
                        <div key={index} className="flex flex-col items-center flex-grow group">
                          <div className="text-[10px] font-bold text-[#D4AF37] mb-1.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            ₹{(item.amt / 1000)}K
                          </div>
                          <div 
                            style={{ height: heightPercent }} 
                            className="w-8 bg-[#2E7D32] rounded-t hover:bg-[#D4AF37] cursor-pointer transition-all duration-300 relative"
                          >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                          </div>
                          <span className="text-[10px] text-stone-400 font-bold mt-2 font-mono uppercase">{item.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Sourcing details table preview */}
                <div className="p-4 bg-stone-950 border border-stone-800 rounded-2xl">
                  <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2.5">Bihar Farmer Unions Cooperatives Sourced:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs leading-relaxed text-stone-400">
                    <div className="p-3 bg-stone-900 rounded-xl">
                      <strong className="block text-stone-200 mb-1">Mithila Organic Union</strong>
                      <span>96 member farms. Located near Darbhanga. Certified USDA Organic Raw crop.</span>
                    </div>
                    <div className="p-3 bg-stone-900 rounded-xl">
                      <strong className="block text-stone-200 mb-1">Kosi Wetland Farmers</strong>
                      <span>124 member growers. Specialized in 4 Suta and 5 Suta uniform baking kernels.</span>
                    </div>
                    <div className="p-3 bg-stone-900 rounded-xl">
                      <strong className="block text-stone-200 mb-1">Madhubani Craft Foxnuts</strong>
                      <span>68 family farms. Exclusively graders of Jumbo 7 Suta colossal pods.</span>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* Orders tab */}
            {activeTab === 'orders' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-serif font-bold text-[#D4AF37] uppercase tracking-wider">Processed & Active Live Orders</h3>
                  <span className="text-xs text-stone-400">Manage order statuses for postal tracking</span>
                </div>

                {orders.length === 0 ? (
                  <div className="p-8 text-center bg-stone-950 border border-stone-800 rounded-2xl text-stone-500">
                    No checkout orders registered yet. Run some purchases!
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    {orders.slice(0).reverse().map((order) => (
                      <div key={order.id} className="p-4 bg-stone-950 border border-stone-800 rounded-2xl space-y-3">
                        <div className="flex flex-wrap justify-between items-center gap-2 border-b border-stone-800 pb-2 text-xs">
                          <div>
                            <span className="text-[#D4AF37] font-bold font-mono">ORDER #{order.id}</span>
                            <span className="text-stone-500 ml-2">[{order.date}]</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${order.paymentStatus === 'Paid' ? 'bg-green-950 text-emerald-400' : 'bg-red-950 text-red-400'}`}>
                              {order.paymentStatus === 'Paid' ? 'PAID' : 'COD UNPAID'}
                            </span>
                            <select
                              value={order.status}
                              onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as any)}
                              className="bg-stone-900 border border-stone-700 text-xs text-white p-1 rounded font-bold cursor-pointer focus:outline-none"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Out for Delivery">Out for Delivery</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                          </div>
                        </div>

                        {/* Customer Information detail */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                          <div>
                            <span className="block text-stone-400 font-bold mb-1">SHIPPING ADDRESS</span>
                            <div className="text-stone-300 space-y-0.5 font-sans">
                              <p className="font-bold text-white">{order.shippingAddress.name}</p>
                              <p>{order.shippingAddress.address}, {order.shippingAddress.city}</p>
                              <p>PINCODE: {order.shippingAddress.pincode}</p>
                              <p>Phone: {order.shippingAddress.phone}</p>
                            </div>
                          </div>

                          <div>
                            <span className="block text-stone-400 font-bold mb-1">BAGGED ITEMS</span>
                            <div className="space-y-1">
                              {order.items.map((item, i) => (
                                <div key={i} className="flex justify-between text-stone-300">
                                  <span>{item.quantity}x {item.product.name} ({item.selectedWeight})</span>
                                  <span className="font-mono text-[#D4AF37]">₹{(item.product.price * item.quantity)}</span>
                                </div>
                              ))}
                              <div className="flex justify-between border-t border-stone-800 pt-1.5 font-bold text-white mt-1">
                                <span>Grand Total Amount</span>
                                <span className="text-[#D4AF37] font-mono">₹{order.totalAmount}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Products tab */}
            {activeTab === 'products' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-serif font-bold text-[#D4AF37] uppercase tracking-wider">Inventory & Size Logs</h3>
                  <span className="text-[10px] text-stone-400 bg-stone-950 px-2 py-1 rounded">Total items: {customProducts.length}</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-stone-300">
                    <thead className="bg-[#111111] text-[#D4AF37] font-serif uppercase tracking-widest text-[10px] border-b border-stone-800">
                      <tr>
                        <th className="p-3">Product Name</th>
                        <th className="p-3">Specs / Grade</th>
                        <th className="p-3">Current Price</th>
                        <th className="p-3">Stock Status Trigger</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-800">
                      {customProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-stone-800/30">
                          <td className="p-3 font-semibold text-white">{p.name}</td>
                          <td className="p-3 font-mono text-stone-400">{p.sutaSize || 'Roasted'}</td>
                          <td className="p-3 font-bold text-[#D4AF37]">₹{p.price}</td>
                          <td className="p-3">
                            <select
                              value={p.stockStatus}
                              onChange={(e) => onUpdateProductStock(p.id, e.target.value as any)}
                              className="bg-stone-900 border border-stone-700 text-xs text-white p-1 rounded font-sans cursor-pointer focus:outline-none"
                            >
                              <option value="In Stock">In Stock</option>
                              <option value="Low Stock">Low Stock</option>
                              <option value="Out of Stock">Out of Stock</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Bulk queries */}
            {activeTab === 'bulk' && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="text-sm font-serif font-bold text-[#D4AF37] uppercase tracking-wider">Dealer & Wholesaler Applications</h3>
                
                {bulkEnquiries.length === 0 ? (
                  <div className="p-8 text-center bg-stone-950 border border-stone-800 rounded-2xl text-stone-500">
                    No wholesale dealer submissions yet. Use the Bulk Form to test.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {bulkEnquiries.slice(0).reverse().map((beq) => (
                      <div key={beq.id} className="p-4 bg-stone-950 border border-stone-800 rounded-2xl relative">
                        <span className={`absolute top-4 right-4 text-[9px] font-bold px-2 py-0.5 rounded uppercase ${beq.status === 'New' ? 'bg-red-950 text-red-400' : 'bg-green-950 text-emerald-400'}`}>
                          {beq.status}
                        </span>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                          <div>
                            <span className="block text-[#D4AF37] font-bold font-mono text-[10px] mb-1">ENQUIRY ID: #{beq.id} ({beq.date})</span>
                            <h4 className="text-sm font-bold text-white mb-0.5">{beq.name}</h4>
                            <p className="text-stone-300 font-medium">Company: {beq.companyName}</p>
                            <p className="text-stone-400 mt-1">Role: <strong className="text-stone-300">{beq.role}</strong> | Target Qty: <strong className="text-stone-300">{beq.quantityRequired}</strong></p>
                            <p className="text-stone-500 font-mono mt-1">Phone: {beq.phone} | Email: {beq.email}</p>
                          </div>

                          <div className="flex flex-col justify-between">
                            <div>
                              <span className="block text-stone-400 font-bold mb-1">CUSTOMER MEMO:</span>
                              <p className="text-stone-300 bg-stone-900 p-2.5 rounded-lg border border-stone-800 font-sans italic">
                                "{beq.message}"
                              </p>
                            </div>

                            {beq.status === 'New' ? (
                              <div className="mt-3">
                                {activeReplyId === beq.id ? (
                                  <div className="space-y-2 mt-2">
                                    <textarea
                                      value={replyText}
                                      onChange={(e) => setReplyText(e.target.value)}
                                      placeholder="Draft premium corporate quotation message (pricing terms, MOQ list, Bihar custom cargo dispatch timelines)..."
                                      className="w-full text-xs p-2 text-white bg-stone-900 border border-stone-700 rounded-lg focus:outline-none focus:border-[#2E7D32]"
                                      rows={2}
                                    />
                                    <div className="flex gap-2">
                                      <button
                                        onClick={() => {
                                          onReplyBulk(beq.id, replyText);
                                          setActiveReplyId(null);
                                          setReplyText('');
                                        }}
                                        className="px-3 py-1.5 bg-[#2E7D32] text-white rounded text-[10px] font-bold cursor-pointer"
                                      >
                                        Send Official Reply
                                      </button>
                                      <button onClick={() => setActiveReplyId(null)} className="px-3 py-1.5 bg-stone-800 text-stone-400 rounded text-[10px] cursor-pointer">
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => {
                                      setActiveReplyId(beq.id);
                                      setReplyText(`Dear ${beq.name}, thank you for registering with Makhana World. For a quantity of ${beq.quantityRequired}, we can offer a special wholesale rate of ₹... per kg dispatch straight from our Bihar warehouses in Darbhanga. Lets schedule a Call.`);
                                    }}
                                    className="px-3 py-1.5 bg-stone-800 text-[#D4AF37] hover:bg-stone-700/50 rounded text-[10px] font-semibold cursor-pointer border border-stone-700 flex items-center gap-1.5 mt-2"
                                  >
                                    <Send className="w-3 h-3" /> Reply with corporate Quotation
                                  </button>
                                )}
                              </div>
                            ) : (
                              <p className="text-[#2E7D32] font-semibold text-[10px] mt-2 block font-mono">
                                ✓ Official Quotation sent. Lead status synchronized with Mailchimp database.
                              </p>
                            )}
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Export queries */}
            {activeTab === 'export' && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="text-sm font-serif font-bold text-[#D4AF37] uppercase tracking-wider">Global Exporters Registry</h3>
                
                {exportEnquiries.length === 0 ? (
                  <div className="p-8 text-center bg-stone-950 border border-stone-800 rounded-2xl text-stone-500">
                    No international export applications yet. Use the Export Portal to register.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {exportEnquiries.slice(0).reverse().map((eeq) => (
                      <div key={eeq.id} className="p-4 bg-stone-950 border border-stone-800 rounded-2xl relative">
                        <span className={`absolute top-4 right-4 text-[9px] font-bold px-2 py-0.5 rounded uppercase ${eeq.status === 'New' ? 'bg-indigo-950 text-indigo-400' : 'bg-green-950 text-emerald-400'}`}>
                          {eeq.status}
                        </span>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                          <div>
                            <span className="block text-[#D4AF37] font-bold font-mono text-[10px] mb-1">EXPORT ID: #{eeq.id} ({eeq.date})</span>
                            <h4 className="text-sm font-bold text-white mb-0.5">{eeq.name}</h4>
                            <p className="text-stone-300 font-medium">Company: {eeq.companyName} | Target Country: <strong className="text-[#D4AF37]">{eeq.country}</strong></p>
                            <p className="text-stone-400 mt-1">Interests: <strong className="text-stone-300">{eeq.interestedProducts.join(', ')}</strong> | Packaging: <strong className="text-stone-300">{eeq.packagingType}</strong></p>
                            <p className="text-stone-500 font-mono mt-1">Cargo Contact: {eeq.phone} | Email: {eeq.email}</p>
                          </div>

                          <div className="flex flex-col justify-between">
                            <div>
                              <span className="block text-stone-400 font-bold mb-1">MEMO FOR PRIVATE LABEL / OEM:</span>
                              <p className="text-stone-300 bg-stone-900 p-2.5 rounded-lg border border-stone-800 font-sans italic">
                                "{eeq.message}"
                              </p>
                            </div>

                            {eeq.status === 'New' ? (
                              <div className="mt-3">
                                {activeReplyId === eeq.id ? (
                                  <div className="space-y-2 mt-2">
                                    <textarea
                                      value={replyText}
                                      onChange={(e) => setReplyText(e.target.value)}
                                      className="w-full text-xs p-2 text-white bg-stone-900 border border-stone-700 rounded-lg focus:outline-none focus:border-[#2E7D32]"
                                      rows={2}
                                    />
                                    <div className="flex gap-2">
                                      <button
                                        onClick={() => {
                                          onReplyExport(eeq.id, replyText);
                                          setActiveReplyId(null);
                                          setReplyText('');
                                        }}
                                        className="px-3 py-1.5 bg-[#2E7D32] text-white rounded text-[10px] font-bold cursor-pointer"
                                      >
                                        Draft Phytosanitary Quote
                                      </button>
                                      <button onClick={() => setActiveReplyId(null)} className="px-3 py-1.5 bg-stone-800 text-stone-400 rounded text-[10px] cursor-pointer">
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => {
                                      setActiveReplyId(eeq.id);
                                      setReplyText(`Dear ${eeq.name}, we confirm readiness to export to ${eeq.country}. Our 40-foot Sea Container carries 8 Metric Tons in multi-wall moisture-proof packing. Under Organic USDA status, we offer...`);
                                    }}
                                    className="px-3 py-1.5 bg-stone-800 text-[#D4AF37] hover:bg-stone-700/50 rounded text-[10px] font-semibold cursor-pointer border border-stone-700 flex items-center gap-1.5 mt-2"
                                  >
                                    <Send className="w-3 h-3" /> phytosanitary & Customs Reply
                                  </button>
                                )}
                              </div>
                            ) : (
                              <p className="text-indigo-400 font-semibold text-[10px] mt-2 block font-mono">
                                ✓ Phytosanitary dispatch document sent to regional customs portal.
                              </p>
                            )}
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Coupons tab */}
            {activeTab === 'coupons' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Create Custom coupon */}
                  <form onSubmit={handleAddCoupon} className="md:col-span-5 p-4 bg-stone-950 border border-stone-800 rounded-2xl space-y-3.5">
                    <span className="block text-xs font-bold text-[#D4AF37] uppercase tracking-wider font-serif">Add Promo Coupon</span>
                    
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-stone-400 mb-1">Coupon Code</label>
                      <input
                        type="text"
                        placeholder="e.g. MONSOON25"
                        value={newCouponCode}
                        onChange={(e) => setNewCouponCode(e.target.value)}
                        className="w-full text-xs p-2 text-white bg-stone-900 border border-stone-700 rounded-lg focus:outline-none focus:border-[#2E7D32]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-stone-400 mb-1">Discount Percentage (%)</label>
                      <input
                        type="number"
                        min="5"
                        max="80"
                        value={newCouponDiscount}
                        onChange={(e) => setNewCouponDiscount(Number(e.target.value))}
                        className="w-full text-xs p-2 text-white bg-stone-900 border border-stone-700 rounded-lg focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-stone-400 mb-1">Description / Condition</label>
                      <input
                        type="text"
                        placeholder="e.g. flat discount for gourmet boxes"
                        value={newCouponDesc}
                        onChange={(e) => setNewCouponDesc(e.target.value)}
                        className="w-full text-xs p-2 text-white bg-stone-900 border border-stone-700 rounded-lg focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full h-10 bg-[#2E7D32] hover:bg-[#2E7D32]/95 text-white rounded-lg text-xs font-bold hover:scale-[1.01] transition-transform cursor-pointer"
                    >
                      ✓ Activate Coupon Code
                    </button>
                  </form>

                  {/* Active list */}
                  <div className="md:col-span-7 space-y-3">
                    <span className="block text-xs font-bold text-stone-400 uppercase tracking-widest font-mono">Active Promotional Coupons</span>
                    {coupons.map((c) => (
                      <div key={c.code} className="p-3 bg-stone-950 border border-stone-800 rounded-xl flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-[#D4AF37] px-2.5 py-0.5 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded">
                              {c.code}
                            </span>
                            <span className="text-xs text-white font-bold">{c.discount}% Off</span>
                          </div>
                          <span className="block text-[10px] text-stone-400 mt-1">{c.desc}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleCoupon(c.code)}
                            className={`px-2 py-1 text-[9px] font-bold rounded cursor-pointer ${c.active ? 'bg-green-950 text-emerald-400 border border-green-800' : 'bg-stone-800 text-stone-400 border border-stone-700'}`}
                          >
                            {c.active ? 'ACTIVE' : 'PAUSED'}
                          </button>
                          <button onClick={() => handleRemoveCoupon(c.code)} className="p-1 rounded bg-stone-900 hover:bg-stone-800 text-red-400 hover:text-red-500 cursor-pointer">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            )}

            {/* Blogs tab */}
            {activeTab === 'blogs' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Create Blog */}
                  <form onSubmit={handleAddBlog} className="md:col-span-5 p-4 bg-stone-950 border border-stone-800 rounded-2xl space-y-3">
                    <span className="block text-xs font-bold text-[#D4AF37] uppercase tracking-wider font-serif">Compose CMS Article</span>
                    
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-stone-400 mb-1">Article Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Nutritional calcium of foxnuts..."
                        value={newBlogTitle}
                        onChange={(e) => setNewBlogTitle(e.target.value)}
                        className="w-full text-xs p-2 text-white bg-stone-900 border border-stone-700 rounded-lg focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-stone-400 mb-1">Tag / Category</label>
                      <input
                        type="text"
                        placeholder="e.g. Recipes, Wellness"
                        value={newBlogTag}
                        onChange={(e) => setNewBlogTag(e.target.value)}
                        className="w-full text-xs p-2 text-white bg-stone-900 border border-stone-700 rounded-lg focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-stone-400 mb-1">Article Body Content</label>
                      <textarea
                        placeholder="Write dynamic wellness advice or recipes here..."
                        value={newBlogContent}
                        onChange={(e) => setNewBlogContent(e.target.value)}
                        className="w-full text-xs p-2 text-white bg-stone-900 border border-stone-700 rounded-lg focus:outline-none"
                        rows={5}
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full h-10 bg-[#2E7D32] hover:bg-[#2E7D32]/95 text-white rounded-lg text-xs font-bold hover:scale-[1.01] transition-transform cursor-pointer"
                    >
                      ✓ Publish to Website Catalog
                    </button>
                  </form>

                  {/* Blogs list */}
                  <div className="md:col-span-7 space-y-3.5">
                    <span className="block text-xs font-bold text-stone-400 uppercase tracking-widest font-mono">Published Articles list</span>
                    {blogsList.map((b) => (
                      <div key={b.id} className="p-3 bg-stone-950 border border-stone-800 rounded-xl">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#D4AF37] line-clamp-1">{b.title}</span>
                          <span className="text-[9px] text-[#2E7D32] font-semibold bg-green-950 border border-green-800 px-2 py-0.5 rounded">
                            {b.tags[0]}
                          </span>
                        </div>
                        <p className="text-[10px] text-stone-400 mt-1 line-clamp-2 leading-relaxed">{b.excerpt}</p>
                        <div className="flex items-center gap-3 text-[9px] text-stone-500 mt-2 font-mono uppercase">
                          <span>By {b.author}</span>
                          <span>|</span>
                          <span>{b.views} views</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
