import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { CONFIG } from '../config';

export default function PhotoAlbum({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for prev, 1 for next

  const photos = CONFIG.album.photos;

  const handleNext = () => {
    if (currentIndex < photos.length - 1) {
      setDirection(1);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Variants for sliding transition
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      rotate: dir > 0 ? 5 : -5,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        type: 'spring',
        stiffness: 120,
        damping: 15
      }
    },
    exit: (dir) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      rotate: dir < 0 ? 5 : -5,
      transition: { duration: 0.3 }
    })
  };

  const isLast = currentIndex === photos.length - 1;

  return (
    <div className="flex flex-col items-center justify-between min-h-screen py-10 px-4 overflow-hidden relative">
      {/* Decorative backdrop glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] bg-purple-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header Info */}
      <div className="text-center max-w-md w-full z-10 px-2">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-extrabold text-white font-serif mb-2 neon-text"
        >
          {CONFIG.album.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-sm"
        >
          {CONFIG.album.subtitle}
        </motion.p>
      </div>

      {/* Modern Card Area */}
      <div className="w-full max-w-sm h-[400px] flex items-center justify-center relative z-10 my-4">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-72 h-[380px] glass-max rounded-3xl p-4 pb-6 shadow-2xl flex flex-col justify-between select-none cursor-default pulse-glow"
          >
            {/* Photo */}
            <div className="w-full aspect-square rounded-2xl overflow-hidden bg-zinc-950 border-2 border-white/10 shadow-inner">
              <img
                src={photos[currentIndex].url}
                alt={photos[currentIndex].caption}
                className="w-full h-full object-cover select-none pointer-events-none"
              />
            </div>

            {/* Modern caption - clean sans-serif typography */}
            <div className="text-center mt-4 px-1 min-h-[48px] flex items-center justify-center">
              <p className="text-slate-200 font-sans font-medium text-sm tracking-wide leading-relaxed neon-text">
                {photos[currentIndex].caption}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Pager Controls / Finish area */}
      <div className="w-full max-w-xs z-10 flex flex-col items-center gap-6">
        {/* Carousel indicator & chevron buttons */}
        <div className="flex items-center justify-between w-full px-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`p-3 rounded-full border-2 border-white/20 bg-white/10 text-white transition ${
              currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/20'
            }`}
          >
            <ChevronLeft size={20} />
          </motion.button>

          <span className="text-sm text-slate-300 font-bold uppercase tracking-wider neon-text">
            {currentIndex + 1} / {photos.length}
          </span>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            disabled={isLast}
            className={`p-3 rounded-full border-2 border-white/20 bg-white/10 text-white transition ${
              isLast ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/20'
            }`}
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>

        {/* Transition button (only unlocks on last page) */}
        <div className="h-16 w-full flex items-center justify-center">
          <AnimatePresence>
            {isLast && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onComplete}
                className="w-full py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 hover:from-purple-600 hover:via-pink-600 hover:to-cyan-600 text-white text-base font-bold rounded-2xl transition-all duration-300 shadow-[0_10px_30px_rgba(168,85,247,0.6)] flex items-center justify-center gap-3 pulse-glow"
              >
                {CONFIG.album.buttonText} <Sparkles size={20} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
