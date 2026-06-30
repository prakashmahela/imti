import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Eye, CheckCheck } from 'lucide-react';
import { Product } from '../types';

interface ShopSectionProps {
  products: Product[];
  onAddToCart: (product: Product, size: string, color: string, colorHex: string) => void;
  onOpenProductDetail: (product: Product) => void;
}

export default function ShopSection({
  products,
  onAddToCart,
  onOpenProductDetail,
}: ShopSectionProps) {
  const [hoveredPid, setHoveredPid] = useState<string | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  const handleSizeSelect = (productId: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation(); // Avoid opening the details modal
    const size = selectedSizes[product.id] || 'M'; // Default to medium
    const defaultColor = product.colors && product.colors.length > 0 ? product.colors[0] : { name: "CHARCOAL BLACK", hex: "#1E1E1E" };
    onAddToCart(product, size, defaultColor.name, defaultColor.hex);

    setAddedItems((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  return (
    <section
      id="shop-section"
      className="relative w-full bg-[#FAF9F6] text-neutral-900 py-12 md:py-20 overflow-hidden selection:bg-neutral-200"
    >
      {/* Heavy textured grain */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20views%3D%220%200%20200%20200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F200%2Fsvg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.8%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noise)%22%2F%3E%3C%2Fsvg%3E')]" />

      <div id="shop-container" className="mx-auto max-w-6xl px-6 md:px-12 flex flex-col space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-black/10 pb-6">
          <div>
            <span className="text-[10px] font-mono tracking-[0.25em] text-neutral-500 uppercase">
              ONLINE CATALOGUE
            </span>
            <h2 className="font-sans font-bold text-3xl md:text-4xl tracking-tight text-black mt-1 uppercase">
              TODAY'S CALVIN KLEIN
            </h2>
          </div>
          <p className="text-xs tracking-widest text-neutral-500 font-mono mt-4 md:mt-0 uppercase">
            [ ESTABLISHED COLLECTION / UNCHANGED VOLUME ]
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-6 md:gap-x-8 md:gap-y-10">
          {products.map((product) => {
            const isHovered = hoveredPid === product.id;
            const chosenSize = selectedSizes[product.id] || 'M';

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5%' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredPid(product.id)}
                onMouseLeave={() => setHoveredPid(null)}
                className="group flex flex-col space-y-2 md:space-y-4 cursor-pointer"
                onClick={() => onOpenProductDetail(product)}
              >
                {/* Image Swap container with Quick Sizing Overlay */}
                <div className="relative aspect-[3/4] w-full bg-[#1e1e1e] overflow-hidden select-none">
                  {/* Primary Image */}
                  <img
                    src={product.imagePrimary}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className={`absolute inset-0 h-full w-full object-cover grayscale transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isHovered ? 'scale-105 opacity-0' : 'opacity-100'
                    }`}
                  />

                  {/* Hover Swap Image */}
                  <img
                    src={product.imageHover}
                    alt={`${product.name} Alternate View`}
                    referrerPolicy="no-referrer"
                    className={`absolute inset-0 h-full w-full object-cover grayscale transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isHovered ? 'scale-105 opacity-100' : 'opacity-0'
                    }`}
                  />

                  {/* Exclusive Pass Badge */}
                  {product.isExclusive && (
                    <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-white text-black text-[7px] md:text-[8px] font-mono tracking-[0.2em] uppercase px-1.5 py-0.5 md:px-2.5 md:py-1 rounded-sm">
                      EXCLUSIVE
                    </div>
                  )}

                  {/* Size Select bar overlays */}
                  <div className={`absolute inset-x-0 bottom-0 bg-black/85 backdrop-blur-sm border-t border-white/5 p-3 md:py-4 md:px-6 flex flex-col justify-center space-y-2 md:space-y-3 transition-transform duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isHovered ? 'translate-y-0' : 'translate-y-full'
                  }`}>
                    <div className="flex justify-between items-center text-[8px] md:text-[9px] font-mono tracking-wider text-neutral-400 uppercase">
                      <span>CHOOSE SIZE</span>
                      <span className="text-white font-sans">{chosenSize} SELECT</span>
                    </div>

                    <div className="flex space-x-1 justify-between">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSizeSelect(product.id, size);
                          }}
                          className={`flex-1 h-6 md:h-7 border text-[8px] md:text-[10px] tracking-widest font-mono uppercase transition-all cursor-pointer ${
                            chosenSize === size
                              ? 'border-white bg-white text-black font-semibold'
                              : 'border-white/10 text-neutral-400 hover:border-white/50 hover:text-white'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>

                    {/* Quick Add CTA */}
                    <button
                      onClick={(e) => handleQuickAdd(e, product)}
                      className={`w-full border transition-all py-1.5 md:py-2.5 text-[8px] md:text-[9px] tracking-[0.2em] md:tracking-[0.25em] font-sans font-semibold uppercase flex items-center justify-center space-x-1 cursor-pointer ${
                        addedItems[product.id]
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-white text-black hover:bg-neutral-950 hover:text-white hover:border-white border-transparent'
                      }`}
                    >
                      {addedItems[product.id] ? (
                        <>
                          <CheckCheck className="h-3 w-3 md:h-3.5 md:w-3.5" />
                          <span>ADDED_✓✓</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="h-2.5 w-2.5 md:h-3 md:w-3" />
                          <span>QUICK_ADD</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Standard floating view spectacles */}
                  <div className={`absolute top-2 right-2 md:top-4 md:right-4 h-6 w-6 md:h-8 md:w-8 bg-black/70 backdrop-blur-sm border border-white/5 rounded-full flex items-center justify-center text-white/60 transition-opacity duration-300 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <Eye className="h-3.5 w-3.5 md:h-4 md:w-4 text-white" />
                  </div>
                </div>

                {/* Card Base details */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 font-sans">
                  <div className="flex flex-col space-y-0.5 md:space-y-1">
                    <h4 className="text-xs md:text-sm font-semibold tracking-wide text-neutral-800 group-hover:text-black uppercase transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-[8px] md:text-[10px] font-mono tracking-widest uppercase text-neutral-500">
                      GSM: {product.gsm} / {(product.colors && product.colors.length > 0 ? product.colors[0].name : "CHARCOAL BLACK")}
                    </p>
                  </div>
                  <span className="text-xs md:text-sm tracking-widest text-neutral-900 font-mono font-medium shrink-0">
                    ₹{product.price}.00
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
