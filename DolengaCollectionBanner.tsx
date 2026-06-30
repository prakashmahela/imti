import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  cart: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (id: string, amount: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  cart,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartDrawerProps) {
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const estimatedShipping = subtotal > 300 ? 0 : 25;
  const estimatedTax = Math.floor(subtotal * 0.08);
  const grandTotal = subtotal + estimatedShipping + estimatedTax;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[9950] bg-black/70 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-0 right-0 top-0 z-[9960] h-full w-full max-w-[450px] bg-[#111111] border-l border-white/10 p-6 md:p-8 flex flex-col justify-between font-sans text-white select-none shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <div className="flex items-center space-x-2.5">
                <span className="font-sans font-bold text-base tracking-[0.2em] text-white uppercase pl-0.5">
                  SHOPPING BAG_
                </span>
                <span className="font-mono text-[9px] tracking-widest text-[#777]">
                  ( {cart.reduce((ac, it) => ac + it.quantity, 0)} STAPLES )
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-neutral-400 hover:text-white transition-colors cursor-pointer p-1"
                aria-label="Dismiss Shopping Bag"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* List entries */}
            <div className="flex-1 overflow-y-auto py-6 space-y-6 scrollbar-thin">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <span className="text-[10px] tracking-[0.2em] font-mono text-neutral-500 uppercase">
                    YOUR BAG IS EMPTY
                  </span>
                  <p className="text-xs text-neutral-400 uppercase tracking-widest leading-relaxed max-w-[240px]">
                    Acquire deliberate architectural staples from our collection database to load them here.
                  </p>
                  <button
                    onClick={onClose}
                    className="border border-white/20 hover:border-white text-[10px] tracking-widest font-mono uppercase bg-transparent px-4 py-2 hover:bg-white/5 transition-all cursor-pointer"
                  >
                    CONTINUE BROWSING_
                  </button>
                </div>
              ) : (
                cart.map((item) => {
                  const itemTotal = item.product.price * item.quantity;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-start justify-between border-b border-white/5 pb-6"
                    >
                      {/* Product thumb */}
                      <div className="h-20 w-16 bg-neutral-900 overflow-hidden shrink-0 border border-white/5">
                        <img
                          src={item.product.imagePrimary}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover grayscale"
                        />
                      </div>

                      {/* Content parameters */}
                      <div className="flex-1 ml-4 flex flex-col justify-between h-auto space-y-2">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="text-xs font-semibold tracking-wide uppercase text-neutral-200">
                              {item.product.name}
                            </h4>
                            <span className="text-xs font-mono text-white pl-2">
                              {item.product.currencySymbol || '₹'}{itemTotal.toLocaleString('en-IN')}
                            </span>
                          </div>

                          <p className="text-[9px] font-mono tracking-widest text-[#777] uppercase mt-1">
                            SIZE: {item.selectedSize} / COLOR: {item.selectedColor}
                          </p>
                        </div>

                        {/* Adjust indicators / trash */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-white/10 rounded-sm">
                            <button
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="h-6 w-6 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
                              aria-label="Reduce count"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="text-xs font-mono w-6 text-center text-white">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="h-6 w-6 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
                              aria-label="Increase count"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-neutral-500 hover:text-red-400 transition-all cursor-pointer p-1"
                            aria-label="Erase staple item"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Base Sum totals section */}
            {cart.length > 0 && (
              <div className="border-t border-white/10 pt-6 space-y-4">
                <div className="space-y-1.5 font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
                  <div className="flex justify-between">
                    <span>BAG SUBTOTAL</span>
                    <span className="text-white">{cart[0]?.product.currencySymbol || '₹'}{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  
                  <div className="flex justify-between text-[9px] text-[#777]">
                    <span>SECURE SHIPMENT (EU / USA)</span>
                    <span className="text-white">
                      {estimatedShipping === 0 ? 'COMPLIMENTARY' : `${cart[0]?.product.currencySymbol || '₹'}${estimatedShipping.toLocaleString('en-IN')}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-[9px] text-[#777]">
                    <span>TAXES & EXPEDITED DUTIES</span>
                    <span className="text-white">{cart[0]?.product.currencySymbol || '₹'}{estimatedTax.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Grand total */}
                <div className="flex justify-between items-baseline border-t border-white/5 pt-3 mb-1">
                  <span className="text-xs font-semibold tracking-widest text-[#ccc]">EST_SECURE_TOTAL</span>
                  <span className="text-lg font-mono text-white tracking-widest">{cart[0]?.product.currencySymbol || '₹'}{grandTotal.toLocaleString('en-IN')} INR</span>
                </div>

                <div className="flex items-center space-x-1 font-mono text-[8px] tracking-[0.15em] text-[#999] uppercase pt-1 line-clamp-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>SOCIETY CERTIFICATE ACCRUES TO HOLDER PORTAL ON PURCHASE</span>
                </div>

                {/* Checkout Trigger button */}
                <button
                  onClick={onCheckout}
                  className="w-full bg-white text-black hover:bg-neutral-800 hover:text-white transition-all py-4 text-xs font-semibold tracking-[0.25em] uppercase flex items-center justify-center space-x-2 h-12 cursor-pointer mt-2"
                >
                  <span>PROCEED_TO_CHECKOUT_</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
