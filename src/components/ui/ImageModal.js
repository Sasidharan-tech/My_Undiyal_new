"use client";

import { useEffect, useRef, useState } from "react";

export default function ImageModal({ src, alt, onClose }) {
  const containerRef = useRef(null);
  const lastRef = useRef(null);
  const lastTap = useRef(0);
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  function clamp(v, a, b) {
    return Math.max(a, Math.min(b, v));
  }

  function distance(t1, t2) {
    const dx = t2.clientX - t1.clientX;
    const dy = t2.clientY - t1.clientY;
    return Math.hypot(dx, dy);
  }

  function handleTouchStart(e) {
    if (!e.touches) return;
    if (e.touches.length === 2) {
      const d = distance(e.touches[0], e.touches[1]);
      lastRef.current = { mode: "pinch", startDistance: d, startScale: scale };
    } else if (e.touches.length === 1) {
      const t = e.touches[0];
      lastRef.current = { mode: "pan", startX: t.clientX, startY: t.clientY, startTranslate: { ...translate } };
    }
  }

  function handleTouchMove(e) {
    if (!lastRef.current) return;
    if (lastRef.current.mode === "pinch" && e.touches.length === 2) {
      const d = distance(e.touches[0], e.touches[1]);
      const ratio = d / lastRef.current.startDistance;
      const next = clamp(lastRef.current.startScale * ratio, 1, 4);
      setScale(next);
    } else if (lastRef.current.mode === "pan" && e.touches.length === 1) {
      if (scale <= 1) return;
      const t = e.touches[0];
      const dx = t.clientX - lastRef.current.startX;
      const dy = t.clientY - lastRef.current.startY;
      setTranslate({ x: lastRef.current.startTranslate.x + dx, y: lastRef.current.startTranslate.y + dy });
    }
  }

  function handleTouchEnd(e) {
    if (!e.touches || e.touches.length === 0) {
      lastRef.current = null;
      if (scale < 1) {
        setScale(1);
        setTranslate({ x: 0, y: 0 });
      }
    }
  }

  function handleDoubleTap() {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      if (scale > 1) {
        setScale(1);
        setTranslate({ x: 0, y: 0 });
      } else {
        setScale(2);
      }
    }
    lastTap.current = now;
  }

  function handleWheel(e) {
    e.preventDefault();
    const delta = -e.deltaY * 0.0015;
    setScale((s) => clamp(s + delta, 1, 4));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={onClose}>
      <div className="relative max-w-full max-h-full p-4" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          aria-label="Close image"
          onClick={onClose}
          className="absolute right-2 top-2 z-10 inline-flex items-center justify-center rounded-full bg-white/90 p-2 text-sm text-gray-700"
        >
          ✕
        </button>

        <div
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onDoubleClick={handleDoubleTap}
          onWheel={handleWheel}
          style={{ touchAction: "none" }}
          className="flex max-w-[90vw] max-h-[90vh] items-center justify-center overflow-hidden"
        >
          <img
            src={src}
            alt={alt}
            draggable={false}
            style={{ transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`, transition: "transform 0.04s" }}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
