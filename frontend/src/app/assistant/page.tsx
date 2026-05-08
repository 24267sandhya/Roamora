'use client';
import { useState, useRef, useEffect } from 'react';
import {
  Sparkles, Send, Mic, Paperclip, Hotel, Car, MapPin,
  Calendar, Wallet, Plane, RefreshCw, ThumbsUp, ThumbsDown,
  Copy, MoreHorizontal, Compass
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

type Message = {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
  actions?: { label: string; href: string; icon: string }[];
};

const QUICK_PROMPTS = [
  { label: 'Plan a weekend trip', icon: '✈️' },
  { label: 'Best hotels in Goa under ₹5000', icon: '🏨' },
  { label: 'Cheapest EV rental in Delhi', icon: '⚡' },
  { label: 'What to eat in Tokyo?', icon: '🍜' },
  { label: 'Budget breakdown for Manali', icon: '💰' },
  { label: 'Compare Bali vs Thailand', icon: '🌏' },
];

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    role: 'ai',
    content: "Hello! I'm Roamora AI, your intelligent travel companion. I can help you:\n\n• 🗺️ **Plan complete itineraries** for any destination\n• 🏨 **Find and book hotels** within your budget\n• 🚗 **Recommend vehicles** for your route\n• 💡 **Answer travel questions** — visa, weather, currency, packing\n• 🔄 **Replan your trip** if things change\n\nWhat adventure are we planning today?",
    timestamp: new Date(),
  }
];

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Call real backend
    try {
      const res = await fetch('http://localhost:8080/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      
      if (!res.ok) throw new Error('Failed to get response');
      const data = await res.json();
      
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: data.reply,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: "I'm having trouble connecting to the travel intelligence engine. Please make sure the backend is running at http://localhost:8080.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMsg]);
    } finally {
      setLoading(false);
    }
  };

  const generateMockResponse = (query: string): { content: string; actions?: Message['actions'] } => {
    const q = query.toLowerCase();
    if (q.includes('hotel') || q.includes('stay')) {
      return {
        content: "Great question! Here are my top hotel recommendations:\n\n🏰 **The Leela Palace, Delhi** — ₹12,500/night · 5★ · Heritage luxury with world-class spa\n\n🏖️ **Zostel Goa** — ₹1,800/night · Social backpacker vibe, beachside location\n\n🏔️ **The Himalayan, Manali** — ₹8,500/night · 4★ · Stunning mountain views, fireplace rooms\n\nShould I filter by your budget and preferred dates?",
        actions: [
          { label: 'Browse All Hotels', href: '/hotels', icon: '🏨' },
        ]
      };
    }
    if (q.includes('vehicle') || q.includes('car') || q.includes('rent')) {
      return {
        content: "For your trip, here are the best vehicle options:\n\n⚡ **Tata Nexon EV** — ₹2,800/day · 312km range · Perfect for city + hills\n\n🏔️ **Mahindra Thar** — ₹4,200/day · 4WD · Best for mountain roads\n\n🚗 **Toyota Innova** — ₹3,800/day · 7 seater · Ideal for family trips\n\nTell me your route and I'll recommend the most fuel-efficient option for your specific journey!",
        actions: [
          { label: 'Compare Vehicles', href: '/vehicles', icon: '🚗' },
        ]
      };
    }
    if (q.includes('bali') || q.includes('indonesia')) {
      return {
        content: "Bali is a paradise! Here's what you need to know:\n\n**📅 Best Time:** April–October (dry season)\n**💰 Budget:** ₹60k–₹1.5L for 7 days depending on style\n**🏨 Stay:** Seminyak (nightlife), Ubud (culture), Nusa Dua (luxury)\n**🍜 Must Eat:** Nasi Goreng, Babi Guling, fresh seafood at Jimbaran\n**🎯 Don't Miss:** Tanah Lot sunset, Tegallalang rice terraces, Uluwatu temple\n\nWant me to generate a full itinerary for Bali?",
        actions: [
          { label: 'Plan Bali Trip', href: '/planner', icon: '✈️' },
          { label: 'Hotels in Bali', href: '/hotels?dest=Bali', icon: '🏨' },
        ]
      };
    }
    if (q.includes('plan') || q.includes('itinerary') || q.includes('trip')) {
      return {
        content: "I'd love to plan your trip! To create a personalized itinerary, I need:\n\n1. 📍 **Destination** — Where are you going?\n2. 📅 **Dates** — How many days?\n3. 👥 **Group** — Solo, couple, family?\n4. 💰 **Budget** — Total budget in your currency\n5. ❤️ **Interests** — Adventure, culture, food, beaches...?\n\nOr just use our AI Planner for a step-by-step experience!",
        actions: [
          { label: 'Open AI Planner', href: '/planner', icon: '✨' },
        ]
      };
    }
    return {
      content: "That's a great question! As your AI travel companion, I'm here to help with anything travel-related — from visa requirements and packing lists to restaurant recommendations and off-the-beaten-path destinations.\n\nCould you give me more details about your travel plans? The more specific you are, the better recommendations I can provide! 🌍",
    };
  };

  const formatContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={i} className="font-bold text-white mb-1">{line.slice(2, -2)}</p>;
      }
      if (line.includes('**')) {
        const parts = line.split('**');
        return (
          <p key={i} className="mb-1">
            {parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="text-white">{part}</strong> : <span key={j}>{part}</span>)}
          </p>
        );
      }
      if (line.startsWith('•')) {
        return <p key={i} className="pl-2 mb-1">{line}</p>;
      }
      return line ? <p key={i} className="mb-1">{line}</p> : <br key={i} />;
    });
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />
      <div className="pt-16 flex flex-col flex-1 max-w-4xl mx-auto w-full px-4">
        {/* Header */}
        <div className="py-6 flex items-center gap-4 border-b border-white/[0.06]">
          <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center animate-pulse-glow">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-black text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>Roamora AI Assistant</h1>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="status-dot online" /> Online · Powered by Gemini AI
            </div>
          </div>
          <button className="ml-auto btn-ghost text-sm">
            <RefreshCw className="w-4 h-4" /> New Chat
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto py-6 space-y-6">
          {messages.map(msg => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
              {msg.role === 'ai' && (
                <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0 mt-1">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              )}
              <div className={`max-w-lg ${msg.role === 'user' ? 'order-first' : ''}`}>
                <div className={`rounded-2xl px-5 py-4 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-indigo-600/30 border border-indigo-500/20 text-slate-200 rounded-tr-sm'
                    : 'glass border border-white/[0.07] text-slate-300 rounded-tl-sm'
                }`}>
                  <div className="text-slate-400">
                    {formatContent(msg.content)}
                  </div>
                </div>

                {/* Actions */}
                {msg.actions && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {msg.actions.map(action => (
                      <Link key={action.label} href={action.href}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl glass-light border border-white/[0.08] text-xs font-medium text-slate-300 hover:text-white hover:border-indigo-500/20 transition-all">
                        <span>{action.icon}</span>
                        {action.label}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Timestamp + Controls */}
                {msg.role === 'ai' && (
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-slate-600">{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    <button className="text-slate-600 hover:text-slate-400 transition-colors"><ThumbsUp className="w-3 h-3" /></button>
                    <button className="text-slate-600 hover:text-slate-400 transition-colors"><ThumbsDown className="w-3 h-3" /></button>
                    <button className="text-slate-600 hover:text-slate-400 transition-colors"><Copy className="w-3 h-3" /></button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {loading && (
            <div className="flex gap-3 justify-start animate-fade-in">
              <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="glass rounded-2xl rounded-tl-sm px-5 py-4 border border-white/[0.07]">
                <div className="flex gap-1.5 items-center">
                  {[0, 150, 300].map(delay => (
                    <div key={delay} className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: `${delay}ms` }} />
                  ))}
                  <span className="text-xs text-slate-500 ml-2">Thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick Prompts */}
        {messages.length <= 1 && (
          <div className="pb-4">
            <p className="text-xs text-slate-500 mb-3 text-center">Try asking...</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {QUICK_PROMPTS.map(p => (
                <button key={p.label} onClick={() => sendMessage(p.label)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass-light border border-white/[0.08] text-sm text-slate-400 hover:text-white hover:border-indigo-500/20 transition-all">
                  <span>{p.icon}</span>
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="py-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-3 glass rounded-2xl border border-white/[0.08] px-4 py-3">
            <button className="text-slate-500 hover:text-slate-300 transition-colors">
              <Paperclip className="w-4 h-4" />
            </button>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage(input))}
              placeholder="Ask me anything about travel..."
              className="flex-1 bg-transparent outline-none text-sm text-slate-200 placeholder-slate-600"
            />
            <button className="text-slate-500 hover:text-slate-300 transition-colors">
              <Mic className="w-4 h-4" />
            </button>
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
              className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:scale-105"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
          <p className="text-center text-xs text-slate-600 mt-2">AI responses are for reference · Always verify travel information independently</p>
        </div>
      </div>
    </div>
  );
}
