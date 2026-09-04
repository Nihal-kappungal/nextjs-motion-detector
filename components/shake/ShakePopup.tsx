"use client";

import { useEffect, useRef } from "react";

interface ShakePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShakePopup({ isOpen, onClose }: ShakePopupProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    timerRef.current = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-6 left-1/2 z-50 -translate-x-1/2 rounded-full border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm font-medium text-zinc-100 shadow-lg motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-4"
    >
      Shake detected!
    </div>
  );
}
