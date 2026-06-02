# Rosa Amiga 🤖💜

**Apoio e conscientização contra a violência doméstica**

Um chatbot inteligente desenvolvido em React que oferece suporte, informações e recursos para pessoas em situação de violência doméstica.

## 🎯 Sobre o Projeto

Rosa Amiga é uma aplicação web que utiliza inteligência artificial (Google Gemini) para fornecer um espaço seguro de conversa, orientação e conscientização sobre violência doméstica. O sistema implementa uma forma avançada de RAG (Retrieval-Augmented Generation) para oferecer respostas precisas e contextualizadas, rodando inteiramente no navegador do usuário para máxima privacidade.

## ✨ Funcionalidades

- 💬 Interface de chat intuitiva e responsiva
- 🎙️ **Modo de Voz em Tempo Real:** Converse naturalmente usando sua voz.
- 🎧 **Visualização de Áudio 3D Interativa:** Uma esfera dinâmica que reage à sua voz e às respostas do bot, criada com Three.js e a Web Audio API.
- 🧠 IA conversacional com Google Gemini
- 🔍 Busca Híbrida (Semântica + Palavra-chave) com RRF para máxima precisão
- 🚀 RAG 100% client-side com TensorFlow.js para maior privacidade
- 🔒 Ambiente seguro e confidencial com botão de "Saída Rápida"
- 📱 Design responsivo para dispositivos móveis

## 🚀 Tecnologias

- **React 19** - Interface de usuário
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e desenvolvimento
- **Google Gemini AI** - Modelo de linguagem generativo
- **TensorFlow.js** - Machine learning no navegador
- **Universal Sentence Encoder** - Modelo para geração de embeddings de texto
- **Three.js** - Biblioteca para renderização 3D/WebGL
- **Tailwind CSS** - Estilização

## 🧠 RAG com Busca Híbrida (Client-Side)
A Rosa Amiga utiliza um sistema RAG avançado que roda inteiramente no navegador do usuário para garantir privacidade e precisão. A abordagem combina duas técnicas de busca para obter resultados superiores:

1.  **Busca Semântica**: Usamos o **Universal Sentence Encoder** (via TensorFlow.js) para converter tanto a base de conhecimento quanto as perguntas do usuário em vetores numéricos (embeddings). Isso permite que o sistema entenda a *intenção* e o *significado* da pergunta, encontrando trechos conceitualmente relevantes.

2.  **Busca por Palavra-chave**: Em paralelo, um sistema de busca tradicional analisa a correspondência de termos exatos entre a pergunta e os documentos da base de conhecimento. Isso é crucial para encontrar informações específicas como nomes, endereços e telefones.

3.  **Reciprocal Rank Fusion (RRF)**: Os resultados de ambas as buscas são combinados de forma inteligente usando o algoritmo RRF. Ele dá uma pontuação maior aos documentos que aparecem bem classificados nas duas listas, equilibrando a busca por significado com a busca por termos exatos.

4.  **Contexto Aumentado**: Os trechos mais relevantes da busca híbrida são recuperados e fornecidos como contexto para o Google Gemini, garantindo que as respostas sejam precisas, relevantes e consistentes.

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Chave de API do Google Gemini

## ⚙️ Instalação

1. **Clone o repositório**
   ```bash
   git clone <https://github.com/theezequiel42/chatbot-rosaamiga>
   cd chatbot-rosaamiga
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

   ```bash
   npm install react-icons three
   ```

3. **Configure as variáveis de ambiente**
   Crie um arquivo `.env` na raiz do projeto e adicione sua chave da API do Google Gemini:
   ```
   API_KEY=sua_chave_aqui
   ```

4. **Execute o projeto**
   ```bash
   npm run dev
   ```

5. **Acesse a aplicação**
   Abra o endereço fornecido no terminal (geralmente [http://localhost:5173](http://localhost:5173)) no seu navegador.

## 🏗️ Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza o build de produção

## 📁 Estrutura do Projeto

```
├── components/
│   ├── ChatInterface.tsx    # Interface principal do chat
│   ├── MessageBubble.tsx    # Componente de mensagens
│   ├── VoiceInterface.tsx   # Interface do modo de voz
│   └── AudioVisualizer.tsx  # Componente da esfera 3D
├── hooks/
│   └── useVoiceProcessor.ts # Hook para processamento de áudio e voz
├── services/
│   ├── embeddingService.ts  # Lógica para gerar embeddings com TensorFlow.js
│   ├── geminiService.ts     # Integração com Google Gemini
│   ├── ragService.ts        # Lógica de RAG (Busca Híbrida, RRF)
│   └── vectorUtils.ts       # Funções matemáticas para vetores
├── App.tsx                  # Componente principal
├── constants.ts             # Constantes da aplicação
├── knowledgeBase.ts         # Base de conhecimento para o RAG
├── types.ts                 # Definições de tipos TypeScript
└── index.tsx                # Ponto de entrada da aplicação
```

## 🚨 Informações Importantes

- **Emergência**: Em caso de perigo imediato, ligue para **190**
- **Central de Atendimento à Mulher**: **180**
- Este é um projeto de apoio e não substitui ajuda profissional

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

---

💜 **Desenvolvido com carinho para ajudar quem precisa**
