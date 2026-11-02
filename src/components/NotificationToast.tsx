'use client';

import { useSimulatorStore } from '@/store/useSimulatorStore';
import { Info, CheckCircle2 } from 'lucide-react';

export default function NotificationToast() {
  const notification = useSimulatorStore((state) => state.notificationMessage);

  if (!notification) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border border-gold/40 bg-ink-900/95 backdrop-blur-md text-ink-100 shadow-gold-glow animate-bounce-short">
      <CheckCircle2 className="w-5 h-5 text-gold-bright shrink-0" />
      <span className="text-xs sm:text-sm font-medium">{notification}</span>
    </div>
  );
}

