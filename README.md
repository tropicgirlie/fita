# Fita

A voice-note app shaped like a cassette tape. Speak naturally, get clean writing back. Works in Brazilian Portuguese (`pt-BR`) and multicultural English.

*Fita* is Portuguese for cassette tape.

## Features

- Switch between **Brazilian Portuguese** and **English (multicultural)** from the header or Settings
- Native browser speech recognition + optional **OpenAI Whisper + GPT-4o-mini** (bring your own key)
- Removes fillers without flattening the speaker's voice
  - PT-BR: *tipo, né, aí, então, assim, cara, enfim, sabe, tá ligado*
  - EN: *um, uh, like, you know, kind of, basically, I mean, sort of* — while preserving non-native phrasing and personality
- Three views per note: cleaned **Note**, raw **Spoken** transcript, bullet **Summary**
- One-tap derivatives: tweet, X thread, professional email, LinkedIn post, action checklist, hashtags
- Ask AI questions about a note
- Edit, star, share, copy, delete
- Rewrite styles: Clear & Simple, Journal, List, Blog Post, Email, Chat
- Local-first: notes live in your browser, exportable as JSON
- Brand rule: never uses em dashes (no AI slop)

## How to run

### Option A — Static (now)

Open `index.html` in Chrome, Edge or Safari. HTTPS or `localhost` is required for microphone access.

To publish on GitHub Pages:

1. Push this repo to GitHub.
2. In **Settings → Pages → Build and deployment**, pick branch `main`, folder `/root`.
3. In about a minute the app is live at `https://<your-user>.github.io/fita/`.

### Option B — Next.js with OpenAI on the server

`backend/process-audio.ts` is a drop-in Next.js App Router endpoint that does:

1. Transcription with Whisper (language set per request — `pt` or `en`).
2. Rewrite with GPT-4o-mini using language-specific prompts (clean oralidade in PT-BR; preserve multicultural voice in EN).

Move it to `app/api/process-audio/route.ts` in a Next.js project, set `OPENAI_API_KEY` in `.env.local`, and have the frontend POST `audio` as `FormData`.

## Roadmap

See [BACKLOG.md](BACKLOG.md) for the full phased plan (Hosted MVP → Accounts → Billing → Brazilian-market essentials → Growth → B2B wedge).
