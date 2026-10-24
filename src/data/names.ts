import { CharacterClass, CharacterStats, PortraitConfig } from '../types';

export const CLASSES: CharacterClass[] = [
  'Mage',
  'Rogue',
  'Warrior',
  'Ranger',
  'Cleric',
  'Paladin',
  'Druid',
];

export const CLASS_DETAILS: Record<
  CharacterClass,
  {
    title: string;
    description: string;
    themeColor: string;
    accentColor: string;
    primaryStat: 'health' | 'mana' | 'strength';
    statRanges: {
      health: [number, number];
      mana: [number, number];
      strength: [number, number];
    };
  }
> = {
  Mage: {
    title: 'Arcane Weaver',
    description: 'Master of forbidden pyromancy, cosmic rifts, and transmutative incantations.',
    themeColor: '#7c3aed',
    accentColor: '#c084fc',
    primaryStat: 'mana',
    statRanges: {
      health: [65, 95],
      mana: [110, 160],
      strength: [35, 65],
    },
  },
  Rogue: {
    title: 'Shadowstalker',
    description: 'Lurker of foggy alleys, whisperer of poisons, and master of silent steel.',
    themeColor: '#059669',
    accentColor: '#34d399',
    primaryStat: 'strength',
    statRanges: {
      health: [75, 110],
      mana: [50, 95],
      strength: [80, 125],
    },
  },
  Warrior: {
    title: 'Ironclad Vanguard',
    description: 'Frontline juggernaut clad in scarred plate, wielding crushing cleavers.',
    themeColor: '#dc2626',
    accentColor: '#f87171',
    primaryStat: 'health',
    statRanges: {
      health: [120, 175],
      mana: [25, 65],
      strength: [105, 160],
    },
  },
  Ranger: {
    title: 'Wildwood Pathfinder',
    description: 'Keen-eyed sharpshooter bonded to forest beasts and ancient wind currents.',
    themeColor: '#16a34a',
    accentColor: '#4ade80',
    primaryStat: 'strength',
    statRanges: {
      health: [85, 125],
      mana: [55, 95],
      strength: [90, 135],
    },
  },
  Cleric: {
    title: 'Dawnward Hierophant',
    description: 'Vessel of blinding solar radiance, mender of mortal flesh, and smiter of the undead.',
    themeColor: '#d97706',
    accentColor: '#fbbf24',
    primaryStat: 'mana',
    statRanges: {
      health: [90, 130],
      mana: [100, 150],
      strength: [65, 105],
    },
  },
  Paladin: {
    title: 'Aegis of the Sun',
    description: 'Holy champion sworn by unbreakable oath, wielding righteous vengeance.',
    themeColor: '#eab308',
    accentColor: '#fde047',
    primaryStat: 'health',
    statRanges: {
      health: [115, 165],
      mana: [75, 120],
      strength: [95, 145],
    },
  },
  Druid: {
    title: 'Keeper of the Verdant Bloom',
    description: 'Shapeshifter communing with primal storm spirits and earth wardens.',
    themeColor: '#0d9488',
    accentColor: '#2dd4bf',
    primaryStat: 'mana',
    statRanges: {
      health: [90, 135],
      mana: [95, 145],
      strength: [70, 115],
    },
  },
};

const FIRST_NAMES = [
  'Aeloria', 'Valerius', 'Zephyr', 'Morrigan', 'Eldrin', 'Lyra', 'Thalor',
  'Kaelen', 'Bram', 'Isolde', 'Gideon', 'Seraphina', 'Drogath', 'Rowan',
  'Aurelia', 'Fenric', 'Vespera', 'Ignis', 'Thorne', 'Brynn', 'Cassian',
  'Maeve', 'Lorcan', 'Alistair', 'Brenna', 'Sylas', 'Elora', 'Kaelthas',
  'Theron', 'Nyx', 'Dorian', 'Caelen', 'Rhiannon', 'Balthazar', 'Evander',
  'Miriel', 'Varric', 'Oakhaven', 'Soren', 'Kestrel', 'Morgana', 'Astrid',
  'Garrick', 'Lucian', 'Faelan', 'Darius', 'Lyanna', 'Corvus', 'Vaelin',
];

const SURNAME_PREFIXES = [
  'Shadow', 'Storm', 'Iron', 'Dawn', 'Bramble', 'Night', 'Silver',
  'Oaken', 'Blood', 'Sun', 'Moon', 'Frost', 'Deep', 'Ashen',
  'Rune', 'Ember', 'Grave', 'Thunder', 'Gold', 'Dusk', 'Wild',
  'Raven', 'Star', 'Flame', 'Stone', 'Mist', 'Gale', 'Wolf',
];

const SURNAME_SUFFIXES = [
  'weaver', 'heart', 'veil', 'seeker', 'thorn', 'shade', 'flame',
  'shield', 'sworn', 'walker', 'strider', 'whisper', 'warden', 'delver',
  'blade', 'chaser', 'crest', 'caller', 'fang', 'gaze', 'forge',
  'song', 'fall', 'bane', 'rider', 'born', 'claw', 'mourn',
];

const EPITHETS = [
  'the Undaunted', 'the Wise', 'the Redeemed', 'the Cursed',
  'the Silent', 'the Sun-Touched', 'the Exile', 'the Bloodhound',
  'the Ever-Living', 'the Iron-Willed', 'of the Sacred Grove',
  'of the High Peaks', 'of the Hollow Void', 'the Spellbreaker',
  'the Oathsworn', 'the Wandering Ghost', 'the Golden Lion',
];

export function generateRandomName(): string {
  const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const useEpithet = Math.random() > 0.45;

  if (useEpithet) {
    const epithet = EPITHETS[Math.floor(Math.random() * EPITHETS.length)];
    return `${firstName} ${epithet}`;
  } else {
    const prefix = SURNAME_PREFIXES[Math.floor(Math.random() * SURNAME_PREFIXES.length)];
    const suffix = SURNAME_SUFFIXES[Math.floor(Math.random() * SURNAME_SUFFIXES.length)];
    return `${firstName} ${prefix}${suffix}`;
  }
}

export function generateRandomStats(className: CharacterClass): CharacterStats {
  const config = CLASS_DETAILS[className];
  const roll = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

  return {
    health: roll(config.statRanges.health[0], config.statRanges.health[1]),
    mana: roll(config.statRanges.mana[0], config.statRanges.mana[1]),
    strength: roll(config.statRanges.strength[0], config.statRanges.strength[1]),
  };
}

const SKIN_TONES = [
  '#f5d0b5',
  '#e2b18f',
  '#c68642',
  '#8d5524',
  '#4a3728',
  '#d5e4eb',
  '#8bb896',
];

const HAIR_COLORS = [
  '#e0a96d',
  '#8c2617',
  '#271c19',
  '#e6e6e6',
  '#4a2e1b',
  '#6b21a8',
  '#15803d',
  '#0284c7',
];

const EYE_COLORS = [
  '#38bdf8',
  '#eab308',
  '#22c55e',
  '#a855f7',
  '#ef4444',
  '#f8fafc',
];

const AURA_COLORS = [
  '#f59e0b',
  '#8b5cf6',
  '#10b981',
  '#ef4444',
  '#06b6d4',
  '#ec4899',
];

const BG_GRADIENTS: [string, string][] = [
  ['#1e142b', '#0f0a17'],
  ['#0f241a', '#05120c'],
  ['#2c1511', '#140807'],
  ['#14202b', '#070f17'],
  ['#2b220f', '#140f06'],
  ['#1f1624', '#0d0910'],
];

export function generatePortraitConfig(className: CharacterClass, previousSeed?: number): PortraitConfig {
  const seed = previousSeed !== undefined ? (previousSeed + Math.floor(Math.random() * 9000 + 1000)) : Math.floor(Math.random() * 100000);
  const variant = Math.floor(Math.random() * 6);
  const expressions: PortraitConfig['expression'][] = ['fierce', 'mysterious', 'noble', 'smirking', 'calm'];

  return {
    seed,
    variant,
    skinTone: SKIN_TONES[Math.floor(Math.random() * SKIN_TONES.length)],
    hairColor: HAIR_COLORS[Math.floor(Math.random() * HAIR_COLORS.length)],
    eyeColor: EYE_COLORS[Math.floor(Math.random() * EYE_COLORS.length)],
    auraColor: AURA_COLORS[Math.floor(Math.random() * AURA_COLORS.length)],
    bgGradient: BG_GRADIENTS[Math.floor(Math.random() * BG_GRADIENTS.length)],
    accessoryType: Math.floor(Math.random() * 4),
    facialHair: Math.random() > 0.6 ? Math.floor(Math.random() * 4) : 0,
    expression: expressions[Math.floor(Math.random() * expressions.length)],
  };
}
