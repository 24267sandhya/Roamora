'use client';
import { useState } from 'react';
import {
  Users, Plus, Vote, MessageSquare, Wallet, MapPin, Check,
  ChevronRight, ThumbsUp, ThumbsDown, Crown, Hash, Globe, Calendar
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

const MEMBERS = [
  { name: 'Arjun (You)', avatar: '🧑‍🦱', role: 'host', status: 'online', votes: { 'Bali': true, 'Paris': false, 'Goa': true } },
  { name: 'Priya', avatar: '👩', role: 'member', status: 'online', votes: { 'Bali': true, 'Paris': true, 'Goa': false } },
  { name: 'Rahul', avatar: '👨', role: 'member', status: 'away', votes: { 'Bali': false, 'Paris': true, 'Goa': true } },
  { name: 'Sneha', avatar: '👩‍🦱', role: 'member', status: 'offline', votes: { 'Bali': true, 'Paris': false, 'Goa': false } },
];

const DESTINATIONS = [
  { name: 'Bali, Indonesia', emoji: '🏝️', votes: 3, total: 4, budget: '₹1.2L/person', duration: '7 days', vibe: 'Beach + Culture' },
  { name: 'Paris, France', emoji: '🗼', votes: 2, total: 4, budget: '₹2.5L/person', duration: '5 days', vibe: 'Romantic + Art' },
  { name: 'Goa, India', emoji: '🏖️', votes: 2, total: 4, budget: '₹35K/person', duration: '4 days', vibe: 'Party + Beach' },
];

const ACTIVITIES = [
  { name: 'Scuba Diving at Nusa Penida', votes: 3, max: 4, myVote: true },
  { name: 'Ubud Cultural Tour', votes: 4, max: 4, myVote: true },
  { name: 'Cooking Class', votes: 2, max: 4, myVote: false },
  { name: 'Sunrise at Mount Batur', votes: 3, max: 4, myVote: true },
];

const BUDGET = [
  { category: 'Flights', amount: 35000, status: 'agreed' },
  { category: 'Hotels (7 nights)', amount: 52000, status: 'agreed' },
  { category: 'Activities', amount: 18000, status: 'voting' },
  { category: 'Food & Drinks', amount: 15000, status: 'agreed' },
  { category: 'Transport', amount: 8000, status: 'pending' },
];

export default function GroupPlanningPage() {
  const [activeTab, setActiveTab] = useState('destinations');
  const [roomCode] = useState('ROAM-7K4X');
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { id: 'destinations', label: 'Vote Destination', icon: Globe },
    { id: 'activities', label: 'Vote Activities', icon: Vote },
    { id: 'budget', label: 'Shared Budget', icon: Wallet },
    { id: 'chat', label: 'Group Chat', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />
      <div className="pt-16 max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-indigo-400" />
              <span className="text-xs text-indigo-300 font-medium">Group Planning Room</span>
            </div>
            <h1 className="text-2xl font-black text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>🌍 Squad Vacay 2025</h1>
            <p className="text-slate-400 text-sm mt-1">4 members · Planning for Jul–Aug 2025</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="glass-card p-3 flex items-center gap-2">
              <Hash className="w-4 h-4 text-slate-500" />
              <span className="text-sm font-mono text-slate-300">{roomCode}</span>
              <button onClick={copyCode} className="text-indigo-400 hover:text-indigo-300 transition-colors text-xs font-medium ml-2">
                {copied ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
            <button className="btn-primary text-sm py-2">
              <Plus className="w-4 h-4" /> Invite
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Members Sidebar */}
          <div className="lg:col-span-1 space-y-5">
            <div className="glass-card p-5">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-400" /> Members
              </h3>
              <div className="space-y-3">
                {MEMBERS.map(m => (
                  <div key={m.name} className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-9 h-9 rounded-full glass flex items-center justify-center text-lg">{m.avatar}</div>
                      <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-slate-900 ${m.status === 'online' ? 'bg-emerald-500' : m.status === 'away' ? 'bg-amber-500' : 'bg-slate-600'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-white truncate">{m.name}</p>
                      <p className="text-xs text-slate-500 capitalize">{m.role}</p>
                    </div>
                    {m.role === 'host' && <Crown className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />}
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 btn-ghost text-xs py-2 border border-dashed border-white/[0.1] rounded-xl justify-center">
                <Plus className="w-3.5 h-3.5" /> Add Member
              </button>
            </div>

            {/* Trip Dates */}
            <div className="glass-card p-5">
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-violet-400" /> Trip Dates
              </h3>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Proposed Dates</p>
                  <p className="text-sm text-white font-medium">Jul 15 – Jul 22, 2025</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Group Size</p>
                  <p className="text-sm text-white font-medium">4 Adults</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tabs */}
            <div className="flex gap-1 mb-6 glass rounded-xl p-1 border border-white/[0.06]">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab.id ? 'gradient-primary text-white shadow-lg' : 'text-slate-500 hover:text-white'
                    }`}>
                    <Icon className="w-3.5 h-3.5" />
                    <span className="hidden sm:block">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Destinations Voting */}
            {activeTab === 'destinations' && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-slate-400">Vote for your favorite destination. Top pick will be finalized.</p>
                </div>
                {DESTINATIONS.map((dest, i) => (
                  <div key={dest.name} className={`glass-card p-5 ${i === 0 ? 'border-indigo-500/30' : ''}`}>
                    {i === 0 && <div className="absolute top-3 right-3"><span className="badge badge-indigo text-xs">🏆 Leading</span></div>}
                    <div className="flex items-start gap-4 relative">
                      <div className="text-4xl">{dest.emoji}</div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-bold text-white">{dest.name}</h3>
                            <p className="text-xs text-slate-500">{dest.duration} · {dest.vibe}</p>
                          </div>
                          <p className="text-sm font-bold text-emerald-400">{dest.budget}</p>
                        </div>

                        {/* Vote Progress */}
                        <div className="mb-3">
                          <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                            <span>{dest.votes}/{dest.total} votes</span>
                            <span>{Math.round(dest.votes/dest.total*100)}%</span>
                          </div>
                          <div className="h-2 rounded-full bg-white/[0.05]">
                            <div className="h-2 rounded-full gradient-primary transition-all" style={{ width: `${dest.votes/dest.total*100}%` }} />
                          </div>
                        </div>

                        {/* Who voted */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs text-slate-500">Voted by:</span>
                          <div className="flex gap-1">
                            {MEMBERS.map(m => {
                              const voted = m.votes[dest.name as keyof typeof m.votes];
                              return (
                                <div key={m.name} title={`${m.name}: ${voted ? '✓' : '✗'}`}
                                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border ${voted ? 'border-indigo-500/40 bg-indigo-500/20' : 'border-white/[0.06] bg-white/[0.03] opacity-40'}`}>
                                  {m.avatar}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <button className="btn-primary py-2 px-4 text-xs">
                            <ThumbsUp className="w-3.5 h-3.5" /> Vote
                          </button>
                          <button className="btn-secondary py-2 px-4 text-xs">
                            <ThumbsDown className="w-3.5 h-3.5" /> Skip
                          </button>
                          <Link href="/hotels" className="btn-ghost py-2 px-4 text-xs ml-auto">
                            View Hotels <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Activities Voting */}
            {activeTab === 'activities' && (
              <div className="space-y-4 animate-fade-in">
                {ACTIVITIES.map(act => (
                  <div key={act.name} className="glass-card p-5">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-2">{act.name}</h3>
                        <div className="h-2 rounded-full bg-white/[0.05] mb-1.5">
                          <div className="h-2 rounded-full bg-violet-500 transition-all" style={{ width: `${act.votes/act.max*100}%` }} />
                        </div>
                        <p className="text-xs text-slate-500">{act.votes}/{act.max} members interested</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${act.myVote ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'glass-light border border-white/[0.08] text-slate-400 hover:text-white'}`}>
                          <ThumbsUp className="w-3.5 h-3.5" /> {act.myVote ? 'Voted' : 'Vote'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <button className="w-full btn-secondary py-3 text-sm justify-center">
                  <Plus className="w-4 h-4" /> Suggest an Activity
                </button>
              </div>
            )}

            {/* Shared Budget */}
            {activeTab === 'budget' && (
              <div className="animate-fade-in space-y-4">
                <div className="glass-card p-6 mb-2">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-white">Group Budget Summary</h3>
                    <span className="badge badge-indigo">Per Person</span>
                  </div>
                  <div className="text-4xl font-black gradient-text mb-1">
                    ₹{BUDGET.reduce((a, b) => a + b.amount, 0).toLocaleString()}
                  </div>
                  <p className="text-slate-500 text-sm">estimated per person · 7 days Bali</p>
                </div>

                {BUDGET.map(b => (
                  <div key={b.category} className="glass-card p-5 flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-sm text-white">{b.category}</h4>
                        <span className={`badge text-xs ${
                          b.status === 'agreed' ? 'badge-emerald' :
                          b.status === 'voting' ? 'badge-amber' : 'badge-rose'
                        }`}>{b.status}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-black text-white">₹{b.amount.toLocaleString()}</p>
                    </div>
                    {b.status !== 'agreed' && (
                      <div className="flex gap-2 ml-3">
                        <button className="btn-primary py-1.5 px-3 text-xs"><Check className="w-3 h-3" /></button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Group Chat */}
            {activeTab === 'chat' && (
              <div className="glass-card p-6 animate-fade-in">
                <div className="space-y-4 mb-4 max-h-80 overflow-y-auto">
                  {[
                    { from: 'Priya', avatar: '👩', msg: 'I think Bali is the best choice! Great beaches and food 🏝️', time: '2:30 PM' },
                    { from: 'Rahul', avatar: '👨', msg: 'Paris has amazing art and food. I vote Paris! 🗼', time: '2:32 PM' },
                    { from: 'Arjun (You)', avatar: '🧑‍🦱', msg: 'Bali is more affordable for our budget. Let\'s vote!', time: '2:35 PM', self: true },
                    { from: 'Sneha', avatar: '👩‍🦱', msg: 'Bali +1! Also voted for the scuba diving activity 🤿', time: '2:40 PM' },
                  ].map((chat, i) => (
                    <div key={i} className={`flex gap-3 ${(chat as {self?: boolean}).self ? 'justify-end' : 'justify-start'}`}>
                      {!(chat as {self?: boolean}).self && (
                        <div className="w-8 h-8 rounded-full glass flex items-center justify-center text-lg flex-shrink-0">{chat.avatar}</div>
                      )}
                      <div className={`max-w-xs ${(chat as {self?: boolean}).self ? '' : ''}`}>
                        {!(chat as {self?: boolean}).self && <p className="text-xs text-slate-500 mb-1">{chat.from}</p>}
                        <div className={`px-4 py-3 rounded-2xl text-sm ${(chat as {self?: boolean}).self ? 'bg-indigo-600/30 border border-indigo-500/20 text-slate-200 rounded-tr-sm' : 'glass border border-white/[0.07] text-slate-300 rounded-tl-sm'}`}>
                          {chat.msg}
                        </div>
                        <p className="text-xs text-slate-600 mt-1">{chat.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 border-t border-white/[0.06] pt-4">
                  <input className="input-field flex-1 py-2.5 text-sm" placeholder="Type a message..." />
                  <button className="btn-primary py-2.5 px-4 text-sm">Send</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
