"use client";

import { memo } from "react";
import { X } from "lucide-react";

/**
 * AppModal - Enterprise-grade reusable modal component
 * Handles backdrop, close button, animations
 */

const AppModal = memo(function AppModal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
  showCloseButton = true,
}) {
  if (!isOpen) return null;

  const sizeMap = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity"
      onClick={onClose}
    >
      <div
        className={`${sizeMap[size]} w-full transform rounded-2xl bg-white p-6 shadow-xl transition-all`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          {title && <h2 className="text-xl font-bold text-gray-900">{title}</h2>}
          {showCloseButton && (
            <button
              onClick={onClose}
              className="ml-auto inline-flex items-center justify-center rounded-lg p-1 hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="mb-6 text-gray-700">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex gap-3 border-t border-gray-200 pt-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
});

AppModal.displayName = "AppModal";

export default AppModal;
