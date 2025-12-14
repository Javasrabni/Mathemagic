"use client";

import React, { useRef } from "react";
import ProgressPage from "@/app/dashboard/progress/page";

interface Props {
  onOpen: boolean;
  setOnOpen: (v: boolean) => void;
}

const OPEN_Y = 30; // 60% terlihat
const CLOSE_THRESHOLD = 120;

export default function OpenListMateri({ onOpen, setOnOpen }: Props) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const lastDiff = useRef(0);
  const dragging = useRef(false);

  /* ================= POINTER ================= */

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    startY.current = e.clientY;
    lastDiff.current = 0;

    sheetRef.current!.style.transition = "none";
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;

    const diff = Math.max(0, e.clientY - startY.current);
    lastDiff.current = diff;

    sheetRef.current!.style.transform =
      `translateY(calc(${OPEN_Y}vh + ${diff}px))`;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    dragging.current = false;

    sheetRef.current!.style.transition = "transform 800ms cubic-bezier(.22,1,.36,1)";

    if (lastDiff.current > CLOSE_THRESHOLD) {
      // ⬇️ lanjutkan ke bawah dari posisi TERAKHIR
      sheetRef.current!.style.transform = "translateY(100%)";

      // tunggu animasi selesai baru close state
      setTimeout(() => setOnOpen(false), 280);
    } else {
      // ⬆️ balik ke open position
      sheetRef.current!.style.transform = `translateY(${OPEN_Y}vh)`;
    }

    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  /* ================= RENDER ================= */

  return (
    <div
      ref={sheetRef}
      className="fixed inset-x-0 bottom-0 h-screen z-[150] bg-white rounded-t-3xl"
      style={{
        transform: onOpen ? `translateY(${OPEN_Y}vh)` : "translateY(100%)",
        transition: "transform 800ms cubic-bezier(.22,1,.36,1)",
        willChange: "transform",
      }}
    >
      {/* HANDLE (gesture only) */}
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        className="py-4 cursor-grab active:cursor-grabbing touch-none select-none"
      >
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto" />
      </div>

      {/* CONTENT */}
      <div className="h-[calc(100%-56px)] overflow-y-auto overscroll-contain px-4 pb-10">
        <ProgressPage />
      </div>
    </div>
  );
}
