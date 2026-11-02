export type ElementType = "Kim" | "Moc" | "Thuy" | "Hoa" | "Tho";

export interface InnerKungfu {
  id: string;
  name: string;
  primaryElement: ElementType;
  secondaryElement?: ElementType;
  tier: "Thần Thoại" | "Hoàng Kim";
  description: string;
  elements: ElementType[]; // exactly 5 elements
  score: number;
  level?: number;
  subStats?: string[];
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
  // --- THẦN THOẠI & BIẾN THỂ (ẢNH 3) ---
  {
    id: "ik-nhatnguyetluongnghi-hoa",
    name: "Nhật Nguyệt Lưỡng Nghi (Hỏa)",
    primaryElement: "Hoa",
    secondaryElement: "Kim",
    tier: "Thần Thoại",
    description: "Khi HP trên 50%, hiệu quả gây sát thương/trị liệu tăng 5%. Khi HP dưới 50%, sát thương nhận vào giảm 5% ◆ Khi có hiệu ứng <Linh Vận>, hiệu quả tăng cường tăng thêm 50%.",
    elements: ["Kim", "Hoa", "Hoa", "Hoa", "Tho"],
    score: 3029,
    level: 25,
    subStats: [
      "Giới Hạn HP: +3119",
      "Kháng Long Ngâm: +80",
      "Kháng Chí Mạng Nội: +101",
      "Khí Hải: +22",
      "Kháng Huyết Hà: +80",
      "Chính Xác: +45",
      "Phòng Thủ: +137",
      "Kháng Thần Tương: +92"
    ]
  },
  {
    id: "ik-nhatnguyetluongnghi-kim",
    name: "Nhật Nguyệt Lưỡng Nghi (Kim)",
    primaryElement: "Kim",
    secondaryElement: "Tho",
    tier: "Thần Thoại",
    description: "Âm dương tuần hoàn, kích hoạt luân xa tăng 6% sát thương công kích cơ bản và 45 điểm Phá Phòng.",
    elements: ["Kim", "Kim", "Kim", "Tho", "Hoa"],
    score: 3029,
    level: 25
  },
  {
    id: "ik-conngodoanngoc-hoa",
    name: "Côn Ngô Đoạn Ngọc (Hỏa)",
    primaryElement: "Hoa",
    tier: "Thần Thoại",
    description: "Tuyệt đỉnh Hỏa thần, khi bạo kích gây hiệu ứng Cháy Bỏng rút 1.5% HP mỗi giây và tăng 18% ST chí mạng.",
    elements: ["Hoa", "Hoa", "Hoa", "Hoa", "Hoa"],
    score: 2950,
    level: 25
  },
  {
    id: "ik-conngodoanngoc-kim",
    name: "Côn Ngô Đoạn Ngọc (Kim)",
    primaryElement: "Kim",
    secondaryElement: "Hoa",
    tier: "Thần Thoại",
    description: "Kiếm khí hoàng kim sắc lẹm, đòn đánh xuyên thấu 12% hộ giáp mục tiêu.",
    elements: ["Kim", "Kim", "Kim", "Kim", "Hoa"],
    score: 2950,
    level: 25
  },
  {
    id: "ik-dangkiemduongba-hoa",
    name: "Đãng Kiếm Dương Ba (Hỏa)",
    primaryElement: "Hoa",
    tier: "Thần Thoại",
    description: "Mỗi lần tung kỹ năng tích tụ 1 tầng Kiếm Sóng, đạt 3 tầng bùng nổ sát thương diện rộng.",
    elements: ["Hoa", "Hoa", "Hoa", "Hoa", "Kim"],
    score: 2900,
    level: 25
  },
  {
    id: "ik-dangkiemduongba-kim",
    name: "Đãng Kiếm Dương Ba (Kim)",
    primaryElement: "Kim",
    tier: "Thần Thoại",
    description: "Vung kiếm trảm kích tạo làn sóng kiếm khí vàng, tăng 10% tốc độ công kích.",
    elements: ["Kim", "Kim", "Kim", "Kim", "Tho"],
    score: 2900,
    level: 25
  },
  {
    id: "ik-batdongminhvuong-tho",
    name: "Bất Động Minh Vương (Thổ)",
    primaryElement: "Tho",
    tier: "Thần Thoại",
    description: "Tạo giáp hộ thân Bất Động, miễn nhiễm đòn hất tung và giảm 25% sát thương nhận vào trong 6s.",
    elements: ["Tho", "Tho", "Tho", "Tho", "Kim"],
    score: 2920,
    level: 25
  },
  {
    id: "ik-batdongminhvuong-thuy",
    name: "Bất Động Minh Vương (Thủy)",
    primaryElement: "Thuy",
    tier: "Thần Thoại",
    description: "Tượng phật hàn băng bất động, phản hồi 15% sát thương nhận vào thành hàn khí làm chậm địch.",
    elements: ["Thuy", "Thuy", "Thuy", "Tho", "Tho"],
    score: 2920,
    level: 25
  },
  {
    id: "ik-vanhoaminhhop-thuy",
    name: "Vạn Hóa Minh Hợp (Thủy)",
    primaryElement: "Thuy",
    tier: "Thần Thoại",
    description: "Chuyển hóa 15% sát thương nguyên tố phải chịu thành nội lực nuôi dưỡng kinh mạch.",
    elements: ["Thuy", "Thuy", "Thuy", "Thuy", "Moc"],
    score: 2880,
    level: 25
  },
  {
    id: "ik-vanhoaminhhop-tho",
    name: "Vạn Hóa Minh Hợp (Thổ)",
    primaryElement: "Tho",
    secondaryElement: "Kim",
    tier: "Thần Thoại",
    description: "Càn khôn vạn hóa, tăng 120 điểm phòng thủ toàn diện và giảm thời gian bị khống chế.",
    elements: ["Tho", "Tho", "Tho", "Kim", "Kim"],
    score: 2880,
    level: 25
  },
  {
    id: "ik-phunguongthaihu-moc",
    name: "Phủ Ngưỡng Thái Hư (Mộc)",
    primaryElement: "Moc",
    tier: "Thần Thoại",
    description: "Đạo pháp tự nhiên, mỗi 10s hồi phục 6% khí huyết và giảm hồi chiêu 1s toàn bộ võ học.",
    elements: ["Moc", "Moc", "Moc", "Moc", "Thuy"],
    score: 2980,
    level: 25
  },
  {
    id: "ik-phunguongthaihu-kim",
    name: "Phủ Ngưỡng Thái Hư (Kim)",
    primaryElement: "Kim",
    secondaryElement: "Tho",
    tier: "Thần Thoại",
    description: "La bàn thái hư hoàng kim, tăng 8% sát thương tuyệt kỹ môn phái.",
    elements: ["Kim", "Kim", "Kim", "Tho", "Moc"],
    score: 2980,
    level: 25
  },
  {
    id: "ik-tuyetdienphiquang-kim",
    name: "Tuyệt Điện Phi Quang (Kim)",
    primaryElement: "Kim",
    tier: "Thần Thoại",
    description: "Đòn đánh kèm tia sét đánh ngẫu nhiên 3 mục tiêu xung quanh, tăng 15% tốc chạy.",
    elements: ["Kim", "Kim", "Kim", "Kim", "Hoa"],
    score: 2920,
    level: 25
  },
  {
    id: "ik-tuyetdienphiquang-moc",
    name: "Tuyệt Điện Phi Quang (Mộc)",
    primaryElement: "Moc",
    secondaryElement: "Kim",
    tier: "Thần Thoại",
    description: "Sấm sét mộc linh, gia tăng tỉ lệ hồi năng lượng khi đánh trúng kẻ địch.",
    elements: ["Moc", "Moc", "Moc", "Kim", "Kim"],
    score: 2920,
    level: 25
  },

  // --- NỘI CÔNG CHÍNH TÔNG DANH SÁCH 1 (ẢNH 1) ---
  {
    id: "ik-toaphong",
    name: "Tỏa Phong",
    primaryElement: "Hoa",
    secondaryElement: "Kim",
    tier: "Hoàng Kim",
    description: "Kỹ năng tăng 12% sát thương chí mạng khi tấn công mục tiêu từ phía sau.",
    elements: ["Hoa", "Hoa", "Hoa", "Kim", "Kim"],
    score: 1850
  },
  {
    id: "ik-samlatran",
    name: "Sâm La Trận",
    primaryElement: "Moc",
    tier: "Hoàng Kim",
    description: "Tạo linh mộc trận quanh người, giảm 15% sát thương nhận vào từ diện rộng.",
    elements: ["Moc", "Moc", "Moc", "Moc", "Tho"],
    score: 1650
  },
  {
    id: "ik-khuocta",
    name: "Khước Tà",
    primaryElement: "Thuy",
    tier: "Hoàng Kim",
    description: "Khi bị khống chế cứng, hóa giải hiệu ứng và hồi 10% lượng HP đã mất.",
    elements: ["Thuy", "Thuy", "Thuy", "Kim", "Tho"],
    score: 1600
  },
  {
    id: "ik-thuyhuu",
    name: "Thùy Hựu",
    primaryElement: "Thuy",
    secondaryElement: "Tho",
    tier: "Hoàng Kim",
    description: "Tăng khả năng chống chịu và giải khống chế khi chịu sát thương dồn.",
    elements: ["Thuy", "Thuy", "Tho", "Tho", "Moc"],
    score: 1620
  },
  {
    id: "ik-daphong",
    name: "Đạp Hồng",
    primaryElement: "Moc",
    tier: "Hoàng Kim",
    description: "Tăng tốc độ di chuyển và hồi phục nội lực khi né tránh thành công.",
    elements: ["Moc", "Moc", "Moc", "Thuy", "Kim"],
    score: 1640
  },
  {
    id: "ik-linhte",
    name: "Linh Tê",
    primaryElement: "Kim",
    tier: "Hoàng Kim",
    description: "Mỗi đòn đánh trúng điểm yếu tăng 40 điểm Phá Phòng, cộng dồn tối đa 5 tầng.",
    elements: ["Kim", "Kim", "Kim", "Kim", "Moc"],
    score: 1900
  },
  {
    id: "ik-chietnhue",
    name: "Chiết Nhuệ",
    primaryElement: "Hoa",
    tier: "Hoàng Kim",
    description: "Giảm lực tấn công của mục tiêu chịu đòn đi 8% trong 6 giây.",
    elements: ["Hoa", "Hoa", "Hoa", "Moc", "Thuy"],
    score: 1680
  },
  {
    id: "ik-binhchucdu",
    name: "Bỉnh Chúc Du",
    primaryElement: "Tho",
    tier: "Hoàng Kim",
    description: "Đêm dài cầm đuốc du ngoạn, tăng khả năng định lực và giảm tiêu hao khinh công.",
    elements: ["Tho", "Tho", "Tho", "Hoa", "Moc"],
    score: 1620
  },
  {
    id: "ik-thaituclech",
    name: "Thái Tức Lệnh",
    primaryElement: "Kim",
    tier: "Hoàng Kim",
    description: "Khi máu trên 70%, tăng 100 điểm Ngoại Công căn bản.",
    elements: ["Kim", "Kim", "Kim", "Kim", "Hoa"],
    score: 1700
  },
  {
    id: "ik-quynguyen",
    name: "Quy Nguyên",
    primaryElement: "Thuy",
    tier: "Hoàng Kim",
    description: "Vạn lưu quy hải, định kỳ hồi phục nội lực và tăng lượng trị liệu nhận vào 8%.",
    elements: ["Thuy", "Thuy", "Thuy", "Moc", "Kim"],
    score: 1660
  },
  {
    id: "ik-lientinhtruy",
    name: "Liên Tinh Trụy",
    primaryElement: "Hoa",
    tier: "Hoàng Kim",
    description: "Sao băng liên hoàn kích hoạt, tăng 14% sát thương nổ diện rộng.",
    elements: ["Hoa", "Hoa", "Hoa", "Tho", "Kim"],
    score: 1720
  },
  {
    id: "ik-chinhbao",
    name: "Chinh Bào",
    primaryElement: "Tho",
    tier: "Hoàng Kim",
    description: "Tăng phòng thủ cơ bản và kháng chí mạng khi đối đầu kẻ địch đông người.",
    elements: ["Tho", "Tho", "Tho", "Kim", "Thuy"],
    score: 1650
  },
  {
    id: "ik-hoadich",
    name: "Hóa Dịch",
    primaryElement: "Tho",
    tier: "Hoàng Kim",
    description: "Hóa giải sát thương liên tục thành trạng thái kiên cố bảo hộ thân thể.",
    elements: ["Tho", "Tho", "Thuy", "Thuy", "Moc"],
    score: 1630
  },
  {
    id: "ik-thuchon",
    name: "Thúc Hồn",
    primaryElement: "Hoa",
    tier: "Hoàng Kim",
    description: "Trói buộc linh hồn đối thủ, giảm 15% hiệu quả trị liệu của địch.",
    elements: ["Hoa", "Hoa", "Hoa", "Thuy", "Kim"],
    score: 1690
  },
  {
    id: "ik-phaphu",
    name: "Phá Phủ",
    primaryElement: "Kim",
    secondaryElement: "Hoa",
    tier: "Hoàng Kim",
    description: "Đánh đổi 5% phòng thủ để nhận ngay 18% lực công kích bạo phát.",
    elements: ["Kim", "Kim", "Hoa", "Hoa", "Hoa"],
    score: 1950
  },
  {
    id: "ik-phuocnhan",
    name: "Phược Nhẫn",
    primaryElement: "Moc",
    tier: "Hoàng Kim",
    description: "Gây hiệu ứng làm chậm và giảm tốc độ thi triển chiêu của đối thủ.",
    elements: ["Moc", "Moc", "Moc", "Hoa", "Kim"],
    score: 1670
  },
  {
    id: "ik-thuthienchung",
    name: "Thù Thiên Chung",
    primaryElement: "Thuy",
    tier: "Hoàng Kim",
    description: "Tăng khả năng giải trừ hiệu ứng bất lợi trên diện rộng.",
    elements: ["Thuy", "Thuy", "Thuy", "Moc", "Tho"],
    score: 1640
  },
  {
    id: "ik-tanduongdan",
    name: "Tàn Dương Dẫn",
    primaryElement: "Kim",
    secondaryElement: "Hoa",
    tier: "Hoàng Kim",
    description: "Ánh dương tà dẫn đường, tăng 20% sát thương đòn kết liễu mục tiêu dưới 30% HP.",
    elements: ["Kim", "Kim", "Hoa", "Hoa", "Tho"],
    score: 1780
  },
  {
    id: "ik-chithuyquyet",
    name: "Chỉ Thủy Quyết",
    primaryElement: "Thuy",
    tier: "Hoàng Kim",
    description: "Tâm tĩnh như nước, tăng cường khả năng kháng khống chế và kháng bạo.",
    elements: ["Thuy", "Thuy", "Thuy", "Thuy", "Kim"],
    score: 1690
  },
  {
    id: "ik-mocxuanphong",
    name: "Mộc Xuân Phong",
    primaryElement: "Moc",
    secondaryElement: "Thuy",
    tier: "Hoàng Kim",
    description: "Hồi máu cho đồng đội xung quanh khi sử dụng kỹ năng hỗ trợ.",
    elements: ["Moc", "Moc", "Thuy", "Thuy", "Tho"],
    score: 1710
  },
  {
    id: "ik-linhlungdau",
    name: "Linh Lung Đẩu",
    primaryElement: "Kim",
    tier: "Hoàng Kim",
    description: "Tăng 5% bạo kích và 10% tốc độ di chuyển trong giao tranh.",
    elements: ["Kim", "Kim", "Kim", "Hoa", "Tho"],
    score: 1730
  },
  {
    id: "ik-socuongca",
    name: "Sở Cuồng Ca",
    primaryElement: "Hoa",
    tier: "Hoàng Kim",
    description: "Bùng nổ sát thương diện rộng khi đối phương dưới 50% HP.",
    elements: ["Hoa", "Hoa", "Hoa", "Kim", "Tho"],
    score: 1750
  },
  {
    id: "ik-kictietthan",
    name: "Kích Tiết Thán",
    primaryElement: "Kim",
    secondaryElement: "Tho",
    tier: "Hoàng Kim",
    description: "Gõ nhịp ca thán, tăng mạnh phòng thủ khi bị 3 kẻ địch vây hãm.",
    elements: ["Kim", "Kim", "Tho", "Tho", "Hoa"],
    score: 1690
  },
  {
    id: "ik-amkich",
    name: "Ám Kích",
    primaryElement: "Kim",
    tier: "Hoàng Kim",
    description: "Đòn đánh bất ngờ tăng mạnh tỉ lệ chí mạng và phá giáp.",
    elements: ["Kim", "Kim", "Kim", "Moc", "Hoa"],
    score: 1760
  },
  {
    id: "ik-chuvu",
    name: "Chú Vũ",
    primaryElement: "Moc",
    tier: "Hoàng Kim",
    description: "Tiếng sáo gọi mưa mộc linh, tăng hiệu quả hồi máu và lá chắn 8%.",
    elements: ["Moc", "Moc", "Moc", "Thuy", "Tho"],
    score: 1650
  },
  {
    id: "ik-honganh",
    name: "Hồng Ảnh",
    primaryElement: "Moc",
    tier: "Hoàng Kim",
    description: "Bóng hạc bay lượn, tăng tốc chạy và né tránh đòn đánh diện rộng.",
    elements: ["Moc", "Moc", "Moc", "Kim", "Hoa"],
    score: 1660
  },
  {
    id: "ik-thuonglanghanh",
    name: "Thương Lãng Hành",
    primaryElement: "Moc",
    tier: "Hoàng Kim",
    description: "Tăng tốc độ di chuyển trên mặt nước và tăng chỉ số né đòn.",
    elements: ["Moc", "Moc", "Moc", "Thuy", "Thuy"],
    score: 1680
  },

  // --- NỘI CÔNG CHÍNH TÔNG DANH SÁCH 2 (ẢNH 2) ---
  {
    id: "ik-xunghu",
    name: "Xung Hư",
    primaryElement: "Kim",
    secondaryElement: "Hoa",
    tier: "Hoàng Kim",
    description: "Kỹ năng đơn mục tiêu gia tăng 14% sát thương, ngắt chiêu mục tiêu nếu đang niệm.",
    elements: ["Kim", "Kim", "Kim", "Hoa", "Thuy"],
    score: 1880
  },
  {
    id: "ik-diettran",
    name: "Diệt Trận",
    primaryElement: "Kim",
    secondaryElement: "Hoa",
    tier: "Hoàng Kim",
    description: "Song kiếm trảm phá trận pháp địch, tăng 15% sát thương lên mục tiêu đang dựng khiên chắn.",
    elements: ["Kim", "Kim", "Kim", "Hoa", "Hoa"],
    score: 1780
  },
  {
    id: "ik-tramtinh",
    name: "Trảm Tinh",
    primaryElement: "Hoa",
    tier: "Hoàng Kim",
    description: "Tích tụ kiếm khí hỏa diễm, chiêu thức kế tiếp tăng 30% sát thương bạo kích.",
    elements: ["Hoa", "Hoa", "Hoa", "Hoa", "Kim"],
    score: 1920
  },
  {
    id: "ik-kicsuy",
    name: "Kích Suy",
    primaryElement: "Hoa",
    secondaryElement: "Kim",
    tier: "Hoàng Kim",
    description: "Bắn ra mũi tên lửa suy nhược, giảm 12% khả năng hồi chiêu của đối phương.",
    elements: ["Hoa", "Hoa", "Kim", "Kim", "Tho"],
    score: 1720
  },
  {
    id: "ik-tubonloi",
    name: "Tụ Bôn Lôi",
    primaryElement: "Thuy",
    secondaryElement: "Kim",
    tier: "Hoàng Kim",
    description: "Tụ tụ sấm sét cuồn cuộn, khi đánh trúng gây tê liệt ngắn 0.5s.",
    elements: ["Thuy", "Thuy", "Kim", "Kim", "Moc"],
    score: 1740
  },
  {
    id: "ik-thedangvan",
    name: "Thế Đằng Vân",
    primaryElement: "Moc",
    tier: "Hoàng Kim",
    description: "Cưỡi mây vút gió, gia tăng cự ly nhảy và tốc độ xuất chiêu 10%.",
    elements: ["Moc", "Moc", "Moc", "Thuy", "Kim"],
    score: 1670
  },
  {
    id: "ik-tankimnguyen",
    name: "Tán Kim Nguyên",
    primaryElement: "Kim",
    tier: "Hoàng Kim",
    description: "Rót vàng luyện khí, tăng chỉ số tấn công tối đa thêm 80 điểm.",
    elements: ["Kim", "Kim", "Kim", "Tho", "Moc"],
    score: 1710
  },
  {
    id: "ik-lietkhondu",
    name: "Liệt Khôn Dư",
    primaryElement: "Tho",
    tier: "Hoàng Kim",
    description: "Rung chuyển mặt đất làm nứt nẻ địa mạch, giảm 20% tốc độ di chuyển của địch.",
    elements: ["Tho", "Tho", "Tho", "Hoa", "Kim"],
    score: 1660
  },
  {
    id: "ik-doankimgua",
    name: "Đoạn Kim Qua",
    primaryElement: "Kim",
    tier: "Hoàng Kim",
    description: "Mỗi giây tự ngưng tụ 1 tầng Kiếm Ý, tăng 2.5% tỉ lệ Hội Tâm.",
    elements: ["Kim", "Kim", "Kim", "Tho", "Hoa"],
    score: 1750
  },
  {
    id: "ik-diemminhlo",
    name: "Điểm Minh Lô",
    primaryElement: "Hoa",
    tier: "Hoàng Kim",
    description: "Tăng 80 điểm Khắc Chế Quái, thích hợp vượt Boss phó bản Anh Hùng.",
    elements: ["Hoa", "Hoa", "Hoa", "Tho", "Kim"],
    score: 1720
  },
  {
    id: "ik-napsonhai",
    name: "Nạp Sơn Hải",
    primaryElement: "Thuy",
    secondaryElement: "Tho",
    tier: "Hoàng Kim",
    description: "Dung nạp cả sông núi vào ngực, tăng 2,000 HP tối đa và 60 điểm nội thủ.",
    elements: ["Thuy", "Thuy", "Tho", "Tho", "Kim"],
    score: 1700
  },
  {
    id: "ik-chungvantrach",
    name: "Chung Vân Trạch",
    primaryElement: "Thuy",
    tier: "Hoàng Kim",
    description: "Mây đọng đầm lầy, hấp thụ 8% sát thương phép thuật nhận vào.",
    elements: ["Thuy", "Thuy", "Thuy", "Moc", "Tho"],
    score: 1650
  },
  {
    id: "ik-phatrongvan",
    name: "Phá Trọng Vân",
    primaryElement: "Moc",
    tier: "Hoàng Kim",
    description: "Cung thần xé toang mây mù, gia tăng tầm bắn kỹ năng thêm 2 mét.",
    elements: ["Moc", "Moc", "Moc", "Kim", "Hoa"],
    score: 1730
  },
  {
    id: "ik-phikien",
    name: "Phi Kiên",
    primaryElement: "Tho",
    tier: "Hoàng Kim",
    description: "Giáp vai kiên cố, giảm 10% sát thương đòn đánh chí mạng.",
    elements: ["Tho", "Tho", "Tho", "Kim", "Thuy"],
    score: 1630
  },
  {
    id: "ik-minhcangua",
    name: "Minh Can Qua",
    primaryElement: "Kim",
    secondaryElement: "Moc",
    tier: "Hoàng Kim",
    description: "Khi tấn công, có xác suất tăng 4% ST lên mục tiêu trong 5 giây (Hiệu quả tăng gấp đôi đối với quái vật), hồi chiêu 10 giây.",
    elements: ["Kim", "Kim", "Kim", "Kim", "Moc"],
    score: 2742,
    level: 25,
    subStats: [
      "Giới Hạn HP: +3119",
      "Tất Cả Nguyên Tố: +83",
      "Khắc Chế Boss: +69",
      "Tấn Công Tối Đa: +115",
      "Chí Mạng: +46",
      "Kháng Boss: +58",
      "Chính Xác: +45",
      "Tấn Công Tối Thiểu: +137"
    ]
  },
  {
    id: "ik-tramuyen",
    name: "Trầm Uyên",
    primaryElement: "Tho",
    tier: "Hoàng Kim",
    description: "Vực sâu thăm thẳm, tăng mạnh kháng hiệu ứng hất tung và choáng.",
    elements: ["Tho", "Tho", "Tho", "Thuy", "Kim"],
    score: 1680
  },
  {
    id: "ik-chuocsat",
    name: "Chước Sát",
    primaryElement: "Hoa",
    tier: "Hoàng Kim",
    description: "Phi tiêu thiêu đốt sinh lực mục tiêu, gây chảy máu kéo dài 5s.",
    elements: ["Hoa", "Hoa", "Hoa", "Hoa", "Kim"],
    score: 1740
  },
  {
    id: "ik-thonghuyen",
    name: "Thông Huyền",
    primaryElement: "Moc",
    tier: "Hoàng Kim",
    description: "Thông hiểu huyền cơ, tăng 50 điểm tất cả thuộc tính nguyên tố.",
    elements: ["Moc", "Moc", "Moc", "Thuy", "Tho"],
    score: 1710
  },
  {
    id: "ik-tractuyet",
    name: "Trạc Tuyết",
    primaryElement: "Thuy",
    tier: "Hoàng Kim",
    description: "Hoa sen rửa tuyết thanh tịnh, tự hóa giải 1 trạng thái suy nhược mỗi 15s.",
    elements: ["Thuy", "Thuy", "Thuy", "Thuy", "Moc"],
    score: 1720
  },
  {
    id: "ik-chungdieu",
    name: "Chúng Diệu",
    primaryElement: "Hoa",
    tier: "Hoàng Kim",
    description: "Bảo điển chứa đựng muôn vàn bí thuật, tăng 6% sát thương tuyệt chiêu.",
    elements: ["Hoa", "Hoa", "Hoa", "Kim", "Tho"],
    score: 1760
  },
  {
    id: "ik-dinhphong",
    name: "Định Phong",
    primaryElement: "Tho",
    tier: "Hoàng Kim",
    description: "Thạch bàn kiên cố cản gió cuồng nộ, tăng kháng ngã 25%.",
    elements: ["Tho", "Tho", "Tho", "Kim", "Moc"],
    score: 1670
  },
  {
    id: "ik-vongkinhxuyen",
    name: "Vọng Kính Xuyên",
    primaryElement: "Thuy",
    tier: "Hoàng Kim",
    description: "Băng kiếm xuyên thấu gương kính mờ ảo, tăng 12% chính xác và phá phòng.",
    elements: ["Thuy", "Thuy", "Thuy", "Kim", "Kim"],
    score: 1750
  },
  {
    id: "ik-nguthienson",
    name: "Ngự Thiên Sơn",
    primaryElement: "Tho",
    secondaryElement: "Kim",
    tier: "Hoàng Kim",
    description: "Trấn thủ núi trời, khi lượng máu dưới 35% lập tức nhận khiên hộ thể hấp thu 15% HP.",
    elements: ["Tho", "Tho", "Tho", "Kim", "Kim"],
    score: 1770
  },
  {
    id: "ik-hamkimkhuyet",
    name: "Hám Kim Khuyết",
    primaryElement: "Kim",
    tier: "Hoàng Kim",
    description: "Cung thần hoàng kim làm rung chuyển cửa ải, tăng 10% sát thương bạo kích tầm xa.",
    elements: ["Kim", "Kim", "Kim", "Kim", "Hoa"],
    score: 1780
  }
];

// Clean 10 Gear slots
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
      INNER_KUNGFU_DATABASE[0], // Minh Can Qua (4 Kim, 1 Mộc)
      INNER_KUNGFU_DATABASE[1], // Tỏa Phong (3 Kim, 2 Hỏa)
      INNER_KUNGFU_DATABASE[6], // Linh Tê (4 Kim, 1 Mộc)
      INNER_KUNGFU_DATABASE[7], // Phá Phủ (2 Kim, 3 Hỏa)
      INNER_KUNGFU_DATABASE[8], // Trảm Tinh (1 Kim, 4 Hỏa)
      INNER_KUNGFU_DATABASE[10] // Côn Ngô Đoạn Ngọc (5 Hỏa)
    ],
    targetResonance: ["Đãng Kiếm Dương Ba", "Côn Ngô Đoạn Ngọc", "Nhật Nguyệt Lưỡng Nghi"],
    totalPower: 89450
  }
];
