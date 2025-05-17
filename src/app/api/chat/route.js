import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// use your secret key here (no NEXT_PUBLIC_ prefix)
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
  try {
    const { messages } = await req.json();
    const res = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      max_tokens: 400,
      temperature: 0.7,
    });
    return NextResponse.json({ reply: res.choices[0].message.content });
  } catch (err) {
    console.error('OpenAI error:', err);
    return NextResponse.json(
      { error: 'OpenAI request failed' },
      { status: 500 }
    );
  }
}
