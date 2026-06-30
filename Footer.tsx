import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, ShieldCheck, HelpCircle, Heart, ArrowRight, CheckCheck } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string, colorHex: string) => void;
}

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
}: ProductDetailModalProps) {
  const [selectedSize, setSelectedSize] = useState('M');
  const [activeTab, setActiveTab] = useState<'details' | 'sizing' | 'reviews'>('details');
  const [addedNotify, setAddedNotify] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    const defaultColor = product.colors && product.colors.length > 0 ? product.colors[0] : { name: "CHARCOAL BLACK", hex: "#1E1E1E" };
    onAddToCart(product, selectedSize, defaultColor.name, defaultColor.hex);
    
    setAddedNotify(true);
    setTimeout(() => {
      setAddedNotify(false);
    }, 2000);
  };

  const currentYear = new Date().getFullYear();

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-sm"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-[#141414] text-white border border-white/10 rounded-sm aspect-[1.5/1] flex flex-col md:flex-row overflow-hidden max-h-[90vh] md:max-h-none select-none font-sans"
        >
          {/* Close button top right */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 h-8 w-8 rounded-full bg-black/60 border border-white/10 hover:border-white text-neutral-300 hover:text-white transition-all flex items-center justify-center cursor-pointer"
            aria-label="Close specification details"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Left Block - Big portrait catalog shoot (5-cols) */}
          <div className="w-full md:w-[45%] relative bg-[#1e1e1e] overflow-hidden">
            <img
              src={product.imagePrimary}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover grayscale"
            />
            
            {/* Watermark detail */}
            <div className="absolute top-4 left-4 font-mono text-[8px] tracking-[0.25em] bg-black/85 border border-white/10 px-2 py-1 uppercase text-neutral-400">
              SOCIETY CORE GARMENT
            </div>
            
            {/* Soft shadow vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-60 pointer-events-none" />
          </div>

          {/* Right Block - Product controls & detailed tech descriptions (7-cols) */}
          <div className="w-full md:w-[55%] flex flex-col justify-between p-6 md:p-8 overflow-y-auto max-h-[50vh] md:max-h-none">
            
            {/* Upper Area: Title / Price */}
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[9px] font-mono tracking-[0.3em] text-neutral-500 uppercase">
                  {product.category} COLLECTION
                </span>
                <h3 className="font-sans font-bold text-2xl md:text-3xl tracking-tight text-white uppercase leading-none">
                  {product.name}
                </h3>
              </div>

              <div className="flex items-center space-x-4 border-y border-white/10 py-3">
                <span className="text-xl font-mono text-white tracking-widest">₹{product.price}.00 INR</span>
                <div className="h-4 w-[1px] bg-white/15" />
                <span className="text-[10px] font-mono tracking-widest text-[#999] uppercase">
                  FIBRE: {product.gsm} GSM LOOPBACK
                </span>
              </div>
            </div>

            {/* Middle Area: Interactive Tabs (Details, Size Spec, Reviews) */}
            <div className="my-6 space-y-4 flex-1">
              <div className="flex space-x-6 border-b border-white/15 text-[10px] tracking-widest font-mono uppercase pb-1.5">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-1.5 transition-all cursor-pointer ${
                    activeTab === 'details' ? 'border-b-2 border-white text-white font-semibold' : 'text-neutral-500'
                  }`}
                >
                  DEPT_SPECS_
                </button>
                <button
                  onClick={() => setActiveTab('sizing')}
                  className={`pb-1.5 transition-all cursor-pointer ${
                    activeTab === 'sizing' ? 'border-b-2 border-white text-white font-semibold' : 'text-neutral-500'
                  }`}
                >
                  SIZE_GEOMETRY_
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-1.5 transition-all cursor-pointer ${
                    activeTab === 'reviews' ? 'border-b-2 border-white text-white font-semibold' : 'text-neutral-500'
                  }`}
                >
                  REVIEWS_
                </button>
              </div>

              <AnimatePresence mode="wait">
                {activeTab === 'details' ? (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3 text-xs uppercase tracking-wide leading-relaxed text-neutral-400 pl-1"
                  >
                    <p>{product.description}</p>
                    <ul className="space-y-1 pt-2 border-t border-white/5 font-mono text-[9px] text-neutral-400">
                      {product.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <span className="h-1 w-1 bg-neutral-600 rounded-full" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ) : activeTab === 'sizing' ? (
                  <motion.div
                    key="sizing"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3"
                  >
                    <p className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase">
                      BOX COMPOSITION RECOMMENDED OVERSIZED DRAUGHT (IN INCHES):
                    </p>
                    <div className="border border-white/10 rounded-sm overflow-hidden font-mono text-[9px] uppercase">
                      <div className="grid grid-cols-4 bg-white/5 py-1.5 px-3 border-b border-white/10 text-neutral-400">
                        <span>SIZE</span>
                        <span>CHEST_DRAF</span>
                        <span>SLEEVE</span>
                        <span>HEM_LEN</span>
                      </div>
                      <div className="grid grid-cols-4 py-2 px-3 border-b border-white/5 hover:bg-white/5">
                        <span className="font-semibold text-white">S</span>
                        <span>25.5"</span>
                        <span>23.0"</span>
                        <span>26.0"</span>
                      </div>
                      <div className="grid grid-cols-4 py-2 px-3 border-b border-white/5 hover:bg-white/5">
                        <span className="font-semibold text-white">M</span>
                        <span>26.5"</span>
                        <span>23.5"</span>
                        <span>27.0"</span>
                      </div>
                      <div className="grid grid-cols-4 py-2 px-3 border-b border-white/5 hover:bg-white/5 animate-pulse">
                        <span className="font-semibold text-emerald-400">L (PREF)</span>
                        <span>27.5"</span>
                        <span>24.0"</span>
                        <span>28.0"</span>
                      </div>
                      <div className="grid grid-cols-4 py-2 px-3 hover:bg-white/5">
                        <span className="font-semibold text-white">XL</span>
                        <span>28.5"</span>
                        <span>24.5"</span>
                        <span>29.0"</span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="reviews"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3 max-h-[160px] overflow-y-auto pl-1"
                  >
                    <div className="border-b border-white/5 pb-2.5">
                      <div className="flex justify-between text-[9px] font-mono tracking-widest text-[#aaa] uppercase font-semibold">
                        <span>LUCIEN B. (VERIFIED MEMBERSHIP)</span>
                        <span>10 / 10 TIER</span>
                      </div>
                      <p className="text-xs text-neutral-400 uppercase tracking-wide leading-relaxed mt-1">
                        "The loopback weight is honestly premium. It drapes heavily, the shoulders are properly relaxed, and the hood holds its sculptural shape perfectly."
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between text-[9px] font-mono tracking-widest text-[#aaa] uppercase font-semibold">
                        <span>ADRIAN K.</span>
                        <span>9 / 10 EXCEL</span>
                      </div>
                      <p className="text-xs text-neutral-400 uppercase tracking-wide leading-relaxed mt-1">
                        "Society Studios maintains raw craft. The oatmeal colorway looks incredible paired with dark denims. Extremely fast shipping to Germany."
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Controls Area: Sizing controls & CTA triggers */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex justify-between items-center text-[10px] tracking-widest font-mono text-neutral-500 uppercase">
                <span>SELECT GARMENT SILHOUETTE SIZE</span>
                <span className="text-white hover:underline cursor-pointer flex items-center space-x-1 uppercase">
                  <HelpCircle className="h-3 w-3" />
                  <span>MEASURING GUIDE</span>
                </span>
              </div>
              
              <div className="flex space-x-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-9 w-12 border text-xs tracking-widest font-mono uppercase transition-all cursor-pointer flex items-center justify-center ${
                      selectedSize === size
                        ? 'border-white bg-white text-black font-semibold'
                        : 'border-white/15 text-neutral-400 hover:border-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {/* Action grid (Add to bag / Close alternate specs) */}
              <div className="flex space-x-3 pt-2">
                <button
                  onClick={handleAdd}
                  className={`flex-1 transition-all py-3.5 text-xs font-semibold tracking-[0.25em] uppercase flex items-center justify-center space-x-2 h-12 cursor-pointer ${
                    addedNotify
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700 hover:text-white border-transparent'
                      : 'bg-white text-black hover:bg-neutral-800 hover:text-white'
                  }`}
                >
                  {addedNotify ? (
                    <>
                      <CheckCheck className="h-4 w-4" />
                      <span>ADDED_✓✓</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4" />
                      <span>COMPILE_TO_BAG_</span>
                    </>
                  )}
                </button>
                
                <button
                  onClick={onClose}
                  className="px-6 bg-transparent border border-white/20 hover:border-white transition-all text-xs font-semibold tracking-[0.25em] uppercase flex items-center justify-center h-12 cursor-pointer text-white"
                >
                  DISMISS
                </button>
              </div>

              {/* Dynamic Added To bag ticker feedback */}
              <AnimatePresence>
                {addedNotify && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-center font-mono text-[9px] tracking-[0.15em] text-emerald-400 uppercase font-semibold"
                  >
                    SUCCESS_ SYSTEM SUCCESSFULLY ADDED STAPLE {selectedSize} CONTEXT TO BAG CACHE
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
