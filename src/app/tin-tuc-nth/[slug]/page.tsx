import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  Sparkles, 
  ChevronRight, 
  Calendar, 
  ArrowLeft, 
  ExternalLink, 
  Share2,
  Newspaper
} from 'lucide-react';
import { VNG_NEWS_ARTICLES, NewsArticle } from '@/data/newsData';
import ArticleClientEnhancer from './ArticleClientEnhancer';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const CATEGORY_TABS = [
  { id: 'danh-sach', name: 'Mới nhất' },
  { id: 'news', name: 'Tin tức' },
  { id: 'event', name: 'Sự Kiện' },
  { id: 'inform', name: 'Thông Báo' },
  { id: 'guide', name: 'Tân Thủ' },
];

export async function generateStaticParams() {
  return VNG_NEWS_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const meta = VNG_NEWS_ARTICLES.find((a) => a.slug === slug);
  return {
    title: meta ? `${meta.title} - Tin Tức Nghịch Thủy Hàn` : 'Tin Tức Chi Tiết',
    description: meta?.excerpt || 'Tin tức chính thức từ Nghịch Thủy Hàn VNG',
  };
}

function getArticleData(slug: string) {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'articles', `${slug}.json`);
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error loading article file for slug:', slug, err);
  }

  // Fallback to in-memory metadata
  const meta = VNG_NEWS_ARTICLES.find((a) => a.slug === slug);
  if (!meta) return null;
  return {
    ...meta,
    contentHtml: `<div class="p-6 text-center text-[#0a1f33]"><p class="text-base sm:text-lg">${meta.excerpt}</p></div>`,
  };
}

export default async function TinTucDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleData(slug);

  if (!article) {
    notFound();
  }

  // Category badge color
  const getCategoryBadgeClass = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('thông báo') || cat.includes('thong bao')) {
      return 'bg-[#b8860b] text-white';
    }
    if (cat.includes('sự kiện') || cat.includes('su kien')) {
      return 'bg-[#dc2626] text-white';
    }
    if (cat.includes('tân thủ') || cat.includes('hướng dẫn')) {
      return 'bg-[#059669] text-white';
    }
    return 'bg-[#0284c7] text-white';
  };

  return (
    <div className="w-full max-w-[1240px] xl:max-w-[1280px] mx-auto space-y-5 pb-20">
      {/* Breadcrumb Navigation Header */}
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
          <Link href="/tin-tuc-nth" className="hover:text-gold transition-colors">
            Tin Tức NTH
          </Link>
          <ChevronRight className="w-3 h-3 text-ink-600" />
          <span className="text-gold-bright font-serif font-bold truncate max-w-[280px] sm:max-w-[400px]">
            {article.title}
          </span>
        </div>

        {/* Back Link Button */}
        <Link 
          href="/tin-tuc-nth"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold bg-[#0284c7]/20 hover:bg-[#0284c7] text-[#38bdf8] hover:text-white border border-[#0284c7]/40 transition-all shrink-0 shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Danh Sách Tin Tức</span>
        </Link>
      </div>

      {/* Main Authentic VNG Content Frame */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#7ea6c4]/50 min-h-[920px] bg-[#f0f6fa]">
        {/* Authentic Background with Misty Clouds & Lanterns */}
        <div 
          className="absolute inset-0 bg-cover bg-top pointer-events-none opacity-90"
          style={{ backgroundImage: `url('/images/news/bg.jpg')` }}
        />
        {/* Atmospheric Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-900/10 via-transparent to-slate-900/10 pointer-events-none" />

        {/* Outer Content Area */}
        <div className="relative z-10 px-4 sm:px-8 lg:px-14 pt-8 pb-16">
          {/* Top Bar: Title & Tabs & Back Arrow Button (Matching Image 4) */}
          <div className="relative pb-4 border-b-2 border-[#7ea6c4] flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            {/* Left Title */}
            <div className="flex items-center gap-3">
              <svg 
                className="w-8 h-8 text-[#0284c7] shrink-0 drop-shadow-sm" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polygon points="3 3 21 12 3 21 7 12 3 3" />
              </svg>
              <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-serif font-black tracking-wider text-[#0a1f33] uppercase flex items-baseline gap-2.5 drop-shadow-sm">
                <span>THÔNG TIN</span>
                <span className="text-xl sm:text-2xl text-[#0284c7] font-bold tracking-wide lowercase first-letter:uppercase">
                  Tin tức
                </span>
              </h1>
            </div>

            {/* Right Tabs & Back Arrow Button */}
            <div className="flex items-center gap-5 sm:gap-8 flex-wrap">
              <nav className="flex items-center gap-5 sm:gap-7 flex-wrap">
                {CATEGORY_TABS.map((tab) => (
                  <Link
                    key={tab.id}
                    href={`/tin-tuc-nth?tab=${tab.id}`}
                    className="relative text-sm sm:text-base font-black uppercase tracking-wider text-[#2a4d70] hover:text-[#0284c7] transition-colors"
                  >
                    {tab.name}
                  </Link>
                ))}
              </nav>

              {/* Authentic VNG Back Button (Cyan Arrow Button like Image 4) */}
              <Link
                href="/tin-tuc-nth"
                className="group flex items-center justify-center shrink-0 w-[90px] h-[33px] relative transition-transform duration-200 hover:-translate-x-1"
                title="Quay lại danh sách tin tức"
              >
                <div 
                  className="w-[90px] h-[33px] bg-no-repeat"
                  style={{
                    backgroundImage: `url('/images/news/detail_sprite.png')`,
                    backgroundPosition: '-73px 0px',
                  }}
                />
              </Link>
            </div>
          </div>

          {/* Article Main Paper Container (High Contrast & Clear) */}
          <div className="mt-8 max-w-4xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl border-2 border-[#91b1c8]/80 shadow-2xl p-6 sm:p-10 lg:p-14 space-y-8">
            {/* Article Heading */}
            <div className="space-y-4 text-center border-b border-[#c1d7e8] pb-6">
              {/* Category Pill & Date */}
              <div className="flex items-center justify-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-sm ${getCategoryBadgeClass(article.category)}`}>
                  {article.category}
                </span>
                <span className="text-xs font-mono font-bold text-[#1b3e60] flex items-center gap-1.5 bg-[#f0f6fa] px-3 py-1 rounded-full border border-[#c1d7e8]">
                  <Calendar className="w-3.5 h-3.5 text-[#0284c7]" />
                  {article.date}
                </span>
              </div>

              {/* Title centered with deep navy font */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black tracking-wide text-[#0a1f33] uppercase leading-tight drop-shadow-sm">
                {article.title}
              </h1>

              {/* Source Link & Share */}
              <div className="flex items-center justify-center gap-4 text-xs font-mono text-[#274463] pt-1">
                <a 
                  href={article.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#0284c7] hover:text-[#0a1f33] font-bold underline underline-offset-4 transition-colors"
                >
                  <span>Xem bài viết gốc trên VNG Official</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Banner Cover Image (if article has prominent image) */}
            {article.image && (
              <div className="w-full max-h-[460px] rounded-xl overflow-hidden border border-[#c1d7e8] shadow-lg bg-[#0e2133] mx-auto">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Article Rich HTML Content */}
            <div 
              className="vng-article-body text-[#0a1f33] leading-relaxed text-sm sm:text-base space-y-4"
              dangerouslySetInnerHTML={{ __html: article.contentHtml }}
            />

            {/* Article Footer & Return Actions */}
            <div className="border-t-2 border-[#c1d7e8] pt-8 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/tin-tuc-nth"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0a1f33] hover:bg-[#0284c7] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Quay lại danh sách tin tức</span>
              </Link>

              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-[#91b1c8] text-[#0a1f33] hover:border-[#0284c7] text-xs sm:text-sm font-bold shadow-sm transition-all"
              >
                <span>Nguồn VNG Official</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#0284c7]" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Enhancer for Floating Scroll Button & Language Switch */}
      <ArticleClientEnhancer />

      {/* Dedicated Styles for Authentic VNG Article Body */}
      <style>{`
        .vng-article-body h1, 
        .vng-article-body h2, 
        .vng-article-body h3 {
          font-family: inherit;
          font-weight: 800;
          color: #c98716;
          margin-top: 1.6em;
          margin-bottom: 0.6em;
          line-height: 1.35;
          text-transform: uppercase;
        }
        .vng-article-body h1 {
          font-size: 1.5em;
          color: #0a1f33;
        }
        .vng-article-body h2 {
          font-size: 1.25em;
        }
        .vng-article-body h3 {
          font-size: 1.1em;
        }
        .vng-article-body p {
          margin-bottom: 0.9em;
          color: #0a1f33;
          line-height: 1.7;
        }
        .vng-article-body strong, 
        .vng-article-body b {
          font-weight: 800;
          color: #0a1f33;
        }
        .vng-article-body ul {
          list-style-type: disc;
          padding-left: 1.5em;
          margin-bottom: 1em;
          space-y: 0.4em;
        }
        .vng-article-body ol {
          list-style-type: decimal;
          padding-left: 1.5em;
          margin-bottom: 1em;
        }
        .vng-article-body li {
          margin-bottom: 0.35em;
          color: #1b3e60;
        }
        .vng-article-body a {
          color: #0284c7;
          text-decoration: underline;
          text-underline-offset: 3px;
          font-weight: 600;
        }
        .vng-article-body a:hover {
          color: #0a1f33;
        }
        .vng-article-body img {
          max-width: 100%;
          height: auto;
          border-radius: 0.75rem;
          margin: 1.25rem auto;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          border: 1px solid #c1d7e8;
        }
        .vng-article-body table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5em 0;
          background: #ffffff;
          border-radius: 0.5rem;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        .vng-article-body th, 
        .vng-article-body td {
          border: 1px solid #c1d7e8;
          padding: 0.75rem 1rem;
          text-align: left;
          font-size: 0.9em;
        }
        .vng-article-body th {
          background-color: #f0f6fa;
          color: #0a1f33;
          font-weight: 800;
        }
        .vng-article-body tr:nth-child(even) {
          background-color: #f8fafc;
        }
      `}</style>
    </div>
  );
}
