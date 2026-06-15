import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { CONFIG } from '../config';

export default function PhotoAlbum({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

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

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4 }
    },
    exit: (dir) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      transition: { duration: 0.3 }
    })
  };

  const isLast = currentIndex === photos.length - 1;

  return (
    <div className="flex flex-col items-center justify-between min-h-screen py-10 px-4">
      {/* Header */}
      <div className="text-center max-w-md w-full z-10 px-2">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-white font-serif mb-2"
        >
          {CONFIG.album.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-zinc-400 text-sm"
        >
          {CONFIG.album.subtitle}
        </motion.p>
      </div>

      {/* Photo Card Area */}
      <div className="w-full max-w-sm h-[400px] flex items-center justify-center z-10 my-4">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-64 h-[360px] glass rounded-xl p-3 flex flex-col justify-between"
          >
            <div className="w-full aspect-square rounded-lg overflow-hidden bg-zinc-900">
              <img
                src={photos[currentIndex].url}
                alt={photos[currentIndex].caption}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center mt-3">
              <p className="text-zinc-200 font-medium text-sm">
                {photos[currentIndex].caption}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="w-full max-w-xs z-10 flex flex-col items-center gap-6">
        <div className="flex items-center justify-between w-full px-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`p-2 rounded-lg border border-zinc-700 text-zinc-300 transition ${
              currentIndex === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-zinc-800'
            }`}
          >
            <ChevronLeft size={20} />
          </motion.button>

          <span className="text-sm text-zinc-400">
            {currentIndex + 1} / {photos.length}
          </span>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            disabled={isLast}
            className={`p-2 rounded-lg border border-zinc-700 text-zinc-300 transition ${
              isLast ? 'opacity-40 cursor-not-allowed' : 'hover:bg-zinc-800'
            }`}
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>

        <div className="h-16 w-full flex items-center justify-center">
          <AnimatePresence>
            {isLast && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onComplete}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg"
              >
                {CONFIG.album.buttonText} <Sparkles size={16} className="inline ml-1" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
