import React, { useState } from 'react';
import { FantasyCharacter } from '../types';
import { CLASS_DETAILS } from '../data/names';
import { PortraitCanvas } from './PortraitCanvas';
import {
  Heart,
  Sparkles,
  Swords,
  Scroll,
  BookOpen,
  RefreshCw,
  PlusCircle,
  BookmarkCheck,
  Shield,
  Wand2,
} from 'lucide-react';

interface PlayerCardProps {
  character: FantasyCharacter;
  onGeneratePortrait: () => void;
  onRegeneratePortrait: () => void;
  onGenerateBackstory: () => void;
  onSaveToDeck: () => void;
  isSaved?: boolean;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({
  character,
  onGeneratePortrait,
  onRegeneratePortrait,
  onGenerateBackstory,
  onSaveToDeck,
  isSaved = false,
}) => {
  const [saveAnimation, setSaveAnimation] = useState(false);
  const classInfo = CLASS_DETAILS[character.className];

  const handleSaveClick = () => {
    setSaveAnimation(true);
    onSaveToDeck();
    setTimeout(() => setSaveAnimation(false), 1200);
  };

  return (
    <div className="relative mx-auto w-full max-w-md transition-all duration-300">
      <div className="relative rounded-2xl p-[3px] bg-gradient-to-b from-[#e5c158] via-[#a67c1e] to-[#593d08] shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_25px_rgba(212,175,55,0.25)]">
        <div className="rounded-[13px] border border-[#fef08a]/40 bg-[#16100c] overflow-hidden">
          <div className="relative bg-gradient-to-b from-[#241a13] to-[#1c130d] px-5 pt-5 pb-3 border-b-2 border-[#b89345]/50">
            <div className="absolute top-2 left-2 text-[#d4af37] text-xs opacity-70">❖</div>
            <div className="absolute top-2 right-2 text-[#d4af37] text-xs opacity-70">❖</div>

            <div className="flex items-center justify-between text-xs tracking-widest uppercase mb-1">
              <span className="text-[#d4af37] font-semibold flex items-center gap-1.5 font-serif">
                <Shield className="w-3.5 h-3.5 text-[#e5c158]" />
                Class: {character.className}
              </span>
              <span className="text-[#a89279] italic font-serif capitalize">
                {classInfo.title}
              </span>
            </div>

            <h2
              className="text-2xl sm:text-3xl text-center font-bold tracking-wide py-1 text-transparent bg-clip-text bg-gradient-to-r from-[#ffe58f] via-[#ffd700] to-[#e6a117] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
              style={{ fontFamily: "'Cinzel Decorative', 'MedievalSharp', serif" }}
            >
              {character.name}
            </h2>

            <div className="flex items-center justify-center gap-2 mt-1">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
              <div className="w-1.5 h-1.5 rotate-45 bg-[#d4af37]" />
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
            </div>
          </div>

          <div
            className="p-4 sm:p-5 text-[#2a1c0e] relative"
            style={{
              backgroundColor: '#f5ecd7',
              backgroundImage: `
                radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 0%, rgba(226,206,173,0.6) 100%),
                linear-gradient(to bottom, rgba(140,95,45,0.08), rgba(80,50,20,0.15))
              `,
            }}
          >
            <div className="absolute inset-0 border-[6px] border-[#d8be92]/60 pointer-events-none rounded-lg" />

            <div className="relative flex flex-col items-center mb-4">
              <div className="relative group">
                <PortraitCanvas
                  className={character.className}
                  config={character.portrait}
                  characterName={character.name}
                  size={240}
                />
                <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-[#ffd700] pointer-events-none" />
                <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-[#ffd700] pointer-events-none" />
                <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-[#ffd700] pointer-events-none" />
                <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-[#ffd700] pointer-events-none" />
              </div>

              <div className="grid grid-cols-2 gap-2 w-full mt-3 px-2">
                <button
                  type="button"
                  onClick={onGeneratePortrait}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-serif font-bold text-[#fef9c3] bg-gradient-to-b from-[#78350f] to-[#451a03] hover:from-[#92400e] hover:to-[#5c2406] active:scale-95 rounded border border-[#d97706] shadow-sm transition-all cursor-pointer"
                >
                  <Wand2 className="w-3.5 h-3.5 text-[#fbbf24]" />
                  <span>Generate Portrait</span>
                </button>

                <button
                  type="button"
                  onClick={onRegeneratePortrait}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-serif font-bold text-[#fef9c3] bg-gradient-to-b from-[#3b2d1d] to-[#241a10] hover:from-[#4d3a25] hover:to-[#332416] active:scale-95 rounded border border-[#b45309] shadow-sm transition-all cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#f59e0b]" />
                  <span>Regenerate Portrait</span>
                </button>
              </div>
            </div>

            <div className="my-4 p-3 bg-[#e8dcbd]/90 rounded-lg border border-[#c5ad7b] shadow-inner">
              <div className="text-[11px] font-serif font-bold text-[#78350f] uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Combat Attributes</span>
                <span className="text-[10px] text-[#8c6633] font-normal italic">Rank I Veteran</span>
              </div>

              <div className="space-y-2.5">
                <div>
                  <div className="flex items-center justify-between text-xs font-serif font-bold text-[#451a03] mb-1">
                    <span className="flex items-center gap-1.5">
                      <Heart className="w-3.5 h-3.5 text-red-600 fill-red-600" />
                      Health
                    </span>
                    <span className="text-red-800 font-mono font-bold text-sm">
                      {character.stats.health}
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-[#cfbe97] rounded-full overflow-hidden border border-[#b49e6f]">
                    <div
                      className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 rounded-full transition-all duration-500 shadow-sm"
                      style={{ width: `${Math.min(100, Math.round((character.stats.health / 180) * 100))}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-serif font-bold text-[#451a03] mb-1">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600 fill-blue-600" />
                      Mana
                    </span>
                    <span className="text-blue-900 font-mono font-bold text-sm">
                      {character.stats.mana}
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-[#cfbe97] rounded-full overflow-hidden border border-[#b49e6f]">
                    <div
                      className="h-full bg-gradient-to-r from-blue-700 via-cyan-500 to-sky-300 rounded-full transition-all duration-500 shadow-sm"
                      style={{ width: `${Math.min(100, Math.round((character.stats.mana / 170) * 100))}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-serif font-bold text-[#451a03] mb-1">
                    <span className="flex items-center gap-1.5">
                      <Swords className="w-3.5 h-3.5 text-amber-700" />
                      Strength
                    </span>
                    <span className="text-amber-950 font-mono font-bold text-sm">
                      {character.stats.strength}
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-[#cfbe97] rounded-full overflow-hidden border border-[#b49e6f]">
                    <div
                      className="h-full bg-gradient-to-r from-amber-700 via-amber-500 to-yellow-300 rounded-full transition-all duration-500 shadow-sm"
                      style={{ width: `${Math.min(100, Math.round((character.stats.strength / 170) * 100))}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 p-3 bg-[#e2d3b0]/80 rounded-lg border border-[#baa171] relative">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#78350f]" />
                  <h3 className="font-serif font-bold text-sm text-[#451a03] tracking-wide">
                    Backstory
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={onGenerateBackstory}
                  className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-serif font-bold text-[#fef9c3] bg-[#78350f] hover:bg-[#92400e] active:scale-95 rounded border border-[#b45309] transition-all cursor-pointer shadow-xs"
                >
                  <Scroll className="w-3 h-3 text-[#fde047]" />
                  <span>Generate Backstory</span>
                </button>
              </div>

              <p
                className="text-xs sm:text-[13px] leading-relaxed text-[#2c1d0e] font-serif italic text-justify pl-1 border-l-2 border-[#b89345]/60 mt-2"
                style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
              >
                {character.backstory ? (
                  character.backstory
                ) : (
                  <span className="text-[#7c664b] not-italic">
                    No chronicle inscribed yet. Click &quot;Generate Backstory&quot; to reveal this warrior&apos;s past.
                  </span>
                )}
              </p>
            </div>

            <div className="mt-4 pt-1">
              <button
                type="button"
                onClick={handleSaveClick}
                className={`w-full py-2.5 px-4 rounded-lg font-serif font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-md ${
                  isSaved || saveAnimation
                    ? 'bg-[#15803d] text-white border-2 border-[#4ade80] shadow-[0_0_15px_rgba(34,197,94,0.4)]'
                    : 'bg-gradient-to-b from-[#b45309] via-[#854d0e] to-[#713f12] text-[#fef08a] hover:from-[#d97706] hover:to-[#854d0e] active:scale-98 border-2 border-[#f59e0b] shadow-[0_4px_10px_rgba(0,0,0,0.3)]'
                }`}
              >
                {isSaved || saveAnimation ? (
                  <>
                    <BookmarkCheck className="w-4 h-4 text-white" />
                    <span>Saved to Deck!</span>
                  </>
                ) : (
                  <>
                    <PlusCircle className="w-4 h-4 text-[#fef08a]" />
                    <span>Save to Deck</span>
                  </>
                )}
              </button>
            </div>

          </div>

          <div className="bg-[#1c130d] py-1.5 px-4 border-t border-[#b89345]/30 flex items-center justify-between text-[10px] text-[#a89279] font-serif">
            <span>Grimoire Codex #{(character.portrait.seed % 9999) + 1}</span>
            <span className="text-[#d4af37]">✦ Alchemy Provenance ✦</span>
          </div>
        </div>
      </div>
    </div>
  );
};
