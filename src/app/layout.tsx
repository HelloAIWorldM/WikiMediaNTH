import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import NotificationToast from "@/components/NotificationToast";
import OcrScannerModal from "@/components/OcrScannerModal";

export const metadata: Metadata = {
  title: "Niên Du NTH Hub - Cẩm Nang, Giả Lập Build & Cộng Đồng Nghịch Thủy Hàn",
  description: "Cổng thông tin chuyên sâu Nghịch Thủy Hàn (Justice Mobile) - Bộ giả lập Trang bị, Nội công, Chu thiên, Bản đồ rơi đồ Độc trân, và Trung tâm Bang hội Niên Du.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="dark">
      <body className="bg-ink-950 text-ink-100 flex flex-col min-h-screen antialiased selection:bg-gold selection:text-ink-950">
        <Navbar />
        <main className="flex-1 w-full max-w-[1680px] mx-auto px-3 sm:px-6 py-4">
          {children}
        </main>
        <NotificationToast />
        <OcrScannerModal />
        <footer className="w-full border-t border-gold/15 bg-ink-950/90 py-6 text-center text-xs text-ink-400">
          <div className="max-w-[1600px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-serif text-gold font-bold">NIÊN DU NTH HUB</span>
              <span>•</span>
              <span>Cộng đồng Nghịch Thủy Hàn Việt Nam</span>
            </div>
            <div className="text-ink-400">
              Bản quyền nội dung thuộc về Bang Hội Niên Du. Trang bị & Dữ liệu game thuộc bản quyền NetEase & VNG Games.
            </div>
            <div className="flex items-center gap-4 text-ink-300">
              <span className="text-gold/80 font-mono">Patch v1.3.3</span>
              <a href="/guide" className="hover:text-gold transition-colors">Cẩm Nang</a>
              <a href="/simulator" className="hover:text-gold transition-colors">Giả Lập</a>
              <a href="/thien-co-ngoc-hach" className="hover:text-gold transition-colors text-gold">Thiên Cơ Ngọc Hạch</a>
              <a href="/tin-tuc-nth" className="hover:text-gold transition-colors text-amber-300">Tin Tức NTH</a>
              <a href="/niendu" className="hover:text-gold transition-colors">Niên Du Hub</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
