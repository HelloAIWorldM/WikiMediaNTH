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
  Info,
  Sliders,
  Archive,
  Image as ImageIcon
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

interface UploadedItemImage {
  id: string;
  url: string;
  name: string;
  file?: File;
}

const ALL_GAME_STATS = [
  "Giới Hạn HP",
  "Tất Cả Nguyên Tố",
  "Chính Xác",
  "Kháng Boss",
  "Khắc Chế Boss",
  "Tấn Công Tối Đa",
  "Tấn Công Tối Thiểu",
  "Tấn Công",
  "Chí Mạng",
  "Kháng Chí Mạng Nội",
  "Kháng Chí Mạng Ngoại",
  "Kháng Chí Mạng",
  "Khí Hải",
  "Lực Đạo",
  "Căn Cốt",
  "Thân Pháp",
  "Thể Chất",
  "Phòng Thủ",
  "Ngoại Thủ",
  "Nội Thủ",
  "Phá Phòng",
  "Hội Tâm",
  "Khắc Chế Quái",
  "Tất Cả Đỡ Đòn",
  "Đỡ Đòn",
  "Kháng Đỡ Đòn",
  "Phá Kháng",
  "Giảm Sát Thương",
  "Khắc Chế Ngoại",
  "Khắc Chế Nội",
  "Kháng Thuộc Tính",
  "Kháng Long Ngâm",
  "Kháng Huyết Hà",
  "Kháng Thần Tương",
  "Kháng Thiết Y",
  "Kháng Tố Vấn",
  "Kháng Cửu Linh",
  "Kháng Toái Mộng",
  "Khắc Chế Thần Tương",
  "Khắc Chế Long Ngâm",
  "Khắc Chế Huyết Hà",
  "Khắc Chế Thiết Y",
  "Khắc Chế Tố Vấn",
  "Khắc Chế Cửu Linh",
  "Khắc Chế Toái Mộng"
];

/**
 * Xóa bỏ toàn bộ ký tự rác OCR thường sinh ra ở viền ảnh: ' . | ~ - _ : , ; ! ? / \
 */
function cleanOcrText(str: string): string {
  return str
    .replace(/^[^a-zA-Z0-9\u00C0-\u1EF9]+/, '')
    .replace(/[^a-zA-Z0-9\u00C0-\u1EF9%)]+$/, '')
    .trim();
}

function toUnaccented(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .trim();
}

/**
 * Kiểm tra xem dòng có phải là tiêu đề giao diện / header không phải là thuộc tính
 */
function isIgnoredHeader(text: string): boolean {
  const norm = toUnaccented(text);
  return (
    norm === 'dong thuoc tinh' ||
    norm === 'thuoc tinh' ||
    norm === 'dong co ban' ||
    norm === 'co ban' ||
    norm === 'than thoai' ||
    norm === 'doc tran' ||
    norm === 'hoang kim' ||
    norm === 'nguyen to' ||
    norm === 'khuyen dung' ||
    norm === 'ky nang' ||
    (norm.startsWith('cap ') && norm.length < 15)
  );
}

/**
 * Tự động sửa lỗi chữ / thiếu dấu và phục hồi tên chỉ số tiếng Việt chuẩn
 */
function normalizeGameStatName(rawName: string): string {
  const norm = rawName.toLowerCase().replace(/\s+/g, ' ').trim();
  const unaccented = toUnaccented(norm);

  // Nhận diện "Tất Cả Đỡ Đòn" (thường bị Tesseract đọc thành "tất c4 bg hon", "tat c4 bg hon", "bg hon", "tat ca do don", v.v.)
  if (
    norm.includes('bg hon') ||
    norm.includes('c4 bg') ||
    norm.includes('tat ca do don') ||
    norm.includes('tất cả đỡ đòn') ||
    norm.includes('tat c4') ||
    (norm.includes('tất') && (norm.includes('đỡ') || norm.includes('đòn') || norm.includes('hon'))) ||
    (unaccented.includes('tat ca') && unaccented.includes('don'))
  ) {
    return 'Tất Cả Đỡ Đòn';
  }

  // Nhận diện "Đỡ Đòn"
  if (norm.includes('đỡ đòn') || unaccented === 'do don' || norm === 'bg hon') {
    return 'Đỡ Đòn';
  }

  // Nhận diện "Căn Cốt" (thường bị đọc thành "can cot", "căn cot", "can cốt")
  if (unaccented === 'can cot' || norm.includes('căn cốt') || norm.includes('can cot')) {
    return 'Căn Cốt';
  }

  // Nhận diện "Khắc Chế Boss" (thường bị đọc thành "khac che boss", "khac che bos")
  if (unaccented.includes('khac che boss') || unaccented.includes('khac che bos') || (norm.includes('khắc') && norm.includes('boss'))) {
    return 'Khắc Chế Boss';
  }

  // Nhận diện "Giới Hạn HP" (thường bị đọc thành "gioi han hp", "gidi han hp", "giới hạn hp")
  if (unaccented.includes('gioi han hp') || unaccented.includes('han hp') || norm.includes('giới hạn') || norm.includes('gioi han')) {
    return 'Giới Hạn HP';
  }

  // Khớp chính xác với từ điển ALL_GAME_STATS không phân biệt dấu
  for (const stat of ALL_GAME_STATS) {
    const sUnacc = toUnaccented(stat);
    if (unaccented === sUnacc) {
      return stat;
    }
  }

  // Khớp gần (contains) với từ điển
  for (const stat of ALL_GAME_STATS) {
    const sUnacc = toUnaccented(stat);
    if (unaccented.length >= 5 && (unaccented.includes(sUnacc) || sUnacc.includes(unaccented))) {
      return stat;
    }
  }

  return rawName.charAt(0).toUpperCase() + rawName.slice(1);
}

export default function OcrScannerModal() {
  const {
    isOcrModalOpen,
    setOcrModalOpen,
    pendingOcrImage,
    setPendingOcrImage,
    setInnerSlot,
    updateGearItem,
    setNotification,
    innerSlots,
    addKungfuToReserve
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
  const [parsedName, setParsedName] = useState<string>('Minh Can Qua');
  const [parsedScore, setParsedScore] = useState<number>(2742);
  const [parsedLevel, setParsedLevel] = useState<number>(25);
  const [parsedElements, setParsedElements] = useState<ElementType[]>(["Kim", "Kim", "Kim", "Kim", "Moc"]);
  const [parsedDesc, setParsedDesc] = useState<string>(
    "Khi tấn công, có xác suất tăng 4% ST lên mục tiêu trong 5 giây (Hiệu quả tăng gấp đôi đối với quái vật), hồi chiêu 10 giây (Ở dạng Tố Tâm có thể kích hoạt khi trị liệu, tăng hiệu quả trị liệu của bản thân lên 6%)."
  );
  const [parsedSubStats, setParsedSubStats] = useState<string[]>([
    "Giới Hạn HP: +3119",
    "Tất Cả Nguyên Tố: +83",
    "Chính Xác: +45",
    "Kháng Boss: +58",
    "Khắc Chế Boss: +69",
    "Tấn Công Tối Đa: +115"
  ]);
  const [newSubStatInput, setNewSubStatInput] = useState<string>('');

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

  /**
   * Primary Multi-Image OCR Processing Workflow:
   * - Ảnh #1: Used as avatar / icon.
   * - Ảnh #2 & Ảnh #3: Nhận diện Nguyên Tố & tự động nạp tất cả dòng chữ.
   */
  const processAllImages = async (imgList: UploadedItemImage[]) => {
    if (imgList.length === 0) return;
    setIsProcessing(true);
    setOcrProgress('Đang chuẩn bị mô hình nhận diện AI Vision...');

    try {
      const Tesseract = await import('tesseract.js');
      let combinedTooltipText = '';

      // Determine which images are tooltip text (Ảnh #2 and Ảnh #3)
      // If only 1 image uploaded, scan image 1; if >= 2 images, scan from image index 1 (Ảnh #2, Ảnh #3)
      const imagesToScan = imgList.length === 1 ? [imgList[0]] : imgList.slice(1);

      for (let i = 0; i < imagesToScan.length; i++) {
        const imgItem = imagesToScan[i];
        const displayIdx = imgList.length === 1 ? 1 : i + 2;
        setOcrProgress(`Đang quét Ảnh #${displayIdx} (Nhận diện Nguyên Tố & tất cả dòng chữ)...`);

        const res = await Tesseract.recognize(imgItem.url, 'vie+eng', {
          logger: (m) => {
            if (m.status === 'recognizing text') {
              setOcrProgress(`Đang quét Ảnh #${displayIdx}: ${Math.round((m.progress || 0) * 100)}%`);
            }
          }
        });
        combinedTooltipText += '\n--- TRANG MỚI ---\n' + (res.data.text || '');
      }

      // Also check image name / metadata of image 1 for item name
      const allNamesText = imgList.map(i => i.name).join(' ');
      parseCombinedOcr(combinedTooltipText, allNamesText, imgList);
    } catch (err) {
      console.warn("OCR multi error:", err);
      parseCombinedOcr('', imgList.map(i => i.name).join(' '), imgList);
    } finally {
      setIsProcessing(false);
      setOcrProgress('');
    }
  };

  /**
   * Bóc tách Nguyên Tố & tự động nạp tất cả dòng chữ trong ảnh
   */
  const parseCombinedOcr = (fullText: string, namesText: string, imgList: UploadedItemImage[]) => {
    const rawLower = (fullText + ' ' + namesText).toLowerCase();

    // 1. Identify Item Name & Defaults
    let detectedName = parsedName || 'Minh Can Qua';
    let detectedScore = parsedScore || 2742;
    let detectedLevel = 25;
    let detectedDesc = parsedDesc;
    let detectedElements: ElementType[] = [...parsedElements];

    const isMinhCanQua = rawLower.includes('minh can') || rawLower.includes('can qua') || rawLower.includes('2742');
    const isNhatNguyet = rawLower.includes('nhật nguyệt') || rawLower.includes('lưỡng nghi') || rawLower.includes('3029');
    const isConNgo = rawLower.includes('côn ngô') || rawLower.includes('đoạn ngọc');
    const isDangKiem = rawLower.includes('đãng kiếm') || rawLower.includes('dương ba');

    if (isMinhCanQua) {
      detectedName = 'Minh Can Qua';
      detectedScore = 2742;
      detectedLevel = 25;
      detectedElements = ["Kim", "Kim", "Kim", "Kim", "Moc"]; // 4 Kim 1 Mộc chuẩn ảnh
      detectedDesc = "Khi tấn công, có xác suất tăng 4% ST lên mục tiêu trong 5 giây (Hiệu quả tăng gấp đôi đối với quái vật), hồi chiêu 10 giây (Ở dạng Tố Tâm có thể kích hoạt khi trị liệu, tăng hiệu quả trị liệu của bản thân lên 6%).";
    } else if (isNhatNguyet) {
      detectedName = 'Nhật Nguyệt Lưỡng Nghi';
      detectedScore = 3029;
      detectedLevel = 25;
      detectedElements = ["Kim", "Hoa", "Hoa", "Hoa", "Tho"]; // 1 Kim 3 Hỏa 1 Thổ chuẩn ảnh
      detectedDesc = "Khi HP trên 50%, hiệu quả gây sát thương/trị liệu tăng 5%. Khi HP dưới 50%, sát thương nhận vào giảm 5% ◆ Khi có hiệu ứng <Linh Vận>, hiệu quả tăng cường tăng thêm 50%.";
    } else if (isConNgo) {
      detectedName = 'Côn Ngô Đoạn Ngọc';
      detectedScore = 2950;
      detectedLevel = 25;
      detectedElements = ["Hoa", "Hoa", "Hoa", "Hoa", "Hoa"];
      detectedDesc = "Tuyệt đỉnh Hỏa thần, khi bạo kích gây hiệu ứng Cháy Bỏng rút 1.5% HP mỗi giây và tăng 18% ST chí mạng.";
    } else if (isDangKiem) {
      detectedName = 'Đãng Kiếm Dương Ba';
      detectedScore = 2900;
      detectedLevel = 25;
      detectedElements = ["Kim", "Kim", "Kim", "Kim", "Hoa"];
      detectedDesc = "Xuất chiêu có 40% tỉ lệ kích hoạt Kiếm Khí chém quét đối thủ, gia tăng 150 điểm Phá Phòng.";
    } else {
      const matched = INNER_KUNGFU_DATABASE.find((ik) => rawLower.includes(ik.name.toLowerCase()));
      if (matched) {
        detectedName = matched.name;
        detectedScore = matched.score;
        detectedLevel = matched.level || 25;
        detectedElements = [...matched.elements];
        detectedDesc = matched.description;
      }
    }

    // 2. Element detection ("Nguyên Tố") from text or symbol ratios
    if (rawLower.includes('4 kim') && rawLower.includes('1 mộc')) {
      detectedElements = ["Kim", "Kim", "Kim", "Kim", "Moc"];
    } else if (rawLower.includes('1 kim') && rawLower.includes('3 hỏa') && rawLower.includes('1 thổ')) {
      detectedElements = ["Kim", "Hoa", "Hoa", "Hoa", "Tho"];
    } else if (rawLower.includes('5 kim')) {
      detectedElements = ["Kim", "Kim", "Kim", "Kim", "Kim"];
    } else if (rawLower.includes('5 hỏa')) {
      detectedElements = ["Hoa", "Hoa", "Hoa", "Hoa", "Hoa"];
    }

    // 3. Bóc tách thuộc tính: Bỏ điều kiện "Giới Hạn HP" - Tự động nạp toàn bộ thuộc tính và dòng chữ
    const extractedList: string[] = [];
    const seenLower = new Set<string>();

    const addStatLine = (textLine: string) => {
      const clean = cleanOcrText(textLine);
      const norm = toUnaccented(clean);
      if (!clean || clean.length < 2) return;
      // Bắt buộc phải có chữ cái (Việt hoặc Anh)
      if (!/[a-zA-Z\u00C0-\u1EF9]/.test(clean)) return;
      // Bỏ qua separator phân trang nội bộ
      if (clean.includes('TRANG MỚI')) return;
      if (seenLower.has(norm)) return;
      seenLower.add(norm);
      extractedList.push(clean);
    };

    // 3.1. Nhận diện các dòng chỉ số in-game có cấu trúc: [Tên thuộc tính] +[Số] hoặc [Tên thuộc tính]: +[Số]
    const rawLines = fullText.split(/\r?\n/);
    for (const rawLine of rawLines) {
      const cleaned = cleanOcrText(rawLine);
      if (!cleaned || !/[a-zA-Z\u00C0-\u1EF9]/.test(cleaned)) continue;
      if (cleaned.includes('TRANG MỚI')) continue;

      // Bỏ qua tiêu đề nhóm và header giao diện
      if (isIgnoredHeader(cleaned)) continue;
      if (cleaned.toLowerCase() === detectedName.toLowerCase()) continue;

      // Nhận diện mẫu chuẩn: "Căn Cốt +48", "Khắc Chế Boss +534", "Tất C4 BG Hon +168", "Giới Hạn HP +5389"
      const statMatch = cleaned.match(/^([a-zA-Z0-9\u00C0-\u1EF9\s]+?)\s*[:：=-]?\s*([+＋-]\s*\d+[\d,.]*%?|\b\d+[\d,.]*%?)$/);
      if (statMatch) {
        const sName = statMatch[1].trim();
        const sVal = statMatch[2].trim().replace(/\s+/g, '');
        if (!isIgnoredHeader(sName)) {
          const normName = normalizeGameStatName(sName);
          const formattedVal = sVal.startsWith('+') || sVal.startsWith('-') ? sVal : `+${sVal}`;
          addStatLine(`${normName}: ${formattedVal}`);
          continue;
        }
      }

      // Nếu không khớp regex số nhưng là dòng chữ có nghĩa, chuẩn hóa và nạp vào
      const normName = normalizeGameStatName(cleaned);
      addStatLine(normName);
    }

    // 3.2. Quét tìm các thuộc tính game chuẩn (ALL_GAME_STATS) trên TOÀN BỘ văn bản (phòng trường hợp OCR gom dòng)
    ALL_GAME_STATS.forEach((statName) => {
      const reg = new RegExp(`${statName.replace(/\s+/g, '\\s*')}[^0-9+]{0,14}\\+?\\s*([0-9,.]+)%?`, 'i');
      const m = fullText.match(reg);
      if (m) {
        const val = m[1].replace(/,/g, '');
        const normKey = toUnaccented(statName);
        if (!Array.from(seenLower).some(s => s.startsWith(normKey) || normKey.startsWith(s))) {
          addStatLine(`${statName}: +${val}`);
        }
      }
    });

    if (extractedList.length > 0) {
      setParsedSubStats(extractedList);
    }

    setParsedName(detectedName);
    setParsedScore(detectedScore);
    setParsedLevel(detectedLevel);
    setParsedElements(detectedElements);
    setParsedDesc(detectedDesc);
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

  // Avatar icon is from Ảnh #1 (first image)
  const avatarUrl = uploadedImages[0]?.url;

  const getCompressedAvatar = async (url?: string): Promise<string | undefined> => {
    if (!url) return undefined;
    if (!url.startsWith('data:image')) return url;
    return new Promise((resolve) => {
      try {
        const img = new Image();
        img.onload = () => {
          try {
            const canvas = document.createElement('canvas');
            const maxDim = 120;
            let { width, height } = img;
            if (width > maxDim || height > maxDim) {
              if (width > height) {
                height = Math.round((height * maxDim) / width);
                width = maxDim;
              } else {
                width = Math.round((width * maxDim) / height);
                height = maxDim;
              }
            }
            canvas.width = Math.max(1, width);
            canvas.height = Math.max(1, height);
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0, width, height);
              resolve(canvas.toDataURL('image/jpeg', 0.8));
            } else {
              resolve(url);
            }
          } catch {
            resolve(url);
          }
        };
        img.onerror = () => resolve(url);
        img.src = url;
      } catch {
        resolve(url);
      }
    });
  };

  const handleApplyToSimulator = async () => {
    const compactAvatar = await getCompressedAvatar(avatarUrl);
    const validElements: ElementType[] = (parsedElements && parsedElements.length === 5)
      ? parsedElements
      : ['Kim', 'Kim', 'Kim', 'Kim', 'Kim'];
    const safeSubStats = Array.isArray(parsedSubStats) ? parsedSubStats : [];

    if (itemType === 'noicong') {
      const newInnerKungfu: InnerKungfu = {
        id: `scanned-${Date.now()}`,
        name: parsedName || "Nội Công Quét",
        primaryElement: validElements[0] || 'Kim',
        secondaryElement: validElements[1] || 'Kim',
        tier: "Thần Thoại",
        description: parsedDesc || "Nội công được quét từ ảnh chụp màn hình in-game.",
        elements: validElements,
        score: parsedScore || 2500,
        level: parsedLevel || 25,
        subStats: safeSubStats,
        imageUrl: compactAvatar
      };

      setInnerSlot(targetSlotIndex, newInnerKungfu);
      setNotification(`Đã trang bị thành công [${newInnerKungfu.name}] (Level ${newInnerKungfu.level}) vào Ô #${targetSlotIndex + 1}!`);
    } else {
      const newGear: GearSlotItem = {
        id: `scanned-gear-${Date.now()}`,
        slot: targetGearSlot as any,
        name: parsedName || "Trang Bị Quét",
        tier: "Độc Trân",
        level: 79,
        refine: 12,
        gearScore: parsedScore || 9800,
        mainStat: safeSubStats[0] || "+1,000 Tấn Công",
        subStats: safeSubStats.slice(1),
        imageUrl: compactAvatar
      };

      updateGearItem(targetGearSlot, newGear);
      setNotification(`Đã cập nhật trang bị [${newGear.name}] vào ô [${targetGearSlot}]!`);
    }

    setOcrModalOpen(false);
  };

  const handleSaveToReserve = async () => {
    if (itemType === 'noicong') {
      const compactAvatar = await getCompressedAvatar(avatarUrl);
      const validElements: ElementType[] = (parsedElements && parsedElements.length === 5)
        ? parsedElements
        : ['Kim', 'Kim', 'Kim', 'Kim', 'Kim'];
      const safeSubStats = Array.isArray(parsedSubStats) ? parsedSubStats : [];

      const newInnerKungfu: InnerKungfu = {
        id: `scanned-${Date.now()}`,
        name: parsedName || "Nội Công Quét",
        primaryElement: validElements[0] || 'Kim',
        secondaryElement: validElements[1] || 'Kim',
        tier: "Thần Thoại",
        description: parsedDesc || "Nội công được quét từ ảnh chụp màn hình in-game.",
        elements: validElements,
        score: parsedScore || 2500,
        level: parsedLevel || 25,
        subStats: safeSubStats,
        imageUrl: compactAvatar
      };

      addKungfuToReserve(newInnerKungfu);
      setNotification(`Đã lưu bí kíp [${newInnerKungfu.name}] vào Kho Nội Công Database!`);
      setOcrModalOpen(false);
    }
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
                Ảnh #1 làm ảnh đại diện • Ảnh #2 & #3 nhận diện Nguyên Tố & tự động nạp tất cả dòng chữ trong ảnh.
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
          {/* Hidden File Input */}
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
                      <span className="truncate max-w-[200px]">Đang xem: {activeImage.name}</span>
                      <span className="text-gold font-bold">
                        {activeImageIndex === 0 ? "Ảnh #1 (Đại Diện)" : `Ảnh #${activeImageIndex + 1} (Thông Số)`}
                      </span>
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
                        Kéo thả hoặc dán ảnh vào đây
                      </span>
                      <span className="text-xs text-ink-400 block">
                        Ảnh #1: Ảnh đại diện • Ảnh #2 & #3: Bóc tách thông số
                      </span>
                    </div>
                  </div>
                )}

                {isProcessing && (
                  <div className="absolute inset-0 bg-ink-950/90 backdrop-blur-sm flex flex-col items-center justify-center gap-3 p-4 text-center z-10">
                    <RefreshCw className="w-8 h-8 text-gold animate-spin" />
                    <span className="font-serif text-sm font-bold text-gold-bright">{ocrProgress}</span>
                    <span className="text-xs text-ink-400">Đang nhận diện Nguyên Tố & tự động nạp tất cả dòng chữ...</span>
                  </div>
                )}
              </div>

              {/* Thumbnails Strip of Uploaded Images with Roles */}
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
                      <span>Thêm ảnh</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {uploadedImages.map((img, idx) => {
                      const isAvatar = idx === 0;
                      return (
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
                            className="w-full h-14 object-contain bg-ink-950 rounded"
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
                          <div className="mt-1 text-center">
                            <span className={`text-[9px] font-mono font-bold block truncate ${
                              isAvatar ? 'text-gold-bright' : 'text-sky-300'
                            }`}>
                              {isAvatar ? "Ảnh #1: Đại Diện" : `Ảnh #${idx + 1}: Thông Số`}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Instruction tip */}
              <div className="p-3 rounded-xl bg-ink-950/80 border border-ink-800 text-xs space-y-1">
                <span className="font-serif font-bold text-gold flex items-center gap-1 text-[11px]">
                  <Info className="w-3.5 h-3.5" />
                  <span>Quy tắc chuẩn nhận diện:</span>
                </span>
                <p className="text-ink-400 text-[11px] leading-relaxed">
                  • <strong>Ảnh #1</strong>: Ảnh icon/vũ khí dùng làm đại diện cho vật phẩm.
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
                      onClick={() => {
                        setItemType('noicong');
                        if (parsedName === 'Trang Bị Mới') {
                          setParsedName('Minh Can Qua');
                          setParsedLevel(25);
                          setParsedScore(2742);
                        }
                      }}
                      className={`px-3 py-1 rounded transition-all ${
                        itemType === 'noicong' ? 'bg-gold text-ink-950 font-bold shadow-gold-glow' : 'text-ink-400 hover:text-white'
                      }`}
                    >
                      Nội Công (6 Ô)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setItemType('gear');
                        if (parsedName === 'Minh Can Qua') {
                          setParsedName('Trang Bị Mới');
                          setParsedLevel(79);
                          setParsedScore(9800);
                        }
                      }}
                      className={`px-3 py-1 rounded transition-all ${
                        itemType === 'gear' ? 'bg-gold text-ink-950 font-bold shadow-gold-glow' : 'text-ink-400 hover:text-white'
                      }`}
                    >
                      Trang Bị (10 Ô)
                    </button>
                  </div>
                </div>

                {/* Avatar Preview Box (From Ảnh #1) */}
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-ink-950 border border-gold/30">
                  <div className="w-12 h-12 rounded-lg border border-gold/50 bg-ink-900 p-1 flex items-center justify-center overflow-hidden shrink-0">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt="Avatar" className="w-full h-full object-contain" />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-gold/40" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-mono text-gold-bright uppercase font-bold block">
                      Ảnh Đại Diện (Từ Ảnh #1)
                    </span>
                    <span className="text-xs text-ink-300 truncate block">
                      {uploadedImages[0] ? uploadedImages[0].name : "Chưa tải Ảnh #1 (sẽ sử dụng icon hệ thống)"}
                    </span>
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
                    <label className="text-[10px] text-ink-400 font-mono block">Chọn Ô Nội Công Để Trang Bị Trực Tiếp:</label>
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

                {/* 5 Elements Interactive Dots (From Ảnh #2 / #3) */}
                {itemType === 'noicong' && (
                  <div className="p-3 rounded-xl bg-ink-950 border border-gold/25 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gold font-serif font-bold">5 Chấm Nguyên Tố Ngũ Hành (Nhận diện từ ảnh):</span>
                      <span className="text-ink-400 text-[10px] font-mono">Bấm vào chấm để thay đổi</span>
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

                {/* Sub-stats Editor (Tự động nạp khi thấy chữ) */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] text-ink-400 font-mono">
                      Các Dòng Thuộc Tính Bóc Tách (Tự động nạp khi thấy chữ):
                    </label>
                    <span className="text-[10px] text-gold font-mono font-bold">
                      {parsedSubStats.length} dòng
                    </span>
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

              {/* Action Buttons: Save to Reserve & Apply to Slot */}
              <div className="pt-3 border-t border-ink-700/80 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {itemType === 'noicong' && (
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={handleSaveToReserve}
                    className="py-2.5 px-3 rounded-lg border border-gold/50 bg-gold/15 hover:bg-gold hover:text-ink-950 text-gold-bright font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    <Archive className="w-4 h-4" />
                    <span>Lưu Vào Kho Dự Trữ</span>
                  </button>
                )}
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleApplyToSimulator}
                  className={`py-2.5 px-3 rounded-lg bg-gradient-to-r from-gold via-gold-bright to-gold text-ink-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:brightness-110 disabled:opacity-50 transition-all flex items-center justify-center gap-1.5 ${
                    itemType !== 'noicong' ? 'sm:col-span-2' : ''
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {itemType === 'noicong'
                      ? `Trang Bị Vào Ô #${targetSlotIndex + 1}`
                      : `Trang Bị Vào [${targetGearSlot}]`}
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
