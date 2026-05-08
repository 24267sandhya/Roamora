'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles, MapPin, Calendar, Users, Wallet, Globe, Plane,
  ChevronRight, Plus, Minus, ArrowRight, Loader2, Check,
  Hotel, Car, Clock, Star
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const INTERESTS = [
  { label: 'Adventure', emoji: '🧗' },
  { label: 'Culture', emoji: '🏛️' },
  { label: 'Food & Dining', emoji: '🍜' },
  { label: 'Beaches', emoji: '🏖️' },
  { label: 'Wildlife', emoji: '🦁' },
  { label: 'Photography', emoji: '📸' },
  { label: 'History', emoji: '🏰' },
  { label: 'Nightlife', emoji: '🎶' },
  { label: 'Shopping', emoji: '🛍️' },
  { label: 'Wellness & Spa', emoji: '💆' },
  { label: 'Trekking', emoji: '🥾' },
  { label: 'Road Trips', emoji: '🚗' },
];

const STYLES = [
  { label: 'Budget Backpacker', icon: '🎒', desc: 'Hostels, street food, local transport' },
  { label: 'Comfort Traveler', icon: '🏨', desc: '3-4 star hotels, mix of experiences' },
  { label: 'Luxury Explorer', icon: '✨', desc: '5-star hotels, premium experiences' },
  { label: 'Adventure Seeker', icon: '🏔️', desc: 'Camping, extreme activities' },
  { label: 'Cultural Immersive', icon: '🎭', desc: 'Local homestays, traditions' },
];

const CURRENCIES = ['INR ₹', 'USD $', 'EUR €', 'GBP £', 'JPY ¥', 'AED د.إ'];

type ItineraryDay = {
  day: number;
  date: string;
  theme: string;
  activities: string[];
  accommodation: string;
  estimatedCost: string;
};

type TripResult = {
  tripId: string;
  destination: string;
  totalDays: number;
  totalEstimatedCost: string;
  itinerary: ItineraryDay[];
  message: string;
};

export default function PlannerPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TripResult | null>(null);
  const [error, setError] = useState('');

  // Form state
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState('');
  const [currency, setCurrency] = useState('INR ₹');
  const [travelers, setTravelers] = useState(2);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [travelStyle, setTravelStyle] = useState('');

  const toggleInterest = (label: string) => {
    setSelectedInterests(prev =>
      prev.includes(label) ? prev.filter(i => i !== label) : [...prev, label]
    );
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:8080/api/generate-trip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination,
          startDate,
          endDate,
          budget: `${budget} ${currency.split(' ')[0]}`,
          interests: selectedInterests,
          travelStyle: travelStyle || 'Comfort Traveler',
          userCurrency: currency.split(' ')[0],
        }),
      });
      if (!res.ok) throw new Error('Failed to generate trip');
      const data: TripResult = await res.json();
      setResult(data);
      setStep(3);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-20 flex-1">
        {/* Hero */}
        <div className="text-center py-12 px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light border border-indigo-500/20 text-sm text-indigo-300 mb-6">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            AI-Powered Trip Planner
          </div>
          <h1 className="text-4xl sm:text-5xl font-black mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Plan Your <span className="gradient-text">Dream Trip</span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">Describe your trip and let Gemini AI craft a personalized day-by-day itinerary in seconds.</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 px-6 mb-10">
          {[{ n: 1, label: 'Trip Details' }, { n: 2, label: 'Preferences' }, { n: 3, label: 'Your Itinerary' }].map(({ n, label }) => (
            <div key={n} className="flex items-center gap-3">
              <div className={`flex items-center gap-2 transition-all`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step > n ? 'gradient-primary text-white' : step === n ? 'bg-indigo-600/30 border-2 border-indigo-500 text-indigo-300' : 'glass border border-white/[0.08] text-slate-500'
                }`}>
                  {step > n ? <Check className="w-4 h-4" /> : n}
                </div>
                <span className={`text-sm font-medium hidden sm:block ${step >= n ? 'text-white' : 'text-slate-500'}`}>{label}</span>
              </div>
              {n < 3 && <ChevronRight className="w-4 h-4 text-slate-600" />}
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto px-6 pb-20">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="glass-card p-8 animate-fade-in">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Globe className="w-5 h-5 text-indigo-400" /> Where are you headed?
              </h2>
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Destination *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      value={destination}
                      onChange={e => setDestination(e.target.value)}
                      placeholder="e.g. Bali, Indonesia · Rajasthan, India · Paris, France"
                      className="input-field pl-10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-300 mb-2 block">Start Date *</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="input-field pl-10" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-300 mb-2 block">End Date *</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="input-field pl-10" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Number of Travelers</label>
                  <div className="flex items-center gap-4">
                    <button onClick={() => setTravelers(t => Math.max(1, t - 1))} className="w-10 h-10 rounded-xl glass border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white transition-all">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-2xl font-black text-white w-8 text-center">{travelers}</span>
                    <button onClick={() => setTravelers(t => t + 1)} className="w-10 h-10 rounded-xl glass border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white transition-all">
                      <Plus className="w-4 h-4" />
                    </button>
                    <span className="text-slate-500 text-sm ml-2">{travelers === 1 ? 'Solo Travel' : travelers === 2 ? 'Couple' : `Group of ${travelers}`}</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Budget & Currency</label>
                  <div className="flex gap-3">
                    <select value={currency} onChange={e => setCurrency(e.target.value)} className="input-field w-36 text-sm">
                      {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <div className="relative flex-1">
                      <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input value={budget} onChange={e => setBudget(e.target.value)} placeholder="Total budget (e.g. 150000)" type="number" className="input-field pl-10 flex-1" />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  disabled={!destination || !startDate || !endDate}
                  className="btn-primary w-full justify-center py-3.5 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="glass-card p-8 animate-fade-in">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400" /> Personalize Your Experience
              </h2>

              {/* Interests */}
              <div className="mb-8">
                <label className="text-sm font-medium text-slate-300 mb-4 block">Your Interests (pick all that apply)</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {INTERESTS.map(({ label, emoji }) => (
                    <button
                      key={label}
                      onClick={() => toggleInterest(label)}
                      className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all ${
                        selectedInterests.includes(label)
                          ? 'border-indigo-500/40 bg-indigo-500/15 text-indigo-300'
                          : 'glass-light border-white/[0.08] text-slate-400 hover:text-white hover:border-white/20'
                      }`}
                    >
                      <span className="text-lg">{emoji}</span>
                      {label}
                      {selectedInterests.includes(label) && <Check className="w-3.5 h-3.5 ml-auto" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Travel Style */}
              <div className="mb-8">
                <label className="text-sm font-medium text-slate-300 mb-4 block">Travel Style</label>
                <div className="space-y-3">
                  {STYLES.map(({ label, icon, desc }) => (
                    <button
                      key={label}
                      onClick={() => setTravelStyle(label)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${
                        travelStyle === label
                          ? 'border-indigo-500/40 bg-indigo-500/10'
                          : 'glass-light border-white/[0.08] hover:border-white/20'
                      }`}
                    >
                      <span className="text-2xl">{icon}</span>
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-white">{label}</p>
                        <p className="text-xs text-slate-500">{desc}</p>
                      </div>
                      {travelStyle === label && <Check className="w-5 h-5 text-indigo-400" />}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm mb-6">
                  ⚠️ {error}
                </div>
              )}

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="btn-secondary py-3.5 px-6">← Back</button>
                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="btn-primary flex-1 justify-center py-3.5"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      AI is crafting your itinerary...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Generate My Itinerary
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 — Result */}
          {step === 3 && result && (
            <div className="animate-fade-in space-y-6">
              {/* Header Card */}
              <div className="glass-card p-8 border-indigo-500/20">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-5 h-5 text-indigo-400" />
                      <span className="text-sm text-indigo-300 font-medium">AI Itinerary Generated</span>
                    </div>
                    <h2 className="text-2xl font-black text-white mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {result.destination}
                    </h2>
                    <p className="text-slate-400 text-sm italic">"{result.message}"</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-xs text-slate-500">Total Estimated</p>
                    <p className="text-2xl font-black gradient-text">{result.totalEstimatedCost}</p>
                    <p className="text-xs text-slate-500">{result.totalDays} days</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link href="/hotels" className="btn-primary py-2 px-5 text-sm">
                    <Hotel className="w-4 h-4" /> Book Hotels
                  </Link>
                  <Link href="/vehicles" className="btn-secondary py-2 px-5 text-sm">
                    <Car className="w-4 h-4" /> Rent Vehicles
                  </Link>
                  <button onClick={() => { setStep(1); setResult(null); }} className="btn-ghost py-2 px-5 text-sm">
                    Replan ↺
                  </button>
                </div>
              </div>

              {/* Day-by-Day */}
              <div className="space-y-4">
                {result.itinerary.map((day, i) => (
                  <div key={day.day} className={`glass-card p-6 animate-fade-in`} style={{ animationDelay: `${i * 0.08}s` }}>
                    <div className="flex items-start gap-4">
                      {/* Day badge */}
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white font-black text-lg">
                        {day.day}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div>
                            <h3 className="font-bold text-white">{day.theme}</h3>
                            <p className="text-xs text-slate-500">{day.date}</p>
                          </div>
                          <span className="badge badge-indigo text-xs flex-shrink-0">{day.estimatedCost}</span>
                        </div>

                        {/* Activities */}
                        <div className="space-y-1.5 mb-3">
                          {day.activities.map((act, j) => (
                            <div key={j} className="flex items-start gap-2 text-sm text-slate-300">
                              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 flex-shrink-0" />
                              {act}
                            </div>
                          ))}
                        </div>

                        {/* Accommodation */}
                        <div className="flex items-center gap-2 p-3 rounded-lg glass-light border border-white/[0.05]">
                          <Hotel className="w-3.5 h-3.5 text-violet-400 flex-shrink-0" />
                          <span className="text-xs text-slate-400">{day.accommodation}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={() => { setStep(1); setResult(null); }} className="w-full btn-secondary py-3 justify-center">
                Plan Another Trip ↺
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
