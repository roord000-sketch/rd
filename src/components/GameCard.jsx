import { Play } from 'lucide-react';

export default function GameCard({ game, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="glass rounded-2xl overflow-hidden cursor-pointer game-card-hover group"
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-black">
            <Play className="w-6 h-6 fill-current" />
          </div>
        </div>
        <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] font-bold uppercase tracking-wider text-emerald-400 border border-emerald-500/30">
          {game.category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold mb-1 group-hover:text-emerald-400 transition-colors">{game.title}</h3>
        <p className="text-white/50 text-sm line-clamp-2">{game.description}</p>
      </div>
    </div>
  );
}
