import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Check, CheckCheck } from 'lucide-react';
import { Product } from '../types';

interface FeaturedUniformProps {
  products: Product[];
  onAddToCart: (product: Product, size: string, color: string, colorHex: string) => void;
  onOpenProductDetail: (product: Product) => void;
  creamImage: string;
  greyImage: string;
  blackImage: string;
  gridBanner: string;
}

export default function FeaturedUniform({
  products,
  onAddToCart,
  onOpenProductDetail,
  creamImage,
  greyImage,
  blackImage,
  gridBanner,
}: FeaturedUniformProps) {
  // Find the basic UNIFORM product
  const uniformProduct = products.find(p => p.id === 'uniform-hoodie') || products[0];

  // Colors available in uniform: Oatmeal, Heather Grey, Charcoal Onyx
  // Index: 0 -> Oatmeal, 1 -> Heather Grey, 2 -> Charcoal Black
  const [activeColorIdx, setActiveColorIdx] = useState(2); // Default to Black for high-end feel
  const [selectedSize, setSelectedSize] = useState('M');
  const [isAdded, setIsAdded] = useState(false);

  const colorways = [
    {
      name: 'OATMEAL CREAM',
      hex: '#F0EFEA',
      image: creamImage,
      class: 'bg-[#F0EFEA]',
    },
    {
      name: 'HEATHER GREY',
      hex: '#BABABA',
      image: greyImage,
      class: 'bg-[#BABABA]',
    },
    {
      name: 'CHARCOAL BLACK',
      hex: '#1E1E1E',
      image: blackImage,
      class: 'bg-[#1E1E1E]',
    },
  ];

  const activeColorway = colorways[activeColorIdx];

  const handleQuickAdd = () => {
    onAddToCart(
      uniformProduct,
      selectedSize,
      activeColorway.name,
      activeColorway.hex
    );
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <section
      id="uniform-section"
      className="relative w-full bg-[#E5E5E5] text-black py-6 sm:py-12 md:py-16 overflow-hidden select-none font-sans"
    >
      {/* Light Concrete Fine Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20views%3D%220%200%20200%20200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F200%2Fsvg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.8%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noise)%22%2F%3E%3C%2Fsvg%3E')]" />

      <div id="uniform-container" className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 items-center">
          
          {/* Left Block - Text Editorial detail (4-cols) */}
          <div className="lg:col-span-4 flex flex-col justify-center space-y-4 sm:space-y-6 order-2 lg:order-1 font-sans">
            <div className="space-y-1.5 sm:space-y-3">
              <span className="text-[10px] font-mono tracking-[0.25em] text-neutral-500 uppercase">
                SIGNATURE LINEAGE
              </span>
              <h2 className="font-sans font-extrabold text-2xl sm:text-4xl md:text-5xl tracking-tighter text-black uppercase leading-[0.95]">
                THE OUTCAST
              </h2>
              <p className="text-xs uppercase tracking-widest text-[#555] font-mono font-medium">
                Heavyweight hoodie. Three colourways.
              </p>
            </div>

            <p className="text-[11px] sm:text-xs text-neutral-600 tracking-wide uppercase leading-relaxed font-sans max-w-sm">
              Custom woven loopback dense cotton jersey. Dropped shoulder profile for the ultimate contemporary casual silhouette. No draft cords. Brushed matte cotton lining. Designed as an everyday sculptural staple.
            </p>

            {/* Size Selector */}
            <div className="space-y-2 sm:space-y-3 pt-2">
              <div className="flex justify-between items-center text-[8px] sm:text-[10px] tracking-wider font-mono text-neutral-500 uppercase">
                <span>CHOOSE SILHOUETTE SIZE</span>
                <span className="font-sans text-neutral-800">500 GSM FIT</span>
              </div>
              <div className="flex space-x-2">
                {['S', 'M', 'L', 'XL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-7 w-10 sm:h-9 sm:w-12 border text-[10px] sm:text-xs tracking-widest font-mono transition-all cursor-pointer flex items-center justify-center ${
                      selectedSize === size
                        ? 'border-black bg-black text-white font-semibold'
                        : 'border-black/15 text-neutral-600 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Colorways - Luxury Carousel Indicators */}
            <div className="space-y-3">
              <p className="text-[10px] tracking-widest font-mono text-neutral-500 uppercase">
                SELECT COLOURWAY: <span className="text-neutral-800 font-sans ml-1">{activeColorway.name}</span>
              </p>
              <div className="flex items-center space-x-4">
                {colorways.map((col, index) => (
                  <button
                    key={col.name}
                    onClick={() => setActiveColorIdx(index)}
                    className={`relative h-6 w-6 rounded-full border transition-all cursor-pointer ${col.class} ${
                      activeColorIdx === index
                        ? 'ring-2 ring-black ring-offset-2 scale-110'
                        : 'border-black/5 hover:scale-105'
                    }`}
                    aria-label={`Select ${col.name}`}
                  >
                    {activeColorIdx === index && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <Check className={`h-3 w-3 ${index === 0 ? 'text-black' : 'text-white'}`} />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Button Block */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4">
              <button
                onClick={handleQuickAdd}
                className={`flex-1 transition-all font-sans text-[10px] sm:text-xs font-semibold tracking-[0.15em] sm:tracking-[0.2em] py-2.5 sm:py-4 uppercase flex items-center justify-center space-x-2 h-10 sm:h-12 cursor-pointer ${
                  isAdded
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-black text-white hover:bg-neutral-800'
                }`}
              >
                {isAdded ? (
                  <>
                    <CheckCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span>ADDED_✓✓</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span>ADD TO BAG</span>
                  </>
                )}
              </button>
              
              <button
                onClick={() => onOpenProductDetail(uniformProduct)}
                className="sm:w-[150px] bg-transparent text-black border border-black/30 hover:border-black transition-all font-sans text-[10px] sm:text-xs font-semibold tracking-[0.15em] sm:tracking-[0.2em] py-2.5 sm:py-4 uppercase flex items-center justify-center h-10 sm:h-12 cursor-pointer pl-1"
              >
                SPECS
              </button>
            </div>
          </div>

          {/* Right Block - Interactive Picture Display (8-cols) */}
          <div className="lg:col-span-8 relative flex flex-col justify-center items-center order-1 lg:order-2 w-full">
            {/* Mobile Mode: 2 premium images in a row layout */}
            <div className="grid grid-cols-2 gap-2 w-full sm:hidden">
              <div 
                className="relative aspect-[3/4] overflow-hidden cursor-pointer border border-black/5 rounded-sm"
                onClick={() => onOpenProductDetail(uniformProduct)}
              >
                <img
                  src={colorways[0].image}
                  alt={colorways[0].name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale active:scale-95 transition-transform"
                />
                <div className="absolute bottom-1.5 left-1.5 bg-black/95 text-white py-0.5 px-1.5 rounded-sm font-mono text-[6px] tracking-widest uppercase">
                  OATMEAL
                </div>
              </div>
              <div 
                className="relative aspect-[3/4] overflow-hidden cursor-pointer border border-black/5 rounded-sm"
                onClick={() => onOpenProductDetail(uniformProduct)}
              >
                <img
                  src={colorways[2].image}
                  alt={colorways[2].name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale active:scale-95 transition-transform"
                />
                <div className="absolute bottom-1.5 left-1.5 bg-black/95 text-white py-0.5 px-1.5 rounded-sm font-mono text-[6px] tracking-widest uppercase">
                  CHARCOAL
                </div>
              </div>
            </div>

            {/* Desktop/Tablet Mode: Large interactive single image */}
            <div className="hidden sm:block relative aspect-[3/4] w-full max-w-[400px] overflow-hidden cursor-pointer" onClick={() => onOpenProductDetail(uniformProduct)}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeColorIdx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full"
                >
                  <img
                    src={activeColorway.image}
                    alt={activeColorway.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale md:hover:scale-105 transition-transform duration-700"
                  />
                </motion.div>
              </AnimatePresence>
              
              {/* Product Badge overlay */}
              <div className="absolute top-4 left-4 bg-black/95 text-white py-1 px-3 rounded-full font-mono text-[9px] tracking-[0.2em] uppercase">
                500 GSM WEIGHT
              </div>

              {/* Subdued Watermark on product display */}
              <div className="absolute bottom-4 right-4 text-black/20 font-mono text-[7px] tracking-[0.3em] uppercase">
                SOCIETY_DESIGN_S01
              </div>
            </div>

            {/* Sub-label showing of all hoodies lined up from background image */}
            <div className="mt-4 sm:mt-8 w-full max-w-[400px] flex items-center space-x-3 sm:space-x-4 border-t border-black/10 pt-4">
              <span className="font-mono text-[8.5px] sm:text-[9px] tracking-wider text-neutral-500 uppercase">
                CATALOG REFERENCE:
              </span>
              <span className="font-sans text-[9px] sm:text-[10px] text-neutral-800 tracking-wider font-semibold uppercase">
                STUDIO SEED (WHITE, GREY, BLACK)
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
