"use client";

import { memo } from "react";

/**
 * AppLoader - Enterprise-grade loader component
 * Supports different sizes and labels
 */

const AppLoader = memo(function AppLoader({
  size = "md",
  label = "Loading...",
  fullScreen = false,
}) {
  const sizeMap = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
        <div className="flex flex-col items-center gap-3">
          <div
            className={`${sizeMap[size]} animate-spin rounded-full border-4 border-gray-300 border-t-orange-500`}
          />
          {label && <p className="text-sm font-medium text-gray-600">{label}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8">
      <div
        className={`${sizeMap[size]} animate-spin rounded-full border-4 border-gray-300 border-t-orange-500`}
      />
      {label && <p className="text-sm font-medium text-gray-600">{label}</p>}
    </div>
  );
});

AppLoader.displayName = "AppLoader";

export default AppLoader;
