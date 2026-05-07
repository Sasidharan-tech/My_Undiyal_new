"use client";

import { memo, forwardRef } from "react";
import clsx from "clsx";

/**
 * AppInput - Enterprise-grade reusable input component
 * Supports all input types, validation states, icons
 */

const AppInput = forwardRef(
  (
    {
      label,
      error,
      hint,
      icon: Icon,
      iconPosition = "left",
      required = false,
      disabled = false,
      className = "",
      containerClassName = "",
      ...props
    },
    ref,
  ) => {
    const inputClasses = clsx(
      "w-full px-4 py-2 rounded-lg border-2 transition-all duration-200",
      "focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent",
      error ? "border-red-500 bg-red-50" : "border-gray-300 bg-white",
      Icon && iconPosition === "left" && "pl-10",
      Icon && iconPosition === "right" && "pr-10",
      disabled && "bg-gray-100 cursor-not-allowed opacity-50",
      className,
    );

    return (
      <div className={clsx("flex flex-col", containerClassName)}>
        {label && (
          <label className="mb-2 text-sm font-semibold text-gray-700">
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}

        <div className="relative">
          {Icon && iconPosition === "left" && (
            <Icon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          )}

          <input
            ref={ref}
            disabled={disabled}
            className={inputClasses}
            {...props}
          />

          {Icon && iconPosition === "right" && (
            <Icon className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
          )}
        </div>

        {error && (
          <span className="mt-1 text-xs text-red-600">{error}</span>
        )}
        {hint && !error && (
          <span className="mt-1 text-xs text-gray-500">{hint}</span>
        )}
      </div>
    );
  },
);

AppInput.displayName = "AppInput";

export default memo(AppInput);
