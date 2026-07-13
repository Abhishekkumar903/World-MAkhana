/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Recipe, BlogArticle } from '../types';

export const CATEGORIES = [
  { id: 'raw', name: 'Raw Makhana', description: 'Sun-dried high-grade raw fox nuts sorted by size', count: 7 },
  { id: 'roasted', name: 'Gourmet Roasted', description: 'Slow-roasted crisp makhana with handpicked flavors', count: 8 },
  { id: 'bulk-export', name: 'Wholesale & Export', description: 'Commercial loads, private label options and heavy packing', count: 2 },
];

export const SPECIALTY_SIZES = [
  { suta: '4 Suta', size: 'Medium (9mm - 11mm)', desc: 'Ideal for everyday cooking, curries, and standard roasting.' },
  { suta: '5 Suta', size: 'Large (11mm - 13mm)', desc: 'Premium uniform size preferred for commercial popping and spices.' },
  { suta: '6 Suta', size: 'Super Large (13mm - 15mm)', desc: 'Selected large sized kernels offering incredible airy crunch.' },
  { suta: '7 Suta (Jumbo)', size: 'Colossal (15mm+)', desc: 'Supreme grade handpicked colossal kernels. Pure visual and culinary gold.' }
];

export const PRODUCTS: Product[] = [
  // --- Raw Makhana ---
  {
    id: 'raw-4-suta',
    name: 'Bihar Selection 4 Suta Raw Makhana',
    category: 'raw',
    subcategory: 'medium-raw',
    description: 'Supreme-quality, hand-sorted 4 Suta grade raw makhana from the wetlands of Mithila, Bihar.',
    fullDescription: 'Hand-harvested by traditional farmers in Mithila, Bihar, our 4 Suta raw makhana represent standard-grade perfection. These white, puffed kernels are sundried, meticulously scrubbed, and graded, ready for custom home roasting or preparation in traditional puddings and curries.',
    mrp: 320,
    price: 249,
    rating: 4.8,
    reviewsCount: 124,
    stockStatus: 'In Stock',
    images: [
      '/assets/images/suta_4_makhana_1781947059850.jpg',
      '/assets/images/raw_makhana_jumbo_1781940261968.jpg'
    ],
    sutaSize: '4 Suta',
    ingredients: ['100% Raw Fox Nuts (Euryale Ferox)'],
    benefits: ['Low glycemic index', 'Rich in natural antioxidants', 'Sourced straight from certified Bihar farmers'],
    nutritionalFacts: {
      calories: '347 kcal',
      protein: '9.7g',
      carbs: '76.9g',
      fat: '0.1g',
      fiber: '14.5g',
      calcium: '60mg',
      iron: '1.4mg'
    },
    weightOptions: ['250g', '500g', '1kg', '5kg'],
    isBestSeller: false,
    isTodayDeal: false
  },
  {
    id: 'raw-5-suta',
    name: 'Mithila Gold 5 Suta Raw Makhana',
    category: 'raw',
    subcategory: 'premium-raw',
    description: 'Premium uniform-sized 5 Suta makhana, optimized for even roasting and crunch.',
    fullDescription: 'Our 5 Suta makhana kernels are selected for their superb visual symmetry and uniform size density. Ideal for roasting brands, gourmet kitchens, and retailers seeking highly consistent crunch, clean sorting, and zero impurities.',
    mrp: 380,
    price: 299,
    rating: 4.9,
    reviewsCount: 198,
    stockStatus: 'In Stock',
    images: [
      '/assets/images/suta_5_makhana_1781947090931.jpg',
      '/assets/images/raw_makhana_jumbo_1781940261968.jpg'
    ],
    sutaSize: '5 Suta',
    ingredients: ['100% Genuine Raw Mithila Fox Nuts'],
    benefits: ['Zero added preservatives', 'Excellent for baking & shallow frying', 'Naturally high in protein and calcium'],
    nutritionalFacts: {
      calories: '350 kcal',
      protein: '10.2g',
      carbs: '77.1g',
      fat: '0.1g',
      fiber: '14.6g',
      calcium: '65mg',
      iron: '1.5mg'
    },
    weightOptions: ['250g', '500g', '1kg', '5kg', '10kg'],
    isBestSeller: true,
    isTodayDeal: false
  },
  {
    id: 'raw-6-suta',
    name: 'Royal Heritage 6 Suta Makhana',
    category: 'raw',
    subcategory: 'organic-raw',
    description: 'Large airy puffed organic kernels, providing unmatched crispness in every bite.',
    fullDescription: 'Royal Heritage 6 Suta is an elite, highly sorted grade of fox nuts. Only 15% of the annual harvest in Bihar qualifies for this specification. Each seed pops into a sprawling, white blossom that absorbs seasonings perfectly while maintaining structural crispness.',
    mrp: 460,
    price: 369,
    rating: 4.9,
    reviewsCount: 86,
    stockStatus: 'In Stock',
    images: [
      '/assets/images/suta_6_makhana_1781947102519.jpg',
      '/assets/images/raw_makhana_jumbo_1781940261968.jpg'
    ],
    sutaSize: '6 Suta',
    ingredients: ['100% Premium Raw Fox Nuts'],
    benefits: ['Super airy texture', 'Superior oil absorption holding spices', 'Agrade diabetic-friendly snack core'],
    nutritionalFacts: {
      calories: '350 kcal',
      protein: '10.5g',
      carbs: '77g',
      fat: '0.1g',
      fiber: '14.8g',
      calcium: '70mg',
      iron: '1.6mg'
    },
    weightOptions: ['250g', '500g', '1kg', '5kg'],
    isBestSeller: false,
    isTodayDeal: true
  },
  {
    id: 'raw-jumbo',
    name: 'Colossal Jumbo Handpicked Makhana',
    category: 'raw',
    subcategory: 'jumbo-raw',
    description: 'Our largest available specification of raw fox nuts. Big, robust, and heavenly.',
    fullDescription: 'Our Colossal Jumbo Makhana is hand-graded in Mithila using traditional sieves to isolate the absolute biggest, dust-free popped lotus seeds. Measuring upwards of 15mm, these offer an exquisite melt-in-your-mouth lightness combined with robust crunch.',
    mrp: 550,
    price: 439,
    rating: 5.0,
    reviewsCount: 142,
    stockStatus: 'Low Stock',
    images: [
      '/assets/images/suta_7_makhana_1781947116055.jpg',
      '/assets/images/raw_makhana_jumbo_1781940261968.jpg'
    ],
    sutaSize: '7 Suta (Jumbo)',
    ingredients: ['100% Organic Giant Fox Nuts'],
    benefits: ['Signature luxury seed size', 'Perfect for direct roasting, baking or premium gifting', 'High magnesium & phosphorus'],
    nutritionalFacts: {
      calories: '352 kcal',
      protein: '10.8g',
      carbs: '77.2g',
      fat: '0.2g',
      fiber: '15.0g',
      calcium: '75mg',
      iron: '1.8mg'
    },
    weightOptions: ['250g', '500g', '1kg', '5kg', '10kg'],
    isBestSeller: true,
    isTodayDeal: false
  },
  {
    id: 'roasted-plain-raw',
    name: 'Slow-Roasted Crisp Plain Makhana',
    category: 'raw',
    subcategory: 'roasted-raw',
    description: 'Crispy oven-baked whole makhana kernels without flavors. Ideal for custom seasoning.',
    fullDescription: 'Perfectly slow-roasted with a minimal drop of healthy oil to trigger premium crunch. This unseasoned plain roasted variant provides a crisp slate for culinary enthusiasts who love creating their own custom home seasoning combinations.',
    mrp: 200,
    price: 159,
    rating: 4.7,
    reviewsCount: 65,
    stockStatus: 'In Stock',
    images: [
      '/assets/images/classic_makhana_pouch_1783860782473.jpg'
    ],
    ingredients: ['Popped Fox Nuts', 'Organic Cold-Pressed Rice Bran Oil (0.5%)'],
    benefits: ['Zero artificial salt or sugar', '100% allergen-free and clean', 'Ultimate dietary versatility'],
    nutritionalFacts: {
      calories: '360 kcal',
      protein: '9.5g',
      carbs: '75.0g',
      fat: '1.2g',
      fiber: '14.0g',
      calcium: '64mg',
      iron: '1.5mg'
    },
    weightOptions: ['150g', '300g', '500g'],
    isBestSeller: false,
    isTodayDeal: false
  },

  // --- Gourmet Flavored roasted ---
  {
    id: 'roasted-peri-peri',
    name: 'Fiery Spicy Peri Peri Gourmet Makhana',
    category: 'roasted',
    subcategory: 'peri-peri',
    description: 'Cracking giant fox nuts coated with real African bird-eye chili, garlic powder, and citrus.',
    fullDescription: 'Our signature hot seller! Slow-convection roasted jumbo makhana seeds misted with organic olive oil and aggressively tossed in an authentic Peri Peri spice mix. Hot, tangy, and absolutely addictive.',
    mrp: 230,
    price: 179,
    rating: 4.9,
    reviewsCount: 322,
    stockStatus: 'In Stock',
    images: [
      '/assets/images/peri_peri_makhana_pouch_1783861321396.jpg'
    ],
    ingredients: ['Popped Fox Nuts', 'Extra Virgin Olive Oil', 'Peri Peri Spice Blend', 'Dehydrated Garlic', 'Lemon Dust'],
    benefits: ['Metabolism boosting capsaicin', 'Rich in plant-based trace minerals', 'No MSG or artificial colors'],
    nutritionalFacts: {
      calories: '405 kcal',
      protein: '8.8g',
      carbs: '71.5g',
      fat: '4.5g',
      fiber: '12.8g',
      calcium: '61mg',
      iron: '1.8mg'
    },
    weightOptions: ['100g', '250g', '500g'],
    isBestSeller: true,
    isTodayDeal: true
  },
  {
    id: 'roasted-cheese',
    name: 'Creamy Cheddar Cheese Gold Makhana',
    category: 'roasted',
    subcategory: 'cheese',
    description: 'Velvety white cheddar coated colossal kernels providing a rich, savory dairy crunch.',
    fullDescription: 'Confectioner-grade slow-baked colossal fox nuts loaded with natural dehydrated white cheddar cheese dust and seasoned with mild cracked pepper. A guilt-free replacement for cheesy popcorn or greasy chips.',
    mrp: 240,
    price: 189,
    rating: 4.9,
    reviewsCount: 245,
    stockStatus: 'In Stock',
    images: [
      '/assets/images/cheese_makhana_pouch_1783861925140.jpg'
    ],
    ingredients: ['Popped Fox Nuts', 'Cold-Pressed Sunflower Oil', 'Natural Cheddar Cheese Powder', 'Sea Salt', 'Yeast Extract'],
    benefits: ['High calcium calcium multiplier', 'Kid-friendly healthy clean snacker', 'Rich in essential amino acids'],
    nutritionalFacts: {
      calories: '418 kcal',
      protein: '11.2g',
      carbs: '69.0g',
      fat: '5.2g',
      fiber: '11.5g',
      calcium: '98mg',
      iron: '1.4mg'
    },
    weightOptions: ['100g', '250g', '500g'],
    isBestSeller: true,
    isTodayDeal: false
  },
  {
    id: 'roasted-cream-onion',
    name: 'Zesty Sour Cream & Onion Makhana',
    category: 'roasted',
    subcategory: 'cream-onion',
    description: 'Cool chives and natural sour cream blended perfectly over crispy slow-roasted kernels.',
    fullDescription: 'Our Sour Cream & Onion Makhana features high-grade organic fox nuts tossed with buttermilk solids, dry sweet onions, and chopped fresh chives. It is smooth, slightly sweet, and tangy, giving you a chip-like experience without the heavy starch load.',
    mrp: 220,
    price: 179,
    rating: 4.7,
    reviewsCount: 112,
    stockStatus: 'In Stock',
    images: [
      '/assets/images/suta_4_makhana_1781947059850.jpg'
    ],
    ingredients: ['Popped Fox Nuts', 'Rice Bran Oil', 'Buttermilk Powder', 'Onion Powder', 'Dehydrated Chives', 'Lactic Acid'],
    benefits: ['Naturally low fat content', 'Great source of healthy dietary fibers', 'Prebiotic-friendly seasonings'],
    nutritionalFacts: {
      calories: '402 kcal',
      protein: '9.2g',
      carbs: '73.0g',
      fat: '4.0g',
      fiber: '12.5g',
      calcium: '72mg',
      iron: '1.6mg'
    },
    weightOptions: ['100g', '250g', '500g'],
    isBestSeller: false,
    isTodayDeal: false
  },
  {
    id: 'roasted-pudina-mint',
    name: 'Gourmet Pudina Mint Herb Makhana',
    category: 'roasted',
    subcategory: 'pudina-mint',
    description: 'Crisp green-coated makhana with fresh field mint leaves, rock salt, and lemon zest.',
    fullDescription: 'Cool, tangy, and incredibly refreshing! Our Gourmet Pudina Mint Makhana is roasted in olive oil and tumbled with high-grade dehydrated garden mint powder, black salt, and a splash of sour lime. A glorious refreshing bite.',
    mrp: 220,
    price: 169,
    rating: 4.8,
    reviewsCount: 142,
    stockStatus: 'In Stock',
    images: [
      '/assets/images/mint_makhana_pouch_1783862500660.jpg'
    ],
    ingredients: ['Popped Fox Nuts', 'Rice Bran Oil', 'Dried Mint Leaves Powder', 'Lemon Peel Powder', 'Black Salt'],
    benefits: ['Aromatic refreshing taste', 'Low-fat high-fiber digestives', 'Rich in natural organic iron'],
    nutritionalFacts: {
      calories: '395 kcal',
      protein: '9.0g',
      carbs: '72.0g',
      fat: '3.8g',
      fiber: '13.0g',
      calcium: '62mg',
      iron: '1.9mg'
    },
    weightOptions: ['100g', '250g', '500g'],
    isBestSeller: true,
    isTodayDeal: false
  },
  {
    id: 'roasted-tomato-tangy',
    name: 'Tangy Tomato Sun-Ripened Makhana',
    category: 'roasted',
    subcategory: 'tomato-tangy',
    description: 'Vibrant sun-ripened tomato solids combined with rich sweet basil and hot spices.',
    fullDescription: 'Our Tangy Tomato makhana is a crowd pleaser. Air-popped large kernels are treated with rich, cold-pressed tomato pulp dust, sweet basil, dry ginger powder, and a hint of raw brown sugarcane juice solids. Tangy, zesty, and juicy in aroma.',
    mrp: 220,
    price: 169,
    rating: 4.8,
    reviewsCount: 154,
    stockStatus: 'In Stock',
    images: [
      '/assets/images/suta_4_makhana_1781947059850.jpg'
    ],
    ingredients: ['Popped Fox Nuts', 'Cold-Pressed Sunflower Oil', 'Tomato Powder', 'Sweet Basil Extract', 'Spices'],
    benefits: ['Rich in lycopene antioxidants', 'Vitamins A & C source', 'Naturally low calories'],
    nutritionalFacts: {
      calories: '398 kcal',
      protein: '8.7g',
      carbs: '74.2g',
      fat: '3.9g',
      fiber: '13.2g',
      calcium: '59mg',
      iron: '1.8mg'
    },
    weightOptions: ['100g', '250g', '500g'],
    isBestSeller: false,
    isTodayDeal: false
  },
  {
    id: 'roasted-black-pepper',
    name: 'Cracked Black Pepper & Sea Salt Makhana',
    category: 'roasted',
    subcategory: 'black-pepper',
    description: 'Crisp whole kernels coated in freshly crushed Malabar black peppercorns and refined sea salt.',
    fullDescription: 'An elegant, minimal recipe showcasing classic spice. Slow-roasted in woodfired ovens and misted with premium cold-pressed olive oil, these kernels are heavily peppered with hand-crushed Malabar black peppercorns and pink sea salt flakes.',
    mrp: 210,
    price: 159,
    rating: 4.9,
    reviewsCount: 167,
    stockStatus: 'In Stock',
    images: [
      '/assets/images/suta_4_makhana_1781947059850.jpg'
    ],
    ingredients: ['Popped Fox Nuts', 'Olive Oil', 'Cracked Black Pepper', 'Sea Salt Flakes', 'Dry Ginger'],
    benefits: ['Supports digestion and fat burning', 'Anti-inflammatory pepper piperine', 'Zero processed synthetic chemicals'],
    nutritionalFacts: {
      calories: '388 kcal',
      protein: '9.4g',
      carbs: '74.0g',
      fat: '3.1g',
      fiber: '14.1g',
      calcium: '65mg',
      iron: '1.7mg'
    },
    weightOptions: ['100g', '250g', '500g'],
    isBestSeller: false,
    isTodayDeal: false
  },
  {
    id: 'roasted-pink-salt',
    name: 'Himalayan Pink Salt Slow-Baked Makhana',
    category: 'roasted',
    subcategory: 'pink-salt',
    description: 'Pure colossal makhana gently roasted in healthy olive oil and sprinkled with organic pink salt.',
    fullDescription: 'Simplicity meets purity. Premium 6 Suta fox nuts roasted in cold-pressed virgin olive oil and seasoned strictly with premium unrefined Himalayan pink salt crystals. Highly mineralized, low-sodium, and completely clean.',
    mrp: 190,
    price: 149,
    rating: 4.9,
    reviewsCount: 202,
    stockStatus: 'In Stock',
    images: [
      '/assets/images/himalayan_makhana_pouch_1783861060681.jpg'
    ],
    ingredients: ['Popped Fox Nuts', 'Virgin Olive Oil (1.5%)', 'Himalayan Pink Salt Crystals'],
    benefits: ['Extremely low sodium mineralized profile', 'Perfect keto and diabetic breakfast snack', 'Clean detox diet snacker'],
    nutritionalFacts: {
      calories: '378 kcal',
      protein: '9.6g',
      carbs: '74.5g',
      fat: '2.5g',
      fiber: '14.5g',
      calcium: '68mg',
      iron: '1.6mg'
    },
    weightOptions: ['100g', '250g', '500g'],
    isBestSeller: true,
    isTodayDeal: false
  },
  {
    id: 'roasted-chilli-garlic',
    name: 'Spiced Chilli Garlic Convection Makhana',
    category: 'roasted',
    subcategory: 'chilli-garlic',
    description: 'Spicy roasted fox nuts treated with raw crushed garlic essence and red Guntur chili powder.',
    fullDescription: 'A bold, garlic-rich recipe. Giant makhana seeds are baked dry and misted with chili-infused oil, then tossed in an aromatic blend of roasted garlic cloves powder and dried red chili flakes. Warm, savory, and extremely aromatic.',
    mrp: 230,
    price: 179,
    rating: 4.8,
    reviewsCount: 119,
    stockStatus: 'In Stock',
    images: [
      '/assets/images/suta_6_makhana_1781947102519.jpg'
    ],
    ingredients: ['Popped Fox Nuts', 'Rice Bran Oil', 'Roasted Garlic Powder', 'Guntur Red Chilli', 'Onion Dust', 'Chaat Masala'],
    benefits: ['Garlic allicin cardiac booster', 'Immune supportive spices', 'Low carbohydrate snacking'],
    nutritionalFacts: {
      calories: '408 kcal',
      protein: '9.0g',
      carbs: '71.9g',
      fat: '4.8g',
      fiber: '12.4g',
      calcium: '60mg',
      iron: '1.9mg'
    },
    weightOptions: ['100g', '250g', '500g'],
    isBestSeller: false,
    isTodayDeal: false
  },
  {
    id: 'roasted-barbecue',
    name: 'Smoky Barbecue Roasted Crunch Makhana',
    category: 'roasted',
    subcategory: 'barbecue',
    description: 'Crispy whole makhana coated in a sweet, smoky, and wood-fired BBQ spice seasoning.',
    fullDescription: 'Bring on the cookout vibes! Our Smoky Barbecue Makhana is seasoned with a proprietary sweet and smokey barbecue rub, blending dry honey solids, smoked paprika, onion pulp dust, and a mild natural applewood smoke aroma.',
    mrp: 240,
    price: 189,
    rating: 4.7,
    reviewsCount: 98,
    stockStatus: 'In Stock',
    images: [
      '/assets/images/suta_4_makhana_1781947059850.jpg'
    ],
    ingredients: ['Popped Fox Nuts', 'Olive Oil', 'Smoked Paprika', 'BBQ Seasoning', 'Honey Solids', 'Natural Smoke Flavor'],
    benefits: ['Unique savory-sweet profile', '100% cholesterol-free', 'Rich in phosphorus and magnesium'],
    nutritionalFacts: {
      calories: '412 kcal',
      protein: '8.9g',
      carbs: '72.8g',
      fat: '4.2g',
      fiber: '12.0g',
      calcium: '58mg',
      iron: '1.7mg'
    },
    weightOptions: ['100g', '250g', '500g'],
    isBestSeller: false,
    isTodayDeal: false
  },
  {
    id: 'roasted-masala-mix',
    name: 'Traditional Spicy Masala Mix Makhana',
    category: 'roasted',
    subcategory: 'masala-mix',
    description: 'An authentic street-style Indian spice mix featuring cumin, coriander, mango powder, and clove.',
    fullDescription: 'The classic Indian snack reinvented. We coat massive crispy fox nuts in an authentic roasted garam masala spice blend, balanced with amchur (dry mango powder) for a mouthwatering sour punch and a pinch of black mineral rock salt.',
    mrp: 210,
    price: 169,
    rating: 4.9,
    reviewsCount: 289,
    stockStatus: 'In Stock',
    images: [
      '/assets/images/suta_4_makhana_1781947059850.jpg'
    ],
    ingredients: ['Popped Fox Nuts', 'A2 Cow Ghee (0.8%)', 'Spicy Masala Seasoning (Amchur, Cumin, Clove, Cardamom, Salt)'],
    benefits: ['Boosts metabolic thermogenesis', 'Satiating classic street-style flavor', 'Rich in natural antioxidants'],
    nutritionalFacts: {
      calories: '399 kcal',
      protein: '9.3g',
      carbs: '73.4g',
      fat: '3.6g',
      fiber: '13.5g',
      calcium: '63mg',
      iron: '1.9mg'
    },
    weightOptions: ['100g', '250g', '500g', '1kg'],
    isBestSeller: true,
    isTodayDeal: false
  },
  {
    id: 'roasted-combo-pack',
    name: 'Premium Combo Pack (4 x 100g)',
    category: 'roasted',
    subcategory: 'masala-mix',
    description: 'A luxurious assortment of our finest gourmet roasted makhana flavors: Peri Peri, Cheddar Cheese, Pudina Mint, and Himalayan Pink Salt.',
    fullDescription: 'Experience the ultimate tasting journey with our Premium Combo Pack. Contains four individually fresh-sealed 100g pouches of our most loved variants: Fiery Spicy Peri Peri, Creamy Cheddar Cheese, Gourmet Pudina Mint, and Himalayan Pink Salt. Perfect for family snacking, fitness enthusiasts, and elegant gifting.',
    mrp: 999,
    price: 799,
    rating: 4.9,
    reviewsCount: 382,
    stockStatus: 'In Stock',
    images: [
      '/assets/images/combo_makhana_pouch_1783862785114.jpg'
    ],
    sutaSize: 'Combo Pack',
    ingredients: ['Genuine Popped Fox Nuts', 'Extra Virgin Olive Oil', 'Buttermilk solids', 'Real Spices & Seasonings'],
    benefits: ['Four distinct gourmet flavors in one pack', 'Freshness-sealed individual packs', 'Ideal gift option for health-conscious loved ones'],
    nutritionalFacts: {
      calories: '408 kcal',
      protein: '10.1g',
      carbs: '71.5g',
      fat: '4.2g',
      fiber: '12.8g',
      calcium: '82mg',
      iron: '1.7mg'
    },
    weightOptions: ['4 x 100g Pack'],
    isBestSeller: true,
    isTodayDeal: true
  },

  // --- Bulk Packs ---
  {
    id: 'bulk-commercial-6-suta',
    name: 'Wholesale Standard Commercial Load 6 Suta',
    category: 'bulk-export',
    subcategory: 'organic-raw',
    description: 'Bulk packed 6 Suta raw makhana inside multi-layer export moisture-proof woven sacks.',
    fullDescription: 'A wholesale-first product designed for food processors, bulk packers, global importers, and private labels. Includes high purity, machine-cleaned, moisture-tested 6 Suta raw makhana seeds packed in 5kg or 10kg heavy-duty woven polypropylene bags to retain freshness under long journeys.',
    mrp: 4200,
    price: 3350,
    rating: 4.9,
    reviewsCount: 42,
    stockStatus: 'In Stock',
    images: [
      '/assets/images/makhana_export_warehouse_1781940369377.jpg'
    ],
    sutaSize: '6 Suta Bulk',
    ingredients: ['100% Pure Raw Popped Lotus Seeds'],
    benefits: ['Meets international export moisture limits (<7%)', 'FSSAI and Phytosanitary certified loads', 'Direct warehouse rate from Bihar farmer unions'],
    nutritionalFacts: {
      calories: '350 kcal',
      protein: '10.5g',
      carbs: '77g',
      fat: '0.1g',
      fiber: '14.8g',
      calcium: '70mg',
      iron: '1.6mg'
    },
    weightOptions: ['5kg Bag', '10kg Sack', '50kg Bulk Pack'],
    isBestSeller: false,
    isTodayDeal: false
  }
];

export const RECIPES: Recipe[] = [
  {
    id: 'kheer',
    name: 'Royal Makhana Kheer (Sweet Pudding)',
    image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?q=80&w=600&auto=format&fit=crop',
    time: '25 Mins',
    difficulty: 'Easy',
    servings: 4,
    category: 'Sweet',
    description: 'A luxurious traditional sweet pudding made in Bihar with slow-reduced full-cream milk, roasted makhana blossoms, crushed green cardamoms, and saffron fibers.',
    ingredients: [
      '2 cups Makhana (5 Suta or Jumbo)',
      '1 liter Full-fat Organic Milk',
      '4 tbsp Organic Khandsari Sugar or Jaggery',
      '10-12 Almonds & Pistachios (slivered)',
      '8-10 Saffron strands (Kesar)',
      '1/2 tsp Green Cardamom powder',
      '1 tbsp A2 Cow Ghee (clariﬁed butter)'
    ],
    steps: [
      'Heat the ghee in a heavy-bottomed pan. Add the makhana kernels and slow-roast on low flame for 5-6 minutes until crisp. Take them out. Coarsely crush half of them with a rolling pin and keep the rest whole.',
      'In the same pan, boil milk and let it simmer on low-medium flame for 12-15 minutes until it reduces to about 2/3 of its original volume, stirring frequently.',
      'Add both the crushed and whole roasted makhana along with saffron strands into the simmering milk. Cook for another 8-10 minutes until the milk gets creamy and the makhana is beautifully tender.',
      'Stir in sugar and cardamom powder. Let it boil for 2 more minutes until sugar is fully dissolved.',
      'Garnish generously with slivered almonds and pistachios. Serve hot or chilled in classic earthenware bowls for authentic Mithila heritage feel.'
    ]
  },
  {
    id: 'roasted-basic',
    name: 'Perfect Everyday Crispy Roasted Makhana',
    image: '/assets/images/roasted_makhana_golden_1781940274693.jpg',
    time: '10 Mins',
    difficulty: 'Easy',
    servings: 2,
    category: 'Snack',
    description: 'The masterclass recipe for simple crunch. Learn the exact dry-roasting guidelines to yield uniform interior crispness without burning the delicate outer skin.',
    ingredients: [
      '3 cups Raw Makhana (any Suta size)',
      '1 tbsp Cold-Pressed Coconut Oil or Ghee',
      '1/2 tsp Haldi (Turmeric powder)',
      '1/2 tsp Black pepper powder',
      '1/2 tsp Pink Salt or Chaat Masala'
    ],
    steps: [
      'Preheat a wide, heavy cast-iron kadhai or pan on tiny flame for 2 minutes.',
      'Add the raw makhana into the dry pan. Roast continuously for 7-8 minutes on a steady low flame. Constant tossing is vital to avoid local hotspots.',
      'To test: Pick a kernel and press between your fingers. It should pop with a crisp sound and shatter easily into crumbs. If it is soft or chewy, roast for 2 more minutes.',
      'Drizzle ghee/coconut oil over the hot toasted kernels, immediately turn off the flame.',
      'Sprinkle turmeric powder, black pepper, and chaat masala. Toss vigorously. The residual heat will cook the spices and fix them to the oily coats of the seeds.',
      'Store in an airtight glass jar for up to 3 weeks of crispy goodness.'
    ]
  },
  {
    id: 'protein-bowl',
    name: 'Sprouted Moong & Roasted Makhana Protein Bowl',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=600&auto=format&fit=crop',
    time: '15 Mins',
    difficulty: 'Easy',
    servings: 2,
    category: 'Bowl',
    description: 'A highly alkaline, fiber-rich lunch salad pairing freshly sprouted mung beans with high-protein roasted makhana, juicy cherry tomatoes and zesty lemon-coriander dressing.',
    ingredients: [
      '1 cup Sprouted Green Gram (Moong)',
      '1 cup Crispy Roasted Salted Makhana',
      '1/2 cup Finely chopped Cucumber & Tomato',
      '1/4 cup Grated organic Carrots',
      '1 tbsp Fresh mint-coriander chutney',
      '1 tbsp Lemon juice',
      'A pinch of Black Salt & Roasted cumin powder'
    ],
    steps: [
      'In a wide mixing bowl, toss the sprouted green moong beans, carrot, cucumber, and tomato together.',
      'Add the mint-coriander chutney, lemon juice, roasted cumin powder, and black salt. Toss until the vegetables are glazed beautifully.',
      'Just before serving, fold in the crispy roasted makhana kernels. (Folding at the very end ensures the makhana remains delightfully crunchy rather than soggy).',
      'Serve as a detoxifying breakfast or midday work snack to spur high-energy focus.'
    ]
  }
];

export const BLOGS: BlogArticle[] = [
  {
    id: 'superfood-science',
    title: 'The Superfood Science of Fox Nuts (Makhana): Nutritional Breakdown',
    excerpt: 'Why nutritionists worldwide are calling Makhana the unmatched ancient snack of the 21st century. Discover its glycemic, cardiac, and mineral benefits.',
    content: 'For centuries, makhana (fox nuts or lotus seeds) have been harvested from the wetlands of Bihar, India. But what once was a humble local treat has risen to global prominence. Science now confirms what ancient Ayurveda holds: fox nuts are a dietary powerhouse.\n\n### High Protein & Low Calorie Satiety\nCompared to commercial snacks like potato chips, air-popped popcorn, or fried grains, makhana provides high protein content (nearly 10g per 100g) while containing minimal fat. A single cup of makhana contains about 80 calories, making it a stellar snack to manage mid-day cravings on strict calorie-budget diets.\n\n### Low Glycemic Index & Low Sodium\nMakhana is an excellent food for diabetic patients. With a low glycemic index (GI), it slowly releases carbohydrates as glucose into the bloodstream, avoiding insulin spikes. Furthermore, they contain high magnesium (which improves oxygen flow and cardiovascular performance) and very low sodium, perfect to regulate blood pressure values.\n\n### Anti-Aging Flavonoids\nFox nuts contain kaempferol, a powerful natural flavonoid that exhibits robust anti-inflammatory and anti-aging properties. Regular consumption aids in cell repair and blocks free radical cellular oxidation.',
    image: '/assets/images/makhana_sorting_quality_1781940352972.jpg',
    author: 'Dr. Shruti Jha, Chief Clinical Nutritionist',
    date: 'June 12, 2026',
    readTime: '6 min read',
    tags: ['Nutrition', 'Diabetes Friendly', 'Fitness'],
    views: 489
  },
  {
    id: 'bihar-farming-journey',
    title: 'From Muddy Ponds to Premium Jars: The Ancient Mithila Harvest',
    excerpt: 'Trace the incredible manual labor, ecological resilience, and wood-fired thermal cracking that brings Makhana from Bihar to global dining tables.',
    content: 'Nearly 90% of the world’s makhana crop originates from Bihar, specifically the Mithila region. The journey of these white crispy seeds is one of the most labor-intensive agricultural processes on Earth, relying on traditional skills passed down through generations.\n\n### Harvesting Under the Water\nThe seeds of Euryale Ferox (the purple-blossoming fox lotus) grow at the muddy bottom of deep marshy ponds. In October, skilled harvesters wade into chest-deep waters, sweep the floor with bamboo screens (called "Gaanj"), and gather the dark, gravel-like seeds from the silt.\n\n### The Sun Drying & Grade Sorting\nOnce gathered, the black seeds are scrubbed thoroughly to wash off the slimy outer mud layers. They are sun-dried on traditional jute bags. The dried seeds are then manually graded through iron sieves—sorting them into "Sutas" (1 to 7) based on size density.\n\n### The Thermal Climax: Roasting and Wooden Cracking\nTo pop the seeds, they are roasted in dry earthen pots over manual wood fires in batches. When heated to a strict thermal temperature, the hard black shell is placed on a wooden board and struck with a heavy wooden mallet ("Thapi"). Instantly, the kernel pops open with a gunshot sound, shedding its black hull and transforming into a snowy-white, airy puffed makhana shell. This is immediately bagged to prevent moisture re-absorption. At Farmingo Nuts, we buy directly from these farmers, guaranteeing clean fair-wage income and pure organic crop standards.',
    image: '/assets/images/makhana_pond_harvest_1781940339830.jpg',
    author: 'Amitabh Mishra, Rural Sourcing Lead',
    date: 'May 28, 2026',
    readTime: '8 min read',
    tags: ['Organic Farming', 'Bihar Heritage', 'Impact'],
    views: 654
  }
];

export const HEALTH_BENEFITS = [
  {
    title: 'Weight Loss Companion',
    icon: 'Flame',
    color: 'from-orange-500 to-red-500',
    description: 'Packed with proteins that stimulate early fullness, helping you cut total daily calorie intake without feeling hungry or exhausted.'
  },
  {
    title: 'Diabetes Management',
    icon: 'Activity',
    color: 'from-emerald-500 to-green-600',
    description: 'An extremely low Glycemic Index (GI) score ensures gradual glucose conversion, preventing sudden blood-sugar spikes.'
  },
  {
    title: 'Bone Suture & Calcium',
    icon: 'Bone',
    color: 'from-cyan-500 to-blue-500',
    description: 'Every serving supplies organic bio-available calcium, essential to sustain joint elasticity, muscle contractions, and skeletal density.'
  },
  {
    title: 'Cardiac Nourishment',
    icon: 'Heart',
    color: 'from-rose-500 to-pink-500',
    description: 'High in cardiac-supportive magnesium and low in sodium, promoting smooth blood flow and stabilizing blood pressure.'
  },
  {
    title: 'Digestive & Anti-Aging',
    icon: 'Sparkles',
    color: 'from-amber-500 to-yellow-600',
    description: 'Enriched with antioxidants like kaempferol that reduce oxidative aging, plus heavy natural fibers that regulate bowel flow.'
  },
  {
    title: 'Pregnancy Companion',
    icon: 'Baby',
    color: 'from-purple-500 to-indigo-500',
    description: 'Natural levels of folate, iron, and crucial amino acids make it a superb gestational snack safe for expectant mothers and infants.'
  }
];

export const FAQS = [
  {
    question: 'What does "Suta" mean in Makhana?',
    answer: 'In the agricultural markets of Bihar, "Suta" is a traditional unit of measurement for the diameter of popped makhana kernels (representing 1/8th of an inch). Higher Suta numbers (like 5 Suta, 6 Suta, or 7 Suta Jumbo) designate larger puffed kernels, which offer more airy crunch, uniform aesthetics, and absorb gourmet flavors beautifully.'
  },
  {
    question: 'How do you dry-roast raw makhana at home?',
    answer: 'Simply place the raw makhana in a dry, heavy pan on slow/low flame. Roast for about 6 to 8 minutes, stirring continuously so they cook evenly throughout. Test a seed by crushing it between your fingers; if it snaps instantly with a crisp crackle into dry powder, it is roasted! Add a tiny splash of ghee or olive oil, turn off the flame, and season with turmeric, salt, or your favorite spices.'
  },
  {
    question: 'Are your Makhana products organic and gluten-free?',
    answer: 'Absolutely. Makhana is naturally gluten-free and non-GMO. Our raw makhana variants are harvested under pesticide-free organic wetland conditions in Mithila, Bihar, without any synthetic bleaching processes. Our roasted variants are slow-baked using clean healthy oils (cold-pressed olive or premium rice bran oil) with natural spices oil sprays and absolutely zero artificial preservatives or MSG.'
  },
  {
    question: 'Do you offer bulk volumes for white label, OEM or export?',
    answer: 'Yes, Farmingo Nuts is an established direct exporter from Bihar. We support wholesale container-load shipping, private label packaging, and custom OEM manufacturing for gourmet brands worldwide. We provide official FSSAI, Phytosanitary, and Organic Certifications for international shipping.'
  }
];

export const CERTIFICATES = [
  { name: 'APEDA Export Registration', body: 'Govt. of India', code: 'AP-57482-BH' },
  { name: 'FSSAI Central License', body: 'Food Safety and Standards India', code: '1042400300184' },
  { name: 'USDA Organic Certification', body: 'OneCert International', code: 'ORG-US-2026-M' },
  { name: 'ISO 22000:2018', body: 'Food Safety Management Systems', code: 'ISO-F-94827' },
  { name: 'Phytosanitary Certification', body: 'Plant Quarantine Org of India', code: 'PQ-9082' }
];

export const TESTIMONIALS = [
  {
    name: 'Sarah Jenkins',
    role: 'Procurement Specialist, Whole Foods LLC (UK)',
    comment: 'The Jumbo 7 Suta Makhana we imported from Makhana World is the cleanest we have ever encountered. Minimal dust, supreme uniform crunch, and robust multi-layer shipping crates that survived marine transit beautifully.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop'
  },
  {
    name: 'Chef Ranveer Varma',
    role: 'Executive Chef, Heritage Bistro',
    comment: 'Makhana World is my only source for raw 5 Suta ingredients. Traditional Bihar recipes like Makhana Kheer require high-density kernels that release starches slowly without disintegrating. This brand is flawless.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=150&auto=format&fit=crop'
  },
  {
    name: 'Neera Bajwa',
    role: 'Fitness Influencer & Mother',
    comment: 'The Cheddar and Peri Peri roasted snacks are lifesavers in my household. My kids love the cheesy flavor, and I love that they are baked in olive oil and contain twice the calcium of standard snacks. We bought the Healthy Snacking combo.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop'
  }
];
