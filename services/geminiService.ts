import { ChatMessage, Sender } from '../types';
import { retrieveContext } from './ragService';

export const convertToGeminiHistory = (messages: ChatMessage[]) => {
  const history: { role: string; parts: { text: string }[] }[] = [];

  for (const msg of messages) {
    // Skip system/error/welcome messages in the history to focus on the active dialogue
    if (!msg.text || msg.id.startsWith('bot-error') || msg.id.startsWith('bot-welcome')) {
      continue;
    }

    history.push({
      role: msg.sender === Sender.User ? 'user' : 'model',
      parts: [{ text: msg.text }]
    });
  }

  return history;
};

export const streamMessageToBot = async (history: any[], message: string) => {
  // 1. Retrieve context using the new semantic-based RAG service
  const context = await retrieveContext(message);

  // 2. Construct the augmented message for the model
  const augmentedMessage = `
Com base nos trechos da base de conhecimento fornecidos abaixo, responda à pergunta do usuário.
Os trechos estão no formato "TÍTULO: ... CONTEÚDO: ...".
Se o contexto não for relevante para a pergunta, responda com base no seu conhecimento geral, sempre seguindo suas diretrizes de persona.

--- CONTEXTO ---
${context}
--- FIM DO CONTEXTO ---

Pergunta do Usuário: "${message}"
`;

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        history,
        message: augmentedMessage,
      }),
    });

    if (!response.ok) {
      throw new Error(`Erro na resposta da API: ${response.statusText}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('ReadableStream não suportado na resposta.');
    }

    const decoder = new TextDecoder();

    // Return the async-iterable matching the previous stream interface
    return {
      async *[Symbol.asyncIterator]() {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const text = decoder.decode(value, { stream: true });
            yield { text };
          }
        } finally {
          reader.releaseLock();
        }
      },
    } as any;

  } catch (err: any) {
    console.error('API proxy stream failed. Details:', err);
    // Fallback friendly message stream following the persona delimiter rules
    const fallback = [
      'Desculpe, tive um problema para responder agora.',
      'Se você estiver em perigo imediato, ligue para **190**.',
      'Posso falar de violência doméstica de forma informativa e com orientações de segurança. O que você precisa saber?'
    ].join('|||');

    return {
      async *[Symbol.asyncIterator]() {
        yield { text: fallback } as any;
      },
    } as any;
  }
};
