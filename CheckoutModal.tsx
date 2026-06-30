import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ShoppingBag, Check, HelpCircle, ChevronRight, Sparkles, AlertCircle, Plus, Minus } from 'lucide-react';
import { Product } from '../types';

interface DolengaProductDetailProps {
  product: Product;
  onAddToCart: (product: Product, size: string, colorName: string, colorHex: string) => void;
  onBack: () => void;
  allProducts: Product[];
  onSelectProduct: (product: Product) => void;
}

export default function DolengaProductDetail({
  product,
  onAddToCart,
  onBack,
  allProducts,
  onSelectProduct
}: DolengaProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors && product.colors.length > 0 ? product.colors[0] : { name: "CHARCOAL BLACK", hex: "#1E1E1E", class: "bg-[#1E1E1E]" });
  const [activeImage, setActiveImage] = useState<string>(product.imagePrimary);
  const [isAdding, setIsAdding] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  // Accordion lists
  const [openAccordion, setOpenAccordion] = useState<string | null>('materials');

  const handleAddToCartFlow = () => {
    setIsAdding(true);
    setTimeout(() => {
      onAddToCart(product, selectedSize, selectedColor.name, selectedColor.hex);
      setIsAdding(false);
      setAddedSuccess(true);
      setTimeout(() => {
        setAddedSuccess(false);
      }, 2500);
    }, 700);
  };

  const otherProducts = allProducts.filter((p) => p.id !== product.id);

  // Measurements based on product category
  const getMeasurements = () => {
    if (product.category === 'T-SHIRTS') {
      return [
        { label: 'CHEST WIDTH (A)', s: '58 cm', m: '61 cm', l: '64 cm', xl: '67 cm' },
        { label: 'GARMENT LENGTH (B)', s: '70 cm', m: '72 cm', l: '75 cm', xl: '78 cm' },
        { label: 'SLEEVE LENGTH (C)', s: '22 cm', m: '23 cm', l: '24 cm', xl: '25 cm' }
      ];
    }
    if (product.category === 'ZIP HOODIE' || product.category === 'HOODIE') {
      return [
        { label: 'CHEST WIDTH (A)', s: '62 cm', m: '65 cm', l: '68 cm', xl: '71 cm' },
        { label: 'GARMENT LENGTH (B)', s: '68 cm', m: '71 cm', l: '74 cm', xl: '77 cm' },
        { label: 'SLEEVE LENGTH (C)', s: '61 cm', m: '63 cm', l: '65 cm', xl: '67 cm' }
      ];
    }
    if (product.category === 'JOGGERS') {
      return [
        { label: 'HALF-WAIST WIDTH (A)', s: '38 cm', m: '40 cm', l: '42 cm', xl: '44 cm' },
        { label: 'INSEAM LENGTH (B)', s: '101 cm', m: '103 cm', l: '105 cm', xl: '107 cm' },
        { label: 'CUFF WIDTH (C)', s: '12 cm', m: '13 cm', l: '14 cm', xl: '15 cm' }
      ];
    }
    // Default / Shorts
    return [
      { label: 'HALF-WAIST WIDTH (A)', s: '36 cm', m: '38 cm', l: '40 cm', xl: '42 cm' },
      { label: 'GARMENT LENGTH (B)', s: '48 cm', m: '50 cm', l: '52 cm', xl: '54 cm' },
      { label: 'BOTTOM WIDTH (C)', s: '31 cm', m: '32 cm', l: '33 cm', xl: '34 cm' }
    ];
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-6xl mx-auto px-6 md:px-12 py-10 md:py-16 select-none font-sans"
    >
      {/* Back breadcrumb bar */}
      <div className="flex items-center justify-between mb-10 border-b border-black/5 pb-6">
        <button
          onClick={onBack}
          className="group flex items-center space-x-2 text-[10px] font-bold tracking-[0.25em] uppercase text-neutral-500 hover:text-black transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span>BACK TO COLLECTION</span>
        </button>

        <div className="hidden sm:flex items-center space-x-2 text-[9px] font-mono tracking-widest text-neutral-400 uppercase">
          <span>SOCIETY</span>
          <ChevronRight className="h-3 w-3" />
          <span>DOLENGA WEAR</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-neutral-900 font-bold">{product.category}</span>
        </div>
      </div>

      {/* Main product configuration block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Premium Multi-Image Stage */}
        <div className="lg:col-span-7 grid grid-cols-12 gap-4">
          
          {/* Thumbnails rail on the very left (Desktop) */}
          <div className="col-span-12 md:col-span-2 order-2 md:order-1 flex md:flex-col gap-3">
            <button
              onClick={() => setActiveImage(product.imagePrimary)}
              className={`aspect-square md:aspect-[4/5] flex-1 md:flex-initial rounded-md overflow-hidden bg-neutral-100 border transition-all cursor-pointer ${
                activeImage === product.imagePrimary ? 'border-neutral-950 scale-102 shadow-xs' : 'border-neutral-200/50 opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={product.imagePrimary}
                alt="Primary view mockup"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </button>
            <button
              onClick={() => setActiveImage(product.imageHover)}
              className={`aspect-square md:aspect-[4/5] flex-1 md:flex-initial rounded-md overflow-hidden bg-neutral-100 border transition-all cursor-pointer ${
                activeImage === product.imageHover ? 'border-neutral-950 scale-102 shadow-xs' : 'border-neutral-200/50 opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={product.imageHover}
                alt="Hover alternative view"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </button>
          </div>

          {/* Hero Stage Zoom Box */}
          <div className="col-span-12 md:col-span-10 order-1 md:order-2">
            <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-[#EDEDEB] border border-neutral-100 shadow-sm group">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                referrerPolicy="no-referrer"
              />
              
              {/* Product Badge Overlay */}
              <div className="absolute top-4 left-4 bg-black/95 text-white font-mono text-[9px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-sm shadow-sm flex items-center space-x-1.5">
                <Sparkles className="h-3 w-3 text-white" />
                <span>{product.gsm} GSM PREMIUM</span>
              </div>

              {/* ST. PETERSBURG ORIGIN STAMP */}
              <div className="absolute bottom-4 right-4 bg-white/75 backdrop-blur-xs text-[8px] font-mono tracking-widest text-neutral-800 uppercase px-2.5 py-1 rounded-xs">
                CRAFTED IN SPB // DESIGNED IN SPB
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Premium Text, Attributes & Checkout CTA */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Header text */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-[0.3em] text-neutral-400 font-bold uppercase block">
              2023 COLLECTION // ST. PETERSBURG
            </span>
            <h1 className="font-sans font-black text-3xl md:text-4xl text-neutral-900 tracking-tight uppercase leading-tight">
              {product.name}
            </h1>
            <div className="text-2xl font-black text-neutral-950 font-sans tracking-tight mt-3">
              {product.currencySymbol || '₹'}{product.price.toLocaleString('en-IN')}
            </div>
          </div>

          <div className="h-[1px] bg-black/10" />

          {/* Detailed Narrative */}
          <p className="text-[13px] md:text-sm text-neutral-600 leading-relaxed font-normal tracking-wide">
            {product.description}
          </p>

          {/* COLOR SELECTOR */}
          <div className="space-y-3">
            <div className="text-[10px] font-bold tracking-[0.2em] text-neutral-400 uppercase">
              COLOR: <span className="text-neutral-900 font-extrabold">{selectedColor.name}</span>
            </div>
            <div className="flex items-center space-x-2.5">
              {(product.colors && product.colors.length > 0 ? product.colors : [{ name: "CHARCOAL BLACK", hex: "#1E1E1E", class: "bg-[#1E1E1E]" }]).map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c)}
                  className={`relative h-6 w-6 rounded-full border border-black/10 cursor-pointer ${c.class} transition-transform ${
                    selectedColor.name === c.name ? 'scale-110 ring-2 ring-neutral-950 ring-offset-2' : 'hover:scale-105'
                  }`}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* SIZE SELECTOR WITH GUIDE */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-bold tracking-[0.2em] text-neutral-400 uppercase">
                SIZE: <span className="text-neutral-900 font-extrabold">{selectedSize}</span>
              </div>
              <button
                onClick={() => setSizeGuideOpen(true)}
                className="inline-flex items-center space-x-1 text-[9px] font-bold tracking-widest text-neutral-500 hover:text-black hover:underline transition-colors cursor-pointer font-sans"
              >
                <HelpCircle className="h-3.5 w-3.5" />
                <span>SIZE GUIDE</span>
              </button>
            </div>

            <div className="flex gap-2">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`h-11 w-14 border text-xs font-mono font-bold uppercase transition-all rounded-md cursor-pointer flex items-center justify-center ${
                    selectedSize === sz
                      ? 'bg-neutral-950 border-neutral-950 text-white shadow-xs scale-102'
                      : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-950 hover:text-neutral-950'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* BUY CALL TO ACTION BLOCK */}
          <div className="pt-2">
            <button
              onClick={handleAddToCartFlow}
              disabled={isAdding || addedSuccess}
              className={`w-full text-xs font-bold uppercase tracking-[0.25em] h-14 rounded-full transition-all flex items-center justify-center space-x-3 cursor-pointer ${
                addedSuccess
                  ? 'bg-emerald-600 text-white shadow-md'
                  : isAdding
                  ? 'bg-neutral-800 text-white/55 cursor-wait'
                  : 'bg-neutral-950 text-white hover:bg-neutral-800 shadow-md active:scale-[0.98]'
              }`}
            >
              {addedSuccess ? (
                <>
                  <Check className="h-4.5 w-4.5 animate-bounce" />
                  <span>ADDED TO BAG ✓</span>
                </>
              ) : isAdding ? (
                <>
                  <div className="h-4.5 w-4.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>ADDING...</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4" />
                  <span>ADD TO BAG</span>
                </>
              )}
            </button>
          </div>

          {/* QUALITY BULLETS PANEL */}
          <div className="bg-neutral-50 rounded-xl p-4.5 border border-black/[0.03] space-y-2.5">
            <div className="flex items-start space-x-2.5 text-neutral-600">
              <Check className="h-4 w-4 text-neutral-900 mt-0.5 flex-shrink-0" />
              <span className="text-xs font-sans tracking-wide leading-relaxed">
                Triple quality seam inspection check prior to dispatch.
              </span>
            </div>
            <div className="flex items-start space-x-2.5 text-neutral-600">
              <Check className="h-4 w-4 text-neutral-900 mt-0.5 flex-shrink-0" />
              <span className="text-xs font-sans tracking-wide leading-relaxed">
                All items pre-treated with enzyme wash for unparalleled softness.
              </span>
            </div>
          </div>

          {/* TECHNICAL SPECIFICATIONS ACCORDIONS */}
          <div className="border-t border-black/5 pt-4 space-y-1">
            
            {/* Accordion 1 */}
            <div className="border-b border-black/5 pb-2">
              <button
                onClick={() => setOpenAccordion(openAccordion === 'materials' ? null : 'materials')}
                className="w-full flex items-center justify-between text-left py-3 cursor-pointer"
              >
                <span className="font-sans font-extrabold text-[11px] text-neutral-900 tracking-wider">01. DETAILS AND MATERIALS</span>
                {openAccordion === 'materials' ? <Minus className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
              </button>
              <AnimatePresence initial={false}>
                {openAccordion === 'materials' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <ul className="text-xs text-neutral-500 space-y-1.5 pb-4 leading-relaxed font-sans list-disc pl-4">
                      {product.details ? (
                        product.details.map((detail, index) => (
                          <li key={index}>{detail}</li>
                        ))
                      ) : (
                        <li>Heavyweight organic cotton {product.gsm} GSM</li>
                      )}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Accordion 2 */}
            <div className="border-b border-black/5 pb-2">
              <button
                onClick={() => setOpenAccordion(openAccordion === 'delivery' ? null : 'delivery')}
                className="w-full flex items-center justify-between text-left py-3 cursor-pointer"
              >
                <span className="font-sans font-extrabold text-[11px] text-neutral-900 tracking-wider">02. SHIPPING & RETURNS</span>
                {openAccordion === 'delivery' ? <Minus className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
              </button>
              <AnimatePresence initial={false}>
                {openAccordion === 'delivery' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-xs text-neutral-500 pb-4 leading-relaxed font-sans">
                      Express courier delivery takes 2 to 5 business days worldwide. Free standard pickup available directly from our design workshop in St. Petersburg. Unsuitable products can be returned or exchanged within 14 days of receipt when accompanied by original tags, labels, and outer packaging.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>      {/* COMPLETE THE LOOK / COMPLETE THE LOOK MATCHING CARDS */}
      <section className="mt-24 border-t border-black/10 pt-16">
        <div className="flex items-baseline justify-between mb-10">
          <div>
            <span className="text-[9px] font-mono tracking-[0.3em] text-neutral-400 uppercase">
              STYLE CURATOR // CURATED LOOK
            </span>
            <h2 className="font-sans font-black text-2xl tracking-tight text-neutral-900 uppercase">
              COMPLETE THE LOOK
            </h2>
          </div>
          <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase hidden sm:inline">
            STUDIO EDITION 2023
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {otherProducts.slice(0, 3).map((prod) => (
            <div
              key={prod.id}
              onClick={() => {
                onSelectProduct(prod);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-[4/5] rounded-md overflow-hidden bg-[#EDEDEB] w-full">
                <img
                  src={prod.imagePrimary}
                  alt={prod.name}
                  className="absolute inset-0 object-cover w-full h-full group-hover:scale-102 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <img
                  src={prod.imageHover}
                  alt={prod.name}
                  className="absolute inset-0 object-cover w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  referrerPolicy="no-referrer"
                />

                <span className="absolute top-2.5 left-2.5 bg-black/90 text-[8px] font-mono tracking-widest font-semibold text-white px-2 py-0.5 rounded-xs">
                  {prod.gsm} GSM
                </span>
                
                {/* Arrow hint overlay */}
                <div className="absolute inset-0 bg-neutral-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white text-black text-[9px] font-bold tracking-widest uppercase px-4 py-2.5 rounded-full shadow-md">
                    VIEW DETAILS
                  </span>
                </div>
              </div>

              <div className="pt-3.5">
                <div className="flex justify-between items-baseline">
                  <span className="text-[11px] font-black tracking-[0.15em] text-neutral-950 uppercase">{prod.category}</span>
                  <span className="text-[11px] font-bold text-neutral-900">{prod.currencySymbol || '₹'}{prod.price.toLocaleString('en-IN')}</span>
                </div>
                <p className="text-[10px] font-medium tracking-wide text-neutral-500 mt-1 line-clamp-1">{prod.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SIZE GUIDE FLOATING MODAL DIALOG */}
      <AnimatePresence>
        {sizeGuideOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSizeGuideOpen(false)}
              className="absolute inset-0 bg-black"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl p-6 md:p-8 overflow-hidden z-10 border border-neutral-100 font-sans text-neutral-900 select-none"
            >
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-6">
                <div>
                  <span className="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase">SIZE MATRIX // FIT REFERENCE</span>
                  <h3 className="font-sans font-black text-lg text-neutral-900 uppercase tracking-tight mt-0.5">
                    {product.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSizeGuideOpen(false)}
                  className="text-neutral-400 hover:text-black transition-colors text-xs font-mono font-bold tracking-wider cursor-pointer border px-2.5 py-1.5 rounded-full hover:border-black/35"
                >
                  CLOSE [ESC]
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-[11px] text-neutral-500 leading-relaxed font-sans">
                  Our garments are developed with premium loose-fit patterns, considering form retention and fabric shrinkage. All measurements are measured manually on flat finished products. A tolerance of 1-2 cm is allowed.
                </p>

                {/* Measurements Grid */}
                <div className="overflow-x-auto border border-neutral-100 rounded-lg">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-neutral-50/70 border-b border-neutral-100">
                        <th className="py-3.5 px-4 font-mono text-[9px] tracking-widest text-neutral-400 uppercase">DESCRIPTOR</th>
                        <th className="py-3.5 px-2 font-mono text-[10px] text-center font-bold">S</th>
                        <th className="py-3.5 px-2 font-mono text-[10px] text-center font-bold">M</th>
                        <th className="py-3.5 px-2 font-mono text-[10px] text-center font-bold">L</th>
                        <th className="py-3.5 px-2 font-mono text-[10px] text-center font-bold">XL</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 font-sans">
                      {getMeasurements().map((m, idx) => (
                        <tr key={idx} className="hover:bg-neutral-50/30 transition-colors">
                          <td className="py-3 px-4 font-black text-[10px] text-neutral-800 tracking-wider uppercase">{m.label}</td>
                          <td className="py-3 px-2 text-center text-neutral-500 font-mono">{m.s}</td>
                          <td className="py-3 px-2 text-center text-neutral-500 font-mono">{m.m}</td>
                          <td className="py-3 px-2 text-center text-neutral-500 font-mono">{m.l}</td>
                          <td className="py-3 px-2 text-center text-neutral-500 font-mono">{m.xl}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="inline-flex items-start space-x-2.5 bg-neutral-50 p-3.5 rounded-lg text-[10px] leading-relaxed text-neutral-500 font-sans border border-black/[0.02]">
                  <AlertCircle className="h-4 w-4 text-neutral-800 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>HEIGHT RECOMMENDATION:</strong> Models up to 175 cm tall select size S/M. Models from 175 to 185 cm tall — M/L. Heights above 185 cm tall will find an ideal fit in size L/XL.
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
