import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { getGameRecommendation } from '../services/aiService';

export default function AISearch({ games, onGameSelect }) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAISearch = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError('');
    
    try {
      const result = await getGameRecommendation(prompt, games);
      if (result && result.recommendedGameId) {
        const game = games.find(g => g.id === result.recommendedGameId);
        if (game) {
          onGameSelect(game);
          setPrompt('');
        } else {
          setError("I couldn't find a perfect match, try something else!");
        }
      }
    } catch (err) {
      setError("AI is taking a break. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-12">
      <form onSubmit={handleAISearch} className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Sparkles className="w-5 h-5 text-emerald-400 group-focus-within:text-emerald-300 transition-colors" />
        </div>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask AI: 'I want a fast-paced game' or 'Something relaxing'..."
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-24 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all text-lg"
        />
        <button
          type="submit"
          disabled={loading}
          className="absolute right-2 top-2 bottom-2 px-6 bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-800 text-black font-bold rounded-xl transition-all flex items-center gap-2"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Ask AI'}
        </button>
      </form>
      {error && <p className="mt-2 text-red-400 text-sm text-center">{error}</p>}
    </div>
  );
}
