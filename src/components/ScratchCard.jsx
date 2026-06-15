import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MailOpen, Sparkles } from 'lucide-react';
import { CONFIG } from '../config';

export default function ScratchCard({ onReveal }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const isDrawing = useRef(false);

  // Initialize Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const ctx = canvas.getContext('2d');
    
    // Draw gradient overlay
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#e879f9'); // light purple
    gradient.addColorStop(0.5, '#f43f5e'); // rose
    gradient.addColorStop(1, '#fda4af'); // light rose
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw overlay text/pattern
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('GOSOK DI SINI 💖', canvas.width / 2, canvas.height / 2 - 10);
    ctx.font = '11px sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.fillText('Gunakan jarimu untuk mengusap', canvas.width / 2, canvas.height / 2 + 15);

    // Draw little hearts or stars for decoration on canvas
    ctx.font = '14px sans-serif';
    ctx.fillText('✨  🌸  ✨', canvas.width / 2, canvas.height / 2 + 40);
  }, []);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    
    // Check if touch or mouse
    if (e.touches && e.touches[0]) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const draw = (e) => {
    if (!isDrawing.current || isRevealed) return;
    e.preventDefault();

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCoordinates(e);

    // Erase path
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();

    checkScratchPercentage();
  };

  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imgData.data;
    
    let transparentCount = 0;
    // Step by 32 to sample quickly and prevent performance lag
    const step = 32; 
    let totalSamples = 0;

    for (let i = 3; i < pixels.length; i += 4 * step) {
      totalSamples++;
      if (pixels[i] === 0) {
        transparentCount++;
      }
    }

    const percentage = (transparentCount / totalSamples) * 100;
    setScratchPercent(Math.round(percentage));

    if (percentage > 50) {
      setIsRevealed(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen py-10 px-4 bg-radial from-slate-900 via-zinc-950 to-black overflow-hidden relative">
      {/* Decorative floating decorative background blobs */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Info */}
      <div className="text-center max-w-md w-full z-10 px-2">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-extrabold text-white font-serif mb-2"
        >
          {CONFIG.scratchCard.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-sm"
        >
          {CONFIG.scratchCard.subtitle}
        </motion.p>
      </div>

      {/* Scratch Card Container */}
      <div 
        ref={containerRef}
        className="w-full max-w-sm h-96 relative rounded-3xl bg-zinc-900 border border-white/10 shadow-2xl overflow-hidden my-8"
      >
        {/* Underlay: The Love Letter */}
        <div className="absolute inset-0 p-8 flex flex-col justify-between overflow-y-auto no-scrollbar bg-gradient-to-br from-zinc-900 to-black select-text">
          <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4">
            <div className="flex items-center gap-2 text-pink-400">
              <MailOpen size={18} />
              <span className="text-xs uppercase tracking-widest font-semibold font-serif">A Love Letter</span>
            </div>
            <span className="text-[10px] text-slate-500">For You Only 🤍</span>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line text-left font-serif flex-1">
            {CONFIG.scratchCard.letterText}
          </p>

          <div className="border-t border-white/5 pt-4 mt-4 text-right">
            <span className="text-xs font-semibold text-pink-400/80">With Love ✨</span>
          </div>
        </div>

        {/* Overlay Canvas */}
        <canvas
          ref={canvasRef}
          onMouseDown={(e) => { isDrawing.current = true; draw(e); }}
          onMouseMove={draw}
          onMouseUp={() => { isDrawing.current = false; }}
          onMouseLeave={() => { isDrawing.current = false; }}
          onTouchStart={(e) => { isDrawing.current = true; draw(e); }}
          onTouchMove={draw}
          onTouchEnd={() => { isDrawing.current = false; }}
          className={`absolute inset-0 z-20 transition-opacity duration-1000 scratch-cursor ${
            isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        />
      </div>

      {/* Reveal percentage / Next step area */}
      <div className="h-16 flex flex-col items-center justify-center z-10 w-full max-w-xs">
        <AnimatePresence>
          {!isRevealed ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full text-center"
            >
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-2">
                <div 
                  className="h-full bg-pink-500 transition-all duration-300"
                  style={{ width: `${scratchPercent}%` }}
                />
              </div>
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                Tergosok: {scratchPercent}% (Target: 50%)
              </span>
            </motion.div>
          ) : (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={onReveal}
              className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold rounded-xl transition shadow-[0_4px_15px_rgba(244,63,94,0.4)] flex items-center gap-2"
            >
              Tulis Balasan 💌 <Sparkles size={16} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
