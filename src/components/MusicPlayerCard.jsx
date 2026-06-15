import React from 'react';
import { Play, Pause, SkipForward, SkipBack, Heart, Music } from 'lucide-react';
import { motion } from 'framer-motion';
import { CONFIG } from '../config';

export default function MusicPlayerCard({ 
  isPlaying, 
  onPlayPause, 
  currentTime, 
  duration 
}) {
  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <motion.div 
      className="fixed bottom-20 left-3 z-50 w-44 h-[240px] glass-max rounded-2xl p-2.5 shadow-2xl border-2 border-pink-500/30 flex flex-col justify-between"
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      {/* Animated glow border */}
      <div className="absolute inset-0 rounded-2xl pulse-glow -z-10" style={{ padding: '2px' }} />
      
      {/* Cover Art Container - MAXIMAL */}
      <div className="w-full p-1.5 bg-gradient-to-br from-black/50 to-zinc-900/50 rounded-xl border border-white/10 flex items-center justify-center shadow-inner">
        <motion.div 
          className="w-full aspect-[2/3] rounded-lg overflow-hidden relative shadow-2xl"
          animate={isPlaying ? { rotate: [0, 1, 0, -1, 0] } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <img 
            src={CONFIG.musicPlayer.coverUrl} 
            alt="Semua Aku Dirayakan" 
            className="w-full h-full object-cover filter grayscale contrast-125"
          />
          {/* Animated overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          
          {/* Animated bars for playing */}
          {isPlaying && (
            <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-end justify-center gap-1 h-6">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 bg-gradient-to-t from-pink-500 to-purple-500 rounded-t-full"
                  animate={{ height: [8, 16 + Math.random() * 12, 8] }}
                  transition={{ 
                    duration: 0.5 + Math.random() * 0.5, 
                    repeat: Infinity, 
                    delay: i * 0.1,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Song details - MAXIMAL */}
      <div className="flex flex-col gap-0.5 px-0.5">
        <div className="flex justify-between items-center">
          <div className="text-left min-w-0 flex-1">
            <h4 className="text-[10px] font-black text-white truncate font-serif neon-text">Semua Aku Dirayakan</h4>
            <p className="text-[8px] text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 font-bold tracking-wide uppercase truncate">Nadin Amizah</p>
          </div>
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Heart size={12} className="text-pink-500 fill-current ml-0.5 flex-shrink-0" />
          </motion.div>
        </div>

        {/* Progress Bar - MAXIMAL */}
        <div className="flex flex-col gap-0.5 mt-0.5">
          <div className="w-full h-1 bg-white/10 rounded-full relative overflow-hidden shadow-inner">
            <motion.div 
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full"
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ 
                width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
                backgroundSize: '200% 200%'
              }}
            />
          </div>
          <div className="flex justify-between text-[6px] text-slate-400 font-bold font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration || 297)}</span>
          </div>
        </div>

        {/* Controls - MAXIMAL */}
        <div className="flex items-center justify-center gap-3 mt-0.5">
          <motion.button 
            whileHover={{ scale: 1.2, rotate: -10 }}
            whileTap={{ scale: 0.9 }}
            className="text-slate-300 hover:text-white transition p-0.5"
          >
            <SkipBack size={14} fill="currentColor" />
          </motion.button>
          
          <motion.button 
            onClick={onPlayPause}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white flex items-center justify-center shadow-xl shadow-pink-500/40"
          >
            {isPlaying ? (
              <Pause size={16} fill="currentColor" />
            ) : (
              <Play size={16} fill="currentColor" className="ml-0.5" />
            )}
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            className="text-slate-300 hover:text-white transition p-0.5"
          >
            <SkipForward size={14} fill="currentColor" />
          </motion.button>
        </div>
      </div>
      
      {/* Floating music note decoration */}
      <motion.div
        className="absolute -top-1.5 -right-1.5 text-pink-400"
        animate={{ 
          y: [0, -8, 0], 
          rotate: [0, 10, -10, 0],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Music size={18} className="drop-shadow-lg" />
      </motion.div>
    </motion.div>
  );
}
