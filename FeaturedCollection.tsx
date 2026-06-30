import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ChevronLeft, ChevronRight, ShoppingBag, Search, Heart, HelpCircle, Check, Sparkles, Plus, Minus } from 'lucide-react';
import { Product, CartItem } from '../types';
import DolengaProductDetail from './DolengaProductDetail';

interface DolengaPageProps {
  onBackToHome: () => void;
  onAddToCart: (product: Product, size: string, color: string, colorHex: string) => void;
  onOpenCart: () => void;
  cart: CartItem[];
}

function FAQItem({ num, question, answer }: { num: string; question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-black/5 pb-2 select-none">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left py-4 focus:outline-none cursor-pointer group"
      >
        <div className="flex items-center space-x-4">
          <span className="font-mono text-[10px] text-neutral-400 font-extrabold group-hover:text-black transition-colors">{num}</span>
          <span className="font-sans font-black text-xs md:text-[13px] text-neutral-800 tracking-wider group-hover:text-black transition-colors">{question}</span>
        </div>
        <div className="text-neutral-500 group-hover:text-black transition-colors pr-2">
          {isOpen ? <Minus className="h-3.5 w-3.5 stroke-[2.5]" /> : <Plus className="h-3.5 w-3.5 stroke-[2.5]" />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="font-sans text-[11px] md:text-xs text-neutral-500 pl-8 pb-4 pr-12 leading-relaxed tracking-wide">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Dolenga Specific Products, priced in RUB
export const DOLENGA_PRODUCTS: Product[] = [
  {
    id: 'dolenga-tshirt',
    name: 'OVERSIZED T-SHIRT',
    price: 4500,
    currencySymbol: '₹',
    category: 'T-SHIRTS',
    description: 'Heavyweight cotton knit (320 GSM). Relaxed premium fit, dropped shoulders, thick ribbed collar, durable vintage texture.',
    details: [
      '320 GSM organic combed cotton',
      'Dropped shoulders, spacious silhouette',
      'Heavy ribbed crewneck collar',
      'Colorfast dye retains rich tone after washing',
      'Designed in St. Petersburg'
    ],
    gsm: 320,
    colors: [
      { name: 'CHARCOAL BLACK', hex: '#1C1C1C', class: 'bg-[#1C1C1C]' },
      { name: 'MILK WHITE', hex: '#F9F8F6', class: 'bg-[#F9F8F6]' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    imagePrimary: 'https://i.ibb.co/WN8XTMD1/download-2.jpg',
    imageHover: 'https://i.ibb.co/TM043sFH/download-1.jpg'
  },
  {
    id: 'dolenga-shorts',
    name: 'DOUBLE LOOP SHORTS',
    price: 7000,
    currencySymbol: '₹',
    category: 'SHORTS',
    description: 'Heavy cotton French terry (450 GSM). Elastic drawstring waistband, deep concealed pockets, relaxed fit.',
    details: [
      '450 GSM premium unbrushed French terry',
      'Heavy matching-color adjustable drawstring',
      'Concealed side seams, high-density stitching',
      'Hits slightly above the knee',
      'Architectural oversized silhouette'
    ],
    gsm: 450,
    colors: [
      { name: 'DARK GRAPHITE', hex: '#2E2F30', class: 'bg-[#2E2F30]' },
      { name: 'LIGHT MELANGE', hex: '#D5D5D7', class: 'bg-[#D5D5D7]' }
    ],
    sizes: ['S', 'M', 'L'],
    imagePrimary: 'https://i.ibb.co/LXp1qGPj/Cozy-hoodie-girls-fleece.jpg',
    imageHover: 'https://i.ibb.co/Z6cb3Xg7/download-3.jpg'
  },
  {
    id: 'dolenga-zip',
    name: 'SIGNATURE ZIP HOODIE',
    price: 12000,
    currencySymbol: '₹',
    category: 'ZIP HOODIE',
    description: 'Massive three-thread cotton fleece (500 GSM). Heavyweight double-sided metal zip closure, double-layered deep hood.',
    details: [
      '500 GSM organic heavyweight fleece',
      'Premium Japanese metal YKK hardware',
      'Double-layered rigid hood without drawstrings',
      'Thick elastic ribbed cuffs and hem',
      'Anatomical oversized drape'
    ],
    gsm: 500,
    colors: [
      { name: 'MATTE BLACK', hex: '#111111', class: 'bg-[#111111]' },
      { name: 'AUTUMN GREY', hex: '#7E8082', class: 'bg-[#7E8082]' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    imagePrimary: 'https://i.ibb.co/cKW2gBHH/Calvin-Klein-Black-Cotton-Blend-Fleece-Hoodie-Large-Mens.jpg',
    imageHover: 'https://i.ibb.co/Lzbvny7H/Buy-Calvin-Klein-Black-Monogram-Hoodie-from-the-Next-UK-online-shop.jpg'
  },
  {
    id: 'dolenga-joggers',
    name: 'CLASSIC COTTON JOGGERS',
    price: 9000,
    currencySymbol: '₹',
    category: 'JOGGERS',
    description: 'Heavyweight sweatpants (480 GSM). 100% thick premium cotton, elasticated ankle cuffs, deep warm hand pockets.',
    details: [
      '480 GSM premium super-soft cotton',
      'Wide waistband with flat internal drawstring',
      'Deep angled side-seam pockets',
      'Soft elasticated cuffs at ankles',
      'Designed to pair perfectly with our hoodie'
    ],
    gsm: 480,
    colors: [
      { name: 'ANTHRACITE', hex: '#1D1E1F', class: 'bg-[#1D1E1F]' },
      { name: 'ASH GREY', hex: '#ACAEB1', class: 'bg-[#ACAEB1]' }
    ],
    sizes: ['M', 'L', 'XL'],
    imagePrimary: 'https://i.ibb.co/RTY1dkgS/MANCHETTE-LIGHT-GREY-MELANGE-HOODIE-XXL.jpg',
    imageHover: 'https://i.ibb.co/JWYssHns/Men-s-Casual-Minimalist-Solid-Color-Kangaroo-Pocket-Drawstring-Hoodie-Suitable-For-Daily-Commute-A.jpg'
  }
];

export default function DolengaPage({ onBackToHome, onAddToCart, onOpenCart, cart }: DolengaPageProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [sizeSelectorOpenPid, setSizeSelectorOpenPid] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<{ [pid: string]: string }>({});
  const [selectedColor, setSelectedColor] = useState<{ [pid: string]: any }>({});
  const [carouselIndex, setCarouselIndex] = useState(0);

  const bestsellersRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const clientRef = useRef<HTMLDivElement>(null);

  const handleCategoryClick = (category: string) => {
    const matched = DOLENGA_PRODUCTS.find(p => p.category === category);
    if (matched) {
      setSelectedProduct(matched);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      scrollTo(bestsellersRef);
    }
  };

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      const element = ref.current;
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const categoriesLeft = [
    'T-SHIRTS',
    'HOODIES',
    'ZIP HOODIES',
    'SWEATSHIRTS',
    'BOMBERS',
    'WINDBREAKERS',
    'ANORAKS'
  ];

  const categoriesRight = [
    'JOGGERS',
    'SHORTS',
    'UNDERWEAR',
    'SOCKS',
    'CAPS'
  ];

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddWithDetails = (product: Product) => {
    const size = selectedSize[product.id] || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'M');
    const colorObj = selectedColor[product.id] || (product.colors && product.colors.length > 0 ? product.colors[0] : { name: "CHARCOAL BLACK", hex: "#1E1E1E", class: "bg-[#1E1E1E]" });
    onAddToCart(product, size, colorObj.name, colorObj.hex);
    
    // Quick success animation check
    setSizeSelectorOpenPid(null);
  };

  return (
    <div className="bg-[#FAF9F7] text-neutral-900 min-h-screen font-sans selection:bg-neutral-900 selection:text-white pb-20">
      
      {/* LOCAL HEADER - DOLENGA STYLE */}
      <header className="sticky top-0 z-50 bg-white/95 border-b border-black/5 py-4 backdrop-blur-md px-6 md:px-12 select-none">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Logo / Brand Name */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onBackToHome}
              className="group flex items-center space-x-1.5 text-[10px] uppercase font-mono text-neutral-400 hover:text-black transition-colors cursor-pointer border border-neutral-200/60 hover:border-black/20 px-2 py-1 rounded-full"
            >
              <ArrowLeft className="h-3 w-3 group-hover:-translate-x-0.5 transition-transform" />
              <span>SOCIETY</span>
            </button>
            <span className="font-sans font-black text-xl tracking-[0.2em] text-neutral-900 pl-2">
              DOLENGA
            </span>
          </div>

          {/* Central Nav Links matching exact mockup */}
          <nav className="hidden md:flex items-center space-x-12 text-[11px] font-bold tracking-[0.2em] uppercase text-neutral-500">
            <button 
              onClick={() => scrollTo(bestsellersRef)} 
              className="hover:text-black transition-colors cursor-pointer"
            >
              CATALOGUE
            </button>
            <button 
              onClick={() => scrollTo(aboutRef)} 
              className="hover:text-black transition-colors cursor-pointer"
            >
              ABOUT
            </button>
            <button 
              onClick={() => scrollTo(clientRef)} 
              className="hover:text-black transition-colors cursor-pointer"
            >
              CLIENT CARE
            </button>
            <button 
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })} 
              className="hover:text-black transition-colors cursor-pointer"
            >
              CONTACT
            </button>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-6">
            <button className="text-neutral-500 hover:text-black hover:scale-105 transition-all p-1" aria-label="Search">
              <Search className="h-4.5 w-4.5" />
            </button>
            <button className="text-neutral-500 hover:text-red-500 hover:scale-105 transition-all p-1 hidden sm:block" aria-label="Wishlist">
              <Heart className="h-4.5 w-4.5" />
            </button>
            <button
              onClick={onOpenCart}
              className="relative text-neutral-900 hover:scale-105 transition-all p-1 flex items-center cursor-pointer"
              aria-label="Bag"
            >
              <ShoppingBag className="h-4.5 w-4.5" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 h-3.5 w-3.5 bg-neutral-900 text-[8px] font-bold text-white rounded-full flex items-center justify-center">
                  {totalCartItems}
                </span>
              )}
            </button>
          </div>

        </div>
      </header>

      {selectedProduct ? (
        <DolengaProductDetail
          product={selectedProduct}
          onAddToCart={onAddToCart}
          onBack={() => {
            setSelectedProduct(null);
            window.scrollTo({ top: 300, behavior: 'instant' });
          }}
          allProducts={DOLENGA_PRODUCTS}
          onSelectProduct={setSelectedProduct}
        />
      ) : (
        <>
          {/* HERO SECTION / FIRST FOLD */}
          <section className="bg-[#EDEDEA] min-h-[750px] w-full flex flex-col justify-between py-12 md:py-20 overflow-hidden relative">
        <div className="max-w-6xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full relative z-10">
          
          {/* Hero Left Content Column */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-8 select-none order-2 lg:order-1 pt-6 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-2"
            >
              <div className="inline-flex items-center space-x-2 bg-neutral-200/80 text-neutral-800 text-[10px] tracking-wider font-mono px-3 py-1 rounded-full uppercase">
                <Sparkles className="h-3 w-3 text-neutral-900 animate-pulse" />
                <span>NEW ARRIVALS / LIMITED RELEASE</span>
              </div>
              <h1 className="font-sans font-black text-5xl md:text-7xl lg:text-8xl tracking-tight text-neutral-900 uppercase leading-[0.9]">
                DOLENGA <br />
                <span className="text-neutral-500 font-extrabold text-4xl md:text-6xl lg:text-7xl">WEAR</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-sm text-neutral-500 md:text-base tracking-wide max-w-sm leading-relaxed"
            >
              Functional apparel designed for an active lifestyle. A cohesive blend of comfortable cuts, uncompromising hardware trims, and the raw street essence of St. Petersburg.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex items-center space-x-4"
            >
              <button
                onClick={() => scrollTo(bestsellersRef)}
                className="bg-neutral-950 text-white font-semibold text-[11px] tracking-[0.25em] uppercase px-10 py-4 rounded-full hover:bg-neutral-800 transition-all cursor-pointer shadow-md hover:shadow-lg active:scale-[0.98]"
              >
                CATALOGUE
              </button>
              <button
                onClick={() => scrollTo(categoriesRef)}
                className="border border-neutral-300 hover:border-black text-[11px] font-semibold tracking-[0.2em] text-neutral-700 hover:text-black px-8 py-4 rounded-full transition-all cursor-pointer"
              >
                ABOUT BRAND
              </button>
            </motion.div>
          </div>

          {/* Hero Right Model Column */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[450px] aspect-[2/3] md:max-w-[480px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white group"
            >
              <img
                src="/src/assets/images/dolenga_hero_model_1782216007817.jpg"
                alt="Dolenga wear minimal sports lookbook grey tracksuit"
                className="object-cover w-full h-full transform group-hover:scale-[1.03] transition-transform duration-1000"
              />
              {/* Premium Floating Badge */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm border border-neutral-200 py-2.5 px-4 rounded-xl shadow-lg text-right select-none">
                <span className="block text-[8px] font-mono tracking-widest text-neutral-400 uppercase">
                  SILHOUETTE / LINEAGE
                </span>
                <span className="block text-xs font-bold font-sans text-neutral-950 uppercase tracking-tight mt-0.5">
                  LEVEL 01 RECORD
                </span>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Ambient Subtle Logo in Background */}
        <div className="absolute bottom-4 left-6 md:left-12 text-[70px] md:text-[140px] font-black tracking-tighter text-black/[0.03] select-none uppercase font-sans leading-none pointer-events-none w-full text-center lg:text-left">
          ESTABLISHED 2023
        </div>
      </section>

      {/* LOOKBOOK SPLIT CATEGORIES SECTION */}
      <section
        ref={categoriesRef}
        id="col-section"
        className="relative w-full bg-[#111111] text-white py-24 px-6 md:px-12 overflow-hidden selection:bg-white selection:text-black"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full relative z-10 w-full">
          
          {/* Categories List LEFT (ФУТБОЛКИ, ХУДИ, etc) */}
          <div className="lg:col-span-3 flex flex-col space-y-6 text-center lg:text-right select-none order-2 lg:order-1">
            {categoriesLeft.map((cat) => (
              <motion.button
                key={cat}
                onMouseEnter={() => setHoveredCategory(cat)}
                onMouseLeave={() => setHoveredCategory(null)}
                onClick={() => handleCategoryClick(cat)}
                className="group relative focus:outline-none block py-1 cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <span className={`font-sans tracking-widest font-extrabold text-sm md:text-base md:tracking-[0.2em] transition-all duration-300 ${
                  hoveredCategory === cat ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
                }`}>
                  {cat}
                </span>
                {hoveredCategory === cat && (
                  <motion.div
                    layoutId="underlineLeft"
                    className="absolute bottom-0 right-0 left-0 lg:left-auto h-[1px] bg-white w-1/4 mx-auto lg:mx-0 lg:w-1/3"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Model Banner Center (ЛЕТНЯЯ КОЛЛЕКЦИЯ 2023) */}
          <div className="lg:col-span-6 flex justify-center order-1 lg:order-2 h-full py-4 lg:py-0">
            <motion.div
              className="relative w-full max-w-[620px] aspect-[16/10] md:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group bg-neutral-900"
            >
              <img
                src="/src/assets/images/dolenga_lookbook_banner_1782216028185.jpg"
                alt="Summer Collection"
                className={`object-cover w-full h-full transition-all duration-1000 transform group-hover:scale-105 ${
                  hoveredCategory ? 'blur-[1px] brightness-75' : 'brightness-90'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-center p-6 text-center select-none">
                <motion.span
                  animate={hoveredCategory ? { scale: 0.98, opacity: 0.7 } : { scale: 1, opacity: 1 }}
                  className="text-[10px] font-mono tracking-[0.35em] text-neutral-300 uppercase"
                >
                  LOOKBOOK CAMPAIGN
                </motion.span>
                <h3 className="font-sans font-black text-2xl sm:text-4xl text-white tracking-widest uppercase mt-2 drop-shadow-md">
                  SUMMER COLLECTION
                </h3>
                <span className="font-mono text-xs sm:text-sm text-neutral-300 uppercase tracking-[0.5em] mt-1.5 font-bold">
                  2023
                </span>
              </div>
            </motion.div>
          </div>

          {/* Categories List RIGHT (ДЖОГГЕРЫ, ШОРТЫ, etc) */}
          <div className="lg:col-span-3 flex flex-col space-y-6 text-center lg:text-left select-none order-3">
            {categoriesRight.map((cat) => (
              <motion.button
                key={cat}
                onMouseEnter={() => setHoveredCategory(cat)}
                onMouseLeave={() => setHoveredCategory(null)}
                onClick={() => handleCategoryClick(cat)}
                className="group relative focus:outline-none block py-1 cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <span className={`font-sans tracking-widest font-extrabold text-sm md:text-base md:tracking-[0.2em] transition-all duration-300 ${
                  hoveredCategory === cat ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
                }`}>
                  {cat}
                </span>
                {hoveredCategory === cat && (
                  <motion.div
                    layoutId="underlineRight"
                    className="absolute bottom-0 left-0 right-0 lg:right-auto h-[1px] bg-white w-1/4 mx-auto lg:mx-0 lg:w-1/3"
                  />
                )}
              </motion.button>
            ))}
          </div>

        </div>
      </section>

      {/* BESTSELLERS CAROUSEL SECTION / БЕСТСЕЛЛЕРЫ */}
      <section
        ref={bestsellersRef}
        className="max-w-6xl mx-auto px-6 md:px-12 pt-24 pb-16 select-none relative"
      >
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-black/10 pb-5 mb-10">
          <div>
            <span className="text-[9px] font-mono tracking-[0.3em] text-neutral-400 uppercase">
              TOP SELLERS / BESTSELLERS
            </span>
            <h2 className="font-sans font-black text-2xl md:text-3.5xl tracking-tight text-neutral-900 uppercase">
              BESTSELLERS
            </h2>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* IN CATALOG PILL BUTTON - MATCHES MOCKUP EXACTLY */}
            <button
              onClick={() => scrollTo(categoriesRef)}
              className="border border-neutral-800 text-[10px] font-extrabold tracking-[0.2em] text-neutral-900 hover:bg-neutral-950 hover:text-white px-5 py-2.5 rounded-full transition-all cursor-pointer uppercase h-9 flex items-center justify-center font-sans"
            >
              CATALOGUE
            </button>
          </div>
        </div>

        {/* Carousel Grid with Outer Absolute Navigation Arrows */}
        <div className="relative w-full">
          
          {/* Left Arrow Caret - Matches Mockup Position */}
          <button
            onClick={() => setCarouselIndex((prev) => Math.max(0, prev - 1))}
            disabled={carouselIndex === 0}
            className={`absolute -left-5 md:-left-10 top-1/2 -translate-y-1/2 z-30 h-10 w-10 flex items-center justify-center transition-all ${
              carouselIndex === 0 
              ? 'text-neutral-300 cursor-not-allowed opacity-30' 
              : 'text-neutral-700 hover:text-black hover:scale-110 cursor-pointer'
            }`}
            aria-label="Previous Slide"
          >
            <ChevronLeft className="h-6 w-6 stroke-[2.5]" />
          </button>

          {/* Right Arrow Caret - Matches Mockup Position */}
          <button
            onClick={() => setCarouselIndex((prev) => Math.min(1, prev + 1))}
            disabled={carouselIndex === 1}
            className={`absolute -right-5 md:-right-10 top-1/2 -translate-y-1/2 z-30 h-10 w-10 flex items-center justify-center transition-all ${
              carouselIndex === 1 
              ? 'text-neutral-300 cursor-not-allowed opacity-30' 
              : 'text-neutral-700 hover:text-black hover:scale-110 cursor-pointer'
            }`}
            aria-label="Next Slide"
          >
            <ChevronRight className="h-6 w-6 stroke-[2.5]" />
          </button>

          {/* Carousel Viewport */}
          <div className="overflow-hidden w-full">
            <motion.div
              animate={{ x: `-${carouselIndex * 25}%` }}
              transition={{ type: 'spring', stiffness: 260, damping: 28 }}
              className="flex gap-6 w-[125%] md:w-[133%]"
            >
              {DOLENGA_PRODUCTS.map((prod) => {
                const currentSize = selectedSize[prod.id] || (prod.sizes && prod.sizes.length > 0 ? prod.sizes[0] : 'M');
                const colorObj = selectedColor[prod.id] || (prod.colors && prod.colors.length > 0 ? prod.colors[0] : { name: "CHARCOAL BLACK", hex: "#1E1E1E", class: "bg-[#1E1E1E]" });
                const isSizeSelectorOpen = sizeSelectorOpenPid === prod.id;

                return (
                  <div
                    key={prod.id}
                    onClick={() => {
                      setSelectedProduct(prod);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-1/4 flex-shrink-0 group flex flex-col justify-between cursor-pointer"
                  >
                    {/* Minimalist Image Stage: Light grey background box with sharp corners & clean margin */}
                    <div className="relative aspect-[4/5] w-full rounded-md overflow-hidden bg-[#EDEDEB] flex-shrink-0">
                      <img
                        src={prod.imagePrimary}
                        alt={prod.name}
                        className="absolute inset-0 object-cover w-full h-full transform group-hover:scale-[1.03] transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <img
                        src={prod.imageHover}
                        alt={prod.name}
                        className="absolute inset-0 object-cover w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                        referrerPolicy="no-referrer"
                      />

                      {/* Micro GSM Indicator */}
                      <span className="absolute top-2.5 left-2.5 bg-black/90 text-white text-[8px] font-mono tracking-widest font-semibold px-2 py-0.5 rounded-xs">
                        {prod.gsm} GSM
                      </span>

                      {/* Interactive Size Selection Overlay (Zara/High-End Style) on Hover */}
                      <div className="absolute inset-x-0 bottom-0 bg-neutral-950/80 backdrop-blur-xs p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex flex-col justify-between z-10">
                        {/* Size labels */}
                        <div className="mb-2">
                          <span className="block text-[8px] font-mono tracking-widest text-neutral-300 uppercase text-center mb-1">
                            SELECT SIZE
                          </span>
                          <div className="flex justify-center gap-1">
                            {prod.sizes.map((s) => (
                              <button
                                key={s}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedSize((prev) => ({ ...prev, [prod.id]: s }));
                                }}
                                className={`h-6 px-2.5 text-[9px] font-mono font-bold border rounded-sm transition-all cursor-pointer ${
                                  currentSize === s
                                    ? 'bg-white border-white text-black'
                                    : 'border-white/20 text-white hover:border-white hover:text-white'
                                }`}
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Add button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddWithDetails(prod);
                          }}
                          className="w-full bg-white text-black py-2.5 text-[9px] font-bold uppercase tracking-[0.15em] rounded-xs hover:bg-neutral-100 transition-colors cursor-pointer"
                        >
                          ADD TO BAG ({currentSize})
                        </button>
                      </div>

                      {/* Floating Color Picker Bubble directly in the image stage */}
                      <div className="absolute top-2.5 right-2.5 flex items-center space-x-1.5 bg-white/70 backdrop-blur-xs p-1.5 rounded-full shadow-xs">
                        {prod.colors.map((c) => (
                          <button
                            key={c.name}
                            onClick={() => setSelectedColor((prev) => ({ ...prev, [prod.id]: c }))}
                            className={`h-2.5 w-2.5 rounded-full border border-black/10 cursor-pointer ${c.class} ${
                              colorObj.name === c.name ? 'ring-1 ring-neutral-900 ring-offset-1 scale-110' : ''
                            }`}
                            title={c.name}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Highly-Spaced Minimal Text Details - MATCHES MOCKUP EXACTLY */}
                    <div className="pt-3.5 pb-2">
                      <div className="flex justify-between items-baseline font-sans">
                        <span className="text-[11px] font-black tracking-[0.15em] text-neutral-950 uppercase">
                          {prod.category}
                        </span>
                        <span className="text-[11px] font-bold text-neutral-900 font-sans tracking-wide">
                          {prod.currencySymbol || '₹'}{prod.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <p className="text-[10px] font-medium tracking-wide text-neutral-500 mt-1 line-clamp-1">
                        {prod.name} (COLOR: {colorObj.name})
                      </p>
                    </div>

                  </div>
                );
              })}
            </motion.div>
          </div>

        </div>
      </section>

      {/* BRAND CONCEPT / О БРЕНДЕ */}
      <section
        ref={aboutRef}
        className="w-full bg-[#EDEDEB] py-24 px-6 md:px-12 select-none"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] font-mono tracking-[0.3em] text-neutral-500 uppercase block">
              CONCEPT / PHILOSOPHY
            </span>
            <h2 className="font-sans font-black text-3xl md:text-4.5xl tracking-tight text-neutral-900 uppercase leading-none">
              FUNCTIONALITY <br />& ST. PETERSBURG AESTHETICS
            </h2>
            <div className="h-[2px] bg-neutral-900 w-16" />
          </div>

          <div className="lg:col-span-7 space-y-6 text-neutral-700 font-sans text-sm md:text-base leading-relaxed tracking-wide">
            <p>
              <strong>DOLENGA WEAR</strong> is designed at the intersection of functional utilitarianism and relaxed street aesthetics. We reject fleeting trends in favor of clean architectural silhouettes, endless fabric longevity, and deep, tactile textures. Our heavyweight knits are more than clothing — they are resilient armor built for the modern metropolis.
            </p>
            <p>
              Each product undergoes an intricate development lifecycle: from selecting the density of the weave (utilizing exclusively long-staple cotton up to 500 GSM) to final soft-enzyme garment washing, shield-protecting the apparel from fading or shrinking. All hardware accessories are sourced from elite street-wear vendors, delivering lifetime performance for every zipper, snap, and trim.
            </p>
            <p className="text-xs uppercase font-mono text-neutral-400">
              designed in st. petersburg // engineered for character
            </p>
          </div>
        </div>
      </section>

      {/* CLIENT FAQ / КЛИЕНТУ */}
      <section
        ref={clientRef}
        className="w-full bg-white py-24 px-6 md:px-12 select-none"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <span className="text-[10px] font-mono tracking-[0.25em] text-neutral-400 uppercase block mb-1">
              INFORMATION / CLIENT SERVICES
            </span>
            <h2 className="font-sans font-black text-3xl tracking-tight text-neutral-900 uppercase">
              CLIENT CARE
            </h2>
            <p className="text-xs text-neutral-500 mt-3 max-w-xs leading-relaxed">
              Answers to frequently asked questions about shipping, sizing, and premium fabric care.
            </p>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <FAQItem
              num="01"
              question="HOW DO I CHOOSE THE RIGHT SIZE?"
              answer="Our t-shirts, hoodies, and sweatshirts feature a premium oversized drape. If you prefer a relaxed, elegant fit, select your standard size. For a more tailored silhouette, we recommend sizing down. All garments retain their shape and structure even after intensive washing cycles."
            />
            <FAQItem
              num="02"
              question="SHIPPING AND WORLDWIDE DELIVERY"
              answer="We arrange fast express courier shipping worldwide. Average transit times range between 2 to 5 business days. Safe payments are processed online via major credit/debit cards or flexible split payment solutions with our secure partners."
            />
            <FAQItem
              num="03"
              question="CARE GUIDE FOR HEAVYWEIGHT KNITS"
              answer="We highly recommend a delicate cold wash (up to 30°C) with mild detergents. Do not use chlorine bleach or aggressive softeners. We advise ironing inside-out on medium settings with generous steam. Lay flat to dry to preserve the loft and density of the luxury French terry for years."
            />
            <FAQItem
              num="04"
              question="RETURNS & EXCHANGES POLICY"
              answer="You may return or exchange any item within 14 days of delivery. Returned items must remain unworn, with all original labels, tags, and intact branded packaging. Please reach out to our client support team to initiate a seamless return."
            />
          </div>
        </div>
      </section>
        </>
      )}

      {/* BOTTOM METADATA RAIL */}
      <footer className="border-t border-black/5 mt-16 max-w-6xl mx-auto px-6 md:px-12 pt-12 text-center text-neutral-400 font-mono text-[9px] md:text-[10px] tracking-widest uppercase space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <p>ESTABLISHED 2023 / ST. PETERSBURG</p>
            <p className="text-neutral-400/60 font-medium">DESIGN_CODE EDITION_01_RECORD</p>
          </div>
          <div>
            <button
              onClick={onBackToHome}
              className="text-neutral-900 border-b border-black font-semibold hover:text-neutral-600 hover:border-neutral-600 transition-colors uppercase select-none cursor-pointer"
            >
              RETURN TO SOCIETY STUDIOS
            </button>
          </div>
        </div>
        <p className="text-[8px] text-neutral-300 pt-6">© 2026 DOLENGA WEAR. COZY AND FUNCTIONAL SUB-CULTURE APPAREL.</p>
      </footer>

    </div>
  );
}
