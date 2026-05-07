"use client";

import { memo, forwardRef } from "react";
import clsx from "clsx";

/**
 * AppButton - Enterprise-grade reusable button component
 * Supports all button variants, sizes, states
 */

const VARIANTS = {
  primary: "bg-linear-to-r from-orange-500 to-amber-500 text-white hover:opacity-90",
  secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
  outline: "border-2 border-orange-500 text-orange-500 hover:bg-orange-50",
  ghost: "text-gray-700 hover:bg-gray-100",
  danger: "bg-red-500 text-white hover:bg-red-600",
};

const SIZES = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

const AppButton = forwardRef(
  (
    {
      variant = "primary",
      size = "md",
      disabled = false,
      loading = false,
      fullWidth = false,
      className = "",
      children,
      ...props
    },
    ref,
  ) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

    const buttonClasses = clsx(
      baseStyles,
      VARIANTS[variant],
      SIZES[size],
      fullWidth && "w-full",
      className,
    );

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={buttonClasses}
        {...props}
      >
        {loading ? (
          <>
            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    );
  },
);

AppButton.displayName = "AppButton";

export default memo(AppButton);
