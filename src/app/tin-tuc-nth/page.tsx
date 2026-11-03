'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ChevronRight, 
  Compass, 
  Newspaper, 
  Calendar, 
  ExternalLink, 
  Search, 
  Eye, 
  X, 
  Flame,
  ArrowRight
} from 'lucide-react';
import { VNG_NEWS_ARTICLES, NewsArticle } from '@/data/newsData';

const CATEGORY_TABS = [
  { id: 'danh-sach', name: 'Mới nhất' },
  { id: 'news', name: 'Tin tức' },
  { id: 'event', name: 'Sự Kiện' },
  { id: 'inform', name: 'Thông Báo' },
  { id: 'guide', name: 'Tân Thủ' },
];

const ITEMS_PER_PAGE = 4;

export default function TinTucNTHPage() {
  const [activeTab, setActiveTab] = useState<string>('danh-sach');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  // Filtered articles based on active tab and search query
  const filteredArticles = useMemo(() => {
    let result = VNG_NEWS_ARTICLES;

    if (activeTab !== 'danh-sach') {
      result = result.filter((item) => {
        if (activeTab === 'news') return item.tab === 'news' || item.category.toLowerCase().includes('tin');
        if (activeTab === 'event') return item.tab === 'event' || item.category.toLowerCase().includes('sự kiện') || item.category.toLowerCase().includes('su kien');
        if (activeTab === 'inform') return item.tab === 'inform' || item.category.toLowerCase().includes('thông báo') || item.category.toLowerCase().includes('thong bao');
        if (activeTab === 'guide') return item.tab === 'guide' || item.category.toLowerCase().includes('tân thủ') || item.category.toLowerCase().includes('hướng dẫn');
        return true;
      });
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.excerpt.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      );
    }

    return result;
  }, [activeTab, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / ITEMS_PER_PAGE));

  const currentArticles = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredArticles.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredArticles, currentPage]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 180, behavior: 'smooth' });
    }
  };

  // Generate page numbers window (e.g. 1 2 3 4 5)
  const pageNumbers = useMemo(() => {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }, [currentPage, totalPages]);

  return (
    <div className="w-full max-w-[1240px] xl:max-w-[1280px] mx-auto space-y-5 pb-16">
      {/* Breadcrumb Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border border-gold/20 bg-ink-900/80 backdrop-blur shadow-lg">
        <div className="flex items-center gap-2 text-xs text-ink-300 flex-wrap">
          <Link href="/" className="hover:text-gold transition-colors flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Trang Chủ Wiki</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-ink-600" />
          <Link href="/thien-co-ngoc-hach" className="hover:text-gold transition-colors">
            Thiên Cơ Ngọc Hạch
          </Link>
          <ChevronRight className="w-3 h-3 text-ink-600" />
          <span className="text-gold-bright font-serif font-bold">Tin Tức NTH · VNG Official</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            Tin Tức Mới Nhất
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
            {filteredArticles.length} Bài Viết
          </span>
        </div>
      </div>

      {/* Main Authentic VNG News Section */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#91b1c8]/30 min-h-[920px] bg-[#0c1825]">
        {/* Authentic Background with Misty Clouds & Lanterns */}
        <div 
          className="absolute inset-0 bg-cover bg-top pointer-events-none opacity-85"
          style={{ backgroundImage: `url('/images/news/bg.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sky-950/40 via-transparent to-ink-950/80 pointer-events-none" />

        {/* Content Container */}
        <div className="relative z-10 px-5 sm:px-10 lg:px-16 pt-10 pb-16">
          {/* Header Row: Title & Tabs (Matching 100% Image 1) */}
          <div className="relative pb-4 border-b border-[#91b1c8]/60 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            {/* Left Title */}
            <div className="flex items-center gap-3">
              {/* Stylized Cyan Paper Crane / Arrow Icon */}
              <svg 
                className="w-7 h-7 text-[#7ec2e5] shrink-0" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polygon points="3 3 21 12 3 21 7 12 3 3" />
              </svg>
              <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-serif font-black tracking-wider text-white uppercase flex items-baseline gap-2.5">
                <span>THÔNG TIN</span>
                <span className="text-xl sm:text-2xl text-[#8ec8e8] font-normal tracking-wide lowercase first-letter:uppercase">
                  Tin tức
                </span>
              </h1>
            </div>

            {/* Right Tabs */}
            <nav className="flex items-center gap-6 sm:gap-8 flex-wrap">
              {CATEGORY_TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`relative text-sm sm:text-base font-bold uppercase tracking-wider transition-all duration-200 ${
                      isActive 
                        ? 'text-white' 
                        : 'text-[#4a7794] hover:text-[#91c5e6]'
                    }`}
                  >
                    <span>{tab.name}</span>
                    {isActive && (
                      <span className="absolute -bottom-4 left-0 w-full h-[2.5px] bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick Search Bar */}
          <div className="mt-5 mb-4 flex items-center justify-between gap-4">
            <div className="relative w-full max-w-xs">
              <Search className="w-4 h-4 text-[#608aa7] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm bài viết, sự kiện..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-[#91b1c8]/40 bg-[#0c1825]/80 text-xs sm:text-sm text-white placeholder-[#54738d] outline-none focus:border-[#7ec2e5] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#608aa7] hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <span className="text-xs font-mono text-[#54738d] hidden sm:inline">
              Trang {currentPage} / {totalPages} • ({filteredArticles.length} bài)
            </span>
          </div>

          {/* News List Container */}
          <div className="min-h-[580px] mt-4">
            {currentArticles.length === 0 ? (
              <div className="text-center py-20 space-y-3">
                <p className="text-2xl text-[#3d6a93] font-serif">Chưa có bài viết nào trong mục này</p>
                <button
                  onClick={() => {
                    setActiveTab('danh-sach');
                    setSearchQuery('');
                  }}
                  className="px-4 py-1.5 rounded-lg bg-[#4a7794]/30 hover:bg-[#4a7794]/50 text-white text-xs font-mono transition-colors"
                >
                  Xem tất cả bài viết
                </button>
              </div>
            ) : (
              <ul className="space-y-4">
                {currentArticles.map((article) => {
                  return (
                    <li key={article.id} className="relative group">
                      {/* Background Hover Highlight Bar (Using sprite or subtle gradient) */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/[0.04] via-sky-200/[0.12] to-white/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-transparent group-hover:border-[#91b1c8]/30 shadow-sm" />

                      <div 
                        onClick={() => setSelectedArticle(article)}
                        className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-4 sm:gap-6 p-3 sm:p-4 rounded-xl cursor-pointer"
                      >
                        {/* Thumbnail Image (250px x 130px) */}
                        <div className="w-full md:w-[250px] h-[140px] md:h-[130px] shrink-0 rounded-lg overflow-hidden border border-[#91b1c8]/40 bg-[#0e2133] shadow-md group-hover:shadow-cyan-900/40 transition-all">
                          <img
                            src={article.image || '/images/thankhi/thankhi-satvi.jpg'}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                            onError={(e) => {
                              // Fallback image if external image fails
                              (e.target as HTMLImageElement).src = '/images/news/bg.jpg';
                            }}
                          />
                        </div>

                        {/* Article Details */}
                        <div className="flex-1 min-w-0 space-y-2 pr-0 md:pr-24">
                          {/* Category Badge & Date */}
                          <div className="flex items-center gap-3">
                            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider text-white bg-[#c5ae7e] shadow-sm">
                              {article.category}
                            </span>
                            <span className="text-xs font-mono text-[#4a7794] flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {article.date}
                            </span>
                          </div>

                          {/* Article Title */}
                          <h2 className="text-base sm:text-lg font-bold text-[#e1eff8] group-hover:text-[#ffd67a] transition-colors line-clamp-2 leading-snug">
                            {article.title}
                          </h2>

                          {/* Description Excerpt */}
                          <p className="text-xs sm:text-sm text-[#7e9cb4] line-clamp-2 leading-relaxed">
                            {article.excerpt}
                          </p>
                        </div>

                        {/* Right Arrow Action (From VNG sprite.png) */}
                        <div className="hidden md:flex items-center justify-center shrink-0 w-[90px] h-[33px]">
                          <div 
                            className="w-[90px] h-[33px] bg-no-repeat transition-all duration-300 group-hover:translate-x-1"
                            style={{
                              backgroundImage: `url('/images/news/sprite.png')`,
                              backgroundPosition: '-90px -180px',
                            }}
                          />
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Pagination Controls (Matching 100% Image 1: « < 1 2 3 4 5 > ») */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2 sm:gap-3 text-lg sm:text-xl font-mono">
              {/* First Page « */}
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                  currentPage === 1 
                    ? 'text-[#365063] cursor-not-allowed opacity-40' 
                    : 'text-[#4a7794] hover:text-white hover:bg-[#4a7794]/20'
                }`}
                title="Trang đầu"
              >
                &laquo;
              </button>

              {/* Prev Page ‹ */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                  currentPage === 1 
                    ? 'text-[#365063] cursor-not-allowed opacity-40' 
                    : 'text-[#4a7794] hover:text-white hover:bg-[#4a7794]/20'
                }`}
                title="Trang trước"
              >
                &lsaquo;
              </button>

              {/* Number Buttons */}
              {pageNumbers.map((page) => {
                const isActive = page === currentPage;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold transition-all ${
                      isActive
                        ? 'bg-gradient-to-b from-[#7ec2e5] to-[#4a85a8] text-[#08151d] shadow-[0_0_12px_rgba(126,194,229,0.5)] scale-105'
                        : 'text-[#4a7794] hover:text-white hover:bg-[#4a7794]/25'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              {/* Next Page › */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                  currentPage === totalPages 
                    ? 'text-[#365063] cursor-not-allowed opacity-40' 
                    : 'text-[#4a7794] hover:text-white hover:bg-[#4a7794]/20'
                }`}
                title="Trang sau"
              >
                &rsaquo;
              </button>

              {/* Last Page » */}
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                  currentPage === totalPages 
                    ? 'text-[#365063] cursor-not-allowed opacity-40' 
                    : 'text-[#4a7794] hover:text-white hover:bg-[#4a7794]/20'
                }`}
                title="Trang cuối"
              >
                &raquo;
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quick Article Preview Modal */}
      {selectedArticle && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedArticle(null)}
        >
          <div 
            className="w-full max-w-2xl bg-ink-900 border border-gold/40 rounded-2xl p-6 shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg border border-gold/20 bg-ink-800 text-ink-300 hover:text-white hover:border-gold transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Category & Date */}
            <div className="flex items-center gap-3 pt-1">
              <span className="px-3 py-1 rounded text-xs font-bold uppercase tracking-wider text-white bg-[#c5ae7e]">
                {selectedArticle.category}
              </span>
              <span className="text-xs font-mono text-ink-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-gold" />
                {selectedArticle.date}
              </span>
            </div>

            {/* Modal Title */}
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-gold-bright leading-snug">
              {selectedArticle.title}
            </h3>

            {/* Modal Image */}
            {selectedArticle.image && (
              <div className="w-full h-[240px] sm:h-[300px] rounded-xl overflow-hidden border border-gold/20 bg-ink-950">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Modal Excerpt */}
            <div className="p-4 rounded-xl border border-gold/15 bg-ink-950/70 text-ink-200 text-sm leading-relaxed space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-gold block font-bold">
                Tóm Tắt Nội Dung
              </span>
              <p>{selectedArticle.excerpt}</p>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-ink-800">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-2 rounded-lg border border-ink-700 bg-ink-800/80 text-xs font-mono text-ink-300 hover:text-white transition-colors"
              >
                Đóng lại
              </button>
              <a
                href={selectedArticle.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-gold via-gold-bright to-gold text-ink-950 font-bold text-xs font-mono flex items-center gap-2 shadow-gold-glow hover:brightness-110 transition-all"
              >
                <span>Xem Bài Gốc Trên VNG</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
