# Arcadia

A hidden operating system for secret societies: access by rite, communication by symbol.

Arcadia is a demo-first web experience built for a hackathon setting. It is intentionally narrow, ritualized, and reliable: one coherent happy path that can be run repeatedly in front of judges.

## Submission Snapshot

- **Repo:** [joeljin20/Arcadia](https://github.com/joeljin20/Arcadia)
- **Run locally (single command):**
  ```bash
  npm install && npm run dev
  ```
- **Dev URL:** `http://localhost:3001`
- **Optional backend helper:**
  ```bash
  npx tsx server.ts
  ```

## What This Project Is

Arcadia is a two-layer product:

1. **Public front** (`Alchemy / Culinary Vault`): elegant recipe archive UI with hidden ritual mechanics.
2. **Hidden system** (`Arcadia`): initiation gate + member dashboard + symbolic intel decode.

The design goal is to make the reveal feel magical while keeping implementation deterministic and demo-safe.

## Core Demo Flow (Exact)

1. Open **Alchemy**.
2. Discover/open **The Obsidian Cipher Torte** path.
3. Trigger **Hacker Console** and complete number sequence challenge.
4. Reach unlocked vault state.
5. Enter **Initiation Rite**:
   - present catalyst to camera,
   - solve puzzle.
6. Enter **Arcadia Dashboard**.
7. In **Global Intel**, submit a message and show emoji cipher output.
8. Decode intel using clue-driven answer.
9. Reveal original text + location map.
10. Show **Vault** and **Secure Comms** tabs for system completeness.

---

## Product Architecture

### Frontend

- React 19 + TypeScript + Vite
- TailwindCSS 4 + custom CSS ritual effects
- Motion animations via `motion/react`
- Web Audio API micro-sound cues
- TensorFlow.js in-browser scanning for initiation

### Data

- `localStorage` via `src/services/mockDB.ts`
- Seeded data for reliability in demos
- Backward-compatible event schema upgrades

### Optional Backend

- `server.ts` (Express helper)
- Not required for the main app flow

---

## Exactly How Each Major Screen Works

## 1) Alchemy (Culinary Vault)

Implemented in:
- `src/pages/AlchemyPage.tsx`
- `src/components/RecipeCard.tsx`
- `src/components/RecipeDetail.tsx`
- `src/components/HackerConsoleOverlay.tsx`

What it does:
- Renders responsive slot-based archive composition with one featured hero card + small cards.
- Supports filtering and search.
- Obsidian path drives unlock journey.
- Hacker console validates ritual number sequence.

Notes:
- Layout uses deterministic slot math and periodic reshuffle.
- Visual effects (beam ring, CRT/glow, hover depth, parallax) are presentational only.

## 2) Initiation

Implemented in:
- `src/pages/InitiationPage.tsx`

What it does:
- Camera-based catalyst verification (browser ML path).
- Failure path and retry handling.
- Puzzle stage (Gemini-generated when available, fallback riddle if not).

Reliability decisions:
- Fast startup model strategy for demo pace.
- Fallback puzzle prevents dead-end.

## 3) Arcadia Dashboard

Implemented in:
- `src/pages/ArcadiaDashboard.tsx`
- `src/components/CipherCard.tsx`
- `src/components/AuctionCard.tsx`

Tabs:
- **Global Intel:** create encoded intel + decode challenge.
- **The Vault:** encrypted lot cards.
- **Secure Comms:** local shadow-node messaging simulation.

---

## Global Intel Cipher System (Detailed)

Implemented in:
- `src/logic/cipher.ts`
- `src/components/CipherCard.tsx`
- `src/pages/ArcadiaDashboard.tsx`

### Encoding pipeline

1. Admin/member submits text (typed or speech transcript).
2. Text is tokenized + normalized.
3. Tokens are encoded into symbols:
   - known keywords use curated map (`lake -> 🌊`, `meeting -> 🜁`, etc.)
   - stopwords map to neutral marker (`▪️`)
   - unknown words map to deterministic fallback emoji via hashing (so output is varied, not repeated `💠`)

### Decode challenge pipeline

For each new intel event, the app stores clue metadata:
- `clueType`: one of `last_emoji`, `nth_emoji`, `emoji_count`
- `cluePrompt`
- `expectedAnswer`
- optional `clueMeta`

Clue type selection is deterministic by event ID, weighted for demo reliability:
- ~80% `last_emoji`
- ~10% `nth_emoji`
- ~10% `emoji_count`

### Current answer mode (UX)

Clues are solved via **typed text** (easy for demos), not emoji keyboard input.
- For glyph-based clues, user types the **word represented by the glyph**.
- Includes `Show Hint` and `Override Decode` actions so judges never get blocked.
- Legacy records (older schema) still decode via key fallback.

---

## Type/Data Model Updates

`EventMetadata` now supports clue metadata (all optional for backward compatibility):

- `clueType?: 'last_emoji' | 'nth_emoji' | 'emoji_count'`
- `cluePrompt?: string`
- `expectedAnswer?: string`
- `clueMeta?: { index?: number }`

Old events in localStorage remain valid; read adapter safely defaults missing fields.

---

## Run Instructions (Detailed)

### Prerequisites

- Node.js 18+
- npm

### 1) Install

```bash
npm install
```

### 2) Environment

Create `.env.local` with at least:

```env
GEMINI_API_KEY=your_key_here
```

### 3) Start app

```bash
npm run dev
```

App runs on:
- `http://localhost:3001`

### 4) Optional helper server

```bash
npx tsx server.ts
```

### 5) Validate

```bash
npm run lint
npm run build
```

---

## Scripts

```bash
npm run dev               # Vite dev server (port 3001)
npm run build             # Production build
npm run preview           # Preview built app
npm run lint              # Type-check (tsc --noEmit)
npm run clean             # Remove dist
npm run ml:deps           # Install python deps for training pipeline
npm run ml:train:key      # Train local key classifier
npm run ml:train:key:docker # Dockerized training path
```

---

## File Structure (Current)

```text
src/
  components/
    AuctionCard.tsx
    CipherCard.tsx
    HackerConsoleOverlay.tsx
    RecipeCard.tsx
    RecipeDetail.tsx
  config/
    constants.ts
  logic/
    cipher.ts
  pages/
    AdminPanel.tsx
    AlchemyPage.tsx
    ArcadiaDashboard.tsx
    InitiationPage.tsx
  services/
    audio.ts
    gemini.ts
    mockDB.ts
  types/
    index.ts
  App.tsx
  index.css
  main.tsx
server.ts
ml/
README.md
```

---

## Fallbacks / Demo Resilience

1. **Puzzle fallback:** hardcoded riddle if Gemini fails.
2. **Decode fallback:** hint + override button in intel decode.
3. **Legacy data fallback:** old events remain decodable.
4. **Seeded data:** preloaded auctions/events/members for continuity.
5. **Location fallback:** text location still shown even if map is not ideal.

---

## What Judges Should Notice

1. **Cohesive reveal design:** from Alchemy front to hidden Arcadia behavior.
2. **Deterministic symbolic system:** repeatable, explainable encoding/decoding.
3. **Demo reliability:** fast local run, seeded state, graceful fallbacks.
4. **Technical breadth:** frontend interaction design, browser ML initiation, AI puzzle integration, symbolic logic pipeline.

---

## 5-Minute Pitch Guidance

- Minute 1: Vision + reveal (Alchemy -> hidden path)
- Minute 2: Initiation rite (camera + puzzle)
- Minute 3: Global Intel post + emoji cipher
- Minute 4: Clue-based decode + location reveal
- Minute 5: Vault/comms + architecture/fallback reliability

Q&A emphasis:
- deterministic over fragile AI where reliability matters,
- why clue metadata is backward-compatible,
- how fallback paths protect live demos.

---

## License

Hackathon prototype. Add formal license before production use.
