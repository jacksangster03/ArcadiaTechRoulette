import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Shield, LogOut, Radio, PackageOpen } from 'lucide-react';
import { AuctionLot, EventMetadata } from '../types';
import { getAuctions, getEvents } from '../services/mockDB';
import { AuctionCard } from '../components/AuctionCard';
import { CipherCard } from '../components/CipherCard';
import { ai } from '../services/gemini';

export function ArcadiaDashboard({ onAdminToggle, onLogout }: { onAdminToggle: () => void; onLogout: () => void }) {
  const [lots, setLots] = useState<AuctionLot[]>([]);
  const [events, setEvents] = useState<EventMetadata[]>([]);
  const [activeTab, setActiveTab] = useState<'VAULT' | 'INTEL'>('VAULT');
  const [prophecy, setProphecy] = useState<string>("Aligning the stars for the next bidding cycle...");

  useEffect(() => {
    setLots(getAuctions());
    setEvents(getEvents());

    // Generate daily lore prophecy relevant to an auction
    async function loadLore() {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: "Generate a mysterious, cryptic single-sentence prophecy about a dark, secretive underground auction house selling supernatural artifacts.",
        });
        setProphecy(response.text || "The gavel falls where shadows stretch the longest.");
      } catch (err) {
         setProphecy("The gavel falls where shadows stretch the longest.");
      }
    }
    loadLore();
  }, [activeTab]); // added to re-fetch when tab switches (so admin additions show)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto py-12">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-emerald-900/30 pb-8 gap-6">
        <div>
          <h2 className="text-4xl font-serif font-bold text-white tracking-tight flex items-center gap-3">
             <Shield className="w-8 h-8 text-emerald-500" />
             The Syndicate Auction
          </h2>
          <div className="flex items-center gap-3 mt-4">
            <span className="bg-emerald-900/40 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase">Rank: Bidder</span>
            <span className="text-slate-500 font-mono text-[10px] uppercase tracking-widest">Inner Circle Access</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <button onClick={onAdminToggle} className="flex items-center gap-2 px-4 py-2 border border-emerald-500/30 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-emerald-900/20 text-emerald-500 transition-colors">
            <Terminal className="w-4 h-4" /> Transmit / Register
          </button>
          <button onClick={onLogout} className="flex items-center gap-2 px-4 py-2 bg-red-900/20 text-red-400 border border-red-500/20 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-red-900/40 transition-colors">
            <LogOut className="w-4 h-4" /> Disconnect
          </button>
        </div>
      </div>

      {/* LORE CARD */}
      <div className="mb-10 bg-[#1a2235] rounded-[2rem] p-8 border border-white/5 shadow-xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>
         <p className="text-[10px] uppercase font-bold text-emerald-500 tracking-widest mb-3">House Notice</p>
         <p className="text-xl md:text-2xl font-serif italic text-slate-300 leading-relaxed max-w-3xl">"{prophecy}"</p>
      </div>

      {/* TABS */}
      <div className="flex items-center gap-4 mb-8">
         <button 
            onClick={() => setActiveTab('VAULT')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'VAULT' ? 'bg-emerald-600 text-white' : 'bg-transparent text-slate-500 hover:text-white'}`}
         >
            <PackageOpen className="w-4 h-4" /> The Vault
         </button>
         <button 
            onClick={() => setActiveTab('INTEL')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'INTEL' ? 'bg-emerald-600 text-white' : 'bg-transparent text-slate-500 hover:text-white'}`}
         >
            <Radio className="w-4 h-4" /> Intel Hub
         </button>
      </div>

      {/* EVENTS / LOTS */}
      <div className="space-y-8">
        <AnimatePresence mode="wait">
          {activeTab === 'VAULT' && (
            <motion.div key="vault" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}}>
                {lots.length === 0 ? (
                  <div className="p-12 text-center text-slate-500 font-mono text-sm tracking-widest uppercase border border-white/5 rounded-3xl border-dashed">No active lots in the vault.</div>
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                     {lots.map(lot => <AuctionCard key={lot.id} lot={lot} />)}
                  </div>
                )}
            </motion.div>
          )}

          {activeTab === 'INTEL' && (
            <motion.div key="intel" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}}>
               <div className="mb-6 p-4 rounded-xl bg-emerald-900/20 border border-emerald-500/20">
                  <p className="text-sm font-mono text-emerald-400">Notice: Voice-encrypted hints and decyption keys for vault items are often dropped here by admins.</p>
               </div>
               {events.length === 0 ? (
                  <div className="p-12 text-center text-slate-500 font-mono text-sm tracking-widest uppercase border border-white/5 rounded-3xl border-dashed">No intel transmissions captured.</div>
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                     {events.map(ev => <CipherCard key={ev.id} event={ev} />)}
                  </div>
                )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
