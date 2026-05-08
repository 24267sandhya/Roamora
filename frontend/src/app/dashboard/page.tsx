'use client';
import Link from 'next/link';
import {
  Hotel, Car, MapPin, Calendar, Wallet,
  Bell, ChevronRight, Zap,
  Globe, Plus, BookMarked, CheckCircle, AlertTriangle
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';

const UPCOMING_TRIPS = [
  { id: 1, dest: 'Bali, Indonesia', emoji: '🏝️', dates: 'Jun 15 – Jun 22, 2025', status: 'Confirmed', hotels: 2, vehicles: 1, budget: '₹1,45,000', spent: '₹62,000', color: 'emerald' },
  { id: 2, dest: 'Rajasthan, India', emoji: '🏯', dates: 'Jul 8 – Jul 14, 2025', status: 'Upcoming', hotels: 3, vehicles: 1, budget: '₹80,000', spent: '₹24,000', color: 'amber' },
];

const RECENT_BOOKINGS = [
  { type: 'Hotel', name: 'The Leela Palace', details: 'New Delhi · Jun 15-17', price: '₹25,000', status: 'Confirmed', icon: Hotel, color: 'indigo' },
  { type: 'Vehicle', name: 'Mahindra Thar', details: 'Pickup: Manali · 5 days', price: '₹21,000', status: 'Confirmed', icon: Car, color: 'violet' },
  { type: 'Hotel', name: 'Zostel Bali', details: 'Seminyak · Jun 17-20', price: '₹7,200', status: 'Pending', icon: Hotel, color: 'amber' },
];

const ALERTS = [
  { type: 'info', msg: 'Your Bali trip is 7 days away. Hotel check-in reminder sent.', time: '2h ago' },
  { type: 'warning', msg: 'Weather alert: Heavy monsoon expected in Rajasthan Jul 9-10.', time: '5h ago' },
  { type: 'success', msg: 'Price drop! Hotels in Udaipur are 20% cheaper this week.', time: '1d ago' },
];

const QUICK_STATS = [
  { label: 'Total Trips', value: '12', icon: Globe, color: 'indigo', change: '+2 this year' },
  { label: 'Active Bookings', value: '5', icon: BookMarked, color: 'violet', change: '3 hotels, 2 vehicles' },
  { label: 'Total Saved', value: '₹28K', icon: Wallet, color: 'emerald', change: 'vs. direct booking' },
  { label: 'Countries Visited', value: '8', icon: MapPin, color: 'amber', change: 'Next: Indonesia' },
];

export default function DashboardPage() {
  const { profile, user } = useAuth();
  
  return (
    <ProtectedRoute>
      <div className="min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
        <Navbar />
        <div className="pt-16 max-w-7xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-black text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Good morning, {profile?.name || user?.displayName || 'Traveler'}! 👋
              </h1>
            <p className="text-slate-400 text-sm mt-1">You have 2 upcoming trips and 5 active bookings.</p>
          </div>
          <Link href="/planner" className="btn-primary text-sm">
            <Plus className="w-4 h-4" /> Plan New Trip
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {QUICK_STATS.map(({ label, value, icon: Icon, color, change }) => (
            <div key={label} className="glass-card p-5">
              <div className={`w-10 h-10 rounded-xl mb-3 flex items-center justify-center bg-${color}-500/10 border border-${color}-500/20`}>
                <Icon className={`w-5 h-5 text-${color}-400`} />
              </div>
              <div className="text-2xl font-black text-white mb-1">{value}</div>
              <div className="text-xs text-slate-400 font-medium">{label}</div>
              <div className="text-xs text-slate-600 mt-1">{change}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Trips */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-white">Upcoming Trips</h2>
              <Link href="/bookings" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1">
                View all <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            {UPCOMING_TRIPS.map(trip => (
              <div key={trip.id} className="glass-card p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl glass flex items-center justify-center text-2xl">{trip.emoji}</div>
                    <div>
                      <h3 className="font-bold text-white">{trip.dest}</h3>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                        <Calendar className="w-3 h-3" />{trip.dates}
                      </div>
                    </div>
                  </div>
                  <span className={`badge ${trip.color === 'emerald' ? 'badge-emerald' : 'badge-amber'} text-xs`}>{trip.status}</span>
                </div>

                {/* Budget Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-slate-400 mb-2">
                    <span>Budget Used</span>
                    <span>{trip.spent} / {trip.budget}</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/[0.05]">
                    <div
                      className={`h-2 rounded-full ${trip.color === 'emerald' ? 'bg-emerald-500' : 'bg-amber-500'}`}
                      style={{ width: `${(parseInt(trip.spent.replace(/[₹,K]/g, '')) / parseInt(trip.budget.replace(/[₹,K]/g, ''))) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Hotel className="w-3.5 h-3.5 text-indigo-400" />
                    {trip.hotels} Hotels
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Car className="w-3.5 h-3.5 text-violet-400" />
                    {trip.vehicles} Vehicle
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link href="/live" className="btn-primary py-2 px-4 text-xs">
                    <Zap className="w-3.5 h-3.5" /> Live View
                  </Link>
                  <Link href={`/bookings`} className="btn-secondary py-2 px-4 text-xs">
                    Manage
                  </Link>
                </div>
              </div>
            ))}

            {/* Recent Bookings */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-white">Recent Bookings</h2>
                <Link href="/bookings" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1">
                  View all <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="space-y-3">
                {RECENT_BOOKINGS.map((b, i) => {
                  const Icon = b.icon;
                  return (
                    <div key={i} className="glass-card p-4 flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${b.color}-500/10 border border-${b.color}-500/20 flex-shrink-0`}>
                        <Icon className={`w-5 h-5 text-${b.color}-400`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white">{b.name}</p>
                        <p className="text-xs text-slate-500">{b.details}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-bold text-white">{b.price}</p>
                        <span className={`badge text-xs ${b.status === 'Confirmed' ? 'badge-emerald' : 'badge-amber'}`}>{b.status}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-5">
            {/* Alerts */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-white flex items-center gap-2">
                  <Bell className="w-4 h-4 text-indigo-400" /> Alerts
                </h2>
              </div>
              <div className="space-y-3">
                {ALERTS.map((a, i) => (
                  <div key={i} className={`glass-card p-4 border-l-2 ${a.type === 'info' ? 'border-indigo-500' : a.type === 'warning' ? 'border-amber-500' : 'border-emerald-500'}`}>
                    <div className="flex items-start gap-2">
                      {a.type === 'warning' ? <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                        : a.type === 'success' ? <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        : <Bell className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />}
                      <div>
                        <p className="text-xs text-slate-300 leading-relaxed">{a.msg}</p>
                        <p className="text-xs text-slate-600 mt-1">{a.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="font-bold text-white mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Plan Trip', icon: '✈️', href: '/planner' },
                  { label: 'Book Hotel', icon: '🏨', href: '/hotels' },
                  { label: 'Rent Car', icon: '🚗', href: '/vehicles' },
                  { label: 'AI Chat', icon: '🤖', href: '/assistant' },
                  { label: 'Group Plan', icon: '👥', href: '/group' },
                  { label: 'My Bookings', icon: '📋', href: '/bookings' },
                ].map(a => (
                  <Link key={a.label} href={a.href} className="glass-card p-4 flex flex-col items-center gap-2 text-center hover:border-indigo-500/20 transition-all group">
                    <span className="text-2xl">{a.icon}</span>
                    <span className="text-xs font-medium text-slate-400 group-hover:text-white transition-colors">{a.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* AI Tip */}
            <div className="glass-card p-5 border-indigo-500/20" style={{ background: 'rgba(99,102,241,0.06)' }}>
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-indigo-400" />
                <span className="text-sm font-semibold text-indigo-300">AI Insight</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                You tend to prefer coastal destinations. Based on your June trip to Bali, we recommend exploring Andaman Islands or Sri Lanka next — 30% cheaper for similar experiences!
              </p>
              <Link href="/assistant" className="text-xs text-indigo-400 hover:text-indigo-300 mt-3 flex items-center gap-1 transition-colors">
                Ask AI for more <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
