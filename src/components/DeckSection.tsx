import React from 'react';
import { FantasyCharacter } from '../types';
import { PortraitCanvas } from './PortraitCanvas';
import {
  Trash2,
  ExternalLink,
  Layers,
  Heart,
  Sparkles,
  Swords,
  Scroll,
} from 'lucide-react';

interface DeckSectionProps {
  deck: FantasyCharacter[];
  onSelectCharacter: (character: FantasyCharacter) => void;
  onRemoveFromDeck: (id: string) => void;
  onClearDeck: () => void;
  activeCharacterId?: string;
}

export const DeckSection: React.FC<DeckSectionProps> = ({
  deck,
  onSelectCharacter,
  onRemoveFromDeck,
  onClearDeck,
  activeCharacterId,
}) => {
  return (
    <section className="mt-12 w-full max-w-6xl mx-auto px-4">
      <div className="flex flex-col sm:flex-row items-center justify-between pb-4 border-b-2 border-[#b89345]/50 gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#78350f] to-[#451a03] border border-[#d4af37] flex items-center justify-center shadow-md">
            <Layers className="w-5 h-5 text-[#fde047]" />
          </div>
          <div>
            <h2
              className="text-2xl sm:text-3xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#ffe58f] via-[#ffd700] to-[#e6a117]"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              My Deck
            </h2>
            <p className="text-xs text-[#a89279] font-serif">
              Archived champions inscribed in the alchemist&apos;s personal grimoire
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs font-serif px-3 py-1.5 rounded-md bg-[#241a13] border border-[#b89345]/40 text-[#d4af37]">
            {deck.length} {deck.length === 1 ? 'Card' : 'Cards'} Stored
          </div>

          {deck.length > 0 && (
            <button
              type="button"
              onClick={onClearDeck}
              className="px-3 py-1.5 text-xs font-serif text-[#fca5a5] hover:text-white bg-[#450a0a]/80 hover:bg-[#7f1d1d] border border-[#991b1b] rounded-md transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Deck</span>
            </button>
          )}
        </div>
      </div>

      {deck.length === 0 ? (
        <div className="relative p-8 text-center rounded-xl border border-dashed border-[#b89345]/40 bg-[#1a120c]/60 backdrop-blur-xs max-w-lg mx-auto my-8">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#2a1d12] border border-[#d4af37]/40 flex items-center justify-center">
            <Scroll className="w-6 h-6 text-[#d4af37]/60" />
          </div>
          <h3
            className="text-lg font-serif font-bold text-[#fef08a] mb-1"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            No Champions in Deck
          </h3>
          <p className="text-xs text-[#a89279] font-serif max-w-sm mx-auto leading-relaxed">
            Your grimoire deck is currently empty. Concoct a hero on the workbench and click &quot;Save to Deck&quot; to preserve their legend, portrait, and attributes.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {deck.map((char) => {
            const isActive = char.id === activeCharacterId;

            return (
              <div
                key={char.id}
                className={`relative group rounded-xl p-[2px] transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-b from-[#ffd700] via-[#d4af37] to-[#78350f] shadow-[0_0_20px_rgba(212,175,55,0.4)] scale-[1.02]'
                    : 'bg-gradient-to-b from-[#78541e] via-[#452e0f] to-[#1c130d] hover:from-[#b89345] hover:to-[#593d08] hover:shadow-lg'
                }`}
              >
                {isActive && (
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-10 px-2.5 py-0.5 rounded-full text-[10px] font-serif font-bold bg-[#ffd700] text-[#451a03] border border-[#78350f] shadow">
                    Active on Bench
                  </div>
                )}

                <div className="rounded-[10px] bg-[#1a130e] overflow-hidden flex flex-col h-full border border-[#d4af37]/30">
                  <div className="p-3 bg-gradient-to-b from-[#2a1d14] to-[#1a120c] border-b border-[#b89345]/30">
                    <div className="flex items-center justify-between text-[11px] text-[#d4af37] font-serif mb-0.5">
                      <span className="font-bold uppercase tracking-wider">{char.className}</span>
                      <span className="text-[10px] text-[#a89279]">
                        {new Date(char.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                    </div>

                    <h4
                      className="text-base font-bold text-[#fef08a] truncate"
                      style={{ fontFamily: "'Cinzel Decorative', 'MedievalSharp', serif" }}
                      title={char.name}
                    >
                      {char.name}
                    </h4>
                  </div>

                  <div
                    className="p-3 flex-1 flex flex-col justify-between"
                    style={{
                      backgroundColor: '#f5ecd7',
                      backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(226,206,173,0.7) 100%)',
                    }}
                  >
                    <div className="flex gap-3 items-center">
                      <div className="shrink-0 w-20 h-20 rounded-lg overflow-hidden border border-[#b89345] shadow-xs">
                        <PortraitCanvas
                          className={char.className}
                          config={char.portrait}
                          characterName={char.name}
                          size={80}
                        />
                      </div>

                      <div className="flex-1 space-y-1 text-[11px] font-serif">
                        <div className="flex items-center justify-between text-red-900 font-bold">
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3 text-red-600 fill-red-600" />
                            Health
                          </span>
                          <span className="font-mono">{char.stats.health}</span>
                        </div>

                        <div className="flex items-center justify-between text-blue-950 font-bold">
                          <span className="flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-blue-600 fill-blue-600" />
                            Mana
                          </span>
                          <span className="font-mono">{char.stats.mana}</span>
                        </div>

                        <div className="flex items-center justify-between text-amber-950 font-bold">
                          <span className="flex items-center gap-1">
                            <Swords className="w-3 h-3 text-amber-700" />
                            Strength
                          </span>
                          <span className="font-mono">{char.stats.strength}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-2.5 p-2 bg-[#e8dcbd]/80 rounded border border-[#c5ad7b] text-[11px] leading-snug text-[#2c1d0e] font-serif italic line-clamp-3">
                      &quot;{char.backstory}&quot;
                    </div>
                  </div>

                  <div className="p-2 bg-[#1c130d] border-t border-[#b89345]/30 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectCharacter(char)}
                      className="flex-1 py-1.5 px-2 text-xs font-serif font-bold text-[#fef9c3] bg-[#78350f] hover:bg-[#92400e] active:scale-95 rounded border border-[#b45309] transition-all cursor-pointer flex items-center justify-center gap-1 shadow-xs"
                    >
                      <ExternalLink className="w-3 h-3 text-[#fde047]" />
                      <span>Examine on Bench</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onRemoveFromDeck(char.id)}
                      title="Remove from Deck"
                      className="p-1.5 text-[#fca5a5] hover:text-white bg-[#450a0a] hover:bg-[#7f1d1d] rounded border border-[#991b1b]/70 transition-all cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
