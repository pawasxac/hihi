import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Heart, KeyRound } from 'lucide-react';
import { CONFIG } from '../config';

export default function LockScreen({ onUnlock }) {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanAnswer = answer.trim().toLowerCase();
    const isCorrect = CONFIG.lockScreen.correctAnswers.some(
      (ans) => ans.trim().toLowerCase() === cleanAnswer
    );

    if (isCorrect) {
      setError(false);
      onUnlock();
    } else {
      setError(true);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-radial from-slate-900 via-zinc-900 to-black overflow-hidden relative">
      {/* Decorative floating decorative background blobs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />

      {/* Decorative Star/Sparkle animation */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-300/30 text-xl pointer-events-none"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0.5, 1.2, 0.5],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          ✦
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          x: isShaking ? [-10, 10, -10, 10, -5, 5, 0] : 0
        }}
        transition={{ 
          y: { type: 'spring', stiffness: 100 },
          x: { duration: 0.5 }
        }}
        className="w-full max-w-md p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl relative z-10 flex flex-col items-center text-center"
      >
        <div className="w-16 h-16 mb-6 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shadow-[0_0_15px_rgba(244,63,94,0.1)]">
          <KeyRound size={28} className="animate-pulse" />
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-white mb-2 font-serif">
          Special Day Verification 🌸
        </h1>
        <p className="text-slate-400 text-sm mb-6 max-w-xs leading-relaxed">
          Situs ini dikunci secara khusus. Silakan jawab pertanyaan di bawah untuk membuka kado spesialmu.
        </p>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="text-left">
            <label className="block text-xs font-semibold text-pink-300 uppercase tracking-wider mb-2">
              {CONFIG.lockScreen.question}
            </label>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder={CONFIG.lockScreen.placeholder}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition duration-300"
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-xs text-rose-400 font-medium"
              >
                {CONFIG.lockScreen.errorMessage}
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold rounded-xl transition duration-300 shadow-[0_4px_15px_rgba(244,63,94,0.3)] hover:shadow-[0_6px_20px_rgba(244,63,94,0.4)] transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Buka Kunci 💖
          </button>
        </form>
      </motion.div>
    </div>
  );
}
