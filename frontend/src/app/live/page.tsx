'use client';
import { useState, useEffect } from 'react';
import {
  Zap, MapPin, Cloud, Thermometer, Wind, AlertTriangle, CheckCircle,
  Clock, RefreshCw, Hotel, Car, Plane, Navigation, TrendingUp,
  Wallet, Battery, Signal, Wifi
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

const ROUTE_POINTS = [
  { name: 'Chandigarh Airport', type: 'start', time: '06:00', status: 'completed', icon: Plane },
  { name: 'Sundernagar', type: 'stop', time: '09:30', status: 'completed', icon: Car },
  { name: 'Kullu', type: 'stop', time: '11:45', status: 'current', icon: MapPin },
  { name: 'The Himalayan Resort', type: 'hotel', time: '14:00', status: 'upcoming', icon: Hotel },
  { name: 'Solang Valley', type: 'activity', time: '16:00', status: 'upcoming', icon: Navigation },
  { name: 'Manali Centre', type: 'end', time: '19:00', status: 'upcoming', icon: MapPin },
];

const ALERTS_LIVE = [
  { type: 'warning', title: 'Road Closure Alert', msg: 'Rohtang Pass closed due to snowfall. Alternate: Hampta Pass recommended.', time: '15 min ago', icon: AlertTriangle, color: 'amber' },
  { type: 'weather', title: 'Weather Update', msg: 'Heavy rain expected in Manali 3:00 PM–5:00 PM. Plan indoor activities.', time: '1h ago', icon: Cloud, color: 'indigo' },
  { type: 'success', title: 'Hotel Check-in Ready', msg: 'The Himalayan Resort has your room ready. Early check-in confirmed at 12 PM.', time: '2h ago', icon: CheckCircle, color: 'emerald' },
];

const WEATHER_POINTS = [
  { city: 'Kullu', temp: '18°C', condition: '⛅ Partly Cloudy', humidity: '72%', wind: '12 km/h' },
  { city: 'Manali', temp: '12°C', condition: '🌧️ Light Rain', humidity: '85%', wind: '18 km/h' },
  { city: 'Rohtang', temp: '2°C', condition: '❄️ Snowfall', humidity: '90%', wind: '35 km/h' },
];

export default function LiveDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [aiReplanning, setAiReplanning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const triggerReplan = async () => {
    setAiReplanning(true);
    await new Promise(r => setTimeout(r, 2500));
    setAiReplanning(false);
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />
      <div className="pt-16 max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="flex items-center gap-1.5">
                <span className="status-dot online" />
                <span className="text-xs text-emerald-400 font-medium">Live Tracking Active</span>
              </div>
              <span className="text-xs text-slate-600">•</span>
              <span className="text-xs text-slate-500">{currentTime.toLocaleTimeString()}</span>
            </div>
            <h1 className="text-2xl font-black text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
              🗺️ Manali Road Trip — <span className="gradient-text">Day 1</span>
            </h1>
            <p className="text-slate-400 text-sm">Chandigarh → Manali via NH-3 · 315 km · ETA 7:00 PM</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={triggerReplan}
              disabled={aiReplanning}
              className="btn-primary text-sm py-2"
            >
              {aiReplanning ? (
                <><RefreshCw className="w-4 h-4 animate-spin" /> AI Replanning...</>
              ) : (
                <><Zap className="w-4 h-4" /> AI Replan</>
              )}
            </button>
          </div>
        </div>

        {/* Status Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Distance Covered', value: '178 km', total: '315 km', pct: 56, color: 'indigo', icon: Navigation },
            { label: 'Budget Spent', value: '₹12,400', total: '₹45,000', pct: 27, color: 'emerald', icon: Wallet },
            { label: 'Time Elapsed', value: '4h 30m', total: '13h trip', pct: 35, color: 'violet', icon: Clock },
            { label: 'Trip Score', value: '9.2/10', total: 'AI Rating', pct: 92, color: 'amber', icon: TrendingUp },
          ].map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="glass-card p-5">
                <div className="flex items-center justify-between mb-3">
                  <Icon className={`w-4 h-4 text-${s.color}-400`} />
                  <span className={`badge badge-${s.color} text-xs`}>{s.pct}%</span>
                </div>
                <p className="text-xl font-black text-white">{s.value}</p>
                <p className="text-xs text-slate-500">{s.label}</p>
                <p className="text-xs text-slate-600 mt-0.5">of {s.total}</p>
                <div className="mt-3 h-1.5 rounded-full bg-white/[0.05]">
                  <div className={`h-1.5 rounded-full bg-${s.color}-500 transition-all duration-1000`} style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Route Timeline */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6">
              <h2 className="font-bold text-white mb-5 flex items-center gap-2">
                <Navigation className="w-4 h-4 text-indigo-400" /> Live Route
              </h2>
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gradient-to-b from-indigo-500 via-indigo-500/50 to-white/[0.05]" />

                <div className="space-y-5">
                  {ROUTE_POINTS.map((point, i) => {
                    const Icon = point.icon;
                    return (
                      <div key={i} className="flex items-start gap-4 relative">
                        <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all ${
                          point.status === 'completed' ? 'bg-emerald-500 border-emerald-500' :
                          point.status === 'current' ? 'bg-indigo-500 border-indigo-400 animate-pulse-glow' :
                          'glass border-white/[0.15]'
                        }`}>
                          <Icon className={`w-3.5 h-3.5 ${
                            point.status === 'completed' ? 'text-white' :
                            point.status === 'current' ? 'text-white' :
                            'text-slate-500'
                          }`} />
                        </div>
                        <div className="flex-1 pb-1">
                          <div className="flex items-center justify-between">
                            <p className={`text-sm font-semibold ${
                              point.status === 'current' ? 'text-indigo-300' :
                              point.status === 'completed' ? 'text-slate-400 line-through' :
                              'text-white'
                            }`}>{point.name}</p>
                            <span className="text-xs text-slate-600">{point.time}</span>
                          </div>
                          <p className={`text-xs mt-0.5 ${
                            point.status === 'current' ? 'text-indigo-400 font-medium' :
                            point.status === 'completed' ? 'text-slate-600' :
                            'text-slate-500'
                          }`}>
                            {point.status === 'current' ? '📍 You are here' :
                             point.status === 'completed' ? '✓ Passed' :
                             `${point.type === 'hotel' ? '🏨' : point.type === 'activity' ? '🎯' : '📌'} ${point.type}`}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Live Connectivity */}
            <div className="glass-card p-5 mt-4">
              <h3 className="text-sm font-semibold text-white mb-4">Live Status</h3>
              <div className="space-y-3">
                {[
                  { label: 'Network', value: '4G LTE', icon: Signal, good: true },
                  { label: 'GPS Accuracy', value: '±3 meters', icon: Navigation, good: true },
                  { label: 'Weather Feed', value: 'Connected', icon: Cloud, good: true },
                  { label: 'Traffic', value: 'Moderate', icon: TrendingUp, good: false },
                ].map(s => {
                  const Icon = s.icon;
                  return (
                    <div key={s.label} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Icon className="w-3.5 h-3.5" />
                        {s.label}
                      </div>
                      <span className={`text-xs font-medium ${s.good ? 'text-emerald-400' : 'text-amber-400'}`}>{s.value}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Map + Alerts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map Placeholder */}
            <div className="glass-card p-0 overflow-hidden" style={{ height: '300px' }}>
              <div className="relative w-full h-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, rgba(8,8,24,0.95) 0%, rgba(15,15,35,0.9) 100%)' }}>
                {/* Fake Map Grid */}
                <div className="absolute inset-0 opacity-20"
                  style={{ backgroundImage: 'linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                {/* Fake Route Line */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M10,80 Q25,60 40,55 Q55,50 65,40 Q75,30 90,20" stroke="#6366f1" strokeWidth="0.5" fill="none" strokeDasharray="2,1" />
                  <circle cx="65" cy="40" r="2" fill="#6366f1" className="animate-ping" />
                  <circle cx="65" cy="40" r="1.5" fill="#818cf8" />
                </svg>
                <div className="text-center z-10">
                  <div className="text-5xl mb-3">🗺️</div>
                  <p className="text-slate-400 text-sm font-medium">Live Map View</p>
                  <p className="text-xs text-slate-600 mt-1">Currently near Kullu · NH-3</p>
                  <div className="mt-3 flex gap-2 justify-center">
                    <span className="badge badge-indigo text-xs">📍 Kullu</span>
                    <span className="badge badge-emerald text-xs">🏔️ Manali 137km</span>
                    <span className="badge badge-amber text-xs">⚠️ Road Alert</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Weather Strip */}
            <div>
              <h2 className="font-bold text-white mb-4 flex items-center gap-2">
                <Cloud className="w-4 h-4 text-cyan-400" /> Weather Along Route
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {WEATHER_POINTS.map(w => (
                  <div key={w.city} className="glass-card p-4 text-center">
                    <p className="font-bold text-sm text-white mb-1">{w.city}</p>
                    <p className="text-2xl font-black gradient-text mb-1">{w.temp}</p>
                    <p className="text-xs text-slate-400 mb-3">{w.condition}</p>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>💧 {w.humidity}</span>
                        <span>💨 {w.wind}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Alerts */}
            <div>
              <h2 className="font-bold text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" /> Live Alerts
              </h2>
              <div className="space-y-3">
                {ALERTS_LIVE.map((alert, i) => {
                  const Icon = alert.icon;
                  return (
                    <div key={i} className={`glass-card p-4 border-l-2 border-${alert.color}-500`}>
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-${alert.color}-500/15`}>
                          <Icon className={`w-4 h-4 text-${alert.color}-400`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-semibold text-white">{alert.title}</p>
                            <span className="text-xs text-slate-600">{alert.time}</span>
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed">{alert.msg}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AI Replan Result */}
            {aiReplanning && (
              <div className="glass-card p-6 border-indigo-500/20 animate-pulse">
                <div className="flex items-center gap-3">
                  <RefreshCw className="w-5 h-5 text-indigo-400 animate-spin" />
                  <div>
                    <p className="text-sm font-semibold text-white">AI is optimizing your route...</p>
                    <p className="text-xs text-slate-500 mt-0.5">Analyzing weather, traffic, and hotel availability</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
