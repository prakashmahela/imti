import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface DolengaCollectionBannerProps {
  onEnterCollection: () => void;
}

export default function DolengaCollectionBanner({ onEnterCollection }: DolengaCollectionBannerProps) {
  return (
    <section className="w-full bg-[#EDEDEA] py-20 px-6 md:px-12 border-y border-black/5 select-none relative overflow-hidden">
      {/* Background large ambient letter */}
      <div className="absolute top-1/2 -translate-y-1/2 -right-16 text-[180px] md:text-[340px] font-black tracking-tighter text-black/[0.015] leading-none uppercase pointer-events-none font-sans">
        DOLENGA
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column Text details */}
        <div className="lg:col-span-6 space-y-6 md:space-y-8">
          <div className="inline-flex items-center space-x-2 bg-white/80 text-black text-[9px] tracking-[0.2em] font-extrabold px-3.5 py-1.5 rounded-full uppercase border border-black/5">
            <Sparkles className="h-3 w-3 text-yellow-500 animate-pulse" />
            <span>EXCLUSIVITY COLLABORATION 2023</span>
          </div>

          <div className="space-y-3">
            <h3 className="font-sans font-black text-4xl md:text-5.5xl text-neutral-900 tracking-tight leading-[0.95] uppercase">
              DOLENGA <br />
              <span className="text-neutral-500 text-3xl md:text-5xl font-extrabold">STUDIOS LIMIT-RELEASE</span>
            </h3>
            <p className="text-xs md:text-sm font-semibold tracking-widest text-neutral-400 font-mono">
              SANKT-PETERBURG ST. // LEVEL 01
            </p>
          </div>

          <p className="text-sm text-neutral-600 max-w-md leading-relaxed">
            Experience absolute freedom of movement with the new premium apparel line from <strong>DOLENGA WEAR</strong>. Heavyweight oversized silhouettes, highly durable wear-resistant knit fabrics of up to 500 GSM, and a minimalist design reflecting the street aesthetics of St. Petersburg.
          </p>

          <button
            onClick={onEnterCollection}
            className="group flex items-center space-x-3 bg-neutral-950 text-white font-bold text-[11px] tracking-[0.25em] uppercase px-8 py-4.5 rounded-full hover:bg-neutral-800 transition-all cursor-pointer shadow-md active:scale-[0.98]"
          >
            <span>SHOP COLLECTION</span>
            <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Right Column Imagery Frame */}
        <div className="lg:col-span-6 flex justify-center">
          <div 
            onClick={onEnterCollection}
            className="relative w-full max-w-[500px] aspect-[16/10] sm:aspect-[16/9] md:aspect-[2/1] lg:aspect-[1.5/1] rounded-xl overflow-hidden shadow-xl border border-white bg-neutral-200 group cursor-pointer"
          >
            <img
              src="https://i.ibb.co/tTNkjDqy/Whats-App-Image-2026-06-23-at-6-48-24-PM.jpg"
              alt="Dolenga wear tracksuits summer lookbook camp"
              className="object-cover w-full h-full filter brightness-95 grayscale hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
            {/* Soft inner vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-5" />
            <div className="absolute bottom-5 left-5 text-white">
              <span className="block text-[8px] font-mono tracking-widest uppercase text-neutral-300">LOOKBOOK EDITION</span>
              <span className="block text-xs font-bold uppercase mt-0.5">SUMMER COLLECTION 2023</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
