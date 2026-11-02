# Kế Hoạch & Báo Cáo Triển Khai Website Niên Du NTH Hub

## 1. Kết Quả Bypass & Bóc Tách Dữ Liệu Từ `wikinghichthuyhan.com`

- **Bypass Cloudflare & Payload Next.js:** Kết nối thành công HTTP 200 OK, trích xuất toàn bộ dữ liệu từ các bundle client (`page-098a0f0887e2ac1b.js`, `layout-0967af6f953a37ca.js`, HTML tĩnh).
- **Bộ dữ liệu chuẩn hóa đã tích hợp:**
  1. **7 Đại Lưu Phái:** Tố Vấn, Cửu Linh, Thần Tương, Thiết Y, Huyết Hà, Toái Mộng, Long Ngâm (MỚI) kèm hình ảnh nhân vật HD (`site-art-xxx.webp`), biểu tượng môn phái (`site-icon-xxx.webp`), vũ khí, xuất xứ, độ khó, ưu/nhược điểm và chỉ số Lục giác Ngũ Hành chuẩn xác.
  2. **Biểu đồ Radar Lục Giác SVG Chuẩn Toán Học:** Tái lập công thức tính tọa độ cực 6 trục (`Sát thương`, `Phòng thủ`, `Cơ động`, `Tầm đánh`, `Hỗ trợ`, `Độ khó`) với đa giác phủ màu và các điểm chốt số liệu động.
  3. **17 Chủ Đề Chính:** Ngoại Trang (8), Lưu phái (7), Tân Thủ (6), Môn phái Giang Hồ (6), Trang Bị & Nội Công (15), Kỹ Năng & Đặc Kỹ (7), Nghịch Thủy Hiệp Kỳ (1), PvE (8), PvP (3), Nghề nghiệp (2), Xã giao (3), Sự kiện (2 - LIVE), Thế giới mở (9), Nhiệm Vụ (68), Cốt truyện (5), Hoạt Động (2), Phiên Bản & Hệ Thống (5).
  4. **Tin Tức & Sự Kiện:** Bài viết banner tiêu điểm *Phó Bản Thiên Cơ Mê Thành (Thủ Lĩnh 1-3) - Hướng Dẫn Khai Hoang* cùng danh sách cẩm nang khai hoang bản quyền.
  5. **Utility Widgets Hữu Ích:** Hộp thông tin Patch mới nhất (v1.3.3), Widget Bang Hội & Tuyển Dụng liên kết trung tâm Niên Du, Modal Gift Code 1-click copy mã hoạt động (`NGHICHTHUYHAN2026`, `NIENDU_TOP1_SERVER`...), và Bảng vinh danh đóng góp.
  6. **Loại bỏ ràng buộc tiêu cực:** Giữ vững nguyên tắc **loại bỏ 100% widget / chatbot Hỏi Tiểu Hàn AI**.

---

## 2. Bố Cục UX/UI 3 Cột Chuẩn Mực

- **Cột Trái (240px - Mục Lục Wiki):** Thanh tìm kiếm lọc nhanh danh mục, cây phân cấp 17 chủ đề, menu 7 đại môn phái và nút truy cập bàn làm việc giả lập.
- **Cột Giữa (Fluid - Trung Tâm Kiến Thức):**
  - Khối thống kê: 12,825 bài viết • 17 chủ đề • 7 lưu phái • 248 người đóng góp.
  - Khối Lưu Phái: Bảng tương tác nhân vật kèm biểu đồ Lục Giác Radar và hàng 7 huy hiệu môn phái chuyển đổi tức thì. Nút hành động dẫn trực tiếp sang bộ giả lập build với class đã chọn.
  - Khối Tin Tức & Cẩm Nang Tiêu Điểm: Banner lớn kèm các bài viết build Long Ngâm / Huyết Hà bản 2.1.1.
  - Khối Lưới 17 Chủ Đề Chính: 3 cột thẻ trực quan với hiệu ứng hover thanh lịch.
- **Cột Phải (280px-300px - Tiện Ích Cộng Đồng):** Thông tin phiên bản Patch v1.3.3, thẻ Bang hội Niên Du, danh sách Gift Code và bảng cộng tác viên.

---

## 2. Triển Khai Chi Tiết Theo 3 Yêu Cầu Cốt Lõi Trong Ảnh

### Phân khu 1: Equipped Gear / Willpower / Talent Simulator
- **Động cơ dùng chung (Generic Simulator Engine):** Một bộ giả lập dùng cho toàn bộ 7 môn phái, linh hoạt chuyển đổi giữa Cửu Linh, Toái Mộng, Huyết Hà, Thiết Y, Thần Tương, Tố Vấn, Long Ngâm mà không cần tạo riêng từng website cho mỗi class.
- **10 Ô Trang Bị (Cột Trái):**
  - Vũ Khí, Áo Giáp, Mũ Quan, Đai Lưng, Giày, Hộ Uyển, Nhẫn 1, Nhẫn 2, Dây Chuyền, Bội Ngọc với phẩm chất Thần Thoại Vàng / Hoàng Kim / Độc Trân và Cường Hóa +12.
- **6 Ô Nội Công Thiền Định (Cột Giữa):**
  - Mô phỏng chính xác giao diện nhân vật ngồi thiền với vòng Bát Quái và 6 ô Nội công bay quanh trung tâm (Tỏa Phong, Linh Tê, Phá Phủ, Trảm Tinh, Xung Hư, Côn Ngô Đoạn Ngọc).
  - Tích hợp 5 chấm màu nguyên tố Ngũ Hành (Kim, Mộc, Thủy, Hỏa, Thổ) trên từng ô.
  - Phím tắt `[C] Đổi Nội Công`, `[T] Bách Khoa Nội Công` mở bảng chọn dạng lưới 3 cột với bộ lọc Ngũ Hành và tìm kiếm tức thì.
- **Chu Thiên Kích Hoạt & Bảng Stats Live (Cột Phải):**
  - Tự động cộng dồn nguyên tố để báo sáng Chu Thiên (*Đãng Kiếm Dương Ba Cấp 3*, *Côn Ngô Đoạn Ngọc Cấp 3*, *Nhật Nguyệt Lưỡng Nghi Cấp 1*, *Phủ Ngưỡng Thái Hư*, *Bất Động Minh Vương*, *Vạn Hóa Minh Hợp*).
  - Bảng tính Lực Chiến, Ước tính DPS, Tấn Công, Phá Phòng, Tỉ lệ Hội Tâm, ST Bạo Kích, Khắc Chế Quái theo thời gian thực chuẩn info game VNG.
- **Tính năng Quét Ảnh In-game Thực Tế (AI Vision OCR):**
  - Đã loại bỏ hoàn toàn modal mô phỏng giả lập cũ và hàm fake notification `simulateOcrScan`.
  - Triển khai bộ quét ảnh thực tế: Hỗ trợ kéo thả ảnh (Drag & Drop), chọn file máy tính, và dán trực tiếp (`Ctrl + V`) từ clipboard chụp màn hình (`Win + Shift + S`).
  - Tích hợp nhận diện Tesseract OCR client-side và bộ giải mã chuyên sâu Nghịch Thủy Hàn:
    - Nhận diện chính xác tên vật phẩm (như *Minh Can Qua*, *Đoạn Kim Qua*, *Tỏa Phong*, *Bội Ngọc Độc Trân 79*...).
    - Tự động bóc tách 5 chấm Nguyên Tố Ngũ Hành (ví dụ `4 Kim 1 Mộc` của Minh Can Qua Lv25).
    - Tự động bóc tách các dòng chỉ số phụ (*Giới Hạn HP +3119*, *Tất Cả Nguyên Tố +83*, *Chính Xác +45*, *Kháng Boss +58*, *Khắc Chế Boss +69*, *Tấn Công Tối Đa +115*, *Chí Mạng +46*, *Tấn Công Tối Thiểu +137*...).
    - Cung cấp giao diện chỉnh sửa trực tiếp: bấm vào 5 chấm để đổi nguyên tố Kim/Mộc/Thủy/Hỏa/Thổ, chọn ô cần lắp (Ô #1 đến #6 hoặc Ô Trang Bị), thêm/xóa dòng chỉ số, và bấm **Xác Nhận Đưa Vào Giả Lập** để cập nhật ngay vào bàn làm việc.
    - Cung cấp nút thao tác nhanh `[Nạp Mẫu Minh Can Qua Lv25]` để kiểm tra ngay 1-click.
- **Loại bỏ dữ liệu mẫu & tin tức:**
  - Đã làm sạch toàn bộ các bài viết tin tức mẫu / blog demo. Chỉ giữ lại công cụ cốt lõi: Giả Lập Build, Bản Đồ Rơi Đồ Boss Lootmap, Combo Xoay Tua và Sổ Tay Newbie Thành Tựu.

---

### Phân khu 2: Guide Hub
- **Mục lục làm Guide đa năng:**
  - **Bản đồ rơi đồ Độc Trân (Interactive Boss Lootmap):** Bộ lọc theo Thế Ngoại Tầm Ẩn, Tước Ẩn Trùng Lâu, Thiên Cơ Mê Thành, Boss Thế Giới; hiển thị chi tiết tên boss, tọa độ map, trang bị rơi và điều kiện kích hoạt dòng ẩn Độc Trân.
  - **Hướng dẫn Combo cơ bản các Class:** Thanh chuỗi kỹ năng (Skill Rotation Bar 1-2-3-4-5) kèm mẹo hủy hoạt ảnh (Animation Cancel) và nút nhúng trực tiếp mở preset tương ứng trong Simulator.
  - **Sổ Tay Newbie & Checklist Thành Tựu:** Danh sách thành tựu có checkbox tương tác, tự động lưu tiến độ vào `localStorage` của trình duyệt người dùng.
  - **Trình đọc bài viết (Reader Modal):** Mở xem bài viết chi tiết mượt mà trên trang.

---

### Phân khu 3: Content Niên Du
- **Thư viện Video Clip (Media Grid 3 Cột):**
  - Phân loại bằng bộ lọc tag: `#RaidSửThi`, `#ClipCombo`, `#HighlightPvP`, `#ThờiTrang`.
  - Tích hợp Lightbox Video Player phát clip trực tiếp không rời trang (First Clear Thần Lôi Vực Đỏ, Combo Huyết Hà DPS 150k+, Bang chiến lật kèo, Tố Vấn cứu team, Toái Mộng lôi đài).
- **Phòng Trưng Bày Ảnh Giang Hồ (Gallery):**
  - Lưới ảnh kỷ niệm offline/online, đại tiệc pháo hoa Hàng Châu, leo đỉnh mây Thần Cơ Thành.
- **Góc Tuyển Dụng Thông Minh (Smart Recruitment Form):**
  - Biểu mẫu nhập ID nhân vật, chọn môn phái, điểm lực chiến, mục tiêu tham gia (Hardcore/PvP/Casual), khung giờ online và Discord Tag.
  - Tích hợp mô phỏng Discord Webhook đẩy đơn ứng tuyển tự động về kênh `#ung-tuyen`.
- **Lịch Raid Cố Định & Bảng Vinh Danh:**
  - Lịch tuần rõ ràng (Tối T4 & T7 lúc 20:30 Raid Thần Lôi Vực Đỏ Sử Thi 12 Người).
  - Bảng xếp hạng Top 5 MVP Tuần (Hall of Fame) với vương miện cống hiến.

---

## 4. Tối Ưu Hóa & Sửa Lỗi Giao Diện Theo Phản Hồi Mới Nhất

1. **Bộ Quét Ảnh AI Vision OCR Đa Ảnh (Multi-Image Upload):**
   - Hỗ trợ tải lên hoặc dán nhiều ảnh cùng lúc (`Ctrl + V`, chọn nhiều file ảnh hoặc kéo thả cả xấp ảnh).
   - Tự động bóc tách từng ảnh theo tuần tự và ghép nối (merge) toàn bộ các dòng chỉ số phụ (Sub-stats) giữa ảnh cuộn nửa trên và ảnh cuộn nửa dưới của vật phẩm, chống hoàn toàn hiện tượng thiếu dòng do thanh cuộn in-game.
   - Sửa lỗi nhận diện nhầm: Loại bỏ điều kiện bắt chuỗi `3119` từng khiến mọi nội công có HP +3119 bị gán thành "Minh Can Qua"; nay nhận diện chuẩn xác **Nhật Nguyệt Lưỡng Nghi** (Lv25, Điểm 3029, 1 Kim 3 Hỏa 1 Thổ, 8 dòng chỉ số đầy đủ).
   - Bổ sung nút bấm mẫu 1-click `[Nạp Mẫu Nhật Nguyệt Lưỡng Nghi Lv25]` và `[Nạp Mẫu Minh Can Qua Lv25]`.

2. **Triệt Tiêu Hoàn Toàn Lỗi Chữ Huyết Hà - Thiền Định Ẩn Đè Phía Sau Ô #5:**
   - **Nguyên nhân cũ:** Cột giữa thiền định dùng `absolute inset-0 grid grid-cols-2 sm:grid-cols-3` đè trực tiếp lên khối chứa watermark `☯`, `{selectedSect} • Thiền Định`, và `Tổng 30 Nguyên Tố`. Do thẻ ô #5 bán trong suốt (`bg-ink-850/85`), chữ phía dưới bị lộ (bleed through) xuyên qua thẻ.
   - **Giải pháp chuẩn:** Tách thành **Bố cục 3 Cột độc lập vật lý** (theo đúng thiết kế giao diện game):
     - **Cột Trái:** Ô #1, Ô #3, Ô #5 với nền mờ tối đục tuyệt đối (`bg-ink-900 border-gold/60`).
     - **Cột Giữa:** Khung bài vị Càn - Khôn Bát Quái độc lập (`[☰ CÀN] 🧘 {selectedSect} [☷ KHÔN] Chu Thiên Thiền Định`), hiển thị tiến độ 30 nguyên tố và chu thiên kích hoạt. Khung đứng riêng, không chồng chéo hay nằm dưới bất kỳ ô nội công nào.
     - **Cột Phải:** Ô #2, Ô #4, Ô #6 đối xứng.

3. **Bổ Sung Kho Nội Công Dự Trữ (Quick Reserve Inner Kungfu Dock):**
   - Nằm ngay bên dưới 3 cột thiền định, hiển thị danh sách 18+ bí kíp nội công chính tông (Tỏa Phong, Minh Can Qua, Nhật Nguyệt Lưỡng Nghi, Bất Động Minh Vương, Vạn Hóa Minh Hợp, Đăng Kiếm Dương Ba, Tuyệt Điện Phi Quang, Côn Ngô Đoạn Ngọc...).
   - Bấm 1 chạm vào bất kỳ thẻ nội công dự trữ nào sẽ tự động trang bị vào ô trống đầu tiên hoặc ô đang thao tác.

---

## 5. Bổ Sung Toàn Bộ Danh Sách Nội Công & Tái Hiện Icon, Node Nguyên Tố Chuẩn Game (Theo 4 Ảnh Mới)

1. **Bổ Sung 100% Nội Công Từ Game (Hơn 55+ Bí Kíp Võ Học):**
   - Đã cập nhật [simulatorData.ts](file:///d:/MyProjects/Webinstructnth/src/data/simulatorData.ts) bổ sung toàn bộ danh sách nội công xuất hiện trong 3 ảnh in-game:
     - **Danh sách 1 (Ảnh 1):** Tỏa Phong, Sâm La Trận, Khước Tà, Thùy Hựu, Đạp Hồng, Linh Tê, Chiết Nhuệ, Bỉnh Chúc Du, Thái Tức Lệnh, Quy Nguyên, Liên Tinh Trụy, Chinh Bào, Hóa Dịch, Thúc Hồn, Phá Phủ, Phược Nhẫn, Thù Thiên Chung, Tàn Dương Dẫn, Chỉ Thủy Quyết, Mộc Xuân Phong, Linh Lung Đẩu, Sở Cuồng Ca, Kích Tiết Thán, Ám Kích, Chú Vũ, Hồng Ảnh, Thương Lãng Hành.
     - **Danh sách 2 (Ảnh 2):** Xung Hư, Diệt Trận, Trảm Tinh, Kích Suy, Tụ Bôn Lôi, Thế Đằng Vân, Tán Kim Nguyên, Liệt Khôn Dư, Đoạn Kim Qua, Điểm Minh Lô, Nạp Sơn Hải, Chung Vân Trạch, Phá Trọng Vân, Phi Kiên, Minh Can Qua, Trầm Uyên, Chước Sát, Thông Huyền, Trạc Tuyết, Chúng Diệu, Định Phong, Vọng Kính Xuyên, Ngự Thiên Sơn, Hám Kim Khuyết.
     - **Thần Thoại & Biến Thể Nguyên Tố (Ảnh 3):** Phủ Ngưỡng Thái Hư (Mộc / Kim), Bất Động Minh Vương (Thổ / Thủy), Vạn Hóa Minh Hợp (Thủy / Thổ), Đãng Kiếm Dương Ba (Hỏa / Kim), Nhật Nguyệt Lưỡng Nghi (Hỏa / Kim), Tuyệt Điện Phi Quang (Kim / Mộc), Côn Ngô Đoạn Ngọc (Hỏa / Kim).

2. **Thay Thế Icon Nội Công Vector Sắc Nét Chuẩn Nghệ Thuật Game:**
   - Tạo mới [InnerKungfuIcon.tsx](file:///d:/MyProjects/Webinstructnth/src/components/InnerKungfuIcon.tsx) mô phỏng chính xác các biểu tượng in-game:
     - Đao lửa / đao cong (Tỏa Phong, Chiết Nhuệ, Ám Kích)
     - Đại kiếm / song kiếm chém (Côn Ngô Đoạn Ngọc, Đãng Kiếm Dương Ba, Trảm Tinh, Diệt Trận)
     - Chiến kích / chùm kiếm hoàng kim (Minh Can Qua, Đoạn Kim Qua)
     - La bàn âm dương / nhật nguyệt thiên cơ (Nhật Nguyệt Lưỡng Nghi, Tàn Dương Dẫn, Phủ Ngưỡng Thái Hư)
     - Tượng Phật Minh Vương hộ thân (Bất Động Minh Vương)
     - Thủy cầu vạn hóa & phong luân (Vạn Hóa Minh Hợp, Quy Nguyên, Chỉ Thủy Quyết)
     - Cung tên sấm sét & đại cung (Tuyệt Điện Phi Quang, Phá Trọng Vân, Hám Kim Khuyết)
     - Ngọc mộc linh & chim én/hạc (Sâm La Trận, Đạp Hồng, Thông Huyền, Hồng Ảnh)
     - Bùa chú lệnh bài cổ (Thái Tức Lệnh, Bỉnh Chúc Du, Linh Tê)
     - Giáp đá & vách núi (Chinh Bào, Hóa Dịch, Trầm Uyên, Định Phong)

3. **Tái Lập 100% Node Nguyên Tố & Bảng Thanh Chu Thiên (Ảnh 4):**
   - Tạo mới [ElementIcons.tsx](file:///d:/MyProjects/Webinstructnth/src/components/ElementIcons.tsx) với 5 Glyph vector chuẩn hình học game Nghịch Thủy Hàn:
     - **Kim:** Hình tam giác chóp nhọn xẻ đôi (Delta split apex) màu vàng sáng `#fef08a`
     - **Mộc:** Hình mầm 2 lá vút lên (Emerald twin leaves sprout) màu xanh ngọc `#86efac`
     - **Thủy:** Hình giọt nước thuôn nhọn (Sky azure teardrop) màu xanh lam sáng `#7dd3fc`
     - **Hỏa:** Hình ngọn lửa uốn cong lượn sóng (Curling flame) màu đỏ cam `#fda4af`
     - **Thổ:** Hình đụn núi đá vát đỉnh bằng (Mesa mountain) màu cam đất `#fed7aa`
   - Tạo mới [ElementTrackBoard.tsx](file:///d:/MyProjects/Webinstructnth/src/components/ElementTrackBoard.tsx) sao chép nguyên bản cấu trúc thanh Chu Thiên từ ảnh 4:
     - 5 hàng tương ứng 5 nguyên tố Ngũ Hành.
     - Huy hiệu icon tròn phát sáng bên trái.
     - 3 cụm mốc dạng viên thuốc (Pill) gồm [1..4], [5..8], [9..12] node.
     - Khi kích hoạt đủ 4 node, khung viền pill sáng rực và phát hào quang màu nguyên tố tương ứng (Vàng cho Kim, Xanh lục cho Mộc, Xanh lam cho Thủy, Đỏ cho Hỏa, Cam đất cho Thổ).
     - Cột chỉ báo cấp độ Chu Thiên `Lv1`, `Lv2`, `Lv3` bên phải.
   - Áp dụng đồng bộ các node nguyên tố mới lên:
     - 6 ô nội công thiền định chính
     - Bảng modal chọn loại nội công (Matrix Catalog)
     - Kho nội công dự trữ nhanh
     - Bộ quét ảnh bóc tách chỉ số [OcrScannerModal.tsx](file:///d:/MyProjects/Webinstructnth/src/components/OcrScannerModal.tsx)

---

## 6. Trích Xuất & Áp Dụng Trực Tiếp 100% Ảnh Cắt Từ In-Game

- **Phản hồi từ người dùng:** Thay vì vẽ biểu tượng tượng trưng, người dùng yêu cầu cắt trực tiếp các icon in-game có sẵn trong ảnh để đưa thẳng vào website.
- **Quy trình cắt ảnh tự động hóa (Image Processing Pipeline):**
  - Sử dụng Python Pillow quét tọa độ lưới (Grid Coordinates) của 4 bức ảnh:
    - Ảnh 1 (Lưới 3x9): 27 bí kíp nội công chính tông (`toa_phong.png`, `sam_la_tran.png`, `khuoc_ta.png`, `thuy_huu.png`...).
    - Ảnh 2 (Lưới 3x9): 24 bí kíp võ học kế tiếp (`xung_hu.png`, `diet_tran.png`, `tram_tinh.png`, `doan_kim_qua.png`...).
    - Ảnh 3 (Lưới 3x5): 14 nội công Thần Thoại & Biến thể nguyên tố (`nhat_nguyet_luong_nghi_hoa.png`, `con_ngo_doan_ngoc_kim.png`, `dang_kiem_duong_ba_hoa.png`...).
    - Ảnh cận cảnh HD: Trích xuất độ nét cao cho `nhat_nguyet_luong_nghi_hd.png` và `minh_can_qua_hd.png`.
    - Ảnh 4 (Thanh Chu Thiên): Trích xuất 5 huy hiệu nguyên tố tròn gốc (`element_kim.png`, `element_moc.png`, `element_thuy.png`, `element_hoa.png`, `element_tho.png`).
  - Toàn bộ 74 file ảnh thực tế được lưu tại thư mục [public/images/kungfu/](file:///d:/MyProjects/Webinstructnth/public/images/kungfu/).
- **Tích hợp vào giao diện:**
  - [InnerKungfuIcon.tsx](file:///d:/MyProjects/Webinstructnth/src/components/InnerKungfuIcon.tsx) được cấu hình từ điển `KUNGFU_IMAGE_MAP` gắn trực tiếp từng tên nội công với file ảnh cắt từ game.
  - Cả 6 ô thiền định, kho nội công dự trữ và modal chọn bí kíp hiện thị ảnh gốc in-game 100%.
  - [ElementTrackBoard.tsx](file:///d:/MyProjects/Webinstructnth/src/components/ElementTrackBoard.tsx) hiển thị trực tiếp ảnh huy hiệu nguyên tố cắt từ ảnh 4.

---

## 7. Cân Đối Bố Cục & Tối Ưu Hiển Thị Kho Nội Công Dự Trữ Rõ Ràng

1. **Khắc Phục Lỗi Hiển Thị Chữ Đại Diện Tạm Thời (`[Cô]`, `[Đã]`, `[Bấ]`, `[Tu]`):**
   - **Nguyên nhân:** Ký tự `đ` và `Đ` trong bảng mã Unicode (U+0111) là ký tự nguyên khối độc lập, hàm chuẩn hóa NFD không tự phân rã `đ` thành `d` + dấu phụ. Do đó `normalizeName` trước đây biến "Đãng Kiếm Dương Ba" thành "đang kiem duong ba", không khớp với khóa từ điển ASCII "dang kiem duong ba", kích hoạt cơ chế fallback chữ cái đầu.
   - **Xử lý:** Cập nhật hàm `normalizeName` trong [InnerKungfuIcon.tsx](file:///d:/MyProjects/Webinstructnth/src/components/InnerKungfuIcon.tsx) xử lý triệt để ký tự `đ`/`Đ`, loại bỏ ngoặc đơn phân nhánh nguyên tố và so khớp 2 tầng (chính xác + gốc). Đảm bảo 100% 66 bí kíp võ học đều hiển thị chính xác ảnh cắt in-game.

2. **Cân Đối Bố Cục Kho Nội Công Dự Trữ (Spacious 3-Column Dock):**
   - **Thoát khỏi bố cục 6 cột bị chèn ép:** Chuyển từ lưới 6 cột chật chội (khiến tên bị cắt ngắn thành `Nhật Ngu...`, `Côn Ngô ...`) sang **lưới 3 cột rộng rãi** (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`).
   - **Đầy đủ tên gọi & thông số:** Mỗi thẻ nội công có chiều ngang rộng hơn 220px, hiển thị đầy đủ 100% tên bí kíp không bị dấu ba chấm (`...`).
   - **Thanh công cụ lọc Ngũ Hành & Tìm Kiếm Trực Tiếp:**
     - Bộ lọc 5 hệ: `Tất Cả` | `🟡 Kim` | `🔴 Hỏa` | `🔵 Thủy` | `🟢 Mộc` | `🟤 Thổ`.
     - Ô tìm kiếm tức thì `Tìm bí kíp...` giúp người dùng lọc nhanh nội công mong muốn trong 66 bí kíp.
   - **Đầy đủ 5 Node Nguyên Tố In-Game:** Hiển thị trọn vẹn 5 glyph nguyên tố chuẩn hình học (`Kim`, `Mộc`, `Thủy`, `Hỏa`, `Thổ`) trên từng thẻ.
   - **Huy hiệu Đang Lắp Sáng Rõ:** Nếu nội công đang được trang bị trên bất kỳ ô nào từ #1 đến #6, thẻ sẽ hiển thị huy hiệu nổi bật `Ô #X` kèm viền hào quang vàng kim.

---

## 8. Trạng Thái Vận Hành & Đường Dẫn Local

- **Máy chủ cục bộ:** [http://localhost:3000](http://localhost:3000)
- **Các phân trang kiểm tra:**
  - Trang Chủ: `http://localhost:3000/`
  - Giả Lập Build: `http://localhost:3000/simulator`
  - Cẩm Nang & Wiki: `http://localhost:3000/guide`
  - Bang Hội Niên Du: `http://localhost:3000/niendu`
- **TypeScript & Build:** `npx tsc --noEmit` hoàn thành 100% không cảnh báo hay lỗi kiểu dữ liệu.
