import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  Sparkles, 
  ChevronRight, 
  Calendar, 
  ArrowLeft, 
  ExternalLink
} from 'lucide-react';
import { VNG_NEWS_ARTICLES } from '@/data/newsData';
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

  return (
    <div className="w-full max-w-[1560px] mx-auto space-y-4 pb-20">
      {/* Top Breadcrumb Header */}
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
          <span className="text-gold-bright font-serif font-bold truncate max-w-[320px] sm:max-w-[500px]">
            {article.title}
          </span>
        </div>

        {/* Back Link Button */}
        <Link 
          href="/tin-tuc-nth"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold bg-[#0284c7]/20 hover:bg-[#0284c7] text-[#38bdf8] hover:text-white border border-[#0284c7]/40 transition-all shrink-0 shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Quay lại danh sách</span>
        </Link>
      </div>

      {/* Full-width Immersive VNG Content Frame (Matching 100% Image 1) */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#7ea6c4]/60 min-h-[960px] bg-[#f0f6fa]">
        {/* Authentic Background with Misty Clouds & Lanterns */}
        <div 
          className="absolute inset-0 bg-cover bg-top pointer-events-none opacity-95"
          style={{ backgroundImage: `url('/images/news/bg.jpg')` }}
        />
        {/* Soft Ambient Light Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-900/5 via-transparent to-slate-900/10 pointer-events-none" />

        {/* Main Content Area spanning full width */}
        <div className="relative z-10 px-4 sm:px-10 lg:px-16 pt-8 pb-20">
          {/* Top Bar: Title & Category Tabs & Cyan Back Arrow Button (Matching Image 1) */}
          <div className="relative pb-4 border-b-2 border-[#7ea6c4]/80 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
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
            <div className="flex items-center gap-6 sm:gap-10 flex-wrap">
              <nav className="flex items-center gap-6 sm:gap-8 flex-wrap">
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

              {/* Authentic VNG Back Button (Cyan Arrow Button like Image 1) */}
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

          {/* Full-width Immersive Article Container (NO Narrow White Box - 100% like Image 1) */}
          <div className="mt-8 max-w-[1280px] xl:max-w-[1360px] mx-auto space-y-6">
            {/* Article Title: Centered, Large, Deep Slate Navy Text directly on Cloud Background */}
            <div className="text-center pt-2 pb-4 space-y-3">
              <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-serif font-black tracking-wide text-[#20344a] uppercase leading-snug max-w-5xl mx-auto drop-shadow-sm">
                {article.title}
              </h1>

              {/* Date & Source info */}
              <div className="flex items-center justify-center gap-4 text-xs font-mono font-bold text-[#3d6b86]">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#0284c7]" />
                  {article.date}
                </span>
                <span>•</span>
                <span className="uppercase text-[#b8860b]">{article.category}</span>
                <span>•</span>
                <a 
                  href={article.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#0284c7] hover:text-[#0a1f33] underline underline-offset-2 transition-colors"
                >
                  <span>Nguồn VNG Official</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Banner Cover Image (if article has prominent image) */}
            {article.image && (
              <div className="w-full max-w-4xl mx-auto max-h-[500px] rounded-2xl overflow-hidden border-2 border-[#91b1c8]/60 shadow-xl bg-[#0e2133] my-6">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Article Rich HTML Content: Spans broadly across the cloudy sky background */}
            <div 
              className="vng-article-body text-[#1d2a33] leading-relaxed text-base sm:text-[17px] space-y-5"
              dangerouslySetInnerHTML={{ __html: article.contentHtml }}
            />

            {/* Bottom Actions */}
            <div className="border-t-2 border-[#7ea6c4]/60 pt-8 mt-14 flex flex-col sm:flex-row items-center justify-between gap-4">
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
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/90 border border-[#91b1c8] text-[#0a1f33] hover:border-[#0284c7] text-xs sm:text-sm font-bold shadow-sm transition-all"
              >
                <span>Xem bài gốc trên trang chủ Nghịch Thủy Hàn</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#0284c7]" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Enhancer for Floating Scroll Button & Language Switch */}
      <ArticleClientEnhancer />

      {/* Dedicated Styles for Authentic Full-width VNG Article Body */}
      <style>{`
        .vng-article-body {
          max-width: 100%;
        }
        .vng-article-body h1, 
        .vng-article-body h2, 
        .vng-article-body h3 {
          font-family: inherit;
          font-weight: 800;
          color: #c98716;
          margin-top: 1.8em;
          margin-bottom: 0.6em;
          line-height: 1.35;
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }
        .vng-article-body h1 {
          font-size: 1.6em;
          color: #20344a;
        }
        .vng-article-body h2 {
          font-size: 1.3em;
          color: #c98716;
        }
        .vng-article-body h3 {
          font-size: 1.15em;
          color: #c98716;
        }
        .vng-article-body p {
          margin-bottom: 0.9em;
          color: #1d2a33;
          line-height: 1.75;
          font-weight: 500;
        }
        .vng-article-body strong, 
        .vng-article-body b {
          font-weight: 800;
          color: #0a1f33;
        }
        .vng-article-body ul {
          list-style-type: disc;
          padding-left: 1.6em;
          margin-bottom: 1.2em;
        }
        .vng-article-body ol {
          list-style-type: decimal;
          padding-left: 1.6em;
          margin-bottom: 1.2em;
        }
        .vng-article-body li {
          margin-bottom: 0.45em;
          color: #1b3e60;
          line-height: 1.65;
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
          border-radius: 1rem;
          margin: 1.5rem auto;
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
          border: 1px solid #c1d7e8;
          display: block;
        }
        .vng-article-body table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5em 0;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 0.75rem;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(0,0,0,0.06);
          border: 1px solid #c1d7e8;
        }
        .vng-article-body th, 
        .vng-article-body td {
          border: 1px solid #c1d7e8;
          padding: 0.85rem 1.1rem;
          text-align: left;
          font-size: 0.92em;
        }
        .vng-article-body th {
          background-color: #e2edf5;
          color: #0a1f33;
          font-weight: 800;
        }
        .vng-article-body tr:nth-child(even) {
          background-color: rgba(255, 255, 255, 0.5);
        }

        /* Language Switcher bar (.tl-bar) */
        .tl-bar {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          margin: 0.5em 0 1.2em;
        }
        .tl-sw {
          display: inline-flex;
          gap: 4px;
          padding: 4px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.75);
          box-shadow: inset 0 0 0 1px rgba(143, 216, 199, 0.75), 0 4px 12px rgba(31, 79, 73, 0.12);
        }
        .tl-btn {
          display: block;
          padding: 8px 16px;
          border-radius: 7px;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #1f4f49;
          text-decoration: none !important;
          cursor: pointer;
          transition: all 0.2s;
        }
        .tl-btn.is-on {
          color: #fff !important;
          background: linear-gradient(180deg, #14a86f, #01875f);
          box-shadow: 0 2px 0 #016446, 0 3px 8px rgba(1, 135, 95, 0.3);
        }

        /* Tra cuu nhanh container (.nkq-find) */
        .nkq-find {
          background: rgba(255, 255, 255, 0.65) !important;
          border: 1px solid rgba(60, 80, 95, 0.3) !important;
          border-radius: 14px;
          padding: 1.2em 1.5em;
          margin: 1.5em 0;
          backdrop-filter: blur(8px);
        }
        .nkq-find label {
          font-weight: 800;
          color: #0a1f33;
          margin-bottom: 0.6em;
          display: block;
        }
        .nkq details.nkq-block {
          background: rgba(255, 255, 255, 0.65) !important;
          border: 1px solid rgba(60, 80, 95, 0.25) !important;
          border-radius: 14px;
          margin: 0.8em 0;
          backdrop-filter: blur(8px);
        }
      `}</style>
    </div>
  );
}
