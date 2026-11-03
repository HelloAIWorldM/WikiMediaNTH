import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tin Tức NTH · Thông Tin Tin Tức Mới Nhất - Nghịch Thủy Hàn | Niên Du Hub',
  description:
    'Cổng cập nhật thông tin tin tức, sự kiện, thông báo bảo trì, phiên bản 2.1.1 và cẩm nang tân thủ Nghịch Thủy Hàn (Sword of Justice) VNG.',
};

export default function TinTucLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

