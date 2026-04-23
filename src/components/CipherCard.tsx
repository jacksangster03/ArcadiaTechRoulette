import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Unlock, MapPin } from 'lucide-react';
import { EventMetadata } from '../types';

export function CipherCard({ event }: { event: EventMetadata }) {
  const [decoded, setDecoded] = useState(false);

  return (
    <div className="bg-[#1a2235] rounded-[2rem] p-8 border border-emerald-900/40 shadow-sm overflow-hidden relative group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-50 block"></div>
      
      <div className="flex justify-between items-start mb-6">
        <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-400 font-bold bg-emerald-900/40 px-3 py-1 rounded-full">Intercepted Intel</span>
        <span className="text-xs text-slate-500 font-mono">{new Date(event.timestamp).toLocaleString()}</span>
      </div>

      <div className="py-6 border-y border-white/5 my-6">
        <p className="text-4xl tracking-widest text-slate-200 leading-relaxed font-sans min-h-[48px] break-words">
          {event.cipherText}
        </p>
      </div>

      <AnimatePresence>
        {decoded && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <div className="bg-[#0f1423] rounded-xl p-6 mb-6 border border-emerald-500/20">
              <p className="text-[10px] uppercase font-bold text-emerald-500 tracking-widest mb-2">Decrypted Transmission</p>
              <p className="text-xl font-serif text-slate-300 italic">"{event.originalText}"</p>
            </div>
            
            {(event.latitude && event.longitude) ? (
              <div className="bg-slate-900 rounded-xl overflow-hidden aspect-video relative flex items-center justify-center border border-white/10">
                <iframe 
                  width="100%" 
                  height="100%" 
                  style={{border:0}} 
                  loading="lazy" 
                  allowFullScreen 
                  src={`https://www.google.com/maps?q=${event.latitude},${event.longitude}&z=15&output=embed`}
                  className="grayscale opacity-70"
                ></iframe>
                <div className="absolute top-4 left-4 bg-[#0f1423]/90 border border-emerald-500/20 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-bold text-slate-300">{event.locationName}</span>
                </div>
              </div>
            ): null}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8">
        <button 
          onClick={() => setDecoded(!decoded)}
          className="flex items-center gap-2 px-6 py-3 bg-emerald-900 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-emerald-800 transition-all shadow-md shadow-emerald-900/20"
        >
          {decoded ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
          <span>{decoded ? "Conceal Intel" : "Decode Intel"}</span>
        </button>
      </div>
    </div>
  );
}
