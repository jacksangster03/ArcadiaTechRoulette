import { motion } from 'motion/react';
import { Utensils } from 'lucide-react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  isFeatured: boolean;
  onClick: () => void;
  isHidden?: boolean;
}

export function RecipeCard({ recipe, isFeatured, onClick, isHidden = false }: RecipeCardProps) {
  if (isFeatured) {
    return (
      <motion.div
        layoutId={`card-${recipe.id}`}
        onClick={onClick}
        className="h-full bento-card p-10 md:p-14 flex flex-col justify-end md:justify-center relative overflow-hidden group min-h-[400px] cursor-pointer hover:border-emerald-200 transition-all hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)] hover:-translate-y-1"
      >
        <div className="relative z-10 w-full md:w-[55%]">
          <span className="bg-emerald-900/5 text-emerald-800 text-[10px] font-bold px-3 py-1.5 rounded-full mb-6 inline-block tracking-[0.2em] border border-emerald-900/10">FEATURED RECORD</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-[0.95] tracking-tighter mb-5 group-hover:text-emerald-900 transition-colors drop-shadow-sm">{recipe.title}</h2>
          <p className="text-slate-500 font-medium leading-relaxed mb-8 line-clamp-3 md:line-clamp-4 text-base md:text-lg">{recipe.description}</p>
        </div>
        <div className="absolute right-0 top-0 w-full md:w-[60%] h-full z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/40 to-transparent md:bg-gradient-to-r md:from-[#FAF7F2] md:via-[#FAF7F2]/60 md:to-transparent z-10" />
          <img src={recipe.image} className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-all duration-1000 group-hover:scale-105" alt="" />
        </div>
      </motion.div>
    );
  }

  // Secret card: outer wrapper provides the beam border, inner card is normal
  if (isHidden) {
    return (
      <div className="h-full p-[2px] rounded-[2rem] relative overflow-hidden secret-beam-outer">
        {/* Rotating conic-gradient beam */}
        <div className="beam-ring" />
        {/* Normal card content, inset by the 2px padding */}
        <motion.div
          layoutId={`card-${recipe.id}`}
          onClick={onClick}
          className="relative h-full rounded-[calc(2rem-2px)] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 flex flex-col group cursor-pointer transition-all overflow-hidden hover:-translate-y-1 hover:shadow-[0_20px_50px_rgb(0,0,0,0.06)]"
        >
          <div className="relative z-10 flex flex-col h-full p-2 -m-2 rounded-2xl transition-all bg-white/60 backdrop-blur-[2px] group-hover:bg-transparent group-hover:backdrop-blur-none">
            <div className="flex justify-between items-start mb-5">
              <h3 className="text-2xl font-serif font-bold tracking-tight pr-4 transition-colors leading-[1.1] group-hover:text-emerald-800">
                {recipe.title}
              </h3>
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 shadow-sm z-10 bg-white border border-slate-100 group-hover:-rotate-12 group-hover:bg-emerald-50 group-hover:text-emerald-600 group-hover:border-emerald-200 text-slate-400">
                <Utensils className="w-4 h-4" />
              </div>
            </div>
            <p className="text-sm mb-6 leading-relaxed flex-grow line-clamp-3 text-slate-500">
              {recipe.description}
            </p>
            <div className="mt-auto flex items-center justify-between pt-5 border-t border-slate-100/80">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{recipe.category}</span>
              <span className="text-[10px] font-mono px-2 py-1 rounded border text-emerald-700 bg-emerald-50 border-emerald-100">
                {recipe.prepTime}
              </span>
            </div>
          </div>
          <img
            src={recipe.image}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-0 group-hover:opacity-[0.08] grayscale mix-blend-multiply"
            alt=""
          />
        </motion.div>
      </div>
    );
  }

  // Normal card
  return (
    <motion.div
      layoutId={`card-${recipe.id}`}
      onClick={onClick}
      className="h-full bento-card p-8 flex flex-col group min-h-[300px] cursor-pointer transition-all hover:-translate-y-1 relative overflow-hidden hover:border-emerald-200 hover:shadow-[0_20px_50px_rgb(0,0,0,0.06)]"
    >
      <div className="relative z-10 flex flex-col h-full p-2 -m-2 rounded-2xl transition-all bg-white/60 backdrop-blur-[2px] group-hover:bg-transparent group-hover:backdrop-blur-none">
        <div className="flex justify-between items-start mb-5">
          <h3 className="text-2xl font-serif font-bold tracking-tight pr-4 transition-colors leading-[1.1] group-hover:text-emerald-800">
            {recipe.title}
          </h3>
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 shadow-sm z-10 bg-white border border-slate-100 group-hover:-rotate-12 group-hover:bg-emerald-50 group-hover:text-emerald-600 group-hover:border-emerald-200 text-slate-400">
            <Utensils className="w-4 h-4" />
          </div>
        </div>
        <p className="text-sm mb-6 leading-relaxed flex-grow line-clamp-3 text-slate-500">
          {recipe.description}
        </p>
        <div className="mt-auto flex items-center justify-between pt-5 border-t border-slate-100/80">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{recipe.category}</span>
          <span className="text-[10px] font-mono px-2 py-1 rounded border text-emerald-700 bg-emerald-50 border-emerald-100">
            {recipe.prepTime}
          </span>
        </div>
      </div>
      <img
        src={recipe.image}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-0 group-hover:opacity-[0.08] grayscale mix-blend-multiply"
        alt=""
      />
    </motion.div>
  );
}
