'use client';
import { useState } from 'react';
import {
  BookMarked, Hotel, Car, Search, Filter, Download,
  X, MessageSquare, ChevronDown, Calendar, Check,
  AlertTriangle, Clock, MapPin, CreditCard, FileText
} from 'lucide-react';
import Navbar from '@/components/Navbar';

type Status = 'Confirmed' | 'Upcoming' | 'Completed' | 'Cancelled' | 'Pending';

const BOOKINGS = [
  { id: 'BK-001', type: 'Hotel', name: 'The Leela Palace', details: 'New Delhi · Deluxe Room', dates: 'Jun 15–17, 2025', amount: '₹25,000', status: 'Confirmed' as Status, icon: Hotel, ref: 'LEELA-2025-001', paid: true },
  { id: 'BK-002', type: 'Vehicle', name: 'Mahindra Thar 4x4', details: 'Manali Pickup · 5 Days', dates: 'Jun 17–22, 2025', amount: '₹21,000', status: 'Upcoming' as Status, icon: Car, ref: 'MH-RENT-7721', paid: true },
  { id: 'BK-003', type: 'Hotel', name: 'Zostel Bali Backpackers', details: 'Seminyak · Dorm Bed', dates: 'Jun 17–20, 2025', amount: '₹7,200', status: 'Pending' as Status, icon: Hotel, ref: 'ZOS-BALI-440', paid: false },
  { id: 'BK-004', type: 'Hotel', name: 'Taj Lake Palace', details: 'Udaipur · Heritage Suite', dates: 'Feb 10–13, 2025', amount: '₹1,35,000', status: 'Completed' as Status, icon: Hotel, ref: 'TAJ-UDP-2025', paid: true },
  { id: 'BK-005', type: 'Vehicle', name: 'Tata Nexon EV', details: 'Delhi → Agra Route', dates: 'Jan 5–7, 2025', amount: '₹8,400', status: 'Completed' as Status, icon: Car, ref: 'EV-DEL-098', paid: true },
  { id: 'BK-006', type: 'Hotel', name: 'Ritz-Carlton Bangalore', details: 'Bangalore · King Room', dates: 'Dec 20–22, 2024', amount: '₹37,000', status: 'Cancelled' as Status, icon: Hotel, ref: 'RC-BLR-556', paid: false },
];

const STATUS_COLORS: Record<Status, string> = {
  Confirmed: 'badge-emerald',
  Upcoming: 'badge-indigo',
  Completed: 'badge-cyan',
  Cancelled: 'badge-rose',
  Pending: 'badge-amber',
};

export default function BookingsPage() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState<string | null>(null);

  const filters: (string | Status)[] = ['All', 'Confirmed', 'Upcoming', 'Pending', 'Completed', 'Cancelled'];

  const filtered = BOOKINGS.filter(b => {
    const matchFilter = filter === 'All' || b.status === filter;
    const matchSearch = !search || b.name.toLowerCase().includes(search.toLowerCase()) || b.id.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const selectedBooking = BOOKINGS.find(b => b.id === selected);

  const stats = {
    active: BOOKINGS.filter(b => ['Confirmed', 'Upcoming', 'Pending'].includes(b.status)).length,
    completed: BOOKINGS.filter(b => b.status === 'Completed').length,
    total: BOOKINGS.reduce((a, b) => a + parseInt(b.amount.replace(/[₹,]/g, '')), 0),
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />
      <div className="pt-16 max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-black text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>My Bookings</h1>
            <p className="text-slate-400 text-sm mt-1">Manage all your hotel and vehicle reservations</p>
          </div>
          <button className="btn-secondary text-sm py-2">
            <Download className="w-4 h-4" /> Export All
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="glass-card p-5 text-center">
            <p className="text-2xl font-black text-white">{stats.active}</p>
            <p className="text-xs text-slate-500 mt-1">Active Bookings</p>
          </div>
          <div className="glass-card p-5 text-center">
            <p className="text-2xl font-black text-white">{stats.completed}</p>
            <p className="text-xs text-slate-500 mt-1">Completed</p>
          </div>
          <div className="glass-card p-5 text-center">
            <p className="text-2xl font-black gradient-text">₹{(stats.total / 1000).toFixed(0)}K</p>
            <p className="text-xs text-slate-500 mt-1">Total Spent</p>
          </div>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex items-center gap-2 input-field flex-1">
            <Search className="w-4 h-4 text-slate-500" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search bookings..." className="bg-transparent outline-none text-sm flex-1 text-slate-200 placeholder-slate-500" />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {filters.map(f => (
              <button key={f} onClick={() => setFilter(f as string)}
                className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${filter === f ? 'gradient-primary text-white border-transparent' : 'glass-light border-white/[0.08] text-slate-400 hover:text-white'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bookings List */}
          <div className="lg:col-span-2 space-y-3">
            {filtered.map(booking => {
              const Icon = booking.icon;
              return (
                <div
                  key={booking.id}
                  onClick={() => setSelected(booking.id === selected ? null : booking.id)}
                  className={`glass-card p-5 cursor-pointer transition-all ${selected === booking.id ? 'border-indigo-500/30' : ''}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl glass flex items-center justify-center flex-shrink-0 border border-white/[0.06]">
                      <Icon className="w-5 h-5 text-indigo-400" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                          <h3 className="font-bold text-sm text-white">{booking.name}</h3>
                          <p className="text-xs text-slate-500">{booking.details}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-bold text-sm text-white">{booking.amount}</p>
                          <span className={`badge text-xs ${STATUS_COLORS[booking.status]}`}>{booking.status}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Calendar className="w-3 h-3" />
                          {booking.dates}
                        </div>
                        <div className="text-xs text-slate-600">#{booking.id}</div>
                        {!booking.paid && <span className="badge badge-rose text-xs">Payment Due</span>}
                      </div>
                    </div>

                    <ChevronDown className={`w-4 h-4 text-slate-500 flex-shrink-0 transition-transform ${selected === booking.id ? 'rotate-180' : ''}`} />
                  </div>

                  {/* Expanded Actions */}
                  {selected === booking.id && (
                    <div className="mt-4 pt-4 border-t border-white/[0.06] flex flex-wrap gap-3 animate-fade-in">
                      {!booking.paid && (
                        <button className="btn-primary py-2 px-4 text-xs">
                          <CreditCard className="w-3.5 h-3.5" /> Pay Now
                        </button>
                      )}
                      <button className="btn-secondary py-2 px-4 text-xs">
                        <FileText className="w-3.5 h-3.5" /> Download Invoice
                      </button>
                      <button className="btn-ghost py-2 px-4 text-xs">
                        <MessageSquare className="w-3.5 h-3.5" /> Contact Support
                      </button>
                      {['Confirmed', 'Upcoming', 'Pending'].includes(booking.status) && (
                        <button
                          onClick={e => { e.stopPropagation(); setShowCancelConfirm(booking.id); }}
                          className="btn-danger py-2 px-4 text-xs ml-auto"
                        >
                          <X className="w-3.5 h-3.5" /> Cancel
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {filtered.length === 0 && (
              <div className="text-center py-16">
                <BookMarked className="w-14 h-14 text-slate-700 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-400">No bookings found</h3>
                <p className="text-slate-600 text-sm mt-2">Try adjusting your filters</p>
              </div>
            )}
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-1">
            {selectedBooking ? (
              <div className="glass-card p-6 sticky top-24 animate-fade-in">
                <div className="flex items-center gap-3 mb-5">
                  <selectedBooking.icon className="w-5 h-5 text-indigo-400" />
                  <h3 className="font-bold text-white">{selectedBooking.name}</h3>
                </div>

                <div className="space-y-3 mb-5">
                  {[
                    { label: 'Booking ID', value: selectedBooking.id },
                    { label: 'Reference', value: selectedBooking.ref },
                    { label: 'Dates', value: selectedBooking.dates },
                    { label: 'Amount', value: selectedBooking.amount },
                    { label: 'Payment', value: selectedBooking.paid ? 'Paid ✓' : 'Pending ⚠️' },
                    { label: 'Status', value: selectedBooking.status },
                  ].map(item => (
                    <div key={item.label} className="flex justify-between text-sm border-b border-white/[0.04] pb-2 last:border-0">
                      <span className="text-slate-500">{item.label}</span>
                      <span className="text-white font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <button className="w-full btn-primary py-2.5 text-sm justify-center">
                    <Download className="w-4 h-4" /> Download Invoice
                  </button>
                  <button className="w-full btn-secondary py-2.5 text-sm justify-center">
                    <MessageSquare className="w-4 h-4" /> Support
                  </button>
                </div>
              </div>
            ) : (
              <div className="glass-card p-6 text-center">
                <BookMarked className="w-10 h-10 text-slate-700 mx-auto mb-3" />
                <p className="text-slate-500 text-sm">Select a booking to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowCancelConfirm(null)} />
          <div className="relative glass-heavy rounded-2xl p-8 max-w-sm w-full animate-scale-in border border-rose-500/20">
            <div className="text-center mb-6">
              <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto mb-3" />
              <h2 className="text-lg font-black text-white mb-2">Cancel Booking?</h2>
              <p className="text-slate-400 text-sm">This action may incur cancellation fees depending on the policy. Are you sure?</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowCancelConfirm(null)} className="flex-1 btn-secondary py-3 justify-center">Keep Booking</button>
              <button onClick={() => setShowCancelConfirm(null)} className="flex-1 btn-danger py-3 justify-center">Yes, Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
