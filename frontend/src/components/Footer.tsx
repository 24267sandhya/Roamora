'use client';
import Link from 'next/link';
import { Compass, Globe, Mail, ArrowRight, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative mt-auto border-t border-white/[0.06]" style={{ background: 'rgba(4, 4, 13, 0.95)' }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text" style={{ fontFamily: "'Outfit', sans-serif" }}>Roamora</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              The AI-native travel operating system. Plan, book, and manage complete travel experiences — all in one platform.
            </p>
            {/* Newsletter */}
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="input-field flex-1 py-2.5 text-sm"
              />
              <button className="btn-primary px-4 py-2.5 text-sm">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2.5">
              {['AI Planner', 'Hotel Booking', 'Vehicle Rental', 'Live Dashboard', 'Group Planning'].map(l => (
                <li key={l}><Link href="#" className="text-sm text-slate-400 hover:text-white transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2.5">
              {['About Us', 'Blog', 'Careers', 'Press Kit', 'Partners'].map(l => (
                <li key={l}><Link href="#" className="text-sm text-slate-400 hover:text-white transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2.5">
              {['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(l => (
                <li key={l}><Link href="#" className="text-sm text-slate-400 hover:text-white transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">© 2025 Roamora. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {[Globe, MessageCircle, Mail].map((Icon, i) => (
              <button key={i} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:text-white hover:bg-white/[0.06] transition-all">
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
