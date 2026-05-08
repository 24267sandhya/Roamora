'use client';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Hotel, Search, SlidersHorizontal, Star, MapPin, Wifi, Car, Coffee,
  Pool, Dumbbell, Heart, Grid3X3, Map, Filter, ChevronDown, Sparkles,
  ArrowUpDown, Check
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const HOTELS = [
  { id: 1, name: 'The Leela Palace', location: 'New Delhi, India', rating: 4.9, reviews: 2840, price: 12500, originalPrice: 18000, category: 'Luxury', amenities: ['Wifi', 'Pool', 'Gym', 'Spa', 'Restaurant'], image: '🏰', cancellation: 'Free cancellation', tag: 'Best Value', tagColor: 'badge-emerald', rooms: 'Deluxe Room' },
  { id: 2, name: 'Zostel Bali Backpackers', location: 'Seminyak, Bali', rating: 4.5, reviews: 1230, price: 1800, originalPrice: 2200, category: 'Budget', amenities: ['Wifi', 'Pool'], image: '🏖️', cancellation: 'Free cancellation', tag: 'Popular', tagColor: 'badge-indigo', rooms: 'Dormitory Bed' },
  { id: 3, name: 'Taj Lake Palace', location: 'Udaipur, Rajasthan', rating: 5.0, reviews: 4120, price: 45000, originalPrice: 60000, category: 'Heritage', amenities: ['Wifi', 'Pool', 'Spa', 'Restaurant', 'Boat'], image: '🏯', cancellation: 'Non-refundable', tag: 'Iconic', tagColor: 'badge-amber', rooms: 'Heritage Suite' },
  { id: 4, name: 'Airbnb Cozy Studio', location: 'Goa, India', rating: 4.7, reviews: 567, price: 3200, originalPrice: 4000, category: 'Apartment', amenities: ['Wifi', 'Kitchen', 'Beach Access'], image: '🏠', cancellation: 'Free cancellation', tag: 'Trending', tagColor: 'badge-cyan', rooms: 'Entire Apartment' },
  { id: 5, name: 'W Hotels Mumbai', location: 'Bandra, Mumbai', rating: 4.8, reviews: 1890, price: 22000, originalPrice: 28000, category: 'Luxury', amenities: ['Wifi', 'Pool', 'Gym', 'Nightclub', 'Spa'], image: '🏙️', cancellation: 'Free cancellation', tag: 'Trendy', tagColor: 'badge-indigo', rooms: 'Wonderful Room' },
  { id: 6, name: 'The Himalayan Resort', location: 'Manali, HP', rating: 4.6, reviews: 987, price: 8500, originalPrice: 11000, category: 'Resort', amenities: ['Wifi', 'Mountain View', 'Fireplace', 'Trekking'], image: '🏔️', cancellation: 'Free cancellation', tag: 'Nature', tagColor: 'badge-emerald', rooms: 'Mountain Cabin' },
  { id: 7, name: 'Ritz-Carlton Bangalore', location: 'Residency Road, Bangalore', rating: 4.9, reviews: 2100, price: 18500, originalPrice: 24000, category: 'Luxury', amenities: ['Wifi', 'Pool', 'Gym', 'Spa', 'Bar'], image: '🌟', cancellation: 'Free cancellation', tag: 'Premium', tagColor: 'badge-violet', rooms: 'Deluxe King' },
  { id: 8, name: 'Treehouse Hideaway', location: 'Jaipur, Rajasthan', rating: 4.8, reviews: 734, price: 6800, originalPrice: 8500, category: 'Unique', amenities: ['Wifi', 'View', 'Breakfast', 'Nature Walk'], image: '🌳', cancellation: 'Free cancellation', tag: 'Unique', tagColor: 'badge-amber', rooms: 'Treehouse Suite' },
  { id: 9, name: 'Oyo Rooms Express', location: 'Pune, Maharashtra', rating: 3.8, reviews: 2340, price: 999, originalPrice: 1500, category: 'Budget', amenities: ['Wifi', 'AC'], image: '🏨', cancellation: 'Non-refundable', tag: 'Budget Pick', tagColor: 'badge-rose', rooms: 'Standard Room' },
];

const amenityIcons: Record<string, typeof Wifi> = { Wifi, Pool, Gym: Dumbbell, Coffee, Car };

const categories = ['All', 'Luxury', 'Budget', 'Heritage', 'Resort', 'Apartment', 'Unique'];
const sortOptions = ['Recommended', 'Price: Low to High', 'Price: High to Low', 'Rating', 'Reviews'];

function HotelsContent() {
  const searchParams = useSearchParams();
  const initialDest = searchParams.get('dest') || '';
  const [searchQuery, setSearchQuery] = useState(initialDest);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Recommended');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [minRating, setMinRating] = useState(0);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);

  const filtered = HOTELS
    .filter(h => {
      const matchSearch = !searchQuery || h.location.toLowerCase().includes(searchQuery.toLowerCase()) || h.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat = selectedCategory === 'All' || h.category === selectedCategory;
      const matchPrice = h.price >= priceRange[0] && h.price <= priceRange[1];
      const matchRating = h.rating >= minRating;
      return matchSearch && matchCat && matchPrice && matchRating;
    })
    .sort((a, b) => {
      if (sortBy === 'Price: Low to High') return a.price - b.price;
      if (sortBy === 'Price: High to Low') return b.price - a.price;
      if (sortBy === 'Rating') return b.rating - a.rating;
      if (sortBy === 'Reviews') return b.reviews - a.reviews;
      return 0;
    });

  const toggleWishlist = (id: number) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-16">
        {/* Search Header */}
        <div className="glass-heavy border-b border-white/[0.06] sticky top-16 z-40 px-6 py-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center">
              {/* Search */}
              <div className="flex-1 flex items-center gap-2 input-field">
                <Search className="w-4 h-4 text-slate-500 flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search hotels, locations..."
                  className="bg-transparent outline-none text-sm flex-1 text-slate-200 placeholder-slate-500"
                />
              </div>
              {/* Dates */}
              <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} className="input-field lg:w-40 text-sm" />
              <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} className="input-field lg:w-40 text-sm" />
              {/* Guests */}
              <div className="flex items-center gap-2 input-field lg:w-32">
                <span className="text-slate-500 text-sm">Guests:</span>
                <input type="number" min={1} max={20} value={guests} onChange={e => setGuests(+e.target.value)} className="bg-transparent outline-none text-sm w-full text-slate-200" />
              </div>
              <button className="btn-primary whitespace-nowrap">
                <Search className="w-4 h-4" /> Search
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
            <div>
              <h1 className="text-xl font-bold text-white">
                {filtered.length} Hotels Found
                {searchQuery && <span className="text-slate-400 font-normal"> for "{searchQuery}"</span>}
              </h1>
              <p className="text-sm text-slate-500">AI-curated recommendations based on your preferences</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="input-field py-2 pr-8 text-sm appearance-none cursor-pointer"
                >
                  {sortOptions.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              {/* Filters */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`btn-secondary py-2 text-sm ${showFilters ? 'border-indigo-500/40 text-indigo-300' : ''}`}
              >
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </button>
              {/* View Toggle */}
              <div className="flex glass rounded-lg overflow-hidden border border-white/[0.06]">
                <button onClick={() => setViewMode('grid')} className={`p-2 transition-all ${viewMode === 'grid' ? 'bg-indigo-600/30 text-indigo-300' : 'text-slate-500 hover:text-white'}`}>
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button onClick={() => setViewMode('map')} className={`p-2 transition-all ${viewMode === 'map' ? 'bg-indigo-600/30 text-indigo-300' : 'text-slate-500 hover:text-white'}`}>
                  <Map className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                  selectedCategory === cat
                    ? 'gradient-primary text-white border-transparent'
                    : 'glass-light border-white/[0.08] text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="glass-card p-6 mb-6 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-3 block">Price Range</label>
                  <div className="flex items-center gap-3">
                    <input type="number" value={priceRange[0]} onChange={e => setPriceRange([+e.target.value, priceRange[1]])} className="input-field py-2 text-sm" placeholder="Min" />
                    <span className="text-slate-500">—</span>
                    <input type="number" value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], +e.target.value])} className="input-field py-2 text-sm" placeholder="Max" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-3 block">Minimum Rating</label>
                  <div className="flex gap-2">
                    {[0, 3, 3.5, 4, 4.5].map(r => (
                      <button key={r} onClick={() => setMinRating(r)}
                        className={`px-3 py-2 rounded-lg text-sm border transition-all ${minRating === r ? 'bg-indigo-600/30 border-indigo-500/40 text-indigo-300' : 'glass-light border-white/[0.08] text-slate-400 hover:text-white'}`}>
                        {r === 0 ? 'Any' : `${r}+`}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-3 block">Cancellation</label>
                  <div className="flex gap-2 flex-wrap">
                    {['Any', 'Free cancellation'].map(c => (
                      <button key={c} className="px-3 py-2 rounded-lg text-sm border glass-light border-white/[0.08] text-slate-400 hover:text-white transition-all">
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI Recommendations Banner */}
          <div className="glass-card p-4 mb-6 flex items-center gap-4 border-indigo-500/20">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white">AI Recommendation</p>
              <p className="text-xs text-slate-400">Based on your travel history, we think you'd love heritage properties with modern amenities. Here are the top picks!</p>
            </div>
            <button className="btn-secondary py-2 text-xs whitespace-nowrap">View Picks</button>
          </div>

          {/* Hotel Grid */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((hotel, i) => (
                <div key={hotel.id} className={`glass-card p-0 overflow-hidden group animate-fade-in`} style={{ animationDelay: `${i * 0.05}s` }}>
                  {/* Image */}
                  <div className="relative h-52 flex items-center justify-center text-7xl cursor-pointer"
                    style={{ background: 'linear-gradient(135deg, rgba(12,12,28,0.8) 0%, rgba(20,20,40,0.6) 100%)' }}>
                    {hotel.image}
                    <span className={`absolute top-3 left-3 badge ${hotel.tagColor} text-xs`}>{hotel.tag}</span>
                    <button
                      onClick={() => toggleWishlist(hotel.id)}
                      className={`absolute top-3 right-3 w-8 h-8 rounded-full glass flex items-center justify-center transition-all ${wishlist.includes(hotel.id) ? 'text-rose-400' : 'text-slate-400 hover:text-rose-400'}`}
                    >
                      <Heart className={`w-4 h-4 ${wishlist.includes(hotel.id) ? 'fill-rose-400' : ''}`} />
                    </button>
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="text-xs text-slate-400 bg-black/40 px-2 py-1 rounded-md">{hotel.rooms}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-white group-hover:text-indigo-300 transition-colors truncate">{hotel.name}</h3>
                        <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                          <MapPin className="w-3 h-3" />
                          {hotel.location}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 ml-3 flex-shrink-0">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-sm font-bold text-white">{hotel.rating}</span>
                        <span className="text-xs text-slate-500">({hotel.reviews.toLocaleString()})</span>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="flex gap-1.5 mb-4 flex-wrap">
                      {hotel.amenities.slice(0, 4).map(a => (
                        <span key={a} className="text-xs px-2 py-0.5 rounded-md glass-light border border-white/[0.06] text-slate-400">{a}</span>
                      ))}
                      {hotel.amenities.length > 4 && <span className="text-xs text-slate-500">+{hotel.amenities.length - 4}</span>}
                    </div>

                    <div className="flex items-center gap-1.5 mb-4">
                      <Check className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                      <span className="text-xs text-emerald-400">{hotel.cancellation}</span>
                    </div>

                    {/* Price + CTA */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-black text-white">₹{hotel.price.toLocaleString()}</span>
                          <span className="text-sm text-slate-500 line-through">₹{hotel.originalPrice.toLocaleString()}</span>
                        </div>
                        <span className="text-xs text-slate-500">per night</span>
                      </div>
                      <Link href={`/hotels/${hotel.id}`} className="btn-primary py-2 px-5 text-sm">
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card p-8 text-center min-h-96 flex items-center justify-center">
              <div>
                <Map className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 font-medium">Map View</p>
                <p className="text-sm text-slate-500 mt-2">Interactive map with hotel markers coming soon.</p>
                <p className="text-sm text-slate-500">Showing {filtered.length} hotels in selected area.</p>
              </div>
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <Hotel className="w-16 h-16 text-slate-700 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-400 mb-2">No hotels found</h3>
              <p className="text-slate-500 text-sm">Try adjusting your filters or search query</p>
              <button onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setMinRating(0); }} className="btn-primary mt-4">
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function HotelsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-slate-400">Loading...</div></div>}>
      <HotelsContent />
    </Suspense>
  );
}
