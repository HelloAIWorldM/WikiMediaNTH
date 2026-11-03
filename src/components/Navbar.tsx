'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { 
  Shield, 
  Swords, 
  BookOpen, 
  Users, 
  Sparkles, 
  Search, 
  Layers, 
  FileCode2, 
  Camera,
  ExternalLink,
  Compass
} from 'lucide-react';
import { useSimulatorStore } from '@/store/useSimulatorStore';

export default function Navbar() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const setOcrModalOpen = useSimulatorStore((state) => state.setOcrModalOpen);

  const navLinks = [
    { name: 'Trang Chủ Wiki', href: '/', icon: Sparkles },
    { name: 'Giả Lập Build (10 Đồ + 6 Nội Công)', href: '/simulator', icon: Layers, badge: 'PRO' },
    { name: 'Thiên Cơ Ngọc Hạch', href: '/thien-co-ngoc-hach', icon: Compass, badge: 'MỚI' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gold/20 bg-ink-950/85 backdrop-blur-md">
      <div className="max-w-[1680px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-10 h-10 rounded border border-gold/40 bg-gradient-to-br from-gold/20 via-ink-850 to-ink-950 flex items-center justify-center text-gold shadow-gold-glow group-hover:border-gold transition-all">
            <Swords className="w-5 h-5 text-gold-bright" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg font-bold tracking-wider text-gold-bright">NIÊN DU</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-gold/15 text-gold border border-gold/30">V2.0 PRO</span>
            </div>
            <span className="text-[10px] text-ink-300 font-sans tracking-tight">Nghịch Thủy Hàn • Cẩm Nang & Giả Lập</span>
          </div>
        </Link>

        {/* 4 Main Tabs Navigation */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-lg border border-gold/15 bg-ink-900/60">
          {navLinks.map((tab) => {
            const isActive = pathname === tab.href;
            const Icon = tab.icon;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`relative flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-gold/25 via-gold/15 to-gold/25 text-gold-bright border border-gold/40 shadow-gold-glow'
                    : 'text-ink-200 hover:text-gold hover:bg-ink-800/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-gold-bright' : 'text-ink-400'}`} />
                <span>{tab.name}</span>
                {tab.badge && (
                  <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-crimson text-white' : 'bg-gold/20 text-gold-bright border border-gold/30'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Cluster (NO Hỏi Tiểu Hàn AI!) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick OCR Trigger */}
          <button
            onClick={() => setOcrModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-gold/30 bg-ink-800/60 hover:bg-gold/15 hover:border-gold text-xs font-mono text-gold-bright transition-all"
            title="Quét ảnh chụp trang bị từ game (Ctrl+V)"
          >
            <Camera className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Quét Ảnh (Ctrl+V)</span>
          </button>

          {/* Quick Build Button */}
          <Link
            href="/simulator"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-gradient-to-r from-gold via-gold-bright to-gold text-ink-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:brightness-110 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tạo Build</span>
          </Link>

          {/* Official VNG Link */}
          <a
            href="https://nghichthuyhan.vnggames.com/"
            target="_blank"
            rel="noreferrer"
            className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 text-xs text-ink-300 hover:text-gold border border-ink-600 rounded hover:border-gold/40 transition-colors"
          >
            <span>Trang Chủ Game</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </header>
  );
}

