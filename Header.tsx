import React from 'react';

interface BrandStoryProps {
  storyImage: string;
}

export default function BrandStory({
  storyImage,
}: BrandStoryProps) {
  return (
    <section
      id="story-section"
      className="relative w-full min-h-[40vh] sm:min-h-[60vh] bg-black text-white py-10 sm:py-16 px-6 md:px-12 flex items-center justify-center overflow-hidden font-sans select-none"
    >
      {/* Background Cinematic image */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={storyImage}
          alt="Society Studios Brutalist Lounge"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover grayscale brightness-[0.35]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.1),rgba(0,0,0,0.9))]" />
        {/* Film grain overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20views%3D%220%200%20200%20200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F200%2Fsvg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.8%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noise)%22%2F%3E%3C%2Fsvg%3E')]" />
      </div>

      <div id="story-container" className="relative z-10 mx-auto max-w-[700px] w-full text-center flex flex-col items-center justify-center space-y-4 sm:space-y-8">
        
        <div className="space-y-4">
          <span className="text-[10px] font-mono tracking-[0.3em] text-neutral-500 uppercase">
            PHILOSOPHY & MANIFESTO
          </span>
          <h2 className="font-sans font-semibold text-2xl sm:text-5xl md:text-6xl tracking-tight text-white uppercase leading-none">
            calvin klein
          </h2>
          <p className="text-xs font-mono tracking-widest text-[#999] uppercase">
            ACCESS IS GRANTED AFTER PURCHASE.
          </p>
        </div>

        <div className="space-y-6 text-sm sm:text-base text-neutral-300 tracking-wide uppercase leading-relaxed font-sans max-w-2xl px-4">
          <p>
            We believe in deliberate scarcity, sculptural geometry, and structural architecture. Every item we output holds a cryptographic registry node that connects you to the Society network.
          </p>
          <p>
            Purchase is not simply an e-commerce milestone; it is the absolute gateway. Upon order confirmation, your unique digital Society Pass compiles, granting access to restricted offline showcases, future drops, and members-only garments.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 text-[10px] font-mono text-neutral-600 tracking-[0.25em]">
          <span>SOCIETY DEPT / ESTABLISHED 2026</span>
          <div className="hidden sm:block h-[1px] w-8 bg-neutral-800" />
          <span>LEVEL_01_RECORDS</span>
        </div>

      </div>
    </section>
  );
}

