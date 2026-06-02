import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { SYSTEM_INSTRUCTION } from './constants';

const SAFETY_SETTINGS = [
  { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
  { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
  { category: 'HARM_CATEGORY_SEXUAL', threshold: 'BLOCK_ONLY_HIGH' },
  { category: 'HARM_CATEGORY_DANGEROUS', threshold: 'BLOCK_ONLY_HIGH' },
  { category: 'HARM_CATEGORY_VIOLENCE', threshold: 'BLOCK_ONLY_HIGH' },
  { category: 'HARM_CATEGORY_SELF_HARM', threshold: 'BLOCK_LOW_AND_ABOVE' },
];

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      plugins: [
        {
          name: 'api-chat-middleware',
          configureServer(server) {
            server.middlewares.use(async (req, res, next) => {
              if (req.url?.startsWith('/api/chat') && req.method === 'POST') {
                try {
                  // Buffer the body of the POST request
                  const buffers = [];
                  for await (const chunk of req) {
                    buffers.push(chunk);
                  }
                  const bodyText = Buffer.concat(buffers).toString();
                  const { history, message } = JSON.parse(bodyText);

                  const apiKey = env.GEMINI_API_KEY;
                  if (!apiKey) {
                    res.statusCode = 500;
                    res.end('GEMINI_API_KEY environment variable not set in .env');
                    return;
                  }

                  const ai = new GoogleGenAI({ apiKey });

                  // Reconstruct contents for the Gemini API call
                  const contents = [
                    ...(history || []),
                    { role: 'user', parts: [{ text: message }] }
                  ];

                  const responseStream = await ai.models.generateContentStream({
                    model: 'gemini-2.5-flash',
                    contents: contents,
                    config: {
                      systemInstruction: SYSTEM_INSTRUCTION,
                      safetySettings: SAFETY_SETTINGS as any,
                    },
                  });

                  res.writeHead(200, {
                    'Content-Type': 'text/plain; charset=utf-8',
                    'Transfer-Encoding': 'chunked',
                  });

                  for await (const chunk of responseStream) {
                    const text = chunk.text;
                    if (text) {
                      res.write(text);
                    }
                  }
                  res.end();
                } catch (error: any) {
                  console.error('Vite dev middleware error:', error);
                  res.statusCode = 500;
                  res.end(JSON.stringify({ error: error.message }));
                }
              } else {
                next();
              }
            });
          }
        }
      ]
    };
});
