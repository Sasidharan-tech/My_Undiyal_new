"use client";

import { memo } from "react";
import { AlertCircle } from "lucide-react";

/**
 * AppErrorState - Enterprise-grade error state component
 * Handles error displays with retry functionality
 */

const AppErrorState = memo(function AppErrorState({
  title = "Something went wrong",
  description,
  onRetry,
  icon: Icon = AlertCircle,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-red-200 bg-red-50 py-12 px-4">
      <Icon className="mb-3 h-12 w-12 text-red-500" />
      <h3 className="mb-1 text-lg font-semibold text-red-900">{title}</h3>
      {description && (
        <p className="mb-4 text-center text-sm text-red-700">{description}</p>
      )}
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
        >
          Try Again
        </button>
      )}
    </div>
  );
});

AppErrorState.displayName = "AppErrorState";

export default AppErrorState;
