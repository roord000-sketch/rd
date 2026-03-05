import { useState, useMemo } from 'react';
import { Gamepad2, Search, TrendingUp, LayoutGrid } from 'lucide-react';
import { motion } from 'motion/react';
import gamesData from './games.json';
import GameCard from './components/GameCard';
import GameRoom from './components/GameRoom';
import AISearch from './components/AISearch';

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const games = gamesData;
  
  const categories = useMemo(() => {
    const cats = new Set(games.map(g => g.category));
    return ['All', ...Array.from(cats)];
  }, [games]);

  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [games, searchQuery, activeCategory]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-emerald-500/30">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 glass border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => {
            setSelectedGame(null);
            setSearchQuery('');
            setActiveCategory('All');
          }}>
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,255,136,0.3)]">
              <Gamepad2 className="w-6 h-6 text-black" />
            </div>
            <span className="text-2xl font-black tracking-tighter neon-text">NOVA GAMES</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
            <a href="#" className="hover:text-emerald-400 transition-colors">GAMES</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">CATEGORIES</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">ABOUT</a>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input 
                type="text" 
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500/50 w-64 transition-all"
              />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <header className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tightest mb-6 leading-none">
              UNBLOCKED <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                EVERYWHERE.
              </span>
            </h1>
            <p className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
              The ultimate destination for high-performance web gaming. 
              No filters, no limits, just pure fun powered by AI.
            </p>
          </motion.div>

          {/* AI Search Component */}
          <AISearch games={games} onGameSelect={setSelectedGame} />
        </header>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                  activeCategory === cat 
                    ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(0,255,136,0.4)]' 
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2 text-white/40 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>{filteredGames.length} Games Found</span>
          </div>
        </div>

        {/* Game Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.map((game, idx) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
            >
              <GameCard 
                game={game} 
                onClick={() => setSelectedGame(game)} 
              />
            </motion.div>
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-24 glass rounded-3xl">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <LayoutGrid className="w-8 h-8 text-white/20" />
            </div>
            <h3 className="text-xl font-bold mb-2">No games found</h3>
            <p className="text-white/40">Try adjusting your search or category filters.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6 mt-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 opacity-50">
            <Gamepad2 className="w-5 h-5" />
            <span className="font-bold tracking-tighter">NOVA GAMES</span>
          </div>
          <div className="flex gap-8 text-white/40 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-white/20 text-xs">© 2026 Nova Games. All rights reserved.</p>
        </div>
      </footer>

      {/* Game Room Modal */}
      {selectedGame && (
        <GameRoom 
          game={selectedGame} 
          onClose={() => setSelectedGame(null)} 
        />
      )}
    </div>
  );
}
