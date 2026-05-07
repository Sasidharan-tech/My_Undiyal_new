"use client";

import { memo } from "react";

/**
 * AppEmptyState - Enterprise-grade empty state component
 * Handles empty data displays with icons and CTAs
 */

const AppEmptyState = memo(function AppEmptyState({
  icon: Icon,
  title = "No data found",
  description,
  action,
  actionLabel = "Take Action",
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 py-12 px-4">
      {Icon && (
        <Icon className="mb-3 h-12 w-12 text-gray-400" />
      )}
      <h3 className="mb-1 text-lg font-semibold text-gray-900">{title}</h3>
      {description && (
        <p className="mb-4 text-center text-sm text-gray-500">{description}</p>
      )}
      {action && (
        <button
          onClick={action}
          className="mt-4 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
});

AppEmptyState.displayName = "AppEmptyState";

export default AppEmptyState;
