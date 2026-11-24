# VoiceNoite

App de notas por voz em Português do Brasil (`pt-BR`) inspirado no AudioPen.
Grave pensamentos naturalmente e transforme em notas limpas, listas, diário, posts de blog, e-mails ou mensagens de WhatsApp.

## Recursos

- Reconhecimento de voz nativo em `pt-BR` + suporte a **OpenAI Whisper (`pt`) + GPT-4o-mini**
- Limpeza automática de vícios de oralidade (*tipo, né, aí, então, assim, cara, enfim*)
- Alternância **Nota | Transcrição**
- Estilos: Claro & Simples, Diário, Lista, Post de Blog, E-mail e WhatsApp
- Modo Teclado / Resposta Rápida para colar direto no WhatsApp, Slack ou e-mail
- Armazenamento local no navegador (nenhuma nota sai do seu dispositivo sem OpenAI opcional)

## Como rodar

### Opção A — Uso imediato (estático)

Abra `index.html` em Chrome, Edge ou Safari. HTTPS ou `localhost` são obrigatórios para acessar o microfone.

Para publicar no GitHub Pages:

1. Suba este repositório para o GitHub.
2. Em **Settings → Pages → Build and deployment**, escolha branch `main` e pasta `/root`.
3. Em ~1 minuto o app estará em `https://<seu-usuario>.github.io/voicenoite/`.

### Opção B — Próximo passo: Next.js + OpenAI no servidor

A rota `backend/process-audio.ts` é um endpoint pronto para Next.js (App Router) que faz:

1. Transcrição com Whisper ajustado para PT-BR (`language: 'pt'` + prompt brasileiro).
2. Reescrita com GPT-4o-mini usando um prompt que remove vícios de oralidade e evita português europeu.

Para usar, mova para `app/api/process-audio/route.ts` em um projeto Next.js, defina `OPENAI_API_KEY` no `.env.local` e faça o front-end enviar o `audio` via `FormData`.

## Próximos passos (roadmap)

- [ ] App Next.js com backend seguro (chave OpenAI no servidor)
- [ ] Sync entre dispositivos via Supabase
- [ ] App iOS nativo + Apple Watch (SwiftUI + WatchConnectivity)
- [ ] Extensão de teclado iOS para ditar direto em qualquer app
