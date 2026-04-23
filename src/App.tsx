/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, 
  Mic, 
  MicOff, 
  ChevronRight, 
  Utensils, 
  Lock, 
  Unlock, 
  X,
  RefreshCw,
  Sparkles,
  Search,
  Send,
  Key,
  EyeOff
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// Initialization
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// TYPES
interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  duration?: string;
  difficulty?: string;
  popularity?: number;
}

const RECIPES: Recipe[] = [
  {
    id: 'sourdough',
    title: "Philosopher's Sourdough",
    description: 'A 72-hour fermented loaf with a crispy crust. The starter was passed down through ancient alchemical lineages.',
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=800',
    duration: '72h',
    difficulty: 'Expert',
  },
  {
    id: 'galette',
    title: 'Crimson Berry Galette',
    description: 'Rustic pastry filled with seasonal berries, a hint of lavender, and a dash of cinnabar spice.',
    image: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&q=80&w=800',
    popularity: 88,
  },
  {
    id: 'miso',
    title: "Golden Miso Elixir",
    description: 'A deeply aromatic, life-restoring broth infused with black garlic and toasted chili oil.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800',
    popularity: 94,
  },
  {
    id: 'honey_cake',
    title: 'Lavender Honey Cake',
    description: 'A light, floral sponge cake sweetened with nectar harvested during the spring equinox.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'ash_bread',
    title: 'Charcoal & Ash Rye',
    description: 'Dark, dense bread baked in the dying embers of a sacred fire. Pairs perfectly with aged cheeses.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800',
    popularity: 76,
  },
  {
    id: 'matcha',
    title: 'Emerald Matcha Tiramisu',
    description: 'Layers of delicate mascarpone and matcha-soaked ladyfingers, offering a balance of bitter and sweet energies.',
    image: 'https://images.unsplash.com/photo-1571115177098-24deab4393ce?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'macarons',
    title: 'Midnight Blue Macarons',
    description: 'Almond shells tinted with butterfly pea flower, filled with a rich, dark chocolate ganache.',
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&q=80&w=800',
    popularity: 91,
  },
  {
    id: 'focaccia',
    title: 'Sun-Dried Tomato Focaccia',
    description: 'Soft, olive oil-rich dough dimpled with herbs and tomatoes, capturing the essence of the summer sun.',
    image: 'https://images.unsplash.com/photo-1594943714247-a859cff2e78f?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'consomme',
    title: 'Crystal Clear Consommé',
    description: 'A clarified broth resulting from hours of meticulous simmering and purification. True culinary alchemy.',
    image: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?auto=format&fit=crop&q=80&w=800',
  }
];

const EMOJI_MAP: Record<string, string> = {
  'a': '🕯️', 'b': '🗝️', 'c': '📜', 'd': '🎭', 'e': '🌲', 'f': '🍄', 'g': '🌙', 'h': '🦉',
  'i': '💎', 'j': '🎐', 'k': '🧪', 'l': '🍃', 'm': '🗻', 'n': '🕸️', 'o': '🌕', 'p': '🏺',
  'q': '🧬', 'r': '🌋', 's': '⚔️', 't': '⏳', 'u': '🧿', 'v': '🦅', 'w': '🌊', 'x': '💀',
  'y': '🌿', 'z': '⛓️', ' ': '  ',
};

// COMPONENTS
export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [showHub, setShowHub] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRecipes = useMemo(() => {
    return RECIPES.filter(recipe => 
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    
    // Arcadia Trigger
    if (value.toLowerCase().trim() === "et in arcadia ego") {
      setSearchQuery("");
      if (unlocked) {
        setShowHub(true);
      } else {
        setIsScanning(true);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col max-w-[1400px] mx-auto overflow-x-hidden">
      {/* HEADER */}
      <header className="p-8 md:p-12 flex justify-between items-end">
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-800">Alchemy</p>
          <h1 className="text-5xl font-serif font-black italic tracking-tighter">The Culinary Vault</h1>
        </div>
        <div className="hidden md:flex items-center gap-4 text-sm font-medium">
          <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
            <div className={`w-2 h-2 rounded-full bg-emerald-500 ${unlocked ? 'opacity-100' : 'animate-pulse'}`}></div> 
            {isScanning ? "Initiating Protocol..." : unlocked ? "Arcadia Accessible" : "System Secure"}
          </span>
          <span className="text-slate-400 font-mono text-[10px]">v3.0.0-alchemy</span>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 md:p-12 pt-0 pb-20">
        {!showHub ? (
          <div className="flex flex-col space-y-8">
            
            {/* SEARCH BAR */}
            <div className="relative max-w-2xl">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search the archives, ingredients, or hidden truths..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-full py-4 pl-16 pr-6 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg font-serif italic placeholder:not-italic placeholder:text-slate-400 placeholder:font-sans placeholder:text-sm transition-all"
              />
            </div>

            {/* DYNAMIC RECIPES GRID */}
            {filteredRecipes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 h-full min-h-[600px]">
                {filteredRecipes.map((recipe, index) => {
                  const isFeatured = index === 0 && searchQuery === "";
                  return (
                    <RecipeCard key={recipe.id} recipe={recipe} isFeatured={isFeatured} />
                  );
                })}
                
                {/* SYSTEM AREA: MOCK/HINT AREA that fits into the grid */}
                <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-2 bg-[#F3EFE9] rounded-[2rem] border-2 border-dashed border-slate-300 p-8 flex flex-col justify-center overflow-hidden min-h-[200px]">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col space-y-4">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Protocol: Arcadia</span>
                      <div className="flex items-center gap-4">
                        <div className="w-4 h-4 bg-emerald-500/20 rounded-full flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></div>
                        </div>
                        <div className="space-y-2">
                          <div className="w-64 h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div className="w-1/3 h-full bg-slate-400/20 animate-[pulse_2s_infinite]"></div>
                          </div>
                          <div className="w-40 h-2 bg-slate-200 rounded-full opacity-50"></div>
                        </div>
                      </div>
                    </div>
                    <div className="hidden sm:flex text-right flex-col items-end">
                      <p className="text-[10px] font-mono text-slate-400 mb-3 uppercase tracking-widest">Encryption Layers</p>
                      <div className="flex gap-2">
                        {['🤫', '🗝️', '🤐'].map((emoji, i) => (
                          <span key={i} className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-lg grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all cursor-crosshair" title="Seek: Et in Arcadia Ego" >
                            {emoji}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="min-h-[400px] flex items-center justify-center text-slate-400 font-serif italic text-xl">
                No alchemical records found for your query. 
              </div>
            )}
          </div>
        ) : (
          <ArcadiaHub onBack={() => setShowHub(false)} />
        )}
      </main>

      {/* OVERLAYS */}
      <AnimatePresence>
        {isScanning && (
          <VisionScanner 
            onClose={() => setIsScanning(false)} 
            onSuccess={() => {
              setIsScanning(false);
              setUnlocked(true);
              setShowHub(true);
            }} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function RecipeCard({ recipe, isFeatured }: { recipe: Recipe; isFeatured: boolean }) {
  if (isFeatured) {
    return (
      <div className="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2 row-span-2 bento-card p-10 flex flex-col justify-between relative overflow-hidden group min-h-[400px]">
        <div className="relative z-10 w-full md:w-3/5">
          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-3 py-1 rounded-full mb-6 inline-block tracking-widest">FEATURED RECORD</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold leading-[1.0] tracking-tighter mb-4">{recipe.title}</h2>
          <p className="text-slate-500 font-medium leading-relaxed mb-8">{recipe.description}</p>
        </div>
        
        {recipe.duration && recipe.difficulty && (
          <div className="flex gap-8 relative z-10">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Curing Time</span>
              <span className="text-xl font-serif italic">{recipe.duration}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Difficulty</span>
              <span className="text-xl font-serif italic">{recipe.difficulty}</span>
            </div>
          </div>
        )}
        
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-50 group-hover:bg-amber-50 transition-colors duration-700 pointer-events-none"></div>
        <img 
          src={recipe.image} 
          className="absolute right-0 top-0 w-full md:w-1/2 h-full object-cover opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none mix-blend-multiply"
          alt=""
        />
      </div>
    );
  }

  // Standard Bento Recipe Card
  return (
    <div className="col-span-1 bento-card p-6 flex flex-col group min-h-[280px]">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-2xl font-serif font-bold tracking-tight pr-4">{recipe.title}</h3>
        <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:rotate-45 transition-transform">
          <Utensils className="w-4 h-4 text-slate-400" />
        </div>
      </div>
      <p className="text-slate-500 text-sm mb-6 leading-relaxed flex-grow">{recipe.description}</p>
      
      {recipe.popularity && (
        <div className="mt-auto flex items-center gap-3 pt-4 border-t border-slate-100">
          <div className="h-1.5 flex-grow bg-slate-100 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${recipe.popularity}%` }} className="h-full bg-emerald-600" />
          </div>
          <span className="text-[10px] font-mono font-bold text-slate-400 whitespace-nowrap">{recipe.popularity}% RATE</span>
        </div>
      )}
    </div>
  );
}

function VisionScanner({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function setupCamera() {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
        setStream(s);
        if (videoRef.current) videoRef.current.srcObject = s;
      } catch (err) {
        setError("Camera access denied. Please enable it to proceed.");
      }
    }
    setupCamera();
    return () => stream?.getTracks().forEach(t => t.stop());
  }, []);

  const captureAndAnalyze = async () => {
    if (!videoRef.current || analyzing) return;
    setAnalyzing(true);
    setError(null);

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0);
    const base64Image = canvas.toDataURL('image/jpeg').split(',')[1];

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            parts: [
              { text: "Is the person in this photo holding a BIC PEN? Answer only with 'YES' or 'NO'." },
              { inlineData: { mimeType: "image/jpeg", data: base64Image } }
            ]
          }
        ],
      });

      const text = response.text?.toUpperCase() || "";
      if (text.includes("YES")) {
        onSuccess();
      } else {
        setError("Alchemy requires the correct catalyst (a BIC pen). Try again.");
      }
    } catch (err) {
      setError("Vision algorithm failed. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#FAF7F2]/95 backdrop-blur-md flex items-center justify-center p-6"
    >
      <div className="max-w-2xl w-full bg-[#111827] rounded-[2rem] shadow-2xl overflow-hidden border border-emerald-500/20 relative">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full z-10 transition-colors">
          <X className="w-6 h-6" />
        </button>

        <div className="p-12 space-y-8 text-center">
          <div className="space-y-2">
            <h2 className="text-4xl font-serif italic text-white flex items-center justify-center gap-3">
              <Sparkles className="w-8 h-8 text-emerald-400" />
              The Alchemist's Gate
              <Sparkles className="w-8 h-8 text-emerald-400" />
            </h2>
            <p className="text-sm tracking-widest uppercase text-emerald-400/70">Hold up your catalyst (a BIC PEN) to access Arcadia</p>
          </div>

          <div className="relative aspect-video bg-black rounded-xl overflow-hidden border border-white/10 shadow-inner">
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 border-2 border-dashed border-emerald-500/30 m-8 rounded-lg pointer-events-none" />
            
            {analyzing && (
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white space-y-4 backdrop-blur-sm">
                <RefreshCw className="w-12 h-12 text-emerald-400 animate-spin" />
                <p className="text-xs text-emerald-400 uppercase tracking-widest font-mono font-semibold">Analyzing Catalyst...</p>
              </div>
            )}
          </div>

          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm font-mono font-medium">
              {error}
            </motion.p>
          )}

          <button 
            disabled={analyzing}
            onClick={captureAndAnalyze}
            className="w-full py-4 bg-emerald-600 text-white rounded-full font-bold uppercase tracking-widest shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-3 hover:bg-emerald-500 transition-colors disabled:opacity-50"
          >
            <Camera className="w-5 h-5" />
            <span>Present Catalyst</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

interface ForumMessage {
  id: string;
  originalText: string;
  encryptedText: string;
  timestamp: number;
}

const encryptString = (str: string) => str.toLowerCase().split('').map((char: string) => EMOJI_MAP[char] || char).join('');

function ArcadiaHub({ onBack }: { onBack: () => void }) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [encrypted, setEncrypted] = useState("");
  const recognitionRef = useRef<any>(null);

  const [messages, setMessages] = useState<ForumMessage[]>(() => {
    const saved = localStorage.getItem('arcadia_messages');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: '1',
        originalText: 'the true alchemist seeks not gold but wisdom',
        encryptedText: encryptString('the true alchemist seeks not gold but wisdom'),
        timestamp: Date.now() - 3600000,
      },
      {
         id: '2',
         originalText: 'beware the false prophets of the culinary guild',
         encryptedText: encryptString('beware the false prophets of the culinary guild'),
         timestamp: Date.now() - 1800000,
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('arcadia_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const current = event.results[event.results.length - 1][0].transcript;
        setTranscript(current);
        const code = encryptString(current);
        setEncrypted(code);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
    } else {
      setTranscript("");
      setEncrypted("");
      recognitionRef.current?.start();
    }
    setIsRecording(!isRecording);
  };

  const handlePost = () => {
    if (!transcript) return;
    const newMessage = {
      id: Date.now().toString(),
      originalText: transcript,
      encryptedText: encrypted,
      timestamp: Date.now()
    };
    setMessages((prev) => [newMessage, ...prev]);
    setTranscript("");
    setEncrypted("");
    setIsRecording(false);
    recognitionRef.current?.stop();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-6xl mx-auto space-y-12 py-12"
    >
      <div className="text-center space-y-4">
        <button onClick={onBack} className="text-xs font-bold uppercase text-emerald-800 tracking-widest opacity-60 hover:opacity-100 mb-6 transition-opacity flex items-center justify-center gap-1 mx-auto">
          <ChevronRight className="w-4 h-4 rotate-180" />
          Leave Arcadia
        </button>
        <h2 className="text-7xl md:text-8xl font-serif text-slate-900 leading-none tracking-tighter flex items-center justify-center space-x-4">
          <Sparkles className="w-10 h-10 md:w-16 md:h-16 text-emerald-600 hidden md:block" />
          <span className="bg-gradient-to-br from-slate-900 to-slate-700 bg-clip-text text-transparent">Arcadia Forum</span>
        </h2>
        <p className="text-sm md:text-base tracking-[0.3em] font-mono uppercase text-emerald-800 opacity-60">Speak your truths. Transmute them. Share them.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-[600px]">
        {/* INPUT: The Crucible */}
        <div className="md:col-span-4 lg:col-span-5 bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl flex flex-col items-center justify-between relative overflow-hidden group h-full">
          <div className="absolute inset-0 bg-emerald-50/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="w-full text-center relative z-10 pt-4">
            <h3 className="text-xl font-serif italic text-slate-800">The Crucible</h3>
            <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-2">Record & Encrypt</p>
          </div>

          <div className={`z-10 p-8 rounded-full transition-all duration-700 ${isRecording ? 'bg-red-500/10 scale-110' : 'bg-slate-50 border border-slate-100'}`}>
            <button 
              onClick={toggleRecording}
              className={`p-6 rounded-full transition-all flex items-center justify-center shadow-lg ${isRecording ? 'bg-red-500 text-white animate-pulse shadow-red-500/50' : 'bg-slate-900 text-white hover:scale-110 shadow-slate-900/20'}`}
            >
              {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
            </button>
          </div>
          
          <div className="z-10 w-full flex flex-col items-center space-y-4 pb-4">
            {transcript ? (
              <div className="space-y-4 w-full text-center">
                <p className="text-sm font-serif italic text-slate-600 line-clamp-2">"{transcript}"</p>
                <div className="text-2xl tracking-widest break-all line-clamp-2 leading-relaxed h-16">{encrypted}</div>
                <button 
                  onClick={handlePost}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-emerald-500/20 flex flex-row items-center justify-center space-x-2 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Post to Ledger</span>
                </button>
              </div>
            ) : (
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                {isRecording ? "Transmuting your voice..." : "Click to start the ritual"}
              </p>
            )}
          </div>
        </div>

        {/* OUTPUT: The Ledger */}
        <div className="md:col-span-8 lg:col-span-7 bg-[#111827] p-8 rounded-[2rem] shadow-xl flex flex-col relative overflow-hidden h-full">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/30 via-transparent to-transparent opacity-60"></div>
          
          <div className="w-full flex justify-between items-center opacity-40 relative z-10 mb-8 shrink-0">
             <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <div className="w-2 h-2 rounded-full bg-white opacity-50" />
                <div className="w-2 h-2 rounded-full bg-white opacity-20" />
             </div>
             <p className="text-[10px] font-mono leading-none tracking-widest text-white uppercase">The Architect's Ledger</p>
          </div>

          <div className="flex-1 overflow-y-auto relative z-10 w-full space-y-4 pr-2 custom-scrollbar">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-20 user-select-none">
                 <Lock className="w-16 h-16 mx-auto text-emerald-100" />
                 <p className="text-white text-[10px] font-mono uppercase tracking-[0.4em]">The Ledger is Empty</p>
              </div>
            ) : (
              <AnimatePresence>
                {messages.map((msg) => (
                  <ForumMessageItem key={msg.id} message={msg} />
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ForumMessageItem({ message }: { message: ForumMessage }) {
  const [isDecrypted, setIsDecrypted] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [keyInput, setKeyInput] = useState("");
  const [error, setError] = useState("");

  const handleDecrypt = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyInput === "Secreto") {
      setIsDecrypted(true);
      setIsUnlocking(false);
      setError("");
    } else {
      setError("Invalid alchemical key.");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 border border-emerald-500/20 backdrop-blur-sm p-6 rounded-2xl relative overflow-hidden group"
    >
      <div className="flex justify-between items-center mb-4 opacity-60">
        <span className="text-[10px] text-emerald-400 font-mono tracking-widest uppercase">Anonymous Scholar</span>
        <span className="text-[10px] text-slate-400 font-mono">{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
      
      <div className={`mb-6 break-words ${isDecrypted ? 'text-xl font-serif text-slate-200 leading-relaxed' : 'text-3xl tracking-widest leading-relaxed'}`}>
        {isDecrypted ? message.originalText : message.encryptedText}
      </div>

      <div className="flex items-center gap-3">
        {!isDecrypted && !isUnlocking && (
          <button 
            onClick={() => setIsUnlocking(true)} 
            className="flex items-center gap-2 px-4 py-2 bg-emerald-900/50 hover:bg-emerald-800 border border-emerald-500/30 text-emerald-200 text-[10px] uppercase font-bold tracking-widest rounded-full transition-all"
          >
            <Key className="w-3 h-3" />
            <span>Decrypt</span>
          </button>
        )}
        
        {isUnlocking && (
          <form onSubmit={handleDecrypt} className="flex flex-wrap items-center gap-2 w-full">
            <input 
              type="text" 
              placeholder="Enter Key..." 
              value={keyInput} 
              onChange={(e) => setKeyInput(e.target.value)} 
              autoFocus
              className="flex-1 min-w-[120px] bg-black/40 border border-white/10 rounded-full px-4 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <button 
              type="submit"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] uppercase font-bold tracking-widest rounded-full transition-all"
            >
              Unlock
            </button>
            <button 
              type="button"
              onClick={() => { setIsUnlocking(false); setError(""); setKeyInput(""); }}
              className="px-4 py-2 bg-transparent border border-slate-700 text-slate-400 hover:text-white text-[10px] uppercase font-bold tracking-widest rounded-full transition-all"
            >
              Cancel
            </button>
          </form>
        )}
        
        {isDecrypted && (
          <button 
            onClick={() => { setIsDecrypted(false); setKeyInput(""); }} 
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 text-slate-300 text-[10px] uppercase font-bold tracking-widest rounded-full transition-all"
          >
            <EyeOff className="w-3 h-3" />
            <span>Conceal</span>
          </button>
        )}
      </div>
      
      {error && (
        <p className="text-red-400 text-xs font-mono mt-3">{error}</p>
      )}
    </motion.div>
  );
}

