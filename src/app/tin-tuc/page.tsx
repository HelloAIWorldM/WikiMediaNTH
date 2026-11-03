'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TinTucRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/tin-tuc-nth');
  }, [router]);

  return (
    <div className="py-20 text-center font-mono text-xs text-ink-400">
      Đang chuyển hướng đến Tin Tức NTH...
    </div>
  );
}
