import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Shield, LogOut, Radio, PackageOpen, Users, MessageSquare, Send, Mic, MicOff, Plus, Trash2, Eye } from 'lucide-react';
import { AuctionLot, EventMetadata, MemberIdentity, DirectMessage } from '../types';
import { getAuctions, getEvents, generateIdentity, getMembers, getMessages, saveMessage, saveEvent, saveMember, removeMember, deleteMessage } from '../services/mockDB';
import { AuctionCard } from '../components/AuctionCard';
import { CipherCard } from '../components/CipherCard';
import { encodeForumCipher, extractLocation } from '../logic/cipher';
import { ai } from '../services/gemini';

export function ArcadiaDashboard({ onAdminToggle, onLogout }: { onAdminToggle: () => void; onLogout: () => void }) {
  const [lots, setLots] = useState<AuctionLot[]>([]);
  const [events, setEvents] = useState<EventMetadata[]>([]);
  const [identity, setIdentity] = useState<MemberIdentity | null>(null);
  const [activeTab, setActiveTab] = useState<'INTEL' | 'VAULT' | 'COMMS'>('INTEL');
  const [prophecy, setProphecy] = useState<string>("Aligning the stars for the next bidding cycle...");
  
  // Intel Input
  const [intelText, setIntelText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const recognitionRef = useRef<any>(null);
  
  // Comms
  const [members, setMembers] = useState<MemberIdentity[]>([]);
  const [selectedMember, setSelectedMember] = useState<MemberIdentity | null>(null);
  const [messages, setMessages] = useState<DirectMessage[]>([]);
  const [messageText, setMessageText] = useState("");
  const [isCreatingNewLink, setIsCreatingNewLink] = useState(false);
  const [newLinkCodename, setNewLinkCodename] = useState("");

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      recognition.onresult = (event: any) => {
        setIntelText(event.results[event.results.length - 1][0].transcript);
      };
      recognitionRef.current = recognition;
    }
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
    } else {
      setIntelText("");
      recognitionRef.current?.start();
    }
    setIsRecording(!isRecording);
  };

  useEffect(() => {
    const me = generateIdentity();
    setIdentity(me);
    setLots(getAuctions());
    setEvents(getEvents());
    setMembers(getMembers());
    setMessages(getMessages(me.id));

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
  }, [activeTab]);

  const handlePostIntel = () => {
    if (!intelText.trim()) return;
    const { loc, lat, lng } = extractLocation(intelText);
    const newEvent: EventMetadata = {
      id: "ev_" + Date.now().toString().slice(-4),
      originalText: intelText,
      cipherText: encodeForumCipher(intelText),
      locationName: loc,
      latitude: lat,
      longitude: lng,
      timestamp: Date.now(),
      authorId: isAnonymous ? undefined : identity?.id,
      authorName: isAnonymous ? undefined : identity?.codename
    };
    saveEvent(newEvent);
    setEvents(getEvents());
    setIntelText("");
    if (isRecording) {
      toggleRecording();
    }
  };

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedMember || !identity) return;
    const newMsg: DirectMessage = {
      id: "msg_" + Date.now().toString(),
      senderId: identity.id,
      senderName: identity.codename,
      receiverId: selectedMember.id,
      content: messageText,
      timestamp: Date.now()
    };
    saveMessage(identity.id, newMsg);
    setMessages(getMessages(identity.id));
    setMessageText("");
  };

  const handleEstablishLink = () => {
    if (!newLinkCodename.trim()) return;
    const newMember: MemberIdentity = {
        id: "mem_" + Date.now().toString(),
        codename: newLinkCodename,
        joinDate: Date.now()
    };
    saveMember(newMember);
    setMembers(getMembers());
    setSelectedMember(newMember);
    setIsCreatingNewLink(false);
    setNewLinkCodename('');
  };

  const handleDeleteMember = (memberId: string) => {
    removeMember(memberId);
    setMembers(getMembers());
    if (selectedMember?.id === memberId) {
      setSelectedMember(null);
    }
  };

  const handleDeleteMessage = (msgId: string) => {
    if (!identity) return;
    deleteMessage(identity.id, msgId);
    setMessages(getMessages(identity.id));
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 font-sans selection:bg-red-900/40 selection:text-red-100">
      <div className="max-w-7xl mx-auto py-12 px-6 flex flex-col md:flex-row gap-12">
        {/* Left Sidebar / Nav */}
        <div className="w-full md:w-64 shrink-0 flex flex-col gap-10 border-b border-zinc-900 pb-8 md:pb-0 md:border-b-0 md:border-r pr-6 relative">
          <div className="space-y-4">
             <div className="w-10 h-10 border border-zinc-800 flex items-center justify-center rounded-sm bg-zinc-950">
               <Eye className="w-5 h-5 text-red-900/80" />
             </div>
             <h2 className="text-2xl font-serif text-zinc-100 tracking-tight">The Syndicate</h2>
             <div className="h-[1px] w-8 bg-red-900/50 my-6"></div>
             
             {identity && (
              <div className="text-xs font-mono uppercase tracking-[0.2em] space-y-2">
                 <p className="text-zinc-600">Active Alias</p>
                 <p className="text-zinc-300 border border-zinc-800 px-3 py-2 bg-zinc-950/50 inline-block">{identity.codename}</p>
                 <div className="flex items-center gap-2 pt-2">
                   <div className="w-1.5 h-1.5 bg-red-800 rounded-full animate-pulse"></div>
                   <span className="text-[9px] text-zinc-500">Secure Connection</span>
                 </div>
              </div>
             )}
          </div>

          <div className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0">
            <button 
                onClick={() => setActiveTab('INTEL')}
                className={`flex items-center gap-3 px-4 py-3 shrink-0 uppercase tracking-widest text-xs transition-all border-l-2 ${activeTab === 'INTEL' ? 'border-red-900 text-zinc-100 bg-zinc-900/20' : 'border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/10'}`}
            >
                <Radio className="w-4 h-4" /> Global Intel
            </button>
            <button 
                onClick={() => setActiveTab('VAULT')}
                className={`flex items-center gap-3 px-4 py-3 shrink-0 uppercase tracking-widest text-xs transition-all border-l-2 ${activeTab === 'VAULT' ? 'border-red-900 text-zinc-100 bg-zinc-900/20' : 'border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/10'}`}
            >
                <PackageOpen className="w-4 h-4" /> The Vault
            </button>
            <button 
                onClick={() => setActiveTab('COMMS')}
                className={`flex items-center gap-3 px-4 py-3 shrink-0 uppercase tracking-widest text-xs transition-all border-l-2 ${activeTab === 'COMMS' ? 'border-red-900 text-zinc-100 bg-zinc-900/20' : 'border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/10'}`}
            >
                <MessageSquare className="w-4 h-4" /> Direct Shadows
            </button>
          </div>

          <div className="mt-auto pt-8 flex flex-col gap-3">
             <button onClick={onAdminToggle} className="text-left text-[10px] uppercase tracking-widest text-zinc-500 hover:text-zinc-300 flex items-center gap-2 transition-colors">
               <Terminal className="w-3.5 h-3.5" /> Architect Terminal
             </button>
             <button onClick={onLogout} className="text-left text-[10px] uppercase tracking-widest text-red-900/60 hover:text-red-700 flex items-center gap-2 transition-colors">
               <LogOut className="w-3.5 h-3.5" /> Sever Connection
             </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 w-full min-w-0">
          
          {/* LORE NOTICE */}
          <div className="mb-12 border-l border-red-900/30 pl-6 py-2 relative group">
             <p className="text-[9px] uppercase text-zinc-600 tracking-[0.3em] mb-2 font-mono">Present Cipher</p>
             <p className="text-xl md:text-2xl font-serif text-zinc-300 leading-snug">"{prophecy}"</p>
             <div className="absolute top-0 -left-[1px] w-[2px] h-0 bg-red-800 transition-all duration-700 group-hover:h-full"></div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'VAULT' && (
              <motion.div key="vault" initial={{opacity:0, filter:"blur(10px)"}} animate={{opacity:1, filter:"blur(0px)"}} exit={{opacity:0, filter:"blur(10px)"}} transition={{duration:0.4}}>
                  {lots.length === 0 ? (
                    <div className="p-16 text-center text-zinc-600 font-mono text-[10px] tracking-[0.2em] uppercase border border-zinc-900 bg-zinc-950/30">No artifacts currently held in the vault.</div>
                  ) : (
                    <div className="grid grid-cols-1 gap-8">
                       {lots.map(lot => <AuctionCard key={lot.id} lot={lot} />)}
                    </div>
                  )}
              </motion.div>
            )}

            {activeTab === 'INTEL' && (
              <motion.div key="intel" initial={{opacity:0, filter:"blur(10px)"}} animate={{opacity:1, filter:"blur(0px)"}} exit={{opacity:0, filter:"blur(10px)"}} transition={{duration:0.4}}>
                 <div className="mb-10 p-6 md:p-8 bg-zinc-950 border border-zinc-900 flex flex-col gap-6 shadow-2xl relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-900/5 blur-[60px] pointer-events-none"></div>
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                       <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest max-w-sm">Broadcast to the public archive. Your words will be automatically encrypted into symbols.</p>
                       <button 
                         onClick={() => setIsAnonymous(!isAnonymous)}
                         className={`px-4 py-2 text-[10px] uppercase font-mono tracking-widest border transition-all ${isAnonymous ? 'border-red-900/50 text-red-700 bg-red-950/10' : 'border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300'}`}
                       >
                         {isAnonymous ? '[Ghost Mode]' : 'Anonymous Off'}
                       </button>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-4">
                      <button 
                        onClick={toggleRecording}
                        className={`shrink-0 w-14 h-14 border transition-all flex items-center justify-center ${isRecording ? 'bg-red-950/50 text-red-500 border-red-900/50 animate-pulse' : 'bg-black text-zinc-500 border-zinc-800 hover:border-zinc-600'}`}
                      >
                        {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                      </button>
                      <textarea 
                        value={intelText}
                        onChange={(e) => setIntelText(e.target.value)}
                        placeholder={isRecording ? "Capturing transmission..." : "Encode your coordinates here..."} 
                        className="flex-1 bg-black border border-zinc-800 px-5 py-4 text-zinc-300 focus:outline-none focus:border-red-900/50 font-serif resize-none min-h-[56px] transition-colors"
                      />
                      <button onClick={handlePostIntel} disabled={!intelText} className="shrink-0 bg-zinc-100 text-black px-8 py-4 font-mono font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-zinc-300 transition-colors flex items-center justify-center gap-3 disabled:opacity-30 disabled:hover:bg-zinc-100 h-[56px]">
                         Transmit
                      </button>
                    </div>
                 </div>
                 
                 {events.length === 0 ? (
                    <div className="p-16 text-center text-zinc-600 font-mono text-[10px] tracking-[0.2em] uppercase border border-zinc-900 bg-zinc-950/30">Archive empty. Await the first transmission.</div>
                  ) : (
                    <div className="grid grid-cols-1 gap-6">
                       {events.map((ev: any) => <CipherCard key={ev.id} event={ev} />)}
                    </div>
                  )}
              </motion.div>
            )}

            {activeTab === 'COMMS' && (
               <motion.div key="comms" initial={{opacity:0, filter:"blur(10px)"}} animate={{opacity:1, filter:"blur(0px)"}} exit={{opacity:0, filter:"blur(10px)"}} transition={{duration:0.4}} className="h-[600px] flex flex-col md:flex-row border border-zinc-900 bg-zinc-950 relative overflow-hidden shadow-2xl">
                  {/* Left Column: Shadow List */}
                  <div className="w-full md:w-1/3 flex flex-col border-b md:border-b-0 md:border-r border-zinc-900 bg-black/50">
                     <div className="p-4 border-b border-zinc-900 flex justify-between items-center bg-black">
                       <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 font-mono">Known Shadows</p>
                       <button onClick={() => { setIsCreatingNewLink(true); setSelectedMember(null); }} className="text-zinc-400 hover:text-zinc-100 transition-colors p-1" title="New Link">
                          <Plus className="w-4 h-4" />
                       </button>
                     </div>
                     <div className="flex-1 overflow-y-auto">
                         {members.map(m => (
                           <div
                             key={m.id}
                             className={`group w-full flex items-center justify-between px-5 py-4 border-b border-zinc-900/50 cursor-pointer transition-colors ${selectedMember?.id === m.id ? 'bg-red-950/10 border-l-2 border-l-red-900' : 'hover:bg-zinc-900/30 border-l-2 border-l-transparent'}`}
                             onClick={() => { setSelectedMember(m); setIsCreatingNewLink(false); }}
                           >
                             <p className={`font-mono text-xs uppercase tracking-widest ${selectedMember?.id === m.id ? 'text-red-600/80' : 'text-zinc-400'}`}>{m.codename}</p>
                             <button 
                               onClick={(e) => { e.stopPropagation(); handleDeleteMember(m.id); }}
                               className="text-zinc-700 opacity-0 group-hover:opacity-100 hover:text-red-800 transition-all"
                               title="Sever Link"
                             >
                               <Trash2 className="w-3.5 h-3.5" />
                             </button>
                           </div>
                         ))}
                         {members.length === 0 && (
                             <p className="text-center text-zinc-600 font-mono text-[9px] uppercase tracking-[0.2em] uppercase p-6">No links established</p>
                         )}
                     </div>
                  </div>

                  {/* Right Column: Chat View */}
                  <div className="flex-1 flex flex-col relative bg-[#050505]">
                     {isCreatingNewLink ? (
                        <div className="flex-1 flex flex-col items-center justify-center space-y-8 p-8">
                            <div className="w-20 h-20 border border-red-900/30 rounded-sm flex items-center justify-center bg-black shadow-[0_0_40px_rgb(153,27,27,0.1)] relative">
                                <div className="absolute inset-0 bg-red-900/10 animate-ping rounded-sm"></div>
                                <Radio className="w-8 h-8 text-red-900/80 z-10" />
                            </div>
                            <div className="text-center space-y-2">
                                <h3 className="text-xl font-serif text-zinc-300">Establish Link</h3>
                                <p className="text-xs text-zinc-600 max-w-xs font-mono uppercase tracking-widest leading-relaxed">Provide target codename to initiate cryptographic handshake.</p>
                            </div>
                            <div className="flex md:flex-row flex-col gap-4 w-full max-w-sm mt-4">
                                <input 
                                    type="text"
                                    placeholder="Target Codename..."
                                    value={newLinkCodename}
                                    onChange={(e) => setNewLinkCodename(e.target.value)}
                                    className="flex-1 bg-black border border-zinc-800 px-4 py-3 text-zinc-300 focus:outline-none focus:border-red-900/50 font-mono uppercase text-xs tracking-widest text-center md:text-left"
                                />
                                <button 
                                    onClick={handleEstablishLink} 
                                    disabled={!newLinkCodename.trim()}
                                    className="bg-zinc-200 text-black px-6 py-3 font-mono font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-white transition-colors disabled:opacity-20"
                                >
                                    Connect
                                </button>
                            </div>
                        </div>
                     ) : selectedMember ? (
                       <>
                          <div className="p-6 border-b border-zinc-900 bg-black flex items-center gap-4">
                             <div className="w-2 h-2 bg-red-900/80"></div>
                             <div>
                               <p className="font-mono text-xs text-zinc-500 tracking-[0.2em] uppercase">Encrypted Link</p>
                               <p className="font-serif text-lg text-zinc-200">{selectedMember.codename}</p>
                             </div>
                          </div>
                          
                          <div className="flex-1 overflow-y-auto p-6 space-y-6">
                             {messages.filter(m => (m.senderId === selectedMember.id && m.receiverId === identity?.id) || (m.senderId === identity?.id && m.receiverId === selectedMember.id)).map(m => {
                                const isMe = m.senderId === identity?.id;
                                return (
                                  <div key={m.id} className={`flex group ${isMe ? 'justify-end' : 'justify-start'}`}>
                                     <div className={`flex items-center gap-3 max-w-[85%] ${isMe ? 'flex-row' : 'flex-row-reverse'}`}>
                                       <button 
                                         onClick={() => handleDeleteMessage(m.id)}
                                         className="opacity-0 group-hover:opacity-100 p-1.5 text-zinc-700 hover:text-red-800 transition-all shrink-0 bg-zinc-900/30 rounded-sm"
                                         title="Delete Message"
                                       >
                                         <Trash2 className="w-3.5 h-3.5" />
                                       </button>
                                       <div className={`px-5 py-4 border ${isMe ? 'bg-zinc-900/40 border-zinc-800 text-zinc-300' : 'bg-black border-zinc-900 text-zinc-400'}`}>
                                          <p className="font-serif text-[15px] leading-relaxed relative">
                                            {isMe && <span className="absolute -left-3 top-2 w-[1px] h-[70%] bg-zinc-700"></span>}
                                            {!isMe && <span className="absolute -right-3 top-2 w-[1px] h-[70%] bg-red-900/30"></span>}
                                            {m.content}
                                          </p>
                                          <p className="text-[8px] font-mono uppercase tracking-[0.2em] mt-3 opacity-40 text-right">
                                             {new Date(m.timestamp).toLocaleTimeString()}
                                          </p>
                                       </div>
                                     </div>
                                  </div>
                                );
                             })}
                             {messages.length === 0 && (
                                <div className="h-full flex items-center justify-center">
                                  <p className="text-zinc-700 text-[10px] tracking-[0.2em] uppercase font-mono border border-zinc-900 p-4">Silence on the line</p>
                                </div>
                             )}
                          </div>

                          <div className="p-6 bg-black border-t border-zinc-900">
                             <div className="flex gap-4">
                                <input 
                                  type="text"
                                  placeholder="Draft transmission..."
                                  className="flex-1 bg-[#050505] border border-zinc-800 px-4 py-3 text-zinc-300 focus:outline-none focus:border-zinc-600 font-serif transition-colors"
                                  value={messageText}
                                  onChange={(e) => setMessageText(e.target.value)}
                                  onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage() }}
                                />
                                <button onClick={handleSendMessage} disabled={!messageText.trim()} className="bg-zinc-200 text-black px-6 font-mono font-bold uppercase tracking-widest text-[10px] hover:bg-white transition-colors disabled:opacity-20">
                                   Send
                                </button>
                             </div>
                          </div>
                       </>
                     ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-zinc-700 p-8 text-center">
                           <MessageSquare className="w-8 h-8 mb-6 opacity-30" />
                           <p className="font-mono text-[10px] uppercase tracking-[0.2em]">Connection Terminal Offline</p>
                           <p className="text-zinc-600/50 mt-2 text-xs font-serif italic max-w-xs">Select an established link from the registry to begin communication.</p>
                        </div>
                     )}
                  </div>
               </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
