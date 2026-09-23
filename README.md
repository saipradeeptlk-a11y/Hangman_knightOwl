# Hangman

A themed Hangman game built for the Knight Owl intern challenge — random word selection, category-based visual themes, a full on-screen + physical keyboard, and a small backend for tracking stats.

**Live demo:** https://hangman-knight-owl.vercel.app/ 
**Repo:** https://github.com/saipradeeptlk-a11y/Hangman_knightOwl

## What's in it

- Three categories — Tech & Languages, Sri Lanka, Flowers — each with its own color palette, font, and vibe (a Kandyan-inspired maroon/gold theme for Sri Lanka, a dark cyan "terminal" look for Tech, a soft pink/gold look for Flowers)
- On-screen keyboard plus full physical keyboard support
- A progressively-drawn hangman figure (SVG, builds gallows → rope → figure as you get wrong guesses)
- Win/lose modal with a short delay so you actually get to see the finished hangman before it pops up
- A tiny backend (`/api/stats`) that tracks games played, wins, and current streak, shown in the end-game modal
- Fully responsive — built and tested down to mobile widths

## Stack

- React + Vite on the frontend
- Vercel serverless functions for the backend (`/api/stats.js`)
- Plain CSS with CSS custom properties for theming — no CSS framework, so each category's colors/fonts swap by just changing a handful of variables
- Deployed on Vercel (frontend + API in one deploy)

## Running it locally

```bash
git clone https://github.com/saipradeeptlk-a11y/Hangman_knightOwl.git
cd Hangman_knightOwl
npm install
npm run dev
```

Note: the `/api/stats` endpoint won't work under plain `npm run dev` since that's just the Vite dev server — it only runs once deployed to Vercel (or via `vercel dev` if you have the CLI). Everything else works fully offline.

## How it's built

The game state lives in one custom hook, `useHangmanGame`. It only actually stores two things — the current word and the set of guessed letters — everything else (lives remaining, win/lose, wrong guesses) gets calculated from those two on every render instead of being stored separately, mainly to avoid the classic bug where two pieces of state drift out of sync with each other.

Theming works through CSS custom properties. Each category in `data/words.js` carries its own color palette and font alongside its word list; picking a category sets those as CSS variables on the root element, so the whole app's look changes without any per-component theme logic.

The backend is intentionally simple — an in-memory stats counter on a single serverless route, rather than a full database. Given the time frame for this challenge, that felt like the right trade-off: it's a real API route with real request handling, but it resets on redeploy rather than persisting permanently. A proper next step would be wiring it to something like Vercel KV or Postgres.

## What I'd add with more time

- Difficulty levels
- A leaderboard (would need actual persistence + probably some lightweight auth)
- Daily challenge mode
- Sound effects
- Dark/light mode toggle (currently the category themes are the only visual variation)
