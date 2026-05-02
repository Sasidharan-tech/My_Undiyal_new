"use client";

import { useEffect } from "react";

function getTargetLabel(target) {
  if (!(target instanceof Element)) {
    return "unknown";
  }

  const role = target.getAttribute("role");
  const ariaLabel = target.getAttribute("aria-label");
  const tag = target.tagName.toLowerCase();

  if (ariaLabel) {
    return `${tag}[aria-label=\"${ariaLabel}\"]`;
  }

  if (role) {
    return `${tag}[role=\"${role}\"]`;
  }

  if (target.id) {
    return `${tag}#${target.id}`;
  }

  return tag;
}

export default function MobileDebugLogger() {
  useEffect(() => {
    const isEnabled = process.env.NEXT_PUBLIC_MOBILE_DEBUG === "1";
    const isTouchDevice =
      typeof window !== "undefined" &&
      window.matchMedia?.("(pointer: coarse)")?.matches;

    if (!isEnabled || !isTouchDevice) {
      return;
    }

    const onPointerDown = (event) => {
      const label = getTargetLabel(event.target);
      console.debug("[mobile-debug] pointerdown", {
        target: label,
        x: Math.round(event.clientX),
        y: Math.round(event.clientY),
      });
    };

    const onClick = (event) => {
      const label = getTargetLabel(event.target);
      console.debug("[mobile-debug] click", { target: label });
    };

    const onError = (event) => {
      console.error("[mobile-debug] runtime-error", event.message, event.error);
    };

    const onUnhandledRejection = (event) => {
      console.error("[mobile-debug] unhandled-rejection", event.reason);
    };

    window.addEventListener("pointerdown", onPointerDown, {
      capture: true,
      passive: true,
    });
    window.addEventListener("click", onClick, {
      capture: true,
      passive: true,
    });
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onUnhandledRejection);

    return () => {
      window.removeEventListener("pointerdown", onPointerDown, true);
      window.removeEventListener("click", onClick, true);
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onUnhandledRejection);
    };
  }, []);

  return null;
}
