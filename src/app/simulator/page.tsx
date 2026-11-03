'use client';

import { useState, useEffect } from 'react';
import { 
  Shield, 
  Swords, 
  Sparkles, 
  Camera, 
  Share2, 
  Download, 
  Upload, 
  Search, 
  Filter, 
  Plus, 
  Trash2, 
  Info,
  CheckCircle2,
  ChevronDown,
  X,
  Sliders,
  Dices,
  Archive,
  RotateCcw,
  Cloud,
  Globe
} from 'lucide-react';
import { useSimulatorStore, EMPTY_GEAR_SLOTS } from '@/store/useSimulatorStore';
import { 
  INNER_KUNGFU_DATABASE, 
  ElementType, 
  InnerKungfu, 
  POPULAR_PRESETS,
  GearSlotItem
} from '@/data/simulatorData';
import { ElementGlyph, ELEMENT_THEME } from '@/components/ElementIcons';
import { InnerKungfuIcon } from '@/components/InnerKungfuIcon';
import { ElementTrackBoard } from '@/components/ElementTrackBoard';
import { CloudBuildModal } from '@/components/CloudBuildModal';
import { fetchBuildByCode } from '@/services/buildService';

const SECTS = ["Cửu Linh", "Toái Mộng", "Huyết Hà", "Thiết Y", "Thần Tương", "Tố Vấn", "Long Ngâm", "Huyền Cơ"];
const GEAR_SLOT_KEYS = ["Vũ Khí", "Áo", "Mũ", "Đai", "Giày", "Hộ Uyển", "Nhẫn 1", "Nhẫn 2", "Dây Chuyền", "Bội Ngọc"];

const ELEMENT_COLORS: Record<ElementType, { name: string; bg: string; text: string; dot: string }> = {
  Kim: { name: "Kim", bg: "bg-amber-400/20 border-amber-400/50", text: "text-amber-300", dot: "bg-amber-400 shadow-[0_0_8px_#fbbf24]" },
  Moc: { name: "Mộc", bg: "bg-emerald-400/20 border-emerald-400/50", text: "text-emerald-300", dot: "bg-emerald-400 shadow-[0_0_8px_#34d399]" },
  Thuy: { name: "Thủy", bg: "bg-sky-400/20 border-sky-400/50", text: "text-sky-300", dot: "bg-sky-400 shadow-[0_0_8px_#38bdf8]" },
  Hoa: { name: "Hỏa", bg: "bg-rose-500/20 border-rose-500/50", text: "text-rose-400", dot: "bg-rose-500 shadow-[0_0_8px_#f43f5e]" },
  Tho: { name: "Thổ", bg: "bg-amber-700/20 border-amber-700/50", text: "text-amber-600", dot: "bg-amber-600 shadow-[0_0_8px_#d97706]" },
  '?': { name: "Ngẫu nhiên", bg: "bg-slate-500/20 border-slate-400/50", text: "text-slate-200", dot: "bg-slate-300 shadow-[0_0_8px_#cbd5e1]" },
};

export default function SimulatorPage() {
  const {
    selectedSect,
    activePresetId,
    gearSlots,
    innerSlots,
    reserveKungfus,
    elementCounts,
    resonances,
    stats,
    selectedInnerSlotIndex,
    isCatalogOpen,
    isOcrModalOpen,
    setSelectedSect,
    loadPreset,
    setInnerSlot,
    removeInnerSlot,
    updateInnerSlotElement,
    setSlotElements,
    updateGearItem,
    removeGearSlot,
    addKungfuToReserve,
    removeKungfuFromReserve,
    openCatalogForSlot,
    closeCatalog,
    setOcrModalOpen,
    setPendingOcrImage,
    exportBuildJSON,
    importBuildJSON,
    setNotification
  } = useSimulatorStore();

  const [catalogFilterElement, setCatalogFilterElement] = useState<string>('all');
  const [catalogSearch, setCatalogSearch] = useState<string>('');
  const [reserveFilterElement, setReserveFilterElement] = useState<string>('all');
  const [reserveSearch, setReserveSearch] = useState<string>('');
  const [importModalOpen, setImportModalOpen] = useState<boolean>(false);
  const [importJsonText, setImportJsonText] = useState<string>('');
  const [importShareCode, setImportShareCode] = useState<string>('');
  const [isFetchingImportCode, setIsFetchingImportCode] = useState<boolean>(false);
  const [cloudModalOpen, setCloudModalOpen] = useState<boolean>(false);
  const [cloudModalInitialTab, setCloudModalInitialTab] = useState<'share' | 'explore'>('share');
  const [hoveredInner, setHoveredInner] = useState<InnerKungfu | null>(null);
  const [isEncyclopediaView, setIsEncyclopediaView] = useState<boolean>(false);
  const [editingSlotElementIndex, setEditingSlotElementIndex] = useState<{ slotIndex: number; kungfu: InnerKungfu } | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);

    // Auto-load shared build from URL ?build=XXXX if present
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const buildCode = urlParams.get('build');
      if (buildCode) {
        fetchBuildByCode(buildCode).then((build) => {
          if (build) {
            if (build.sect) setSelectedSect(build.sect);
            if (Array.isArray(build.inner_slots)) {
              build.inner_slots.forEach((ik, idx) => {
                if (ik) setInnerSlot(idx, ik);
              });
            }
            if (build.gear_slots && typeof build.gear_slots === 'object') {
              Object.entries(build.gear_slots).forEach(([slotKey, item]) => {
                if (item) updateGearItem(slotKey, item);
              });
            }
            setNotification(`Đã tự động nạp bộ build [${build.title}] (${buildCode}) từ Supabase Cloud!`);
          }
        });
      }
    }
  }, [setInnerSlot, updateGearItem, setSelectedSect, setNotification]);

  // Keyboard shortcut for OCR dán ảnh (Ctrl+V)
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (items) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf('image') !== -1) {
            const blob = items[i].getAsFile();
            if (blob) {
              e.preventDefault();
              setPendingOcrImage(blob);
              setOcrModalOpen(true);
              return;
            }
          }
        }
      }
      if (e.clipboardData && e.clipboardData.files.length > 0) {
        const file = e.clipboardData.files[0];
        if (file.type.startsWith('image/')) {
          e.preventDefault();
          setPendingOcrImage(file);
          setOcrModalOpen(true);
        }
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [setOcrModalOpen, setPendingOcrImage]);

  // Filtered Inner Kungfu catalog list
  const filteredCatalog = (INNER_KUNGFU_DATABASE || []).filter((ik) => {
    if (!ik) return false;
    const q = catalogSearch.toLowerCase().trim();
    const matchSearch = !q ||
      (ik.name || '').toLowerCase().includes(q) ||
      (ik.tags || []).some((t) => t.toLowerCase().includes(q));
    const matchElement = catalogFilterElement === 'all' || (Array.isArray(ik.elements) && ik.elements.includes(catalogFilterElement as ElementType));
    return matchSearch && matchElement;
  });

  // Filtered Reserve Dock list from user's persisted Database
  const filteredReserve = (reserveKungfus || []).filter((ik) => {
    if (!ik) return false;
    const matchSearch = (ik.name || '').toLowerCase().includes(reserveSearch.toLowerCase());
    const matchElement = reserveFilterElement === 'all' || (Array.isArray(ik.elements) && ik.elements.includes(reserveFilterElement as ElementType));
    return matchSearch && matchElement;
  });

  const handleShareClick = () => {
    const jsonStr = exportBuildJSON();
    navigator.clipboard.writeText(window.location.href);
    setNotification("Đã sao chép liên kết bộ build vào clipboard!");
  };

  const handleExportJsonClick = () => {
    const jsonStr = exportBuildJSON();
    navigator.clipboard.writeText(jsonStr);
    setNotification("Đã sao chép cấu hình JSON bộ build vào clipboard!");
  };

  const handleImportSubmit = () => {
    const success = importBuildJSON(importJsonText);
    if (success) {
      setImportModalOpen(false);
      setImportJsonText('');
    }
  };

  if (!isMounted) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-gold/40 border-t-gold animate-spin" />
        <span className="font-serif text-sm text-gold-soft tracking-wider">Đang khởi tạo Giả Lập Tu Luyện...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 pb-12">
      {/* Top Controls Bar: Môn Phái & Presets Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border border-gold/30 bg-ink-900/80 backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-3">
          {/* Sect Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gold font-mono uppercase tracking-wider">Lưu Phái:</span>
            <div className="flex items-center gap-1 overflow-x-auto py-1">
              {SECTS.map((sect) => (
                <button
                  key={sect}
                  onClick={() => setSelectedSect(sect)}
                  className={`px-3 py-1 rounded text-xs font-serif font-bold transition-all ${
                    selectedSect === sect
                      ? 'bg-gold text-ink-950 shadow-gold-glow'
                      : 'bg-ink-800 text-ink-200 hover:text-gold hover:bg-ink-700'
                  }`}
                >
                  {sect}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setOcrModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-gold/40 bg-gold/15 hover:bg-gold/25 text-gold-bright text-xs font-mono font-bold transition-all shadow-sm"
            title="Quét trang bị & nội công từ ảnh"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Quét Ảnh (OCR)</span>
          </button>

          <button
            onClick={() => {
              setCloudModalInitialTab('share');
              setCloudModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-gold/50 bg-gold/20 hover:bg-gold text-gold-bright hover:text-ink-950 text-xs font-mono font-bold transition-all shadow-gold-glow"
            title="Lưu và chia sẻ mã bộ build lên Supabase Cloud Database"
          >
            <Cloud className="w-3.5 h-3.5" />
            <span>Chia Sẻ (Cloud)</span>
          </button>

          <button
            onClick={() => {
              setCloudModalInitialTab('explore');
              setCloudModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-ink-600 bg-ink-800 hover:border-gold text-ink-200 hover:text-gold text-xs font-mono transition-all"
            title="Khám phá các bộ build hot của cộng đồng trên Cloud"
          >
            <Globe className="w-3.5 h-3.5 text-gold" />
            <span>Cộng Đồng</span>
          </button>

          <button
            onClick={handleExportJsonClick}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-ink-600 bg-ink-800 hover:border-gold text-ink-200 hover:text-gold text-xs font-mono transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Xuất JSON</span>
          </button>

          <button
            onClick={() => setImportModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-ink-600 bg-ink-800 hover:border-gold text-ink-200 hover:text-gold text-xs font-mono transition-all"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Nhập Build</span>
          </button>
        </div>
      </div>

      {/* 3-Column Fixed Workbench Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* ===================== CỘT 1 (TRÁI - 25% ~ 3 cols): 10 Ô TRANG BỊ ===================== */}
        <div className="lg:col-span-3 space-y-3">
          <div className="p-3 rounded-xl border border-gold/30 bg-ink-900/90 shadow-md">
            <div className="flex items-center justify-between pb-2 border-b border-ink-700/80 mb-3">
              <span className="font-serif text-sm font-bold text-white flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-gold-bright" />
                <span>10 Ô Trang Bị Đeo</span>
              </span>
              <span className="text-[10px] font-mono text-gold-bright bg-gold/15 px-2 py-0.5 rounded border border-gold/30">
                {Object.values(gearSlots || {}).filter(Boolean).length}/10 {Object.values(gearSlots || {}).filter(Boolean).length === 10 ? 'Đầy Đủ' : 'Đã Đeo'}
              </span>
            </div>

            {/* 10 Gear slots in 2 columns */}
            <div className="grid grid-cols-2 gap-2">
              {GEAR_SLOT_KEYS.map((slotKey) => {
                const item = gearSlots ? gearSlots[slotKey] : null;
                if (!item) {
                  return (
                    <div
                      key={slotKey}
                      onClick={() => setOcrModalOpen(true)}
                      className="relative p-2.5 rounded-lg border border-dashed border-ink-700 bg-ink-950/60 hover:border-gold/60 hover:bg-gold/5 transition-all cursor-pointer flex flex-col justify-between min-h-[76px] group"
                    >
                      <div className="flex items-center justify-between text-xs text-ink-400 font-mono mb-1">
                        <span>[{slotKey}]</span>
                        <span className="text-[10px] text-ink-500">(Trống)</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-ink-400 group-hover:text-gold transition-colors py-1">
                        <Plus className="w-3.5 h-3.5 text-gold/60" />
                        <span className="font-mono text-[11px]">Lắp đồ</span>
                      </div>
                    </div>
                  );
                }

                const tierStr = item.tier || '';
                const isMythic = tierStr.includes("Thần Thoại");
                const isDocTran = tierStr.includes("Độc Trân");
                return (
                  <div
                    key={slotKey}
                    className={`relative p-2.5 rounded-lg border transition-all cursor-pointer group ${
                      isDocTran
                        ? 'border-doctran bg-red-950/20 hover:bg-red-950/30'
                        : isMythic
                        ? 'border-mythic bg-amber-950/20 hover:bg-amber-950/30'
                        : 'border-legendary bg-purple-950/20 hover:bg-purple-950/30'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-ink-300 font-mono mb-1">
                      <span>[{slotKey}]</span>
                      <div className="flex items-center gap-1">
                        <span className="text-gold-bright font-extrabold">+{item.refine || 0}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeGearSlot(slotKey);
                          }}
                          className="text-ink-400 hover:text-crimson-bright p-0.5"
                          title="Gỡ trang bị này"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {item.imageUrl && (
                        <img src={item.imageUrl} alt={item.name} className="w-6 h-6 object-contain rounded bg-ink-950 p-0.5 border border-gold/30 shrink-0" />
                      )}
                      <div className="font-sans text-sm font-extrabold text-white group-hover:text-gold-bright transition-colors truncate" title={item.name}>
                        {item.name}
                      </div>
                    </div>

                    <div className="text-[11px] text-ink-300 font-mono mt-1 flex items-center justify-between">
                      <span>Cấp {item.level || 79}</span>
                      <span className="text-gold font-bold">GS {item.gearScore || 0}</span>
                    </div>

                    {/* Tooltip on hover */}
                    <div className="absolute left-full top-0 ml-2 w-56 p-2.5 rounded-lg border border-gold/40 bg-ink-950 text-xs shadow-2xl z-40 hidden group-hover:block pointer-events-none">
                      <div className="font-serif font-bold text-gold-bright text-xs">{item.name}</div>
                      <div className="text-[10px] text-ink-400 font-mono">Phẩm chất: {item.tier || 'Thường'} | Cấp {item.level || 79}</div>
                      <div className="my-1.5 pt-1.5 border-t border-ink-700 text-white font-medium text-[11px]">
                        {item.mainStat || 'Không có chỉ số chính'}
                      </div>
                      <div className="space-y-0.5 text-[10px] text-jade-bright font-mono">
                        {(item.subStats || []).map((sub, i) => (
                          <div key={i}>{sub}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setOcrModalOpen(true)}
              className="w-full mt-3 py-2 rounded-lg border border-dashed border-gold/40 hover:border-gold hover:bg-gold/10 text-gold-bright text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition-all"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Chụp / Dán Ảnh Để Thay Đồ</span>
            </button>
          </div>
        </div>

        {/* ===================== CỘT 2 (GIỮA - 50% ~ 6 cols): THIỀN ĐỊNH & 6 Ô NỘI CÔNG ===================== */}
        <div className="lg:col-span-6 space-y-3">
          <div className="p-4 rounded-xl border border-gold/30 bg-ink-900/90 shadow-md flex flex-col justify-between min-h-[520px]">
            {/* Header: Nội Công (6 Ô Thiền Định) */}
            <div className="flex items-center justify-between pb-2 border-b border-ink-700/80 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-gold shadow-gold-glow animate-pulse" />
                <h3 className="text-sm sm:text-base font-sans font-extrabold text-gold-bright tracking-wide">
                  Nội Công (6 Ô Thiền Định)
                </h3>
              </div>

              {/* Ngũ Hành counter bar with authentic game glyphs */}
              <div className="flex items-center gap-1.5 text-xs font-mono">
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#1e1b0e] border border-[#fde047]/50 text-[#fef08a] shadow-sm">
                  <ElementGlyph element="Kim" className="w-3.5 h-3.5" glow={true} />
                  <span>{elementCounts.Kim}</span>
                </span>
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#220e14] border border-[#fb7185]/50 text-[#fda4af] shadow-sm">
                  <ElementGlyph element="Hoa" className="w-3.5 h-3.5" glow={true} />
                  <span>{elementCounts.Hoa}</span>
                </span>
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#0d1824] border border-[#38bdf8]/50 text-[#7dd3fc] shadow-sm">
                  <ElementGlyph element="Thuy" className="w-3.5 h-3.5" glow={true} />
                  <span>{elementCounts.Thuy}</span>
                </span>
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#0d1a14] border border-[#4ade80]/50 text-[#86efac] shadow-sm">
                  <ElementGlyph element="Moc" className="w-3.5 h-3.5" glow={true} />
                  <span>{elementCounts.Moc}</span>
                </span>
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#22160e] border border-[#fb923c]/50 text-[#fed7aa] shadow-sm">
                  <ElementGlyph element="Tho" className="w-3.5 h-3.5" glow={true} />
                  <span>{elementCounts.Tho}</span>
                </span>
              </div>
            </div>

            {/* Main Center Display: Clean 3-Column Meditation Stage (No overlapping text) */}
            <div className="relative w-full flex-1 flex flex-col rounded-xl bg-ink-950/80 border border-gold/20 overflow-hidden p-4 space-y-4">
                {/* 3 Columns: Left (Slots 1, 3, 5) | Center (Framed Shrine) | Right (Slots 2, 4, 6) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 items-stretch">
                  {/* Cột Trái: Ô #1, Ô #3, Ô #5 */}
                  <div className="flex flex-col gap-3">
                    {[0, 2, 4].map((index) => {
                      const slot = innerSlots[index];
                      const isOccupied = slot !== null;
                      return (
                        <div
                          key={index}
                          onClick={() => {
                            setIsEncyclopediaView(false);
                            openCatalogForSlot(index);
                          }}
                          onMouseEnter={() => slot && setHoveredInner(slot)}
                          onMouseLeave={() => setHoveredInner(null)}
                          className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between min-h-[112px] ${
                            isOccupied
                              ? 'border-gold/60 bg-ink-900 shadow-md hover:border-gold hover:shadow-gold-glow'
                              : 'border-dashed border-ink-700 bg-ink-950/60 hover:border-gold/60'
                          }`}
                        >
                          {isOccupied ? (
                            <div className="flex items-start gap-2.5 h-full">
                              <InnerKungfuIcon name={slot.name} element={slot.primaryElement} size={48} customImageUrl={slot.imageUrl} />
                              <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-mono text-gold-bright font-extrabold tracking-wider">
                                    Ô #{index + 1}
                                  </span>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      removeInnerSlot(index);
                                    }}
                                    className="text-ink-400 hover:text-crimson-bright p-0.5"
                                    title="Gỡ nội công"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </div>

                                <div className="font-sans text-[13px] sm:text-sm font-extrabold text-white my-0.5 tracking-wide leading-tight break-words line-clamp-2" title={slot.name}>
                                  {slot.name}
                                </div>

                                {/* 5 Elemental Glyphs with Click-to-Cycle & Quick Customization */}
                                <div className="flex items-center gap-1 py-1">
                                  {((slot && slot.elements) || []).map((el, elIdx) => (
                                    <button
                                      key={elIdx}
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        updateInnerSlotElement(index, elIdx);
                                      }}
                                      title={`Node #${elIdx + 1}: ${el} (Nhấn để đổi: Kim -> Mộc -> Thủy -> Hỏa -> Thổ)`}
                                      className="w-5 h-5 rounded-full flex items-center justify-center bg-ink-950 border border-gold/40 hover:border-gold hover:scale-125 transition-all shadow-sm cursor-pointer"
                                    >
                                      <ElementGlyph element={el} className="w-3.5 h-3.5" glow={true} />
                                    </button>
                                  ))}
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setEditingSlotElementIndex({ slotIndex: index, kungfu: slot });
                                    }}
                                    title="Tùy biến cả 5 node nguyên tố"
                                    className="ml-auto px-1.5 py-0.5 rounded bg-ink-950 border border-gold/40 hover:border-gold text-[10px] font-mono text-gold-bright hover:bg-gold/20 transition-all flex items-center gap-0.5"
                                  >
                                    <Sliders className="w-3 h-3" />
                                    <span>Đổi</span>
                                  </button>
                                </div>

                                <div className="text-xs font-mono text-ink-200 flex items-center justify-between pt-0.5">
                                  <span>Cấp {slot.level || 25}</span>
                                  <span className="text-gold-bright font-extrabold text-sm">+{slot.score}</span>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center text-ink-400 py-3">
                              <Plus className="w-4 h-4 text-gold/70 mb-1" />
                              <span className="text-xs font-serif font-bold text-ink-300">Ô #{index + 1}</span>
                              <span className="text-[9px] text-ink-500">Bấm để chọn nội công</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Cột Giữa: Bài vị Thiền Định & Vòng Càn Khôn Chu Thiên (Bố cục cân đối, hài hòa) */}
                  <div className="flex flex-col items-center justify-between p-4 sm:p-5 rounded-2xl border border-gold/40 bg-gradient-to-b from-ink-900 via-ink-950 to-ink-900 text-center shadow-xl relative overflow-hidden min-h-[360px] h-full">
                    {/* Center Avatar / Yin-Yang Medallion */}
                    <div className="my-auto py-3 flex flex-col items-center">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-gold/70 flex items-center justify-center p-2 bg-gradient-to-b from-ink-950 to-ink-900 shadow-gold-glow relative">
                        <div className="w-full h-full rounded-full border border-gold/40 flex items-center justify-center text-gold font-serif text-3xl sm:text-4xl font-bold bg-gold/10">
                          ☯
                        </div>
                      </div>
                      <div className="mt-3 text-lg font-serif font-bold text-gold-bright tracking-wide">
                        {selectedSect}
                      </div>
                      <div className="text-xs text-ink-300 font-mono mt-0.5">
                        Chu Thiên Thiền Định
                      </div>

                      {/* Elemental Activation Counter */}
                      <div className="mt-2.5 px-3.5 py-1 rounded-full bg-gold/15 border border-gold/40 shadow-sm">
                        <span className="text-xs font-mono text-gold-bright font-bold">
                          Đã kích hoạt: {(innerSlots || []).reduce((acc, s) => acc + (s && s.elements ? s.elements.filter(e => e !== '?').length : 0), 0)} / 30 Nguyên Tố
                        </span>
                      </div>
                    </div>

                    {/* Danh sách Nội công đang gắn (Hiển thị đầy đủ 100%) */}
                    <div className="w-full px-3 py-2 rounded-xl bg-ink-950/80 border border-gold/25 text-left space-y-1.5 my-2">
                      <div className="text-[10px] font-mono font-bold text-ink-300 uppercase tracking-wider flex items-center justify-between">
                        <span className="text-amber-200/90">Nội công đang gắn:</span>
                        <span className="text-gold-bright font-extrabold">
                          {(innerSlots || []).filter(Boolean).length}/6
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {(innerSlots || []).filter((s): s is NonNullable<typeof s> => Boolean(s)).length > 0 ? (
                          (innerSlots || [])
                            .filter((s): s is NonNullable<typeof s> => Boolean(s))
                            .map((s, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-ink-900/90 border border-gold/30 text-white text-[11px] font-medium leading-tight shadow-sm"
                              >
                                <ElementGlyph element={s.primaryElement} className="w-3 h-3 flex-shrink-0" glow={true} />
                                <span>{s.name}</span>
                              </span>
                            ))
                        ) : (
                          <span className="text-[11px] font-mono text-ink-500 italic">Chưa gắn nội công</span>
                        )}
                      </div>
                    </div>

                    {/* Bottom Active Circuits Indicator - Hiển thị rõ chữ, badge sáng, không ngắt chữ */}
                    <div className="w-full pt-3 border-t border-gold/25 flex flex-col items-center gap-1.5">
                      <div className="text-xs font-serif font-bold text-amber-200 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-gold-bright" />
                        <span>Chu thiên:</span>
                      </div>
                      <div className="flex flex-wrap items-center justify-center gap-1.5 w-full">
                        {(resonances || []).filter((r) => r && r.active).length > 0 ? (
                          (resonances || [])
                            .filter((r) => r && r.active)
                            .map((r) => (
                              <span
                                key={r.id}
                                className="px-2.5 py-1 rounded-md bg-gold/20 border border-gold/60 text-gold-bright text-xs font-mono font-bold shadow-gold-glow flex items-center gap-1"
                              >
                                <span>{r.name}</span>
                                <span className="px-1 py-0.2 rounded bg-ink-950/80 text-[10px] text-amber-300 border border-gold/30">
                                  Lv{r.level}
                                </span>
                              </span>
                            ))
                        ) : (
                          <span className="text-xs font-mono text-ink-400 italic">Chưa kích hoạt Chu thiên</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Cột Phải: Ô #2, Ô #4, Ô #6 */}
                  <div className="flex flex-col gap-3">
                    {[1, 3, 5].map((index) => {
                      const slot = innerSlots[index];
                      const isOccupied = slot !== null;
                      return (
                        <div
                          key={index}
                          onClick={() => {
                            setIsEncyclopediaView(false);
                            openCatalogForSlot(index);
                          }}
                          onMouseEnter={() => slot && setHoveredInner(slot)}
                          onMouseLeave={() => setHoveredInner(null)}
                          className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between min-h-[112px] ${
                            isOccupied
                              ? 'border-gold/60 bg-ink-900 shadow-md hover:border-gold hover:shadow-gold-glow'
                              : 'border-dashed border-ink-700 bg-ink-950/60 hover:border-gold/60'
                          }`}
                        >
                          {isOccupied ? (
                            <div className="flex items-start gap-2.5 h-full">
                              <InnerKungfuIcon name={slot.name} element={slot.primaryElement} size={48} customImageUrl={slot.imageUrl} />
                              <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-mono text-gold-bright font-extrabold tracking-wider">
                                    Ô #{index + 1}
                                  </span>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      removeInnerSlot(index);
                                    }}
                                    className="text-ink-400 hover:text-crimson-bright p-0.5"
                                    title="Gỡ nội công"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </div>

                                <div className="font-sans text-[13px] sm:text-sm font-extrabold text-white my-0.5 tracking-wide leading-tight break-words line-clamp-2" title={slot.name}>
                                  {slot.name}
                                </div>

                                {/* 5 Elemental Glyphs with Click-to-Cycle & Quick Customization */}
                                <div className="flex items-center gap-1 py-1">
                                  {((slot && slot.elements) || []).map((el, elIdx) => (
                                    <button
                                      key={elIdx}
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        updateInnerSlotElement(index, elIdx);
                                      }}
                                      title={`Node #${elIdx + 1}: ${el} (Nhấn để đổi: Kim -> Mộc -> Thủy -> Hỏa -> Thổ)`}
                                      className="w-5 h-5 rounded-full flex items-center justify-center bg-ink-950 border border-gold/40 hover:border-gold hover:scale-125 transition-all shadow-sm cursor-pointer"
                                    >
                                      <ElementGlyph element={el} className="w-3.5 h-3.5" glow={true} />
                                    </button>
                                  ))}
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setEditingSlotElementIndex({ slotIndex: index, kungfu: slot });
                                    }}
                                    title="Tùy biến cả 5 node nguyên tố"
                                    className="ml-auto px-1.5 py-0.5 rounded bg-ink-950 border border-gold/40 hover:border-gold text-[10px] font-mono text-gold-bright hover:bg-gold/20 transition-all flex items-center gap-0.5"
                                  >
                                    <Sliders className="w-3 h-3" />
                                    <span>Đổi</span>
                                  </button>
                                </div>

                                <div className="text-xs font-mono text-ink-200 flex items-center justify-between pt-0.5">
                                  <span>Cấp {slot.level || 25}</span>
                                  <span className="text-gold-bright font-extrabold text-sm">+{slot.score}</span>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center text-ink-400 py-3">
                              <Plus className="w-4 h-4 text-gold/70 mb-1" />
                              <span className="text-xs font-serif font-bold text-ink-300">Ô #{index + 1}</span>
                              <span className="text-[9px] text-ink-500">Bấm để chọn nội công</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Kho Nội Công Dự Trữ (Bố Cục Rõ Ràng, Cân Đối, Đầy Đủ Tên & Ảnh Thật - Đọc từ Database) */}
                <div className="pt-3 border-t border-ink-800 space-y-2.5">
                  {/* Header Toolbar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 bg-ink-900/90 p-2.5 rounded-xl border border-ink-800">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-serif font-bold text-gold-bright flex items-center gap-1.5">
                        <Archive className="w-4 h-4 text-gold" />
                        <span>Kho Nội Công Dự Trữ (Database)</span>
                      </span>
                      <span className="text-[10px] font-mono text-ink-300 px-2 py-0.5 rounded-full bg-ink-950 border border-ink-700">
                        {filteredReserve.length} / {reserveKungfus.length} bí kíp
                      </span>
                    </div>

                    {/* Search & Element Filters */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {/* Quick Search */}
                      <div className="relative w-36 sm:w-44">
                        <Search className="w-3.5 h-3.5 text-ink-400 absolute left-2 top-2" />
                        <input
                          type="text"
                          placeholder="Tìm bí kíp..."
                          value={reserveSearch}
                          onChange={(e) => setReserveSearch(e.target.value)}
                          className="w-full pl-7 pr-2 py-1 rounded-md border border-ink-700 bg-ink-950 text-[11px] text-white placeholder-ink-400 focus:border-gold outline-none"
                        />
                      </div>

                      {/* Element Filter Pills */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setReserveFilterElement('all')}
                          className={`px-2 py-1 rounded text-[10px] font-mono transition-all ${
                            reserveFilterElement === 'all'
                              ? 'bg-gold text-ink-950 font-bold shadow-sm'
                              : 'bg-ink-800 text-ink-300 hover:text-white'
                          }`}
                        >
                          Tất Cả
                        </button>
                        {(['Kim', 'Hoa', 'Thuy', 'Moc', 'Tho'] as ElementType[]).map((el) => {
                          const isCurrent = reserveFilterElement === el;
                          return (
                            <button
                              key={el}
                              onClick={() => setReserveFilterElement(el)}
                              className={`px-1.5 py-1 rounded text-[10px] font-mono transition-all flex items-center gap-1 ${
                                isCurrent
                                  ? 'bg-gold text-ink-950 font-bold shadow-sm'
                                  : 'bg-ink-800 text-ink-300 hover:text-white'
                              }`}
                              title={`Lọc hệ ${el}`}
                            >
                              <ElementGlyph element={el} className="w-3 h-3" glow={isCurrent} />
                              <span className="hidden sm:inline">{el}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Empty Database State or 3-Column Balanced Card Matrix */}
                  {reserveKungfus.length === 0 ? (
                    <div className="p-8 rounded-xl border border-dashed border-ink-700 bg-ink-950/60 text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold mx-auto">
                        <Archive className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-serif text-sm font-bold text-white">Kho Nội Công Database Đang Trống</h4>
                        <p className="text-xs text-ink-400 max-w-md mx-auto">
                          Đã xóa sạch 65 bí kíp mặc định. Sử dụng <strong>Bộ Quét Ảnh OCR</strong> (Ảnh #1 đại diện, Ảnh #2 & #3 bóc tách Nguyên Tố & tự động nạp tất cả dòng chữ) để lưu trữ bí kíp của bạn vào Database!
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setOcrModalOpen(true)}
                          className="px-3.5 py-1.5 rounded-lg bg-gold text-ink-950 text-xs font-mono font-bold flex items-center gap-1.5 shadow-gold-glow hover:brightness-110 transition-all"
                        >
                          <Camera className="w-3.5 h-3.5" />
                          <span>Quét Ảnh Thêm Vào Kho</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-72 overflow-y-auto pr-1">
                      {filteredReserve.map((ik) => {
                        const equippedSlotIdx = innerSlots.findIndex((s) => s?.id === ik.id);
                        const isEquipped = equippedSlotIdx !== -1;
                        return (
                          <div
                            key={ik.id}
                            onClick={() => {
                              if (isEquipped) {
                                removeInnerSlot(equippedSlotIdx);
                              } else {
                                const emptyIdx = innerSlots.findIndex((s) => s === null);
                                const targetIdx = emptyIdx !== -1 ? emptyIdx : (selectedInnerSlotIndex !== null ? selectedInnerSlotIndex : 0);
                                setInnerSlot(targetIdx, ik);
                              }
                            }}
                            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 relative overflow-hidden group ${
                              isEquipped
                                ? 'border-gold bg-gradient-to-r from-gold/20 via-ink-900 to-ink-900 shadow-gold-glow'
                                : 'border-ink-800 bg-ink-900 hover:border-gold/60 hover:bg-ink-850'
                            }`}
                          >
                            {/* Icon with authentic in-game crop or scanned avatar */}
                            <InnerKungfuIcon name={ik.name} element={ik.primaryElement} size={48} customImageUrl={ik.imageUrl} />

                            {/* Info & Glyphs with enlarged, clear text */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <span className="font-sans text-sm font-extrabold text-white group-hover:text-gold-bright transition-colors truncate" title={ik.name}>
                                  {ik.name}
                                </span>
                                <div className="flex items-center gap-1 shrink-0">
                                  {isEquipped ? (
                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gold text-ink-950 font-extrabold shadow-sm">
                                      Ô #{equippedSlotIdx + 1}
                                    </span>
                                  ) : (
                                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-500/40 font-bold">
                                      {ik.tier}
                                    </span>
                                  )}
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      removeKungfuFromReserve(ik.id);
                                    }}
                                    className="text-ink-500 hover:text-crimson-bright p-0.5 rounded transition-colors"
                                    title="Xóa bí kíp này khỏi Database"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>

                              {/* 5 Authentic Elemental Glyphs */}
                              <div className="flex items-center justify-between mt-1.5 text-xs font-mono">
                                <div className="flex items-center gap-1">
                                  {((ik && ik.elements) || []).map((el, elIdx) => (
                                    <div key={elIdx} className="w-4 h-4 flex items-center justify-center">
                                      <ElementGlyph element={el} className="w-3.5 h-3.5" glow={true} />
                                    </div>
                                  ))}
                                </div>
                                <span className="text-gold-bright font-extrabold text-xs">+{ik.score}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

            {/* Bottom Quick Controls for Meditation (as seen in game UI) */}
            <div className="mt-3 pt-3 border-t border-ink-700/70 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsEncyclopediaView(false);
                    openCatalogForSlot(0);
                  }}
                  className="px-3 py-1.5 rounded border border-gold/40 bg-gold/15 hover:bg-gold text-gold-bright hover:text-ink-950 font-mono text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <span className="px-1 rounded bg-ink-950 text-gold text-[10px]">C</span>
                  <span>Đổi Nội Công</span>
                </button>

                <button
                  onClick={() => {
                    setIsEncyclopediaView(true);
                    openCatalogForSlot(0);
                  }}
                  className="px-3 py-1.5 rounded border border-ink-600 bg-ink-800 hover:border-gold text-ink-200 hover:text-gold font-mono text-xs transition-all flex items-center gap-1.5"
                >
                  <span className="px-1 rounded bg-ink-950 text-ink-300 text-[10px]">T</span>
                  <span>Bách Khoa Nội Công</span>
                </button>
              </div>

              <div className="text-xs font-mono text-ink-400">
                Đã trang bị: <span className="text-gold-bright font-bold">{(innerSlots || []).filter(Boolean).length}/6</span>
              </div>
            </div>
          </div>
        </div>

        {/* ===================== CỘT 3 (PHẢI - 25% ~ 3 cols): CHU THIÊN & STATS ENGINE ===================== */}
        <div className="lg:col-span-3 space-y-3">
          {/* Section 0: Thanh Chu Thiên Ngũ Hành (In-Game Matrix chuẩn ảnh 4) */}
          <div className="p-3.5 rounded-xl border border-gold/30 bg-ink-900/95 shadow-md space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-ink-700/80">
              <span className="font-serif text-sm font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-gold-bright" />
                <span>Thanh Chu Thiên Ngũ Hành</span>
              </span>
              <span className="text-[10px] font-mono text-gold px-1.5 py-0.5 rounded bg-gold/10 border border-gold/30">
                {(innerSlots || []).reduce((acc, s) => acc + (s && s.elements ? s.elements.length : 0), 0)}/30 Node
              </span>
            </div>
            {/* 5-Row Element Resonance Track Board */}
            <ElementTrackBoard elementCounts={elementCounts} />
          </div>
        </div>
      </div>

      {/* ===================== INNER KUNGFU CATALOG DRAWER / MODAL (3-COLUMN MATRIX) ===================== */}
      {isCatalogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-4xl max-h-[85vh] rounded-2xl border border-gold/40 bg-ink-900 shadow-2xl flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gold/20 flex items-center justify-between bg-ink-850">
              <div className="flex items-center gap-2.5">
                <Swords className="w-5 h-5 text-gold-bright" />
                <div>
                  <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                    {isEncyclopediaView ? 'Bách Khoa Toàn Thư Nội Công (72 Bí Kíp)' : `Chọn Loại Nội Công Trang Bị ${selectedInnerSlotIndex !== null ? `(Ô #${selectedInnerSlotIndex + 1})` : ''}`}
                  </h3>
                  <p className="text-[11px] text-ink-300">
                    {isEncyclopediaView ? 'Tra cứu thuộc tính ngũ hành, thẻ chiến thuật và gắn nhanh vào trận pháp thiền định' : 'Bấm vào một viên nội công để gắn vào ô trận pháp'}
                  </p>
                </div>
              </div>
              <button
                onClick={closeCatalog}
                className="text-ink-400 hover:text-white p-1 rounded-full hover:bg-ink-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="p-3 border-b border-ink-700 bg-ink-950/40 flex flex-wrap items-center justify-between gap-3">
              {/* Element Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto">
                <button
                  onClick={() => setCatalogFilterElement('all')}
                  className={`px-3 py-1 rounded text-xs font-mono transition-all ${
                    catalogFilterElement === 'all'
                      ? 'bg-gold text-ink-950 font-bold'
                      : 'bg-ink-800 text-ink-200 hover:bg-ink-700'
                  }`}
                >
                  Tất Cả
                </button>
                {(['Kim', 'Moc', 'Thuy', 'Hoa', 'Tho'] as ElementType[]).map((el) => (
                  <button
                    key={el}
                    onClick={() => setCatalogFilterElement(el)}
                    className={`px-2.5 py-1 rounded text-xs font-mono transition-all ${
                      catalogFilterElement === el
                        ? 'bg-gold text-ink-950 font-bold'
                        : 'bg-ink-800 text-ink-300 hover:bg-ink-700'
                    }`}
                  >
                    {el}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative w-64">
                <Search className="w-4 h-4 text-ink-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Tìm theo tên hoặc thẻ (vd: Sát Thương, Phó Bản)..."
                  value={catalogSearch}
                  onChange={(e) => setCatalogSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-gold/30 bg-ink-800 text-xs text-white placeholder-ink-400 focus:border-gold outline-none"
                />
              </div>
            </div>

            {/* 3-Column Grid of Inner Kungfu (Identical to user uploaded game screens in folder Nội Công) */}
            <div className="p-4 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {filteredCatalog.map((kungfu) => {
                const isSelected = (innerSlots || []).some((s) => s?.id === kungfu.id);
                return (
                  <div
                    key={kungfu.id}
                    onClick={() => {
                      if (!isEncyclopediaView && selectedInnerSlotIndex !== null) {
                        setInnerSlot(selectedInnerSlotIndex, kungfu);
                        closeCatalog();
                        setNotification(`Đã trang bị [${kungfu.name}] vào Ô #${selectedInnerSlotIndex + 1}`);
                      }
                    }}
                    className={`p-3 rounded-xl border transition-all flex gap-3 ${
                      !isEncyclopediaView ? 'cursor-pointer' : ''
                    } ${
                      isSelected
                        ? 'border-gold bg-gold/15 shadow-gold-glow'
                        : 'border-[#304868]/70 bg-gradient-to-br from-[#1b2b3d] to-[#111c28] hover:border-gold/80 hover:shadow-gold-glow'
                    }`}
                  >
                    {/* Icon container with butterfly star badge for Thần Thoại */}
                    <div className="relative shrink-0 self-start">
                      <InnerKungfuIcon name={kungfu.name} element={kungfu.primaryElement} size={48} customImageUrl={kungfu.imageUrl} />
                      {kungfu.tier === 'Thần Thoại' && (
                        <div className="absolute -top-1.5 -left-1.5 w-5 h-5 bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 rounded-full border border-amber-200 flex items-center justify-center text-[10px] text-ink-950 shadow-md font-bold">
                          ★
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        {/* Title & Badge */}
                        <div className="flex items-center justify-between mb-1 gap-1">
                          <span className="font-serif text-sm font-bold text-white truncate" title={kungfu.name}>
                            {kungfu.name}
                          </span>
                          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded shrink-0 ${
                            kungfu.tier === 'Thần Thoại'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                              : 'bg-sky-500/20 text-sky-200 border border-sky-500/30'
                          }`}>
                            {kungfu.tier === 'Thần Thoại' ? 'Thần Thoại' : 'Thường dùng'}
                          </span>
                        </div>

                        {/* Elemental Glyphs Row (Matches in-game screenshots with ? badge) */}
                        <div className="flex items-center gap-1.5 my-1.5">
                          {((kungfu && kungfu.elements) || []).map((el, i) => (
                            <div key={i} className="w-4 h-4 flex items-center justify-center">
                              <ElementGlyph element={el} className="w-3.5 h-3.5" glow={true} />
                            </div>
                          ))}
                        </div>

                        {/* Tags Chips (Phó Bản, Sát Thương, Thi Đấu, etc.) */}
                        <div className="flex flex-wrap gap-1 mt-1">
                          {(kungfu.tags && kungfu.tags.length > 0 ? kungfu.tags : ['Thông Dụng']).map((t, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#162536] text-sky-200/90 border border-sky-500/25"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Bottom GS & Slot assignment if in encyclopedia mode */}
                      <div className="mt-2.5 pt-1.5 border-t border-ink-700/60 flex items-center justify-between">
                        <span className="text-[10px] font-mono text-ink-400">
                          GS {kungfu.score}
                        </span>
                        {isEncyclopediaView ? (
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] text-ink-400">Gắn vào:</span>
                            {[0, 1, 2, 3, 4, 5].map((sIdx) => (
                              <button
                                key={sIdx}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setInnerSlot(sIdx, kungfu);
                                  setNotification(`Đã gắn [${kungfu.name}] vào Ô #${sIdx + 1}`);
                                }}
                                className="w-5 h-5 rounded bg-ink-950 border border-gold/30 hover:border-gold hover:bg-gold hover:text-ink-950 text-[10px] font-mono text-gold-bright flex items-center justify-center transition-all"
                                title={`Gắn vào Ô #${sIdx + 1}`}
                              >
                                {sIdx + 1}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <span className="text-[10px] font-mono text-gold-bright hover:underline">
                            Bấm để trang bị →
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ===================== IMPORT JSON / SUPABASE CODE MODAL ===================== */}
      {importModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/85 backdrop-blur-md">
          <div className="w-full max-w-md rounded-2xl border border-gold/40 bg-ink-900 p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gold/20">
              <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
                <Upload className="w-4 h-4 text-gold" />
                <span>Nhập Cấu Hình Bộ Build</span>
              </h3>
              <button onClick={() => setImportModalOpen(false)} className="text-ink-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Supabase Code Input */}
            <div className="p-3 rounded-xl bg-ink-950 border border-gold/30 space-y-2">
              <span className="text-[11px] font-mono text-gold-bright uppercase tracking-wider block">
                Cách 1: Nạp Bằng Mã Chia Sẻ Supabase Cloud
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Nhập mã (vd: CL-9K3H)..."
                  value={importShareCode}
                  onChange={(e) => setImportShareCode(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded bg-ink-900 border border-ink-700 text-xs font-mono text-white placeholder-ink-500 uppercase outline-none focus:border-gold"
                />
                <button
                  type="button"
                  disabled={isFetchingImportCode || !importShareCode.trim()}
                  onClick={async () => {
                    const code = importShareCode.trim().toUpperCase();
                    if (!code) return;
                    setIsFetchingImportCode(true);
                    try {
                      const build = await fetchBuildByCode(code);
                      if (build) {
                        if (build.sect) setSelectedSect(build.sect);
                        if (Array.isArray(build.inner_slots)) {
                          build.inner_slots.forEach((ik, idx) => {
                            if (ik) setInnerSlot(idx, ik);
                          });
                        }
                        if (build.gear_slots && typeof build.gear_slots === 'object') {
                          Object.entries(build.gear_slots).forEach(([slotKey, item]) => {
                            if (item) updateGearItem(slotKey, item);
                          });
                        }
                        setNotification(`Đã nạp thành công bộ build [${build.title}] từ Supabase Database!`);
                        setImportModalOpen(false);
                        setImportShareCode('');
                      } else {
                        alert(`Không tìm thấy bộ build với mã: "${code}"`);
                      }
                    } finally {
                      setIsFetchingImportCode(false);
                    }
                  }}
                  className="px-3 py-1.5 rounded bg-gold text-ink-950 font-bold text-xs font-mono disabled:opacity-50 transition-all shrink-0"
                >
                  {isFetchingImportCode ? 'Đang Nạp...' : 'Nạp Cloud'}
                </button>
              </div>
            </div>

            {/* JSON Code Input */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono text-ink-300 uppercase tracking-wider block">
                Cách 2: Dán Mã JSON Cấu Hình
              </span>
              <textarea
                rows={5}
                placeholder="Dán mã JSON cấu hình bộ build vào đây..."
                value={importJsonText}
                onChange={(e) => setImportJsonText(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-gold/30 bg-ink-950 text-xs font-mono text-ink-100 outline-none focus:border-gold"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-ink-800">
              <button
                onClick={() => setImportModalOpen(false)}
                className="px-4 py-2 rounded border border-ink-600 text-xs text-ink-300 hover:bg-ink-800"
              >
                Đóng
              </button>
              <button
                onClick={handleImportSubmit}
                className="px-4 py-2 rounded bg-gold text-ink-950 font-bold text-xs shadow-gold-glow hover:brightness-110"
              >
                Xác Nhận Nạp JSON
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== CLOUD BUILD MODAL (SUPABASE) ===================== */}
      <CloudBuildModal
        isOpen={cloudModalOpen}
        onClose={() => setCloudModalOpen(false)}
        initialTab={cloudModalInitialTab}
      />
      {/* ===================== ELEMENT CUSTOMIZER MODAL ===================== */}
      {editingSlotElementIndex && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/85 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-2xl border border-gold/50 bg-ink-900 p-5 shadow-2xl space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gold/25">
              <div className="flex items-center gap-2.5">
                <InnerKungfuIcon name={editingSlotElementIndex.kungfu.name} element={editingSlotElementIndex.kungfu.primaryElement} size={42} customImageUrl={editingSlotElementIndex.kungfu.imageUrl} />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-gold/15 text-gold border border-gold/30">
                      Ô #{editingSlotElementIndex.slotIndex + 1}
                    </span>
                    <h3 className="font-serif text-base font-bold text-white">
                      {editingSlotElementIndex.kungfu.name}
                    </h3>
                  </div>
                  <p className="text-xs text-ink-300">Tùy biến 5 node thuộc tính ngũ hành để kích hoạt Chu Thiên</p>
                </div>
              </div>
              <button
                onClick={() => setEditingSlotElementIndex(null)}
                className="text-ink-400 hover:text-white p-1 rounded-full hover:bg-ink-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 5 Nodes Customization Rows */}
            <div className="space-y-2.5">
              <span className="text-[11px] font-mono text-gold-bright uppercase tracking-wider block">
                Chọn Thuộc Tính Từng Node (1 Đến 5):
              </span>
              {((editingSlotElementIndex?.kungfu?.elements) || []).map((currentEl, nodeIdx) => (
                <div key={nodeIdx} className="p-2 rounded-xl bg-ink-950 border border-ink-800 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-[70px]">
                    <span className="text-xs font-mono text-ink-400">Node #{nodeIdx + 1}:</span>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center bg-ink-900 border border-gold/30">
                      <ElementGlyph element={currentEl} className="w-4 h-4" glow={true} />
                    </div>
                  </div>

                  {/* element choices */}
                  <div className="flex items-center gap-1.5 flex-1 justify-end">
                    {(['Kim', 'Moc', 'Thuy', 'Hoa', 'Tho', '?'] as ElementType[]).map((elOption) => {
                      const isActive = currentEl === elOption;
                      return (
                        <button
                          key={elOption}
                          type="button"
                          onClick={() => {
                            updateInnerSlotElement(editingSlotElementIndex.slotIndex, nodeIdx, elOption);
                            setEditingSlotElementIndex((prev) => {
                              if (!prev) return null;
                              const newElements = [...prev.kungfu.elements];
                              newElements[nodeIdx] = elOption;
                              return {
                                ...prev,
                                kungfu: { ...prev.kungfu, elements: newElements }
                              };
                            });
                          }}
                          className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-mono transition-all ${
                            isActive
                              ? `${ELEMENT_THEME[elOption].badgeBg} border-2 ${ELEMENT_THEME[elOption].borderColor} ${ELEMENT_THEME[elOption].textColor} font-bold shadow-md scale-105`
                              : 'bg-ink-900 border border-ink-800 text-ink-400 hover:border-gold/40 hover:text-white'
                          }`}
                        >
                          <ElementGlyph element={elOption} className="w-3.5 h-3.5" glow={isActive} />
                          <span>{elOption}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Presets */}
            <div className="space-y-2 pt-2 border-t border-ink-800">
              <span className="text-[11px] font-mono text-gold-bright uppercase tracking-wider block">
                Bộ Nguyên Tố Mẫu (1-Click Presets):
              </span>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {[
                  { label: '5 Kim (Full)', elements: ['Kim', 'Kim', 'Kim', 'Kim', 'Kim'] as ElementType[] },
                  { label: '4 Kim 1 Hỏa', elements: ['Kim', 'Kim', 'Kim', 'Kim', 'Hoa'] as ElementType[] },
                  { label: '3 Kim 2 Hỏa', elements: ['Kim', 'Kim', 'Kim', 'Hoa', 'Hoa'] as ElementType[] },
                  { label: '5 Hỏa (Full)', elements: ['Hoa', 'Hoa', 'Hoa', 'Hoa', 'Hoa'] as ElementType[] },
                  { label: '4 Hỏa 1 Kim', elements: ['Hoa', 'Hoa', 'Hoa', 'Hoa', 'Kim'] as ElementType[] },
                  { label: '3 Hỏa 2 Kim', elements: ['Hoa', 'Hoa', 'Hoa', 'Kim', 'Kim'] as ElementType[] },
                  { label: '3 Mộc 2 Thủy', elements: ['Moc', 'Moc', 'Moc', 'Thuy', 'Thuy'] as ElementType[] },
                  { label: '3 Thổ 2 Kim', elements: ['Tho', 'Tho', 'Tho', 'Kim', 'Kim'] as ElementType[] },
                  { label: '5 Mộc (Full)', elements: ['Moc', 'Moc', 'Moc', 'Moc', 'Moc'] as ElementType[] },
                ].map((preset, pIdx) => (
                  <button
                    key={pIdx}
                    type="button"
                    onClick={() => {
                      setSlotElements(editingSlotElementIndex.slotIndex, preset.elements);
                      setEditingSlotElementIndex((prev) => {
                        if (!prev) return null;
                        return {
                          ...prev,
                          kungfu: { ...prev.kungfu, elements: [...preset.elements] }
                        };
                      });
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-ink-950 border border-gold/30 hover:border-gold hover:bg-gold/15 text-gold-soft hover:text-gold-bright text-left font-mono transition-all truncate"
                  >
                    • {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-2 flex items-center justify-between border-t border-ink-800">
              <button
                type="button"
                onClick={() => {
                  const cycle: ElementType[] = ['Kim', 'Moc', 'Thuy', 'Hoa', 'Tho'];
                  const randoms: ElementType[] = Array.from({ length: 5 }, () => cycle[Math.floor(Math.random() * cycle.length)]);
                  setSlotElements(editingSlotElementIndex.slotIndex, randoms);
                  setEditingSlotElementIndex((prev) => {
                    if (!prev) return null;
                    return {
                      ...prev,
                      kungfu: { ...prev.kungfu, elements: randoms }
                    };
                  });
                }}
                className="px-3 py-1.5 rounded border border-ink-700 bg-ink-950 text-xs text-ink-300 hover:text-white hover:border-gold transition-colors flex items-center gap-1.5"
              >
                <Dices className="w-3.5 h-3.5 text-gold" />
                <span>Roll Ngẫu Nhiên</span>
              </button>

              <button
                type="button"
                onClick={() => setEditingSlotElementIndex(null)}
                className="px-5 py-1.5 rounded bg-gold text-ink-950 font-bold text-xs shadow-gold-glow hover:brightness-110 transition-all"
              >
                Xác Nhận & Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

