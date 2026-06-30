import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Eye, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../types';

interface FeaturedCollectionProps {
  onAddToCart: (product: Product, size: string, color: string, colorHex: string) => void;
  onOpenProductDetail: (product: Product) => void;
}

// 8 Premium Curated Luxury Streetwear Products
const FEATURED_PRODUCTS: Product[] = [
  {
    id: 'fc-oversized-tee',
    name: 'OVERSIZED T-SHIRT',
    price: 7000,
    currencySymbol: '₹',
    category: 'T-SHIRTS',
    description: 'Heavyweight loopback combed cotton t-shirt with a drop-shoulder comfort fit and minimal double-stitched pocket detailing.',
    details: [
      '320 GSM organic heavyweight cotton twill core',
      'Dropped shoulder architectural slouch layout',
      'Twin needles double ribbed neckband finish',
      'Enzyme washing keeps color intact over hundreds of washes'
    ],
    gsm: 320,
    colors: [
      { name: 'WASHED ANTHRACITE', hex: '#1C1C1C', class: 'bg-[#1C1C1C]' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    imagePrimary: 'https://i.ibb.co/WN8XTMD1/download-2.jpg',
    imageHover: 'https://i.ibb.co/TM043sFH/download-1.jpg'
  },
  {
    id: 'fc-loopback-shorts',
    name: 'LOOPBACK SHORTS',
    price: 7000,
    currencySymbol: '₹',
    category: 'SHORTS',
    description: 'Heavy French terry lounging shorts in coal black. Finished with extra-long contrast white drawstrings and double side pockets.',
    details: [
      '420 GSM heavyweight unbrushed loopback knit',
      'Custom silver aglet-capped flat braided drawstrings',
      'Elasticized heavy comfort tunnel waistband',
      'Deep functional side-seamed trouser hand pockets'
    ],
    gsm: 420,
    colors: [
      { name: 'MATTE COAL', hex: '#111111', class: 'bg-[#111111]' }
    ],
    sizes: ['S', 'M', 'L'],
    imagePrimary: 'https://i.ibb.co/LXp1qGPj/Cozy-hoodie-girls-fleece.jpg',
    imageHover: 'https://i.ibb.co/Z6cb3Xg7/download-3.jpg'
  },
  {
    id: 'fc-zip-jacket',
    name: 'STREET STRIPE JACKET',
    price: 12500,
    currencySymbol: '₹',
    category: 'JACKETS',
    description: 'Minimalist double-sided zipped jersey running jacket, detailed with high contrast graphic chest band and clean stand-up collar.',
    details: [
      '480 GSM dense pure-grain cotton fleece construction',
      'Contrasting horizontal visual chest band motif',
      'Durable double metal slider front zip closure',
      'Deep integrated zipper hand pockets at seams'
    ],
    gsm: 480,
    colors: [
      { name: 'COZEN BLACK', hex: '#0F0F0F', class: 'bg-[#0F0F0F]' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    imagePrimary: 'https://i.ibb.co/cKW2gBHH/Calvin-Klein-Black-Cotton-Blend-Fleece-Hoodie-Large-Mens.jpg',
    imageHover: 'https://i.ibb.co/Lzbvny7H/Buy-Calvin-Klein-Black-Monogram-Hoodie-from-the-Next-UK-online-shop.jpg'
  },
  {
    id: 'fc-track-joggers',
    name: 'HEAVYWEIGHT JOGGERS',
    price: 9000,
    currencySymbol: '₹',
    category: 'JOGGERS',
    description: 'Luxe French terry track sweatpants with dense ribbed cuff ends and contrast graphic panel running along the right leg.',
    details: [
      '500 GSM loopback cotton for ultimate warmth and density',
      'Asymmetrical custom graphic screenprint stripe detailing',
      'Gathered elastic waist with hidden security pocket',
      'Soft enzyme garment pre-shrunk finish'
    ],
    gsm: 500,
    colors: [
      { name: 'COZEN BLACK', hex: '#0F0F0F', class: 'bg-[#0F0F0F]' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    imagePrimary: 'https://i.ibb.co/RTY1dkgS/MANCHETTE-LIGHT-GREY-MELANGE-HOODIE-XXL.jpg',
    imageHover: 'https://i.ibb.co/JWYssHns/Men-s-Casual-Minimalist-Solid-Color-Kangaroo-Pocket-Drawstring-Hoodie-Suitable-For-Daily-Commute-A.jpg'
  },
  {
    id: 'fc-double-hoodie',
    name: 'PREMIUM CORE HOODIE',
    price: 13000,
    currencySymbol: '₹',
    category: 'HOODIES',
    description: 'Thick doubled-hoodie in mineral black charcoal layout. Drop shoulder posture, without drawstrings, heavyweight handfeel.',
    details: [
      '500 GSM heavyweight organic cotton jersey loops',
      'No drawstring structured double layered heavy hood',
      'Relaxed architectural silhouette with split kangaroo pockets',
      'Tight woven flatlock stitching details'
    ],
    gsm: 500,
    colors: [
      { name: 'CHARCOAL BLACK', hex: '#1C1C1C', class: 'bg-[#1C1C1C]' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    imagePrimary: 'https://i.ibb.co/NdJZh7nJ/Hoodies-Free-delivery-on-adidas-UK.jpg',
    imageHover: 'https://i.ibb.co/WN8XTMD1/download-2.jpg'
  },
  {
    id: 'fc-twill-cap',
    name: 'UNSTRUCTURED TWILL CAP',
    price: 4500,
    currencySymbol: '₹',
    category: 'ACCESSORIES',
    description: 'Authentic 6-panel heavy wash cotton hat in deep midnight coal. Minimal luxury adjustable brass back strap.',
    details: [
      '100% thick premium brushed cotton twill cloth',
      'Embossed logo back clasp adjustability',
      'Relaxed unstructured visor design layout',
      'Tonal stitching detailings'
    ],
    gsm: 320,
    colors: [
      { name: 'CHARCOAL BLACK', hex: '#1C1C1C', class: 'bg-[#1C1C1C]' }
    ],
    sizes: ['ONE_SIZE'],
    imagePrimary: 'https://i.ibb.co/RkzsnWf1/Casquette-Noir-Homme.jpg',
    imageHover: 'https://i.ibb.co/B1p7d56/Inspiration.jpg'
  },
  {
    id: 'fc-distressed-crewneck',
    name: 'FADE CREWNECK',
    price: 11000,
    currencySymbol: '₹',
    category: 'SWEATSHIRTS',
    description: 'Vintaged enzyme-faded slouch sweatshirt with deep ribbed trim details, delivering raw street essence.',
    details: [
      '460 GSM organic premium French terry weave',
      'Soft-enzyme heavy fade look with distressed edge details',
      'Classic crewneck collar with reinforced double-triangle seam',
      'Made for relaxed daily outfits'
    ],
    gsm: 460,
    colors: [
      { name: 'STONE GREY', hex: '#777777', class: 'bg-[#777777]' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    imagePrimary: 'https://i.ibb.co/hF6P8ygm/Cozy-and-Stylish-Hoodies-for-Any-Outfit.jpg',
    imageHover: 'https://i.ibb.co/cKW2gBHH/Calvin-Klein-Black-Cotton-Blend-Fleece-Hoodie-Large-Mens.jpg'
  },
  {
    id: 'fc-utility-cargo',
    name: 'UTILITY SWEATPANTS',
    price: 9500,
    currencySymbol: '₹',
    category: 'PANTS',
    description: 'Relaxed heavy cotton track bottoms featuring cargo flap side-pockets and secure zip pocket overlays.',
    details: [
      '480 GSM structural heavy woven loop fabric',
      'Left and right discrete side utility cargo pocketing flaps',
      'Adjustable toggle drawstring cuffs at ankle bases',
      'Deep side-seam pockets'
    ],
    gsm: 480,
    colors: [
      { name: 'MATTE COAL', hex: '#111111', class: 'bg-[#111111]' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    imagePrimary: 'https://i.ibb.co/TM043sFH/download-1.jpg',
    imageHover: 'https://i.ibb.co/Z6cb3Xg7/download-3.jpg'
  }
];

export default function FeaturedCollection({
  onAddToCart,
  onOpenProductDetail
}: FeaturedCollectionProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [hoveredPid, setHoveredPid] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState<Record<string, boolean>>({});

  const handleScroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const cardWidth = container.querySelector('.carousel-card')?.clientWidth || 300;
      const scrollAmount = direction === 'left' ? -(cardWidth + 24) * 2 : (cardWidth + 24) * 2;
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    const defaultSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'M';
    const defaultColor = product.colors && product.colors.length > 0 ? product.colors[0] : { name: "CHARCOAL BLACK", hex: "#1E1E1E" };
    onAddToCart(product, defaultSize, defaultColor.name, defaultColor.hex);

    setIsAdding((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setIsAdding((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-[#f5f5f5] py-20 px-6 md:px-12 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-black/10 pb-5 mb-12">
          <div>
            <span className="text-[10px] font-mono tracking-[0.3em] text-neutral-400 uppercase block">
              CURATED ESSENTIALS
            </span>
            <h2 className="font-sans font-black text-2xl md:text-3.5xl tracking-tight text-[#111111] uppercase mt-1">
              Featured Collection
            </h2>
          </div>

          {/* Navigation Controls in top right */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleScroll('left')}
              className="p-2 border border-black/15 hover:border-black/40 hover:bg-black/5 text-[#111111] transition-all cursor-pointer rounded-full"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4.5 w-4.5" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="p-2 border border-black/15 hover:border-black/40 hover:bg-black/5 text-[#111111] transition-all cursor-pointer rounded-full"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={carouselRef}
          className="flex space-x-6 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-4 cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {FEATURED_PRODUCTS.map((product) => {
            const isHovered = hoveredPid === product.id;
            const isCurrentlyAdding = isAdding[product.id];

            return (
              <div
                key={product.id}
                className="carousel-card w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] flex-shrink-0 snap-start group"
                onMouseEnter={() => setHoveredPid(product.id)}
                onMouseLeave={() => setHoveredPid(null)}
              >
                {/* Product Image Window */}
                <div
                  onClick={() => onOpenProductDetail(product)}
                  className="relative aspect-square w-full bg-[#EDEDEA] rounded-[12px] overflow-hidden shadow-xs hover:shadow-md transition-all duration-500 ease-out flex items-center justify-center cursor-pointer select-none"
                >
                  {/* Primary Image Centered inside space */}
                  <img
                    src={product.imagePrimary}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="h-[76%] w-[76%] object-contain grayscale mix-blend-darken transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                  />

                  {/* Eye details indicator overlay on top */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenProductDetail(product);
                        }}
                        className="p-3 bg-white text-black hover:bg-black hover:text-white transition-all duration-300 rounded-full shadow-md hover:scale-105"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>

                      <button
                        onClick={(e) => handleQuickAdd(e, product)}
                        className={`p-3 transition-all duration-300 rounded-full shadow-md hover:scale-105 ${
                          isCurrentlyAdding
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white text-black hover:bg-black hover:text-white'
                        }`}
                        title="Add to Bag"
                      >
                        {isCurrentlyAdding ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <ShoppingBag className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Info Block - Product Name Left & Price Right */}
                <div
                  className="flex justify-between items-baseline pt-4.5 px-1 pb-1 text-[#111111]"
                  onClick={() => onOpenProductDetail(product)}
                >
                  <h3 className="font-sans font-medium text-[14px] leading-tight tracking-wide uppercase cursor-pointer">
                    {product.name}
                  </h3>
                  <span className="font-sans font-semibold text-[14px] ml-4 shrink-0">
                    {product.currencySymbol || '₹'}{product.price.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
