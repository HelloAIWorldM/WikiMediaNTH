export interface RadarStats {
  satThuong: number;
  phongThu: number;
  coDong: number;
  hoTro: number;
  tamDanh: number;
  doKho: number;
}

export interface SectDetail {
  slug: string;
  name: string;
  weapon: string;
  sect: string;
  difficulty: string;
  desc: string;
  stats: { skills: number; ultimate: number; jump: number };
  tags: string[];
  imageUrl: string;
  iconUrl: string;
  radar: RadarStats;
  pros: string[];
  cons: string[];
  isNew?: boolean;
}

export const SECTS_DETAILED_DATA: SectDetail[] = [
  {
    slug: "to-van",
    name: "Tố Vấn",
    weapon: "Dây Lụa",
    sect: "Dược Vương Cốc",
    difficulty: "★★★★☆",
    desc: "Hỗ trợ trị liệu nội công. Có 2 hướng PvE: Trị liệu hoặc Sát thương.",
    stats: { skills: 10, ultimate: 1, jump: 1 },
    tags: ["Hỗ trợ", "Trị liệu", "Sát thương"],
    imageUrl: "https://wikinghichthuyhan.com/media/site-art-tovan.webp",
    iconUrl: "https://wikinghichthuyhan.com/media/site-icon-tovan.webp",
    radar: { satThuong: 55, phongThu: 35, coDong: 50, hoTro: 90, tamDanh: 65, doKho: 80 },
    pros: ["Trị liệu mạnh nhất", "Linh hoạt 2 hướng build", "Trụ cột trong raid"],
    cons: ["Phòng thủ yếu", "Khó làm chủ nhịp hồi"]
  },
  {
    slug: "cuu-linh",
    name: "Cửu Linh",
    weapon: "Hồn Đăng",
    sect: "Dược Vương Cốc",
    difficulty: "★★★★☆",
    desc: "Sát thương độc - DoT chuyên gia. Build PvE và PvP đều mạnh.",
    stats: { skills: 10, ultimate: 1, jump: 1 },
    tags: ["DoT", "Sát thương", "Tầm xa"],
    imageUrl: "https://wikinghichthuyhan.com/media/site-art-cuulinh.webp",
    iconUrl: "https://wikinghichthuyhan.com/media/site-icon-cuulinh.webp",
    radar: { satThuong: 100, phongThu: 18, coDong: 50, hoTro: 30, tamDanh: 82, doKho: 58 },
    pros: ["Sát thương độc DoT cực mạnh", "Tầm xa an toàn", "PvE + PvP đều tốt"],
    cons: ["Phòng thủ rất mỏng", "Phụ thuộc thời gian DoT"]
  },
  {
    slug: "than-tuong",
    name: "Thần Tương",
    weapon: "Kiếm-Cầm",
    sect: "Bạch Đế Thành",
    difficulty: "★★★★★",
    desc: "Khống Chế mạnh và quần chiến, vai trò chính trong bang chiến.",
    stats: { skills: 10, ultimate: 1, jump: 1 },
    tags: ["Control", "AoE", "DPS"],
    imageUrl: "https://wikinghichthuyhan.com/media/site-art-thantuong.webp",
    iconUrl: "https://wikinghichthuyhan.com/media/site-icon-thantuong.webp",
    radar: { satThuong: 65, phongThu: 60, coDong: 58, hoTro: 55, tamDanh: 50, doKho: 45 },
    pros: ["Khống chế + AoE mạnh", "Vai trò chính bang chiến", "Cân bằng đa năng"],
    cons: ["Không có chỉ số vượt trội", "Skill cap cao"]
  },
  {
    slug: "thiet-y",
    name: "Thiết Y",
    weapon: "Quyền Sáo",
    sect: "Bích Huyết Doanh",
    difficulty: "★★★☆☆",
    desc: "Tank lá chắn truyền thống. Dễ chơi cho người mới.",
    stats: { skills: 10, ultimate: 1, jump: 1 },
    tags: ["Tank", "Hỗ trợ", "Bảo hộ"],
    imageUrl: "https://wikinghichthuyhan.com/media/site-art-thiety.webp",
    iconUrl: "https://wikinghichthuyhan.com/media/site-icon-thiety.webp",
    radar: { satThuong: 45, phongThu: 100, coDong: 50, hoTro: 70, tamDanh: 45, doKho: 35 },
    pros: ["Lá chắn bền bỉ nhất", "Dễ chơi cho tân thủ", "Bảo hộ đồng đội"],
    cons: ["Sát thương thấp", "Tầm đánh ngắn"]
  },
  {
    slug: "huyet-ha",
    name: "Huyết Hà",
    weapon: "Thương",
    sect: "Bích Huyết Doanh",
    difficulty: "★★★★☆",
    desc: "Kết hợp sát thương cao và khả năng sinh tồn mạnh.",
    stats: { skills: 10, ultimate: 1, jump: 1 },
    tags: ["DPS", "Semitank", "PvP"],
    imageUrl: "https://wikinghichthuyhan.com/media/site-art-huyetha.webp",
    iconUrl: "https://wikinghichthuyhan.com/media/site-icon-huyetha.webp",
    radar: { satThuong: 90, phongThu: 65, coDong: 55, hoTro: 45, tamDanh: 45, doKho: 55 },
    pros: ["Sát thương cao + sinh tồn tốt", "Mạnh trong PvP", "Cân bằng công thủ"],
    cons: ["Hỗ trợ kém", "Phụ thuộc combo"]
  },
  {
    slug: "toai-mong",
    name: "Toái Mộng",
    weapon: "Đao",
    sect: "Trích Tiên Đảo",
    difficulty: "★★★★★",
    desc: "Kỹ năng độc quyền Đao Ý. Phong cách ám sát tốc độ cao.",
    stats: { skills: 10, ultimate: 1, jump: 1 },
    tags: ["Ám sát", "Burst", "Cận chiến"],
    imageUrl: "https://wikinghichthuyhan.com/media/site-art-toaimong.webp",
    iconUrl: "https://wikinghichthuyhan.com/media/site-icon-toaimong.webp",
    radar: { satThuong: 95, phongThu: 35, coDong: 92, hoTro: 25, tamDanh: 50, doKho: 90 },
    pros: ["Burst ám sát tốc độ cao", "Cơ động vượt trội", "Combo Đao Ý độc quyền"],
    cons: ["Phòng thủ kém", "Yêu cầu kỹ năng cao"]
  },
  {
    slug: "long-ngam",
    name: "Long Ngâm",
    weapon: "Kiếm",
    sect: "Trích Tiên Đảo",
    difficulty: "★★★★★",
    desc: "Sát thương nội công cận chiến. Thiên hạ đệ nhất kiếm, đánh tan quần ma, hộ vệ chúng sinh.",
    stats: { skills: 10, ultimate: 1, jump: 1 },
    tags: ["DPS", "Cận chiến", "Cơ động"],
    imageUrl: "https://wikinghichthuyhan.com/media/site-art-longngam.webp",
    iconUrl: "https://wikinghichthuyhan.com/media/site-icon-longngam.webp",
    radar: { satThuong: 65, phongThu: 40, coDong: 100, hoTro: 50, tamDanh: 50, doKho: 55 },
    pros: ["Cơ động vượt trội", "Sát thương cận chiến tốt", "Combo 3-stage uy lực"],
    cons: ["Phòng thủ trung bình", "Cần trang bị mạnh"],
    isNew: true
  }
];

export interface WikiCategory {
  id: string;
  name: string;
  slug: string;
  desc: string;
  count: number;
  icon: string;
  liveBadge?: boolean;
}

export const WIKI_CATEGORIES: WikiCategory[] = [
  { id: "luu-phai", name: "Lưu phái", slug: "luu-phai", desc: "7 lưu phái: kỹ năng, build PvE/PvP, rotation, combo.", count: 7, icon: "Swords" },
  { id: "trang-bi-noi-cong", name: "Trang Bị & Nội Công", slug: "trang-bi-noi-cong", desc: "Trang bị, vũ khí, áo giáp và nội công, tâm pháp tu luyện.", count: 15, icon: "Hammer" },
  { id: "ky-nang-dac-ky", name: "Kỹ Năng & Đặc Kỹ", slug: "ky-nang-dac-ky", desc: "Kỹ năng chiến đấu, đặc kỹ và cách phối hợp combo.", count: 7, icon: "Zap" },
  { id: "tan-thu", name: "Tân Thủ", slug: "tan-thu", desc: "Hướng dẫn cho người mới: khởi đầu, mẹo, lộ trình nhập môn.", count: 6, icon: "BookOpen" },
  { id: "mon-phai", name: "Môn phái Giang Hồ", slug: "mon-phai", desc: "Môn phái Giang Hồ: gia nhập, tín vật, cốt truyện.", count: 6, icon: "Shield" },
  { id: "pho-ban", name: "PvE - Phó bản", slug: "pho-ban", desc: "Boss thế giới, dungeon 5/10/25 người và raid.", count: 8, icon: "Skull" },
  { id: "pvp", name: "PvP - Đối kháng", slug: "pvp", desc: "1v1, 3v3, đấu trường công thành, bang chiến.", count: 3, icon: "Crosshair" },
  { id: "ngoai-trang", name: "Ngoại Trang", slug: "ngoai-trang", desc: "Ngoại trang, thời trang nhân vật, ngoại hình và hiệu ứng diện mạo.", count: 8, icon: "Sparkles" },
];

export interface FeaturedArticle {
  id: string;
  title: string;
  summary: string;
  tag: string;
  date: string;
  href: string;
  isMainHero?: boolean;
}

export const FEATURED_ARTICLES: FeaturedArticle[] = [
  {
    id: "art-1",
    title: "Phó Bản Thiên Cơ Mê Thành (Thủ Lĩnh 1-3) - Hướng Dẫn Khai Hoang",
    summary: "Chuẩn bị khai hoang Thiên Cơ Mê Thành: hiệu ứng tăng cường, Cầu Nguyện Độc Trân, cơ chế và cách ứng phó Huỳnh Hoặc, Phi Mệnh Nhung Xa, Khôi Vũ Tam Cơ.",
    tag: "BÀI MỚI",
    date: "1-00",
    href: "/wiki/pho-ban-thien-co-me-thanh-thu-linh-1-3-huong-dan-khai-hoang",
    isMainHero: true
  },
  {
    id: "art-2",
    title: "Tổng Hợp Thiên Phú & Kỹ Năng - Hệ Thống Thần Khí Thiên Cơ Ngọc Hạch",
    summary: "Giới thiệu hệ thống Thần Khí Thiên Cơ Ngọc Hạch: Thiên Phú Kỹ Năng của toàn bộ Lưu Phái, điều kiện thăng cấp và phân bố điểm tối ưu.",
    tag: "BÀI MỚI",
    date: "30-10",
    href: "/wiki/tong-hop-thien-phu-ky-nang-than-khi-thien-co-ngoc-hach"
  },
  {
    id: "art-3",
    title: "Phó Bản Thế Ngoại Tầm Ẩn - Hướng Dẫn Thủ Lĩnh 1-4",
    summary: "Cơ chế và cách ứng phó bốn thủ lĩnh Thế Ngoại Tầm Ẩn: Phượng Thiên Cẩm, Lư Ẩn, Thiên Sơn Tuyết Thạch và Ngân Trạch.",
    tag: "BÀI MỚI",
    date: "30-10",
    href: "/wiki/pho-ban-the-ngoai-tam-an-thu-linh-1-4"
  },
  {
    id: "art-4",
    title: "HƯỚNG DẪN BUILD LONG NGÂM CHI TIẾT - PB 2.1.1",
    summary: "Build Long Ngâm phiên bản 2.1.1: PVE khai hoang Thiên Cơ Mê Thành và Đại Hội Tỉ Võ 6v6, chuỗi combo 3 nấc uy lực.",
    tag: "Patch 2.1.1",
    date: "Patch 2.1.1",
    href: "/simulator?sect=Long%20Ng%C3%A2m"
  },
  {
    id: "art-5",
    title: "HƯỚNG DẪN BUILD HUYẾT HÀ CHI TIẾT - PB 2.1.1",
    summary: "Build Huyết Hà phiên bản 2.1.1: PVE khai hoang Thiên Cơ Mê Thành, đâm thương liên tục và animation cancel đỉnh cao.",
    tag: "Patch 2.1.1",
    date: "Patch 2.1.1",
    href: "/simulator?sect=Huy%E1%BA%BFt%20H%C3%A0"
  }
];

export interface GiftCodeItem {
  code: string;
  reward: string;
  status: "Đang hoạt động" | "Sắp hết hạn";
  views: string;
}

export const GIFT_CODES_DATA: GiftCodeItem[] = [
  { code: "NGHICHTHUYHAN2026", reward: "500 Ngọc Đỏ + 1 Rương Nội Công Hoàng Kim", status: "Đang hoạt động", views: "14.2k" },
  { code: "NIENDU_TOP1_SERVER", reward: "10 Tầm Bảo Đồ + 50,000 Đồng", status: "Đang hoạt động", views: "8.5k" },
  { code: "TANTHU_KIMLONG", reward: "Trang Phục Bạch Y Kim Tuyến (7 ngày)", status: "Đang hoạt động", views: "19.8k" },
  { code: "THIENCO_ME_THANH", reward: "2 Lệnh Bài Phó Bản Anh Hùng", status: "Đang hoạt động", views: "6.1k" },
];

export interface ContributorItem {
  id: number;
  name: string;
  approvedCount: number;
}

export const TOP_CONTRIBUTORS_DATA: ContributorItem[] = [
  { id: 1, name: "Huỳnh Cao Doãn", approvedCount: 2 },
  { id: 2, name: "Đạt Phạm Văn", approvedCount: 1 },
  { id: 3, name: "Nguyen Khoa", approvedCount: 1 },
];

export interface BossLootItem {
  id: string;
  dungeon: string;
  bossName: string;
  location: string;
  dropGear: string;
  gearTier: string;
  gearType: string;
  hiddenAffix: string;
}

export const BOSS_LOOTMAP_DATA: BossLootItem[] = [
  {
    id: "loot-1",
    dungeon: "Thế Ngoại Tầm Ẩn",
    bossName: "Mộ Dung Băng",
    location: "Vạn Hạp Cung [412, 890]",
    dropGear: "Băng Hồn Kiếm Độc Trân Cấp 79",
    gearTier: "Thần Thoại Vàng",
    gearType: "Vũ Khí",
    hiddenAffix: "Khi nội lực trên 80%, toàn bộ đòn đánh kèm thêm 15% Sát Thương Băng Hàn và làm chậm mục tiêu 20%."
  },
  {
    id: "loot-2",
    dungeon: "Tước Ẩn Trùng Lâu",
    bossName: "Tước Ma Vương",
    location: "Trùng Lâu Tháp Tầng 3 [205, 550]",
    dropGear: "Hắc Vũ Ma Y Độc Trân Cấp 79",
    gearTier: "Hoàng Kim",
    gearType: "Áo Giáp",
    hiddenAffix: "Khi HP dưới 30%, nhận ngay khiên hộ thể hấp thụ 25% sát thương tối đa trong 8 giây (Hồi chiêu 90s)."
  },
  {
    id: "loot-3",
    dungeon: "Thiên Cơ Mê Thành",
    bossName: "Thiên Cơ Tướng Quân",
    location: "Mê Cung Cơ Quan [112, 330]",
    dropGear: "Cơ Quan Thần Hộ Uyển Cấp 77",
    gearTier: "Thần Thoại Vàng",
    gearType: "Hộ Uyển",
    hiddenAffix: "Tăng 120 điểm Phá Phòng căn bản, kích hoạt dòng nảy Lôi Điện lan 3 mục tiêu xung quanh."
  },
  {
    id: "loot-4",
    dungeon: "Boss Thế Giới",
    bossName: "Huyền Giác Ma Long",
    location: "Biển Đông Trích Tiên Đảo [780, 920]",
    dropGear: "Ngưng Ngọc Thần Bội Cấp 81",
    gearTier: "Thần Thoại Vàng",
    gearType: "Bội Ngọc",
    hiddenAffix: "Tăng 8% Tỉ lệ Hội Tâm và 25% Sát Thương Bạo Kích khi đối đầu Boss Phó Bản."
  }
];

export interface ComboGuideItem {
  sect: string;
  role: string;
  difficulty: string;
  rotation: string[];
  animationCancelTip: string;
  presetRecommend: string;
}

export const COMBO_ROTATION_DATA: ComboGuideItem[] = [
  {
    sect: "Cửu Linh",
    role: "PvE DPS Triệu Hồi / Nổ Dồn",
    difficulty: "Trung Bình",
    rotation: ["Bách Cổ Tế Mệnh", "Phá Không", "Tụ Cổ Bộc Phát", "U Linh Hồn", "Hoàn Linh Kích"],
    animationCancelTip: "Dùng lướt né (Dash) ngay khi vòng Bách Cổ vừa chạm đất để ngắt 0.4s hoạt ảnh vung trượng.",
    presetRecommend: "PvE Meta Mùa 2 - 3 Kim 3 Hỏa"
  },
  {
    sect: "Toái Mộng",
    role: "PvP / PvE Ám Sát Nhịp Trắng",
    difficulty: "Rất Khó",
    rotation: ["Nhất Khảm", "Bách Liệt Câu Toái", "Thập Tự Trảm", "Kinh Hồng", "Sát Lục"],
    animationCancelTip: "Bấm chiêu tiếp theo ngay khi thanh nhịp 'Bạch' xuất hiện trên đầu để đạt 100% bạo kích liên tục.",
    presetRecommend: "PvP Sát Lục Lôi Đài - 3 Kim 3 Mộc"
  },
  {
    sect: "Huyết Hà",
    role: "PvE Đấu Sĩ / Đâm Thương Liên Tục",
    difficulty: "Dễ",
    rotation: ["Thương Pháp Thích", "Bất Động Hộ Thể", "Thiệp Huyết", "Thương Long Bào Tiếu", "Thiên Tinh Bão"],
    animationCancelTip: "Giữ chặt nút Thích 3 lần rồi nhấp nhẹ lướt để reset combo đâm thương mà không bị dừng nhịp.",
    presetRecommend: "PvE Carry Đột Kích - 3 Hỏa 3 Thổ"
  },
  {
    sect: "Thiết Y",
    role: "PvE Chống Chịu / Gom Quái",
    difficulty: "Dễ",
    rotation: ["Vô Si Cương", "Kim Cương Trụ", "Nhất Lực Cử Đỉnh", "Khai Sơn Phách", "Thiên Cân Trụy"],
    animationCancelTip: "Kích hoạt Kim Cương Trụ khi boss vừa đỏ vạch kỹ năng để nhận 50% miễn thương trọn đòn.",
    presetRecommend: "PvE Bất Hoại Thiết Bích - 3 Thổ 3 Thủy"
  }
];

export interface NewbieChecklistItem {
  id: string;
  title: string;
  category: string;
  reward: string;
}

export const NEWBIE_CHECKLIST_DATA: NewbieChecklistItem[] = [
  { id: "c1", title: "Khai mở 100% rương kho báu tại Biện Kinh & Hàng Châu (32/32)", category: "Thế giới mở", reward: "Danh hiệu: Giang Hồ Tầm Bảo Đồ" },
  { id: "c2", title: "Gia nhập Bang Hội Niên Du (Top 1 Song Hào Phi Thúy)", category: "Bang Hội", reward: "Buff Bang Chiến +10% Lực Chiến" },
  { id: "c3", title: "Kích hoạt trọn vẹn Chu Thiên Cấp 3 (3 Kim 3 Hỏa)", category: "Nội Công", reward: "Mở khóa hiệu ứng Đãng Kiếm Dương Ba" },
  { id: "c4", title: "Nâng cấp Thần Khí Thiên Cơ Ngọc Hạch đạt Cấp 5", category: "Thần Khí", reward: "Mở khóa Tuyệt Kỹ Đại Thánh Tề Thiên" },
  { id: "c5", title: "Vượt toàn bộ 4 Boss Phó Bản Trích Tiên Kinh Đào (Anh Hùng)", category: "Phó Bản", reward: "Rương Trang Bị Độc Trân Bậc 79" },
  { id: "c6", title: "Bái tượng Phúc Lộc tăng 100 điểm May Mắn vĩnh viễn", category: "Kỳ Ngộ", reward: "Tỉ lệ rơi đồ tím/cam tăng 15%" }
];
