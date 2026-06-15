import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Music, Heart } from 'lucide-react';
import { CONFIG } from '../config';

export default function MusicPlayerCard() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const setTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setTime);

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setTime);
    };
  }, []);

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={CONFIG.musicPlayer.audioUrl}
        loop
      />

      <motion.div
        className="fixed bottom-20 left-3 z-50 w-40 h-[210px] glass rounded-lg p-2 shadow-lg"
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={{ scale: 1.03 }}
      >
        {/* Cover Art */}
        <div className="w-full aspect-square rounded overflow-hidden mb-2">
          <img
            src={CONFIG.musicPlayer.coverUrl}
            alt="Album Cover"
            className="w-full h-full object-cover grayscale contrast-125"
          />
        </div>

        {/* Song Details */}
        <div className="text-center mb-2">
          <h4 className="text-xs font-bold text-white truncate">
            {CONFIG.musicPlayer.title}
          </h4>
          <p className="text-[10px] text-zinc-400 truncate">
            {CONFIG.musicPlayer.artist}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-2">
          <div className="w-full h-1 bg-zinc-700 rounded-full">
            <div
              className="h-full bg-pink-500 rounded-full"
              style={{
                width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`
              }}
            />
          </div>
          <div className="flex justify-between text-[8px] text-zinc-500 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration || 297)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          <SkipBack size={14} className="text-zinc-400" />
          <motion.button
            onClick={handlePlayPause}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center"
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
          </motion.button>
          <SkipForward size={14} className="text-zinc-400" />
        </div>
      </motion.div>
    </>
  );
}
