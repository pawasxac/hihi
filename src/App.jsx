import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG } from './config';
import LockScreen from './components/LockScreen';
import GiftBox from './components/GiftBox';
import FlowerGarden from './components/FlowerGarden';
import PhotoAlbum from './components/PhotoAlbum';
import ScratchCard from './components/ScratchCard';
import DirectMessageForm from './components/DirectMessageForm';
import MusicPlayerCard from './components/MusicPlayerCard';
import InteractiveFeatures from './components/InteractiveFeatures';

function App() {
  const [currentStage, setCurrentStage] = useState('locked');
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Global Audio State
  const [audio] = useState(() => {
    const a = new Audio(CONFIG.giftBox.audioUrl);
    a.loop = true;
    return a;
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [showMusicPlayer, setShowMusicPlayer] = useState(true);

  // Global Interactive Click Particles State
  const [clickParticles, setClickParticles] = useState([]);
  const [mouseTrail, setMouseTrail] = useState([]);

  // Mouse Move listener for trailing particles
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (Math.random() > 0.8) {
        const newTrail = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
        };
        setMouseTrail(prev => [...prev, newTrail].slice(-20)); // Keep max 20 particles
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Cleanup trail particles after animation
  useEffect(() => {
    if (mouseTrail.length > 0) {
      const timer = setTimeout(() => {
        setMouseTrail(prev => prev.slice(1));
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [mouseTrail]);

  // Resize listener for confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sync volume with audio object
  useEffect(() => {
    audio.volume = volume;
  }, [volume, audio]);

  // Sync play state
  useEffect(() => {
    if (isPlaying) {
      audio.play().catch((err) => {
        console.log("Audio playback blocked or failed:", err);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, audio]);

  // Audio event listeners
  useEffect(() => {
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleDurationChange = () => {
      if (audio.duration) setDuration(audio.duration);
    };
    const handleEnded = () => setIsPlaying(false);
    const handleError = () => {
      console.log("Audio failed to load or no audio provided.");
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('loadedmetadata', handleDurationChange);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('loadedmetadata', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [audio, isPlaying]);

  // Stop confetti after 12 seconds
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 12000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const handleGiftOpen = () => {
    setShowConfetti(true);
    setCurrentStage('garden');
    setIsPlaying(true);
    setShowMusicPlayer(true);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleGlobalClick = (e) => {
    // Spawn heart particle at click coordinate
    const newParticle = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
    };
    setClickParticles(prev => [...prev, newParticle].slice(-15)); // Keep max 15 particles in memory
  };

  // Cleanup particles after animation
  useEffect(() => {
    if (clickParticles.length > 0) {
      const timer = setTimeout(() => {
        setClickParticles(prev => prev.slice(1));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [clickParticles]);

  return (
    <div 
      onClick={handleGlobalClick}
      className="w-full min-h-screen bg-zinc-950 text-slate-100 flex flex-col justify-between select-none overflow-x-hidden font-sans relative"
    >
      {/* Interactive Features */}
      <InteractiveFeatures />

      {/* Mouse Trail Sparkle Emitter - MAXIMAL */}
      <AnimatePresence>
        {mouseTrail.map(p => (
          <motion.div
            key={p.id}
            initial={{ scale: 0, opacity: 1, x: p.x - 10, y: p.y - 10 }}
            animate={{ 
              scale: [0, 1.5, 0], 
              opacity: [1, 0.8, 0], 
              y: [p.y, p.y + 50],
              rotate: Math.random() * 360
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed z-[9998] pointer-events-none text-2xl select-none"
            style={{ 
              textShadow: '0 0 10px rgba(168,85,247,0.8)'
            }}
          >
            {['✨', '💫', '⭐', '🌟', '💎'][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Click Hearts Sparkle Emitter - MAXIMAL */}
      <AnimatePresence>
        {clickParticles.map(p => (
          <motion.div
            key={p.id}
            initial={{ scale: 0, opacity: 1, x: p.x - 15, y: p.y - 15 }}
            animate={{ 
              scale: [0, 1.8, 1], 
              opacity: [1, 1, 0], 
              y: [p.y, p.y - 150], 
              rotate: Math.random() * 720 - 360,
              x: [p.x, p.x + (Math.random() - 0.5) * 100]
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="fixed z-[9999] pointer-events-none text-4xl select-none"
            style={{ 
              textShadow: '0 0 20px rgba(244,63,94,0.8), 0 0 40px rgba(244,63,94,0.4)'
            }}
          >
            {['❤️', '💖', '💕', '✨', '💫'][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Confetti Overlay */}
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={true}
          numberOfPieces={150}
          gravity={0.15}
          colors={['#f43f5e', '#ec4899', '#d946ef', '#a855f7', '#f472b6', '#e879f9']}
        />
      )}

      {/* Main Page Transition Area */}
      <div className="flex-1 w-full relative pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full min-h-screen flex flex-col"
          >
            {currentStage === 'locked' && (
              <LockScreen onUnlock={() => setCurrentStage('unboxing')} />
            )}
            
            {currentStage === 'unboxing' && (
              <GiftBox 
                onOpen={handleGiftOpen} 
                onStartMusic={() => { setIsPlaying(true); setShowMusicPlayer(true); }}
              />
            )}
            
            {currentStage === 'garden' && (
              <FlowerGarden onComplete={() => setCurrentStage('serenade')} />
            )}
            
            {currentStage === 'serenade' && (
              <PhotoAlbum onComplete={() => setCurrentStage('scratch')} />
            )}
            
            {currentStage === 'scratch' && (
              <ScratchCard onReveal={() => setCurrentStage('message')} />
            )}
            
            {currentStage === 'message' && (
              <DirectMessageForm />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Bottom Left Music Player Card */}
      {showMusicPlayer && (
        <MusicPlayerCard 
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          currentTime={currentTime}
          duration={duration}
        />
      )}
    </div>
  );
}

export default App;
