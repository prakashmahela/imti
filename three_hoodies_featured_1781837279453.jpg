import { motion } from 'motion/react';

interface EditorialGridProps {
  imageLeft: string;
  imageHoverLeft?: string;
  imageRight: string;
  imageHoverRight?: string;
}

export default function EditorialGrid({ imageLeft, imageHoverLeft, imageRight, imageHoverRight }: EditorialGridProps) {
  return (
    <section
      id="grid-section"
      className="relative w-full bg-[#F5F5F3] text-neutral-900 py-8 md:py-20 overflow-hidden selection:bg-neutral-200"
    >
      {/* Soft grain background */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20views%3D%220%200%20200%20200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F200%2Fsvg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.8%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noise)%22%2F%3E%3C%2Fsvg%3E')]" />

      <div id="grid-container" className="mx-auto max-w-6xl px-6 md:px-12 flex flex-col space-y-4 md:space-y-8">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-black/10 pb-3 md:pb-6">
          <div>
            <span className="text-[8px] sm:text-[10px] font-mono tracking-[0.25em] text-neutral-500 uppercase">
              STUDIO EDITION / 01
            </span>
            <h3 className="font-sans font-medium text-lg sm:text-2xl md:text-3xl tracking-tight text-black mt-0.5 sm:mt-1 uppercase">
              calvin klein
            </h3>
          </div>
          <p className="text-[10px] sm:text-xs tracking-widest text-neutral-600 font-sans mt-2 md:mt-0 max-w-sm md:text-right uppercase leading-relaxed">
            Constructed from 500 GSM loopback cotton. Generously dropped shoulders. Double felted hoods. Engineered in high-contrast luxury silhouette.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-2 gap-4 md:gap-8 items-start max-w-[760px] mx-auto w-full">
          {/* Column 1 - Left - Crop/Closeup Detail */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="group relative cursor-pointer overflow-hidden aspect-[3/4]"
          >
            <div className="absolute inset-0 bg-neutral-900 overflow-hidden">
              <motion.img
                src={imageLeft}
                alt="Society Studios Fabric Closeup"
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover grayscale transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:brightness-105 ${imageHoverLeft ? 'group-hover:opacity-0' : ''}`}
              />
              {imageHoverLeft && (
                <motion.img
                  src={imageHoverLeft}
                  alt="Society Studios Fabric Closeup Hover"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-0 group-hover:opacity-100 transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:brightness-105"
                />
              )}
            </div>
            {/* Minimal overlay annotation */}
            <div className="absolute inset-x-0 bottom-0 p-2.5 md:p-8 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col sm:flex-row sm:items-end justify-end sm:justify-between gap-1">
              <div className="flex flex-col space-y-0.5 sm:space-y-2">
                <span className="font-sans text-[8px] sm:text-xs font-semibold tracking-widest uppercase text-neutral-300">
                  CLOSE FIT ANALYSIS
                </span>
                <span className="font-mono text-[6px] sm:text-[9px] tracking-wider uppercase text-neutral-400">
                  REF: S01-BLK / FRONT
                </span>
              </div>
              <span className="self-start sm:self-auto font-mono text-[6px] sm:text-[10px] text-white/50 border border-white/10 px-1 sm:px-2 py-0.5 sm:py-1 uppercase rounded-sm shrink-0">
                500 GSM
              </span>
            </div>
          </motion.div>

          {/* Column 2 - Right - Hoodie Back View */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="group relative cursor-pointer overflow-hidden aspect-[3/4] md:translate-y-12"
          >
            <div className="absolute inset-0 bg-neutral-900 overflow-hidden">
              <motion.img
                src={imageRight}
                alt="Society Studios Back Embroidery"
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover grayscale transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:brightness-105 ${imageHoverRight ? 'group-hover:opacity-0' : ''}`}
              />
              {imageHoverRight && (
                <motion.img
                  src={imageHoverRight}
                  alt="Society Studios Back Embroidery Hover"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-0 group-hover:opacity-100 transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:brightness-105"
                />
              )}
            </div>
            {/* Minimal overlay annotation */}
            <div className="absolute inset-x-0 bottom-0 p-2.5 md:p-8 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col sm:flex-row sm:items-end justify-end sm:justify-between gap-1">
              <div className="flex flex-col space-y-0.5 sm:space-y-2">
                <span className="font-sans text-[8px] sm:text-xs font-semibold tracking-widest uppercase text-neutral-300">
                  calvin klein cotton black blend fleece hoodie
                </span>
                <span className="font-mono text-[6px] sm:text-[9px] tracking-wider uppercase text-neutral-400">
                  DEBOSSED EMBROIDER
                </span>
              </div>
              <span className="self-start sm:self-auto font-mono text-[6px] sm:text-[10px] text-white/50 border border-white/10 px-1 sm:px-2 py-0.5 sm:py-1 uppercase rounded-sm shrink-0">
                MADE IN EU
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
