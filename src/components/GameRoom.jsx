import { X, Maximize2, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function GameRoom({ game, onClose }) {
  const reloadGame = () => {
    const iframe = document.getElementById('game-iframe');
    if (iframe) iframe.src = iframe.src;
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-bottom border-white/10">
          <div className="flex items-center gap-4">
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div>
              <h2 className="text-xl font-bold text-emerald-400">{game.title}</h2>
              <p className="text-xs text-white/40 uppercase tracking-widest">{game.category}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={reloadGame}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              title="Reload Game"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <button 
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              title="Fullscreen"
              onClick={() => {
                const iframe = document.getElementById('game-iframe');
                if (iframe?.requestFullscreen) {
                  iframe.requestFullscreen();
                }
              }}
            >
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Game Area */}
        <div className="flex-1 relative bg-black">
          <iframe
            id="game-iframe"
            src={game.iframeUrl}
            className="w-full h-full border-none"
            allow="fullscreen; autoplay; gamepad"
            title={game.title}
          />
        </div>

        {/* Footer Info */}
        <div className="p-4 bg-white/5 border-t border-white/10">
          <p className="text-white/70 text-sm max-w-3xl mx-auto text-center">
            {game.description}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
