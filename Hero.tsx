import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [percent, setPercent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            // Delay triggering app activation to allow fade transition to finish
            setTimeout(onComplete, 800);
          }, 300);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="loading-screen"
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-between bg-black p-8 font-sans text-[#E5E5E5] selection:bg-neutral-800 pointer-events-auto"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Subtle Textured Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(40,40,40,0.15),black)] pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20views%3D%220%200%20200%20200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F200%2Fsvg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.8%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noise)%22%2F%3E%3C%2Fsvg%3E')]" />

          {/* Top Status */}
          <div className="w-full flex justify-between text-[10px] tracking-[0.2em] uppercase text-neutral-500 font-mono">
            <span>SOCIETY OS v2.06</span>
            <span>SYSTEM_READY</span>
          </div>

          {/* Centered Typography */}
          <div className="flex flex-col items-center justify-center space-y-6">
            <motion.div
              className="text-center"
              initial={{ letterSpacing: '0.1em', opacity: 0 }}
              animate={{ letterSpacing: '0.35em', opacity: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            >
              <h1 className="text-2xl md:text-4xl font-semibold tracking-[0.3em] text-white uppercase text-center pl-[0.3em]">
                SOCIETY STUDIOS
              </h1>
            </motion.div>
            
            <p className="text-[11px] tracking-[0.15em] uppercase text-neutral-400 font-mono text-center">
              Heavyweight Uniforms & Editorial Concepts
            </p>

            <div className="h-[1px] w-24 bg-white/20 relative overflow-hidden">
              <motion.div 
                className="absolute left-0 top-0 bottom-0 bg-white"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          {/* Bottom Status / Percentage */}
          <div className="w-full flex justify-between items-end text-[10px] tracking-[0.2em] font-mono text-neutral-500">
            <div className="flex flex-col space-y-1">
              <span className="text-neutral-400">LOADING METRIC SECURITY SYSTEM...</span>
              <span>ALL CHECKS PASS / SYNCING CERTIFICATES</span>
            </div>
            <div className="text-right flex flex-col space-y-1">
              <span className="text-white font-medium text-sm">{Math.min(percent, 100)}%</span>
              <span>SECURE ACCESS</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
