export type CharacterClass =
  | 'Mage'
  | 'Rogue'
  | 'Warrior'
  | 'Ranger'
  | 'Cleric'
  | 'Paladin'
  | 'Druid';

export interface CharacterStats {
  health: number;
  mana: number;
  strength: number;
}

export interface PortraitConfig {
  seed: number;
  variant: number;
  skinTone: string;
  hairColor: string;
  eyeColor: string;
  auraColor: string;
  bgGradient: [string, string];
  accessoryType: number;
  facialHair?: number;
  expression: 'fierce' | 'mysterious' | 'noble' | 'smirking' | 'calm';
}

export interface FantasyCharacter {
  id: string;
  name: string;
  className: CharacterClass;
  stats: CharacterStats;
  portrait: PortraitConfig;
  backstory: string;
  createdAt: number;
}
