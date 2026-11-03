export type BasicElementType = "Kim" | "Moc" | "Thuy" | "Hoa" | "Tho";
export type ElementType = BasicElementType | "?";

export interface InnerKungfu {
  id: string;
  name: string;
  primaryElement: ElementType;
  secondaryElement?: ElementType;
  tier: "Thần Thoại" | "Hoàng Kim";
  description: string;
  elements: ElementType[]; // 5 or 6 elements
  tags?: string[];
  score: number;
  level?: number;
  subStats?: string[];
  imageUrl?: string;
}

export interface GearSlotItem {
  id: string;
  slot: "Vũ Khí" | "Áo" | "Mũ" | "Đai" | "Giày" | "Hộ Uyển" | "Nhẫn 1" | "Nhẫn 2" | "Dây Chuyền" | "Bội Ngọc";
  name: string;
  tier: "Thần Thoại Kim" | "Hoàng Kim" | "Độc Trân";
  level: number;
  refine: number;
  gearScore: number;
  mainStat: string;
  subStats: string[];
  imageUrl?: string;
}

export interface ResonanceEffect {
  id: string;
  name: string;
  elementReq: string;
  level: number; // 0 (inactive), 1, 2, 3
  effectText: string;
  active: boolean;
  color: string;
}

export interface BuildPreset {
  id: string;
  name: string;
  sect: string;
  role: string;
  description: string;
  gearItems: Record<string, GearSlotItem>;
  innerKungfuList: InnerKungfu[];
  targetResonance: string[];
  totalPower: number;
}

// Full Inner Kungfu database directly mapped from game screens (Images 1, 2, 3)
export const INNER_KUNGFU_DATABASE: InnerKungfu[] = [
  {
    "id": "ik-nhatnguyet-hoa",
    "name": "Nhật Nguyệt Lưỡng Nghi (Hỏa)",
    "primaryElement": "Hoa",
    "tier": "Thần Thoại",
    "description": "Khi HP trên 50%, hiệu quả gây sát thương/trị liệu tăng 5%. Khi HP dưới 50%, sát thương nhận vào giảm 5% ◆ Kích hoạt Linh Vận tăng thêm 50% hiệu quả.",
    "elements": [
      "Hoa",
      "Hoa",
      "Hoa",
      "?",
      "?"
    ],
    "tags": [
      "Thông Dụng",
      "Giảm ST",
      "Tăng Sát Thương"
    ],
    "imageUrl": "/images/kungfu/nhat_nguyet_luong_nghi_hoa.png",
    "score": 3029,
    "level": 25
  },
  {
    "id": "ik-nhatnguyet-tho",
    "name": "Nhật Nguyệt Lưỡng Nghi (Thổ)",
    "primaryElement": "Tho",
    "tier": "Thần Thoại",
    "description": "Âm dương tuần hoàn, kích hoạt luân xa tăng 6% sát thương công kích cơ bản và 45 điểm Phá Phòng.",
    "elements": [
      "Tho",
      "Tho",
      "Tho",
      "?",
      "?"
    ],
    "tags": [
      "Thông Dụng",
      "Giảm ST",
      "Tăng Sát Thương"
    ],
    "imageUrl": "/images/kungfu/nhat_nguyet_luong_nghi_tho.png",
    "score": 3029,
    "level": 25
  },
  {
    "id": "ik-nhatnguyet-kim",
    "name": "Nhật Nguyệt Lưỡng Nghi (Kim)",
    "primaryElement": "Kim",
    "tier": "Thần Thoại",
    "description": "Nhật nguyệt hoàng kim rực sáng, hỗ trợ xuyên thấu hộ giáp và tăng sát thương chí mạng.",
    "elements": [
      "Kim",
      "Kim",
      "Kim",
      "?",
      "?"
    ],
    "tags": [
      "Thông Dụng",
      "Giảm ST",
      "Tăng Sát Thương"
    ],
    "imageUrl": "/images/kungfu/nhat_nguyet_luong_nghi_kim.png",
    "score": 3029,
    "level": 25
  },
  {
    "id": "ik-conngo-kim",
    "name": "Côn Ngô Đoạn Ngọc (Kim)",
    "primaryElement": "Kim",
    "tier": "Thần Thoại",
    "description": "Kiếm khí hoàng kim sắc lẹm, đòn đánh xuyên thấu 12% hộ giáp mục tiêu.",
    "elements": [
      "Kim",
      "Kim",
      "Kim",
      "?",
      "?"
    ],
    "tags": [
      "Phó Bản",
      "Tăng Sát Thương"
    ],
    "imageUrl": "/images/kungfu/con_ngo_doan_ngoc_kim.png",
    "score": 3029,
    "level": 25
  },
  {
    "id": "ik-conngo-hoa",
    "name": "Côn Ngô Đoạn Ngọc (Hỏa)",
    "primaryElement": "Hoa",
    "tier": "Thần Thoại",
    "description": "Tuyệt đỉnh Hỏa thần, khi bạo kích gây hiệu ứng Cháy Bỏng rút 1.5% HP mỗi giây và tăng 18% ST chí mạng.",
    "elements": [
      "Hoa",
      "Hoa",
      "Hoa",
      "?",
      "?"
    ],
    "tags": [
      "Phó Bản",
      "Tăng Sát Thương"
    ],
    "imageUrl": "/images/kungfu/con_ngo_doan_ngoc_hoa.png",
    "score": 3029,
    "level": 25
  },
  {
    "id": "ik-dangkiem-kim",
    "name": "Đãng Kiếm Dương Ba (Kim)",
    "primaryElement": "Kim",
    "tier": "Thần Thoại",
    "description": "Kiếm khí hoàng kim sắc lẹm, đòn đánh chắc chắn gây bạo kích và phá vỡ phòng ngự đối thủ.",
    "elements": [
      "Kim",
      "Kim",
      "Kim",
      "?",
      "?"
    ],
    "tags": [
      "Thi Đấu",
      "Chắc Chắn Chí Mạng"
    ],
    "imageUrl": "/images/kungfu/dang_kiem_duong_ba_kim.png",
    "score": 3029,
    "level": 25
  },
  {
    "id": "ik-dangkiem-hoa",
    "name": "Đãng Kiếm Dương Ba (Hỏa)",
    "primaryElement": "Hoa",
    "tier": "Thần Thoại",
    "description": "Mỗi lần tung kỹ năng tích tụ 1 tầng Kiếm Sóng, đạt 3 tầng bùng nổ sát thương diện rộng và bạo kích.",
    "elements": [
      "Hoa",
      "Hoa",
      "Hoa",
      "?",
      "?"
    ],
    "tags": [
      "Thi Đấu",
      "Chắc Chắn Chí Mạng"
    ],
    "imageUrl": "/images/kungfu/dang_kiem_duong_ba_hoa.png",
    "score": 3029,
    "level": 25
  },
  {
    "id": "ik-tuyetdien-kim",
    "name": "Tuyệt Điện Phi Quang (Kim)",
    "primaryElement": "Kim",
    "tier": "Thần Thoại",
    "description": "Đòn đánh xẹt tia sét đánh ngẫu nhiên 3 mục tiêu xung quanh, tăng 15% tốc chạy và khống chế nhẹ.",
    "elements": [
      "Kim",
      "Kim",
      "Kim",
      "?",
      "?"
    ],
    "tags": [
      "Phó Bản",
      "Khống Chế",
      "Sát Thương",
      "Trị Liệu"
    ],
    "imageUrl": "/images/kungfu/tuyet_dien_phi_quang_kim.png",
    "score": 3029,
    "level": 25
  },
  {
    "id": "ik-tuyetdien-moc",
    "name": "Tuyệt Điện Phi Quang (Mộc)",
    "primaryElement": "Moc",
    "tier": "Thần Thoại",
    "description": "Sấm sét mộc linh, gia tăng tỉ lệ hồi năng lượng khi đánh trúng kẻ địch.",
    "elements": [
      "Moc",
      "Moc",
      "Moc",
      "?",
      "?"
    ],
    "tags": [
      "Phó Bản",
      "Khống Chế",
      "Sát Thương",
      "Trị Liệu"
    ],
    "imageUrl": "/images/kungfu/tuyet_dien_phi_quang_moc.png",
    "score": 3029,
    "level": 25
  },
  {
    "id": "ik-phunguong-kim",
    "name": "Phủ Ngưỡng Thái Hư (Kim)",
    "primaryElement": "Kim",
    "tier": "Thần Thoại",
    "description": "La bàn thời hư hoàng kim, giảm sát thương và khắc chế khống chế tuyệt đỉnh.",
    "elements": [
      "Kim",
      "Kim",
      "Kim",
      "?",
      "?"
    ],
    "tags": [
      "Thi Đấu",
      "Giảm ST",
      "Khắc Chế Khống Chế"
    ],
    "imageUrl": "/images/kungfu/phu_nguong_thai_hu_kim.png",
    "score": 3029,
    "level": 25
  },
  {
    "id": "ik-phunguong-moc",
    "name": "Phủ Ngưỡng Thái Hư (Mộc)",
    "primaryElement": "Moc",
    "tier": "Thần Thoại",
    "description": "Kính thiên văn ngọc bích, hồi phục khí huyết và giải trừ khống chế nhanh chóng.",
    "elements": [
      "Moc",
      "Moc",
      "Moc",
      "?",
      "?"
    ],
    "tags": [
      "Thi Đấu",
      "Giảm ST",
      "Khắc Chế Khống Chế"
    ],
    "imageUrl": "/images/kungfu/phu_nguong_thai_hu_moc.png",
    "score": 3029,
    "level": 25
  },
  {
    "id": "ik-batdong-moc",
    "name": "Bất Động Minh Vương (Mộc)",
    "primaryElement": "Moc",
    "tier": "Thần Thoại",
    "description": "Bia đá ngọc bích phong ấn, giảm sát thương và khắc chế hiệu ứng khống chế của kẻ địch.",
    "elements": [
      "Moc",
      "Moc",
      "Moc",
      "?",
      "?"
    ],
    "tags": [
      "Thi Đấu",
      "Khắc Chế Khống Chế"
    ],
    "imageUrl": "/images/kungfu/bat_dong_minh_vuong_moc.png",
    "score": 3029,
    "level": 25
  },
  {
    "id": "ik-batdong-thuy",
    "name": "Bất Động Minh Vương (Thủy)",
    "primaryElement": "Thuy",
    "tier": "Thần Thoại",
    "description": "Bia đá hàn băng bất hoại, khắc chế khống chế và giảm thiểu sát thương nhận vào.",
    "elements": [
      "Thuy",
      "Thuy",
      "Thuy",
      "?",
      "?"
    ],
    "tags": [
      "Thi Đấu",
      "Khắc Chế Khống Chế"
    ],
    "imageUrl": "/images/kungfu/bat_dong_minh_vuong_thuy.png",
    "score": 3029,
    "level": 25
  },
  {
    "id": "ik-vanhoa-thuy",
    "name": "Vạn Hóa Minh Hợp (Thủy)",
    "primaryElement": "Thuy",
    "tier": "Thần Thoại",
    "description": "Song ngư luân chuyển hàn thủy, trị liệu lượng lớn sinh lực và hồi sinh kinh mạch.",
    "elements": [
      "Thuy",
      "Thuy",
      "Thuy",
      "?",
      "?"
    ],
    "tags": [
      "Thi Đấu",
      "Trị Liệu",
      "Hồi Sinh"
    ],
    "imageUrl": "/images/kungfu/van_hoa_minh_hop_thuy.png",
    "score": 3029,
    "level": 25
  },
  {
    "id": "ik-vanhoa-tho",
    "name": "Vạn Hóa Minh Hợp (Thổ)",
    "primaryElement": "Tho",
    "tier": "Thần Thoại",
    "description": "Càn khôn vạn hóa quy thổ, bảo hộ sinh mệnh trị liệu và hỗ trợ hồi sinh.",
    "elements": [
      "Tho",
      "Tho",
      "Tho",
      "?",
      "?"
    ],
    "tags": [
      "Thi Đấu",
      "Trị Liệu",
      "Hồi Sinh"
    ],
    "imageUrl": "/images/kungfu/van_hoa_minh_hop_tho.png",
    "score": 3029,
    "level": 25
  },
  {
    "id": "ik-toa-phong",
    "name": "Tỏa Phong",
    "primaryElement": "Hoa",
    "tier": "Hoàng Kim",
    "description": "Kỹ năng tăng 12% sát thương chí mạng khi tấn công mục tiêu từ phía sau.",
    "elements": [
      "Kim",
      "Hoa",
      "Hoa",
      "Hoa",
      "Hoa"
    ],
    "tags": [
      "Thông Dụng",
      "Sát Thương"
    ],
    "imageUrl": "/images/kungfu/toa_phong.png",
    "score": 2850,
    "level": 25
  },
  {
    "id": "ik-pha-phu",
    "name": "Phá Phủ",
    "primaryElement": "Kim",
    "tier": "Hoàng Kim",
    "description": "Gia tăng 6% sát thương công kích cơ bản, khi tấn công bạo kích có tỉ lệ gây thêm nội thương.",
    "elements": [
      "Kim",
      "Kim",
      "Kim",
      "Kim",
      "?"
    ],
    "tags": [
      "Thông Dụng",
      "Tăng Sát Thương"
    ],
    "imageUrl": "/images/kungfu/pha_phu.png",
    "score": 2850,
    "level": 25
  },
  {
    "id": "ik-xung-hu",
    "name": "Xung Hư",
    "primaryElement": "Kim",
    "tier": "Hoàng Kim",
    "description": "Kỹ năng đơn mục tiêu gia tăng 14% sát thương, ngắt chiêu mục tiêu nếu đang niệm.",
    "elements": [
      "Kim",
      "Kim",
      "Moc",
      "Moc",
      "?"
    ],
    "tags": [
      "Thông Dụng",
      "Tăng Sát Thương"
    ],
    "imageUrl": "/images/kungfu/xung_hu.png",
    "score": 2800,
    "level": 25
  },
  {
    "id": "ik-doan-kim-qua",
    "name": "Đoạn Kim Qua",
    "primaryElement": "Kim",
    "tier": "Hoàng Kim",
    "description": "Kỹ năng trảm kích bạo liệt, tăng 10% sát thương bạo kích và 50 điểm Phá Phòng.",
    "elements": [
      "Kim",
      "Kim",
      "Kim",
      "Kim",
      "Hoa"
    ],
    "tags": [
      "Thông Dụng",
      "Tăng Sát Thương"
    ],
    "imageUrl": "/images/kungfu/doan_kim_qua.png",
    "score": 2850,
    "level": 25
  },
  {
    "id": "ik-pha-trong-van",
    "name": "Phá Trọng Vân",
    "primaryElement": "Moc",
    "tier": "Hoàng Kim",
    "description": "Xuyên thấu lớp mây dày, tăng sát thương lên quái và thủ lĩnh trong phó bản thêm 10%.",
    "elements": [
      "Moc",
      "Moc",
      "Moc",
      "Moc",
      "?"
    ],
    "tags": [
      "Phó Bản",
      "Tăng Sát Thương",
      "Sát Thương"
    ],
    "imageUrl": "/images/kungfu/pha_trong_van.png",
    "score": 2900,
    "level": 25
  },
  {
    "id": "ik-minh-can-qua",
    "name": "Minh Can Qua",
    "primaryElement": "Kim",
    "tier": "Hoàng Kim",
    "description": "Kiếm khí hoàng kim, tăng mạnh sát thương trong phó bản và hỗ trợ đồng đội kết liễu quái.",
    "elements": [
      "Kim",
      "Kim",
      "Kim",
      "Kim",
      "?"
    ],
    "tags": [
      "Phó Bản",
      "Tăng Sát Thương"
    ],
    "imageUrl": "/images/kungfu/minh_can_qua.png",
    "score": 2900,
    "level": 25
  },
  {
    "id": "ik-thong-huyen",
    "name": "Thông Huyền",
    "primaryElement": "Moc",
    "tier": "Hoàng Kim",
    "description": "Hóa giải trọc khí, tăng tốc hồi phục chân khí và tăng 8% sát thương toàn diện.",
    "elements": [
      "Moc",
      "Moc",
      "Moc",
      "Moc",
      "?"
    ],
    "tags": [
      "Thông Dụng",
      "Tăng Sát Thương"
    ],
    "imageUrl": "/images/kungfu/thong_huyen.png",
    "score": 2850,
    "level": 25
  },
  {
    "id": "ik-chung-dieu",
    "name": "Chúng Diệu",
    "primaryElement": "Hoa",
    "tier": "Hoàng Kim",
    "description": "Kích phát pháp thuật vạn cổ, tăng mạnh sát thương diện rộng và thiêu đốt mục tiêu.",
    "elements": [
      "Hoa",
      "Hoa",
      "Hoa",
      "Hoa",
      "?"
    ],
    "tags": [
      "Phó Bản",
      "Tăng Sát Thương",
      "Sát Thương"
    ],
    "imageUrl": "/images/kungfu/chung_dieu.png",
    "score": 2880,
    "level": 25
  },
  {
    "id": "ik-ham-kim-khuyet",
    "name": "Hám Kim Khuyết",
    "primaryElement": "Kim",
    "tier": "Hoàng Kim",
    "description": "Cung thần hoàng kim làm rung chuyển cửa ải, tăng 10% sát thương bạo kích tầm xa trong phó bản.",
    "elements": [
      "Kim",
      "Kim",
      "Kim",
      "Kim",
      "?"
    ],
    "tags": [
      "Phó Bản",
      "Tăng Sát Thương"
    ],
    "imageUrl": "/images/kungfu/ham_kim_khuyet.png",
    "score": 2900,
    "level": 25
  },
  {
    "id": "ik-sam-la-tran",
    "name": "Sâm La Trận",
    "primaryElement": "Moc",
    "tier": "Hoàng Kim",
    "description": "Trận pháp rừng sâu, trị liệu liên tục và gây hiệu ứng trói chân kẻ địch xâm nhập.",
    "elements": [
      "Moc",
      "Moc",
      "Moc",
      "Moc",
      "Thuy"
    ],
    "tags": [
      "Thông Dụng",
      "Sát Thương",
      "Trị Liệu"
    ],
    "imageUrl": "/images/kungfu/sam_la_tran.png",
    "score": 2850,
    "level": 25
  },
  {
    "id": "ik-khuoc-ta",
    "name": "Khước Tà",
    "primaryElement": "Thuy",
    "tier": "Hoàng Kim",
    "description": "Giải trừ hiệu ứng tiêu cực trên bản thân khi nhận sát thương chí mạng.",
    "elements": [
      "Thuy",
      "Thuy",
      "Thuy",
      "Thuy",
      "?"
    ],
    "tags": [
      "Thi Đấu",
      "Giải Trừ"
    ],
    "imageUrl": "/images/kungfu/khuoc_ta.png",
    "score": 2850,
    "level": 25
  },
  {
    "id": "ik-thuy-huu",
    "name": "Thùy Hựu",
    "primaryElement": "Thuy",
    "tier": "Hoàng Kim",
    "description": "Lắc xúc xắc may mắn, ngẫu nhiên tăng sát thương, hồi máu hoặc giảm thương nhận vào.",
    "elements": [
      "Thuy",
      "Thuy",
      "Hoa",
      "Hoa",
      "?"
    ],
    "tags": [
      "Thông Dụng",
      "Giảm ST",
      "Tăng Sát Thương",
      "Trị Liệu"
    ],
    "imageUrl": "/images/kungfu/thuy_huu.png",
    "score": 2850,
    "level": 25
  },
  {
    "id": "ik-dap-hong",
    "name": "Đạp Hồng",
    "primaryElement": "Moc",
    "tier": "Hoàng Kim",
    "description": "Lướt trên cành hoa, tăng mạnh tốc độ di chuyển và miễn nhiễm làm chậm.",
    "elements": [
      "Moc",
      "Moc",
      "Moc",
      "Moc",
      "Hoa"
    ],
    "tags": [
      "Sát Thương",
      "Dịch Chuyển Linh Hoạt"
    ],
    "imageUrl": "/images/kungfu/dap_hong.png",
    "score": 2850,
    "level": 25
  },
  {
    "id": "ik-linh-te",
    "name": "Linh Tê",
    "primaryElement": "Thuy",
    "tier": "Hoàng Kim",
    "description": "Tâm hữu linh tê, tăng cường thuộc tính cho bản thân và đồng minh xung quanh.",
    "elements": [
      "Kim",
      "Kim",
      "Thuy",
      "Thuy",
      "Thuy"
    ],
    "tags": [
      "Thông Dụng",
      "Tăng Cường Đội Nhóm"
    ],
    "imageUrl": "/images/kungfu/linh_te.png",
    "score": 2850,
    "level": 25
  },
  {
    "id": "ik-chiet-nhue",
    "name": "Chiết Nhuệ",
    "primaryElement": "Hoa",
    "tier": "Hoàng Kim",
    "description": "Tấn công dồn dập tích tầng nhuệ khí, đạt 5 tầng gây sát thương bộc phá cực lớn.",
    "elements": [
      "Hoa",
      "Hoa",
      "Hoa",
      "Hoa",
      "?"
    ],
    "tags": [
      "Thông Dụng",
      "Cộng Dồn Tầng",
      "Tăng Sát Thương"
    ],
    "imageUrl": "/images/kungfu/chiet_nhue.png",
    "score": 2850,
    "level": 25
  },
  {
    "id": "ik-binh-chuc-du",
    "name": "Bỉnh Chúc Du",
    "primaryElement": "Tho",
    "tier": "Hoàng Kim",
    "description": "Cầm đuốc dạo chơi đêm, tăng phòng thủ kiên cố và phản đòn hỏa diễm.",
    "elements": [
      "Hoa",
      "Tho",
      "Tho",
      "Tho",
      "Tho"
    ],
    "tags": [
      "Thông Dụng",
      "Phòng Thủ",
      "Sát Thương"
    ],
    "imageUrl": "/images/kungfu/binh_chuc_du.png",
    "score": 2850,
    "level": 25
  },
  {
    "id": "ik-thai-tuc-lenh",
    "name": "Thái Tức Lệnh",
    "primaryElement": "Kim",
    "tier": "Hoàng Kim",
    "description": "Dây xích khóa trói mục tiêu, kéo dài thời gian khống chế và tăng sát thương.",
    "elements": [
      "Kim",
      "Kim",
      "Kim",
      "Kim",
      "Moc"
    ],
    "tags": [
      "Tăng Sát Thương",
      "Khống Chế"
    ],
    "imageUrl": "/images/kungfu/thai_tuc_lenh.png",
    "score": 2850,
    "level": 25
  },
  {
    "id": "ik-quy-nguyen",
    "name": "Quy Nguyên",
    "primaryElement": "Thuy",
    "tier": "Hoàng Kim",
    "description": "Vạn vật quy nguyên, liên tục hồi phục sinh lực và giải trừ hiệu ứng suy yếu.",
    "elements": [
      "Thuy",
      "Thuy",
      "Thuy",
      "Thuy",
      "?"
    ],
    "tags": [
      "Thông Dụng",
      "Trị Liệu"
    ],
    "imageUrl": "/images/kungfu/quy_nguyen.png",
    "score": 2850,
    "level": 25
  },
  {
    "id": "ik-lien-tinh-truy",
    "name": "Liên Tinh Trụy",
    "primaryElement": "Hoa",
    "tier": "Hoàng Kim",
    "description": "Sao băng liên hoàn giáng xuống, gây sát thương thiêu đốt và trọng thương mục tiêu.",
    "elements": [
      "Hoa",
      "Hoa",
      "Hoa",
      "Hoa",
      "?"
    ],
    "tags": [
      "Sát Thương",
      "Cộng Dồn Tầng",
      "Trọng Thương"
    ],
    "imageUrl": "/images/kungfu/lien_tinh_truy.png",
    "score": 2850,
    "level": 25
  },
  {
    "id": "ik-chinh-bao",
    "name": "Chinh Bào",
    "primaryElement": "Tho",
    "tier": "Hoàng Kim",
    "description": "Áo giáp chinh chiến, tạo khiên chắn hấp thụ sát thương khi lượng máu xuống thấp.",
    "elements": [
      "Tho",
      "Tho",
      "Tho",
      "Tho",
      "?"
    ],
    "tags": [
      "Thông Dụng",
      "Phòng Thủ",
      "Khiên"
    ],
    "imageUrl": "/images/kungfu/chinh_bao.png",
    "score": 2850,
    "level": 25
  },
  {
    "id": "ik-hoa-dich",
    "name": "Hóa Địch",
    "primaryElement": "Tho",
    "tier": "Hoàng Kim",
    "description": "Lấy nhu thắng cương, giảm mạnh sát thương gánh chịu từ các đòn đánh đơn mục tiêu.",
    "elements": [
      "Tho",
      "Tho",
      "Tho",
      "Tho",
      "?"
    ],
    "tags": [
      "Thông Dụng",
      "Phòng Thủ",
      "Giảm ST"
    ],
    "imageUrl": "/images/kungfu/hoa_dich.png",
    "score": 2850,
    "level": 25
  },
  {
    "id": "ik-thuc-hon",
    "name": "Thúc Hồn",
    "primaryElement": "Hoa",
    "tier": "Hoàng Kim",
    "description": "Lồng đèn giam giữ linh hồn địch, thi triển đòn đánh bạo liệt trong đấu trường.",
    "elements": [
      "Hoa",
      "Hoa",
      "Hoa",
      "Hoa",
      "Tho"
    ],
    "tags": [
      "Thi Đấu",
      "Tăng Sát Thương"
    ],
    "imageUrl": "/images/kungfu/thuc_hon.png",
    "score": 2850,
    "level": 25
  },
  {
    "id": "ik-phuoc-nhan",
    "name": "Phược Nhẫn",
    "primaryElement": "Moc",
    "tier": "Hoàng Kim",
    "description": "Xích kiếm trói chặt, làm chậm và cấm nhảy đối thủ trong giao tranh lôi đài.",
    "elements": [
      "Moc",
      "Moc",
      "Moc",
      "Moc",
      "Tho"
    ],
    "tags": [
      "Thi Đấu",
      "Khống Chế"
    ],
    "imageUrl": "/images/kungfu/phuoc_nhan.png",
    "score": 2850,
    "level": 25
  },
  {
    "id": "ik-thu-thien-chung",
    "name": "Thù Thiên Chung",
    "primaryElement": "Thuy",
    "tier": "Hoàng Kim",
    "description": "Chuông cổ bảo hộ, kháng toàn bộ hiệu ứng khống chế cứng trong 3s.",
    "elements": [
      "Thuy",
      "Thuy",
      "Thuy",
      "Tho",
      "Tho"
    ],
    "tags": [
      "Thi Đấu",
      "Khắc Chế Khống Chế",
      "Phòng Thủ"
    ],
    "imageUrl": "/images/kungfu/thu_thien_chung.png",
    "score": 2850,
    "level": 25
  },
  {
    "id": "ik-tan-duong-dan",
    "name": "Tàn Dương Dẫn",
    "primaryElement": "Kim",
    "tier": "Hoàng Kim",
    "description": "Ánh dương tàn chiếu rọi, gia tăng lượng hồi phục và công kích chí mạng.",
    "elements": [
      "Kim",
      "Kim",
      "Kim",
      "Kim",
      "?"
    ],
    "tags": [
      "Thi Đấu",
      "Trị Liệu",
      "Tăng Sát Thương"
    ],
    "imageUrl": "/images/kungfu/tan_duong_dan.png",
    "score": 2850,
    "level": 25
  },
  {
    "id": "ik-chi-thuy-quyet",
    "name": "Chỉ Thủy Quyết",
    "primaryElement": "Tho",
    "tier": "Hoàng Kim",
    "description": "Mặt nước tĩnh lặng, giảm sát thương gánh chịu và phản phệ đòn đánh của địch.",
    "elements": [
      "Thuy",
      "Tho",
      "Tho",
      "Tho",
      "Tho"
    ],
    "tags": [
      "Thông Dụng",
      "Phòng Thủ",
      "Giảm ST"
    ],
    "imageUrl": "/images/kungfu/chi_thuy_quyet.png",
    "score": 2850,
    "level": 25
  },
  {
    "id": "ik-moc-xuan-phong",
    "name": "Mộc Xuân Phong",
    "primaryElement": "Thuy",
    "tier": "Hoàng Kim",
    "description": "Gió xuân mơn man, hồi phục sinh lực định kỳ cho bản thân và đồng đội gần kề.",
    "elements": [
      "Moc",
      "Thuy",
      "Thuy",
      "Thuy",
      "Thuy"
    ],
    "tags": [
      "Thông Dụng",
      "Trị Liệu"
    ],
    "imageUrl": "/images/kungfu/moc_xuan_phong.png",
    "score": 2850,
    "level": 25
  },
  {
    "id": "ik-linh-lung-dau",
    "name": "Linh Lung Đẩu",
    "primaryElement": "Kim",
    "tier": "Hoàng Kim",
    "description": "Xúc xắc thất thải lung linh, kích hoạt ngẫu nhiên luân chuyển ngũ hành công kích.",
    "elements": [
      "Kim",
      "Moc",
      "Thuy",
      "Hoa",
      "Tho"
    ],
    "tags": [
      "Thông Dụng",
      "Sát Thương"
    ],
    "imageUrl": "/images/kungfu/linh_lung_dau.png",
    "score": 2850,
    "level": 25
  },
  {
    "id": "ik-so-cuong-ca",
    "name": "Sở Cuồng Ca",
    "primaryElement": "Hoa",
    "tier": "Hoàng Kim",
    "description": "Tiếng đàn cuồng dại trong lửa đỏ, tăng bạo kích và sát thương diện rộng khi thi đấu.",
    "elements": [
      "Hoa",
      "Hoa",
      "Hoa",
      "Hoa",
      "?"
    ],
    "tags": [
      "Thi Đấu",
      "Tăng Sát Thương"
    ],
    "imageUrl": "/images/kungfu/so_cuong_ca.png",
    "score": 2850,
    "level": 25
  },
  {
    "id": "ik-kich-tiet-than",
    "name": "Kích Tiết Thán",
    "primaryElement": "Tho",
    "tier": "Hoàng Kim",
    "description": "Gõ nhịp than thở, tăng sinh lực tối đa và lượng trị liệu nhận vào trong đấu trường.",
    "elements": [
      "Kim",
      "Tho",
      "Tho",
      "Tho",
      "Tho"
    ],
    "tags": [
      "Thi Đấu",
      "Trị Liệu",
      "Tăng Sát Thương"
    ],
    "imageUrl": "/images/kungfu/kich_tiet_than.png",
    "score": 2850,
    "level": 25
  },
  {
    "id": "ik-ngu-van-dao-kim",
    "name": "Ngũ Vận Dao (Kim)",
    "primaryElement": "Kim",
    "tier": "Hoàng Kim",
    "description": "Ngũ vận điều hòa, thuần khiết 6 node Kim nguyên tố giúp kích hoạt Chu Thiên Kim tối đa.",
    "elements": [
      "Kim",
      "Kim",
      "Kim",
      "Kim",
      "Kim",
      "Kim"
    ],
    "tags": [
      "Thông Dụng"
    ],
    "imageUrl": "/images/kungfu/ngu_van_dao_kim.png",
    "score": 2800,
    "level": 25
  },
  {
    "id": "ik-ngu-van-dao-moc",
    "name": "Ngũ Vận Dao (Mộc)",
    "primaryElement": "Moc",
    "tier": "Hoàng Kim",
    "description": "Ngũ vận điều hòa, thuần khiết 6 node Mộc nguyên tố giúp kích hoạt Chu Thiên Mộc tối đa.",
    "elements": [
      "Moc",
      "Moc",
      "Moc",
      "Moc",
      "Moc",
      "Moc"
    ],
    "tags": [
      "Thông Dụng"
    ],
    "imageUrl": "/images/kungfu/ngu_van_dao_moc.png",
    "score": 2800,
    "level": 25
  },
  {
    "id": "ik-ngu-van-dao-thuy",
    "name": "Ngũ Vận Dao (Thủy)",
    "primaryElement": "Thuy",
    "tier": "Hoàng Kim",
    "description": "Ngũ vận điều hòa, thuần khiết 6 node Thủy nguyên tố giúp kích hoạt Chu Thiên Thủy tối đa.",
    "elements": [
      "Thuy",
      "Thuy",
      "Thuy",
      "Thuy",
      "Thuy",
      "Thuy"
    ],
    "tags": [
      "Thông Dụng"
    ],
    "imageUrl": "/images/kungfu/ngu_van_dao_thuy.png",
    "score": 2800,
    "level": 25
  },
  {
    "id": "ik-ngu-van-dao-hoa",
    "name": "Ngũ Vận Dao (Hỏa)",
    "primaryElement": "Hoa",
    "tier": "Hoàng Kim",
    "description": "Ngũ vận điều hòa, thuần khiết 6 node Hỏa nguyên tố giúp kích hoạt Chu Thiên Hỏa tối đa.",
    "elements": [
      "Hoa",
      "Hoa",
      "Hoa",
      "Hoa",
      "Hoa",
      "Hoa"
    ],
    "tags": [
      "Thông Dụng"
    ],
    "imageUrl": "/images/kungfu/ngu_van_dao_hoa.png",
    "score": 2800,
    "level": 25
  },
  {
    "id": "ik-ngu-van-dao-tho",
    "name": "Ngũ Vận Dao (Thổ)",
    "primaryElement": "Tho",
    "tier": "Hoàng Kim",
    "description": "Ngũ vận điều hòa, thuần khiết 6 node Thổ nguyên tố giúp kích hoạt Chu Thiên Thổ tối đa.",
    "elements": [
      "Tho",
      "Tho",
      "Tho",
      "Tho",
      "Tho",
      "Tho"
    ],
    "tags": [
      "Thông Dụng"
    ],
    "imageUrl": "/images/kungfu/ngu_van_dao_tho.png",
    "score": 2800,
    "level": 25
  },
  {
    "id": "ik-am-kich",
    "name": "Ám Kích",
    "primaryElement": "Kim",
    "tier": "Hoàng Kim",
    "description": "Đột kích từ bóng tối, tăng mạnh sát thương đòn đánh đầu tiên sau khi ẩn thân hoặc lướt.",
    "elements": [
      "Kim",
      "Kim",
      "Kim",
      "Kim",
      "?"
    ],
    "tags": [
      "Thông Dụng",
      "Tăng Sát Thương"
    ],
    "imageUrl": "/images/kungfu/am_kich.png",
    "score": 2850,
    "level": 25
  },
  {
    "id": "ik-chu-vu",
    "name": "Chú Vũ",
    "primaryElement": "Moc",
    "tier": "Hoàng Kim",
    "description": "Điệu múa búp sen, tăng độ cơ động dịch chuyển và né tránh trong combat hỗn loạn.",
    "elements": [
      "Moc",
      "Moc",
      "Moc",
      "Moc",
      "?"
    ],
    "tags": [
      "Thông Dụng",
      "Dịch Chuyển Linh Hoạt"
    ],
    "imageUrl": "/images/kungfu/chu_vu.png",
    "score": 2850,
    "level": 25
  },
  {
    "id": "ik-hong-anh",
    "name": "Hồng Ảnh",
    "primaryElement": "Moc",
    "tier": "Hoàng Kim",
    "description": "Bóng hồng thoăn thoắt, tăng tốc độ di chuyển và sát thương khi thi triển kỹ năng cơ động.",
    "elements": [
      "Kim",
      "Moc",
      "Moc",
      "Moc",
      "Moc"
    ],
    "tags": [
      "Tăng Sát Thương",
      "Dịch Chuyển Linh Hoạt"
    ],
    "imageUrl": "/images/kungfu/hong_anh.png",
    "score": 2850,
    "level": 25
  },
  {
    "id": "ik-thuong-lang-hanh",
    "name": "Thương Lãng Hành",
    "primaryElement": "Moc",
    "tier": "Hoàng Kim",
    "description": "Đạp sóng mà đi, dịch chuyển linh hoạt và tăng khả năng sinh tồn khi bị vây bắt.",
    "elements": [
      "Moc",
      "Moc",
      "Moc",
      "Moc",
      "?"
    ],
    "tags": [
      "Tăng Sát Thương",
      "Dịch Chuyển Linh Hoạt"
    ],
    "imageUrl": "/images/kungfu/thuong_lang_hanh.png",
    "score": 2850,
    "level": 25
  },
  {
    "id": "ik-diet-tran",
    "name": "Diệt Trận",
    "primaryElement": "Hoa",
    "tier": "Hoàng Kim",
    "description": "Song kiếm trảm trận, tăng 15% sát thương khi tấn công mục tiêu trong trạng thái phòng thủ.",
    "elements": [
      "Kim",
      "Kim",
      "Hoa",
      "Hoa",
      "?"
    ],
    "tags": [
      "Thông Dụng",
      "Tăng Sát Thương"
    ],
    "imageUrl": "/images/kungfu/diet_tran.png",
    "score": 2850,
    "level": 25
  },
  {
    "id": "ik-tram-tinh",
    "name": "Trảm Tinh",
    "primaryElement": "Hoa",
    "tier": "Hoàng Kim",
    "description": "Chém đứt tinh tú, đòn đánh bộc hỏa gây sát thương bạo liệt lên mục tiêu.",
    "elements": [
      "Hoa",
      "Hoa",
      "Tho",
      "Tho",
      "?"
    ],
    "tags": [
      "Thông Dụng",
      "Sát Thương"
    ],
    "imageUrl": "/images/kungfu/tram_tinh.png",
    "score": 2850,
    "level": 25
  },
  {
    "id": "ik-kich-suy",
    "name": "Kích Suy",
    "primaryElement": "Tho",
    "tier": "Hoàng Kim",
    "description": "Tấn công điểm yếu, khiến kẻ địch rơi vào trạng thái suy nhược giảm hồi phục.",
    "elements": [
      "Kim",
      "Kim",
      "Tho",
      "Tho",
      "?"
    ],
    "tags": [
      "Thông Dụng",
      "Sát Thương"
    ],
    "imageUrl": "/images/kungfu/kich_suy.png",
    "score": 2850,
    "level": 25
  },
  {
    "id": "ik-tu-bon-loi",
    "name": "Tụ Bôn Lôi",
    "primaryElement": "Thuy",
    "tier": "Hoàng Kim",
    "description": "Tụ hội sấm sét sấm lôi, gia tăng tốc độ xuất chiêu và sát thương thi đấu lôi đài.",
    "elements": [
      "Kim",
      "Thuy",
      "Thuy",
      "Thuy",
      "Thuy"
    ],
    "tags": [
      "Thi Đấu",
      "Tăng Sát Thương"
    ],
    "imageUrl": "/images/kungfu/tu_bon_loi.png",
    "score": 2850,
    "level": 25
  },
  {
    "id": "ik-the-dang-van",
    "name": "Thế Đằng Vân",
    "primaryElement": "Moc",
    "tier": "Hoàng Kim",
    "description": "Thế như mây cuộn, liên tiếp thi triển chiêu thức mà không bị gián đoạn.",
    "elements": [
      "Moc",
      "Moc",
      "Moc",
      "Hoa",
      "Hoa"
    ],
    "tags": [
      "Thông Dụng",
      "Sát Thương"
    ],
    "imageUrl": "/images/kungfu/the_dang_van.png",
    "score": 2850,
    "level": 25
  },
  {
    "id": "ik-tan-kim-nguyen",
    "name": "Tán Kim Nguyên",
    "primaryElement": "Kim",
    "tier": "Hoàng Kim",
    "description": "Kim nguyên tan vỡ, khống chế cứng và làm choáng kẻ địch trong phạm vi gần.",
    "elements": [
      "Kim",
      "Kim",
      "Kim",
      "Kim",
      "Tho"
    ],
    "tags": [
      "Thi Đấu",
      "Khống Chế",
      "Sát Thương"
    ],
    "imageUrl": "/images/kungfu/tan_kim_nguyen.png",
    "score": 2850,
    "level": 25
  },
  {
    "id": "ik-liet-khon-du",
    "name": "Liệt Khôn Dư",
    "primaryElement": "Tho",
    "tier": "Hoàng Kim",
    "description": "Mặt đất nứt toác, tăng mạnh sát thương đòn đánh lên mục tiêu đang bị khống chế.",
    "elements": [
      "Moc",
      "Tho",
      "Tho",
      "Tho",
      "Tho"
    ],
    "tags": [
      "Thi Đấu",
      "Tăng Sát Thương"
    ],
    "imageUrl": "/images/kungfu/liet_khon_du.png",
    "score": 2850,
    "level": 25
  },
  {
    "id": "ik-diem-minh-lo",
    "name": "Điểm Minh Lô",
    "primaryElement": "Hoa",
    "tier": "Hoàng Kim",
    "description": "Đốt cháy lò lửa đan điền, gia tăng liên tục sát thương hỏa công kích.",
    "elements": [
      "Moc",
      "Hoa",
      "Hoa",
      "Hoa",
      "Hoa"
    ],
    "tags": [
      "Thông Dụng",
      "Tăng Sát Thương"
    ],
    "imageUrl": "/images/kungfu/diem_minh_lo.png",
    "score": 2850,
    "level": 25
  },
  {
    "id": "ik-nap-son-hai",
    "name": "Nạp Sơn Hải",
    "primaryElement": "Thuy",
    "tier": "Hoàng Kim",
    "description": "Thu nạp biển núi, giảm thiểu lượng sát thương gánh chịu trong lôi đài tỉ võ.",
    "elements": [
      "Thuy",
      "Thuy",
      "Thuy",
      "Tho",
      "Tho"
    ],
    "tags": [
      "Thi Đấu",
      "Giảm ST",
      "Phòng Thủ"
    ],
    "imageUrl": "/images/kungfu/nap_son_hai.png",
    "score": 2850,
    "level": 25
  },
  {
    "id": "ik-chung-van-trach",
    "name": "Chưng Vân Trạch",
    "primaryElement": "Thuy",
    "tier": "Hoàng Kim",
    "description": "Hơi nước bốc lên, khắc chế các hiệu ứng đóng băng, làm chậm và trói chân.",
    "elements": [
      "Moc",
      "Moc",
      "Thuy",
      "Thuy",
      "Thuy"
    ],
    "tags": [
      "Thi Đấu",
      "Khắc Chế Khống Chế"
    ],
    "imageUrl": "/images/kungfu/chung_van_trach.png",
    "score": 2850,
    "level": 25
  },
  {
    "id": "ik-phi-kien",
    "name": "Phi Kiên",
    "primaryElement": "Tho",
    "tier": "Hoàng Kim",
    "description": "Mũ giáp bền vững, giảm thiểu sát thương bộc kích từ boss phó bản.",
    "elements": [
      "Tho",
      "Tho",
      "Tho",
      "Tho",
      "?"
    ],
    "tags": [
      "Phó Bản",
      "Giảm ST",
      "Phòng Thủ"
    ],
    "imageUrl": "/images/kungfu/phi_kien.png",
    "score": 2850,
    "level": 25
  },
  {
    "id": "ik-tram-uyen",
    "name": "Trầm Uyên",
    "primaryElement": "Tho",
    "tier": "Hoàng Kim",
    "description": "Chìm sâu đáy vực, phòng thủ kiên cố giảm 15% sát thương nhận vào.",
    "elements": [
      "Tho",
      "Tho",
      "Tho",
      "Tho",
      "?"
    ],
    "tags": [
      "Thi Đấu",
      "Giảm ST",
      "Phòng Thủ"
    ],
    "imageUrl": "/images/kungfu/tram_uyen.png",
    "score": 2850,
    "level": 25
  },
  {
    "id": "ik-chuoc-sat",
    "name": "Chước Sát",
    "primaryElement": "Hoa",
    "tier": "Hoàng Kim",
    "description": "Lửa thiêu đốt rực cháy, gia tăng sát thương chí mạng trong các trận quyết đấu.",
    "elements": [
      "Hoa",
      "Hoa",
      "Hoa",
      "Hoa",
      "?"
    ],
    "tags": [
      "Thi Đấu",
      "Tăng Sát Thương"
    ],
    "imageUrl": "/images/kungfu/chuoc_sat.png",
    "score": 2850,
    "level": 25
  },
  {
    "id": "ik-trac-tuyet",
    "name": "Trạc Tuyết",
    "primaryElement": "Thuy",
    "tier": "Hoàng Kim",
    "description": "Rửa sạch bụi trần tuyết trắng, hồi phục lượng máu dồi dào khi trị liệu.",
    "elements": [
      "Thuy",
      "Thuy",
      "Thuy",
      "Thuy",
      "?"
    ],
    "tags": [
      "Thông Dụng",
      "Trị Liệu"
    ],
    "imageUrl": "/images/kungfu/trac_tuyet.png",
    "score": 2850,
    "level": 25
  },
  {
    "id": "ik-dinh-phong",
    "name": "Định Phong",
    "primaryElement": "Tho",
    "tier": "Hoàng Kim",
    "description": "Vững vàng như núi đá trước gió bão, tăng phòng thủ và giảm sát thương.",
    "elements": [
      "Tho",
      "Tho",
      "Tho",
      "Tho",
      "?"
    ],
    "tags": [
      "Thông Dụng",
      "Phòng Thủ",
      "Giảm ST"
    ],
    "imageUrl": "/images/kungfu/dinh_phong.png",
    "score": 2850,
    "level": 25
  },
  {
    "id": "ik-vong-kinh-xuyen",
    "name": "Vọng Kính Xuyên",
    "primaryElement": "Thuy",
    "tier": "Hoàng Kim",
    "description": "Thanh kiếm xuyên gương nước, tăng cả khả năng tấn công lẫn trị liệu trong phó bản.",
    "elements": [
      "Thuy",
      "Thuy",
      "Thuy",
      "Thuy",
      "?"
    ],
    "tags": [
      "Phó Bản",
      "Trị Liệu",
      "Tăng Sát Thương"
    ],
    "imageUrl": "/images/kungfu/vong_kinh_xuyen.png",
    "score": 2850,
    "level": 25
  },
  {
    "id": "ik-ngu-thien-son",
    "name": "Ngự Thiên Sơn",
    "primaryElement": "Tho",
    "tier": "Hoàng Kim",
    "description": "Ngự trị ngọn núi ngàn trượng, lá chắn kiên cố giảm sát thương toàn diện.",
    "elements": [
      "Tho",
      "Tho",
      "Tho",
      "Tho",
      "?"
    ],
    "tags": [
      "Thông Dụng",
      "Phòng Thủ",
      "Giảm ST"
    ],
    "imageUrl": "/images/kungfu/ngu_thien_son.png",
    "score": 2850,
    "level": 25
  },
  {
    "id": "ik-tam-phap-tu-tai",
    "name": "Tâm Pháp Tự Tại",
    "primaryElement": "Kim",
    "tier": "Hoàng Kim",
    "description": "Tâm không vướng bận, tự tại phiêu lưu, cân bằng hoàn hảo ngũ hành công thủ.",
    "elements": [
      "Kim",
      "Moc",
      "Thuy",
      "Hoa",
      "Tho"
    ],
    "tags": [
      "Thông Dụng",
      "Giảm ST",
      "Tăng Sát Thương",
      "Trị Liệu"
    ],
    "imageUrl": "/images/kungfu/tam_phap_tu_tai.png",
    "score": 2850,
    "level": 25
  }
];

export const DEFAULT_GEAR_SLOTS: Record<string, GearSlotItem> = {
  "Vũ Khí": {
    id: "g-vk",
    slot: "Vũ Khí",
    name: "Minh Diệp Hàn Đao",
    tier: "Thần Thoại Kim",
    level: 79,
    refine: 12,
    gearScore: 9450,
    mainStat: "+1,280 Ngoại Công / Phá Phòng +280",
    subStats: ["+55 Điểm Lực Đạo", "+4.2% Tỉ Lệ Hội Tâm", "+180 Khắc Chế Quái"]
  },
  "Áo": {
    id: "g-ao",
    slot: "Áo",
    name: "Vạn Lý Hàn Y",
    tier: "Thần Thoại Kim",
    level: 79,
    refine: 12,
    gearScore: 8900,
    mainStat: "+14,500 Khí Huyết / Ngoại Thủ +540",
    subStats: ["+48 Thể Chất", "+320 Giảm Sát Thương Quái", "+3.5% Kháng Bạo Kích"]
  },
  "Mũ": {
    id: "g-mu",
    slot: "Mũ",
    name: "Thượng Minh Quan",
    tier: "Hoàng Kim",
    level: 75,
    refine: 12,
    gearScore: 7800,
    mainStat: "+8,200 Khí Huyết / Nội Thủ +420",
    subStats: ["+35 Căn Cốt", "+150 Kháng Nguyên Tố", "+2.8% Né Tránh"]
  },
  "Đai": {
    id: "g-dai",
    slot: "Đai",
    name: "Huyền Long Bội Đái",
    tier: "Hoàng Kim",
    level: 75,
    refine: 12,
    gearScore: 7650,
    mainStat: "+7,800 Khí Huyết / Hồi Khí +120",
    subStats: ["+38 Thể Chất", "+120 Phá Phòng", "+200 Giảm ST Độc"]
  },
  "Giày": {
    id: "g-giay",
    slot: "Giày",
    name: "Đạp Tuyết Hài",
    tier: "Hoàng Kim",
    level: 75,
    refine: 12,
    gearScore: 7700,
    mainStat: "+6,500 Khí Huyết / Tốc Độ Chạy +8%",
    subStats: ["+42 Thân Pháp", "+180 Điểm Hội Tâm", "+3.0% Khắc Chế Phái"]
  },
  "Hộ Uyển": {
    id: "g-uyene",
    slot: "Hộ Uyển",
    name: "Tố Tâm Uyển",
    tier: "Hoàng Kim",
    level: 75,
    refine: 12,
    gearScore: 7600,
    mainStat: "+5,400 Khí Huyết / Ngoại Thủ +380",
    subStats: ["+34 Khí Hải", "+140 Khắc Chế Thủ Lĩnh", "+2.2% Bạo Kích"]
  },
  "Nhẫn 1": {
    id: "g-nhan1",
    slot: "Nhẫn 1",
    name: "Trấn Viên Giới Chỉ",
    tier: "Thần Thoại Kim",
    level: 77,
    refine: 12,
    gearScore: 8800,
    mainStat: "+620 Ngoại Công / Phá Phòng +190",
    subStats: ["+45 Lực Đạo", "+3.8% Hội Tâm", "+160 Sát Thương Chu Thiên"]
  },
  "Nhẫn 2": {
    id: "g-nhan2",
    slot: "Nhẫn 2",
    name: "Ngưng Ngọc Giới Chỉ",
    tier: "Thần Thoại Kim",
    level: 77,
    refine: 12,
    gearScore: 8750,
    mainStat: "+610 Ngoại Công / Hội Tâm +185",
    subStats: ["+44 Thân Pháp", "+12% Sát Thương Bạo", "+140 Khắc Chế Quái"]
  },
  "Dây Chuyền": {
    id: "g-daychuyen",
    slot: "Dây Chuyền",
    name: "Cửu U Linh Hạng Liên",
    tier: "Thần Thoại Kim",
    level: 79,
    refine: 12,
    gearScore: 9100,
    mainStat: "+780 Ngoại Công / +2 Cấp Kỹ Năng Tối Thượng",
    subStats: ["+50 Điểm Kỹ Năng", "+4.5% Gia Tăng ST", "+210 Phá Phòng"]
  },
  "Bội Ngọc": {
    id: "g-boingoc",
    slot: "Bội Ngọc",
    name: "Vô Cực Bội",
    tier: "Độc Trân",
    level: 81,
    refine: 12,
    gearScore: 9850,
    mainStat: "+950 Ngoại Công / +12% Sát Thương Boss Sử Thi",
    subStats: ["+60 Toàn Thuộc Tính", "+5.0% Hội Tâm", "Hiệu Ứng Ẩn: Phóng Kiếm Khí Băng Hồn"]
  }
};

// Chu Thien Resonances
export const CHU_THIEN_RESONANCES: ResonanceEffect[] = [
  {
    id: "res-dangkiem",
    name: "Đãng Kiếm Dương Ba",
    elementReq: "3 Kim (>=12 điểm)",
    level: 3,
    effectText: "Khi xuất chiêu có 40% tỉ lệ kích hoạt Kiếm Khí chém quét đối thủ, gia tăng 150 điểm Phá Phòng và 12% sát thương mục tiêu.",
    active: true,
    color: "#ffd700"
  },
  {
    id: "res-conngo",
    name: "Côn Ngô Đoạn Ngọc",
    elementReq: "3 Hỏa (>=12 điểm)",
    level: 3,
    effectText: "Đòn đánh gây hiệu ứng Cháy Bỏng 3 tầng, tăng 18% Sát Thương Bạo Kích và giảm 15% hồi máu của mục tiêu.",
    active: true,
    color: "#ef4444"
  },
  {
    id: "res-nhatnguyet",
    name: "Nhật Nguyệt Lưỡng Nghi",
    elementReq: "1 Kim 1 Hỏa (>=4 điểm)",
    level: 1,
    effectText: "Tăng 220 điểm Tấn Công căn bản và 5% tỉ lệ Hội Tâm.",
    active: true,
    color: "#f59e0b"
  },
  {
    id: "res-phunguong",
    name: "Phủ Ngưỡng Thái Hư",
    elementReq: "3 Mộc (>=12 điểm)",
    level: 0,
    effectText: "Hồi phục 4% Khí Huyết mỗi 8s, giảm 12% thời gian hồi của tất cả kỹ năng.",
    active: false,
    color: "#10b981"
  },
  {
    id: "res-batdong",
    name: "Bất Động Minh Vương",
    elementReq: "3 Thổ (>=12 điểm)",
    level: 0,
    effectText: "Tạo lá chắn hấp thụ 20% sát thương, miễn nhiễm đòn hất văng.",
    active: false,
    color: "#f59e0b"
  },
  {
    id: "res-vanhoa",
    name: "Vạn Hóa Minh Hợp",
    elementReq: "3 Thủy (>=12 điểm)",
    level: 0,
    effectText: "Tăng 18% Kháng Nguyên Tố, giải trừ 1 hiệu ứng khống chế khi bị đánh trúng.",
    active: false,
    color: "#0ea5e9"
  },
  {
    id: "res-tuyetdien",
    name: "Tuyệt Điện Phi Quang",
    elementReq: "2 Kim 1 Hỏa",
    level: 0,
    effectText: "Tăng tốc chạy 20%, tạo vệt điện từ giật gây tê liệt kẻ địch.",
    active: false,
    color: "#ffd700"
  }
];

export const POPULAR_PRESETS: BuildPreset[] = [
  {
    id: "preset-cuulinh-s2",
    name: "Cửu Linh PvE Meta Mùa 2 - 3 Kim 3 Hỏa",
    sect: "Cửu Linh",
    role: "PvE DPS Triệu Hồi",
    description: "Bộ build tối ưu sát thương nổ bạo kích với Chu thiên Đãng Kiếm và Côn Ngô Đoạn Ngọc.",
    gearItems: DEFAULT_GEAR_SLOTS,
    innerKungfuList: [
      INNER_KUNGFU_DATABASE[20], // Minh Can Qua
      INNER_KUNGFU_DATABASE[15], // Tỏa Phong
      INNER_KUNGFU_DATABASE[16], // Phá Phủ
      INNER_KUNGFU_DATABASE[18], // Đoạn Kim Qua
      INNER_KUNGFU_DATABASE[55], // Trảm Tinh
      INNER_KUNGFU_DATABASE[3]  // Côn Ngô Đoạn Ngọc (Kim)
    ],
    targetResonance: ["Đãng Kiếm Dương Ba", "Côn Ngô Đoạn Ngọc", "Nhật Nguyệt Lưỡng Nghi"],
    totalPower: 89450
  },
  {
    id: "preset-huyenco-s1",
    name: "Huyền Cơ PvE Nỏ Cơ Quan - 3 Kim 3 Hỏa",
    sect: "Huyền Cơ",
    role: "PvE DPS Tầm Xa",
    description: "Bộ build tối ưu hỏa lực nỏ cơ quan bạo kích tầm xa với Chu thiên Đãng Kiếm và Côn Ngô Đoạn Ngọc.",
    gearItems: DEFAULT_GEAR_SLOTS,
    innerKungfuList: [
      INNER_KUNGFU_DATABASE[15], // Tỏa Phong
      INNER_KUNGFU_DATABASE[16], // Phá Phủ
      INNER_KUNGFU_DATABASE[55], // Trảm Tinh
      INNER_KUNGFU_DATABASE[3],  // Côn Ngô Đoạn Ngọc (Kim)
      INNER_KUNGFU_DATABASE[4],  // Côn Ngô Đoạn Ngọc (Hỏa)
      INNER_KUNGFU_DATABASE[20]  // Minh Can Qua
    ],
    targetResonance: ["Đãng Kiếm Dương Ba", "Côn Ngô Đoạn Ngọc", "Nhật Nguyệt Lưỡng Nghi"],
    totalPower: 91200
  }
];
