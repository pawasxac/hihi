import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, PartyPopper } from 'lucide-react';

export default function InteractiveFeatures() {
  const [fireworksActive, setFireworksActive] = useState(false);
  const canvasRef = useRef(null);
  const fireworksIntervalRef = useRef(null);

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

      {/* Fireworks Button */}
      <div className="fixed bottom-20 right-3 z-[50]">
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
    </>
  );
}
