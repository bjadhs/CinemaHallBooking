import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Category, Movie } from '../types';

interface HomeScreenProps {
  userName: string;
  categories: Category[];
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
}

const HomeScreen = ({ userName, categories, movies, onSelectMovie }: HomeScreenProps) => {
  const [active, setActive] = useState(0);
  const [activeCategory, setActiveCategory] = useState(0);
  const movie = movies[active];

  return (
    <div className="flex flex-col h-full px-6 pt-10 pb-6 text-white">
      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <h1 className="text-2xl font-bold">Hi, {userName} <span className="inline-block">👋</span></h1>
        <p className="text-white/50 text-sm mt-1">Book your favorite movie</p>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
        className="mt-5 flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-4 py-3"
      >
        <svg className="w-4 h-4 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4-4" strokeLinecap="round" />
        </svg>
        <span className="flex-1 text-sm text-white/40">Search movie</span>
        <div className="w-px h-4 bg-white/15" />
        <svg className="w-4 h-4 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
          <path d="M5 11a7 7 0 0 0 14 0M12 18v3" strokeLinecap="round" />
        </svg>
      </motion.div>

      {/* Category */}
      <div className="mt-6 flex items-center justify-between">
        <h2 className="font-semibold">Category</h2>
        <span className="text-xs text-indigo-400 flex items-center gap-1">See all ›</span>
      </div>
      <div className="mt-3 flex gap-3">
        {categories.map((cat, i) => (
          <motion.button
            key={cat.label}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(i)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors ${
              activeCategory === i
                ? 'bg-indigo-500/30 border border-indigo-400/50 text-white'
                : 'bg-white/5 border border-white/10 text-white/70'
            }`}
          >
            <span>{cat.emoji}</span>
            {cat.label}
          </motion.button>
        ))}
      </div>

      {/* Showing this month */}
      <h2 className="mt-7 font-semibold">Showing this month</h2>
      <div className="flex-1 mt-4 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.button
            key={movie.id}
            initial={{ opacity: 0, scale: 0.9, rotateY: 25 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotateY: -25 }}
            transition={{ duration: 0.35 }}
            onClick={() => onSelectMovie(movie)}
            style={{ transformStyle: 'preserve-3d' }}
            className={`relative w-48 h-72 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br ${movie.posterGradient}`}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-6xl drop-shadow-lg">{movie.posterEmoji}</span>
            </div>
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-left">
              <p className="font-bold leading-tight">{movie.title}</p>
              <p className="text-xs text-white/70">{movie.genre}</p>
            </div>
          </motion.button>
        </AnimatePresence>

        {/* Carousel dots */}
        <div className="mt-5 flex gap-2">
          {movies.map((m, i) => (
            <button
              key={m.id}
              onClick={() => setActive(i)}
              aria-label={`Show ${m.title}`}
              className="p-1"
            >
              <motion.span
                animate={{
                  width: i === active ? 22 : 6,
                  backgroundColor: i === active ? '#6366f1' : 'rgba(255,255,255,0.3)',
                }}
                className="block h-1.5 rounded-full"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
