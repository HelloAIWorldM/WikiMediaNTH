import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thần Khí · Thiên Cơ Ngọc Hạch - Nghịch Thủy Hàn | Niên Du Hub',
  description:
    'Giả lập và tra cứu bàn Thần Khí Thiên Cơ Ngọc Hạch 8 Lưu Phái (Toái Mộng, Thiết Y, Huyền Cơ, Huyết Hà, Thần Tướng, Tố Vấn, Long Ngâm, Cửu Linh) - Phiên bản 2.1.1 Nghịch Thủy Hàn.',
};

export default function ThienCoNgocHachLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

