'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, ChevronRight, Compass, Shield, Zap, Flame } from 'lucide-react';
import { THANKHI_WIDGET_HTML } from './widgetHtml';

export default function ThienCoNgocHachPage() {
  useEffect(() => {
    const root = document.getElementById('tk-demo');
    if (!root) return;

    if (!root.classList.contains('js')) {
      root.classList.add('js');
    }

    const setOn = () => {
      root.classList.add('on');
    };

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              setOn();
              io.disconnect();
            }
          });
        },
        { threshold: 0.12 }
      );
      io.observe(root);
    } else {
      setOn();
    }
    const timer = setTimeout(setOn, 1500);

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const l = target?.closest ? (target.closest('label[for]') as HTMLLabelElement | null) : null;
      if (!l || !root.contains(l)) return;
      const i = document.getElementById(l.htmlFor) as HTMLInputElement | null;
      if (!i || !root.contains(i)) return;
      e.preventDefault();
      if (i.type === 'radio') {
        i.checked = true;
      } else {
        i.checked = !i.checked;
      }
      i.dispatchEvent(new Event('change', { bubbles: true }));
    };

    const handleBackClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const a = target?.closest ? (target.closest('a.tk-back') as HTMLAnchorElement | null) : null;
      if (!a) return;
      e.preventDefault();
      root.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    root.addEventListener('click', handleClick);
    document.addEventListener('click', handleBackClick);

    return () => {
      clearTimeout(timer);
      root.removeEventListener('click', handleClick);
      document.removeEventListener('click', handleBackClick);
    };
  }, []);

  return (
    <div className="w-full max-w-[1240px] xl:max-w-[1280px] mx-auto space-y-5 pb-12">
      {/* Stylesheet link for 100% authentic Than Khi styles & fonts */}
      <link rel="stylesheet" href="/images/thankhi/thankhi.css" />

      {/* Breadcrumb Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border border-gold/20 bg-ink-900/80 backdrop-blur shadow-lg">
        <div className="flex items-center gap-2 text-xs text-ink-300 flex-wrap">
          <Link href="/" className="hover:text-gold transition-colors flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Trang Chủ Wiki</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-ink-600" />
          <Link href="/simulator" className="hover:text-gold transition-colors">
            Giả Lập Build
          </Link>
          <ChevronRight className="w-3 h-3 text-ink-600" />
          <span className="text-gold-bright font-serif font-bold">Thần Khí · Thiên Cơ Ngọc Hạch</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-teal-500/15 text-teal-300 border border-teal-500/30">
            <Compass className="w-3.5 h-3.5 animate-spin-slow" />
            Bản v2.1.1 VNG Live
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono bg-gold/15 text-gold border border-gold/30">
            8 Đại Lưu Phái
          </span>
        </div>
      </div>

      {/* Widget Container */}
      <div className="w-full overflow-hidden rounded-2xl shadow-2xl border border-gold/30 bg-[#08151d]">
        <div dangerouslySetInnerHTML={{ __html: THANKHI_WIDGET_HTML }} />
      </div>

      {/* Information & Guide Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        <div className="p-3.5 rounded-xl border border-gold/20 bg-ink-900/70 backdrop-blur space-y-1.5">
          <div className="flex items-center gap-2 text-gold-bright font-serif font-bold text-sm">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Quy Tắc Cộng Mốc</span>
          </div>
          <p className="text-xs text-ink-300 leading-relaxed">
            Mỗi nhánh bắt đầu từ Mốc Khởi Đầu (Thiên Phú Cốt Lõi). Bạn chỉ có thể nâng mốc tiếp theo khi mốc liền kề trước đó đã đạt cấp tối đa.
          </p>
        </div>

        <div className="p-3.5 rounded-xl border border-gold/20 bg-ink-900/70 backdrop-blur space-y-1.5">
          <div className="flex items-center gap-2 text-gold-bright font-serif font-bold text-sm">
            <Shield className="w-4 h-4 text-teal-400" />
            <span>Thiên Phú Cốt Lõi</span>
          </div>
          <p className="text-xs text-ink-300 leading-relaxed">
            Mỗi Lưu Phái sở hữu 2 nhánh Thiên Phú Cốt Lõi độc quyền. Bạn có thể tự do lựa chọn 1 trong 2 để định hình phong cách chiến đấu (PvE hoặc PvP).
          </p>
        </div>

        <div className="p-3.5 rounded-xl border border-gold/20 bg-ink-900/70 backdrop-blur space-y-1.5">
          <div className="flex items-center gap-2 text-gold-bright font-serif font-bold text-sm">
            <Flame className="w-4 h-4 text-rose-400" />
            <span>Sát Vi Tấn Tiết-Cực</span>
          </div>
          <p className="text-xs text-ink-300 leading-relaxed">
            Khi mở khóa mốc trung tâm bàn Thần Khí, bạn sẽ kích hoạt tuyệt kỹ Giang Hồ &quot;Sát Vi Tấn Tiết-Cực&quot;, đem lại sức mạnh đột phá toàn diện.
          </p>
        </div>
      </div>
    </div>
  );
}
