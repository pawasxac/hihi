import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Trophy, Star, Zap, PartyPopper } from 'lucide-react';

export default function InteractiveFeatures({ totalLoveCount }) {
  const [showMilestone, setShowMilestone] = useState(null);
  const [fireworksActive, setFireworksActive] = useState(false);
  const [showRainbow, setShowRainbow] = useState(false);
  const canvasRef = useRef(null);
  const fireworksIntervalRef = useRef(null);

  // Milestone messages (alay mode!)
  const milestones = [
    { count: 10, message: "10 cinta! Aww kamu sweet bangett bebee 🥰🥰", color: "from-pink-500 to-rose-600" },
    { count: 25, message: "25 cinta! Kamu bikin hati aku mekar bangeeett cintaaa 🌸🌸", color: "from-purple-500 to-pink-600" },
    { count: 50, message: "50 cinta! Kamu luar biasa bangett sayangku ❤️❤️", color: "from-cyan-500 to-purple-600" },
    { count: 100, message: "100 CINTA! INI LUAR BIASA BANGETT! KAMU TERBAIK DI DUNIA! 🎉✨✨", color: "from-yellow-400 via-pink-500 to-purple-600" },
  ];

  // Check for milestone whenever totalLoveCount changes
  useEffect(() => {
    const milestone = milestones.find(m => m.count === totalLoveCount);
    if (milestone) {
      setShowMilestone(milestone);
      setShowRainbow(true);
      setTimeout(() => {
        setShowMilestone(null);
        setShowRainbow(false);
      }, 5000);
    }
  }, [totalLoveCount]);

  // Fireworks logic
  const launchFireworks = () => {
    setFireworksActive(true);
    
    // Stop after 8 seconds for MAXIMAL fun
    setTimeout(() => setFireworksActive(false), 8000);
  };

  // Canvas fireworks animation
  useEffect(() => {
    if (!fireworksActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Resize canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#f43f5e', '#ec4899', '#d946ef', '#a855f7', '#f472b6', '#e879f9', '#facc15', '#22d3ee', '#10b981', '#f59e0b'];

    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = {
          x: (Math.random() - 0.5) * 12,
          y: (Math.random() - 0.5) * 12
        };
        this.alpha = 1;
        this.decay = Math.random() * 0.01 + 0.003;
        this.size = Math.random() * 6 + 3;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.1;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        // Draw star shape
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const angle = (i * 4 * Math.PI) / 5;
          const radius = i % 2 === 0 ? this.size : this.size / 2;
          if (i === 0) {
            ctx.moveTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
          } else {
            ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
          }
        }
        ctx.closePath();
        
        // Add glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
      }

      update() {
        this.velocity.y += 0.03; // gravity
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= this.decay;
        this.rotation += this.rotationSpeed;
        this.velocity.x *= 0.99; // air resistance
      }
    }

    const createFirework = () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * (canvas.height / 2);
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      for (let i = 0; i < 100; i++) {
        particles.push(new Particle(x, y, color));
      }
    };

    // Launch MORE fireworks
    fireworksIntervalRef.current = setInterval(createFirework, 200);

    const animate = () => {
      if (!fireworksActive) return;
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

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
      {/* Rainbow overlay for milestones */}
      <AnimatePresence>
        {showRainbow && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-[35]"
            style={{
              background: 'linear-gradient(45deg, rgba(244,63,94,0.1), rgba(236,72,153,0.1), rgba(168,85,247,0.1), rgba(34,211,238,0.1), rgba(16,185,129,0.1), rgba(245,158,11,0.1))',
              backgroundSize: '400% 400%',
              animation: 'gradientShift 2s ease infinite'
            }}
          />
        )}
      </AnimatePresence>

      {/* Canvas for fireworks */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-[40]"
        style={{ display: fireworksActive ? 'block' : 'none' }}
      />

      {/* Love Counter - MAXIMAL (Mobile Optimized) */}
      <div className="fixed top-3 right-3 z-[50]">
        <motion.div
          initial={{ opacity: 0, x: 20, rotate: -5 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          className="glass-max rounded-2xl p-3 shadow-xl border border-pink-500/40 pulse-glow"
        >
          <div className="flex items-center gap-2.5">
            <div className="text-2xl bounce-max">❤️</div>
            <div className="flex flex-col">
              <p className="text-[9px] text-pink-300 uppercase tracking-widest font-bold neon-text">Love Taps!</p>
              <motion.p 
                key={totalLoveCount}
                initial={{ scale: 1.4, rotate: 3 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="text-[1.8rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400"
              >
                {totalLoveCount}
              </motion.p>
            </div>
            <div className="flex -space-x-1.5">
              <Zap className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
              <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-ping" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Fireworks Button - MAXIMAL (Mobile Optimized) */}
      <div className="fixed bottom-28 right-3 z-[50]">
        <motion.button
          whileHover={{ scale: 1.15, rotate: 8 }}
          whileTap={{ scale: 0.9, rotate: -5 }}
          onClick={launchFireworks}
          disabled={fireworksActive}
          className={`p-4 rounded-2xl shadow-xl transition-all duration-300 ${
            fireworksActive 
              ? 'bg-gradient-to-r from-pink-600 to-purple-600 cursor-wait animate-pulse' 
              : 'bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 hover:from-purple-600 hover:via-pink-600 hover:to-cyan-600 pulse-glow'
          }`}
        >
          <PartyPopper className="w-7 h-7 text-white drop-shadow-lg" />
        </motion.button>
      </div>

      {/* Milestone Popup - MAXIMAL */}
      <AnimatePresence>
        {showMilestone && (
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: -180, y: 100 }}
            animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0, rotate: 180, y: -100 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] pointer-events-none"
          >
            <div className={`bg-gradient-to-br ${showMilestone.color} text-white px-10 py-8 rounded-[2rem] shadow-2xl border-4 border-white/40 text-center max-w-md relative overflow-hidden`}>
              {/* Sparkle overlay */}
              <div className="absolute inset-0 shimmer pointer-events-none" />
              
              <div className="relative z-10">
                <div className="text-7xl mb-4 bounce-max">🎉</div>
                <h3 className="text-3xl font-black mb-3 flex items-center justify-center gap-3 neon-text">
                  <Trophy className="w-8 h-8" />
                  MILESTONE!
                </h3>
                <p className="text-xl font-medium leading-relaxed">{showMilestone.message}</p>
                <div className="flex justify-center gap-2 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ delay: i * 0.1, repeat: Infinity, repeatDelay: 1 }}
                    >
                      <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
