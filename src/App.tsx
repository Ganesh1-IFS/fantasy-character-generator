import React, { useState, useEffect, useCallback } from 'react';
import { FantasyCharacter, CharacterClass } from './types';
import {
  CLASSES,
  generateRandomName,
  generateRandomStats,
  generatePortraitConfig,
} from './data/names';
import { generateCharacterBackstory } from './data/backstories';
import { PlayerCard } from './components/PlayerCard';
import { DeckSection } from './components/DeckSection';
import { WorkbenchDecor } from './components/WorkbenchDecor';
import {
  Sparkles,
  Dices,
  Flame,
  Volume2,
  VolumeX,
  Download,
} from 'lucide-react';

const STORAGE_KEY = 'fantasy_generator_deck_v1';

function playAlchemySound(type: 'transmute' | 'page' | 'sparkle' | 'potion') {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    if (type === 'transmute') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(520, ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } else if (type === 'sparkle') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } else if (type === 'potion') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(330, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    }
  } catch {
    // Ignore audio failures if browser blocks autoplay
  }
}

function createFreshCharacter(forcedClass?: CharacterClass): FantasyCharacter {
  const selectedClass = forcedClass || CLASSES[Math.floor(Math.random() * CLASSES.length)];
  const name = generateRandomName();
  const stats = generateRandomStats(selectedClass);
  const portrait = generatePortraitConfig(selectedClass);
  const backstory = generateCharacterBackstory(name, selectedClass, stats);

  return {
    id: `char_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name,
    className: selectedClass,
    stats,
    portrait,
    backstory,
    createdAt: Date.now(),
  };
}

export default function App() {
  const [character, setCharacter] = useState<FantasyCharacter>(() => createFreshCharacter());
  const [deck, setDeck] = useState<FantasyCharacter[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setDeck(parsed);
        }
      }
    } catch (e) {
      console.warn('Failed to parse saved deck:', e);
    }
  }, []);

  const saveDeckToStorage = useCallback((newDeck: FantasyCharacter[]) => {
    setDeck(newDeck);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newDeck));
    } catch (e) {
      console.warn('Failed to persist deck:', e);
    }
  }, []);

  const showToast = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification((curr) => (curr === message ? null : curr));
    }, 2800);
  };

  const handleGenerateCharacter = (forcedClass?: CharacterClass) => {
    if (soundEnabled) playAlchemySound('transmute');
    const newChar = createFreshCharacter(forcedClass);
    setCharacter(newChar);
    showToast(`Transmuted ${newChar.name} (${newChar.className})`);
  };

  const handleGeneratePortrait = () => {
    if (soundEnabled) playAlchemySound('sparkle');
    setCharacter((prev) => ({
      ...prev,
      portrait: generatePortraitConfig(prev.className),
    }));
    showToast('New portrait conjured!');
  };

  const handleRegeneratePortrait = () => {
    if (soundEnabled) playAlchemySound('potion');
    setCharacter((prev) => ({
      ...prev,
      portrait: generatePortraitConfig(prev.className, prev.portrait.seed),
    }));
    showToast('Portrait regenerated with alternate aspect!');
  };

  const handleGenerateBackstory = () => {
    if (soundEnabled) playAlchemySound('page');
    setCharacter((prev) => ({
      ...prev,
      backstory: generateCharacterBackstory(prev.name, prev.className, prev.stats),
    }));
    showToast('A new origin chronicle inscribed!');
  };

  const handleSaveToDeck = () => {
    if (soundEnabled) playAlchemySound('sparkle');
    const exists = deck.some((c) => c.id === character.id);
    if (exists) {
      showToast('This champion is already inscribed in My Deck!');
      return;
    }
    const updated = [character, ...deck];
    saveDeckToStorage(updated);
    showToast(`${character.name} preserved in My Deck!`);
  };

  const handleRemoveFromDeck = (id: string) => {
    const updated = deck.filter((c) => c.id !== id);
    saveDeckToStorage(updated);
    showToast('Champion removed from deck.');
  };

  const handleClearDeck = () => {
    if (window.confirm('Clear all champions from your grimoire deck?')) {
      saveDeckToStorage([]);
      showToast('Grimoire deck cleared.');
    }
  };

  const handleSelectCharacter = (selected: FantasyCharacter) => {
    if (soundEnabled) playAlchemySound('page');
    setCharacter(selected);
    window.scrollTo({ top: 120, behavior: 'smooth' });
    showToast(`Loaded ${selected.name} onto workbench.`);
  };

  const isCurrentSaved = deck.some((c) => c.id === character.id);

  return (
    <div className="relative min-h-screen bg-[#0e0a07] text-[#f4ecd8] selection:bg-[#d4af37]/30 selection:text-[#ffd700] pb-24">
      <WorkbenchDecor />

      <div className="relative z-10 flex flex-col items-center">
        <header className="w-full border-b border-[#b89345]/30 bg-[#16100c]/80 backdrop-blur-md sticky top-0 z-30 shadow-lg">
          <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#92400e] via-[#d97706] to-[#fef08a] p-[1.5px] shadow-[0_0_15px_rgba(217,119,6,0.4)]">
                <div className="w-full h-full rounded-full bg-[#1c130d] flex items-center justify-center">
                  <Flame className="w-5 h-5 text-[#f59e0b] animate-pulse" />
                </div>
              </div>
              <div>
                <h1
                  className="text-xl sm:text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#ffe58f] via-[#ffd700] to-[#e6a117]"
                  style={{ fontFamily: "'Cinzel Decorative', 'MedievalSharp', serif" }}
                >
                  Fantasy Character Generator
                </h1>
                <p className="text-[11px] text-[#a89279] font-serif tracking-wide hidden sm:block">
                  Ancient Alchemist&apos;s Workbench · Transmutation of Champions
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href="/fantasy-character-generator.zip"
                download="fantasy-character-generator.zip"
                title="Download Project ZIP to push to your GitHub"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#241a13] border border-[#b89345]/50 text-[#d4af37] hover:bg-[#38261b] hover:text-[#fef08a] transition-all text-xs font-serif font-semibold cursor-pointer shadow-xs"
              >
                <Download className="w-3.5 h-3.5 text-[#fbbf24]" />
                <span className="hidden sm:inline">Export Code</span>
                <span className="sm:hidden">ZIP</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  const next = !soundEnabled;
                  setSoundEnabled(next);
                  if (next) playAlchemySound('sparkle');
                }}
                title={soundEnabled ? 'Disable Alchemy Chimes' : 'Enable Alchemy Chimes'}
                className="p-2 rounded-lg bg-[#241a13] border border-[#b89345]/40 text-[#d4af37] hover:bg-[#38261b] hover:text-[#fef08a] transition-all cursor-pointer"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 opacity-60" />}
              </button>

              <button
                type="button"
                onClick={() => handleGenerateCharacter()}
                className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-serif font-bold uppercase tracking-wider rounded-lg bg-gradient-to-b from-[#d97706] via-[#b45309] to-[#78350f] text-[#fef9c3] hover:from-[#f59e0b] hover:to-[#92400e] active:scale-95 border-2 border-[#fde047]/80 shadow-[0_0_20px_rgba(245,158,11,0.35)] transition-all cursor-pointer"
              >
                <Dices className="w-4 h-4 text-[#fde047]" />
                <span>Generate Character</span>
              </button>
            </div>
          </div>
        </header>

        <div className="w-full max-w-4xl mx-auto px-4 mt-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#241a13]/80 border border-[#b89345]/40 text-xs text-[#d4af37] font-serif mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#f59e0b]" />
            <span>Alchemical Transmutation Crucible</span>
          </div>

          <p className="text-xs sm:text-sm text-[#c9b486] font-serif max-w-xl mx-auto mb-4">
            Place your components upon the parchment slate. Transmute ancient names, cartoon combat portraits, sacred attributes, and chronicles of forgotten deeds.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-8">
            <span className="text-[11px] text-[#a89279] font-serif mr-1">Concoct Class:</span>
            {CLASSES.map((cls) => {
              const isSelected = character.className === cls;
              return (
                <button
                  key={cls}
                  type="button"
                  onClick={() => handleGenerateCharacter(cls)}
                  className={`px-2.5 py-1 text-xs font-serif rounded border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#d4af37] text-[#1c130d] font-bold border-[#fde047] shadow-[0_0_10px_rgba(212,175,55,0.4)]'
                      : 'bg-[#1e150f]/80 text-[#d8c7a1] border-[#78541e]/50 hover:border-[#d4af37] hover:text-[#fef08a]'
                  }`}
                >
                  {cls}
                </button>
              );
            })}
          </div>
        </div>

        <main className="w-full px-4 flex flex-col items-center">
          <PlayerCard
            character={character}
            onGeneratePortrait={handleGeneratePortrait}
            onRegeneratePortrait={handleRegeneratePortrait}
            onGenerateBackstory={handleGenerateBackstory}
            onSaveToDeck={handleSaveToDeck}
            isSaved={isCurrentSaved}
          />
        </main>

        <DeckSection
          deck={deck}
          onSelectCharacter={handleSelectCharacter}
          onRemoveFromDeck={handleRemoveFromDeck}
          onClearDeck={handleClearDeck}
          activeCharacterId={character.id}
        />

        {notification && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#241a13] border-2 border-[#d4af37] text-[#fef9c3] font-serif text-xs shadow-2xl animate-bounce">
            <Sparkles className="w-4 h-4 text-[#ffd700]" />
            <span>{notification}</span>
          </div>
        )}
      </div>
    </div>
  );
}
