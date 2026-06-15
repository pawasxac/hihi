import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageCircleHeart } from 'lucide-react';
import { CONFIG } from '../config';

// Custom beautiful flower SVGs
const MawarSVG = ({ className }) => (
  <svg viewBox="0 0 64 64" className={`${className} text-rose-500 fill-current drop-shadow-[0_0_12px_rgba(244,63,94,0.8)]`}>
    <g className="text-rose-400">
      <ellipse cx="20" cy="24" rx="8" ry="12" transform="rotate(-20 20 24)"/>
      <ellipse cx="44" cy="24" rx="8" ry="12" transform="rotate(20 44 24)"/>
      <ellipse cx="18" cy="36" rx="8" ry="12" transform="rotate(-50 18 36)"/>
      <ellipse cx="46" cy="36" rx="8" ry="12" transform="rotate(50 46 36)"/>
      <ellipse cx="32" cy="20" rx="8" ry="12"/>
      <ellipse cx="24" cy="44" rx="8" ry="10" transform="rotate(-70 24 44)"/>
      <ellipse cx="40" cy="44" rx="8" ry="10" transform="rotate(70 40 44)"/>
    </g>
    <circle cx="32" cy="34" r="8" className="text-rose-600"/>
    <circle cx="32" cy="34" r="4" className="text-amber-300"/>
  </svg>
);

const TulipSVG = ({ className }) => (
  <svg viewBox="0 0 64 64" className={`${className} text-pink-400 fill-current drop-shadow-[0_0_12px_rgba(244,114,182,0.8)]`}>
    <ellipse cx="32" cy="24" rx="12" ry="18"/>
    <ellipse cx="22" cy="28" rx="8" ry="14" transform="rotate(-30 22 28)"/>
    <ellipse cx="42" cy="28" rx="8" ry="14" transform="rotate(30 42 28)"/>
    <rect x="30" y="38" width="4" height="20" className="text-green-500"/>
  </svg>
);

const MatahariSVG = ({ className }) => (
  <svg viewBox="0 0 64 64" className={`${className} text-yellow-400 fill-current drop-shadow-[0_0_12px_rgba(250,204,21,0.8)]`}>
    <circle cx="32" cy="32" r="12" className="text-amber-600"/>
    <g className="text-yellow-300">
      <rect x="30" y="8" width="4" height="12" rx="2"/>
      <rect x="30" y="44" width="4" height="12" rx="2"/>
      <rect x="8" y="30" width="12" height="4" rx="2"/>
      <rect x="44" y="30" width="12" height="4" rx="2"/>
      <rect x="14" y="14" width="4" height="10" rx="2" transform="rotate(-45 16 19)"/>
      <rect x="46" y="14" width="4" height="10" rx="2" transform="rotate(45 48 19)"/>
      <rect x="14" y="42" width="4" height="10" rx="2" transform="rotate(45 16 47)"/>
      <rect x="46" y="42" width="4" height="10" rx="2" transform="rotate(-45 48 47)"/>
    </g>
    <circle cx="32" cy="32" r="8" className="text-yellow-500"/>
    <circle cx="32" cy="32" r="5" className="text-amber-700"/>
  </svg>
);

const LavenderSVG = ({ className }) => (
  <svg viewBox="0 0 64 64" className={`${className} text-purple-400 fill-current drop-shadow-[0_0_12px_rgba(192,132,252,0.8)]`}>
    <rect x="30" y="30" width="4" height="30" className="text-green-600"/>
    <g>
      <ellipse cx="32" cy="22" rx="6" ry="8"/>
      <ellipse cx="24" cy="28" rx="5" ry="7" transform="rotate(-20 24 28)"/>
      <ellipse cx="40" cy="28" rx="5" ry="7" transform="rotate(20 40 28)"/>
      <ellipse cx="22" cy="36" rx="5" ry="7" transform="rotate(-30 22 36)"/>
      <ellipse cx="42" cy="36" rx="5" ry="7" transform="rotate(30 42 36)"/>
      <ellipse cx="26" cy="16" rx="4" ry="6"/>
      <ellipse cx="38" cy="16" rx="4" ry="6"/>
    </g>
  </svg>
);

const LilySVG = ({ className }) => (
  <svg viewBox="0 0 64 64" className={`${className} text-pink-100 fill-current drop-shadow-[0_0_12px_rgba(253,244,245,0.8)]`}>
    <g className="text-pink-200">
      <ellipse cx="32" cy="18" rx="6" ry="16"/>
      <ellipse cx="20" cy="28" rx="6" ry="14" transform="rotate(-40 20 28)"/>
      <ellipse cx="44" cy="28" rx="6" ry="14" transform="rotate(40 44 28)"/>
      <ellipse cx="18" cy="40" rx="6" ry="12" transform="rotate(-60 18 40)"/>
      <ellipse cx="46" cy="40" rx="6" ry="12" transform="rotate(60 46 40)"/>
      <ellipse cx="32" cy="44" rx="5" ry="10"/>
    </g>
    <rect x="30" y="44" width="4" height="18" className="text-green-500"/>
    <circle cx="32" cy="30" r="4" className="text-yellow-400"/>
  </svg>
);

export default function FlowerGarden({ onComplete }) {
  const [bloomed, setBloomed] = useState({});
  const [activeTooltip, setActiveTooltip] = useState(null);

  const handleBloom = (id) => {
    setBloomed((prev) => ({ ...prev, [id]: true }));
    setActiveTooltip(id);
  };

  const allBloomed = CONFIG.garden.flowers.every((f) => bloomed[f.id]);

  const renderBloomedFlower = (flowerId) => {
    switch (flowerId) {
      case 1: return <MawarSVG className="w-20 h-20" />;
      case 2: return <TulipSVG className="w-20 h-20" />;
      case 3: return <MatahariSVG className="w-20 h-20" />;
      case 4: return <LavenderSVG className="w-16 h-20" />;
      case 5: return <LilySVG className="w-20 h-20" />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen py-10 px-4 overflow-hidden relative">
      {/* Decorative backdrop glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] bg-purple-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header Info */}
      <div className="text-center max-w-md w-full z-10 px-2">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-extrabold text-white font-serif mb-2 neon-text"
        >
          {CONFIG.garden.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-sm"
        >
          {CONFIG.garden.subtitle}
        </motion.p>
      </div>

      {/* Horizontal Scroll Garden */}
      <div className="w-full overflow-x-auto py-12 px-8 flex justify-start md:justify-center items-center gap-12 snap-x snap-mandatory relative z-10 no-scrollbar">
        {CONFIG.garden.flowers.map((flower, index) => {
          const isThisBloomed = !!bloomed[flower.id];
          const isTooltipOpen = activeTooltip === flower.id;

          return (
            <motion.div
            key={flower.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex-shrink-0 w-56 h-72 glass-max rounded-2xl p-5 flex flex-col justify-end items-center snap-center relative pulse-glow"
          >
              {/* Tooltip Message */}
              <AnimatePresence>
                {isTooltipOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: -15 }}
                    exit={{ opacity: 0, scale: 0.8, y: -10 }}
                    className="absolute top-4 left-3 right-3 bg-gradient-to-br from-pink-500/95 to-rose-600/95 text-white p-4 rounded-2xl text-xs font-medium text-center shadow-2xl border border-white/30 z-30"
                  >
                    <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-rose-600" />
                    <p className="leading-relaxed">{flower.message}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Interactive Flower graphic */}
              <div className="w-36 h-36 flex items-center justify-center relative mb-2">
                <motion.div
                  onClick={() => handleBloom(flower.id)}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="cursor-pointer select-none"
                >
                  {isThisBloomed ? (
                    // Bloomed Custom Flower Shape
                    <motion.div
                      initial={{ scale: 0, rotate: -60 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 100, damping: 12 }}
                      className="flex items-center justify-center"
                    >
                      {renderBloomedFlower(flower.id)}
                    </motion.div>
                  ) : (
                    // Bud (Unbloomed) SVG
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                      className="w-20 h-20 rounded-full bg-gradient-to-br from-green-600 via-emerald-500 to-teal-400 border-2 border-emerald-300 flex items-center justify-center shadow-xl shadow-emerald-900/40"
                    >
                      <motion.div
                        className="w-10 h-10 rounded-full bg-rose-400"
                        animate={{ scale: [0.9, 1.2, 0.9] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </motion.div>
                  )}
                </motion.div>

                {/* Floating sparkles for bloomed flowers */}
                {isThisBloomed && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(8)].map((_, idx) => (
                      <motion.div
                        key={idx}
                        className="absolute text-yellow-300 text-xl"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                          opacity: [0, 1, 0], 
                          scale: [0.3, 1.5, 0.3], 
                          y: [-20, -60, -20],
                          x: [0, (Math.random() - 0.5) * 40, 0],
                          rotate: [0, Math.random() * 180 - 90, 0]
                        }}
                        transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: idx * 0.3 }}
                        style={{
                          top: `${10 + Math.random() * 80}%`,
                          left: `${10 + Math.random() * 80}%`,
                        }}
                      >
                        {['✦', '✧', '✨', '🌟'][Math.floor(Math.random() * 4)]}
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Stem */}
              <div className="w-2 h-20 bg-gradient-to-b from-green-500 to-green-800 rounded-full" />

              {/* Flower Label */}
              <div className="mt-4 text-center">
                <span className="text-sm font-bold uppercase tracking-widest text-pink-300 neon-text">
                  {flower.name}
                </span>
                <p className="text-xs text-slate-400 mt-2">
                  {isThisBloomed ? "Mekar sempurna ✨✨" : "Sentuh untuk menyiram 💦"}
                </p>
              </div>

              {/* Trigger message re-open button */}
              {isThisBloomed && !isTooltipOpen && (
                <motion.button
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setActiveTooltip(flower.id)}
                  className="absolute bottom-4 right-4 text-pink-400 hover:text-pink-300 transition-colors p-1"
                >
                  <MessageCircleHeart size={20} />
                </motion.button>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Finish stage area */}
      <div className="h-20 flex items-center justify-center z-10">
        <AnimatePresence>
          {allBloomed && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onComplete}
              className="px-10 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 hover:from-purple-600 hover:via-pink-600 hover:to-cyan-600 text-white font-bold rounded-2xl transition-all duration-300 shadow-[0_10px_30px_rgba(168,85,247,0.6)] flex items-center gap-3 pulse-glow"
            >
              {CONFIG.garden.buttonText} <Sparkles size={20} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
