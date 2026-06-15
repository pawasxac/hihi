import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, PartyPopper } from 'lucide-react';

export default function InteractiveFeatures({ totalLoveCount }) {
  const [showMilestone, setShowMilestone] = useState(null);
  const [fireworksActive, setFireworksActive] = useState(false);
  const canvasRef = useRef(null);
  const fireworksIntervalRef = useRef(null);

  // Simple, sweet messages
  const milestones = [
    { count: 10, message: "Terima kasih udah sayang banget! 🤍" },
    { count: 25, message: "Wah, kamu sayang banget ya? 💝" },
    { count: 50, message: "Luar biasa! Semoga hari ini penuh kebahagiaan! 🥰" },
    { count: 100, message: "Kamu bikin dia senang banget! Selamat ulang tahun! 🎉" },
  ];

  // Check for milestone whenever totalLoveCount changes
  useEffect(() => {
    const milestone = milestones.find(m => m.count === totalLoveCount);
    if (milestone) {
      setShowMilestone(milestone);
      setTimeout(() => {
        setShowMilestone(null);
      }, 3500);
    }
  }, [totalLoveCount]);

  // Fireworks logic
  const launchFireworks = () => {
    setFireworksActive(true);
    setTimeout(() => setFireworksActive(false), 4000);
  };

  // Canvas fireworks animation - optimized
  useEffect(() => {
    if (!fireworksActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Resize canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#f43f5e', '#a855f7', '#ec4899', '#facc15'];

    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.velocity = {
          x: (Math.random() - 0.5) * 8,
          y: (Math.random() - 0.5) * 8
        };
        this.alpha = 1;
        this.decay = 0.015;
        this.size = Math.random() * 4 + 2;
        this.color = color;
      }

      draw() {
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }

      update() {
        this.velocity.y += 0.02;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= this.decay;
      }
    }

    const createFirework = () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * (canvas.height / 2);
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      for (let i = 0; i < 40; i++) {
        particles.push(new Particle(x, y, color));
      }
    };

    fireworksIntervalRef.current = setInterval(createFirework, 400);

    const animate = () => {
      if (!fireworksActive) return;
      
      ctx.globalAlpha = 0.1;
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;

      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].draw();
        particles[i].update();
        
        if (particles[i].alpha <= 0) {
          particles.splice(i, 1);
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (fireworksIntervalRef.current) {
        clearInterval(fireworksIntervalRef.current);
      }
    };
  }, [fireworksActive]);

  return (
    <>
      {/* Canvas for fireworks */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-[40]"
        style={{ display: fireworksActive ? 'block' : 'none' }}
      />

      {/* Love Counter - Simple & Clean */}
      <div className="fixed top-3 right-3 z-[50]">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-zinc-900/90 backdrop-blur-md rounded-xl p-3 shadow-xl border border-zinc-700/50"
        >
          <div className="flex items-center gap-2">
            <div className="text-xl">❤️</div>
            <div className="flex flex-col">
              <p className="text-[10px] text-zinc-400">Love Taps</p>
              <motion.p 
                key={totalLoveCount}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-2xl font-bold text-pink-400"
              >
                {totalLoveCount}
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Fireworks Button - Simple */}
      <div className="fixed bottom-28 right-3 z-[50]">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={launchFireworks}
          disabled={fireworksActive}
          className={`p-3 rounded-xl shadow-lg transition-all ${
            fireworksActive 
              ? 'bg-pink-600 cursor-wait' 
              : 'bg-gradient-to-r from-purple-500 to-pink-500'
          }`}
        >
          <PartyPopper className="w-6 h-6 text-white" />
        </motion.button>
      </div>

      {/* Milestone Popup - Simple */}
      <AnimatePresence>
        {showMilestone && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100]"
          >
            <div className="bg-zinc-900/95 backdrop-blur-md text-white px-6 py-5 rounded-2xl shadow-xl border border-zinc-700/50 text-center max-w-[90vw">
              <div className="text-4xl mb-3">🎉</div>
              <p className="text-lg font-medium">{showMilestone.message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
