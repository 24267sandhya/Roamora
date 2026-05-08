'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  Sparkles, Hotel, Car, Map, Zap, Shield, Globe, ArrowRight,
  Star, Check, ChevronRight, Play, TrendingUp, Clock, Users,
  Brain, Route, Wallet, Bell, MessageSquare, Compass
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const features = [
  { icon: Brain, title: 'AI Itinerary Engine', desc: 'Gemini AI crafts personalized day-by-day travel plans based on your style, budget, and interests.' , color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
  { icon: Hotel, title: 'Smart Hotel Booking', desc: 'Discover and book hotels with AI-powered recommendations, real reviews, and instant confirmation.', color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
  { icon: Car, title: 'Vehicle Rentals', desc: 'Compare EVs, SUVs, bikes, and cabs. Get fuel-efficiency estimates and route-aware suggestions.', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  { icon: Map, title: 'Live Maps & Routes', desc: 'Interactive maps with animated routes, traffic overlays, weather, and real-time updates.', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { icon: Zap, title: 'Real-Time Dashboard', desc: 'Monitor your trip live — weather alerts, route optimization, AI replanning on the fly.', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  { icon: Users, title: 'Group Planning', desc: 'Plan trips collaboratively. Vote on activities, balance preferences, and split costs together.', color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
];

const stats = [
  { value: '2M+', label: 'Trips Planned', icon: Route },
  { value: '50K+', label: 'Hotels Listed', icon: Hotel },
  { value: '98%', label: 'Satisfaction Rate', icon: Star },
  { value: '180+', label: 'Countries', icon: Globe },
];

const testimonials = [
  { name: 'Arjun Sharma', role: 'Adventure Traveler', avatar: '🧑‍🦱', rating: 5, text: 'Roamora planned my entire Ladakh road trip in 3 minutes. The AI suggested routes I would never have found myself. Absolutely mind-blowing!' },
  { name: 'Priya Menon', role: 'Family Vacation Planner', avatar: '👩', rating: 5, text: 'Booked hotels for 6 people across 4 cities — all within budget. The group planning feature is a game changer for families.' },
  { name: 'Marcus Chen', role: 'Business Traveler', avatar: '👨‍💼', rating: 5, text: 'The live travel dashboard kept me updated on every flight, hotel check-in, and cab booking in real time. This is the future of travel.' },
];

const pricingPlans = [
  { name: 'Explorer', price: '₹0', period: 'Forever free', features: ['5 AI itineraries/month', 'Basic hotel search', 'Community support'], cta: 'Get Started', popular: false },
  { name: 'Voyager', price: '₹599', period: '/month', features: ['Unlimited AI itineraries', 'Hotel & vehicle booking', 'Group planning (10 members)', 'Real-time dashboard', 'Priority support'], cta: 'Start Free Trial', popular: true },
  { name: 'Enterprise', price: 'Custom', period: 'pricing', features: ['Everything in Voyager', 'API access', 'Custom AI training', 'Dedicated account manager', 'White-label option'], cta: 'Contact Sales', popular: false },
];

const destinations = [
  { name: 'Bali, Indonesia', tag: 'Trending', img: '🏝️', hotels: 234, from: '₹8,500' },
  { name: 'Ladakh, India', tag: 'Adventure', img: '🏔️', hotels: 89, from: '₹4,200' },
  { name: 'Paris, France', tag: 'Romantic', img: '🗼', hotels: 1240, from: '₹22,000' },
  { name: 'Tokyo, Japan', tag: 'Culture', img: '🗾', hotels: 890, from: '₹19,500' },
  { name: 'Maldives', tag: 'Luxury', img: '🌊', hotels: 156, from: '₹45,000' },
  { name: 'New York, USA', tag: 'City Break', img: '🗽', hotels: 2100, from: '₹28,000' },
];

export default function LandingPage() {
  const [aiQuery, setAiQuery] = useState('');
  const [demoText, setDemoText] = useState('');
  const fullDemo = 'Plan a 7-day luxury trip to Bali for 2 people under ₹1.5L with beach, culture, and spa activities...';

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= fullDemo.length) {
        setDemoText(fullDemo.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 40);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 overflow-hidden">
        {/* Animated background orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-20 animate-float" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)', animationDuration: '6s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-15 animate-float" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)', animationDuration: '8s', animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full opacity-10 animate-float" style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.3) 0%, transparent 70%)', animationDuration: '5s', animationDelay: '2s', transform: 'translate(-50%, -50%)' }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light border border-indigo-500/20 text-sm text-indigo-300 mb-8 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Powered by Gemini AI — The Future of Travel is Here
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black mb-6 animate-fade-in delay-100" style={{ fontFamily: "'Outfit', sans-serif", lineHeight: '1.05' }}>
            Travel Smarter
            <br />
            <span className="gradient-text">With AI</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 animate-fade-in delay-200 leading-relaxed">
            The intelligent travel operating system that plans, books, and manages your entire journey — hotels, vehicles, itineraries, and live updates, all powered by AI.
          </p>

          {/* Hero CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in delay-300">
            <Link href="/planner" className="btn-primary text-base px-8 py-4">
              <Sparkles className="w-5 h-5" />
              Start Planning Free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/hotels" className="btn-secondary text-base px-8 py-4">
              <Play className="w-4 h-4" />
              Explore Hotels
            </Link>
          </div>

          {/* AI Demo Box */}
          <div className="glass-card p-6 max-w-2xl mx-auto animate-fade-in delay-400">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <span className="text-xs text-slate-500 font-medium">AI Planning in action</span>
              <span className="ml-auto status-dot online" />
            </div>
            <p className="text-left text-slate-300 text-sm leading-relaxed min-h-[3rem]">
              {demoText}<span className="inline-block w-0.5 h-4 bg-indigo-400 ml-0.5 animate-pulse" />
            </p>
            <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center gap-2">
              <div className="flex gap-2 flex-1">
                {['Bali', '7 Days', '₹1.5L', 'Luxury'].map(tag => (
                  <span key={tag} className="badge badge-indigo text-xs">{tag}</span>
                ))}
              </div>
              <Link href="/planner" className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors">
                Generate <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="relative z-10 mt-20 w-full max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 animate-fade-in delay-500">
          {stats.map(({ value, label, icon: Icon }) => (
            <div key={label} className="glass-card p-5 text-center">
              <Icon className="w-5 h-5 text-indigo-400 mx-auto mb-2" />
              <div className="text-2xl font-black text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>{value}</div>
              <div className="text-xs text-slate-500 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== POPULAR DESTINATIONS ===== */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="badge badge-cyan mb-4">✈️ Trending Now</span>
            <h2 className="text-4xl font-black mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>Popular Destinations</h2>
            <p className="text-slate-400">AI-curated picks based on millions of traveler preferences</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((dest, i) => (
              <Link
                key={dest.name}
                href={`/hotels?dest=${encodeURIComponent(dest.name)}`}
                className={`glass-card p-0 overflow-hidden group cursor-pointer animate-fade-in`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Image Placeholder */}
                <div className="relative h-48 flex items-center justify-center text-6xl"
                  style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.1) 100%)' }}>
                  {dest.img}
                  <div className="absolute top-3 left-3">
                    <span className="badge badge-indigo text-xs">{dest.tag}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-white group-hover:text-indigo-300 transition-colors">{dest.name}</h3>
                      <p className="text-xs text-slate-500 mt-1">{dest.hotels} hotels available</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500">From</p>
                      <p className="font-bold text-emerald-400">{dest.from}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="badge badge-indigo mb-4">⚡ Capabilities</span>
            <h2 className="text-4xl font-black mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Everything You Need to Travel <span className="gradient-text">Smarter</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">One platform replaces Airbnb, Booking.com, Google Travel, and a personal travel agent.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className={`glass-card p-6 animate-fade-in`} style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className={`w-12 h-12 rounded-xl ${f.bg} border ${f.border} flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${f.color}`} />
                  </div>
                  <h3 className="font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== AI EXPERIENCE SHOWCASE ===== */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card p-8 sm:p-12 overflow-hidden relative">
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(99,102,241,0.08) 0%, transparent 70%)' }} />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="badge badge-indigo mb-4">🤖 AI Intelligence</span>
                <h2 className="text-4xl font-black mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Ask the AI anything.<br /><span className="gradient-text">Get a complete trip.</span>
                </h2>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  Powered by Google's Gemini AI, Roamora understands your travel preferences deeply. Just describe your dream trip and get a full itinerary with hotels, activities, and budget breakdown instantly.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    'Personalized itineraries based on your style',
                    'AI-matched hotels and vehicles to your budget',
                    'Real-time replanning when things change',
                    'Multilingual support for global travel',
                  ].map(item => (
                    <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                      <div className="w-5 h-5 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-indigo-400" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/planner" className="btn-primary">
                  <Brain className="w-4 h-4" /> Try AI Planner
                </Link>
              </div>

              {/* Mock AI Interface */}
              <div className="space-y-3">
                {[
                  { role: 'user', msg: '7 days in Rajasthan, ₹80k budget, love history and food' },
                  { role: 'ai', msg: '✨ Perfect! Here\'s your royal Rajasthan itinerary:\n\n📅 Day 1-2: Jaipur — Amber Fort, City Palace, local markets\n📅 Day 3-4: Jodhpur — Mehrangarh Fort, blue city walk\n📅 Day 5-6: Jaisalmer — Desert safari, Patwon ki Haveli\n📅 Day 7: Udaipur — Lake Pichola, City Palace' },
                  { role: 'user', msg: 'Book a heritage hotel in Jaipur under ₹8k/night' },
                  { role: 'ai', msg: '🏰 Found 3 heritage hotels: Rambagh Palace (₹7,800), Samode Haveli (₹6,500), Alsisar Haveli (₹4,200). All include breakfast & cultural experience.' },
                ].map((m, i) => (
                  <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {m.role === 'ai' && (
                      <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center flex-shrink-0 mt-1">
                        <Sparkles className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                    <div className={`max-w-xs px-4 py-3 rounded-xl text-sm leading-relaxed whitespace-pre-line ${
                      m.role === 'user'
                        ? 'bg-indigo-600/30 border border-indigo-500/20 text-slate-200'
                        : 'glass text-slate-300'
                    }`}>
                      {m.msg}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="badge badge-emerald mb-4">⭐ Testimonials</span>
            <h2 className="text-4xl font-black" style={{ fontFamily: "'Outfit', sans-serif" }}>Loved by Travelers Worldwide</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={t.name} className={`glass-card p-6 animate-fade-in`} style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="stars mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="w-4 h-4 star-filled fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full glass flex items-center justify-center text-xl">{t.avatar}</div>
                  <div>
                    <p className="font-semibold text-sm text-white">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section className="py-24 px-6" id="pricing">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="badge badge-violet mb-4">💎 Pricing</span>
            <h2 className="text-4xl font-black" style={{ fontFamily: "'Outfit', sans-serif" }}>Simple, Transparent Pricing</h2>
            <p className="text-slate-400 mt-3">Start for free. Upgrade when you need more.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, i) => (
              <div key={plan.name} className={`glass-card p-8 relative ${plan.popular ? 'border-indigo-500/30 glow-indigo' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="badge gradient-primary text-white text-xs px-4 py-1.5">Most Popular</span>
                  </div>
                )}
                <h3 className="font-bold text-lg text-white mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-black gradient-text">{plan.price}</span>
                  <span className="text-slate-500 text-sm">{plan.period}</span>
                </div>
                <div className="divider my-6" />
                <ul className="space-y-3 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/auth/signup" className={`w-full text-center block py-3 rounded-xl font-semibold text-sm transition-all ${
                  plan.popular ? 'btn-primary justify-center' : 'btn-secondary justify-center'
                }`}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.12) 0%, transparent 70%)' }} />
            <div className="relative z-10">
              <div className="text-6xl mb-6">🌍</div>
              <h2 className="text-4xl font-black mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Your next adventure starts <span className="gradient-text">here</span>
              </h2>
              <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                Join 2 million+ travelers who use Roamora to discover, book, and experience the world with AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/planner" className="btn-primary text-base px-10 py-4">
                  <Sparkles className="w-5 h-5" /> Start Planning Free
                </Link>
                <Link href="/hotels" className="btn-secondary text-base px-10 py-4">
                  Browse Hotels <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
