'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { 
  Shield, 
  Swords, 
  Sparkles, 
  Layers, 
  Camera,
  ExternalLink,
  Compass,
  Menu,
  X
} from 'lucide-react';
import { useSimulatorStore } from '@/store/useSimulatorStore';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const setOcrModalOpen = useSimulatorStore((state) => state.setOcrModalOpen);

  const navLinks = [
    { 
      name: 'Trang Chủ Wiki', 
      href: '/', 
      icon: Sparkles 
    },
    { 
      name: 'Giả Lập Build', 
      sub: '(10 Đồ + 6 Nội Công)',
      href: '/simulator', 
      icon: Layers, 
      badge: 'PRO',
      badgeClass: 'bg-crimson text-white border-crimson-bright/40 shadow-sm'
    },
    { 
      name: 'Thiên Cơ Ngọc Hạch', 
      sub: '(Thần Khí)',
      href: '/thien-co-ngoc-hach', 
      icon: Compass, 
      badge: 'MỚI',
      badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm'
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gold/20 bg-ink-950/85 backdrop-blur-md">
      <div className="max-w-[1680px] mx-auto px-4 h-16 flex items-center justify-between gap-3">
        {/* Left: Brand Logo */}
        <div className="flex-1 flex items-center justify-start min-w-0">
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 rounded border border-gold/40 bg-gradient-to-br from-gold/20 via-ink-850 to-ink-950 flex items-center justify-center text-gold shadow-gold-glow group-hover:border-gold transition-all">
              <Swords className="w-5 h-5 text-gold-bright" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-bold tracking-wider text-gold-bright">NIÊN DU</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-gold/15 text-gold border border-gold/30">V2.0 PRO</span>
              </div>
              <span className="text-[10px] text-ink-300 font-sans tracking-tight hidden sm:inline">Nghịch Thủy Hàn • Cẩm Nang & Giả Lập</span>
            </div>
          </Link>
        </div>

        {/* Center: 3 Main Tabs Navigation (Perfect Center & Symmetry) */}
        <div className="shrink-0 flex items-center justify-center">
          <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-xl border border-gold/20 bg-ink-900/80 shadow-md backdrop-blur">
            {navLinks.map((tab) => {
              const isActive = pathname === tab.href;
              const Icon = tab.icon;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs lg:text-sm font-medium transition-all border ${
                    isActive
                      ? 'bg-gradient-to-r from-gold/25 via-gold/15 to-gold/25 text-gold-bright border-gold/50 shadow-gold-glow font-bold'
                      : 'border-transparent text-ink-200 hover:text-gold hover:bg-ink-800/60 hover:border-gold/25'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-gold-bright' : 'text-ink-400'}`} />
                  <span className="whitespace-nowrap">{tab.name}</span>
                  {tab.sub && (
                    <span className="text-[11px] font-normal text-ink-400 hidden xl:inline whitespace-nowrap">
                      {tab.sub}
                    </span>
                  )}
                  {tab.badge && (
                    <span className={`text-[9px] font-mono px-1.5 py-0.5 leading-none rounded-full border shrink-0 ${
                      tab.badgeClass
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: Actions Cluster */}
        <div className="flex-1 flex items-center justify-end gap-2 sm:gap-3 min-w-0">
          {/* Quick OCR Trigger */}
          <button
            onClick={() => setOcrModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-gold/30 bg-ink-800/60 hover:bg-gold/15 hover:border-gold text-xs font-mono text-gold-bright transition-all"
            title="Quét ảnh chụp trang bị từ game (Ctrl+V)"
          >
            <Camera className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Quét Ảnh</span>
          </button>

          {/* Quick Build Button */}
          <Link
            href="/simulator"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-gradient-to-r from-gold via-gold-bright to-gold text-ink-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:brightness-110 transition-all shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tạo Build</span>
          </Link>

          {/* Official VNG Link */}
          <a
            href="https://nghichthuyhan.vnggames.com/"
            target="_blank"
            rel="noreferrer"
            className="hidden xl:flex items-center gap-1 px-2.5 py-1.5 text-xs text-ink-300 hover:text-gold border border-ink-600 rounded hover:border-gold/40 transition-colors shrink-0"
          >
            <span>Trang Chủ Game</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-gold/30 bg-ink-800/80 text-gold hover:bg-gold/15 transition-all"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gold/20 bg-ink-950/95 px-4 py-3 space-y-2 backdrop-blur-lg">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((tab) => {
              const isActive = pathname === tab.href;
              const Icon = tab.icon;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all border ${
                    isActive
                      ? 'bg-gradient-to-r from-gold/25 via-gold/15 to-gold/25 text-gold-bright border-gold/50 shadow-gold-glow font-bold'
                      : 'border-transparent text-ink-200 hover:text-gold hover:bg-ink-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-gold-bright' : 'text-ink-400'}`} />
                    <span>{tab.name}</span>
                    {tab.sub && (
                      <span className="text-xs text-ink-400 font-normal">{tab.sub}</span>
                    )}
                  </div>
                  {tab.badge && (
                    <span className={`text-[9px] font-mono px-2 py-0.5 leading-none rounded-full border ${tab.badgeClass}`}>
                      {tab.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
