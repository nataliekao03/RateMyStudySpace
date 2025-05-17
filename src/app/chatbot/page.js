'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { BotMessageSquare, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';

export default function ChatbotPage() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { text: userInput, sender: 'user' }];
    setMessages(newMessages);
    setUserInput('');
    setLoading(true);

    try {
      const result = await axios.post('/api/chat', {
        messages: [
          {
            role: 'system',
            content: `You are Nook, a friendly and concise study space assistant helping students at San Jose State University. Always format your responses clearly using Markdown. Use bullet points or numbered lists for locations, keep spacing between items, respond in a warm, informative tone, and avoid redundant wrap-ups. Only include addresses when relevant, and keep each item to 1–2 lines.`
          },
          ...newMessages.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.text,
          })),
        ],
      });

      if (result.data.error) throw new Error(result.data.error);
      setMessages([...newMessages, { text: result.data.reply, sender: 'bot' }]);
    } catch (error) {
      console.error('Error calling /api/chat:', error);
      setMessages([
        ...newMessages,
        { text: 'Sorry, something went wrong. Please try again later.', sender: 'bot' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 pt-20 px-4">
      <Link href="/" className="fixed left-6 top-6 text-blue-600 hover:text-blue-800">
        <ArrowLeft className="w-5 h-5 inline-block mr-1" />
        Back to Home
      </Link>

      <div className="max-w-3xl mx-auto p-4">
        <div className="flex items-center gap-4 bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 shadow-sm">
          <div className="bg-blue-600 text-white rounded-full p-2">
            <BotMessageSquare className="w-6 h-6" />
          </div>
          <p className="text-gray-800 text-sm md:text-base">
            Hi there! I’m <strong>Nook</strong>, your personal study companion. I’m here to help you find the best study spaces nearby and offer study tips tailored to your needs!
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg flex flex-col h-[75vh] p-4">
          <div className="flex-1 overflow-y-auto space-y-2 mb-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`px-4 py-2 rounded-xl text-sm max-w-[80%] break-words ${
                  msg.sender === 'user'
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-gray-200 text-gray-900 rounded-bl-none'
                }`}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}> 
                    {msg.text}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              placeholder="Ask me anything..."
              disabled={loading}
              className="flex-1 p-2 border rounded-lg"
            />
            <button
              onClick={handleSendMessage}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              {loading ? 'Thinking...' : 'Send'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
