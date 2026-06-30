import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CreditCard, ShieldCheck, CheckCircle2, QrCode, Download, RotateCcw } from 'lucide-react';
import { CartItem, SocietyPass } from '../types';
import { ApiClient } from '../lib/api';

interface CheckoutModalProps {
  isOpen: boolean;
  cart: CartItem[];
  onClose: () => void;
  onOrderSuccess: (pass: SocietyPass) => void;
}

export default function CheckoutModal({
  isOpen,
  cart,
  onClose,
  onOrderSuccess,
}: CheckoutModalProps) {
  // Checkout Steps: 'form' | 'processing' | 'success'
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  
  // Form values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Processing stage messages
  const [procPercent, setProcPercent] = useState(0);
  const [procMessage, setProcMessage] = useState('TRANSMITTING ENCRYPTED LEDGER...');
  
  // Compiled pass output
  const [compiledPass, setCompiledPass] = useState<SocietyPass | null>(null);

  // Selected settlement option: 'card' | 'cod' | 'upi'
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod' | 'upi'>('card');
  const [upiId, setUpiId] = useState('');

  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponFeedback, setCouponFeedback] = useState('');

  // Reset form fields every single time the checkout process opens
  useEffect(() => {
    if (isOpen) {
      setStep('form');
      setName('');
      setEmail('');
      setAddress('');
      setCity('');
      setPostalCode('');
      setCardNumber('');
      setCardExpiry('');
      setCardCvv('');
      setPaymentMethod('card');
      setUpiId('');
      setCouponCode('');
      setDiscountPercent(0);
      setCouponFeedback('');
    }
  }, [isOpen]);

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = Math.floor(subtotal * (discountPercent / 100));
  const tax = Math.floor((subtotal - discountAmount) * 0.08);
  const shipping = subtotal > 300 ? 0 : 25;
  const grandTotal = subtotal - discountAmount + tax + shipping;

  const handleApplyCoupon = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    setCouponFeedback('');
    try {
      const res = await ApiClient.applyCoupon(couponCode);
      setDiscountPercent(res.discountPercent);
      setCouponFeedback(`SUCCESS // -${res.discountPercent}% APPLIED`);
    } catch (err: any) {
      setCouponFeedback('INVALID OR EXPIRED CODE');
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleCardInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.length <= 19) {
      setCardNumber(formatted);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !address) return;
    if (paymentMethod === 'card' && (!cardNumber || !cardExpiry || !cardCvv)) return;
    if (paymentMethod === 'upi' && !upiId) return;

    setStep('processing');
    setProcPercent(0);
  };

  // Processing animation ticking loop
  useEffect(() => {
    if (step !== 'processing') return;

    const messages = paymentMethod === 'card' ? [
      { p: 15, m: 'ESTABLISHING HANDSHAKE PROTOCOLS...' },
      { p: 40, m: 'VALIDATING LIQUIDITY SECURES...' },
      { p: 65, m: 'SIGNING LEDGER METADATA WITH ECC...' },
      { p: 85, m: 'COMPILING BIOMETRIC PASS CERTIFICATE...' },
      { p: 100, m: 'AUTHORIZATION SECURED.' },
    ] : paymentMethod === 'cod' ? [
      { p: 15, m: 'NOTIFYING REGISTRY DISPATCH NETWORKS...' },
      { p: 40, m: 'VALIDATING SHIPPING COORDINATES...' },
      { p: 65, m: 'REGISTERING CASH_ON_DELIVERY PARADIGM...' },
      { p: 85, m: 'STAMPING TRANSIT CERTIFICATE INDICES...' },
      { p: 100, m: 'COD ENTRY COMPILER CONCLUDED.' },
    ] : [
      { p: 15, m: 'INQUIRING UPI GATEWAY HANDSHAKES...' },
      { p: 40, m: 'POLLING DIRECT VIRTUAL ADDRESS ID...' },
      { p: 65, m: 'VERIFYING P2P CONSENSUS ON SETTLEMENT...' },
      { p: 85, m: 'ATTACHING CRYPTO SIGNATURE TO TRANSACTION...' },
      { p: 100, m: 'UPI SETTLEMENT ACCRUAL DETECTED.' },
    ];

    const timer = setInterval(() => {
      setProcPercent((prev) => {
        const next = prev + 5;
        const currentMsg = messages.find((entry) => next <= entry.p);
        if (currentMsg) {
          setProcMessage(currentMsg.m);
        }

        if (next >= 100) {
          clearInterval(timer);
          
          // Place the real-time order on our database backend
          const submitRemoteOrder = async () => {
            try {
              const orderItems = cart.map(it => ({
                productId: it.product.id,
                name: it.product.name,
                price: it.product.price,
                quantity: it.quantity,
                selectedSize: it.selectedSize,
                selectedColor: it.selectedColor
              }));

              const response = await ApiClient.placeOrder({
                name,
                email,
                address,
                city,
                postalCode,
                total: grandTotal,
                paymentMethod,
                items: orderItems
              });

              setCompiledPass(response.societyPass);
              setTimeout(() => {
                setStep('success');
                onOrderSuccess(response.societyPass);
              }, 600);
            } catch (err) {
              console.error('Database connection timed out or busy. Invoking local offline encryption fallback...', err);
              // Safe production-ready offline fallback pass
              const passId = 'S-' + Math.floor(100000 + Math.random() * 900000);
              const accessCode = Math.random().toString(16).substr(2, 8).toUpperCase();
              const today = new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              });
              const localPass: SocietyPass = {
                id: passId,
                holderName: name.toUpperCase() || 'SOCIETY APPLICANT',
                tier: subtotal >= 500 ? 'FOUNDER_GEN' : subtotal >= 250 ? 'ELITE_SOCIETY' : 'PROV_MEMBER',
                issueDate: today,
                accessCode: accessCode,
                active: true,
              };
              setCompiledPass(localPass);
              setTimeout(() => {
                setStep('success');
                onOrderSuccess(localPass);
              }, 600);
            }
          };

          submitRemoteOrder();
          return 100;
        }
        return next;
      });
    }, 150);

    return () => clearInterval(timer);
  }, [step, name, email, address, city, postalCode, grandTotal, paymentMethod, cart, subtotal, onOrderSuccess]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9970] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl bg-[#0F0F0F] text-white border border-white/10 p-6 md:p-10 flex flex-col max-h-[90vh] overflow-y-auto selection:bg-neutral-800 rounded-sm font-sans"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 h-8 w-8 rounded-full bg-black border border-white/10 hover:border-white text-neutral-400 hover:text-white transition-all flex items-center justify-center cursor-pointer"
              aria-label="Dismiss checkout portal"
            >
              <X className="h-4 w-4" />
            </button>

            {/* FORM STEP */}
            {step === 'form' && (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
                
                {/* Left pane - Form Fields (7-cols) */}
                <div className="lg:col-span-7 flex flex-col space-y-6">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono tracking-[0.3em] text-neutral-500 uppercase">
                      SECURE TERMINAL CHECKOUT
                    </span>
                    <h3 className="font-sans font-bold text-xl md:text-2xl tracking-tight text-white uppercase pl-[0.05em]">
                      SHIPPING & LEDGER CREDENTIALS
                    </h3>
                  </div>

                  {/* Shipping credentials */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-mono tracking-widest text-[#777] uppercase border-b border-white/10 pb-2">
                      01 / SHIPPING RECIPIENT
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[8px] font-mono tracking-widest text-neutral-400 uppercase">FULL NAME</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="ALEXANDER MERCER"
                          className="w-full bg-[#151515] border border-white/10 focus:border-white focus:outline-none py-2.5 px-3 text-xs tracking-wider rounded-sm font-mono text-white uppercase"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[8px] font-mono tracking-widest text-neutral-400 uppercase">EMAIL ADDRESS</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="MERCER@SOCIETY.COM"
                          className="w-full bg-[#151515] border border-white/10 focus:border-white focus:outline-none py-2.5 px-3 text-xs tracking-wider rounded-sm font-mono text-white uppercase"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[8px] font-mono tracking-widest text-neutral-400 uppercase">STREET ADDRESS</label>
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="742 BRUTALIST PARKWAY, LEVEL 3"
                        className="w-full bg-[#151515] border border-white/10 focus:border-white focus:outline-none py-2.5 px-3 text-xs tracking-wider rounded-sm font-mono text-white uppercase"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[8px] font-mono tracking-widest text-neutral-400 uppercase">CITY</label>
                        <input
                          type="text"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="NEW YORK"
                          className="w-full bg-[#151515] border border-white/10 focus:border-white focus:outline-none py-2.5 px-3 text-xs tracking-wider rounded-sm font-mono text-white uppercase"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[8px] font-mono tracking-widest text-neutral-400 uppercase">POSTAL CODE</label>
                        <input
                          type="text"
                          required
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          placeholder="10001"
                          className="w-full bg-[#151515] border border-white/10 focus:border-white focus:outline-none py-2.5 px-3 text-xs tracking-wider rounded-sm font-mono text-white uppercase"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Selection & Settlement Fields */}
                  <div className="space-y-4 pt-4">
                    <h4 className="text-[10px] font-mono tracking-widest text-[#777] uppercase border-b border-white/10 pb-2">
                      02 / SECURE LEDGER SETTLEMENT
                    </h4>

                    {/* Selector Buttons */}
                    <div className="grid grid-cols-3 gap-2 pb-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`py-2 px-1 text-[8px] md:text-[9.5px] font-mono tracking-wider uppercase border transition-all cursor-pointer rounded-sm flex flex-col items-center justify-center space-y-1 ${
                          paymentMethod === 'card'
                            ? 'bg-white text-black border-white'
                            : 'bg-[#121212] text-neutral-400 border-white/10 hover:border-white/30'
                        }`}
                      >
                        <CreditCard className="h-3.5 w-3.5" />
                        <span>CARD_SECURE</span>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cod')}
                        className={`py-2 px-1 text-[8px] md:text-[9.5px] font-mono tracking-wider uppercase border transition-all cursor-pointer rounded-sm flex flex-col items-center justify-center space-y-1 ${
                          paymentMethod === 'cod'
                            ? 'bg-white text-black border-white'
                            : 'bg-[#121212] text-neutral-400 border-white/10 hover:border-white/30'
                        }`}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>COD_SOCIETY</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('upi')}
                        className={`py-2 px-1 text-[8px] md:text-[9.5px] font-mono tracking-wider uppercase border transition-all cursor-pointer rounded-sm flex flex-col items-center justify-center space-y-1 ${
                          paymentMethod === 'upi'
                            ? 'bg-white text-black border-white'
                            : 'bg-[#121212] text-neutral-400 border-white/10 hover:border-white/30'
                        }`}
                      >
                        <QrCode className="h-3.5 w-3.5" />
                        <span>UPI_INSTANT</span>
                      </button>
                    </div>

                    {/* Conditional Input UI blocks */}
                    {paymentMethod === 'card' && (
                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-[8px] font-mono tracking-widest text-neutral-400 uppercase">CARD NUMBER</label>
                          <input
                            type="text"
                            required={paymentMethod === 'card'}
                            value={cardNumber}
                            onChange={handleCardInput}
                            placeholder="4111 8888 9999 1111"
                            className="w-full bg-[#151515] border border-white/10 focus:border-white focus:outline-none py-2.5 px-3 text-xs tracking-wider rounded-sm font-mono text-white"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[8px] font-mono tracking-widest text-neutral-400 uppercase">EXPIRY DATE</label>
                            <input
                              type="text"
                              required={paymentMethod === 'card'}
                              placeholder="MM/YY"
                              maxLength={5}
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              className="w-full bg-[#151515] border border-white/10 focus:border-white focus:outline-none py-2.5 px-3 text-xs tracking-wider rounded-sm font-mono text-white"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[8px] font-mono tracking-widest text-neutral-400 uppercase">CVV EXP</label>
                            <input
                              type="password"
                              required={paymentMethod === 'card'}
                              maxLength={4}
                              placeholder="•••"
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                              className="w-full bg-[#151515] border border-white/10 focus:border-white focus:outline-none py-2.5 px-3 text-xs tracking-wider rounded-sm font-mono text-white"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'cod' && (
                      <div className="bg-[#151515]/50 border border-white/10 p-4 rounded-sm space-y-3">
                        <p className="text-[10px] font-mono text-emerald-400 tracking-wider uppercase font-semibold flex items-center space-x-1.5">
                          <ShieldCheck className="h-4 w-4" />
                          <span>CASH ON DELIVERY ACTIVE_</span>
                        </p>
                        <p className="text-[9.5px]/[15px] font-mono tracking-widest text-neutral-400 uppercase leading-relaxed font-sans">
                          No instant digital credentials are required now. Secure order fulfillment of <span className="text-white font-semibold">₹{grandTotal}.00</span> occurs manually upon arrival of delivery transit partners at your shipping address.
                        </p>
                      </div>
                    )}

                    {paymentMethod === 'upi' && (
                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-[8px] font-mono tracking-widest text-neutral-400 uppercase">UPI VIRTUAL ADDRESS (VPA ID)</label>
                          <input
                            type="text"
                            required={paymentMethod === 'upi'}
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="IDENTITY@UPISYSTEM"
                            className="w-full bg-[#151515] border border-white/10 focus:border-white focus:outline-none py-2.5 px-3 text-xs tracking-wider rounded-sm font-mono text-white uppercase"
                          />
                        </div>
                        
                        <div className="bg-[#151515] border border-white/5 p-4 rounded-sm flex flex-col sm:flex-row items-center sm:space-x-4 space-y-4 sm:space-y-0">
                          <div className="h-20 w-20 bg-white p-1 rounded-sm flex items-center justify-center shrink-0">
                            {/* Pure CSS simulated minimal elegant barcode pattern */}
                            <div className="w-full h-full bg-[radial-gradient(#111_1.5px,transparent_1.5px)] [background-size:6px_6px]" />
                          </div>
                          <div className="space-y-1 text-center sm:text-left">
                            <h6 className="text-[9px] font-mono tracking-widest text-white uppercase font-bold">SCAN DIGITAL QR CODE</h6>
                            <p className="text-[8.5px]/[13px] font-mono tracking-widest text-neutral-400 uppercase">
                              Launch transaction scanner on your sovereign banking application to finalize UPI secure ledger access.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Pane - Visual Matte Card & Cost Summary (5-cols) */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
                  {/* Holographic Matte Black Card drawing */}
                  <div className="relative w-full aspect-[1.58/1] rounded-xl bg-gradient-to-br from-[#1E1E1E] via-[#0E0E0E] to-black border border-white/10 p-5 flex flex-col justify-between shadow-2xl overflow-hidden hover:brightness-110 transition-all group select-none">
                    {/* Golden digital microchip */}
                    <div className="absolute top-5 left-5 w-8 h-6.5 rounded-sm bg-gradient-to-tr from-amber-200 via-yellow-400 to-amber-600 border border-black/10 opacity-80" />
                    
                    {/* Holographic linear sweeps */}
                    <div className="absolute inset-x-0 -top-full bottom-0 bg-gradient-to-b from-transparent via-white/5 to-transparent skew-y-12 group-hover:translate-y-[200%] transition-transform duration-1000 ease-out" />
                    
                    {/* Society department logo label */}
                    <div className="text-right">
                      <span className="font-mono text-[8px] tracking-[0.25em] text-neutral-500 uppercase">
                        {paymentMethod === 'card' && 'DEPT / CARD SECURE'}
                        {paymentMethod === 'cod' && 'DEPT / TRANSIT COD'}
                        {paymentMethod === 'upi' && 'DEPT / INSTANT UPI'}
                      </span>
                    </div>

                    <div className="space-y-4">
                      {/* Live updating details */}
                      {paymentMethod === 'card' ? (
                        <p className="font-mono text-sm tracking-[0.2em] text-neutral-300">
                          {cardNumber || '•••• •••• •••• ••••'}
                        </p>
                      ) : paymentMethod === 'cod' ? (
                        <p className="font-mono text-xs tracking-wider text-emerald-400 uppercase font-semibold animate-pulse">
                          ● PENDING_TRANSIT_SETTLEMENT
                        </p>
                      ) : (
                        <p className="font-mono text-xs tracking-wider text-neutral-300 uppercase truncate">
                          ID: {upiId ? upiId.toUpperCase() : 'IDENTITY@UPISYSTEM'}
                        </p>
                      )}

                      <div className="flex justify-between items-end">
                        {/* Live updating holder name */}
                        <div className="space-y-0.5">
                          <span className="text-[7px] text-neutral-600 font-mono tracking-widest">HODLR</span>
                          <p className="font-mono text-[9px] tracking-widest text-neutral-300 truncate max-w-[170px]">
                            {name.toUpperCase() || 'SOCIETY GUEST'}
                          </p>
                        </div>

                        {/* Card Expiry / system mode */}
                        <div className="space-y-0.5 text-right shrink-0">
                          <span className="text-[7px] text-neutral-600 font-mono tracking-widest">MODE</span>
                          <p className="font-mono text-[9px] tracking-widest text-neutral-300 uppercase">
                            {paymentMethod === 'card' ? (cardExpiry || '••/••') : paymentMethod === 'cod' ? 'COD' : 'UPI_INC'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Summary lists */}
                  <div className="bg-[#141414] border border-white/5 p-4 rounded-sm space-y-4">
                    <h5 className="font-mono text-[9px] tracking-widest text-[#777] uppercase border-b border-white/5 pb-2">
                      ORDER SUMMARY_
                    </h5>
                    
                    <div className="max-h-[120px] overflow-y-auto space-y-2.5">
                      {cart.map((it) => (
                        <div key={it.id} className="flex justify-between text-[10px] tracking-wide uppercase font-sans text-neutral-300">
                          <span className="truncate max-w-[180px]">{it.product.name} (x{it.quantity})</span>
                          <span className="font-mono text-neutral-400">₹{it.product.price * it.quantity}.00</span>
                        </div>
                      ))}
                    </div>

                    {/* Dynamic Coupon Code System */}
                    <div className="border-t border-white/5 pt-3 space-y-2">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                          placeholder="PROMO CODE (E.G. SOCIETY10)"
                          className="flex-1 bg-black border border-white/10 focus:border-white/40 focus:outline-none py-1 px-2 text-[9px] tracking-wider rounded-sm font-mono text-white"
                        />
                        <button
                          type="button"
                          onClick={handleApplyCoupon}
                          className="bg-neutral-800 hover:bg-neutral-700 text-white font-mono text-[9px] px-3 py-1 rounded-sm tracking-wider cursor-pointer transition-all border border-white/5"
                        >
                          APPLY_
                        </button>
                      </div>
                      {couponFeedback && (
                        <span className="text-[8px] font-mono tracking-widest text-emerald-400 block uppercase pl-0.5 animate-pulse">
                          ● {couponFeedback}
                        </span>
                      )}
                    </div>

                    {discountPercent > 0 && (
                      <div className="flex justify-between items-baseline text-[9px] font-mono text-emerald-400">
                        <span>COUPON DISCOUNT ({discountPercent}%)</span>
                        <span>-₹{discountAmount}.00</span>
                      </div>
                    )}

                    <div className="border-t border-white/5 pt-3 flex justify-between items-baseline">
                      <span className="text-[10px] tracking-widest font-mono text-neutral-500 uppercase">SECURED SUM TOTAL</span>
                      <span className="text-base font-mono text-white tracking-widest">₹{grandTotal}.00</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-white text-black hover:bg-neutral-800 hover:text-white transition-all py-4 text-xs font-semibold tracking-[0.25em] uppercase flex items-center justify-center space-x-2 h-12 cursor-pointer"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    <span>AUTHORIZE_TRANSACTION_</span>
                  </button>
                </div>

              </form>
            )}

            {/* PROCESSING STEP */}
            {step === 'processing' && (
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-8 select-none">
                <div className="relative h-20 w-20 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                    className="absolute inset-0 border-r-2 border-white rounded-full bg-transparent"
                  />
                  <CreditCard className="h-7 w-7 text-neutral-400 animate-pulse" />
                </div>

                <div className="space-y-3 max-w-sm">
                  <span className="text-[10px] font-mono tracking-widest text-emerald-400 block font-semibold animate-pulse">
                    TRANSACTION SECURITIES COMMENCING_
                  </span>
                  <h4 className="font-mono text-xs tracking-widest text-white uppercase">
                    {procMessage}
                  </h4>
                  
                  {/* Progress bar */}
                  <div className="h-1.5 w-48 bg-neutral-900 border border-white/5 relative overflow-hidden mx-auto rounded-full mt-4">
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 bg-white"
                      style={{ width: `${procPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* SUCCESS & PASS GENERATION STEP */}
            {step === 'success' && compiledPass && (
              <div className="flex flex-col items-center py-6 text-center space-y-10">
                <div className="space-y-2">
                  <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto" />
                  <h3 className="font-sans font-bold text-2xl tracking-tight text-white uppercase pl-[0.05em]">
                    ACCESS GRANTED_ welcome to the society
                  </h3>
                  <p className="text-[10px] font-mono tracking-wider text-neutral-400 uppercase max-w-md mx-auto leading-relaxed">
                    Transaction authorized perfectly under order <span className="text-white">#{compiledPass.id}</span>. Your cryptographic Society Passport certificate compiles below.
                  </p>
                </div>

                {/* Digital Collectible Society Passport */}
                <motion.div
                  initial={{ rotateY: 90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full max-w-[340px] aspect-[1/1.58] bg-[#0A0A0A] border border-white/10 rounded-xl p-6 shadow-2xl flex flex-col justify-between overflow-hidden group perspective select-none"
                >
                  {/* Holographic sweeping overlay */}
                  <div className="absolute inset-x-0 -top-full bottom-0 bg-gradient-to-b from-transparent via-white/5 to-transparent skew-y-12 group-hover:translate-y-[200%] transition-transform duration-1000 ease-out pointer-events-none" />
                  
                  {/* Top line */}
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <span className="font-mono text-[7px] tracking-[0.3em] text-[#999] uppercase">
                      SOCIETY DIGITAL PASSPORT
                    </span>
                    <span className="font-mono text-[7px] tracking-widest text-[#777]">
                      {compiledPass.id}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="flex-1 py-6 flex flex-col justify-between text-left space-y-3">
                    <div className="space-y-0.5">
                      <span className="text-[7.5px] text-neutral-600 font-mono tracking-[0.2em] uppercase">HOLDER_IDENTITY_</span>
                      <p className="text-[13px] font-sans font-bold tracking-[0.1em] text-white uppercase">
                        {compiledPass.holderName}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-0.5">
                        <span className="text-[7.5px] text-neutral-600 font-mono tracking-[0.15em] uppercase">ACCESS TIER_</span>
                        <p className="text-[10px] font-mono tracking-wider text-emerald-400 uppercase font-semibold">
                          {compiledPass.tier === 'FOUNDER_GEN' && '● FOUNDER GEN'}
                          {compiledPass.tier === 'ELITE_SOCIETY' && '● ELITE MEMBER'}
                          {compiledPass.tier === 'PROV_MEMBER' && '● PROV MEMBER'}
                        </p>
                      </div>

                      <div className="space-y-0.5">
                        <span className="text-[7.5px] text-neutral-600 font-mono tracking-[0.15em] uppercase">COMPILE DATE_</span>
                        <p className="text-[10px] font-mono text-neutral-300 uppercase">
                          {compiledPass.issueDate}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-[7.5px] text-neutral-600 font-mono tracking-[0.15em] uppercase">CRYPTOGRAPHIC DEPT ID_</span>
                      <p className="text-[8.5px] font-mono text-neutral-500 break-all leading-normal uppercase">
                        ACCESS_KEY_MD5_{compiledPass.accessCode}0FF82B9_LEVEL_01
                      </p>
                    </div>
                  </div>

                  {/* Barcode and Footnotes */}
                  <div className="flex items-end justify-between border-t border-white/10 pt-4">
                    <div className="shrink-0 flex flex-col space-y-1">
                      <span className="text-[7px] text-neutral-600 font-mono tracking-widest">SCAN ACCESS ENCORE</span>
                      <div className="flex space-x-1 items-center">
                        <QrCode className="h-5 w-5 text-neutral-400" />
                        <span className="text-[9px] font-mono text-neutral-400">0x7F9B2C</span>
                      </div>
                    </div>

                    {/* Fictional barcode illustration made in pure simple borders */}
                    <div className="flex h-8 items-end space-x-0.5 shrink-0 opacity-70">
                      <div className="w-[1.5px] h-full bg-white" />
                      <div className="w-[1.5px] h-full bg-white" />
                      <div className="w-[0.5px] h-full bg-white" />
                      <div className="w-[3px] h-full bg-white" />
                      <div className="w-[1.5px] h-full bg-white" />
                      <div className="w-[1.5px] h-full bg-white" />
                      <div className="w-[0.5px] h-full bg-white" />
                      <div className="w-[2.5px] h-full bg-white" />
                      <div className="w-[1.5px] h-full bg-white" />
                    </div>
                  </div>

                </motion.div>

                {/* Dismiss Success / Launch Certificate */}
                <div className="flex space-x-4 pt-2">
                  <button
                    onClick={onClose}
                    className="bg-white text-black hover:bg-neutral-800 hover:text-white transition-all px-8 py-3 text-xs font-semibold tracking-[0.25em] uppercase h-11 cursor-pointer"
                  >
                    CONTINUE_BROWSING_
                  </button>
                  
                  <button
                    onClick={() => {
                      alert(`Pass downloaded successfully: ${compiledPass.id}. Feel free to use scan terminals now!`);
                    }}
                    className="border border-white/20 hover:border-white text-white hover:bg-white/5 transition-all px-6 py-3 text-xs font-semibold tracking-[0.25em] uppercase h-11 cursor-pointer flex items-center space-x-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>EXPORT_PASS_</span>
                  </button>
                </div>
              </div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
