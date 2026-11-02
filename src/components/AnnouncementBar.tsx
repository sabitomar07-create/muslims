import React from 'react';
import { Sparkles } from 'lucide-react';

interface AnnouncementBarProps {
  text: string;
}

export function AnnouncementBar({ text }: AnnouncementBarProps) {
  return (
    <aside aria-label="Store Announcement" className="bg-[#121214] border-b border-[#222226] text-xs uppercase tracking-widest text-[#d4d4d8] py-2.5 px-4 overflow-hidden relative z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-center">
        <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0 animate-pulse" />
        <span className="font-semibold text-white tracking-wider text-[11px] sm:text-xs">
          {text || 'NEW DROP: THE TAWHID & SABR CHAPTER 1 — FREE EXPRESS SHIPPING OVER 1200 EGP'}
        </span>
        <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0 hidden sm:inline animate-pulse" />
      </div>
    </aside>
  );
}
