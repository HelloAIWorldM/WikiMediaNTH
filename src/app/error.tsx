'use client';

import React, { useEffect } from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Global Error Boundary]:', error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-gold/40 bg-ink-900/95 p-6 shadow-2xl text-center space-y-4">
        <div className="w-12 h-12 mx-auto rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center text-gold">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="font-serif text-lg font-bold text-white">Hệ Thống Đang Tải Lại Dữ Liệu</h2>
        <p className="text-xs text-ink-300">
          Ứng dụng phát hiện dữ liệu cần đồng bộ. Nhấn bên dưới để tải lại.
        </p>
        <button
          onClick={() => {
            try {
              if (typeof window !== 'undefined') {
                localStorage.removeItem('nth_wiki_database_v2');
                window.location.reload();
              }
            } catch {
              reset();
            }
          }}
          className="w-full py-2.5 px-4 rounded-xl bg-gold text-ink-950 font-bold text-xs shadow-gold-glow hover:brightness-110 flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Làm Mới Trang</span>
        </button>
      </div>
    </div>
  );
}

