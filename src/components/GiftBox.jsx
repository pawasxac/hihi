import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowUp, Gift, Sparkles } from 'lucide-react';
import { CONFIG } from '../config';

// Custom SVGs matching the garden flowers
const MawarSVG = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10 text-rose-500 fill-current drop-shadow-[0_0_8px_rgba(244,63,94,0.7)]">
    <path d="M12 2C11.5 4.5 9 6 6.5 6.5S4 4.5 2 5c.5 2.5 2 4 4.5 4.5S9 11.5 9.5 14c2.5-.5 4-2 4.5-4.5s2-2.5 4.5-3-2-4-4.5-4.5S12.5 2.5 12 2z" />
    <circle cx="12" cy="7" r="1.5" className="text-rose-300" />
  </svg>
);

const TulipSVG = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10 text-pink-400 fill-current drop-shadow-[0_0_8px_rgba(244,114,182,0.7)]">
    <path d="M12 2C9.5 2 7 4.5 7 8c0 3 2.5 5 5 7 2.5-2 5-4 5-7 0-3.5-2.5-6-5-6z" />
  </svg>
);

const MatahariSVG = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10 text-yellow-400 fill-current drop-shadow-[0_0_8px_rgba(250,204,21,0.7)]">
    <circle cx="12" cy="12" r="3.5" className="text-amber-800" />
    <path d="M12 2l1 3 3-1-1 3 3 1-3 1 1 3-3-1-1 3-1-3-3 1 1-3-3-1 3-1-1-3 3 1z" />
  </svg>
);

const LavenderSVG = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-10 text-purple-400 fill-current drop-shadow-[0_0_8px_rgba(192,132,252,0.7)]">
    <path d="M12 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm4 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm4 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2 4v4h-1v-4h1z" />
  </svg>
);

const LilySVG = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10 text-pink-100 fill-current drop-shadow-[0_0_8px_rgba(253,244,245,0.7)]">
    <path d="M12 2C11 5 8 9 5 10c3 1 6 5 7 8 1-3 4-7 7-8-3-1-6-5-7-8zm0 5a5 5 0 0 0 1 2 5 5 0 0 0-2 0 5 5 0 0 0 1-2z" />
  </svg>
);

export default function GiftBox({ onOpen, onStartMusic }) {
  const [isOpened, setIsOpened] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [flowersBurst, setFlowersBurst] = useState([]);
  const dragY = useMotionValue(0);

  // Map drag distance to rotation and scale of the lid for extra dynamic feedback
  const lidRotate = useTransform(dragY, [-150, 0], [-15, 0]);
  const lidScale = useTransform(dragY, [-150, 0], [1.1, 1]);

  const handleDragEnd = (event, info) => {
    // If dragged up by more than 80px, open it
    if (info.offset.y < -80) {
      triggerOpen();
    }
  };

  const triggerOpen = () => {
    // Generate flower burst particles
    const types = ['mawar', 'tulip', 'matahari', 'lavender', 'lily'];
    const particles = Array.from({ length: 35 }).map((_, i) => {
      const angle = (Math.random() * Math.PI) + Math.PI; // upward arc (-180 to 0 degrees)
      const speed = 120 + Math.random() * 220;
      const destX = Math.cos(angle) * speed;
      const destY = Math.sin(angle) * speed - 150;
      return {
        id: i,
        type: types[i % types.length],
        x: destX,
        y: destY,
        rotate: Math.random() * 720 - 360,
        scale: 0.5 + Math.random() * 0.7,
        delay: Math.random() * 0.8,
        duration: 2.2 + Math.random() * 1.2,
      };
    });

    setFlowersBurst(particles);
    setIsOpened(true);

    // Trigger BGM globally
    if (onStartMusic) {
      onStartMusic();
    }

    // Delay entering button to let the flower burst showcase
    setTimeout(() => {
      setShowButton(true);
    }, 2500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-radial from-zinc-900 via-zinc-950 to-black overflow-hidden relative">
      {/* Sparkle backdrop effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Flower Burst Particles */}
      {isOpened && (
        <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30">
          {flowersBurst.map((flower) => (
            <motion.div
              key={flower.id}
              initial={{ x: 0, y: 80, scale: 0, opacity: 1, rotate: 0 }}
              animate={{
                x: flower.x,
                y: flower.y,
                scale: flower.scale,
                opacity: [1, 1, 0.8, 0],
                rotate: flower.rotate,
              }}
              transition={{
                duration: flower.duration,
                delay: flower.delay,
                ease: "easeOut",
              }}
              className="absolute"
            >
              {flower.type === 'mawar' && <MawarSVG />}
              {flower.type === 'tulip' && <TulipSVG />}
              {flower.type === 'matahari' && <MatahariSVG />}
              {flower.type === 'lavender' && <LavenderSVG />}
              {flower.type === 'lily' && <LilySVG />}
            </motion.div>
          ))}
        </div>
      )}

      <div className="text-center z-10 max-w-md w-full">
        {!isOpened ? (
          <>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-extrabold text-white font-serif mb-2 tracking-tight"
            >
              {CONFIG.giftBox.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-pink-300 text-sm font-medium mb-12 flex items-center justify-center gap-1.5"
            >
              {CONFIG.giftBox.subtitle} <Gift size={16} />
            </motion.p>

            {/* Gift Box Container */}
            <div className="relative w-64 h-64 mx-auto mt-8 flex flex-col justify-end items-center">
              {/* Floating Arrow indicators */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-12 text-pink-400 flex flex-col items-center gap-1 pointer-events-none"
              >
                <ArrowUp size={24} className="stroke-[2.5]" />
                <span className="text-xs font-semibold uppercase tracking-widest text-pink-300">Swipe Up</span>
              </motion.div>

              {/* Draggable Gift Lid */}
              <motion.div
                drag="y"
                dragConstraints={{ top: -200, bottom: 0 }}
                dragElastic={0.15}
                style={{ y: dragY, rotate: lidRotate, scale: lidScale }}
                onDragEnd={handleDragEnd}
                whileDrag={{ scale: 1.05 }}
                className="absolute z-20 bottom-[120px] w-52 h-16 cursor-grab active:cursor-grabbing flex flex-col items-center"
              >
                {/* Lid top ribbon bow */}
                <div className="absolute -top-6 w-12 h-6 flex justify-between">
                  <div className="w-6 h-6 border-4 border-rose-500 rounded-full rotate-45 transform bg-pink-400" />
                  <div className="w-6 h-6 border-4 border-rose-500 rounded-full -rotate-45 transform bg-pink-400" />
                </div>
                {/* Lid Box body */}
                <div className="w-full h-12 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 rounded-lg shadow-lg border border-pink-300/30 flex items-center justify-center relative">
                  {/* Horizontal ribbon stripe */}
                  <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-rose-600 shadow-inner" />
                </div>
              </motion.div>

              {/* Gift Box Base */}
              <div className="w-48 h-32 bg-gradient-to-b from-rose-500 to-red-600 rounded-b-xl shadow-2xl border border-rose-400/20 relative z-10 flex items-center justify-center">
                {/* Vertical Ribbon Stripe */}
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-rose-700 shadow-inner" />
                
                {/* Bow tie overlay */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-10 h-3 bg-rose-700 rounded-sm z-15" />
              </div>
            </div>
            
            {/* Click fallback for desktop users or accessibility */}
            <motion.button
              onClick={triggerOpen}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-12 text-xs font-semibold text-slate-400 border border-slate-700/50 hover:border-pink-500/50 px-4 py-2 rounded-full transition duration-300"
            >
              Atau klik di sini untuk membuka 👆
            </motion.button>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="flex flex-col items-center"
          >
            {/* Opened state */}
            <div className="w-24 h-24 mb-6 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-400 border border-pink-500/20 animate-bounce">
              <Sparkles size={36} />
            </div>

            <h1 className="text-3xl font-extrabold text-white font-serif mb-3 leading-tight">
              Yay! Kado Terbuka! 🎉
            </h1>
            <p className="text-slate-300 text-sm max-w-xs mb-8 leading-relaxed animate-pulse">
              bunga-bunga mulai bermekaran... 🌸✨
            </p>

            {/* Enter button appears after delay */}
            <div className="h-16 flex items-center justify-center">
              {showButton && (
                <motion.button
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={onOpen}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold rounded-2xl transition duration-300 shadow-[0_4px_20px_rgba(244,63,94,0.4)] hover:shadow-[0_6px_25px_rgba(244,63,94,0.6)] flex items-center gap-2"
                >
                  Masuk ke Taman Bunga <Sparkles size={18} />
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
