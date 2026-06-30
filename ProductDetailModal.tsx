import { useState, useEffect } from 'react';
import { ShoppingBag, Search, ShieldCheck, Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, SocietyPass } from '../types';
import { ApiClient } from '../lib/api';

interface HeaderProps {
  cart: CartItem[];
  savedPass: SocietyPass | null;
  onOpenCart: () => void;
  onOpenPassViewer: () => void;
  onOpenEnterSociety: () => void;
  searchVal?: string;
  onSearchChange?: (val: string) => void;
  currentPage?: 'home' | 'dolenga';
  onPageChange?: (page: 'home' | 'dolenga') => void;
  onOpenBlog?: () => void;
}

export default function Header({
  cart,
  savedPass,
  onOpenCart,
  onOpenPassViewer,
  onOpenEnterSociety,
  searchVal: propSearchVal,
  onSearchChange,
  currentPage,
  onPageChange,
  onOpenBlog,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [localSearchVal, setLocalSearchVal] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = () => {
      setCurrentUser(ApiClient.getUser());
    };
    checkUser();
    const interval = setInterval(checkUser, 1000);
    return () => clearInterval(interval);
  }, []);

  const searchVal = propSearchVal !== undefined ? propSearchVal : localSearchVal;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 border-b border-black/5 py-4 backdrop-blur-md'
            : 'bg-transparent py-6'
        }`}
      >
        <div id="nav-container" className="w-full flex items-center justify-between px-4 md:px-8">
          {/* Left: Navigation links - Desktop */}
          <nav className="hidden lg:flex items-center space-x-3.5 xl:space-x-5 text-[9px] xl:text-[10px] font-semibold tracking-[0.14em] xl:tracking-[0.2em] uppercase">
            <button
              onClick={() => scrollToSection('uniform-section')}
              className={`transition-colors cursor-pointer ${
                scrolled ? 'text-neutral-600 hover:text-black' : 'text-neutral-400 hover:text-white'
              }`}
            >
              THE OUTCAST
            </button>
            <button
              onClick={() => scrollToSection('grid-section')}
              className={`transition-colors cursor-pointer ${
                scrolled ? 'text-neutral-600 hover:text-black' : 'text-neutral-400 hover:text-white'
              }`}
            >
              EDITORIAL
            </button>
            <button
              onClick={() => scrollToSection('shop-section')}
              className={`transition-colors cursor-pointer ${
                scrolled ? 'text-neutral-600 hover:text-black' : 'text-neutral-400 hover:text-white'
              }`}
            >
              SHOP
            </button>
            <button
              onClick={() => scrollToSection('story-section')}
              className={`transition-colors cursor-pointer ${
                scrolled ? 'text-neutral-600 hover:text-black' : 'text-neutral-400 hover:text-white'
              }`}
            >
              THE SOCIETY
            </button>
            <button
              onClick={() => onOpenBlog?.()}
              className={`transition-colors cursor-pointer ${
                scrolled ? 'text-neutral-600 hover:text-black' : 'text-neutral-400 hover:text-white'
              }`}
            >
              BLOG
            </button>
          </nav>

          {/* Left: Hamburger menu - Mobile */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className={`flex lg:hidden transition-colors cursor-pointer ${
              scrolled ? 'text-neutral-700 hover:text-black' : 'text-neutral-400 hover:text-white'
            }`}
            aria-label="Open Menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Center: Brand Identity */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-auto">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group cursor-pointer flex flex-col items-center"
            >
              <span className={`font-sans font-bold text-base md:text-xl tracking-[0.45em] uppercase pl-[0.45em] transition-all group-hover:tracking-[0.5em] ${
                scrolled ? 'text-black' : 'text-white'
              }`}>
                SOCIETY STUDIOS
              </span>
              <span className="text-[7px] text-neutral-500 font-mono tracking-[0.4em] uppercase opacity-0 group-hover:opacity-100 transition-opacity pl-[0.45em]">
                ACCESS THE NEW LAYER
              </span>
            </button>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-6 md:space-x-8">
            {/* Search toggler */}
            <div className="relative flex items-center">
              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 180, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="overflow-hidden mr-2"
                  >
                    <input
                      type="text"
                      placeholder="SEARCH EXCLUSIVE ACCESS..."
                      value={searchVal}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (propSearchVal === undefined) {
                          setLocalSearchVal(val);
                        }
                        if (onSearchChange) {
                          onSearchChange(val);
                        }
                        if (val.trim().length > 0) {
                          scrollToSection('shop-section');
                        }
                      }}
                      className={`w-full border-none outline-none text-[10px] tracking-wider px-3 py-1 uppercase rounded-sm border ${
                        scrolled
                          ? 'bg-neutral-100 text-black border-black/10'
                          : 'bg-neutral-900 text-white border-white/10'
                      }`}
                      autoFocus
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`transition-colors cursor-pointer p-1 ${
                  scrolled ? 'text-neutral-600 hover:text-black' : 'text-neutral-400 hover:text-white'
                }`}
                aria-label="Search Catalog"
              >
                <Search className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Society Entrance / Premium Access Button */}
            <button
              onClick={onOpenEnterSociety}
              className={`flex items-center space-x-1.5 transition-colors cursor-pointer font-mono text-[9px] tracking-widest uppercase hidden md:flex border px-2.5 py-1 rounded-sm ${
                currentUser
                  ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/10'
                  : scrolled
                    ? 'border-black/10 text-neutral-600 hover:text-black hover:border-black'
                    : 'border-white/10 text-neutral-400 hover:text-white'
              }`}
              title="Access Portal"
            >
              <User className={`h-3 w-3 ${currentUser ? 'text-emerald-400 animate-pulse' : ''}`} />
              <span>{currentUser ? `${currentUser.role}_` : 'ACCESS'}</span>
            </button>

            {/* Bag Button */}
            <button
              onClick={onOpenCart}
              className={`relative flex items-center p-1 transition-colors cursor-pointer ${
                scrolled ? 'text-neutral-700 hover:text-black' : 'text-neutral-400 hover:text-white'
              }`}
              aria-label="Open Shopping Cart"
            >
              <ShoppingBag className="h-4.5 w-4.5" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className={`absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full text-[8px] font-bold ${
                      scrolled ? 'bg-black text-white' : 'bg-white text-black'
                    }`}
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Side Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            {/* Menu panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
              className="fixed bottom-0 left-0 top-0 z-50 w-full max-w-[320px] bg-black p-8 flex flex-col justify-between border-r border-white/5"
            >
              <div>
                <div id="mobile-menu-hdr" className="flex items-center justify-between mb-16">
                  <span className="font-sans font-bold text-sm tracking-[0.3em] text-white">
                    SOCIETY STUDIOS
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <nav className="flex flex-col space-y-6 text-sm font-semibold tracking-[0.25em] uppercase text-neutral-400 pl-2">
                  <button
                    onClick={() => scrollToSection('uniform-section')}
                    className="text-left text-neutral-300 hover:text-white transition-colors cursor-pointer py-1"
                  >
                    THE OUTCAST
                  </button>
                  <button
                    onClick={() => scrollToSection('grid-section')}
                    className="text-left text-neutral-300 hover:text-white transition-colors cursor-pointer py-1"
                  >
                    EDITORIAL
                  </button>
                  <button
                    onClick={() => scrollToSection('shop-section')}
                    className="text-left text-neutral-300 hover:text-white transition-colors cursor-pointer py-1"
                  >
                    SHOP
                  </button>
                  <button
                    onClick={() => scrollToSection('story-section')}
                    className="text-left text-neutral-300 hover:text-white transition-colors cursor-pointer py-1"
                  >
                    THE SOCIETY
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenBlog?.();
                    }}
                    className="text-left text-neutral-300 hover:text-white transition-colors cursor-pointer py-1"
                  >
                    BLOG
                  </button>
                  
                  {savedPass ? (
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenEnterSociety();
                      }}
                      className="text-left text-emerald-400 hover:text-white transition-colors cursor-pointer py-1 font-mono text-xs tracking-widest uppercase flex items-center space-x-1"
                    >
                      <span>● MY PROFILE / ACCESS</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenEnterSociety();
                      }}
                      className="text-left text-neutral-400 hover:text-white transition-colors cursor-pointer py-1 font-mono text-xs tracking-widest uppercase"
                    >
                      REQUEST MEMBERSHIP
                    </button>
                  )}
                </nav>
              </div>

              <div id="mobile-menu-ftr" className="border-t border-white/10 pt-8 font-mono text-[9px] tracking-widest text-neutral-500">
                <p>ACCESS TIER: UNVERIFIED</p>
                <p className="mt-1">© 2026 SOCIETY STUDIOS</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
