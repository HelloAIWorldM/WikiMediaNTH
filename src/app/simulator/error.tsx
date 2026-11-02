'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, RotateCcw, Trash2 } from 'lucide-react';

export default function SimulatorError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Simulator Error Boundary]:', error);
  }, [error]);

  const handleClearCacheAndReload = () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('nth_wiki_database_v2');
        localStorage.removeItem('nth_simulator_store');
        window.location.reload();
      }
    } catch (e) {
      console.error('Failed to clear cache:', e);
      window.location.reload();
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-2xl border border-crimson-bright/40 bg-ink-900/95 p-6 shadow-2xl space-y-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-crimson-bright/15 border border-crimson-bright/30 flex items-center justify-center text-crimson-bright">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-serif text-lg font-bold text-white">
              Sự Cố Khởi Tạo Giả Lập
            </h2>
            <p className="text-xs text-ink-300">
              Trình duyệt gặp lỗi khi nạp dữ liệu cache cục bộ hoặc trạng thái build cũ.
            </p>
          </div>
        </div>

        {error?.message && (
          <div className="p-3 rounded-lg bg-ink-950 border border-ink-800 text-[11px] font-mono text-crimson-soft break-words">
            {error.message}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            type="button"
            onClick={reset}
            className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl border border-gold/40 bg-gold/15 hover:bg-gold text-gold-bright hover:text-ink-950 font-bold text-xs transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Thử Tải Lại</span>
          </button>

          <button
            type="button"
            onClick={handleClearCacheAndReload}
            className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl border border-crimson-bright/40 bg-crimson-bright/15 hover:bg-crimson-bright text-white font-bold text-xs transition-all flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>Khôi Phục Dữ Liệu Gốc</span>
          </button>
        </div>
      </div>
    </div>
  );
}

