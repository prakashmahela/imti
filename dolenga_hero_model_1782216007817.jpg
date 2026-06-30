import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, ArrowRight, Instagram, ArrowUp, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    // Simulate real database registry saving
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      setEmail('');
    }, 1000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-[#EAE9E6] text-neutral-900 pt-20 pb-10 overflow-hidden font-sans select-none border-t border-black/10">
      {/* Heavy fine dark grit */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20views%3D%220%200%20200%20200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F200%2Fsvg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.8%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noise)%22%2F%3E%3C%2Fsvg%3E')]" />

      <div id="footer-container" className="mx-auto max-w-[1440px] px-6 md:px-12 relative z-10 flex flex-col space-y-16">
        
        {/* Upper Grid - Newsletter (Left) & Legal links (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-b border-black/10 pb-16">
          
          {/* Newsletter (5-cols) */}
          <div className="lg:col-span-6 flex flex-col justify-start space-y-4">
            <span className="text-[10px] font-mono tracking-[0.25em] text-neutral-500 uppercase">
              SUBSCRIBE TO ENCOUNTER
            </span>
            <h4 className="font-sans font-bold text-lg md:text-xl tracking-tight text-neutral-950 uppercase max-w-sm">
              Secures notifications of exclusive drops & offline showrooms.
            </h4>

            {/* Form */}
            <form onSubmit={handleSubscribe} className="relative w-full max-w-md pt-2">
              <div className="flex items-center border-b border-black/20 focus-within:border-black transition-all py-1.5">
                <Mail className="h-4 w-4 text-neutral-500 shrink-0" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="IDENTITY@CONNECT.COM"
                  disabled={subscribed || loading}
                  className="w-full bg-transparent border-none outline-none text-xs text-neutral-900 placeholder-neutral-400 px-3 uppercase tracking-widest font-mono"
                />
                
                <button
                  type="submit"
                  disabled={subscribed || loading}
                  className="text-white hover:bg-black transition-all cursor-pointer p-1 py-1 px-2.5 bg-neutral-900 border border-neutral-900 rounded-sm"
                  aria-label="Subscribe"
                >
                  {loading ? (
                    <span className="h-3 w-3 block rounded-full border-r border-[#999] animate-spin" />
                  ) : (
                    <ArrowRight className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>

              {/* Status Feedbacks */}
              <AnimatePresence>
                {subscribed && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center space-x-1.5 font-mono text-[9px] text-emerald-600 uppercase font-semibold mt-3"
                  >
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>SUCCESS_ LOCAL ENTRY INSCRIBED IN REGISTRY</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          {/* Links columns - Right (6-cols / 3 columns) */}
          <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-8 text-xs font-mono uppercase tracking-[0.10em] text-neutral-500 font-medium font-mono">
            
            {/* Column 1 - Collection */}
            <div className="space-y-4">
              <h5 className="text-black text-[10px] tracking-widest font-semibold font-sans">
                COLLECTION_
              </h5>
              <ul className="space-y-2.5">
                <li><a href="#uniform-section" className="hover:text-black transition-all">THE OUTCAST</a></li>
                <li><a href="#shop-section" className="hover:text-black transition-all">SHOP BASELINE</a></li>
                <li><a href="#grid-section" className="hover:text-black transition-all">EDITORIALS</a></li>
                <li><a href="#story-section" className="hover:text-black transition-all">THE SOCIETY</a></li>
              </ul>
            </div>

            {/* Column 2 - Legal */}
            <div className="space-y-4">
              <h5 className="text-black text-[10px] tracking-widest font-semibold font-sans">
                LEGALITY_
              </h5>
              <ul className="space-y-2.5">
                <li><a href="#" className="hover:text-black transition-all">PRIVACY INDEX</a></li>
                <li><a href="#" className="hover:text-black transition-all">SHIPMENT CODE</a></li>
                <li><a href="#" className="hover:text-black transition-all">TERMS & REGISTRY</a></li>
                <li><a href="#" className="hover:text-black transition-all">DUTIES COMPLIANCE</a></li>
              </ul>
            </div>

            {/* Column 3 - Dept */}
            <div className="space-y-4 col-span-2 md:col-span-1">
              <h5 className="text-black text-[10px] tracking-widest font-semibold font-sans">
                STUDIO DEPT_
              </h5>
              <ul className="space-y-2.5">
                <li><a href="#" className="hover:text-black transition-all flex items-center space-x-1">
                  <Instagram className="h-3.5 w-3.5" />
                  <span>INSTAGRAM</span>
                </a></li>
                <li><a href="#" className="hover:text-black transition-all">SHOWROOM NY</a></li>
                <li><a href="#" className="hover:text-black transition-all">SHOWROOM LDN</a></li>
                <li><a href="#" className="hover:text-black transition-all">ENCRYPT SYNC</a></li>
              </ul>
            </div>

          </div>
        </div>

        {/* Lower row - Copyright logo and back to top */}
        <div className="flex flex-col md:flex-row items-center justify-between font-mono text-[9px] tracking-widest text-neutral-500">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-8">
            <span className="text-black font-sans font-bold tracking-[0.3em] uppercase">SOCIETY STUDIOS™</span>
            <span>SYSTEM DIRECTORY v2.06</span>
            <span>© {new Date().getFullYear()} SOCIETY STUDIOS. ALL ENTRIES REGISTERED.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="mt-6 md:mt-0 flex items-center space-x-1 px-3 py-1 bg-neutral-900 hover:bg-black text-white hover:scale-105 transition-all uppercase cursor-pointer rounded-sm text-[9px] tracking-widest"
          >
            <span>BACK_TO_TOP_</span>
            <ArrowUp className="h-3 w-3" />
          </button>
        </div>

      </div>
    </footer>
  );
}
