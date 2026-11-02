'use client';

import React, { useState, useEffect } from 'react';
import {
  Cloud,
  Share2,
  Copy,
  Check,
  X,
  Sparkles,
  Database,
  Globe,
  Flame,
  ArrowRight,
  ShieldCheck,
  Search
} from 'lucide-react';
import { useSimulatorStore } from '@/store/useSimulatorStore';
import {
  saveBuildToCloud,
  fetchBuildByCode,
  fetchCommunityBuilds,
  CloudBuildRecord
} from '@/services/buildService';
import { isSupabaseConfigured } from '@/lib/supabase';

interface CloudBuildModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'share' | 'explore';
}

export function CloudBuildModal({ isOpen, onClose, initialTab = 'share' }: CloudBuildModalProps) {
  const {
    selectedSect,
    innerSlots,
    gearSlots,
    elementCounts,
    resonances,
    stats,
    setInnerSlot,
    updateGearItem,
    setSelectedSect,
    setNotification
  } = useSimulatorStore();

  const [activeTab, setActiveTab] = useState<'share' | 'explore'>(initialTab);
  const [title, setTitle] = useState(`${selectedSect} PvE Meta Mùa 2`);
  const [creatorName, setCreatorName] = useState('Hiệp Khách Niên Du');
  const [isPublishing, setIsPublishing] = useState(false);
  const [generatedShareCode, setGeneratedShareCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Explore tab states
  const [communityBuilds, setCommunityBuilds] = useState<CloudBuildRecord[]>([]);
  const [exploreSectFilter, setExploreSectFilter] = useState('Tất Cả');
  const [isLoadingExplore, setIsLoadingExplore] = useState(false);

  // Quick lookup code input
  const [inputCode, setInputCode] = useState('');
  const [isSearchingCode, setIsSearchingCode] = useState(false);

  useEffect(() => {
    if (isOpen && activeTab === 'explore') {
      loadExploreBuilds();
    }
  }, [isOpen, activeTab, exploreSectFilter]);

  const loadExploreBuilds = async () => {
    setIsLoadingExplore(true);
    try {
      const builds = await fetchCommunityBuilds(exploreSectFilter);
      setCommunityBuilds(builds);
    } finally {
      setIsLoadingExplore(false);
    }
  };

  if (!isOpen) return null;

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      const result = await saveBuildToCloud({
        title,
        sect: selectedSect,
        creator_name: creatorName,
        inner_slots: innerSlots,
        gear_slots: gearSlots,
        element_counts: elementCounts,
        resonances: resonances,
        stats: stats,
      });

      if (result.success && result.shareCode) {
        setGeneratedShareCode(result.shareCode);
        setNotification(`Đã xuất bản bộ build lên Supabase Cloud Database! Mã: ${result.shareCode}`);
      } else {
        alert(result.message || 'Lỗi khi lưu bộ build');
      }
    } finally {
      setIsPublishing(false);
    }
  };

  const getFullShareUrl = (code: string) => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/simulator?build=${code}`;
    }
    return `https://wikimedianth.niendu.workers.dev/simulator?build=${code}`;
  };

  const handleCopy = (code: string) => {
    const url = getFullShareUrl(code);
    navigator.clipboard.writeText(url);
    setCopied(true);
    setNotification('Đã sao chép liên kết bộ build vào Clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleApplyBuild = (build: CloudBuildRecord) => {
    if (build.sect) setSelectedSect(build.sect);

    // Apply inner slots
    if (Array.isArray(build.inner_slots)) {
      build.inner_slots.forEach((ik, idx) => {
        if (ik) setInnerSlot(idx, ik);
      });
    }

    // Apply gear slots
    if (build.gear_slots && typeof build.gear_slots === 'object') {
      Object.entries(build.gear_slots).forEach(([slotKey, item]) => {
        if (item) updateGearItem(slotKey, item);
      });
    }

    setNotification(`Đã áp dụng thành công bộ build [${build.title}] từ Supabase Database!`);
    onClose();
  };

  const handleLookupCode = async () => {
    const clean = inputCode.trim().toUpperCase();
    if (!clean) return;
    setIsSearchingCode(true);
    try {
      const build = await fetchBuildByCode(clean);
      if (build) {
        handleApplyBuild(build);
      } else {
        alert(`Không tìm thấy bộ build với mã: "${clean}" trên hệ thống Supabase Database.`);
      }
    } finally {
      setIsSearchingCode(false);
    }
  };

  const isConfigured = isSupabaseConfigured();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-ink-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl border border-gold/40 bg-ink-900 shadow-2xl overflow-hidden flex flex-col my-auto max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-gold/25 flex items-center justify-between bg-ink-850">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gold/15 border border-gold/40 flex items-center justify-center text-gold shadow-gold-glow">
              <Database className="w-5 h-5 text-gold-bright" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-base sm:text-lg font-bold text-white">
                  Supabase Cloud Database
                </h3>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border flex items-center gap-1 ${
                  isConfigured 
                    ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400' 
                    : 'bg-gold/15 border-gold/30 text-gold-soft'
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                  <span>{isConfigured ? 'Supabase Live' : 'Local Hybrid'}</span>
                </span>
              </div>
              <p className="text-xs text-ink-300">
                Đồng bộ hóa & chia sẻ bộ phối nội công / trang bị toàn cầu
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-ink-400 hover:text-white p-1 rounded-full hover:bg-ink-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center border-b border-ink-800 bg-ink-950/40 px-4">
          <button
            onClick={() => setActiveTab('share')}
            className={`py-3 px-4 font-serif text-xs sm:text-sm font-bold border-b-2 flex items-center gap-1.5 transition-all ${
              activeTab === 'share'
                ? 'border-gold text-gold-bright bg-gold/5'
                : 'border-transparent text-ink-400 hover:text-ink-200'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>Chia Sẻ Bộ Build Này</span>
          </button>

          <button
            onClick={() => setActiveTab('explore')}
            className={`py-3 px-4 font-serif text-xs sm:text-sm font-bold border-b-2 flex items-center gap-1.5 transition-all ${
              activeTab === 'explore'
                ? 'border-gold text-gold-bright bg-gold/5'
                : 'border-transparent text-ink-400 hover:text-ink-200'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Khám Phá Build Cộng Đồng</span>
          </button>
        </div>

        {/* Tab 1: Share Current Build */}
        {activeTab === 'share' && (
          <div className="p-5 overflow-y-auto space-y-4">
            {generatedShareCode ? (
              <div className="p-4 rounded-xl border border-emerald-500/50 bg-emerald-950/20 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-serif font-bold text-sm">
                  <ShieldCheck className="w-5 h-5" />
                  <span>Bộ Build Đã Sẵn Sàng Trên Supabase Database!</span>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono text-ink-300 uppercase">Mã Build Chia Sẻ Ngắn:</span>
                  <div className="p-2.5 rounded-lg bg-ink-950 border border-gold/40 flex items-center justify-between">
                    <span className="font-mono text-lg font-extrabold text-gold-bright tracking-widest">
                      {generatedShareCode}
                    </span>
                    <button
                      onClick={() => handleCopy(generatedShareCode)}
                      className="px-3 py-1 rounded bg-gold/20 hover:bg-gold text-gold-bright hover:text-ink-950 text-xs font-mono font-bold flex items-center gap-1 transition-all"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Đã Sao Chép' : 'Sao Chép Link'}</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-1 pt-1">
                  <span className="text-[11px] font-mono text-ink-300">Đường dẫn đầy đủ:</span>
                  <input
                    type="text"
                    readOnly
                    value={getFullShareUrl(generatedShareCode)}
                    className="w-full px-3 py-1.5 rounded bg-ink-950 border border-ink-800 text-xs font-mono text-ink-300 select-all"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setGeneratedShareCode(null)}
                    className="px-4 py-1.5 rounded border border-ink-700 text-xs text-ink-300 hover:text-white"
                  >
                    Tạo Bản Khác
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Build Snapshot Summary Card */}
                <div className="p-3.5 rounded-xl border border-gold/25 bg-ink-950 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono text-gold uppercase tracking-wider block">Lưu Phái:</span>
                    <span className="font-serif text-sm font-bold text-white">{selectedSect}</span>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] font-mono text-ink-400 block">Nội Công:</span>
                    <span className="font-mono text-xs font-bold text-gold-bright">
                      {innerSlots.filter(Boolean).length}/6 Ô
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] font-mono text-ink-400 block">Trang Bị:</span>
                    <span className="font-mono text-xs font-bold text-gold-bright">
                      {Object.values(gearSlots).filter(Boolean).length}/10 Món
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-ink-400 block">Ước Tính DPS:</span>
                    <span className="font-mono text-xs font-extrabold text-crimson-bright">
                      {stats?.dpsEstimate?.toLocaleString() || '120,000'}
                    </span>
                  </div>
                </div>

                {/* Form fields */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-mono text-gold-soft mb-1">
                      Tên / Tiêu Đề Bộ Build:
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Ví dụ: Cửu Linh PvE Meta Mùa 2 - 3 Kim 3 Hỏa"
                      className="w-full px-3 py-2 rounded-lg bg-ink-950 border border-gold/30 text-xs text-white placeholder-ink-500 focus:border-gold outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gold-soft mb-1">
                      Tên Tác Giả / Người Tạo (Tùy chọn):
                    </label>
                    <input
                      type="text"
                      value={creatorName}
                      onChange={(e) => setCreatorName(e.target.value)}
                      placeholder="Ví dụ: Tán Tu / Bang Chủ Niên Du"
                      className="w-full px-3 py-2 rounded-lg bg-ink-950 border border-gold/30 text-xs text-white placeholder-ink-500 focus:border-gold outline-none"
                    />
                  </div>
                </div>

                {/* Submit action */}
                <div className="pt-2">
                  <button
                    onClick={handlePublish}
                    disabled={isPublishing}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-gold via-gold-bright to-gold text-ink-950 font-bold text-xs font-mono uppercase tracking-wider shadow-gold-glow hover:brightness-110 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                  >
                    <Cloud className="w-4 h-4" />
                    <span>{isPublishing ? 'Đang Xuất Bản Lên Supabase...' : 'Xuất Bản & Tạo Link Chia Sẻ Ngắn'}</span>
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Tab 2: Explore Community Builds */}
        {activeTab === 'explore' && (
          <div className="p-5 overflow-y-auto space-y-4">
            {/* Quick search by code */}
            <div className="p-3 rounded-xl bg-ink-950 border border-gold/25 flex items-center gap-2">
              <Search className="w-4 h-4 text-gold shrink-0" />
              <input
                type="text"
                placeholder="Nhập Mã Build nhanh (vd: CL-9K3H)..."
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLookupCode()}
                className="flex-1 bg-transparent text-xs font-mono text-white placeholder-ink-400 outline-none uppercase"
              />
              <button
                onClick={handleLookupCode}
                disabled={isSearchingCode || !inputCode.trim()}
                className="px-3 py-1.5 rounded bg-gold/20 hover:bg-gold text-gold-bright hover:text-ink-950 text-xs font-mono font-bold transition-all disabled:opacity-50"
              >
                {isSearchingCode ? 'Đang Tìm...' : 'Nạp Build'}
              </button>
            </div>

            {/* Sect filter pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1">
              {['Tất Cả', 'Cửu Linh', 'Toái Mộng', 'Huyết Hà', 'Thiết Y', 'Thần Tương', 'Tố Vấn', 'Long Ngâm'].map((s) => (
                <button
                  key={s}
                  onClick={() => setExploreSectFilter(s)}
                  className={`px-2.5 py-1 rounded text-xs font-mono transition-all shrink-0 ${
                    exploreSectFilter === s
                      ? 'bg-gold text-ink-950 font-bold'
                      : 'bg-ink-950 text-ink-300 hover:text-white border border-ink-800'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* List of builds */}
            {isLoadingExplore ? (
              <div className="py-12 flex flex-col items-center justify-center gap-2 text-ink-400">
                <div className="w-6 h-6 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
                <span className="text-xs font-mono">Đang truy vấn Supabase Database...</span>
              </div>
            ) : communityBuilds.length === 0 ? (
              <div className="py-12 text-center text-ink-400 space-y-2">
                <Sparkles className="w-8 h-8 text-gold/40 mx-auto" />
                <p className="text-xs">Chưa có bộ build nào được chia sẻ trong danh mục này.</p>
                <button
                  onClick={() => setActiveTab('share')}
                  className="text-xs font-mono text-gold underline hover:text-gold-bright"
                >
                  Hãy là người đầu tiên xuất bản bộ build của bạn!
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {communityBuilds.map((build, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-gold/20 bg-ink-950 hover:border-gold/50 transition-all flex flex-col justify-between gap-2.5"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-gold/15 text-gold border border-gold/30">
                          {build.sect}
                        </span>
                        <span className="text-[10px] font-mono text-ink-400">
                          Mã: <strong className="text-gold-bright">{build.share_code}</strong>
                        </span>
                      </div>
                      <h4 className="font-serif text-sm font-bold text-white truncate" title={build.title}>
                        {build.title}
                      </h4>
                      <div className="text-[11px] text-ink-400 mt-0.5">
                        Bởi: <span className="text-ink-200">{build.creator_name}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-ink-800">
                      <span className="text-xs font-mono text-crimson-bright font-extrabold">
                        {build.stats?.dpsEstimate ? `${build.stats.dpsEstimate.toLocaleString()} DPS` : 'Chuẩn Meta'}
                      </span>
                      <button
                        onClick={() => handleApplyBuild(build)}
                        className="px-3 py-1 rounded bg-gold/15 hover:bg-gold text-gold-bright hover:text-ink-950 text-xs font-mono font-bold transition-all flex items-center gap-1"
                      >
                        <span>Áp Dụng</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

