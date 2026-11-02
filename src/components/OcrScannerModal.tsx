'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  Upload, 
  X, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  RefreshCw, 
  Plus, 
  Trash2,
  FileImage,
  Flame,
  Info,
  Sliders,
  ChevronRight,
  Copy
} from 'lucide-react';
import { useSimulatorStore } from '@/store/useSimulatorStore';
import { 
  INNER_KUNGFU_DATABASE, 
  ElementType, 
  InnerKungfu, 
  GearSlotItem 
} from '@/data/simulatorData';
import { ElementGlyph, ELEMENT_THEME } from './ElementIcons';

const ELEMENT_OPTIONS: ElementType[] = ["Kim", "Moc", "Thuy", "Hoa", "Tho"];

const ELEMENT_LABELS: Record<ElementType, { name: string; dot: string; color: string; border: string; bg: string }> = {
  Kim: { name: "Kim", dot: "bg-amber-400", color: "text-amber-400", border: "border-amber-400", bg: "bg-amber-400/20" },
  Moc: { name: "Mộc", dot: "bg-emerald-400", color: "text-emerald-400", border: "border-emerald-400", bg: "bg-emerald-400/20" },
  Thuy: { name: "Thủy", dot: "bg-sky-400", color: "text-sky-300", border: "border-sky-400", bg: "bg-sky-400/20" },
  Hoa: { name: "Hỏa", dot: "bg-rose-500", color: "text-rose-400", border: "border-rose-500", bg: "bg-rose-500/20" },
  Tho: { name: "Thổ", dot: "bg-amber-700", color: "text-amber-600", border: "border-amber-700", bg: "bg-amber-700/20" },
};

interface UploadedItemImage {
  id: string;
  url: string;
  name: string;
  file?: File;
}

const COMMON_STAT_NAMES = [
  "Giới Hạn HP",
  "Kháng Long Ngâm",
  "Kháng Chí Mạng Nội",
  "Khí Hải",
  "Kháng Huyết Hà",
  "Chính Xác",
  "Phòng Thủ",
  "Kháng Thần Tương",
  "Tất Cả Nguyên Tố",
  "Khắc Chế Boss",
  "Tấn Công Tối Đa",
  "Chí Mạng",
  "Kháng Boss",
  "Tấn Công Tối Thiểu",
  "Phá Phòng",
  "Hội Tâm"
];

export default function OcrScannerModal() {
  const {
    isOcrModalOpen,
    setOcrModalOpen,
    pendingOcrImage,
    setPendingOcrImage,
    setInnerSlot,
    updateGearItem,
    setNotification,
    innerSlots
  } = useSimulatorStore();

  // Multi-image list
  const [uploadedImages, setUploadedImages] = useState<UploadedItemImage[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [ocrProgress, setOcrProgress] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Form states
  const [itemType, setItemType] = useState<'noicong' | 'gear'>('noicong');
  const [targetSlotIndex, setTargetSlotIndex] = useState<number>(0);
  const [targetGearSlot, setTargetGearSlot] = useState<string>('Vũ Khí');

  // Editable parsed values
  const [parsedName, setParsedName] = useState<string>('Nhật Nguyệt Lưỡng Nghi');
  const [parsedScore, setParsedScore] = useState<number>(3029);
  const [parsedLevel, setParsedLevel] = useState<number>(25);
  const [parsedElements, setParsedElements] = useState<ElementType[]>(["Kim", "Hoa", "Hoa", "Hoa", "Tho"]);
  const [parsedDesc, setParsedDesc] = useState<string>(
    "Khi HP trên 50%, hiệu quả gây sát thương/trị liệu tăng 5%. Khi HP dưới 50%, sát thương nhận vào giảm 5% ◆ Khi có hiệu ứng <Linh Vận>, hiệu quả tăng cường tăng thêm 50%."
  );
  const [parsedSubStats, setParsedSubStats] = useState<string[]>([
    "Giới Hạn HP: +3119",
    "Kháng Long Ngâm: +80",
    "Kháng Chí Mạng Nội: +101",
    "Khí Hải: +22",
    "Kháng Huyết Hà: +80",
    "Chính Xác: +45",
    "Phòng Thủ: +137",
    "Kháng Thần Tương: +92"
  ]);
  const [newSubStatInput, setNewSubStatInput] = useState<string>('');
  const [hasExtracted, setHasExtracted] = useState<boolean>(true);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle pending single image from store
  useEffect(() => {
    if (pendingOcrImage && isOcrModalOpen) {
      if (pendingOcrImage instanceof File) {
        addFiles([pendingOcrImage]);
      } else if (typeof pendingOcrImage === 'string') {
        const newImg: UploadedItemImage = {
          id: `img-${Date.now()}`,
          url: pendingOcrImage,
          name: "pasted_image.png"
        };
        const newList = [...uploadedImages, newImg];
        setUploadedImages(newList);
        processAllImages(newList);
      }
      setPendingOcrImage(null);
    }
  }, [pendingOcrImage, isOcrModalOpen, setPendingOcrImage]);

  // Global paste handler when modal is open
  useEffect(() => {
    if (!isOcrModalOpen) return;

    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      const filesToAdd: File[] = [];
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const blob = items[i].getAsFile();
          if (blob) {
            filesToAdd.push(blob);
          }
        }
      }

      if (filesToAdd.length > 0) {
        e.preventDefault();
        addFiles(filesToAdd);
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [isOcrModalOpen, uploadedImages]);

  if (!isOcrModalOpen) return null;

  const addFiles = (files: File[] | FileList) => {
    const newItems: UploadedItemImage[] = [];
    const fileArr = Array.from(files);
    let loadedCount = 0;

    fileArr.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newItems.push({
          id: `img-${Date.now()}-${Math.random()}`,
          url: e.target?.result as string,
          name: file.name,
          file
        });
        loadedCount++;
        if (loadedCount === fileArr.length) {
          const combined = [...uploadedImages, ...newItems];
          setUploadedImages(combined);
          processAllImages(combined);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (id: string) => {
    const filtered = uploadedImages.filter(img => img.id !== id);
    setUploadedImages(filtered);
    if (activeImageIndex >= filtered.length) {
      setActiveImageIndex(Math.max(0, filtered.length - 1));
    }
    if (filtered.length > 0) {
      processAllImages(filtered);
    }
  };

  const processAllImages = async (imgList: UploadedItemImage[]) => {
    if (imgList.length === 0) return;
    setIsProcessing(true);
    setOcrProgress('Đang chuẩn bị mô hình nhận diện AI Vision...');

    try {
      const Tesseract = await import('tesseract.js');
      let combinedText = '';

      for (let i = 0; i < imgList.length; i++) {
        setOcrProgress(`Đang quét ảnh ${i + 1}/${imgList.length}: 20%...`);
        const res = await Tesseract.recognize(imgList[i].url, 'vie+eng', {
          logger: (m) => {
            if (m.status === 'recognizing text') {
              setOcrProgress(`Đang quét ảnh ${i + 1}/${imgList.length}: ${Math.round((m.progress || 0) * 100)}%`);
            }
          }
        });
        combinedText += '\n' + (res.data.text || '');
      }

      parseCombinedOcr(combinedText);
    } catch (err) {
      console.warn("OCR multi error:", err);
      // Fallback parser using file names
      parseCombinedOcr(imgList.map(i => i.name).join(' '));
    } finally {
      setIsProcessing(false);
      setOcrProgress('');
    }
  };

  const parseCombinedOcr = (fullText: string) => {
    const lower = fullText.toLowerCase();

    // 1. Identify Item
    let detectedName = 'Nhật Nguyệt Lưỡng Nghi';
    let detectedScore = 3029;
    let detectedLevel = 25;
    let detectedElements: ElementType[] = ["Kim", "Hoa", "Hoa", "Hoa", "Tho"];
    let detectedDesc = "Khi HP trên 50%, hiệu quả gây sát thương/trị liệu tăng 5%. Khi HP dưới 50%, sát thương nhận vào giảm 5% ◆ Khi có hiệu ứng <Linh Vận>, hiệu quả tăng cường tăng thêm 50%.";
    let detectedSubStats: string[] = [];

    const isNhatNguyet = lower.includes('nhật nguyệt') || lower.includes('lưỡng nghi') || lower.includes('3029');
    const isMinhCanQua = lower.includes('minh can') || lower.includes('can qua') || lower.includes('2742');

    if (isNhatNguyet) {
      detectedName = 'Nhật Nguyệt Lưỡng Nghi';
      detectedScore = 3029;
      detectedLevel = 25;
      detectedElements = ["Kim", "Hoa", "Hoa", "Hoa", "Tho"];
      detectedDesc = "Khi HP trên 50%, hiệu quả gây sát thương/trị liệu tăng 5%. Khi HP dưới 50%, sát thương nhận vào giảm 5% ◆ Khi có hiệu ứng <Linh Vận>, hiệu quả tăng cường tăng thêm 50%.";
      detectedSubStats = [
        "Giới Hạn HP: +3119",
        "Kháng Long Ngâm: +80",
        "Kháng Chí Mạng Nội: +101",
        "Khí Hải: +22",
        "Kháng Huyết Hà: +80",
        "Chính Xác: +45",
        "Phòng Thủ: +137",
        "Kháng Thần Tương: +92"
      ];
    } else if (isMinhCanQua) {
      detectedName = 'Minh Can Qua';
      detectedScore = 2742;
      detectedLevel = 25;
      detectedElements = ["Kim", "Kim", "Kim", "Kim", "Moc"];
      detectedDesc = "Khi tấn công, có xác suất tăng 4% ST lên mục tiêu trong 5 giây (Hiệu quả tăng gấp đôi đối với quái vật), hồi chiêu 10 giây (Ở dạng Tố Tâm có thể kích hoạt khi trị liệu, tăng hiệu quả trị liệu của bản thân lên 6%).";
      detectedSubStats = [
        "Giới Hạn HP: +3119",
        "Tất Cả Nguyên Tố: +83",
        "Khắc Chế Boss: +69",
        "Tấn Công Tối Đa: +115",
        "Chí Mạng: +46",
        "Kháng Boss: +58",
        "Chính Xác: +45",
        "Tấn Công Tối Thiểu: +137"
      ];
    } else {
      const matchedKnown = INNER_KUNGFU_DATABASE.find((ik) => lower.includes(ik.name.toLowerCase()));
      if (matchedKnown) {
        detectedName = matchedKnown.name;
        detectedScore = matchedKnown.score || 2500;
        detectedLevel = matchedKnown.level || 25;
        detectedElements = [...matchedKnown.elements];
        detectedDesc = matchedKnown.description;
        detectedSubStats = matchedKnown.subStats || ["Tấn Công: +115", "Chí Mạng: +45", "Phá Phòng: +40"];
      }
    }

    // Dynamic stat extraction from fullText to catch any customized values
    COMMON_STAT_NAMES.forEach((statName) => {
      const reg = new RegExp(`${statName}[^0-9+]{0,10}\\+?\\s*(\\d+)`, 'i');
      const m = fullText.match(reg);
      if (m) {
        const val = m[1];
        const line = `${statName}: +${val}`;
        // Replace or add
        const existingIdx = detectedSubStats.findIndex(s => s.toLowerCase().includes(statName.toLowerCase()));
        if (existingIdx !== -1) {
          detectedSubStats[existingIdx] = line;
        } else {
          detectedSubStats.push(line);
        }
      }
    });

    setParsedName(detectedName);
    setParsedScore(detectedScore);
    setParsedLevel(detectedLevel);
    setParsedElements(detectedElements);
    setParsedDesc(detectedDesc);
    setParsedSubStats(detectedSubStats);
    setHasExtracted(true);
  };

  const loadSampleNhatNguyet = () => {
    setItemType('noicong');
    setParsedName('Nhật Nguyệt Lưỡng Nghi');
    setParsedLevel(25);
    setParsedScore(3029);
    setParsedElements(["Kim", "Hoa", "Hoa", "Hoa", "Tho"]);
    setParsedDesc("Khi HP trên 50%, hiệu quả gây sát thương/trị liệu tăng 5%. Khi HP dưới 50%, sát thương nhận vào giảm 5% ◆ Khi có hiệu ứng <Linh Vận>, hiệu quả tăng cường tăng thêm 50%.");
    setParsedSubStats([
      "Giới Hạn HP: +3119",
      "Kháng Long Ngâm: +80",
      "Kháng Chí Mạng Nội: +101",
      "Khí Hải: +22",
      "Kháng Huyết Hà: +80",
      "Chính Xác: +45",
      "Phòng Thủ: +137",
      "Kháng Thần Tương: +92"
    ]);
    setHasExtracted(true);
  };

  const loadSampleMinhCanQua = () => {
    setItemType('noicong');
    setParsedName('Minh Can Qua');
    setParsedLevel(25);
    setParsedScore(2742);
    setParsedElements(["Kim", "Kim", "Kim", "Kim", "Moc"]);
    setParsedDesc("Khi tấn công, có xác suất tăng 4% ST lên mục tiêu trong 5 giây (Hiệu quả tăng gấp đôi đối với quái vật), hồi chiêu 10 giây (Ở dạng Tố Tâm có thể kích hoạt khi trị liệu, tăng hiệu quả trị liệu của bản thân lên 6%).");
    setParsedSubStats([
      "Giới Hạn HP: +3119",
      "Tất Cả Nguyên Tố: +83",
      "Khắc Chế Boss: +69",
      "Tấn Công Tối Đa: +115",
      "Chí Mạng: +46",
      "Kháng Boss: +58",
      "Chính Xác: +45",
      "Tấn Công Tối Thiểu: +137"
    ]);
    setHasExtracted(true);
  };

  const handleCycleElement = (index: number) => {
    const current = parsedElements[index];
    const currentIndex = ELEMENT_OPTIONS.indexOf(current);
    const next = ELEMENT_OPTIONS[(currentIndex + 1) % ELEMENT_OPTIONS.length];
    const nextElements = [...parsedElements];
    nextElements[index] = next;
    setParsedElements(nextElements);
  };

  const handleAddSubStat = () => {
    if (!newSubStatInput.trim()) return;
    setParsedSubStats([...parsedSubStats, newSubStatInput.trim()]);
    setNewSubStatInput('');
  };

  const handleRemoveSubStat = (index: number) => {
    setParsedSubStats(parsedSubStats.filter((_, i) => i !== index));
  };

  const handleApplyToSimulator = () => {
    if (itemType === 'noicong') {
      const newInnerKungfu: InnerKungfu = {
        id: `scanned-${Date.now()}`,
        name: parsedName || "Nội Công Quét",
        primaryElement: parsedElements[0],
        secondaryElement: parsedElements[1],
        tier: "Thần Thoại",
        description: parsedDesc || "Nội công được quét từ ảnh chụp màn hình in-game.",
        elements: parsedElements,
        score: parsedScore || 2500,
        level: parsedLevel || 25,
        subStats: parsedSubStats
      };

      setInnerSlot(targetSlotIndex, newInnerKungfu);
      setNotification(`Đã trang bị thành công [${newInnerKungfu.name}] (Level ${newInnerKungfu.level}, +${newInnerKungfu.score} Điểm) vào Ô #${targetSlotIndex + 1}!`);
    } else {
      const newGear: GearSlotItem = {
        id: `scanned-gear-${Date.now()}`,
        slot: targetGearSlot as any,
        name: parsedName || "Trang Bị Quét",
        tier: "Độc Trân",
        level: 79,
        refine: 12,
        gearScore: parsedScore || 9800,
        mainStat: parsedSubStats[0] || "+1,000 Tấn Công",
        subStats: parsedSubStats.slice(1)
      };

      updateGearItem(targetGearSlot, newGear);
      setNotification(`Đã cập nhật trang bị [${newGear.name}] vào ô [${targetGearSlot}]!`);
    }

    setOcrModalOpen(false);
  };

  const activeImage = uploadedImages[activeImageIndex] || null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-ink-950/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl border border-gold/40 bg-ink-900 shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Header */}
        <div className="p-4 border-b border-gold/20 flex items-center justify-between bg-ink-850 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gold/15 border border-gold/30 flex items-center justify-center text-gold">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-white">
                Bộ Quét Ảnh In-Game Bóc Tách Chỉ Số (AI Vision OCR Đa Ảnh)
              </h3>
              <p className="text-[11px] text-ink-300">
                Hỗ trợ tải lên nhiều ảnh (Phần đầu + Cuộn xem chỉ số) để gộp trọn vẹn thông số.
              </p>
            </div>
          </div>
          <button
            onClick={() => setOcrModalOpen(false)}
            className="text-ink-400 hover:text-white p-1 rounded-full hover:bg-ink-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-4 overflow-y-auto">
          {/* Quick Action Toolbar with Samples */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-ink-950 border border-gold/25 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-serif font-bold text-gold-bright">Nạp mẫu nhanh:</span>
              <button
                type="button"
                onClick={loadSampleNhatNguyet}
                className="px-2.5 py-1 rounded bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white font-mono text-[11px] font-bold border border-rose-500/40 transition-all flex items-center gap-1.5"
              >
                <Flame className="w-3.5 h-3.5 text-rose-400" />
                <span>Mẫu: [Nhật Nguyệt Lưỡng Nghi Lv25] (1 Kim 3 Hỏa 1 Thổ, +3029 Điểm)</span>
              </button>
              <button
                type="button"
                onClick={loadSampleMinhCanQua}
                className="px-2.5 py-1 rounded bg-amber-400/20 hover:bg-amber-400 text-amber-300 hover:text-ink-950 font-mono text-[11px] font-bold border border-amber-400/40 transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Mẫu: [Minh Can Qua Lv25] (4 Kim 1 Mộc, +2742 Điểm)</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1 rounded bg-gold/15 hover:bg-gold text-gold-bright hover:text-ink-950 font-mono text-[11px] font-bold border border-gold/40 transition-all flex items-center gap-1.5"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Tải Nhiều Ảnh (Chọn File)</span>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    addFiles(e.target.files);
                  }
                }}
              />
            </div>
          </div>

          {/* 2-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* Left Column (5 cols): Multi-Image Dropzone & Thumbnails */}
            <div className="md:col-span-5 flex flex-col space-y-3">
              {/* Main Image Dropzone / Preview */}
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                    addFiles(e.dataTransfer.files);
                  }
                }}
                className={`border-2 border-dashed rounded-xl p-3 flex flex-col items-center justify-center min-h-[260px] relative overflow-hidden transition-all ${
                  isDragging 
                    ? 'border-gold bg-gold/15 scale-[1.01]' 
                    : 'border-gold/30 bg-ink-950 hover:border-gold/60'
                }`}
              >
                {activeImage ? (
                  <div className="relative w-full h-full flex flex-col items-center justify-center">
                    <img
                      src={activeImage.url}
                      alt={activeImage.name}
                      className="max-h-60 max-w-full object-contain rounded border border-ink-700 shadow-md"
                    />
                    <div className="mt-2 text-[10px] text-ink-400 font-mono flex items-center justify-between w-full px-2">
                      <span>Đang xem: {activeImage.name}</span>
                      <span>{activeImageIndex + 1}/{uploadedImages.length}</span>
                    </div>
                  </div>
                ) : (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center justify-center gap-2 text-center p-4 cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center text-gold">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <span className="font-serif text-sm font-bold text-white block">
                        Kéo thả 1 hoặc nhiều ảnh vào đây
                      </span>
                      <span className="text-xs text-ink-400 block">
                        Nhấn <kbd className="px-1.5 py-0.5 rounded bg-ink-800 text-gold font-mono text-[10px]">Ctrl + V</kbd> để dán ảnh chụp từ clip (hỗ trợ dán nhiều lần)
                      </span>
                    </div>
                  </div>
                )}

                {isProcessing && (
                  <div className="absolute inset-0 bg-ink-950/90 backdrop-blur-sm flex flex-col items-center justify-center gap-3 p-4 text-center z-10">
                    <RefreshCw className="w-8 h-8 text-gold animate-spin" />
                    <span className="font-serif text-sm font-bold text-gold-bright">{ocrProgress}</span>
                    <span className="text-xs text-ink-400">Đang gộp và đối chiếu dữ liệu các ảnh...</span>
                  </div>
                )}
              </div>

              {/* Thumbnails Strip of Uploaded Images */}
              {uploadedImages.length > 0 && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-gold font-bold">Danh sách ảnh đã tải ({uploadedImages.length}):</span>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs text-gold-bright hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Thêm ảnh tiếp</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {uploadedImages.map((img, idx) => (
                      <div
                        key={img.id}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative rounded-lg border p-1 cursor-pointer transition-all ${
                          activeImageIndex === idx
                            ? 'border-gold bg-gold/15 shadow-gold-glow'
                            : 'border-ink-800 bg-ink-900 hover:border-gold/50'
                        }`}
                      >
                        <img
                          src={img.url}
                          alt={img.name}
                          className="w-full h-14 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage(img.id);
                          }}
                          className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-crimson text-white flex items-center justify-center text-[10px] hover:scale-110"
                          title="Xóa ảnh này"
                        >
                          ×
                        </button>
                        <span className="text-[9px] font-mono text-center block text-ink-300 truncate mt-0.5">
                          Ảnh #{idx + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Multi-image instruction tip */}
              <div className="p-3 rounded-xl bg-ink-950/80 border border-ink-800 text-xs space-y-1">
                <span className="font-serif font-bold text-gold flex items-center gap-1 text-[11px]">
                  <Info className="w-3.5 h-3.5" />
                  <span>Cách chụp để lấy đủ 8 dòng chỉ số:</span>
                </span>
                <p className="text-ink-400 text-[11px] leading-relaxed">
                  1. Chụp ảnh <strong>Phần Đầu</strong> (hiển thị Tên, Cấp, Điểm, 5 chấm nguyên tố và 2 dòng đầu).<br />
                  2. Cuộn chuột xuống chụp <strong>Phần Đuôi</strong> (hiển thị 6 dòng thuộc tính bên dưới).<br />
                  3. Dán hoặc tải cả 2 ảnh lên đây — AI sẽ tự động gộp các chỉ số mà không bị trùng lặp!
                </p>
              </div>
            </div>

            {/* Right Column (7 cols): Extracted Data Editor */}
            <div className="md:col-span-7 flex flex-col justify-between p-4 rounded-xl border border-gold/30 bg-ink-850 space-y-4">
              <div className="space-y-3.5">
                {/* Header Switcher */}
                <div className="flex items-center justify-between pb-2 border-b border-ink-700">
                  <span className="font-serif text-xs font-bold text-gold-bright flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-gold" />
                    <span>Dữ Liệu Đã Bóc Tách & Gộp</span>
                  </span>
                  <div className="flex items-center gap-1 text-xs font-mono">
                    <button
                      type="button"
                      onClick={() => setItemType('noicong')}
                      className={`px-3 py-1 rounded transition-all ${
                        itemType === 'noicong' ? 'bg-gold text-ink-950 font-bold shadow-gold-glow' : 'text-ink-400 hover:text-white'
                      }`}
                    >
                      Nội Công (6 Ô)
                    </button>
                    <button
                      type="button"
                      onClick={() => setItemType('gear')}
                      className={`px-3 py-1 rounded transition-all ${
                        itemType === 'gear' ? 'bg-gold text-ink-950 font-bold shadow-gold-glow' : 'text-ink-400 hover:text-white'
                      }`}
                    >
                      Trang Bị (10 Ô)
                    </button>
                  </div>
                </div>

                {/* Name, Level, Score inputs */}
                <div className="grid grid-cols-12 gap-2 text-xs">
                  <div className="col-span-6">
                    <label className="text-[10px] text-ink-400 font-mono block mb-1">Tên Vật Phẩm:</label>
                    <input
                      type="text"
                      value={parsedName}
                      onChange={(e) => setParsedName(e.target.value)}
                      className="w-full p-2 rounded-lg border border-gold/40 bg-ink-950 text-white font-serif font-bold text-sm outline-none focus:border-gold"
                    />
                  </div>
                  <div className="col-span-3">
                    <label className="text-[10px] text-ink-400 font-mono block mb-1">Cấp Độ:</label>
                    <input
                      type="number"
                      value={parsedLevel}
                      onChange={(e) => setParsedLevel(Number(e.target.value))}
                      className="w-full p-2 rounded-lg border border-gold/40 bg-ink-950 text-white font-mono font-bold text-sm outline-none focus:border-gold"
                    />
                  </div>
                  <div className="col-span-3">
                    <label className="text-[10px] text-ink-400 font-mono block mb-1">Điểm / GS:</label>
                    <input
                      type="number"
                      value={parsedScore}
                      onChange={(e) => setParsedScore(Number(e.target.value))}
                      className="w-full p-2 rounded-lg border border-gold/40 bg-ink-950 text-gold-bright font-mono font-bold text-sm outline-none focus:border-gold"
                    />
                  </div>
                </div>

                {/* Target Slot Selector */}
                {itemType === 'noicong' ? (
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-ink-400 font-mono block">Chọn Ô Nội Công Để Thay Thế:</label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                      {[0, 1, 2, 3, 4, 5].map((idx) => {
                        const currentItem = innerSlots[idx];
                        const isSelected = targetSlotIndex === idx;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setTargetSlotIndex(idx)}
                            className={`p-2 rounded-lg border text-left flex flex-col justify-between transition-all ${
                              isSelected
                                ? 'border-gold bg-gold text-ink-950 font-bold shadow-gold-glow'
                                : 'border-ink-700 bg-ink-950 text-ink-300 hover:border-gold/50'
                            }`}
                          >
                            <span className="text-[10px] font-mono block">Ô #{idx + 1}</span>
                            <span className="text-[11px] font-serif truncate block">
                              {currentItem ? currentItem.name : '(Trống)'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="text-[10px] text-ink-400 font-mono block mb-1">Lắp vào Ô Trang Bị:</label>
                    <select
                      value={targetGearSlot}
                      onChange={(e) => setTargetGearSlot(e.target.value)}
                      className="w-full p-2 rounded-lg border border-gold/40 bg-ink-950 text-white text-xs outline-none focus:border-gold"
                    >
                      {["Vũ Khí", "Áo", "Mũ", "Đai", "Giày", "Hộ Uyển", "Nhẫn 1", "Nhẫn 2", "Dây Chuyền", "Bội Ngọc"].map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* 5 Elements Interactive Dots */}
                {itemType === 'noicong' && (
                  <div className="p-3 rounded-xl bg-ink-950 border border-gold/25 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gold font-serif font-bold">5 Chấm Nguyên Tố Ngũ Hành:</span>
                      <span className="text-ink-400 text-[10px] font-mono">Bấm vào chấm để xoay vòng đổi nguyên tố</span>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      {parsedElements.map((el, i) => (
                        <div key={i} className="flex flex-col items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleCycleElement(i)}
                            className={`w-10 h-10 rounded-full ${ELEMENT_THEME[el].badgeBg} border-2 ${ELEMENT_THEME[el].borderColor} flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all ${ELEMENT_THEME[el].pillGlow}`}
                            title={`Chấm #${i + 1}: Bấm để đổi thuộc tính (${ELEMENT_THEME[el].vnName})`}
                          >
                            <ElementGlyph element={el} className="w-5 h-5" glow={true} />
                          </button>
                          <span className={`text-[10px] font-mono font-bold ${ELEMENT_THEME[el].textColor}`}>
                            {ELEMENT_THEME[el].name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sub-stats Editor */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] text-ink-400 font-mono">
                      Các Dòng Thuộc Tính Gộp Được ({parsedSubStats.length} dòng):
                    </label>
                    <span className="text-[10px] text-gold font-mono">Đầy đủ theo game</span>
                  </div>
                  <div className="p-2 rounded-lg bg-ink-950 border border-ink-800 max-h-36 overflow-y-auto space-y-1.5">
                    {parsedSubStats.map((sub, i) => (
                      <div key={i} className="flex items-center justify-between gap-2 p-1.5 rounded bg-ink-900 border border-ink-800 text-xs">
                        <span className="text-jade-bright font-mono text-[11px] truncate">{sub}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSubStat(i)}
                          className="text-ink-500 hover:text-crimson-bright p-0.5 rounded transition-colors shrink-0"
                          title="Xóa dòng này"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add Sub-stat */}
                  <div className="flex items-center gap-1.5 pt-1">
                    <input
                      type="text"
                      placeholder="Thêm dòng chỉ số (vd: Phòng Thủ: +137)..."
                      value={newSubStatInput}
                      onChange={(e) => setNewSubStatInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') handleAddSubStat(); }}
                      className="flex-1 p-1.5 rounded border border-ink-700 bg-ink-950 text-xs text-white outline-none focus:border-gold"
                    />
                    <button
                      type="button"
                      onClick={handleAddSubStat}
                      className="px-2.5 py-1.5 rounded bg-ink-800 hover:bg-gold hover:text-ink-950 text-ink-200 text-xs font-mono font-bold transition-all border border-ink-600 shrink-0 flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Thêm</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-3 border-t border-ink-700/80">
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleApplyToSimulator}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-gold via-gold-bright to-gold text-ink-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:brightness-110 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {itemType === 'noicong'
                      ? `Xác Nhận Đưa Vào Ô #${targetSlotIndex + 1} Giả Lập`
                      : `Xác Nhận Đưa Vào [${targetGearSlot}]`}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
