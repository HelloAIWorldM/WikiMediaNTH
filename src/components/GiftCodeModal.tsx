"use client";

import { useState } from "react";
import { Gift, X, Check, Copy, Sparkles, ExternalLink } from "lucide-react";
import { GIFT_CODES_DATA } from "@/data/wikiData";
import { useSimulatorStore } from "@/store/useSimulatorStore";

interface GiftCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GiftCodeModal({ isOpen, onClose }: GiftCodeModalProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const setNotification = useSimulatorStore((state) => state.setNotification);

  if (!isOpen) return null;

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setNotification(`Đã sao chép mã Gift Code: [${code}]!`);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-2xl border border-gold/40 bg-ink-900 shadow-2xl overflow-hidden p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gold/20">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gold/15 border border-gold/40 flex items-center justify-center text-gold">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-white">
                Gift Code Nghịch Thủy Hàn Đang Hoạt Động
              </h3>
              <p className="text-xs text-ink-300">
                Sao chép mã và nhập trong game để nhận phúc lợi
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-ink-400 hover:text-white p-1 rounded-full hover:bg-ink-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of active codes */}
        <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
          {GIFT_CODES_DATA.map((item) => {
            const isCopied = copiedCode === item.code;
            return (
              <div
                key={item.code}
                className="p-3 rounded-xl border border-gold/20 bg-ink-950 hover:border-gold/50 transition-all flex items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-gold text-sm tracking-wide">
                      {item.code}
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-ink-300 leading-snug">
                    {item.reward}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(item.code)}
                  className={`px-3 py-1.5 rounded text-xs font-mono font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                    isCopied
                      ? "bg-emerald-600 text-white"
                      : "bg-gold/15 hover:bg-gold text-gold-bright hover:text-ink-950 border border-gold/30"
                  }`}
                >
                  {isCopied ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{isCopied ? "Đã Chép" : "Sao Chép"}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer tip */}
        <div className="pt-2 border-t border-ink-800 text-[11px] text-ink-400 flex items-center justify-between">
          <span>
            Cách nhập: Vào Cài Đặt {"->"} Đổi Quà {"->"} Dán Mã
          </span>
          <span className="text-gold font-mono">Patch v1.3.3</span>
        </div>
      </div>
    </div>
  );
}
