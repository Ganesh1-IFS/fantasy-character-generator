import { CharacterClass, CharacterStats } from '../types';

interface BackstoryComponents {
  origins: string[];
  deeds: string[];
  secrets: string[];
  destinies: string[];
}

const CLASS_NARRATIVES: Record<CharacterClass, BackstoryComponents> = {
  Mage: {
    origins: [
      'Exiled from the Celestial Athenaeum after deciphering a forbidden chapter of the Star-Eater’s Codex',
      'Born during a celestial eclipse when a falling meteorite shattered the spire of their ancestral tower',
      'Trained by a hermit chronomancer inside a pocket dimension where centuries passed in mere hours',
      'Once a humble alchemical apprentice who survived an explosion that crystallized raw aether into their blood',
      'Awakened from an ancient stasis vault beneath the Whispering Wastes with spells etched directly onto their skin',
    ],
    deeds: [
      'they unravel rival wards with a single breath of sapphire flame',
      'they weave threads of celestial energy to turn encroaching cataclysms upon their creators',
      'they wield forbidden pyromantic sigils to disintegrate demon-forged steel',
      'they can commune with the echoes of long-dead archmages through resonant quartz crystals',
    ],
    secrets: [
      'bearing a fractured runestone that hungers for ancient enchantments',
      'haunted by memories of a timeline that was erased to prevent the world’s collapse',
      'keeping an alchemical homunculus trapped inside an antique hourglass',
      'bound by a mystic pact that drains their warmth whenever high magic is invoked',
    ],
    destinies: [
      'Now they journey through the shattered realms to reclaim the lost fragments of the Primordial Grimoire before darkness falls.',
      'Now they walk the dangerous path between madness and divinity, seeking an antidote to the curse consuming their arcane core.',
      'Now they wander the frontiers, offering mystical warding to those threatened by aberrant planar incursions.',
    ],
  },
  Rogue: {
    origins: [
      'Raised within the labyrinthine underbelly of the Black Docks beneath the shadow of the Smuggler’s Moon',
      'The lone survivor of the Phantom Guild following a catastrophic betrayal orchestrated by the Merchant Lords',
      'Trained by an elusive cadre of acrobat-assassins who could sprint across silk threads in howling gales',
      'Once a royal cartographer’s courier who intercepted an encrypted scroll detailing the king’s assassination',
      'Orphaned in the jewel-paved avenues of a decadent empire where thievery was the only law that mattered',
    ],
    deeds: [
      'they can slip through locked vaults and iron portcullises like morning mist',
      'they strike from blind spots with poisoned stiletto blades dipped in wyvern venom',
      'they navigate trap-laden catacombs while disarming ancient runic triggers in the pitch dark',
      'they balance across crumbling parapets to pilfer treasures guarded by gargoyles',
    ],
    secrets: [
      'clutching a skeletal master key that can unlock any mundane or ethereal padlock',
      'carrying an uncashed bounty token marked with their own childhood insignia',
      'harboring an alchemical coin that always lands on the side predicting danger',
      'sworn to an enigmatic fence whose true identity is rumored to be the crown prince',
    ],
    destinies: [
      'Now they hunt across shadowed tavern alleys for the shadow-broker who betrayed their closest kin.',
      'Now they hire their lethal talents out to the highest bidder while plotting a daring heist against the Obsidian Vault.',
      'Now they wage an invisible war in the shadows, stealing back relics stripped from oppressed border towns.',
    ],
  },
  Warrior: {
    origins: [
      'Forged in the merciless winters of the Frostcrag Marches among berserkers who duel avalanche bears for sport',
      'The former captain of the Iron Vanguard who survived the tragic rout at the Ashen Valley',
      'A blacksmith’s prodigy whose colossal hammer was forged from the carcass of a fallen siege colossus',
      'Exiled from a warrior clan after refusing an order to burn a defenseless village of forest clans',
      'Raised on gladiatorial sands, having earned freedom through thirty-seven undefeated duels against mythical beasts',
    ],
    deeds: [
      'they cleave through phalanxes of armored foes with unrelenting ferocity',
      'they withstand mortal blows through sheer iron-willed defiance and ancestral battle roars',
      'they hold bridgeheads against overwhelming goblin hordes until their war-hammer splinters in their grip',
      'they lead demoralized retinues into glorious counter-charges that turn the tide of doomed wars',
    ],
    secrets: [
      'bearing a scarred broadsword that hums whenever creatures of the Abyss draw near',
      'carrying a faded crest of a dishonored legion they are determined to redeem',
      'living with shrapnel of black dragon bone embedded perilously close to their beating heart',
      'sworn to a silent oath never to drop their shield until every comrade’s grave is avenged',
    ],
    destinies: [
      'Now they roam the war-torn territories, offering an unbreakable shield to the defenseless against tyranny.',
      'Now they seek the legendary Titan’s Anvil to reforge their ancestral blade and reclaim their clan’s rightful mantle.',
      'Now they march unflinchingly toward the Dragon’s Gullet, ready to conquer destiny through cold steel and blood.',
    ],
  },
  Ranger: {
    origins: [
      'Born deep within the Whispering Briars and raised by a pack of spectral dire-wolves',
      'Once a royal scout who tracked a corrupted chimera across the uncharted spine of the world',
      'Apprenticed to an ancient elven strider who could hear an arrow’s flight from two valleys away',
      'The sole forest-warden remaining after a demonic blight swept through the Great Greenwood',
      'A wanderer who survived a perilous decade charting the shifting subterranean passages of the Hollow Caverns',
    ],
    deeds: [
      'they can split a willow leaf at three hundred paces through a torrential blizzard',
      'they track beasts across solid granite by reading the microscopic whisper of displaced moss',
      'they command loyal hawk familiars that scout enemy encampments from the cloudline',
      'they ambush trespassers with trick arrows tipped with alchemical frost and blinding pollen',
    ],
    secrets: [
      'carrying an ancient bow carved from the branch of the World Tree itself',
      'bearing the mark of the Wild Hunt upon their shoulder, pulsing under each full moon',
      'hiding a rare moon-serpent egg within their leather hunting pouch',
      'bound by a sacred vow to hunt down every poacher who harvested unicorn horn in the sacred groves',
    ],
    destinies: [
      'Now they patrol the twilight borderlands between civilized realms and primeval wilderness.',
      'Now they pursue the shadowy poachers who desecrated the sacred grove of their ancestors.',
      'Now they serve as the silent guide for pilgrims crossing treacherous monster-infested mountain passes.',
    ],
  },
  Cleric: {
    origins: [
      'Consecrated in the Sun-Drenched Abbey of Sol-Maris after surviving a deadly fever through miraculous light',
      'A field medic from the Great Crusades who refused to let dying soldiers perish without hearing divine benediction',
      'Chosen by the Golden Seraph in a vision atop the Mount of Dawning Prayers',
      'A repentant temple guardian who took holy vows after a lifetime spent guarding relics in underground crypts',
      'Born of an unbroken lineage of dawn-speakers whose prayers can dispel the deepest supernatural gloom',
    ],
    deeds: [
      'they mend shattered bones and purge creeping necrotizing blights with a gentle touch of celestial warmth',
      'they channel blinding pillars of solar fury to reduce legions of the restless dead to harmless ash',
      'they erect shimmering barriers of blessed golden prayer that deflect demonic siege engines',
      'they offer unyielding courage to hopeless armies with stirring hymns of the Everlasting Dawn',
    ],
    secrets: [
      'guarding a reliquary containing the final glowing feather of an archangel',
      'plagued by prophetic dreams of an impending twilight that threatens to swallow the sun',
      'bearing holy stigmata that bleed molten sunlight whenever great evil approaches',
      'harboring doubts about the high inquisitor’s secret alliance with pagan necromancers',
    ],
    destinies: [
      'Now they wander the plague-stricken frontiers, bringing miraculous healing and righteous judgment to all in need.',
      'Now they venture into the darkest mausoleums to banish the slumbering Lich Lords before they awaken.',
      'Now they preach fortitude and salvation to the destitute while wielding a heavy consecrated war-mace.',
    ],
  },
  Paladin: {
    origins: [
      'Anointed atop the High Altar of Aegis-Guard after kneeling forty days in vigil before the Sacred Flame',
      'The disowned scion of a corrupt noble dynasty who chose ascetic vows of justice over an imperial throne',
      'A squire who lifted the heavy golden standard of a fallen commander and rallied a crumbling regiment to victory',
      'Bound by an unbreakable blood oath sworn upon the tomb of the First Saint of Dawn',
      'Chosen by a winged celestial steed that descended onto the battlefield during the Siege of the Sun-Gate',
    ],
    deeds: [
      'they ride fearlessly into the vanguard of dread legions with a gleaming halberd radiating golden dawn',
      'they ward comrades from sorcerous curses by interposing their sanctified tower shield',
      'they pronounce divine edicts that cause deceivers and tyrants to tremble in remorse',
      'they smite abyssal horrors with weapons charged by celestial retribution',
    ],
    secrets: [
      'bearing an oath-ring that burns with searing heat whenever they contemplate compromise or deceit',
      'carrying a letter from the High King authorizing total martial authority across the provinces',
      'nursing a scar inflicted by an archdemon’s blade that whispers temptations in their slumber',
      'secretly protecting the last living heir to an overthrown righteous monarchy',
    ],
    destinies: [
      'Now they ride forth as an indomitable beacon of righteousness, upholding their oath across untamed frontiers.',
      'Now they seek to purge the corruption festering within their own sacred knightly order.',
      'Now they stand as an immovable bulwark between innocent villagers and the terror of the wilderness.',
    ],
  },
  Druid: {
    origins: [
      'Nurtured within the hollow trunks of the Elder Redwood Circle by ancient treants and dryads',
      'A child lost in the primeval bogs who returned ten seasons later draped in moss and accompanied by storm ravens',
      'The keeper of the Last Seed of the Primordial Willow, sworn to plant it when the world’s fires burn out',
      'Initiated into the Order of the Wild Horn through a perilous communion with the Great Stag Spirit',
      'Transformed into a great cave bear during an eclipse and spent thirty winters guarding a sacred ley-line spring',
    ],
    deeds: [
      'they summon thorny brambles and gale-force squalls to swallow invading warbands whole',
      'they shift seamlessly into the form of an apex predator to tear through despoilers of nature',
      'they coax wilting flora into magnificent blooms that yield curative balms and luminous sap',
      'they hear the warning whispers of the soil through bare feet miles before an earthquake strikes',
    ],
    secrets: [
      'possessing an amber amulet containing an ember from the first bonfire lit by mortal kind',
      'carrying living parasitic vines intertwined with their nervous system that grant empathy with all flora',
      'haunted by the agonizing wails of ancient forests consumed by timber baronies',
      'knowing the hidden ritual required to awaken the colossal earthen titan slumbering beneath the mountains',
    ],
    destinies: [
      'Now they enforce the primordial balance of soil, storm, and bone against those who exploit the wild.',
      'Now they trek toward the blighted badlands, seeking to rekindle the dying pulse of corrupted ley-lines.',
      'Now they guide wanderers through mist-veiled fairy glades while guarding the sacred threshold of nature.',
    ],
  },
};

export function generateCharacterBackstory(
  name: string,
  className: CharacterClass,
  _stats?: CharacterStats
): string {
  const pack = CLASS_NARRATIVES[className] || CLASS_NARRATIVES.Warrior;

  const origin = pack.origins[Math.floor(Math.random() * pack.origins.length)];
  const deed = pack.deeds[Math.floor(Math.random() * pack.deeds.length)];
  const secret = pack.secrets[Math.floor(Math.random() * pack.secrets.length)];
  const destiny = pack.destinies[Math.floor(Math.random() * pack.destinies.length)];

  const sentence1 = `${origin}, ${name} ${deed} while ${secret}.`;
  const sentence2 = destiny;

  return `${sentence1} ${sentence2}`;
}
