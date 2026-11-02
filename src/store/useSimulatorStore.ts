import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
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

const safeLocalStorage: StateStorage = {
  getItem: (name: string): string | null => {
    try {
      if (typeof window === 'undefined') return null;
      return window.localStorage.getItem(name);
    } catch (e) {
      console.warn(`[useSimulatorStore] getItem("${name}") failed:`, e);
      return null;
    }
  },
  setItem: (name: string, value: string): void => {
    try {
      if (typeof window === 'undefined') return;
      window.localStorage.setItem(name, value);
    } catch (e) {
      console.warn(`[useSimulatorStore] setItem("${name}") failed (e.g. quota exceeded):`, e);
    }
  },
  removeItem: (name: string): void => {
    try {
      if (typeof window === 'undefined') return;
      window.localStorage.removeItem(name);
    } catch (e) {
      console.warn(`[useSimulatorStore] removeItem("${name}") failed:`, e);
    }
  },
};

const sanitizeKungfu = (k: any): InnerKungfu | null => {
  if (!k || typeof k !== 'object') return null;
  const elements = Array.isArray(k.elements) && k.elements.length === 5 ? k.elements : ['Kim', 'Kim', 'Kim', 'Kim', 'Kim'];
  return {
    id: String(k.id || `kf-${Date.now()}`),
    name: String(k.name || 'Nội Công'),
    primaryElement: k.primaryElement || elements[0] || 'Kim',
    secondaryElement: k.secondaryElement || elements[1] || 'Kim',
    tier: k.tier === 'Hoàng Kim' ? 'Hoàng Kim' : 'Thần Thoại',
    description: String(k.description || ''),
    elements,
    score: typeof k.score === 'number' && !isNaN(k.score) ? k.score : 2500,
    level: typeof k.level === 'number' && !isNaN(k.level) ? k.level : 25,
    subStats: Array.isArray(k.subStats) ? k.subStats.filter((s: any) => typeof s === 'string') : [],
    imageUrl: typeof k.imageUrl === 'string' ? k.imageUrl : undefined
  };
};

const sanitizeGear = (g: any): GearSlotItem | null => {
  if (!g || typeof g !== 'object') return null;
  return {
    id: String(g.id || `gear-${Date.now()}`),
    slot: g.slot || 'Vũ Khí',
    name: String(g.name || 'Trang Bị'),
    tier: (g.tier === 'Thần Thoại Kim' || g.tier === 'Hoàng Kim') ? g.tier : 'Độc Trân',
    level: typeof g.level === 'number' && !isNaN(g.level) ? g.level : 79,
    refine: typeof g.refine === 'number' && !isNaN(g.refine) ? g.refine : 12,
    gearScore: typeof g.gearScore === 'number' && !isNaN(g.gearScore) ? g.gearScore : 9800,
    mainStat: String(g.mainStat || '+1,000 Tấn Công'),
    subStats: Array.isArray(g.subStats) ? g.subStats.filter((s: any) => typeof s === 'string') : [],
    imageUrl: typeof g.imageUrl === 'string' ? g.imageUrl : undefined
  };
};

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

export const EMPTY_GEAR_SLOTS: Record<string, GearSlotItem | null> = {
  "Vũ Khí": null,
  "Áo": null,
  "Mũ": null,
  "Đai": null,
  "Giày": null,
  "Hộ Uyển": null,
  "Nhẫn 1": null,
  "Nhẫn 2": null,
  "Dây Chuyền": null,
  "Bội Ngọc": null,
};

export const EMPTY_INNER_SLOTS: (InnerKungfu | null)[] = [null, null, null, null, null, null];

interface SimulatorState {
  selectedSect: string;
  activePresetId: string;
  gearSlots: Record<string, GearSlotItem | null>;
  innerSlots: (InnerKungfu | null)[];
  reserveKungfus: InnerKungfu[];
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
  removeGearSlot: (slot: string) => void;
  addKungfuToReserve: (kungfu: InnerKungfu) => void;
  removeKungfuFromReserve: (kungfuId: string) => void;
  updateReserveKungfu: (kungfu: InnerKungfu) => void;
  clearReserve: () => void;
  clearAllDatabase: () => void;
  loadSampleData: () => void;
  openCatalogForSlot: (slotIndex: number) => void;
  closeCatalog: () => void;
  setOcrModalOpen: (open: boolean) => void;
  setPendingOcrImage: (fileOrUrl: File | string | null) => void;
  exportBuildJSON: () => string;
  importBuildJSON: (jsonStr: string) => boolean;
  setNotification: (msg: string | null) => void;
}

function calculateElementsAndResonances(innerSlots: (InnerKungfu | null)[] = []) {
  const counts: Record<ElementType, number> = {
    Kim: 0,
    Moc: 0,
    Thuy: 0,
    Hoa: 0,
    Tho: 0,
  };

  (innerSlots || []).forEach((slot) => {
    if (slot && Array.isArray(slot.elements)) {
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
  gearSlots: Record<string, GearSlotItem | null> = {},
  innerSlots: (InnerKungfu | null)[] = [],
  resonances: ResonanceEffect[] = []
): CalculatedStats {
  let gearPower = 0;
  Object.values(gearSlots || {}).forEach((g) => {
    if (g && typeof g.gearScore === 'number') {
      gearPower += g.gearScore;
    }
  });

  let innerScore = 0;
  let bonusHp = 0;
  let bonusAttack = 0;
  let bonusCrit = 0;
  let bonusBossDmg = 0;

  (innerSlots || []).forEach((slot) => {
    if (slot) {
      innerScore += (typeof slot.score === 'number' ? slot.score : 0);
      if (Array.isArray(slot.subStats)) {
        slot.subStats.forEach((sub) => {
          if (typeof sub !== 'string') return;
          const lower = sub.toLowerCase();
          const matchNum = sub.match(/\+?\s*([0-9,]+)/);
          const val = matchNum ? parseInt(matchNum[1].replace(/,/g, ''), 10) : 0;
          if (lower.includes('hp') || lower.includes('khí huyết')) {
            bonusHp += val;
          } else if (lower.includes('tấn công')) {
            bonusAttack += val;
          } else if (lower.includes('chí mạng') || lower.includes('hội tâm')) {
            bonusCrit += (val > 10 ? +(val * 0.05).toFixed(1) : val);
          } else if (lower.includes('khắc chế boss') || lower.includes('khắc chế quái')) {
            bonusBossDmg += (val > 10 ? +(val * 0.04).toFixed(1) : val);
          }
        });
      }
    }
  });

  let resBonus = 0;
  (resonances || []).forEach((r) => {
    if (r && r.active) {
      resBonus += (r.level || 0) * 850;
    }
  });

  const validInner = (innerSlots || []).filter(Boolean);
  const totalPower = Math.round(gearPower * 0.75 + innerScore + resBonus);
  const attack = totalPower > 0 ? (4200 + Math.round(totalPower * 0.014) + bonusAttack) : 0;
  const defense = totalPower > 0 ? (2800 + Math.round(totalPower * 0.009)) : 0;
  const critRate = totalPower > 0 ? +(28.5 + (validInner.filter((s) => s?.primaryElement === "Kim" || s?.primaryElement === "Hoa").length * 1.5) + bonusCrit).toFixed(1) : 0;
  const critDamage = totalPower > 0 ? +(175.0 + (validInner.filter((s) => s?.primaryElement === "Hoa").length * 4.2)).toFixed(1) : 0;
  const bossBreakthrough = totalPower > 0 ? +(14.2 + ((resonances || []).find((r) => r && r.name === "Đãng Kiếm Dương Ba")?.active ? 4.0 : 0) + bonusBossDmg).toFixed(1) : 0;
  const hp = totalPower > 0 ? (78000 + Math.round(totalPower * 0.16) + bonusHp) : 0;
  const dpsEstimate = attack > 0 ? Math.round(attack * (1 + (critRate / 100) * (critDamage / 100)) * (1 + bossBreakthrough / 100) * 12.5) : 0;

  return {
    totalPower: isNaN(totalPower) ? 0 : totalPower,
    attack: isNaN(attack) ? 0 : attack,
    defense: isNaN(defense) ? 0 : defense,
    critRate: isNaN(critRate) ? 0 : critRate,
    critDamage: isNaN(critDamage) ? 0 : critDamage,
    bossBreakthrough: isNaN(bossBreakthrough) ? 0 : bossBreakthrough,
    hp: isNaN(hp) ? 0 : hp,
    dpsEstimate: isNaN(dpsEstimate) ? 0 : dpsEstimate,
  };
}

const { counts: initialCounts, resonances: initialResonances } = calculateElementsAndResonances(EMPTY_INNER_SLOTS);
const initialStats = calculateStats(EMPTY_GEAR_SLOTS, EMPTY_INNER_SLOTS, initialResonances);

export const useSimulatorStore = create<SimulatorState>()(
  persist(
    (set, get) => ({
      selectedSect: "Cửu Linh",
      activePresetId: "custom-db",
      gearSlots: { ...EMPTY_GEAR_SLOTS },
      innerSlots: [...EMPTY_INNER_SLOTS],
      reserveKungfus: [],
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

        // Auto-add to reserve database if not already there
        const reserve = [...get().reserveKungfus];
        if (!reserve.some((r) => r.id === kungfu.id)) {
          reserve.push(kungfu);
        }

        const { counts, resonances } = calculateElementsAndResonances(currentSlots);
        const newStats = calculateStats(get().gearSlots, currentSlots, resonances);

        set({
          innerSlots: currentSlots,
          reserveKungfus: reserve,
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

        const updatedKungfu: InnerKungfu = {
          ...targetSlot,
          elements: newElements,
        };
        currentSlots[slotIndex] = updatedKungfu;

        // Also sync in reserve if present
        const reserve = get().reserveKungfus.map((ik) => ik.id === targetSlot.id ? updatedKungfu : ik);

        const { counts, resonances } = calculateElementsAndResonances(currentSlots);
        const newStats = calculateStats(get().gearSlots, currentSlots, resonances);

        set({
          innerSlots: currentSlots,
          reserveKungfus: reserve,
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

        const updatedKungfu: InnerKungfu = {
          ...targetSlot,
          elements: [...elements],
        };
        currentSlots[slotIndex] = updatedKungfu;

        const reserve = get().reserveKungfus.map((ik) => ik.id === targetSlot.id ? updatedKungfu : ik);

        const { counts, resonances } = calculateElementsAndResonances(currentSlots);
        const newStats = calculateStats(get().gearSlots, currentSlots, resonances);

        set({
          innerSlots: currentSlots,
          reserveKungfus: reserve,
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

        get().setNotification(`Đã trang bị vào ô [${slot}]: ${item.name}`);
      },

      removeGearSlot: (slot) => {
        const currentGear = { ...get().gearSlots, [slot]: null };
        const newStats = calculateStats(currentGear, get().innerSlots, get().resonances);

        set({
          gearSlots: currentGear,
          stats: newStats,
        });

        get().setNotification(`Đã gỡ trang bị ô [${slot}]`);
      },

      addKungfuToReserve: (kungfu) => {
        const reserve = [...get().reserveKungfus];
        const existingIdx = reserve.findIndex((k) => k.id === kungfu.id);
        if (existingIdx !== -1) {
          reserve[existingIdx] = kungfu;
        } else {
          reserve.unshift(kungfu);
        }

        set({ reserveKungfus: reserve });
        get().setNotification(`Đã lưu [${kungfu.name}] vào Kho Nội Công Database!`);
      },

      removeKungfuFromReserve: (kungfuId) => {
        const reserve = get().reserveKungfus.filter((k) => k.id !== kungfuId);
        // Also unequip from slots if equipped
        const currentSlots = get().innerSlots.map((s) => (s?.id === kungfuId ? null : s));
        const { counts, resonances } = calculateElementsAndResonances(currentSlots);
        const newStats = calculateStats(get().gearSlots, currentSlots, resonances);

        set({
          reserveKungfus: reserve,
          innerSlots: currentSlots,
          elementCounts: counts,
          resonances,
          stats: newStats,
        });

        get().setNotification(`Đã xóa bí kíp khỏi Kho Database`);
      },

      updateReserveKungfu: (kungfu) => {
        const reserve = get().reserveKungfus.map((k) => (k.id === kungfu.id ? kungfu : k));
        const currentSlots = get().innerSlots.map((s) => (s?.id === kungfu.id ? kungfu : s));
        const { counts, resonances } = calculateElementsAndResonances(currentSlots);
        const newStats = calculateStats(get().gearSlots, currentSlots, resonances);

        set({
          reserveKungfus: reserve,
          innerSlots: currentSlots,
          elementCounts: counts,
          resonances,
          stats: newStats,
        });
      },

      clearReserve: () => {
        set({ reserveKungfus: [] });
        get().setNotification(`Đã làm trống Kho Nội Công Dự Trữ`);
      },

      clearAllDatabase: () => {
        set({
          gearSlots: { ...EMPTY_GEAR_SLOTS },
          innerSlots: [...EMPTY_INNER_SLOTS],
          reserveKungfus: [],
          elementCounts: { Kim: 0, Moc: 0, Thuy: 0, Hoa: 0, Tho: 0 },
          stats: calculateStats(EMPTY_GEAR_SLOTS, EMPTY_INNER_SLOTS, []),
        });
        get().setNotification(`Đã xóa sạch Database (Đưa 10 ô đồ, 6 nội công và kho về 0)`);
      },

      loadSampleData: () => {
        const sampleKungfus = [...INNER_KUNGFU_DATABASE];
        const sampleGear = { ...DEFAULT_GEAR_SLOTS };
        const sampleInner = [
          sampleKungfus[0],
          sampleKungfus[3],
          sampleKungfus[4],
          sampleKungfus[5],
          sampleKungfus[6],
          sampleKungfus[7],
        ];
        const { counts, resonances } = calculateElementsAndResonances(sampleInner);
        const stats = calculateStats(sampleGear, sampleInner, resonances);

        set({
          gearSlots: sampleGear,
          innerSlots: sampleInner,
          reserveKungfus: sampleKungfus,
          elementCounts: counts,
          resonances,
          stats,
        });
        get().setNotification(`Đã nạp kho mẫu dữ liệu (65 bí kíp & 10 trang bị)`);
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
          version: "2.1",
          type: "NTH_WIKI_DATABASE_EXPORT",
          sect: get().selectedSect,
          gearSlots: get().gearSlots,
          innerSlots: get().innerSlots,
          reserveKungfus: get().reserveKungfus,
          stats: get().stats,
          exportedAt: new Date().toISOString(),
        };
        return JSON.stringify(data, null, 2);
      },

      importBuildJSON: (jsonStr) => {
        try {
          const data = JSON.parse(jsonStr);
          if (!data) return false;

          const gear = data.gearSlots || { ...EMPTY_GEAR_SLOTS };
          let newInner: (InnerKungfu | null)[] = [];

          if (Array.isArray(data.innerSlots)) {
            newInner = data.innerSlots.map((item: any) => {
              if (!item) return null;
              if (typeof item === 'string') {
                return INNER_KUNGFU_DATABASE.find((ik) => ik.name === item) || null;
              }
              return item;
            });
          }

          while (newInner.length < 6) {
            newInner.push(null);
          }

          const reserve = Array.isArray(data.reserveKungfus) ? data.reserveKungfus : [];
          const { counts, resonances } = calculateElementsAndResonances(newInner);
          const stats = calculateStats(gear, newInner, resonances);

          set({
            selectedSect: data.sect || get().selectedSect,
            gearSlots: gear,
            innerSlots: newInner,
            reserveKungfus: reserve,
            elementCounts: counts,
            resonances,
            stats,
          });

          get().setNotification("Nhập cấu hình & Database thành công!");
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
    }),
    {
      name: 'nth_wiki_database_v2',
      storage: createJSONStorage(() => safeLocalStorage),
      partialize: (state) => ({
        selectedSect: state.selectedSect,
        gearSlots: state.gearSlots,
        innerSlots: state.innerSlots,
        reserveKungfus: state.reserveKungfus,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        try {
          // Sanitize innerSlots
          let rawInner = Array.isArray(state.innerSlots) ? state.innerSlots : [];
          while (rawInner.length < 6) rawInner.push(null);
          const cleanInner = rawInner.slice(0, 6).map((k) => (k ? sanitizeKungfu(k) : null));
          state.innerSlots = cleanInner;

          // Sanitize gearSlots
          const cleanGear: Record<string, GearSlotItem | null> = { ...EMPTY_GEAR_SLOTS };
          if (state.gearSlots && typeof state.gearSlots === 'object') {
            Object.keys(EMPTY_GEAR_SLOTS).forEach((slotKey) => {
              const item = state.gearSlots[slotKey];
              cleanGear[slotKey] = item ? sanitizeGear(item) : null;
            });
          }
          state.gearSlots = cleanGear;

          // Sanitize reserveKungfus
          const cleanReserve: InnerKungfu[] = [];
          if (Array.isArray(state.reserveKungfus)) {
            state.reserveKungfus.forEach((k) => {
              const sanitized = sanitizeKungfu(k);
              if (sanitized) cleanReserve.push(sanitized);
            });
          }
          state.reserveKungfus = cleanReserve;

          const { counts, resonances } = calculateElementsAndResonances(cleanInner);
          state.elementCounts = counts;
          state.resonances = resonances;
          state.stats = calculateStats(cleanGear, cleanInner, resonances);
        } catch (e) {
          console.error("Hydration recovery error:", e);
        }
      }
    }
  )
);
