'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Swords, 
  BookOpen, 
  Shield, 
  Hammer, 
  Zap, 
  Compass, 
  Skull, 
  Crosshair, 
  Heart, 
  Flame, 
  Map, 
  ListTodo, 
  Scroll, 
  Calendar, 
  Sliders, 
  ChevronRight, 
  Users, 
  Search,
  CheckCircle2,
  Layers,
  ArrowRight
} from 'lucide-react';
import { 
  SECTS_DETAILED_DATA, 
  WIKI_CATEGORIES, 
  SectDetail
} from '@/data/wikiData';
import { useSimulatorStore } from '@/store/useSimulatorStore';

const CATEGORY_ICONS: Record<string, any> = {
  Sparkles,
  Swords,
  BookOpen,
  Shield,
  Hammer,
  Zap,
  Compass,
  Skull,
  Crosshair,
  Heart,
  Flame,
  Map,
  ListTodo,
  Scroll,
  Calendar,
  Sliders,
  Pickaxe: Hammer
};

export default function HomePage() {
  const [selectedSectSlug, setSelectedSectSlug] = useState<string>("to-van");
  const [sidebarFilter, setSidebarFilter] = useState<string>("");
  const setOcrModalOpen = useSimulatorStore((state) => state.setOcrModalOpen);
  const setSelectedSect = useSimulatorStore((state) => state.setSelectedSect);

  const currentSect: SectDetail = 
    SECTS_DETAILED_DATA.find((s) => s.slug === selectedSectSlug) || SECTS_DETAILED_DATA[0];

  const filteredCategories = WIKI_CATEGORIES.filter((c) =>
    c.name.toLowerCase().includes(sidebarFilter.toLowerCase())
  );

  return (
    <div className="w-full space-y-6 pb-16">
      {/* 3-Column Wiki Grid Matching wikinghichthuyhan.com */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* ===================== CỘT 1 (TRÁI - 2.5 cols ~ 240px): MỤC LỤC WIKI ===================== */}
        <aside className="lg:col-span-3 space-y-3">
          <div className="rounded-xl border border-gold/25 bg-ink-900/90 shadow-md p-3.5 space-y-3 sticky top-20">
            {/* Header & Filter */}
            <div className="space-y-2 pb-2 border-b border-ink-800">
              <span className="text-[10px] font-mono uppercase tracking-wider text-ink-400 block font-bold">
                Mục Lục Wiki
              </span>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-ink-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Lọc mục lục..."
                  value={sidebarFilter}
                  onChange={(e) => setSidebarFilter(e.target.value)}
                  className="w-full pl-8 pr-2.5 py-1.5 rounded-lg border border-ink-700 bg-ink-950 text-xs text-white placeholder-ink-500 outline-none focus:border-gold"
                />
              </div>
            </div>

            {/* Sidebar Category Links */}
            <nav className="space-y-0.5 max-h-[70vh] overflow-y-auto pr-1 text-xs">
              <Link
                href="/"
                className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-gold/15 text-gold-bright font-serif font-bold border border-gold/30"
              >
                <span>Trang chủ</span>
                <span className="text-[10px] font-mono text-gold">Wiki</span>
              </Link>

              {/* 7 Sects submenu */}
              <div className="pt-1.5 pb-1">
                <span className="px-2.5 text-[10px] font-mono text-ink-400 block mb-1">
                  • 7 Đại Lưu Phái
                </span>
                <div className="space-y-0.5 pl-3 border-l border-ink-800 ml-2">
                  {SECTS_DETAILED_DATA.map((s) => (
                    <button
                      key={s.slug}
                      type="button"
                      onClick={() => setSelectedSectSlug(s.slug)}
                      className={`w-full flex items-center justify-between px-2 py-1 rounded text-[11px] text-left transition-colors ${
                        selectedSectSlug === s.slug
                          ? 'text-gold-bright bg-ink-800 font-bold'
                          : 'text-ink-300 hover:text-white hover:bg-ink-850'
                      }`}
                    >
                      <span className="truncate">{s.name}</span>
                      {s.isNew && (
                        <span className="text-[9px] font-mono px-1 rounded bg-crimson text-white">MỚI</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Topics list */}
              {filteredCategories.map((cat) => {
                const IconComponent = CATEGORY_ICONS[cat.icon] || BookOpen;
                return (
                  <Link
                    key={cat.id}
                    href={cat.slug === 'pho-ban' ? '/guide' : cat.slug === 'trang-bi-noi-cong' ? '/simulator' : `#topic-${cat.id}`}
                    className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-ink-300 hover:text-gold hover:bg-ink-850 transition-colors group"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <IconComponent className="w-3.5 h-3.5 text-ink-400 group-hover:text-gold shrink-0" />
                      <span className="truncate">{cat.name}</span>
                    </div>
                    <span className="text-[10px] font-mono text-ink-500 shrink-0">
                      {cat.count}
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Quick Action in Sidebar */}
            <div className="pt-2 border-t border-ink-800 space-y-1.5">
              <Link
                href="/simulator"
                className="w-full py-2 rounded-lg bg-gradient-to-r from-gold/20 via-gold/10 to-gold/20 hover:from-gold/30 hover:to-gold/30 text-gold-bright border border-gold/40 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Giả Lập Build (10 Đồ + 6 Nội Công)</span>
              </Link>
            </div>
          </div>
        </aside>

        {/* ===================== CỘT 2 (GIỮA - 6.5 cols): NỘI DUNG CHÍNH WIKI ===================== */}
        <main className="lg:col-span-6 space-y-6">
          {/* Header Title & Live Counter */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono text-ink-400">
              <span>Wiki cộng đồng Nghịch Thủy Hàn Mobile</span>
              <span>•</span>
              <span className="text-gold">Patch v1.3.3</span>
              <span>•</span>
              <span>02/10/2026</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Wiki Nghịch Thủy Hàn
            </h1>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-mono text-ink-300 pt-0.5">
              <span><strong>12,825</strong> bài viết</span>
              <span>•</span>
              <span><strong>8</strong> chuyên mục chính</span>
              <span>•</span>
              <span className="text-gold-bright"><strong>7</strong> lưu phái</span>
              <span>•</span>
              <span><strong>248</strong> người đóng góp</span>
            </div>
          </div>

          {/* SECTION 1: — LƯU PHÁI & CHARACTER RADAR SHOWCASE */}
          <section className="space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-ink-800">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-0.5 bg-gold inline-block" />
                <h2 className="font-serif text-lg font-bold text-white">Lưu phái</h2>
              </div>
              <span className="text-xs text-ink-400">Chọn lưu phái để xem build, kỹ năng, cốt truyện</span>
            </div>

            {/* Active Sect Rich Card with Artwork & SVG Hexagonal Radar */}
            <div className="rounded-2xl border border-gold/40 bg-gradient-to-b from-ink-850 via-ink-900 to-ink-950 p-4 sm:p-5 shadow-gold-glow space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                {/* Character Art Preview (5 cols) */}
                <div className="md:col-span-5 flex flex-col items-center justify-center relative min-h-[220px] border border-gold/25 rounded-xl bg-ink-950/80 p-2 overflow-hidden group">
                  <img
                    src={currentSect.imageUrl}
                    alt={currentSect.name}
                    className="max-h-60 object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-ink-950/90 border border-gold/30 text-[10px] font-mono text-gold-bright">
                    {currentSect.name}
                  </div>
                </div>

                {/* Sect Details & Pros/Cons (7 cols) */}
                <div className="md:col-span-7 space-y-2.5">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
                      <span>{currentSect.name}</span>
                      {currentSect.isNew && (
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-crimson text-white">MỚI</span>
                      )}
                    </h3>
                    <div className="text-xs text-ink-300 space-y-0.5 font-mono pt-1">
                      <div>Vũ khí: <strong className="text-white">{currentSect.weapon}</strong></div>
                      <div>Môn phái: <span className="text-gold-soft">{currentSect.sect}</span></div>
                      <div>Độ khó: <span className="text-amber-400 font-bold">{currentSect.difficulty}</span></div>
                    </div>
                  </div>

                  <p className="text-xs text-ink-200 leading-relaxed">
                    {currentSect.desc}
                  </p>

                  {/* Pros & Cons */}
                  <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                    <div className="p-2 rounded bg-emerald-950/30 border border-emerald-500/20 space-y-1">
                      <span className="font-bold text-emerald-400 block font-mono text-[10px]">Ưu điểm:</span>
                      {currentSect.pros.map((p, i) => (
                        <div key={i} className="text-ink-200 leading-tight">• {p}</div>
                      ))}
                    </div>
                    <div className="p-2 rounded bg-rose-950/30 border border-rose-500/20 space-y-1">
                      <span className="font-bold text-rose-400 block font-mono text-[10px]">Nhược điểm:</span>
                      {currentSect.cons.map((c, i) => (
                        <div key={i} className="text-ink-200 leading-tight">• {c}</div>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {currentSect.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-ink-800 text-ink-300 text-[10px] font-mono border border-ink-700">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action Link to Simulator */}
                  <div className="pt-2">
                    <Link
                      href={`/simulator?sect=${encodeURIComponent(currentSect.name)}`}
                      onClick={() => setSelectedSect(currentSect.name)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-gold text-ink-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:brightness-110 transition-all"
                    >
                      <span>Vào Simulator Build {currentSect.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* 7 Sects Emblems Row */}
              <div className="grid grid-cols-7 gap-2 pt-2 border-t border-ink-800">
                {SECTS_DETAILED_DATA.map((s) => {
                  const isSelected = selectedSectSlug === s.slug;
                  return (
                    <button
                      key={s.slug}
                      type="button"
                      onClick={() => setSelectedSectSlug(s.slug)}
                      className={`p-2 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                        isSelected
                          ? 'border-gold bg-gold/20 shadow-gold-glow scale-105'
                          : 'border-ink-800 bg-ink-950/80 hover:border-gold/40 hover:bg-ink-900'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full border border-gold/30 bg-ink-900 flex items-center justify-center overflow-hidden">
                        <img src={s.iconUrl} alt={s.name} className="w-8 h-8 object-contain" />
                      </div>
                      <span className={`text-[11px] font-serif font-bold truncate ${
                        isSelected ? 'text-gold-bright' : 'text-ink-300'
                      }`}>
                        {s.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* SECTION 2: — CHỦ ĐỀ CỐT LÕI */}
          <section className="space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-ink-800">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-0.5 bg-gold inline-block" />
                <h2 className="font-serif text-lg font-bold text-white">Chuyên Mục Wiki</h2>
              </div>
              <span className="text-xs font-mono text-ink-400">
                {WIKI_CATEGORIES.length} chuyên mục • <strong className="text-gold-soft font-bold">Tối ưu cho Build & Trang Bị</strong>
              </span>
            </div>

            {/* Grid of Categories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {WIKI_CATEGORIES.map((cat) => {
                const IconComponent = CATEGORY_ICONS[cat.icon] || BookOpen;
                return (
                  <Link
                    key={cat.id}
                    id={`topic-${cat.id}`}
                    href="/simulator"
                    className="p-3.5 rounded-xl border border-ink-800 bg-ink-900/80 hover:border-l-4 hover:border-l-gold hover:border-gold/50 hover:bg-ink-850 transition-all space-y-1.5 shadow-sm group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
                          <IconComponent className="w-3.5 h-3.5" />
                        </div>
                        <h3 className="font-serif text-sm font-bold text-gold-soft group-hover:text-gold-bright transition-colors">
                          {cat.name}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs text-ink-300 leading-relaxed line-clamp-2">
                      {cat.desc}
                    </p>

                    <div className="text-[10px] font-mono text-ink-500 pt-1 border-t border-ink-800/60">
                      {cat.count} mục
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </main>

        {/* ===================== CỘT 3 (PHẢI - 3 cols ~ 280-300px): UTILITY WIDGETS ===================== */}
        <aside className="lg:col-span-3 space-y-4">
          {/* Card 1: PATCH MỚI NHẤT */}
          <div className="p-4 rounded-xl border border-gold/25 bg-ink-900/90 shadow-md space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-ink-400 block font-bold">
              PATCH MỚI NHẤT
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-ink-300 font-mono">version</span>
              <span className="font-mono text-gold-bright font-bold">v1.3.3</span>
            </div>
            <div className="flex items-baseline justify-between pb-2 border-b border-ink-800">
              <span className="text-xs text-ink-300 font-mono">phát hành</span>
              <span className="font-mono text-ink-300 text-xs">02/10/2026</span>
            </div>
            <Link
              href="/simulator"
              className="text-xs text-gold hover:underline inline-flex items-center gap-1 font-mono pt-1"
            >
              <span>Xem cập nhật Build & Trang Bị</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Card 2: CÔNG CỤ BUILD & GIẢ LẬP NHÂN VẬT */}
          <div className="p-4 rounded-xl border border-gold/40 bg-gradient-to-b from-ink-850 via-ink-900 to-ink-950 shadow-gold-glow space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-gold-bright font-bold">
                GIẢ LẬP TOÀN DIỆN
              </span>
              <span className="text-[9px] font-mono px-1.5 rounded bg-gold/20 text-gold-bright border border-gold/40">v2.0 PRO</span>
            </div>
            <p className="text-xs text-ink-300 leading-relaxed">
              Trang bị 10 món đồ, phối 6 viên Nội Công, kiểm tra Chu Thiên Ngũ Hành và ước tính DPS theo thời gian thực.
            </p>
            <div className="space-y-1.5 pt-1">
              <Link
                href="/simulator"
                className="w-full py-2 rounded-lg bg-gradient-to-r from-gold via-gold-bright to-gold text-ink-950 text-xs font-mono font-bold flex items-center justify-center gap-1.5 shadow-gold-glow hover:brightness-110 transition-all"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Mở Giả Lập Build</span>
              </Link>
              <button
                type="button"
                onClick={() => setOcrModalOpen(true)}
                className="w-full py-2 rounded-lg bg-ink-950 border border-gold/30 hover:border-gold text-gold-bright text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Bóc Tách Chỉ Số Từ Ảnh (OCR)</span>
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
