"use client";

import { memo } from "react";
import clsx from "clsx";

/**
 * AppCard - Enterprise-grade reusable card component
 * Base layout card with optional header, footer, clickable states
 */

const AppCard = memo(function AppCard({
  className = "",
  onClick,
  interactive = false,
  header,
  footer,
  children,
  ...props
}) {
  const cardClasses = clsx(
    "rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200",
    interactive && "hover:shadow-md hover:border-gray-300 cursor-pointer",
    onClick && "cursor-pointer hover:shadow-lg",
    className,
  );

  return (
    <div className={cardClasses} onClick={onClick} {...props}>
      {header && (
        <div className="border-b border-gray-200 px-4 py-3">
          {header}
        </div>
      )}

      <div className="px-4 py-4">
        {children}
      </div>

      {footer && (
        <div className="border-t border-gray-200 px-4 py-3">
          {footer}
        </div>
      )}
    </div>
  );
});

AppCard.displayName = "AppCard";

export default AppCard;
