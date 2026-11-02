'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Layers, ArrowRight } from 'lucide-react';

export default function GuideRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/simulator');
  }, [router]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-gold/15 border border-gold/40 flex items-center justify-center text-gold">
        <Layers className="w-8 h-8" />
      </div>
      <h1 className="font-serif text-2xl font-bold text-white">
        Chuyển hướng đến Giả Lập Build...
      </h1>
      <p className="text-sm text-ink-300 max-w-md">
        Các cẩm nang và hướng dẫn phối đồ, nội công đã được tích hợp đầy đủ vào hệ thống Giả Lập.
      </p>
      <Link
        href="/simulator"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gold text-ink-950 font-bold text-sm shadow-gold-glow hover:brightness-110 transition-all"
      >
        <span>Đến Trang Giả Lập Ngay</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
