/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  fullDescription: string;
  mrp: number;
  price: number;
  rating: number;
  reviewsCount: number;
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  images: string[];
  videoUrl?: string;
  sutaSize?: string;
  ingredients: string[];
  benefits: string[];
  nutritionalFacts: {
    calories: string; // per 100g
    protein: string;
    carbs: string;
    fat: string;
    fiber: string;
    calcium: string;
    iron: string;
  };
  weightOptions: string[]; // ['100g', '250g', '500g', '1kg']
  isBestSeller?: boolean;
  isTodayDeal?: boolean;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface CartItem {
  product: Product;
  selectedWeight: string;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  totalAmount: number;
  status: 'Pending' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  paymentMethod: string;
  paymentStatus: 'Paid' | 'Pending';
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    pincode: string;
    phone: string;
  };
}

export interface BulkEnquiry {
  id: string;
  name: string;
  companyName: string;
  email: string;
  phone: string;
  role: 'Dealer' | 'Distributor' | 'Retailer' | 'Hotel/Restaurant' | 'Corporate' | 'Other';
  quantityRequired: string;
  message: string;
  date: string;
  status: 'New' | 'Contacted' | 'Replied';
}

export interface ExportEnquiry {
  id: string;
  name: string;
  companyName: string;
  country: string;
  email: string;
  phone: string;
  interestedProducts: string[];
  packagingType: string;
  message: string;
  date: string;
  status: 'New' | 'In Progress' | 'Shipped' | 'Reviewed';
}

export interface Recipe {
  id: string;
  name: string;
  image: string;
  time: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  servings: number;
  category: 'Snack' | 'Sweet' | 'Bowl' | 'Diet';
  description: string;
  ingredients: string[];
  steps: string[];
}

export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  views: number;
}
