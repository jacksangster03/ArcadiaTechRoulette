const CHAR_MAP: Record<string, string> = {
  'a': '⍙', 'b': '⍦', 'c': '⎈', 'd': '⎉', 'e': '⎊', 'f': '⍝', 'g': '⍦', 'h': '⍧',
  'i': '⍨', 'j': '⍩', 'k': '⍪', 'l': '⍫', 'm': '⍬', 'n': '⍭', 'o': '⍮', 'p': '⍯',
  'q': '⍰', 'r': '⍱', 's': '⍲', 't': '⍳', 'u': '⍴', 'v': '⍵', 'w': '⍶', 'x': '⍷',
  'y': '⍸', 'z': '⍹', ' ': ' ', '1': '◴', '2': '◵', '3': '◶', '4': '◷', '5': '◰',
  '6': '◱', '7': '◲', '8': '◳', '9': '◨', '0': '◩', '\n': '\n'
};

const SYMBOL_MAP: Record<string, string> = {
  park: "🌿", lake: "🌊", palace: "🏛️", garden: "🌹", meeting: "🜁",
  tomorrow: "⏳", night: "🌙", urgent: "🔺", hidden: "🗝️", circle: "👁️",
  crystal: "💎", retiro: "🌳", meet: "🜁", the: "▪️", in: "▪️",
  at: "▪️", a: "▪️", to: "▪️", of: "▪️", and: "▪️",
  oblivion: "🌑", secret: "🌑", password: "🔑", vial: "🧪", rain: "🌧️"
};

const STOPWORD_SYMBOL = "▪️";

const STOPWORDS = new Set([
  "the", "in", "at", "a", "an", "to", "of", "and", "for", "on", "by", "from", "with", "near",
  "is", "are", "be", "this", "that", "it", "we", "you", "us", "our", "your", "my", "their",
]);

const SYNONYM_MAP: Record<string, string> = {
  meet: "meeting",
  meetup: "meeting",
  gather: "meeting",
  gathering: "meeting",
  rendezvous: "meeting",
  tmrw: "tomorrow",
  tonite: "night",
  tonight: "night",
  secrecy: "hidden",
  conceal: "hidden",
  concealed: "hidden",
  concealment: "hidden",
  keyring: "keyring",
  keychain: "keyring",
  keys: "keyring",
  retiropark: "retiro",
};

// Deterministic fallback palette for unknown words.
// This avoids dumping repeated "💠" for speech transcripts while staying cheap.
const EMOJI_FALLBACK_PALETTE = [
  "🜂", "🜄", "🜃", "🜔", "🝔", "🜍", "✶", "✷",
  "✸", "✹", "✺", "☉", "☽", "☿", "⚶", "⚷",
  "◇", "◈", "◉", "⬢", "⬡", "⟡", "⟢", "⟁",
  "🜚", "🜛", "🜜", "🜝", "🝮", "🝯", "🝰", "🝱",
];

const EMOJI_TO_WORD: Record<string, string> = {};
Object.entries(SYMBOL_MAP).forEach(([word, emoji]) => {
  if (!EMOJI_TO_WORD[emoji]) {
    EMOJI_TO_WORD[emoji] = word;
  }
});
EMOJI_TO_WORD[STOPWORD_SYMBOL] = 'marker';

export type EmojiClueType = 'last_emoji' | 'nth_emoji' | 'emoji_count';

export interface EmojiCluePayload {
  clueType: EmojiClueType;
  cluePrompt: string;
  expectedAnswer: string;
  clueMeta?: {
    index?: number;
  };
}

export const encodeCipher = (text: string): string => {
  return text.toLowerCase().split('').map(char => CHAR_MAP[char] || '⎔').join('');
};

const normalizeWord = (word: string): string => {
  // Keep letters/numbers only for stable token hashing and matching.
  const clean = word.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (!clean) return '';
  if (SYNONYM_MAP[clean]) return SYNONYM_MAP[clean];
  return clean;
};

const hashToken = (token: string): number => {
  // FNV-1a-ish fast hash for deterministic emoji fallback.
  let hash = 2166136261;
  for (let i = 0; i < token.length; i += 1) {
    hash ^= token.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return Math.abs(hash >>> 0);
};

const fallbackEmojiForToken = (token: string): string => {
  const idx = hashToken(token) % EMOJI_FALLBACK_PALETTE.length;
  return EMOJI_FALLBACK_PALETTE[idx];
};

export const encodeForumCipher = (text: string): string => {
  const words = text.split(/\s+/).map((w) => normalizeWord(w)).filter(Boolean);
  return words
    .map((word) => {
      if (SYMBOL_MAP[word]) return SYMBOL_MAP[word];
      if (STOPWORDS.has(word)) return STOPWORD_SYMBOL;
      return fallbackEmojiForToken(word);
    })
    .join(' ');
};

export const tokenizeCipher = (cipherText: string): string[] => {
  return cipherText
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean);
};

export const normalizeClueAnswer = (input: string): string => {
  return input.trim().toLowerCase().replace(/\s+/g, ' ');
};

export const emojiWordForSymbol = (symbol: string): string | null => {
  return EMOJI_TO_WORD[symbol] ?? null;
};

export const buildEmojiClue = (
  cipherText: string,
  mode: EmojiClueType = 'last_emoji'
): EmojiCluePayload => {
  const tokens = tokenizeCipher(cipherText);
  if (tokens.length === 0) {
    return {
      clueType: 'emoji_count',
      cluePrompt: 'Count the visible glyphs and enter the total.',
      expectedAnswer: '0',
    };
  }

  if (mode === 'emoji_count') {
    return {
      clueType: 'emoji_count',
      cluePrompt: 'Count the visible glyphs and enter the total.',
      expectedAnswer: String(tokens.length),
    };
  }

  if (mode === 'nth_emoji') {
    const oneBasedIndex = Math.min(3, tokens.length);
    const symbol = tokens[oneBasedIndex - 1];
    const word = emojiWordForSymbol(symbol);
    if (!word) {
      return {
        clueType: 'emoji_count',
        cluePrompt: 'Count the visible glyphs and enter the total.',
        expectedAnswer: String(tokens.length),
      };
    }
    return {
      clueType: 'nth_emoji',
      cluePrompt: `Type the word represented by glyph ${oneBasedIndex}.`,
      expectedAnswer: word,
      clueMeta: { index: oneBasedIndex },
    };
  }

  const lastSymbol = tokens[tokens.length - 1];
  const lastWord = emojiWordForSymbol(lastSymbol);
  if (!lastWord) {
    return {
      clueType: 'emoji_count',
      cluePrompt: 'Count the visible glyphs and enter the total.',
      expectedAnswer: String(tokens.length),
    };
  }

  return {
    clueType: 'last_emoji',
    cluePrompt: 'Type the word represented by the final glyph.',
    expectedAnswer: lastWord,
  };
};

export const chooseClueTypeForEventId = (eventId: string): EmojiClueType => {
  // Deterministic weighting for demo reliability:
  // ~80% last_emoji, ~10% nth_emoji, ~10% emoji_count.
  const hash = eventId.split('').reduce((acc, ch, index) => acc + (ch.charCodeAt(0) * (index + 1)), 0);
  const bucket = hash % 10;
  if (bucket === 0) return 'emoji_count';
  if (bucket === 1) return 'nth_emoji';
  return 'last_emoji';
};

export const extractLocation = (text: string): {loc: string, lat: number, lng: number} => {
  let lat = 0;
  let lng = 0;
  let loc = "Coordinates Obscured";
  const normalized = text.toLowerCase();
  const hasAny = (keywords: string[]) => keywords.some((kw) => normalized.includes(kw));

  if (hasAny(["palace", "retiro", "crystal palace"])) {
    loc = "Crystal Palace, Retiro Park";
    lat = 40.4138;
    lng = -3.6824;
  } else if (hasAny(["park"])) {
    loc = "Central Park Meeting Point";
    lat = 40.7812;
    lng = -73.9665;
  } else if (hasAny(["lake", "serpentine"])) {
    loc = "The Serpentine Lake";
    lat = 51.5055;
    lng = -0.1656;
  }

  return { loc, lat, lng };
};
