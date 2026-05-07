"use client";

import Link from "next/link";
import { memo } from "react";

/**
 * NavLink - Centralized link component for app navigation
 * Replaces <Link> throughout the app with consistent styling and behavior
 * Usage:
 *   <NavLink href="/categories">Categories</NavLink>
 *   <NavLink href="/cart" className="custom-class">Cart</NavLink>
 */

function NavLink({ href, children, className = "", ...props }) {
  return (
    <Link href={href} className={className} {...props}>
      {children}
    </Link>
  );
}

export default memo(NavLink);
