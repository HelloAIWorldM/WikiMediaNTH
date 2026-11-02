'use client';

import { useState, useEffect } from 'react';
import { 
  Shield, 
  Swords, 
  Zap, 
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
  Layers,
  X,
  Sliders,
  Dices
} from 'lucide-react';
import { useSimulatorStore } from '@/store/useSimulatorStore';
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

const SECTS = ["Cửu Linh", "Toái Mộng", "Huyết Hà", "Thiết Y", "Thần Tương", "Tố Vấn", "Long Ngâm"];

const ELEMENT_COLORS: Record<ElementType, { name: string; bg: string; text: string; dot: string }> = {
  Kim: { name: "Kim", bg: "bg-amber-400/20 border-amber-400/50", text: "text-amber-300", dot: "bg-amber-400 shadow-[0_0_8px_#fbbf24]" },
  Moc: { name: "Mộc", bg: "bg-emerald-400/20 border-emerald-400/50", text: "text-emerald-300", dot: "bg-emerald-400 shadow-[0_0_8px_#34d399]" },
  Thuy: { name: "Thủy", bg: "bg-sky-400/20 border-sky-400/50", text: "text-sky-300", dot: "bg-sky-400 shadow-[0_0_8px_#38bdf8]" },
  Hoa: { name: "Hỏa", bg: "bg-rose-500/20 border-rose-500/50", text: "text-rose-400", dot: "bg-rose-500 shadow-[0_0_8px_#f43f5e]" },
  Tho: { name: "Thổ", bg: "bg-amber-700/20 border-amber-700/50", text: "text-amber-600", dot: "bg-amber-600 shadow-[0_0_8px_#d97706]" },
};

export default function SimulatorPage() {
  const {
    selectedSect,
    activePresetId,
    gearSlots,
    innerSlots,
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
    openCatalogForSlot,
    closeCatalog,
    setOcrModalOpen,
    setPendingOcrImage,
    exportBuildJSON,
    importBuildJSON,
    setNotification
  } = useSimulatorStore();

  const [activeCenterTab, setActiveCenterTab] = useState<'noicong' | 'thienphu'>('noicong');
  const [catalogFilterElement, setCatalogFilterElement] = useState<string>('all');
  const [catalogSearch, setCatalogSearch] = useState<string>('');
  const [reserveFilterElement, setReserveFilterElement] = useState<string>('all');
  const [reserveSearch, setReserveSearch] = useState<string>('');
  const [importModalOpen, setImportModalOpen] = useState<boolean>(false);
  const [importJsonText, setImportJsonText] = useState<string>('');
  const [hoveredInner, setHoveredInner] = useState<InnerKungfu | null>(null);
  const [editingSlotElementIndex, setEditingSlotElementIndex] = useState<{ slotIndex: number; kungfu: InnerKungfu } | null>(null);

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
  const filteredCatalog = INNER_KUNGFU_DATABASE.filter((ik) => {
    const matchSearch = ik.name.toLowerCase().includes(catalogSearch.toLowerCase());
    const matchElement = catalogFilterElement === 'all' || ik.elements.includes(catalogFilterElement as ElementType);
    return matchSearch && matchElement;
  });

  // Filtered Reserve Dock list
  const filteredReserve = INNER_KUNGFU_DATABASE.filter((ik) => {
    const matchSearch = ik.name.toLowerCase().includes(reserveSearch.toLowerCase());
    const matchElement = reserveFilterElement === 'all' || ik.elements.includes(reserveFilterElement as ElementType);
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

          {/* Preset Selector */}
          <div className="flex items-center gap-2 pl-3 border-l border-ink-700">
            <span className="text-xs text-gold font-mono uppercase tracking-wider">Mẫu Có Sẵn:</span>
            <select
              value={activePresetId}
              onChange={(e) => loadPreset(e.target.value)}
              className="bg-ink-800 border border-gold/30 rounded px-2.5 py-1 text-xs text-ink-100 font-sans focus:border-gold outline-none"
            >
              {POPULAR_PRESETS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOcrModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-gold/40 bg-gold/15 hover:bg-gold/25 text-gold-bright text-xs font-mono font-bold transition-all"
            title="Quét trang bị từ ảnh chụp màn hình"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Quét Ảnh (OCR)</span>
          </button>

          <button
            onClick={handleShareClick}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-ink-600 bg-ink-800 hover:border-gold text-ink-200 hover:text-gold text-xs font-mono transition-all"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Chia Sẻ</span>
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
                10/10 Đầy Đủ
              </span>
            </div>

            {/* 10 Gear slots in 2 columns */}
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(gearSlots).map(([slotKey, item]) => {
                const isMythic = item.tier.includes("Thần Thoại");
                const isDocTran = item.tier.includes("Độc Trân");
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
                    <div className="flex items-center justify-between text-[10px] text-ink-400 font-mono mb-1">
                      <span>[{slotKey}]</span>
                      <span className="text-gold-bright font-bold">+{item.refine}</span>
                    </div>

                    <div className="font-serif text-xs font-bold text-white group-hover:text-gold-bright transition-colors truncate">
                      {item.name}
                    </div>

                    <div className="text-[9px] text-ink-300 font-mono mt-0.5">
                      Cấp {item.level} • GS {item.gearScore}
                    </div>

                    {/* Tooltip on hover */}
                    <div className="absolute left-full top-0 ml-2 w-56 p-2.5 rounded-lg border border-gold/40 bg-ink-950 text-xs shadow-2xl z-40 hidden group-hover:block pointer-events-none">
                      <div className="font-serif font-bold text-gold-bright text-xs">{item.name}</div>
                      <div className="text-[10px] text-ink-400 font-mono">Phẩm chất: {item.tier} | Cấp {item.level}</div>
                      <div className="my-1.5 pt-1.5 border-t border-ink-700 text-white font-medium text-[11px]">
                        {item.mainStat}
                      </div>
                      <div className="space-y-0.5 text-[10px] text-jade-bright font-mono">
                        {item.subStats.map((sub, i) => (
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
            {/* Sub-tabs: Nội Công & Thiên Phú */}
            <div className="flex items-center justify-between pb-2 border-b border-ink-700/80 mb-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveCenterTab('noicong')}
                  className={`px-3 py-1 rounded text-xs font-serif font-bold transition-all ${
                    activeCenterTab === 'noicong'
                      ? 'bg-gold text-ink-950 shadow-gold-glow'
                      : 'text-ink-300 hover:text-gold'
                  }`}
                >
                  Nội Công (6 Ô Thiền Định)
                </button>
                <button
                  onClick={() => setActiveCenterTab('thienphu')}
                  className={`px-3 py-1 rounded text-xs font-serif font-bold transition-all ${
                    activeCenterTab === 'thienphu'
                      ? 'bg-gold text-ink-950 shadow-gold-glow'
                      : 'text-ink-300 hover:text-gold'
                  }`}
                >
                  Thiên Phú & Đặc Kỹ
                </button>
              </div>

              {/* Ngũ Hành counter bar with authentic game glyphs */}
              <div className="flex items-center gap-1.5 text-[11px] font-mono">
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
            {activeCenterTab === 'noicong' ? (
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
                          onClick={() => openCatalogForSlot(index)}
                          onMouseEnter={() => slot && setHoveredInner(slot)}
                          onMouseLeave={() => setHoveredInner(null)}
                          className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between min-h-[104px] ${
                            isOccupied
                              ? 'border-gold/60 bg-ink-900 shadow-md hover:border-gold hover:shadow-gold-glow'
                              : 'border-dashed border-ink-700 bg-ink-950/60 hover:border-gold/60'
                          }`}
                        >
                          {isOccupied ? (
                            <div className="flex items-start gap-2.5 h-full">
                              <InnerKungfuIcon name={slot.name} element={slot.primaryElement} size={42} />
                              <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] font-mono text-gold-bright font-bold">
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

                                <div className="font-serif text-sm font-bold text-white truncate my-0.5">
                                  {slot.name}
                                </div>

                                {/* 5 Elemental Glyphs with Click-to-Cycle & Quick Customization */}
                                <div className="flex items-center gap-1 py-1">
                                  {slot.elements.map((el, elIdx) => (
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
                                    className="ml-auto px-1.5 py-0.5 rounded bg-ink-950 border border-gold/30 hover:border-gold text-[9px] font-mono text-gold-bright hover:bg-gold/20 transition-all flex items-center gap-0.5"
                                  >
                                    <Sliders className="w-2.5 h-2.5" />
                                    <span>Đổi</span>
                                  </button>
                                </div>

                                <div className="text-[10px] font-mono text-ink-300 flex items-center justify-between">
                                  <span>Cấp {slot.level || 25}</span>
                                  <span className="text-gold font-bold">+{slot.score}</span>
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

                  {/* Cột Giữa: Bài vị Thiền Định & Vòng Càn Khôn Chu Thiên (Khung khép kín hoàn toàn, không đè chữ) */}
                  <div className="flex flex-col items-center justify-between p-4 rounded-xl border border-gold/40 bg-gradient-to-b from-ink-900 via-ink-950 to-ink-900 text-center shadow-lg relative overflow-hidden min-h-[310px]">
                    {/* Header: Càn - Khôn Bát Quái */}
                    <div className="flex items-center gap-2 text-[11px] font-mono text-gold-bright tracking-widest uppercase">
                      <span className="text-gold font-bold">☰ CÀN</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-gold/60" />
                      <span>THIỀN ĐỊNH</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-gold/60" />
                      <span className="text-gold font-bold">☷ KHÔN</span>
                    </div>

                    {/* Center Avatar / Yin-Yang Medallion */}
                    <div className="my-auto py-3 flex flex-col items-center">
                      <div className="w-24 h-24 rounded-full border-2 border-gold/50 flex items-center justify-center p-2 bg-ink-950 shadow-gold-glow relative">
                        <div className="w-full h-full rounded-full border border-gold/30 flex items-center justify-center text-gold font-serif text-3xl font-bold bg-gold/5 animate-spin-slow">
                          ☯
                        </div>
                      </div>
                      <div className="mt-3 text-sm font-serif font-bold text-gold-bright tracking-wider">
                        {selectedSect}
                      </div>
                      <div className="text-[11px] text-ink-300 font-mono">
                        Chu Thiên Thiền Định
                      </div>
                      <div className="mt-2 text-xs font-mono px-2.5 py-0.5 rounded bg-ink-900 border border-gold/30 text-gold shadow-sm">
                        Đã kích hoạt: {innerSlots.reduce((acc, s) => acc + (s ? s.elements.length : 0), 0)} / 30 Nguyên Tố
                      </div>
                    </div>

                    {/* Bottom Active Circuits Indicator */}
                    <div className="w-full pt-2 border-t border-ink-800 text-[10px] font-mono text-ink-300">
                      <span>Chu thiên:&nbsp;</span>
                      <span className="text-gold-bright font-bold">
                        {resonances.filter((r) => r.active).map((r) => r.name).join(', ') || 'Chưa kích hoạt'}
                      </span>
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
                          onClick={() => openCatalogForSlot(index)}
                          onMouseEnter={() => slot && setHoveredInner(slot)}
                          onMouseLeave={() => setHoveredInner(null)}
                          className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between min-h-[104px] ${
                            isOccupied
                              ? 'border-gold/60 bg-ink-900 shadow-md hover:border-gold hover:shadow-gold-glow'
                              : 'border-dashed border-ink-700 bg-ink-950/60 hover:border-gold/60'
                          }`}
                        >
                          {isOccupied ? (
                            <div className="flex items-start gap-2.5 h-full">
                              <InnerKungfuIcon name={slot.name} element={slot.primaryElement} size={42} />
                              <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] font-mono text-gold-bright font-bold">
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

                                <div className="font-serif text-sm font-bold text-white truncate my-0.5">
                                  {slot.name}
                                </div>

                                {/* 5 Elemental Glyphs with Click-to-Cycle & Quick Customization */}
                                <div className="flex items-center gap-1 py-1">
                                  {slot.elements.map((el, elIdx) => (
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
                                    className="ml-auto px-1.5 py-0.5 rounded bg-ink-950 border border-gold/30 hover:border-gold text-[9px] font-mono text-gold-bright hover:bg-gold/20 transition-all flex items-center gap-0.5"
                                  >
                                    <Sliders className="w-2.5 h-2.5" />
                                    <span>Đổi</span>
                                  </button>
                                </div>

                                <div className="text-[10px] font-mono text-ink-300 flex items-center justify-between">
                                  <span>Cấp {slot.level || 25}</span>
                                  <span className="text-gold font-bold">+{slot.score}</span>
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

                {/* Kho Nội Công Dự Trữ (Bố Cục Rõ Ràng, Cân Đối, Đầy Đủ Tên & Ảnh Thật) */}
                <div className="pt-3 border-t border-ink-800 space-y-2.5">
                  {/* Header Toolbar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 bg-ink-900/90 p-2.5 rounded-xl border border-ink-800">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-serif font-bold text-gold-bright flex items-center gap-1.5">
                        <span>📦 Kho Nội Công Dự Trữ</span>
                      </span>
                      <span className="text-[10px] font-mono text-ink-300 px-2 py-0.5 rounded-full bg-ink-950 border border-ink-700">
                        {filteredReserve.length} / {INNER_KUNGFU_DATABASE.length} bí kíp
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

                  {/* 3-Column Balanced Card Matrix */}
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
                          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 relative overflow-hidden ${
                            isEquipped
                              ? 'border-gold bg-gradient-to-r from-gold/20 via-ink-900 to-ink-900 shadow-gold-glow'
                              : 'border-ink-800 bg-ink-900 hover:border-gold/60 hover:bg-ink-850'
                          }`}
                        >
                          {/* Icon with authentic in-game crop */}
                          <InnerKungfuIcon name={ik.name} element={ik.primaryElement} size={42} />

                          {/* Info & Glyphs */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <span className="font-serif text-xs font-bold text-white truncate" title={ik.name}>
                                {ik.name}
                              </span>
                              {isEquipped ? (
                                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-gold text-ink-950 font-bold shrink-0">
                                  Ô #{equippedSlotIdx + 1}
                                </span>
                              ) : (
                                <span className="text-[9px] font-mono px-1 rounded bg-ink-950 text-gold border border-gold/30 shrink-0">
                                  {ik.tier}
                                </span>
                              )}
                            </div>

                            {/* 5 Authentic Elemental Glyphs */}
                            <div className="flex items-center justify-between mt-1.5 text-[10px] font-mono">
                              <div className="flex items-center gap-1">
                                {ik.elements.map((el, elIdx) => (
                                  <div key={elIdx} className="w-3.5 h-3.5 flex items-center justify-center">
                                    <ElementGlyph element={el} className="w-3 h-3" glow={true} />
                                  </div>
                                ))}
                              </div>
                              <span className="text-gold-bright font-bold">+{ik.score}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              /* Talent / Đặc Kỹ Tab */
              <div className="flex-1 p-4 rounded-xl bg-ink-950/60 border border-gold/15 space-y-3">
                <h4 className="font-serif text-sm font-bold text-gold-bright">
                  Cây Thiên Phú & Đặc Kỹ Lưu Phái {selectedSect}
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg border border-gold/30 bg-ink-850">
                    <span className="text-gold font-bold block">Đặc Kỹ: Cuồng Kích Kiếm Quyết</span>
                    <span className="text-ink-300 text-[11px]">Tăng 15% Sát thương kỹ năng chủ lực khi HP trên 70%.</span>
                  </div>
                  <div className="p-3 rounded-lg border border-gold/30 bg-ink-850">
                    <span className="text-gold font-bold block">Đặc Kỹ: Nhập Thần Định Hồn</span>
                    <span className="text-ink-300 text-[11px]">Giảm 10% tiêu hao nội lực, tăng 50 điểm Phá Phòng.</span>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Quick Controls for Meditation (as seen in game UI) */}
            <div className="mt-3 pt-3 border-t border-ink-700/70 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openCatalogForSlot(0)}
                  className="px-3 py-1.5 rounded border border-gold/40 bg-gold/15 hover:bg-gold text-gold-bright hover:text-ink-950 font-mono text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <span className="px-1 rounded bg-ink-950 text-gold text-[10px]">C</span>
                  <span>Đổi Nội Công</span>
                </button>

                <button
                  onClick={() => openCatalogForSlot(0)}
                  className="px-3 py-1.5 rounded border border-ink-600 bg-ink-800 hover:border-gold text-ink-200 hover:text-gold font-mono text-xs transition-all flex items-center gap-1.5"
                >
                  <span className="px-1 rounded bg-ink-950 text-ink-300 text-[10px]">T</span>
                  <span>Bách Khoa Nội Công</span>
                </button>
              </div>

              <div className="text-xs font-mono text-ink-400">
                Đã trang bị: <span className="text-gold-bright font-bold">{innerSlots.filter(Boolean).length}/6</span>
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
                {innerSlots.reduce((acc, s) => acc + (s ? s.elements.length : 0), 0)}/30 Node
              </span>
            </div>
            {/* 5-Row Element Resonance Track Board */}
            <ElementTrackBoard elementCounts={elementCounts} />
          </div>

          {/* Section 1: Chu Thiên Kích Hoạt (Resonances Matrix) */}
          <div className="p-3.5 rounded-xl border border-gold/30 bg-ink-900/90 shadow-md space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-ink-700/80">
              <span className="font-serif text-sm font-bold text-white flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-gold-bright" />
                <span>Hiệu Ứng Chu Thiên Kích Hoạt</span>
              </span>
              <span className="text-[10px] font-mono text-gold px-1.5 py-0.5 rounded bg-gold/10 border border-gold/30">
                {resonances.filter((r) => r.active).length} Kích Hoạt
              </span>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {resonances.map((res) => (
                <div
                  key={res.id}
                  className={`p-2 rounded-lg border transition-all text-xs ${
                    res.active
                      ? 'border-gold/50 bg-gold/10 text-white shadow-gold-glow'
                      : 'border-ink-700 bg-ink-950/40 text-ink-400 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className={`font-serif font-bold ${res.active ? 'text-gold-bright' : 'text-ink-400'}`}>
                      {res.name}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 rounded bg-ink-950">
                      {res.active ? `Cấp ${res.level}` : 'Chưa mở'}
                    </span>
                  </div>
                  <div className="text-[10px] text-ink-300 leading-snug">
                    {res.effectText}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Real-time Stats Breakdown Panel */}
          <div className="p-3.5 rounded-xl border border-gold/30 bg-ink-900/90 shadow-md space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-ink-700/80">
              <span className="font-serif text-sm font-bold text-white flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-gold-bright" />
                <span>Bảng Chỉ Số (Stats Live)</span>
              </span>
              <span className="text-[10px] font-mono text-jade-bright font-bold">
                Chuẩn VNG
              </span>
            </div>

            {/* Total Power & Estimated DPS Hero Badges */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-gold/20 via-ink-850 to-ink-900 border border-gold/40 text-center">
                <span className="text-[10px] text-gold font-mono uppercase block">Tổng Lực Chiến</span>
                <span className="font-mono text-lg font-bold text-gold-bright">
                  {stats.totalPower.toLocaleString()}
                </span>
              </div>
              <div className="p-2 rounded-lg bg-gradient-to-br from-crimson/20 via-ink-850 to-ink-900 border border-crimson/40 text-center">
                <span className="text-[10px] text-crimson-bright font-mono uppercase block">Ước Tính DPS</span>
                <span className="font-mono text-lg font-bold text-white">
                  {stats.dpsEstimate.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Specific Attributes List */}
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex items-center justify-between p-1.5 rounded bg-ink-800/60">
                <span className="text-ink-300">Tấn Công:</span>
                <span className="font-bold text-white">{stats.attack.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between p-1.5 rounded bg-ink-800/60">
                <span className="text-ink-300">Phá Phòng:</span>
                <span className="font-bold text-amber-300">1,890 (+150)</span>
              </div>
              <div className="flex items-center justify-between p-1.5 rounded bg-ink-800/60">
                <span className="text-ink-300">Tỉ Lệ Hội Tâm:</span>
                <span className="font-bold text-rose-400">{stats.critRate}%</span>
              </div>
              <div className="flex items-center justify-between p-1.5 rounded bg-ink-800/60">
                <span className="text-ink-300">Sát Thương Bạo:</span>
                <span className="font-bold text-rose-400">{stats.critDamage}%</span>
              </div>
              <div className="flex items-center justify-between p-1.5 rounded bg-ink-800/60">
                <span className="text-ink-300">Khắc Chế Quái:</span>
                <span className="font-bold text-jade-bright">+{stats.bossBreakthrough}%</span>
              </div>
              <div className="flex items-center justify-between p-1.5 rounded bg-ink-800/60">
                <span className="text-ink-300">Khí Huyết (HP):</span>
                <span className="font-bold text-white">{stats.hp.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handleShareClick}
              className="w-full py-2 rounded-lg bg-gradient-to-r from-gold via-gold-bright to-gold text-ink-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:brightness-110 transition-all"
            >
              Lưu & Xuất Bảng Mẫu (Publish)
            </button>
          </div>
        </div>
      </div>

      {/* ===================== INNER KUNGFU CATALOG DRAWER / MODAL (3-COLUMN MATRIX) ===================== */}
      {isCatalogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-4xl max-h-[85vh] rounded-2xl border border-gold/40 bg-ink-900 shadow-2xl flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gold/20 flex items-center justify-between bg-ink-850">
              <div className="flex items-center gap-2">
                <Swords className="w-5 h-5 text-gold-bright" />
                <h3 className="font-serif text-lg font-bold text-white">
                  Chọn Loại Nội Công Trang Bị {selectedInnerSlotIndex !== null ? `(Ô #${selectedInnerSlotIndex + 1})` : ''}
                </h3>
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
                  placeholder="Tìm theo tên nội công..."
                  value={catalogSearch}
                  onChange={(e) => setCatalogSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-gold/30 bg-ink-800 text-xs text-white placeholder-ink-400 focus:border-gold outline-none"
                />
              </div>
            </div>

            {/* 3-Column Grid of Inner Kungfu (Identical to user uploaded game screens 1, 2, 3) */}
            <div className="p-4 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {filteredCatalog.map((kungfu) => {
                const isSelected = innerSlots.some((s) => s?.id === kungfu.id);
                return (
                  <div
                    key={kungfu.id}
                    onClick={() => {
                      if (selectedInnerSlotIndex !== null) {
                        setInnerSlot(selectedInnerSlotIndex, kungfu);
                      }
                    }}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex gap-3 ${
                      isSelected
                        ? 'border-gold bg-gold/15 shadow-gold-glow'
                        : 'border-ink-700 bg-ink-850 hover:border-gold/60 hover:bg-ink-800'
                    }`}
                  >
                    <InnerKungfuIcon name={kungfu.name} element={kungfu.primaryElement} size={44} />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-serif text-sm font-bold text-white truncate">
                            {kungfu.name}
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-ink-950 text-gold border border-gold/30 shrink-0 ml-1">
                            {kungfu.tier}
                          </span>
                        </div>
                        <p className="text-[11px] text-ink-300 line-clamp-2 leading-relaxed">
                          {kungfu.description}
                        </p>
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-ink-700/60 flex items-center justify-between">
                        {/* 5 Elemental Glyphs */}
                        <div className="flex items-center gap-1.5">
                          {kungfu.elements.map((el, i) => (
                            <div key={i} className="w-4 h-4 flex items-center justify-center">
                              <ElementGlyph element={el} className="w-3.5 h-3.5" glow={true} />
                            </div>
                          ))}
                        </div>
                        <span className="text-[10px] font-mono text-ink-400">
                          GS {kungfu.score}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ===================== IMPORT JSON MODAL ===================== */}
      {importModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/85 backdrop-blur-md">
          <div className="w-full max-w-md rounded-2xl border border-gold/40 bg-ink-900 p-5 shadow-2xl space-y-3">
            <h3 className="font-serif text-base font-bold text-white">Nhập Cấu Hình Build JSON</h3>
            <textarea
              rows={8}
              placeholder="Dán mã JSON cấu hình bộ build vào đây..."
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              className="w-full p-3 rounded-lg border border-gold/30 bg-ink-950 text-xs font-mono text-ink-100 outline-none focus:border-gold"
            />
            <div className="flex justify-end gap-2">
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
                Xác Nhận Nạp
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ===================== ELEMENT CUSTOMIZER MODAL ===================== */}
      {editingSlotElementIndex && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/85 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-2xl border border-gold/50 bg-ink-900 p-5 shadow-2xl space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gold/25">
              <div className="flex items-center gap-2.5">
                <InnerKungfuIcon name={editingSlotElementIndex.kungfu.name} element={editingSlotElementIndex.kungfu.primaryElement} size={42} />
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
              {editingSlotElementIndex.kungfu.elements.map((currentEl, nodeIdx) => (
                <div key={nodeIdx} className="p-2 rounded-xl bg-ink-950 border border-ink-800 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-[70px]">
                    <span className="text-xs font-mono text-ink-400">Node #{nodeIdx + 1}:</span>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center bg-ink-900 border border-gold/30">
                      <ElementGlyph element={currentEl} className="w-4 h-4" glow={true} />
                    </div>
                  </div>

                  {/* 5 element choices */}
                  <div className="flex items-center gap-1.5 flex-1 justify-end">
                    {(['Kim', 'Moc', 'Thuy', 'Hoa', 'Tho'] as ElementType[]).map((elOption) => {
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

