'use client';

import React, { useState } from 'react';
import { ElementType } from '@/data/simulatorData';

interface InnerKungfuIconProps {
  id?: string;
  name: string;
  element?: ElementType;
  className?: string;
  size?: number;
  customImageUrl?: string;
}

/**
 * Exact mapping to in-game cropped image files from user uploaded screenshots:
 * media_1793613904222_01f68d64.jpg, media_1793613925908_1332af36.jpg, media_1793613940651_fe24d9c9.jpg
 */
const KUNGFU_IMAGE_MAP: Record<string, string> = {
  // --- Ảnh 3 (Thần Thoại & Biến Thể) ---
  'nhat nguyet luong nghi': '/images/kungfu/nhat_nguyet_luong_nghi_hd.png',
  'nhat nguyet luong nghi hoa': '/images/kungfu/nhat_nguyet_luong_nghi_hoa.png',
  'nhat nguyet luong nghi kim': '/images/kungfu/nhat_nguyet_luong_nghi_kim.png',
  'con ngo doan ngoc': '/images/kungfu/con_ngo_doan_ngoc_kim.png',
  'con ngo doan ngoc kim': '/images/kungfu/con_ngo_doan_ngoc_kim.png',
  'con ngo doan ngoc hoa': '/images/kungfu/con_ngo_doan_ngoc_hoa.png',
  'dang kiem duong ba': '/images/kungfu/dang_kiem_duong_ba_hoa.png',
  'dang kiem duong ba hoa': '/images/kungfu/dang_kiem_duong_ba_hoa.png',
  'dang kiem duong ba kim': '/images/kungfu/dang_kiem_duong_ba_kim.png',
  'bat dong minh vuong': '/images/kungfu/bat_dong_minh_vuong_thuy.png',
  'bat dong minh vuong tho': '/images/kungfu/bat_dong_minh_vuong_thuy.png',
  'bat dong minh vuong thuy': '/images/kungfu/bat_dong_minh_vuong_thuy.png',
  'bat dong minh vuong moc': '/images/kungfu/bat_dong_minh_vuong_moc.png',
  'van hoa minh hop': '/images/kungfu/van_hoa_minh_hop_thuy.png',
  'van hoa minh hop thuy': '/images/kungfu/van_hoa_minh_hop_thuy.png',
  'van hoa minh hop tho': '/images/kungfu/van_hoa_minh_hop_tho.png',
  'phu nguong thai hu': '/images/kungfu/phu_nguong_thai_hu_kim.png',
  'phu nguong thai hu kim': '/images/kungfu/phu_nguong_thai_hu_kim.png',
  'phu nguong thai hu moc': '/images/kungfu/phu_nguong_thai_hu_moc.png',
  'tuyet dien phi quang': '/images/kungfu/tuyet_dien_phi_quang_kim.png',
  'tuyet dien phi quang kim': '/images/kungfu/tuyet_dien_phi_quang_kim.png',
  'tuyet dien phi quang moc': '/images/kungfu/tuyet_dien_phi_quang_moc.png',

  // --- Ảnh 1 (Hàng 1 - 9) ---
  'toa phong': '/images/kungfu/toa_phong.png',
  'sam la tran': '/images/kungfu/sam_la_tran.png',
  'khuoc ta': '/images/kungfu/khuoc_ta.png',
  'thuy huu': '/images/kungfu/thuy_huu.png',
  'dap hong': '/images/kungfu/dap_hong.png',
  'linh te': '/images/kungfu/linh_te.png',
  'chiet nhue': '/images/kungfu/chiet_nhue.png',
  'binh chuc du': '/images/kungfu/binh_chuc_du.png',
  'thai tuc lenh': '/images/kungfu/thai_tuc_lenh.png',
  'quy nguyen': '/images/kungfu/quy_nguyen.png',
  'lien tinh truy': '/images/kungfu/lien_tinh_truy.png',
  'chinh bao': '/images/kungfu/chinh_bao.png',
  'hoa dich': '/images/kungfu/hoa_dich.png',
  'thuc hon': '/images/kungfu/thuc_hon.png',
  'pha phu': '/images/kungfu/pha_phu.png',
  'phuoc nhan': '/images/kungfu/phuoc_nhan.png',
  'thu thien chung': '/images/kungfu/thu_thien_chung.png',
  'tan duong dan': '/images/kungfu/tan_duong_dan.png',
  'chi thuy quyet': '/images/kungfu/chi_thuy_quyet.png',
  'moc xuan phong': '/images/kungfu/moc_xuan_phong.png',
  'linh lung dau': '/images/kungfu/linh_lung_dau.png',
  'so cuong ca': '/images/kungfu/so_cuong_ca.png',
  'kich tiet than': '/images/kungfu/kich_tiet_than.png',
  'am kich': '/images/kungfu/am_kich.png',
  'chu vu': '/images/kungfu/chu_vu.png',
  'hong anh': '/images/kungfu/hong_anh.png',
  'thuong lang hanh': '/images/kungfu/thuong_lang_hanh.png',

  // --- Ảnh 2 (Hàng 1 - 9) ---
  'xung hu': '/images/kungfu/xung_hu.png',
  'diet tran': '/images/kungfu/diet_tran.png',
  'tram tinh': '/images/kungfu/tram_tinh.png',
  'kich suy': '/images/kungfu/kich_suy.png',
  'tu bon loi': '/images/kungfu/tu_bon_loi.png',
  'the dang van': '/images/kungfu/the_dang_van.png',
  'tan kim nguyen': '/images/kungfu/tan_kim_nguyen.png',
  'liet khon du': '/images/kungfu/liet_khon_du.png',
  'doan kim qua': '/images/kungfu/doan_kim_qua.png',
  'diem minh lo': '/images/kungfu/diem_minh_lo.png',
  'nap son hai': '/images/kungfu/nap_son_hai.png',
  'chung van trach': '/images/kungfu/chung_van_trach.png',
  'pha trong van': '/images/kungfu/pha_trong_van.png',
  'phi kien': '/images/kungfu/phi_kien.png',
  'minh can qua': '/images/kungfu/minh_can_qua.png',
  'tram uyen': '/images/kungfu/tram_uyen.png',
  'chuoc sat': '/images/kungfu/chuoc_sat.png',
  'thong huyen': '/images/kungfu/thong_huyen.png',
  'trac tuyet': '/images/kungfu/trac_tuyet.png',
  'chung dieu': '/images/kungfu/chung_dieu.png',
  'dinh phong': '/images/kungfu/dinh_phong.png',
  'vong kinh xuyen': '/images/kungfu/vong_kinh_xuyen.png',
  'ngu thien son': '/images/kungfu/ngu_thien_son.png',
  'ham kim khuyet': '/images/kungfu/ham_kim_khuyet.png',
};

/**
 * Foolproof Vietnamese normalization handling 'đ', 'Đ', combined tones, parentheses, and spaces
 */
function normalizeName(str: string): string {
  return str
    .toLowerCase()
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[()]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * InnerKungfuIcon displays the authentic in-game cropped image
 * directly harvested from user uploaded screenshots.
 */
export function InnerKungfuIcon({
  name,
  element = 'Kim',
  className = "w-8 h-8",
  size,
  customImageUrl
}: InnerKungfuIconProps) {
  const [imgError, setImgError] = useState(false);

  const clean = normalizeName(name);

  // If customImageUrl provided (from OCR scan Ảnh #1), use it first!
  let imgPath = customImageUrl;

  // 1. Direct match with full normalized name (including variant)
  if (!imgPath) {
    imgPath = KUNGFU_IMAGE_MAP[clean];
  }

  // 2. Try match without variant (e.g. "Bất Động Minh Vương (Thổ)" -> "Bất Động Minh Vương")
  if (!imgPath) {
    const baseName = normalizeName(name.replace(/\(.*?\)/g, ''));
    imgPath = KUNGFU_IMAGE_MAP[baseName];
  }

  // 3. Fallback fuzzy search if still not found
  if (!imgPath) {
    const key = Object.keys(KUNGFU_IMAGE_MAP).find((k) => clean.includes(k) || k.includes(clean));
    if (key) {
      imgPath = KUNGFU_IMAGE_MAP[key];
    }
  }

  // Border & Glow styling according to element
  const getElementBorder = () => {
    switch (element) {
      case 'Hoa':
        return 'border-rose-500/80 shadow-[0_0_8px_rgba(244,63,94,0.45)]';
      case 'Moc':
        return 'border-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.45)]';
      case 'Thuy':
        return 'border-sky-400/80 shadow-[0_0_8px_rgba(56,189,248,0.45)]';
      case 'Tho':
        return 'border-amber-600/80 shadow-[0_0_8px_rgba(217,119,6,0.45)]';
      case 'Kim':
      default:
        return 'border-amber-400/80 shadow-[0_0_8px_rgba(251,191,36,0.45)]';
    }
  };

  const styleObj = size ? { width: size, height: size } : undefined;

  return (
    <div
      style={styleObj}
      className={`relative rounded-lg overflow-hidden border ${getElementBorder()} bg-gradient-to-b from-[#18263a] to-[#0a101a] flex items-center justify-center flex-shrink-0 transition-transform select-none p-1 ${className}`}
      title={name}
    >
      {imgPath && !imgError ? (
        <img
          src={imgPath}
          alt={name}
          className="w-full h-full object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]"
          onError={() => setImgError(true)}
          loading="lazy"
        />
      ) : (
        /* Fallback if image fails to load */
        <div className="w-full h-full flex items-center justify-center bg-[#152338] text-gold font-serif font-bold text-xs">
          {name.slice(0, 2)}
        </div>
      )}
    </div>
  );
}
