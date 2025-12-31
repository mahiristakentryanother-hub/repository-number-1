import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Groq সেটআপ
const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
  const { messages } = await req.json();

  const result = await streamText({
    model: groq('llama3-8b-8192'),
    messages,
  });

  return result.toDataStreamResponse();
}
