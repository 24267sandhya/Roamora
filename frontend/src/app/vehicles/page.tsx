'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  Car, Search, SlidersHorizontal, Zap, Fuel, Users, Settings,
  MapPin, Star, Heart, ArrowRight, ChevronDown, Sparkles,
  Check, Filter, Grid3X3
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const VEHICLES = [
  { id: 1, name: 'Tata Nexon EV', type: 'EV', category: 'SUV', brand: 'Tata', price: 2800, originalPrice: 3500, range: '312 km', seats: 5, transmission: 'Automatic', fuel: 'Electric', image: '⚡🚙', rating: 4.7, reviews: 890, pickup: 'Delhi Airport', features: ['Sunroof', 'GPS', 'Bluetooth', 'USB Charging'], suitable: 'City & Hills', tag: 'Eco Pick', tagColor: 'badge-emerald' },
  { id: 2, name: 'Mahindra Thar 4x4', type: 'Petrol', category: 'SUV', brand: 'Mahindra', price: 4200, originalPrice: 5000, range: '400 km/tank', seats: 4, transmission: 'Manual', fuel: 'Petrol', image: '🏔️🚙', rating: 4.9, reviews: 1240, pickup: 'Manali Centre', features: ['4WD', 'Roof Rack', 'Snorkel', 'Off-road Tyres'], suitable: 'Mountain Roads', tag: 'Adventure', tagColor: 'badge-amber' },
  { id: 3, name: 'Toyota Innova Crysta', type: 'Diesel', category: 'MPV', brand: 'Toyota', price: 3800, originalPrice: 4500, range: '600 km/tank', seats: 7, transmission: 'Automatic', fuel: 'Diesel', image: '🚐', rating: 4.6, reviews: 2100, pickup: 'Bengaluru Airport', features: ['7 Seats', 'AC', 'GPS', 'Entertainment System'], suitable: 'Family Travel', tag: 'Family', tagColor: 'badge-indigo' },
  { id: 4, name: 'Royal Enfield Himalayan', type: 'Petrol', category: 'Bike', brand: 'Royal Enfield', price: 1200, originalPrice: 1600, range: '450 km/tank', seats: 2, transmission: 'Manual', fuel: 'Petrol', image: '🏍️', rating: 4.8, reviews: 756, pickup: 'Leh Centre', features: ['Panniers', 'USB Port', 'ABS'], suitable: 'Mountain Roads', tag: 'Biker\'s Choice', tagColor: 'badge-rose' },
  { id: 5, name: 'BMW 5 Series', type: 'Petrol', category: 'Sedan', brand: 'BMW', price: 12000, originalPrice: 15000, range: '500 km/tank', seats: 5, transmission: 'Automatic', fuel: 'Petrol', image: '🚗✨', rating: 4.9, reviews: 432, pickup: 'Mumbai Airport', features: ['Sunroof', 'Heated Seats', 'Massage Seats', 'HUD'], suitable: 'Luxury Business', tag: 'Premium', tagColor: 'badge-violet' },
  { id: 6, name: 'BYD Atto 3', type: 'EV', category: 'SUV', brand: 'BYD', price: 3200, originalPrice: 4000, range: '480 km', seats: 5, transmission: 'Automatic', fuel: 'Electric', image: '⚡🚗', rating: 4.5, reviews: 345, pickup: 'Hyderabad Airport', features: ['Panoramic Roof', 'ADAS', 'Wireless Charging', 'V2L'], suitable: 'Highway & City', tag: 'Long Range EV', tagColor: 'badge-emerald' },
  { id: 7, name: 'Ola S1 Pro', type: 'EV', category: 'Scooter', brand: 'Ola', price: 600, originalPrice: 800, range: '181 km', seats: 2, transmission: 'Automatic', fuel: 'Electric', image: '⚡🛵', rating: 4.2, reviews: 1800, pickup: 'City Centre', features: ['App Connected', 'USB Port', 'Storage'], suitable: 'City Commute', tag: 'Budget EV', tagColor: 'badge-cyan' },
  { id: 8, name: 'Kia Carnival', type: 'Diesel', category: 'MPV', brand: 'Kia', price: 5500, originalPrice: 7000, range: '650 km/tank', seats: 8, transmission: 'Automatic', fuel: 'Diesel', image: '🚌', rating: 4.7, reviews: 567, pickup: 'Delhi Airport', features: ['8 Seats', 'Captain Seats', 'DVD System', 'Refrigerator'], suitable: 'Large Groups', tag: 'Group Travel', tagColor: 'badge-indigo' },
];

const vehicleTypes = ['All', 'EV', 'SUV', 'Sedan', 'Bike', 'Scooter', 'MPV'];
const fuelTypes = ['All Fuel', 'Electric', 'Petrol', 'Diesel'];

export default function VehiclesPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [fuel, setFuel] = useState('All Fuel');
  const [sortBy, setSortBy] = useState('Recommended');
  const [pickup, setPickup] = useState('');
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [maxPrice, setMaxPrice] = useState(15000);

  const filtered = VEHICLES
    .filter(v => {
      const matchSearch = !search || v.name.toLowerCase().includes(search.toLowerCase()) || v.pickup.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === 'All' || v.category === category || v.type === category;
      const matchFuel = fuel === 'All Fuel' || v.fuel === fuel;
      const matchPrice = v.price <= maxPrice;
      return matchSearch && matchCat && matchFuel && matchPrice;
    })
    .sort((a, b) => {
      if (sortBy === 'Price Low') return a.price - b.price;
      if (sortBy === 'Price High') return b.price - a.price;
      if (sortBy === 'Rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-16">
        {/* Search Bar */}
        <div className="glass-heavy border-b border-white/[0.06] sticky top-16 z-40 px-6 py-4">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-3 items-stretch lg:items-center">
            <div className="flex-1 flex items-center gap-2 input-field">
              <Search className="w-4 h-4 text-slate-500" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search vehicles or pickup location..." className="bg-transparent outline-none text-sm flex-1 text-slate-200 placeholder-slate-500" />
            </div>
            <input value={pickup} onChange={e => setPickup(e.target.value)} placeholder="Pickup Location" className="input-field lg:w-52 text-sm" />
            <input type="date" className="input-field lg:w-40 text-sm" />
            <input type="date" className="input-field lg:w-40 text-sm" />
            <button className="btn-primary whitespace-nowrap">
              <Search className="w-4 h-4" /> Find Vehicles
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header + Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold text-white">{filtered.length} Vehicles Available</h1>
              <p className="text-sm text-slate-500">Compare prices, features, and fuel efficiency</p>
            </div>
            <div className="flex items-center gap-3">
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="input-field py-2 text-sm pr-8 appearance-none">
                {['Recommended', 'Price Low', 'Price High', 'Rating'].map(o => <option key={o}>{o}</option>)}
              </select>
              <button onClick={() => setShowFilters(!showFilters)} className={`btn-secondary py-2 text-sm ${showFilters ? 'border-indigo-500/40 text-indigo-300' : ''}`}>
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </button>
            </div>
          </div>

          {/* Type Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
            {vehicleTypes.map(t => (
              <button key={t} onClick={() => setCategory(t)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium border transition-all ${category === t ? 'gradient-primary text-white border-transparent' : 'glass-light border-white/[0.08] text-slate-400 hover:text-white'}`}>
                {t}
              </button>
            ))}
            <div className="border-l border-white/[0.06] mx-2" />
            {fuelTypes.map(f => (
              <button key={f} onClick={() => setFuel(f)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium border transition-all ${fuel === f ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'glass-light border-white/[0.08] text-slate-400 hover:text-white'}`}>
                {f === 'Electric' ? '⚡' : f === 'Petrol' ? '⛽' : f === 'Diesel' ? '🛢️' : ''} {f}
              </button>
            ))}
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="glass-card p-6 mb-6 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Max Price (₹/day): ₹{maxPrice.toLocaleString()}</label>
                  <input type="range" min={500} max={15000} step={500} value={maxPrice} onChange={e => setMaxPrice(+e.target.value)} className="w-full accent-indigo-500" />
                  <div className="flex justify-between text-xs text-slate-500 mt-1"><span>₹500</span><span>₹15,000</span></div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Transmission</label>
                  <div className="flex gap-2">
                    {['Any', 'Automatic', 'Manual'].map(t => (
                      <button key={t} className="px-3 py-2 text-sm rounded-lg glass-light border border-white/[0.08] text-slate-400 hover:text-white transition-all">{t}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Suitable For</label>
                  <div className="flex flex-wrap gap-2">
                    {['City', 'Mountain', 'Highway', 'Off-road'].map(s => (
                      <button key={s} className="px-3 py-2 text-sm rounded-lg glass-light border border-white/[0.08] text-slate-400 hover:text-white transition-all">{s}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI Banner */}
          <div className="glass-card p-4 mb-6 flex items-center gap-4 border-violet-500/20">
            <div className="w-10 h-10 rounded-xl" style={{ background: 'linear-gradient(135deg, #8b5cf6, #22d3ee)' }}>
              <Sparkles className="w-5 h-5 text-white m-auto" style={{ marginTop: '10px' }} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">AI Vehicle Recommendation</p>
              <p className="text-xs text-slate-400">For a Himachal road trip under ₹4k/day, the Mahindra Thar is your best bet — 4WD, robust suspension, and perfect for mountain terrains.</p>
            </div>
          </div>

          {/* Vehicle Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((v, i) => (
              <div key={v.id} className={`glass-card p-0 overflow-hidden group animate-fade-in`} style={{ animationDelay: `${i * 0.05}s` }}>
                {/* Image */}
                <div className="relative h-44 flex items-center justify-center text-6xl"
                  style={{ background: 'linear-gradient(135deg, rgba(12,12,28,0.9) 0%, rgba(20,20,45,0.7) 100%)' }}>
                  {v.image}
                  <span className={`absolute top-3 left-3 badge ${v.tagColor} text-xs`}>{v.tag}</span>
                  <button onClick={() => setWishlist(p => p.includes(v.id) ? p.filter(i => i !== v.id) : [...p, v.id])}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full glass flex items-center justify-center transition-all ${wishlist.includes(v.id) ? 'text-rose-400' : 'text-slate-400 hover:text-rose-400'}`}>
                    <Heart className={`w-4 h-4 ${wishlist.includes(v.id) ? 'fill-rose-400' : ''}`} />
                  </button>
                  <div className="absolute bottom-3 left-3">
                    <span className={`badge text-xs ${v.fuel === 'Electric' ? 'badge-emerald' : v.fuel === 'Diesel' ? 'badge-amber' : 'badge-indigo'}`}>
                      {v.fuel === 'Electric' ? '⚡' : v.fuel === 'Petrol' ? '⛽' : '🛢️'} {v.fuel}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-white group-hover:text-indigo-300 transition-colors">{v.name}</h3>
                      <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                        <MapPin className="w-3 h-3" /> {v.pickup}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-sm font-bold text-white">{v.rating}</span>
                    </div>
                  </div>

                  {/* Specs */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center p-2 glass-light rounded-lg border border-white/[0.05]">
                      <Users className="w-3.5 h-3.5 text-slate-400 mx-auto mb-1" />
                      <p className="text-xs text-white font-medium">{v.seats}</p>
                      <p className="text-xs text-slate-500">Seats</p>
                    </div>
                    <div className="text-center p-2 glass-light rounded-lg border border-white/[0.05]">
                      <Zap className="w-3.5 h-3.5 text-slate-400 mx-auto mb-1" />
                      <p className="text-xs text-white font-medium truncate">{v.range.split(' ')[0]}</p>
                      <p className="text-xs text-slate-500">{v.fuel === 'Electric' ? 'Range' : 'Range'}</p>
                    </div>
                    <div className="text-center p-2 glass-light rounded-lg border border-white/[0.05]">
                      <Settings className="w-3.5 h-3.5 text-slate-400 mx-auto mb-1" />
                      <p className="text-xs text-white font-medium">{v.transmission.slice(0, 4)}</p>
                      <p className="text-xs text-slate-500">Trans.</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {v.features.slice(0, 3).map(f => (
                      <span key={f} className="text-xs px-2 py-0.5 glass-light rounded-md border border-white/[0.05] text-slate-400">{f}</span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-black text-white">₹{v.price.toLocaleString()}</span>
                        <span className="text-sm text-slate-500 line-through">₹{v.originalPrice.toLocaleString()}</span>
                      </div>
                      <span className="text-xs text-slate-500">per day</span>
                    </div>
                    <Link href={`/vehicles/${v.id}`} className="btn-primary py-2 px-4 text-sm">
                      Rent Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
