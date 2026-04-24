import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search } from 'lucide-react';
import { PRD_RECIPES, SECRET_PHRASE } from '../config/constants';
import { RecipeCard } from '../components/RecipeCard';
import { RecipeDetail } from '../components/RecipeDetail';
import { Recipe } from '../types';

export function AlchemyPage({ onTriggerArcadia, searchVisible }: { onTriggerArcadia: () => void; searchVisible: boolean }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All Archives");

  const categories = ["All Archives", ...Array.from(new Set(PRD_RECIPES.map(r => r.category)))];

  const filteredRecipes = useMemo(() => {
    return PRD_RECIPES.filter(recipe => {
      const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All Archives" || recipe.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    if (selectedRecipe) {
        setSelectedRecipe(null); // Return to grid organically on searching
    }
    if (value.toLowerCase().trim() === SECRET_PHRASE) {
      setSearchQuery("");
      onTriggerArcadia();
    }
  };

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="flex flex-col space-y-8">
      {/* Global Search Bar */}
      <AnimatePresence>
        {searchVisible && (
          <motion.div 
            initial={{ opacity: 0, height: 0, scale: 0.95 }} 
            animate={{ opacity: 1, height: 'auto', scale: 1, transition: { type: "spring", stiffness: 300, damping: 25 } }} 
            exit={{ opacity: 0, height: 0, scale: 0.95 }}
            className="relative max-w-2xl mx-auto w-full mb-8"
          >
            <div className="absolute inset-0 bg-white/40 blur-xl rounded-full z-0 pointer-events-none"></div>
            <div className="relative z-10">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-700/60" />
              <input
                type="text"
                placeholder="Search the archives, ingredients, or hidden truths..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full bg-white/90 backdrop-blur-md border border-slate-200/50 rounded-full py-4 pl-16 pr-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent text-lg font-serif italic placeholder:not-italic placeholder:text-slate-400/80 placeholder:font-sans placeholder:text-sm placeholder:tracking-wide transition-all"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {selectedRecipe && !searchQuery ? (
          <RecipeDetail 
             key="detail" 
             recipe={selectedRecipe} 
             onBack={() => setSelectedRecipe(null)} 
          />
        ) : (
          <motion.div key="grid" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="space-y-8 lg:space-y-12">
             {/* Categories Filter */}
             <div className="flex flex-wrap gap-3">
                {categories.map((cat) => (
                   <button
                     key={cat}
                     onClick={() => setActiveCategory(cat)}
                     className={`px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] transition-all shadow-sm ${activeCategory === cat ? 'bg-emerald-900 text-white shadow-emerald-900/20' : 'bg-white/80 backdrop-blur-md border border-slate-200/60 text-slate-500 hover:border-emerald-300 hover:text-emerald-800'}`}
                   >
                     {cat}
                   </button>
                ))}
             </div>

             {/* Grid */}
             {filteredRecipes.length > 0 ? (
                <motion.div 
                  initial="hidden" 
                  animate="show" 
                  variants={{
                    hidden: { opacity: 0 },
                    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 h-full min-h-[600px]"
                >
                  {filteredRecipes.map((recipe, index) => (
                    <motion.div key={recipe.id} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } }} className={index === 0 && searchQuery === "" && activeCategory === "All Archives" ? "col-span-1 md:col-span-2 xl:col-span-2 row-span-2" : "col-span-1"}>
                      <RecipeCard 
                         recipe={recipe} 
                         isFeatured={index === 0 && searchQuery === "" && activeCategory === "All Archives"} 
                         onClick={() => setSelectedRecipe(recipe)}
                      />
                    </motion.div>
                  ))}
                </motion.div>
             ) : (
               <div className="h-[400px] flex items-center justify-center">
                  <p className="text-xl font-serif text-slate-400 italic">The archives hold no record of your inquiry...</p>
               </div>
             )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
