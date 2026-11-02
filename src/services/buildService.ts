import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import {
  InnerKungfu,
  GearSlotItem,
  ElementType,
  ResonanceEffect,
} from "@/data/simulatorData";
import { CalculatedStats } from "@/store/useSimulatorStore";

export interface CloudBuildRecord {
  id?: string;
  share_code: string;
  title: string;
  sect: string;
  creator_name: string;
  inner_slots: (InnerKungfu | null)[];
  gear_slots: Record<string, GearSlotItem | null>;
  element_counts: Record<ElementType, number>;
  resonances: ResonanceEffect[];
  stats: CalculatedStats;
  likes_count?: number;
  created_at?: string;
}

export interface UserInventoryRecord {
  id?: string;
  user_key: string;
  reserve_kungfus: InnerKungfu[];
  gear_slots: Record<string, GearSlotItem | null>;
  updated_at?: string;
}

/**
 * Generate a clean, short human-readable share code (e.g. NTH-M7A9)
 */
export function generateShareCode(sect = "NTH"): string {
  const prefix = sect.replace(/\s+/g, "").substring(0, 3).toUpperCase();
  const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${randomChars}`;
}

/**
 * Save build to Supabase community builds table
 */
export async function saveBuildToCloud(
  build: Omit<CloudBuildRecord, "share_code" | "created_at">,
): Promise<{ success: boolean; shareCode: string; message: string }> {
  const shareCode = generateShareCode(build.sect);
  const supabase = getSupabase();

  if (!supabase || !isSupabaseConfigured()) {
    // Graceful offline fallback: store in localStorage under shared_builds
    try {
      if (typeof window !== "undefined") {
        const localList = JSON.parse(
          localStorage.getItem("nth_offline_shared_builds") || "[]",
        );
        const newRecord: CloudBuildRecord = {
          ...build,
          share_code: shareCode,
          created_at: new Date().toISOString(),
          likes_count: 1,
        };
        localList.unshift(newRecord);
        localStorage.setItem(
          "nth_offline_shared_builds",
          JSON.stringify(localList.slice(0, 30)),
        );
      }
      return {
        success: true,
        shareCode,
        message:
          "Đã lưu cấu hình bộ build thành công (Chế độ Cục Bộ/Local). Cấu hình Supabase Cloud sẽ đồng bộ trực tiếp lên máy chủ toàn cầu!",
      };
    } catch (e: any) {
      return {
        success: false,
        shareCode: "",
        message: e?.message || "Lỗi lưu trữ cục bộ",
      };
    }
  }

  try {
    const { data, error } = await supabase
      .from("community_builds")
      .insert({
        share_code: shareCode,
        title: build.title || "Bộ Phối Thuật Chiến Meta",
        sect: build.sect,
        creator_name: build.creator_name || "Hiệp Khách Ẩn Danh",
        inner_slots: build.inner_slots,
        gear_slots: build.gear_slots,
        element_counts: build.element_counts,
        resonances: build.resonances,
        stats: build.stats,
        likes_count: 0,
      })
      .select("share_code")
      .single();

    if (error) {
      console.error("[Supabase] Insert build failed:", error);
      return {
        success: false,
        shareCode: "",
        message: `Lỗi Supabase: ${error.message}`,
      };
    }

    return {
      success: true,
      shareCode: data?.share_code || shareCode,
      message:
        "Đã lưu và xuất bản bộ build thành công lên Supabase Cloud Database!",
    };
  } catch (err: any) {
    console.error("[Supabase] saveBuildToCloud Exception:", err);
    return {
      success: false,
      shareCode: "",
      message: err?.message || "Lỗi kết nối cơ sở dữ liệu",
    };
  }
}

/**
 * Fetch a shared build from Supabase using its share code
 */
export async function fetchBuildByCode(
  shareCode: string,
): Promise<CloudBuildRecord | null> {
  const supabase = getSupabase();

  if (!supabase || !isSupabaseConfigured()) {
    // Check local fallback
    if (typeof window !== "undefined") {
      const localList: CloudBuildRecord[] = JSON.parse(
        localStorage.getItem("nth_offline_shared_builds") || "[]",
      );
      const match = localList.find(
        (b) => b.share_code.toUpperCase() === shareCode.toUpperCase(),
      );
      if (match) return match;
    }
    return null;
  }

  try {
    const { data, error } = await supabase
      .from("community_builds")
      .select("*")
      .eq("share_code", shareCode.toUpperCase())
      .single();

    if (error || !data) {
      console.warn("[Supabase] Build not found:", error);
      return null;
    }

    return data as CloudBuildRecord;
  } catch (err) {
    console.error("[Supabase] fetchBuildByCode error:", err);
    return null;
  }
}

/**
 * Fetch top community builds (filtered by sect if specified)
 */
export async function fetchCommunityBuilds(
  sect?: string,
  limit = 12,
): Promise<CloudBuildRecord[]> {
  const supabase = getSupabase();

  if (!supabase || !isSupabaseConfigured()) {
    if (typeof window !== "undefined") {
      const localList: CloudBuildRecord[] = JSON.parse(
        localStorage.getItem("nth_offline_shared_builds") || "[]",
      );
      if (sect && sect !== "Tất Cả") {
        return localList.filter((b) => b.sect === sect).slice(0, limit);
      }
      return localList.slice(0, limit);
    }
    return [];
  }

  try {
    let query = supabase
      .from("community_builds")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (sect && sect !== "Tất Cả") {
      query = query.eq("sect", sect);
    }

    const { data, error } = await query;
    if (error) {
      console.error("[Supabase] fetchCommunityBuilds error:", error);
      return [];
    }

    return (data || []) as CloudBuildRecord[];
  } catch (err) {
    console.error("[Supabase] fetchCommunityBuilds Exception:", err);
    return [];
  }
}
