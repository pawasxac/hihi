import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Heart, MessageSquare } from 'lucide-react';
import { CONFIG } from '../config';

export default function DirectMessageForm() {
  const [message, setMessage] = useState(CONFIG.directMessage.defaultTemplate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const encodedMessage = encodeURIComponent(message.trim());
    const whatsappUrl = `https://wa.me/${CONFIG.directMessage.whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-radial from-slate-900 via-zinc-950 to-black overflow-hidden relative">
      {/* Sparkle and glow elements */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main glass card container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="w-full max-w-md p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl relative z-10 flex flex-col items-center text-center"
      >
        {/* Pulsating heart ornament */}
        <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-full bg-rose-500/10 border border-rose-500/20 shadow-[0_0_20px_rgba(244,63,94,0.2)]"
          />
          <Heart size={32} className="text-rose-500 fill-current animate-pulse z-10" />
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-white mb-2 font-serif">
          {CONFIG.directMessage.title}
        </h1>
        <p className="text-slate-400 text-sm mb-6 max-w-xs leading-relaxed">
          {CONFIG.directMessage.subtitle}
        </p>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="text-left">
            <label className="block text-xs font-semibold text-pink-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <MessageSquare size={12} /> Tulis Pesanmu
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ketik doa atau pesan balasanmu di sini..."
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition duration-300 resize-none text-sm leading-relaxed"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold rounded-xl transition duration-300 shadow-[0_4px_15px_rgba(244,63,94,0.3)] hover:shadow-[0_6px_20px_rgba(244,63,94,0.4)] flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Kirim ke WhatsApp <Send size={16} />
          </button>
        </form>

        <div className="mt-8 text-[10px] text-slate-500 uppercase tracking-widest font-semibold flex items-center gap-1">
          Made with Love for your Special Day 🤍
        </div>
      </motion.div>
    </div>
  );
}
