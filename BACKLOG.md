# Backlog — Fita → Business

What's here today: a static, single-file prototype. Users bring their own OpenAI key.
What's below: the realistic path to a paying product. Scoped in phases so each phase ships on its own and generates signal before investing in the next.

---

## Phase 1 — Hosted MVP (OpenAI key on the server)

The step that makes it usable by people who don't have an OpenAI account.

- [ ] Scaffold Next.js 14 app (App Router, TypeScript, Tailwind)
- [ ] Port the current `index.html` UI into `app/page.tsx` as React components
- [ ] Wire up `app/api/process-audio/route.ts` (code already drafted in [backend/process-audio.ts](backend/process-audio.ts))
- [ ] Move `OPENAI_API_KEY` to Vercel env var — never ships to browser
- [ ] Deploy to Vercel (`vercel --prod`), point `fita.com.br` (or `usefita.com`) at it if the domain's available
- [ ] Rate-limit `/api/process-audio` by IP (Upstash Redis or Vercel KV) so one anonymous user can't drain the key
- [ ] Add a usage cap for anonymous users (e.g. 3 recordings per day per IP)

## Phase 1.5 — Audio & richer notes (needs IndexedDB or Supabase Storage)

Features inspired by Voicenotes.com. Each one needs real file storage (localStorage can't hold audio blobs), so they land after Phase 1.

- [ ] Store recorded audio in IndexedDB (or Supabase Storage in Phase 2)
- [ ] Playback on each note card (▶ button + duration display)
- [ ] Attach images or PDFs to a note
- [ ] Record subnote (append a second recording to an existing note)
- [ ] Mark note type: Meeting, Idea, Journal, Task (visual label)
- [ ] Semantic search across notes (OpenAI embeddings cached per note)
- [ ] Calendar / timeline view (group by day, week, month)
- [ ] Shared notes (public read-only link, or shared with another Fita user. This one needs Phase 2 accounts)

## Phase 2 — Accounts & sync

The step that unlocks cross-device use and makes people want to keep notes long-term.

- [ ] Supabase project (free tier covers thousands of users)
- [ ] Magic-link auth + Google OAuth
- [ ] `notes` table: `id, user_id, created_at, title, content, transcript, style, folder, tags`
- [ ] API routes: `GET/POST/PUT/DELETE /api/notes`
- [ ] Migrate existing localStorage notes to the server on first login (one-time)
- [ ] Row Level Security so no user can read another's notes

## Phase 3 — Billing (the actual revenue step)

The step that turns use into money.

- [ ] Stripe account (or Stripe Brazil for Pix + cards in BRL)
- [ ] Pricing table: Free (3 recordings/day) · Pro (unlimited, R$19,90/month) · Equipe (R$49,90, 5 seats)
- [ ] Stripe Checkout + Customer Portal
- [ ] Webhook: `checkout.session.completed` → set `user.plan = 'pro'`
- [ ] Usage metering: count recordings per user per month in Postgres
- [ ] Enforce limits in `/api/process-audio` before calling OpenAI
- [ ] Email receipts via Resend (free tier: 3K/month)

## Phase 4 — Brazilian-market essentials

The step that stops you from getting in legal trouble and makes it feel native, not translated.

- [ ] LGPD-compliant privacy policy + terms of service (PT-BR, translated or lawyer-reviewed)
- [ ] Pix as a payment option (Stripe Brazil or Mercado Pago as backup)
- [ ] MEI or CNPJ setup for invoicing (nota fiscal on each sale)
- [ ] PT-BR landing page (not just the app — a real marketing page with headline, demo video, pricing, FAQ)
- [ ] Switch default domain to `.com.br` and configure it in Stripe for BR tax
- [ ] "Fale conosco" email (not Gmail — use the custom domain)

## Phase 5 — Growth & validation

The step that proves there's actually a market before you quit anything.

- [ ] Launch thread on LinkedIn (PT-BR) with the "built this in a weekend" angle
- [ ] Product Hunt BR launch (lower competition than global PH)
- [ ] Submit to AppBrasil / BrazilBuilds / Desenvolvedores BR directories
- [ ] Reach out to 10 Brazilian creators / journalists / lawyers for feedback — in person if possible
- [ ] Track: visit → signup → first recording → day-7 return → first paid conversion
- [ ] Decide after 30 days: >50 weekly actives = push on; <10 = kill it, keep the portfolio piece

## Phase 6 — B2B wedge (if Phase 5 signals demand)

The move that gets to R$10K+/month instead of R$500/month.

- [ ] Vertical templates: Jurídico (depoimentos, petições), Saúde (prontuários), Jornalismo (pautas)
- [ ] Audit log (who dictated what when — required for legal use)
- [ ] Shared workspaces + role-based access
- [ ] Custom vocabulary per account (legal terms, medical terms)
- [ ] CNPJ-only pricing tier starting at R$299/month per seat
- [ ] Case study with one named customer per vertical

---

## Honest reality check

- "One day" for Phase 1 only works if nothing goes wrong and you already know Next.js, Supabase, and Vercel cold. Realistic: **2-3 days** for Phase 1 alone.
- Full path Phase 1 → Phase 4 (shippable paid product): **3-4 weeks of full-time work**, plus a few days with an accountant for MEI/CNPJ.
- The hardest part isn't the code — it's Phase 5. Most indie SaaS dies here, not in development.
- Before Phase 1, ask: do I want to run a product business, or do I want to have built one impressive thing? Totally different lives.
