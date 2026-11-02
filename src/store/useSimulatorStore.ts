import { create } from 'zustand';
import {
  ElementType,
  InnerKungfu,
  GearSlotItem,
  ResonanceEffect,
  BuildPreset,
  INNER_KUNGFU_DATABASE,
  DEFAULT_GEAR_SLOTS,
  CHU_THIEN_RESONANCES,
  POPULAR_PRESETS
} from '@/data/simulatorData';

export interface CalculatedStats {
  totalPower: number;
  attack: number;
  defense: number;
  critRate: number;
  critDamage: number;
  bossBreakthrough: number;
  hp: number;
  dpsEstimate: number;
}

interface SimulatorState {
  selectedSect: string;
  activePresetId: string;
  gearSlots: Record<string, GearSlotItem>;
  innerSlots: (InnerKungfu | null)[];
  elementCounts: Record<ElementType, number>;
  resonances: ResonanceEffect[];
  stats: CalculatedStats;
  selectedInnerSlotIndex: number | null;
  isCatalogOpen: boolean;
  isOcrModalOpen: boolean;
  pendingOcrImage: File | string | null;
  notificationMessage: string | null;

  // Actions
  setSelectedSect: (sect: string) => void;
  loadPreset: (presetId: string) => void;
  setInnerSlot: (slotIndex: number, kungfu: InnerKungfu) => void;
  removeInnerSlot: (slotIndex: number) => void;
  updateInnerSlotElement: (slotIndex: number, elementIndex: number, newElement?: ElementType) => void;
  setSlotElements: (slotIndex: number, elements: ElementType[]) => void;
  updateGearItem: (slot: string, item: GearSlotItem) => void;
  openCatalogForSlot: (slotIndex: number) => void;
  closeCatalog: () => void;
  setOcrModalOpen: (open: boolean) => void;
  setPendingOcrImage: (fileOrUrl: File | string | null) => void;
  exportBuildJSON: () => string;
  importBuildJSON: (jsonStr: string) => boolean;
  setNotification: (msg: string | null) => void;
}

function calculateElementsAndResonances(innerSlots: (InnerKungfu | null)[]) {
  const counts: Record<ElementType, number> = {
    Kim: 0,
    Moc: 0,
    Thuy: 0,
    Hoa: 0,
    Tho: 0,
  };

  innerSlots.forEach((slot) => {
    if (slot && slot.elements) {
      slot.elements.forEach((el) => {
        if (counts[el] !== undefined) {
          counts[el] += 1;
        }
      });
    }
  });

  const resonances = CHU_THIEN_RESONANCES.map((res) => {
    let active = false;
    let level = 0;

    if (res.name === "Đãng Kiếm Dương Ba") {
      if (counts.Kim >= 12) {
        active = true;
        level = 3;
      } else if (counts.Kim >= 8) {
        active = true;
        level = 2;
      } else if (counts.Kim >= 4) {
        active = true;
        level = 1;
      }
    } else if (res.name === "Côn Ngô Đoạn Ngọc") {
      if (counts.Hoa >= 12) {
        active = true;
        level = 3;
      } else if (counts.Hoa >= 8) {
        active = true;
        level = 2;
      } else if (counts.Hoa >= 4) {
        active = true;
        level = 1;
      }
    } else if (res.name === "Nhật Nguyệt Lưỡng Nghi") {
      if (counts.Kim >= 4 && counts.Hoa >= 4) {
        active = true;
        level = 1;
      }
    } else if (res.name === "Phủ Ngưỡng Thái Hư") {
      if (counts.Moc >= 12) {
        active = true;
        level = 3;
      } else if (counts.Moc >= 6) {
        active = true;
        level = 1;
      }
    } else if (res.name === "Bất Động Minh Vương") {
      if (counts.Tho >= 12) {
        active = true;
        level = 3;
      } else if (counts.Tho >= 6) {
        active = true;
        level = 1;
      }
    } else if (res.name === "Vạn Hóa Minh Hợp") {
      if (counts.Thuy >= 12) {
        active = true;
        level = 3;
      } else if (counts.Thuy >= 6) {
        active = true;
        level = 1;
      }
    } else if (res.name === "Tuyệt Điện Phi Quang") {
      if (counts.Kim >= 8 && counts.Hoa >= 4) {
        active = true;
        level = 2;
      }
    }

    return {
      ...res,
      active,
      level,
    };
  });

  return { counts, resonances };
}

function calculateStats(
  gearSlots: Record<string, GearSlotItem>,
  innerSlots: (InnerKungfu | null)[],
  resonances: ResonanceEffect[]
): CalculatedStats {
  let gearPower = 0;
  Object.values(gearSlots).forEach((g) => {
    gearPower += g.gearScore;
  });

  let innerScore = 0;
  let bonusHp = 0;
  let bonusAttack = 0;
  let bonusCrit = 0;
  let bonusBossDmg = 0;

  innerSlots.forEach((slot) => {
    if (slot) {
      innerScore += slot.score;
      if (slot.subStats) {
        slot.subStats.forEach((sub) => {
          const lower = sub.toLowerCase();
          const matchNum = sub.match(/\+?\s*([0-9,]+)/);
          const val = matchNum ? parseInt(matchNum[1].replace(/,/g, ''), 10) : 0;
          if (lower.includes('hp') || lower.includes('khí huyết')) {
            bonusHp += val;
          } else if (lower.includes('tấn công')) {
            bonusAttack += val;
          } else if (lower.includes('chí mạng') || lower.includes('hội tâm')) {
            bonusCrit += (val > 10 ? +(val * 0.05).toFixed(1) : val);
          } else if (lower.includes('khắc chế boss')) {
            bonusBossDmg += (val > 10 ? +(val * 0.04).toFixed(1) : val);
          }
        });
      }
    }
  });

  let resBonus = 0;
  resonances.forEach((r) => {
    if (r.active) {
      resBonus += r.level * 850;
    }
  });

  const totalPower = Math.round(gearPower * 0.75 + innerScore + resBonus);
  const attack = 4200 + Math.round(totalPower * 0.014) + bonusAttack;
  const defense = 2800 + Math.round(totalPower * 0.009);
  const critRate = +(28.5 + (innerSlots.filter((s) => s?.primaryElement === "Kim" || s?.primaryElement === "Hoa").length * 1.5) + bonusCrit).toFixed(1);
  const critDamage = +(175.0 + (innerSlots.filter((s) => s?.primaryElement === "Hoa").length * 4.2)).toFixed(1);
  const bossBreakthrough = +(14.2 + (resonances.find((r) => r.name === "Đãng Kiếm Dương Ba")?.active ? 4.0 : 0) + bonusBossDmg).toFixed(1);
  const hp = 78000 + Math.round(totalPower * 0.16) + bonusHp;
  const dpsEstimate = Math.round(attack * (1 + (critRate / 100) * (critDamage / 100)) * (1 + bossBreakthrough / 100) * 12.5);

  return {
    totalPower,
    attack,
    defense,
    critRate,
    critDamage,
    bossBreakthrough,
    hp,
    dpsEstimate,
  };
}

const initialInnerSlots = [
  INNER_KUNGFU_DATABASE[0], // Tỏa Phong
  INNER_KUNGFU_DATABASE[3], // Linh Tê
  INNER_KUNGFU_DATABASE[4], // Phá Phủ
  INNER_KUNGFU_DATABASE[5], // Trảm Tinh
  INNER_KUNGFU_DATABASE[6], // Xung Hư
  INNER_KUNGFU_DATABASE[7], // Côn Ngô Đoạn Ngọc
];

const { counts: initialCounts, resonances: initialResonances } = calculateElementsAndResonances(initialInnerSlots);
const initialStats = calculateStats(DEFAULT_GEAR_SLOTS, initialInnerSlots, initialResonances);

export const useSimulatorStore = create<SimulatorState>((set, get) => ({
  selectedSect: "Cửu Linh",
  activePresetId: "preset-cuulinh-s2",
  gearSlots: { ...DEFAULT_GEAR_SLOTS },
  innerSlots: initialInnerSlots,
  elementCounts: initialCounts,
  resonances: initialResonances,
  stats: initialStats,
  selectedInnerSlotIndex: null,
  isCatalogOpen: false,
  isOcrModalOpen: false,
  pendingOcrImage: null,
  notificationMessage: null,

  setSelectedSect: (sect) => {
    set({ selectedSect: sect });
    get().setNotification(`Đã chuyển lưu phái sang: ${sect}`);
  },

  loadPreset: (presetId) => {
    const preset = POPULAR_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;

    const newInnerSlots = [...preset.innerKungfuList];
    const { counts, resonances } = calculateElementsAndResonances(newInnerSlots);
    const newStats = calculateStats(preset.gearItems, newInnerSlots, resonances);

    set({
      activePresetId: presetId,
      selectedSect: preset.sect,
      gearSlots: { ...preset.gearItems },
      innerSlots: newInnerSlots,
      elementCounts: counts,
      resonances,
      stats: newStats,
    });

    get().setNotification(`Đã áp dụng bảng mẫu: ${preset.name}`);
  },

  setInnerSlot: (slotIndex, kungfu) => {
    const currentSlots = [...get().innerSlots];
    currentSlots[slotIndex] = kungfu;

    const { counts, resonances } = calculateElementsAndResonances(currentSlots);
    const newStats = calculateStats(get().gearSlots, currentSlots, resonances);

    set({
      innerSlots: currentSlots,
      elementCounts: counts,
      resonances,
      stats: newStats,
      isCatalogOpen: false,
      selectedInnerSlotIndex: null,
    });

    get().setNotification(`Đã trang bị Nội Công: ${kungfu.name}`);
  },

  removeInnerSlot: (slotIndex) => {
    const currentSlots = [...get().innerSlots];
    const removedName = currentSlots[slotIndex]?.name || "";
    currentSlots[slotIndex] = null;

    const { counts, resonances } = calculateElementsAndResonances(currentSlots);
    const newStats = calculateStats(get().gearSlots, currentSlots, resonances);

    set({
      innerSlots: currentSlots,
      elementCounts: counts,
      resonances,
      stats: newStats,
    });

    get().setNotification(`Đã gỡ Nội Công: ${removedName}`);
  },

  updateInnerSlotElement: (slotIndex, elementIndex, newElement) => {
    const currentSlots = [...get().innerSlots];
    const targetSlot = currentSlots[slotIndex];
    if (!targetSlot) return;

    const ELEMENT_CYCLE: ElementType[] = ['Kim', 'Moc', 'Thuy', 'Hoa', 'Tho'];
    const currentEl = targetSlot.elements[elementIndex] || 'Kim';
    const nextEl = newElement || ELEMENT_CYCLE[(ELEMENT_CYCLE.indexOf(currentEl) + 1) % ELEMENT_CYCLE.length];

    const newElements = [...targetSlot.elements];
    newElements[elementIndex] = nextEl;

    // Deep copy slot to avoid mutating reference
    currentSlots[slotIndex] = {
      ...targetSlot,
      elements: newElements,
    };

    const { counts, resonances } = calculateElementsAndResonances(currentSlots);
    const newStats = calculateStats(get().gearSlots, currentSlots, resonances);

    set({
      innerSlots: currentSlots,
      elementCounts: counts,
      resonances,
      stats: newStats,
    });

    get().setNotification(`Node #${elementIndex + 1} [${targetSlot.name}] đổi thành: ${nextEl}`);
  },

  setSlotElements: (slotIndex, elements) => {
    const currentSlots = [...get().innerSlots];
    const targetSlot = currentSlots[slotIndex];
    if (!targetSlot) return;

    currentSlots[slotIndex] = {
      ...targetSlot,
      elements: [...elements],
    };

    const { counts, resonances } = calculateElementsAndResonances(currentSlots);
    const newStats = calculateStats(get().gearSlots, currentSlots, resonances);

    set({
      innerSlots: currentSlots,
      elementCounts: counts,
      resonances,
      stats: newStats,
    });

    get().setNotification(`Đã áp dụng bộ nguyên tố mới cho [${targetSlot.name}]`);
  },

  updateGearItem: (slot, item) => {
    const currentGear = { ...get().gearSlots, [slot]: item };
    const newStats = calculateStats(currentGear, get().innerSlots, get().resonances);

    set({
      gearSlots: currentGear,
      stats: newStats,
    });

    get().setNotification(`Đã cập nhật trang bị ô [${slot}]: ${item.name}`);
  },

  openCatalogForSlot: (slotIndex) => {
    set({
      selectedInnerSlotIndex: slotIndex,
      isCatalogOpen: true,
    });
  },

  closeCatalog: () => {
    set({
      isCatalogOpen: false,
      selectedInnerSlotIndex: null,
    });
  },

  setOcrModalOpen: (open) => {
    set({ isOcrModalOpen: open });
  },

  setPendingOcrImage: (fileOrUrl) => {
    set({ pendingOcrImage: fileOrUrl });
  },

  exportBuildJSON: () => {
    const data = {
      version: "2.0",
      sect: get().selectedSect,
      gearSlots: get().gearSlots,
      innerSlots: get().innerSlots.map((s) => s ? s.name : null),
      stats: get().stats,
      exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(data, null, 2);
  },

  importBuildJSON: (jsonStr) => {
    try {
      const data = JSON.parse(jsonStr);
      if (!data || !data.sect) return false;

      let newInner: (InnerKungfu | null)[] = [];
      if (Array.isArray(data.innerSlots)) {
        newInner = data.innerSlots.map((name: string | null) => {
          if (!name) return null;
          return INNER_KUNGFU_DATABASE.find((ik) => ik.name === name) || null;
        });
      }

      while (newInner.length < 6) {
        newInner.push(null);
      }

      const gear = data.gearSlots || get().gearSlots;
      const { counts, resonances } = calculateElementsAndResonances(newInner);
      const stats = calculateStats(gear, newInner, resonances);

      set({
        selectedSect: data.sect,
        gearSlots: gear,
        innerSlots: newInner,
        elementCounts: counts,
        resonances,
        stats,
      });

      get().setNotification("Nhập cấu hình Build thành công!");
      return true;
    } catch (e) {
      console.error(e);
      get().setNotification("Lỗi giải mã cấu hình JSON!");
      return false;
    }
  },

  setNotification: (msg) => {
    set({ notificationMessage: msg });
    if (msg) {
      setTimeout(() => {
        if (get().notificationMessage === msg) {
          set({ notificationMessage: null });
        }
      }, 3500);
    }
  },
}));

