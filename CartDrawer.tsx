import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  heroImage: string;
  onShopClick: () => void;
  onEnterSocietyClick: () => void;
}

export default function Hero({ heroImage, onShopClick, onEnterSocietyClick }: HeroProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="hero-section"
      className="relative h-[82vh] min-h-[550px] w-full overflow-hidden bg-black flex items-center justify-center text-white"
    >
      {/* Editorial Parallax Image container */}
      <div
        className="absolute inset-0 w-full h-[120%] pointer-events-none"
        style={{
          transform: `translateY(${scrollY * 0.15}px)`,
          transition: 'transform 0.05s linear',
        }}
      >
        <img
          src={heroImage}
          alt="Society Studios Campaign Portrait"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center grayscale brightness-[0.7] md:scale-105"
        />
        {/* Editorial Fine Grain overlay & radial vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.1),rgba(0,0,0,0.85))]" />
        <div className="absolute inset-0 opacity-[0.04] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20views%3D%220%200%20200%20200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F200%2Fsvg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.8%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noise)%22%2F%3E%3C%2Fsvg%3E')]" />
      </div>

      {/* Content overlay */}
      <div id="hero-content" className="relative z-10 max-w-6xl px-6 md:px-12 text-center flex flex-col items-center justify-center select-none w-full h-full pt-16">
        {/* Brand label */}
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-neutral-400 text-xs md:text-sm font-medium tracking-[0.45em] uppercase pl-[0.45em] mb-4"
        >
          SOCIETY STUDIOS
        </motion.span>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans font-semibold text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight text-white mb-10 max-w-5xl leading-[1.05]"
        >
          Made for the New Society
        </motion.h2>

        {/* Outlined Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md sm:max-w-none"
        >
          <button
            onClick={onShopClick}
            className="w-full sm:w-[180px] bg-white text-black border border-white hover:bg-neutral-900 hover:text-white transition-all cursor-pointer font-sans text-xs font-semibold tracking-[0.2em] py-4 uppercase h-[50px] flex items-center justify-center"
          >
            SHOP
          </button>
          
          <button
            onClick={onEnterSocietyClick}
            className="w-full sm:w-[220px] bg-transparent text-white border border-white/50 hover:border-white hover:bg-white/5 transition-all cursor-pointer font-sans text-xs font-semibold tracking-[0.2em] py-4 uppercase h-[50px] flex items-center justify-center pl-1"
          >
            ENTER THE SOCIETY
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6, y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-10 flex flex-col items-center space-y-2 text-[10px] tracking-[0.25em] text-neutral-400 font-mono"
        >
          <span>SCROLL DIRECTION</span>
          <ArrowDown className="h-4 w-4 text-neutral-400" />
        </motion.div>
      </div>
    </section>
  );
}
