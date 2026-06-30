import { motion, AnimatePresence } from 'motion/react';
import { X, QrCode, PowerOff, ShieldCheck } from 'lucide-react';
import { SocietyPass } from '../types';

interface PassViewerModalProps {
  isOpen: boolean;
  pass: SocietyPass | null;
  onClose: () => void;
  onRevokePass: () => void;
}

export default function PassViewerModal({
  isOpen,
  pass,
  onClose,
  onRevokePass,
}: PassViewerModalProps) {
  if (!pass) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9980] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[400px] bg-[#0A0A0A] text-white border border-white/10 p-6 md:p-8 flex flex-col items-center justify-between aspect-[1/1.58] max-h-[85vh] select-none font-sans rounded-xl overflow-hidden shadow-2xl group"
          >
            {/* Gloss Reflection overlay */}
            <div className="absolute inset-x-0 -top-full bottom-0 bg-gradient-to-b from-transparent via-white/5 to-transparent skew-y-12 group-hover:translate-y-[200%] transition-transform duration-1000 ease-out pointer-events-none" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 h-8 w-8 rounded-full bg-black/60 border border-white/10 hover:border-white text-neutral-400 hover:text-white transition-all flex items-center justify-center cursor-pointer"
              aria-label="Close passport viewer"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Top header */}
            <div className="w-full flex justify-between items-center border-b border-white/10 pb-3">
              <div className="flex items-center space-x-1">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span className="font-mono text-[7px] tracking-[0.25em] text-[#999] uppercase">
                  ACTIVE SOCIETY PASSPORT
                </span>
              </div>
              <span className="font-mono text-[7px] tracking-widest text-[#777]">
                {pass.id}
              </span>
            </div>

            {/* Passive details */}
            <div className="w-full flex-1 py-6 flex flex-col justify-between text-left space-y-4">
              <div className="space-y-0.5">
                <span className="text-[7px] text-neutral-600 font-mono tracking-[0.15em] uppercase">HOLDER REGISTRANT_</span>
                <p className="text-sm font-sans font-bold tracking-wider text-white uppercase truncate">
                  {pass.holderName}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-0.5">
                  <span className="text-[7px] text-neutral-600 font-mono tracking-[0.15em] uppercase">ACCESS AUTHORITY_</span>
                  <p className="text-[10px] font-mono tracking-wider text-emerald-400 uppercase font-semibold">
                    {pass.tier === 'FOUNDER_GEN' && '● FOUNDER GEN'}
                    {pass.tier === 'ELITE_SOCIETY' && '● ELITE MEMBER'}
                    {pass.tier === 'PROV_MEMBER' && '● PROV MEMBER'}
                  </p>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[7px] text-neutral-600 font-mono tracking-[0.15em] uppercase">ISSUE SESSION_</span>
                  <p className="text-[10px] font-mono text-neutral-300 uppercase">
                    {pass.issueDate}
                  </p>
                </div>
              </div>

              <div className="space-y-0.5">
                <span className="text-[7px] text-neutral-600 font-mono tracking-[0.15em] uppercase">METRIC ENCRYPTION CODE_</span>
                <p className="text-[8.5px] font-mono text-neutral-500 break-all leading-normal uppercase">
                  ECC_MD5_KEY_{pass.accessCode}A4E39_ACTIVE
                </p>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="w-full flex items-end justify-between border-t border-white/10 pt-4">
              <div className="shrink-0 flex flex-col space-y-1">
                <span className="text-[7px] text-neutral-600 font-mono tracking-widest uppercase">SCAN PASS ACCESS</span>
                <div className="flex space-x-1 items-center">
                  <QrCode className="h-5 w-5 text-neutral-400" />
                  <span className="text-[9px] font-mono text-neutral-400">0x7F9B2C</span>
                </div>
              </div>

              {/* Barcode representation */}
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

            {/* Admin Revocation trigger (under the card) */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity flex justify-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRevokePass();
                }}
                className="flex items-center space-x-1 text-[7px] font-mono tracking-widest text-red-500 hover:text-red-400 bg-black px-2 py-0.5 uppercase rounded-sm border border-red-500/10 cursor-pointer"
                title="Erase Active Passport from browser history"
              >
                <PowerOff className="h-2 w-2" />
                <span>REVOKE_PASSPORT_</span>
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
