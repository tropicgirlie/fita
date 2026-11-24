import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const STYLE_MAP: Record<string, string> = {
  claro: 'Texto claro, fluido e bem estruturado em parágrafos curtos.',
  diario: 'Entrada de diário pessoal em primeira pessoa, reflexiva e natural.',
  lista: 'Lista organizada com marcadores (•) destacando tarefas e pontos-chave.',
  blog: 'Post de blog com abertura envolvente, desenvolvimento claro e fechamento forte.',
  email: 'E-mail profissional brasileiro: cordial, objetivo e sem formalidade excessiva.',
  whatsapp: 'Mensagem curta e natural para WhatsApp, sem vícios de fala.'
};

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const audio = formData.get('audio') as File | null;
  const style = (formData.get('style') as string) || 'claro';

  if (!audio) {
    return NextResponse.json({ error: 'Áudio não enviado' }, { status: 400 });
  }

  // 1. Whisper tuned for PT-BR
  const transcription = await openai.audio.transcriptions.create({
    file: audio,
    model: 'whisper-1',
    language: 'pt',
    prompt: 'Português do Brasil. Fala espontânea com gírias brasileiras, nomes próprios e pontuação natural.'
  });

  // 2. Rewrite with strict PT-BR rules
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content: `Você é um editor especialista em Português do Brasil (PT-BR).
Reescreva a transcrição de voz removendo vícios de oralidade (tipo, né, aí, então, assim, cara, enfim, tá ligado, gaguejos).
NUNCA use português de Portugal (ex: evite "estou a fazer", "consigo dizer-te", "telemóvel").
Estilo: ${STYLE_MAP[style] ?? STYLE_MAP.claro}
Retorne JSON: {"title": "...", "content": "...", "tags": ["tag1", "tag2"]}`
      },
      { role: 'user', content: transcription.text }
    ]
  });

  const parsed = JSON.parse(completion.choices[0].message.content || '{}');
  return NextResponse.json({
    transcript: transcription.text,
    ...parsed
  });
}