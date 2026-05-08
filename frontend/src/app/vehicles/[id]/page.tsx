'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Star, MapPin, Zap, Users, Settings, Fuel, Heart,
  Share2, Shield, Check, Calendar, ChevronLeft, ChevronRight,
  CreditCard, X, Info, Route, Leaf
} from 'lucide-react';
import Navbar from '@/components/Navbar';

const VEHICLE = {
  id: 1,
  name: 'Mahindra Thar 4x4',
  type: 'SUV',
  brand: 'Mahindra',
  price: 4200,
  originalPrice: 5000,
  rating: 4.9,
  reviews: 1240,
  fuel: 'Petrol',
  range: '400 km/tank',
  seats: 4,
  transmission: 'Manual',
  luggage: '2 Large Bags',
  engine: '2.2L mHawk Diesel',
  drive: '4WD + 2WD',
  features: ['4WD System', 'Roof Rack', 'Snorkel', 'Off-road Tyres', 'Winch', 'LED Headlights', 'Skid Plates', 'Roll Cage'],
  suitable: ['Mountain Roads', 'Desert Safari', 'Off-road Adventures', 'Himalayan Highways'],
  pickup: 'Manali Bus Stand',
  drop: 'Same / Chandigarh Airport',
  image: '🏔️🚙',
  description: 'The iconic Mahindra Thar is the ultimate off-road companion for Himalayan adventures. With its legendary 4x4 capability, high ground clearance, and robust build, it conquers terrains that stop all other vehicles. Perfect for Spiti Valley, Rohtang Pass, and Leh-Ladakh circuits.',
  rules: ['Minimum 23 years of age', 'Valid driving license required', 'Security deposit: ₹15,000', 'Return with full fuel tank', 'No pets allowed'],
  fuelEfficiency: '12-15 km/L (highway)',
};

const REVIEWS = [
  { name: 'Vikram Singh', avatar: '🧑‍🦱', rating: 5, date: 'Apr 2025', comment: 'Beast of a machine! Took it to Spiti Valley and it handled every rough patch with ease. Very well maintained.' },
  { name: 'Anjali Mehta', avatar: '👩', rating: 5, date: 'Mar 2025', comment: 'Perfect for the Manali-Leh highway. The 4WD system is exceptional. Roamora made the booking super easy.' },
  { name: 'Rohan Kapoor', avatar: '👨', rating: 4, date: 'Feb 2025', comment: 'Great vehicle, great service. The pickup team was on time. Only wish it had an automatic option for easier city driving.' },
];

export default function VehicleDetailPage({ params }: { params: { id: string } }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [days, setDays] = useState(5);
  const [wishlist, setWishlist] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [pickupLocation, setPickupLocation] = useState(VEHICLE.pickup);

  const total = VEHICLE.price * days;
  const insurance = 500 * days;
  const deposit = 15000;

  const images = ['🏔️🚙', '⚙️🚙', '🗺️🚙', '🏕️🚙'];

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />
      <div className="pt-16 max-w-7xl mx-auto px-6 py-8">
        <Link href="/vehicles" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Vehicles
        </Link>

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="badge badge-indigo">{VEHICLE.type}</span>
              <span className={`badge ${VEHICLE.fuel === 'Electric' ? 'badge-emerald' : 'badge-amber'}`}>
                {VEHICLE.fuel === 'Electric' ? '⚡ Electric' : `⛽ ${VEHICLE.fuel}`}
              </span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-sm font-bold text-white">{VEHICLE.rating}</span>
                <span className="text-sm text-slate-500">({VEHICLE.reviews.toLocaleString()})</span>
              </div>
            </div>
            <h1 className="text-3xl font-black text-white mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>{VEHICLE.name}</h1>
            <div className="flex items-center gap-1.5 text-slate-400 text-sm">
              <MapPin className="w-4 h-4" />{VEHICLE.pickup}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setWishlist(!wishlist)} className={`btn-secondary py-2 px-4 text-sm ${wishlist ? 'text-rose-400 border-rose-500/30' : ''}`}>
              <Heart className={`w-4 h-4 ${wishlist ? 'fill-rose-400' : ''}`} />
              {wishlist ? 'Saved' : 'Save'}
            </button>
            <button className="btn-secondary py-2 px-4 text-sm"><Share2 className="w-4 h-4" /></button>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="relative h-80 rounded-2xl overflow-hidden mb-8 flex items-center justify-center text-8xl cursor-pointer group"
          style={{ background: 'linear-gradient(135deg, rgba(8,8,24,0.95) 0%, rgba(25,15,45,0.85) 100%)' }}>
          <span className="text-center">{images[currentImage]}</span>
          <button onClick={() => setCurrentImage(p => (p - 1 + images.length) % images.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/10">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => setCurrentImage(p => (p + 1) % images.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/10">
            <ChevronRight className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button key={i} onClick={() => setCurrentImage(i)} className={`w-2 h-2 rounded-full transition-all ${i === currentImage ? 'bg-indigo-400 w-6' : 'bg-white/30'}`} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-bold text-white mb-3">About this vehicle</h2>
              <p className="text-slate-400 text-sm leading-relaxed">{VEHICLE.description}</p>
            </div>

            {/* Specs Grid */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-bold text-white mb-4">Specifications</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Seats', value: VEHICLE.seats, icon: Users },
                  { label: 'Transmission', value: VEHICLE.transmission, icon: Settings },
                  { label: 'Fuel', value: VEHICLE.fuel, icon: Fuel },
                  { label: 'Drive', value: VEHICLE.drive, icon: Route },
                  { label: 'Range', value: VEHICLE.range, icon: Zap },
                  { label: 'Engine', value: VEHICLE.engine, icon: Zap },
                  { label: 'Luggage', value: VEHICLE.luggage, icon: Users },
                  { label: 'Efficiency', value: VEHICLE.fuelEfficiency, icon: Leaf },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="glass-light rounded-xl p-4 border border-white/[0.06] text-center">
                    <Icon className="w-5 h-5 text-indigo-400 mx-auto mb-2" />
                    <p className="text-sm font-bold text-white">{value}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-bold text-white mb-4">Features & Equipment</h2>
              <div className="grid grid-cols-2 gap-3">
                {VEHICLE.features.map(f => (
                  <div key={f} className="flex items-center gap-2.5 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Best For */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-bold text-white mb-4">Best Suited For</h2>
              <div className="flex flex-wrap gap-3">
                {VEHICLE.suitable.map(s => (
                  <span key={s} className="badge badge-indigo px-4 py-2">{s}</span>
                ))}
              </div>
            </div>

            {/* Rules */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-amber-400" /> Rental Rules
              </h2>
              <ul className="space-y-2">
                {VEHICLE.rules.map(r => (
                  <li key={r} className="flex items-start gap-2 text-sm text-slate-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            {/* Reviews */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-white">Renter Reviews</h2>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <span className="text-xl font-black text-white">{VEHICLE.rating}</span>
                </div>
              </div>
              <div className="space-y-5">
                {REVIEWS.map((r, i) => (
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
                    <p className="text-sm text-slate-400">{r.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Widget */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 sticky top-24">
              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-white">₹{VEHICLE.price.toLocaleString()}</span>
                  <span className="text-slate-500 text-sm line-through">₹{VEHICLE.originalPrice.toLocaleString()}</span>
                </div>
                <span className="text-slate-500 text-sm">per day</span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-slate-500 mb-1 block">Pickup Date</label>
                    <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="input-field py-2.5 text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 mb-1 block">Return Date</label>
                    <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="input-field py-2.5 text-sm" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">Pickup Location</label>
                  <input value={pickupLocation} onChange={e => setPickupLocation(e.target.value)} className="input-field py-2.5 text-sm" />
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">Number of Days</label>
                  <input type="number" min={1} value={days} onChange={e => setDays(+e.target.value)} className="input-field py-2.5 text-sm" />
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="glass-light rounded-xl p-4 mb-4 border border-white/[0.05] space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">₹{VEHICLE.price.toLocaleString()} × {days} days</span>
                  <span className="text-white">₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Insurance</span>
                  <span className="text-white">₹{insurance.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Security Deposit</span>
                  <span className="text-white">₹{deposit.toLocaleString()}</span>
                </div>
                <div className="divider" />
                <div className="flex justify-between font-bold">
                  <span className="text-white">Total</span>
                  <span className="text-xl gradient-text">₹{(total + insurance + deposit).toLocaleString()}</span>
                </div>
                <p className="text-xs text-slate-600">* Deposit refunded at return</p>
              </div>

              <button onClick={() => setShowBookingModal(true)} className="btn-primary w-full justify-center py-3.5 text-sm mb-3">
                <CreditCard className="w-4 h-4" /> Book Vehicle
              </button>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" /> Free cancellation up to 24h before
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Check className="w-3.5 h-3.5 text-indigo-400" /> 24/7 roadside assistance included
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
              <div className="text-4xl mb-3">🚙</div>
              <h2 className="text-xl font-black text-white mb-1">Confirm Vehicle Rental</h2>
              <p className="text-slate-400 text-sm">{VEHICLE.name}</p>
            </div>
            <div className="glass-light rounded-xl p-4 mb-6 border border-white/[0.06] space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-400">Duration</span><span className="text-white">{days} days</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Pickup</span><span className="text-white">{pickupLocation}</span></div>
              <div className="divider" />
              <div className="flex justify-between font-bold text-base"><span className="text-white">Total</span><span className="gradient-text">₹{(total + insurance + deposit).toLocaleString()}</span></div>
            </div>
            <div className="space-y-3">
              <input className="input-field text-sm" placeholder="Card number" />
              <div className="grid grid-cols-2 gap-3">
                <input className="input-field text-sm" placeholder="MM/YY" />
                <input className="input-field text-sm" placeholder="CVV" />
              </div>
            </div>
            <button className="btn-primary w-full justify-center py-3.5 mt-4">
              <CreditCard className="w-4 h-4" /> Confirm & Pay ₹{(total + insurance + deposit).toLocaleString()}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
