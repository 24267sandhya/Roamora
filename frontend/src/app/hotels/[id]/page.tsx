'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Star, MapPin, Wifi, Coffee, Car, Dumbbell, Check,
  ChevronLeft, ChevronRight, Share2, Heart, Shield, Clock,
  Sparkles, Users, Calendar, CreditCard, X, Info
} from 'lucide-react';
import Navbar from '@/components/Navbar';

const HOTEL = {
  id: 1,
  name: 'The Leela Palace',
  location: 'Chanakyapuri, New Delhi, India',
  rating: 4.9,
  reviews: 2840,
  category: 'Luxury',
  description: 'The Leela Palace New Delhi is a magnificent 5-star luxury hotel inspired by the grand palaces of Lutyens' Delhi. Set in the heart of the capital's diplomatic enclave, it offers unparalleled views of the Mughal Gardens and the Indian capital.',
  amenities: [
    { name: 'Free WiFi', icon: '📶', premium: false },
    { name: 'Infinity Pool', icon: '🏊', premium: true },
    { name: 'World-class Spa', icon: '💆', premium: true },
    { name: 'Fine Dining', icon: '🍽️', premium: false },
    { name: 'Business Center', icon: '💼', premium: false },
    { name: 'Airport Transfer', icon: '🚗', premium: true },
    { name: 'Valet Parking', icon: '🅿️', premium: false },
    { name: 'Concierge 24/7', icon: '🔔', premium: false },
    { name: 'Fitness Center', icon: '🏋️', premium: false },
    { name: 'Butler Service', icon: '🛎️', premium: true },
  ],
  rooms: [
    { type: 'Deluxe Room', size: '42 sqm', beds: '1 King', price: 12500, originalPrice: 18000, occupancy: 2, features: ['Garden View', 'Marble Bathroom', 'Smart TV'] },
    { type: 'Premier Suite', size: '82 sqm', beds: '1 King + Sofa', price: 28000, originalPrice: 40000, occupancy: 3, features: ['City View', 'Private Terrace', 'Butler Service', 'Jacuzzi'] },
    { type: 'Royal Suite', size: '156 sqm', beds: '2 King', price: 65000, originalPrice: 85000, occupancy: 4, features: ['Palace View', 'Private Pool', 'Dining Room', 'Library'] },
  ],
  nearbyAttractions: [
    { name: 'India Gate', distance: '3.2 km', time: '10 min', icon: '🏛️' },
    { name: 'Rashtrapati Bhavan', distance: '1.8 km', time: '6 min', icon: '🏛️' },
    { name: 'Connaught Place', distance: '4.5 km', time: '15 min', icon: '🛍️' },
    { name: 'Humayun\'s Tomb', distance: '6.1 km', time: '20 min', icon: '⛩️' },
  ],
  reviews_list: [
    { name: 'Rahul Verma', avatar: '👨', rating: 5, date: 'Mar 2025', comment: 'Absolutely magnificent. The butler service was exceptional and the food at Megu was world-class. Will definitely return.' },
    { name: 'Sarah Johnson', avatar: '👩', rating: 5, date: 'Feb 2025', comment: 'Best hotel I have stayed at in Asia. The pool is breathtaking and the staff anticipates your every need.' },
    { name: 'Aditi Kapoor', avatar: '👩‍🦱', rating: 4, date: 'Jan 2025', comment: 'Stunning property but quite pricey. Worth it for special occasions. The spa treatment was transcendent.' },
  ],
};

const images = ['🏰', '🌟', '🏊', '🍽️', '💆', '🌃'];

export default function HotelDetailPage({ params }: { params: { id: string } }) {
  const [selectedRoom, setSelectedRoom] = useState(HOTEL.rooms[0]);
  const [currentImage, setCurrentImage] = useState(0);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [nights, setNights] = useState(3);

  const total = selectedRoom.price * nights;
  const taxes = Math.round(total * 0.18);

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />
      <div className="pt-16 max-w-7xl mx-auto px-6 py-8">
        {/* Back */}
        <Link href="/hotels" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Hotels
        </Link>

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="badge badge-indigo">{HOTEL.category}</span>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(HOTEL.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`} />
                ))}
                <span className="ml-1 text-sm font-bold text-white">{HOTEL.rating}</span>
                <span className="text-sm text-slate-500">({HOTEL.reviews.toLocaleString()} reviews)</span>
              </div>
            </div>
            <h1 className="text-3xl font-black text-white mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>{HOTEL.name}</h1>
            <div className="flex items-center gap-1.5 text-slate-400 text-sm">
              <MapPin className="w-4 h-4" />
              {HOTEL.location}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setWishlisted(!wishlisted)} className={`btn-secondary py-2 px-4 text-sm ${wishlisted ? 'text-rose-400 border-rose-500/30' : ''}`}>
              <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-400' : ''}`} />
              {wishlisted ? 'Saved' : 'Save'}
            </button>
            <button className="btn-secondary py-2 px-4 text-sm">
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="relative h-96 rounded-2xl overflow-hidden mb-8 glass-card flex items-center justify-center text-9xl cursor-pointer group"
          style={{ background: 'linear-gradient(135deg, rgba(12,12,28,0.9) 0%, rgba(30,20,50,0.7) 100%)' }}>
          <div className="text-center">
            <div className="text-8xl mb-2">{images[currentImage]}</div>
            <p className="text-slate-500 text-sm">Photo {currentImage + 1} of {images.length}</p>
          </div>
          <button onClick={() => setCurrentImage(p => (p - 1 + images.length) % images.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/10">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => setCurrentImage(p => (p + 1) % images.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/10">
            <ChevronRight className="w-5 h-5" />
          </button>
          {/* Thumbnails */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button key={i} onClick={() => setCurrentImage(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === currentImage ? 'bg-indigo-400 w-6' : 'bg-white/30'}`} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-bold text-white mb-3">About this property</h2>
              <p className="text-slate-400 text-sm leading-relaxed">{HOTEL.description}</p>
              <div className="mt-4 p-4 rounded-xl" style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)' }}>
                <div className="flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-indigo-300 mb-1">AI Insight</p>
                    <p className="text-xs text-slate-400">Perfect for business travelers and luxury seekers. The Leela scores highest for service quality among all Delhi 5-stars. Best booked 2+ weeks in advance for better rates.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-bold text-white mb-4">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {HOTEL.amenities.map(a => (
                  <div key={a.name} className={`flex items-center gap-2.5 p-3 rounded-lg ${a.premium ? 'glass-light border border-amber-500/15' : 'glass-light border border-white/[0.06]'}`}>
                    <span className="text-lg">{a.icon}</span>
                    <span className="text-sm text-slate-300">{a.name}</span>
                    {a.premium && <span className="ml-auto text-xs text-amber-400">★</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Room Selection */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-bold text-white mb-4">Select Your Room</h2>
              <div className="space-y-4">
                {HOTEL.rooms.map(room => (
                  <div
                    key={room.type}
                    onClick={() => setSelectedRoom(room)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedRoom.type === room.type
                        ? 'border-indigo-500/40 bg-indigo-500/10'
                        : 'border-white/[0.07] glass-light hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-white">{room.type}</h3>
                          {selectedRoom.type === room.type && (
                            <span className="badge badge-indigo text-xs">Selected</span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mb-3">{room.size} · {room.beds} · Up to {room.occupancy} guests</p>
                        <div className="flex flex-wrap gap-2">
                          {room.features.map(f => (
                            <span key={f} className="flex items-center gap-1 text-xs text-slate-400">
                              <Check className="w-3 h-3 text-emerald-400" /> {f}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-xl font-black text-white">₹{room.price.toLocaleString()}</div>
                        <div className="text-xs text-slate-500 line-through">₹{room.originalPrice.toLocaleString()}</div>
                        <div className="text-xs text-slate-500">per night</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-bold text-white mb-4">Nearby Attractions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {HOTEL.nearbyAttractions.map(a => (
                  <div key={a.name} className="flex items-center gap-3 p-3 rounded-xl glass-light border border-white/[0.06]">
                    <span className="text-2xl">{a.icon}</span>
                    <div>
                      <p className="text-sm font-medium text-white">{a.name}</p>
                      <p className="text-xs text-slate-500">{a.distance} · {a.time} drive</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-white">Guest Reviews</h2>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <span className="text-xl font-black text-white">{HOTEL.rating}</span>
                  <span className="text-slate-500 text-sm">/ 5.0</span>
                </div>
              </div>
              <div className="space-y-5">
                {HOTEL.reviews_list.map((r, i) => (
                  <div key={i} className="pb-5 border-b border-white/[0.05] last:border-0 last:pb-0">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-full glass flex items-center justify-center text-lg">{r.avatar}</div>
                      <div>
                        <p className="text-sm font-semibold text-white">{r.name}</p>
                        <p className="text-xs text-slate-500">{r.date}</p>
                      </div>
                      <div className="ml-auto flex gap-0.5">
                        {Array.from({ length: r.rating }).map((_, j) => (
                          <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">{r.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Booking Widget */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 sticky top-24">
              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-white">₹{selectedRoom.price.toLocaleString()}</span>
                  <span className="text-slate-500 text-sm line-through">₹{selectedRoom.originalPrice.toLocaleString()}</span>
                </div>
                <span className="text-slate-500 text-sm">per night · {selectedRoom.type}</span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-slate-500 mb-1 block">Check In</label>
                    <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} className="input-field py-2.5 text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 mb-1 block">Check Out</label>
                    <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} className="input-field py-2.5 text-sm" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">Guests</label>
                  <input type="number" min={1} max={selectedRoom.occupancy} value={guests} onChange={e => setGuests(+e.target.value)} className="input-field py-2.5 text-sm" />
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">Nights</label>
                  <input type="number" min={1} value={nights} onChange={e => setNights(+e.target.value)} className="input-field py-2.5 text-sm" />
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="glass-light rounded-xl p-4 mb-4 border border-white/[0.05] space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">₹{selectedRoom.price.toLocaleString()} × {nights} nights</span>
                  <span className="text-white">₹{(selectedRoom.price * nights).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Taxes & fees (18%)</span>
                  <span className="text-white">₹{taxes.toLocaleString()}</span>
                </div>
                <div className="divider" />
                <div className="flex justify-between font-bold">
                  <span className="text-white">Total</span>
                  <span className="text-xl gradient-text">₹{(total + taxes).toLocaleString()}</span>
                </div>
              </div>

              <button onClick={() => setShowBookingModal(true)} className="btn-primary w-full justify-center py-3.5 text-sm mb-3">
                <CreditCard className="w-4 h-4" /> Reserve Now
              </button>
              <p className="text-center text-xs text-slate-500">You won't be charged yet · Free cancellation available</p>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  Secure, encrypted payment
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" />
                  Instant confirmation
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowBookingModal(false)} />
          <div className="relative glass-heavy rounded-2xl p-8 max-w-md w-full animate-scale-in border border-white/[0.08]">
            <button onClick={() => setShowBookingModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">🎉</div>
              <h2 className="text-xl font-black text-white mb-1">Confirm Your Booking</h2>
              <p className="text-slate-400 text-sm">{HOTEL.name}</p>
            </div>
            <div className="glass-light rounded-xl p-4 mb-6 border border-white/[0.06] space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-400">Room</span><span className="text-white font-medium">{selectedRoom.type}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Nights</span><span className="text-white font-medium">{nights} nights</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Guests</span><span className="text-white font-medium">{guests} guests</span></div>
              <div className="divider" />
              <div className="flex justify-between font-bold text-base"><span className="text-white">Total</span><span className="gradient-text">₹{(total + taxes).toLocaleString()}</span></div>
            </div>
            <div className="space-y-3">
              <input className="input-field text-sm" placeholder="Card number" />
              <div className="grid grid-cols-2 gap-3">
                <input className="input-field text-sm" placeholder="MM/YY" />
                <input className="input-field text-sm" placeholder="CVV" />
              </div>
              <input className="input-field text-sm" placeholder="Name on card" />
            </div>
            <button className="btn-primary w-full justify-center py-3.5 mt-4">
              <CreditCard className="w-4 h-4" /> Pay ₹{(total + taxes).toLocaleString()}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
