'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  Compass, Map, Hotel, Car, LayoutDashboard, MessageSquare,
  Users, BookMarked, Zap, Menu, X, Bell, User, Search,
  ChevronDown, Globe, Sparkles
} from 'lucide-react';

const navItems = [
  { href: '/planner', label: 'AI Planner', icon: Sparkles },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/hotels', label: 'Hotels', icon: Hotel },
  { href: '/vehicles', label: 'Vehicles', icon: Car },
  { href: '/live', label: 'Live Travel', icon: Zap },
  { href: '/assistant', label: 'AI Assistant', icon: MessageSquare },
  { href: '/group', label: 'Group Plan', icon: Users },
  { href: '/bookings', label: 'Bookings', icon: BookMarked },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLanding = pathname === '/';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || !isLanding
            ? 'glass-heavy border-b border-white/[0.06]'
            : 'bg-transparent'
        }`}
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Compass className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold gradient-text" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Roamora
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      active
                        ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/20'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Notification Bell */}
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-slate-900 animate-pulse" />
              </button>

              {/* Profile */}
              <Link
                href="/auth/login"
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg glass-light border border-white/[0.08] text-sm font-medium text-slate-300 hover:text-white hover:border-white/20 transition-all"
              >
                <User className="w-3.5 h-3.5" />
                Sign In
              </Link>

              <Link href="/auth/signup" className="hidden sm:block btn-primary py-1.5 px-4 text-sm">
                Get Started
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden glass-heavy border-t border-white/[0.06] animate-fade-in">
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      active
                        ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/20'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
              <div className="pt-3 flex gap-2 border-t border-white/[0.06]">
                <Link href="/auth/login" className="flex-1 btn-secondary text-center py-2 text-sm justify-center">Sign In</Link>
                <Link href="/auth/signup" className="flex-1 btn-primary text-center py-2 text-sm justify-center">Get Started</Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Notification Panel */}
      {notifOpen && (
        <div className="fixed top-20 right-4 z-50 w-80 glass-heavy rounded-xl border border-white/[0.08] shadow-2xl animate-scale-in">
          <div className="p-4 border-b border-white/[0.06]">
            <h3 className="font-semibold text-sm text-white">Notifications</h3>
          </div>
          <div className="p-2 space-y-1 max-h-64 overflow-y-auto">
            {[
              { msg: 'Your Bali itinerary is ready', time: '2m ago', color: 'bg-indigo-500' },
              { msg: 'Hotel booking confirmed', time: '1h ago', color: 'bg-emerald-500' },
              { msg: 'Flight alert: Prices dropped 15%', time: '3h ago', color: 'bg-amber-500' },
            ].map((n, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/[0.03] cursor-pointer transition-all">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.color}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-300">{n.msg}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Click outside to close notifications */}
      {notifOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
      )}
    </>
  );
}
