import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageCircleHeart } from 'lucide-react';
import { CONFIG } from '../config';

// Custom beautiful flower SVG
const MawarSVG = ({ className }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <g className="text-rose-400 fill-current">
      <ellipse cx="20" cy="24" rx="8" ry="12" transform="rotate(-20 20 24)" />
      <ellipse cx="44" cy="24" rx="8" ry="12" transform="rotate(20 44 24)" />
      <ellipse cx="18" cy="36" rx="8" ry="12" transform="rotate(-50 18 36)" />
      <ellipse cx="46" cy="36" rx="8" ry="12" transform="rotate(50 46 36)" />
      <ellipse cx="32" cy="20" rx="8" ry="12" />
    </g>
    <circle cx="32" cy="34" r="8" className="text-rose-500 fill-current" />
    <circle cx="32" cy="34" r="4" className="text-amber-300 fill-current" />
  </svg>
);

const TulipSVG = ({ className }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <ellipse cx="32" cy="24" rx="12" ry="18" className="text-pink-400 fill-current" />
    <ellipse cx="22" cy="28" rx="8" ry="14" transform="rotate(-30 22 28)" className="text-pink-400 fill-current" />
    <ellipse cx="42" cy="28" rx="8" ry="14" transform="rotate(30 42 28)" className="text-pink-400 fill-current" />
    <rect x="30" y="38" width="4" height="20" className="text-green-500 fill-current" />
  </svg>
);

const MatahariSVG = ({ className }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <circle cx="32" cy="32" r="12" className="text-amber-600 fill-current" />
    <g className="text-yellow-300 fill-current">
      <rect x="30" y="8" width="4" height="12" rx="2" />
      <rect x="30" y="44" width="4" height="12" rx="2" />
      <rect x="8" y="30" width="12" height="4" rx="2" />
      <rect x="44" y="30" width="12" height="4" rx="2" />
      <rect x="12" y="12" width="4" height="10" rx="2" transform="rotate(-45 14 17)" />
      <rect x="48" y="12" width="4" height="10" rx="2" transform="rotate(45 50 17)" />
      <rect x="12" y="44" width="4" height="10" rx="2" transform="rotate(45 14 49)" />
      <rect x="48" y="44" width="4" height="10" rx="2" transform="rotate(-45 50 49)" />
    </g>
    <circle cx="32" cy="32" r="8" className="text-yellow-500 fill-current" />
    <circle cx="32" cy="32" r="5" className="text-amber-700 fill-current" />
  </svg>
);

const LavenderSVG = ({ className }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <rect x="30" y="30" width="4" height="30" className="text-green-600 fill-current" />
    <g className="text-purple-400 fill-current">
      <ellipse cx="32" cy="18" rx="6" ry="9" />
      <ellipse cx="25" cy="24" rx="5" ry="7" transform="rotate(-15 25 24)" />
      <ellipse cx="39" cy="24" rx="5" ry="7" transform="rotate(15 39 24)" />
      <ellipse cx="24" cy="32" rx="5" ry="7" transform="rotate(-25 24 32)" />
      <ellipse cx="40" cy="32" rx="5" ry="7" transform="rotate(25 40 32)" />
      <ellipse cx="26" cy="12" rx="4" ry="6" />
      <ellipse cx="38" cy="12" rx="4" ry="6" />
    </g>
  </svg>
);

const LilySVG = ({ className }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <g className="text-pink-100 fill-current">
      <ellipse cx="32" cy="18" rx="7" ry="16" />
      <ellipse cx="21" cy="26" rx="6" ry="14" transform="rotate(-40 21 26)" />
      <ellipse cx="43" cy="26" rx="6" ry="14" transform="rotate(40 43 26)" />
      <ellipse cx="20" cy="38" rx="6" ry="12" transform="rotate(-60 20 38)" />
      <ellipse cx="44" cy="38" rx="6" ry="12" transform="rotate(60 44 38)" />
      <ellipse cx="32" cy="44" rx="5" ry="10" />
    </g>
    <rect x="30" y="42" width="4" height="20" className="text-green-500 fill-current" />
    <circle cx="32" cy="28" r="4" className="text-yellow-400 fill-current" />
  </svg>
);

export default function FlowerGarden({ onComplete }) {
  const [bloomed, setBloomed] = useState({});
  const [activeTooltipId, setActiveTooltipId] = useState(null);

  const handleBloom = (id) => {
    setBloomed((prev) => ({ ...prev, [id]: true }));
    setActiveTooltipId(id);
  };

  const allBloomed = CONFIG.garden.flowers.every((f) => bloomed[f.id]);

  const renderBloomedFlower = (flowerId) => {
    switch (flowerId) {
      case 1: return <MawarSVG className="w-16 h-16" />;
      case 2: return <TulipSVG className="w-16 h-16" />;
      case 3: return <MatahariSVG className="w-16 h-16" />;
      case 4: return <LavenderSVG className="w-16 h-16" />;
      case 5: return <LilySVG className="w-16 h-16" />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen py-10 px-4">
      {/* Header */}
      <div className="text-center max-w-md w-full z-10 px-2">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-white font-serif mb-2"
        >
          {CONFIG.garden.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-zinc-400 text-sm"
        >
          {CONFIG.garden.subtitle}
        </motion.p>
      </div>

      {/* Horizontal Scroll Garden */}
      <div className="w-full overflow-x-auto py-12 px-8 flex justify-start md:justify-center items-center gap-8 snap-x snap-mandatory relative z-10">
        {CONFIG.garden.flowers.map((flower, index) => {
          const isThisBloomed = !!bloomed[flower.id];
          const isTooltipOpen = activeTooltipId === flower.id;

          return (
            <motion.div
              key={flower.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex-shrink-0 w-48 h-64 glass rounded-xl p-4 flex flex-col justify-end items-center snap-center relative"
            >
              {/* Interactive Flower */}
              <div className="w-28 h-28 flex items-center justify-center relative mb-2 mt-2">
                <motion.div
                  onClick={() => handleBloom(flower.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer"
                >
                  {isThisBloomed ? (
                    <motion.div
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 150 }}
                    >
                      {renderBloomedFlower(flower.id)}
                    </motion.div>
                  ) : (
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      className="w-16 h-16 rounded-full bg-gradient-to-tr from-green-600 via-emerald-500 to-teal-400 flex items-center justify-center"
                    >
                      <div className="w-8 h-8 rounded-full bg-rose-400" />
                    </motion.div>
                  )}
                </motion.div>
              </div>

              {/* Tooltip Message - Positioned ABOVE the flower */}
              <AnimatePresence>
                {isTooltipOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.9 }}
                    animate={{ opacity: 1, y: -5, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                    className="absolute top-0 left-2 right-2 bg-pink-600/95 text-white p-3 rounded-lg text-xs text-center"
                  >
                    <p>{flower.message}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Stem */}
              <div className="w-1.5 h-16 bg-gradient-to-b from-green-500 to-green-800 rounded-full" />

              {/* Label */}
              <div className="mt-4 text-center">
                <span className="text-xs font-semibold text-pink-300">
                  {flower.name}
                </span>
              </div>

              {/* Trigger message button */}
              {isThisBloomed && (
                <button
                  onClick={() => setActiveTooltipId(isTooltipOpen ? null : flower.id)}
                  className="absolute bottom-3 right-3 text-pink-400/70"
                >
                  <MessageCircleHeart size={14} />
                </button>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Finish stage area */}
      <div className="h-16 flex items-center justify-center z-10">
        <AnimatePresence>
          {allBloomed && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onComplete}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg"
            >
              {CONFIG.garden.buttonText} <Sparkles size={16} className="inline ml-1" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
