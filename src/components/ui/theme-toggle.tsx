"use client";

import { useEffect, useState } from "react";
import { useThemeStore } from "@/lib/theme/theme-store";

export interface ThemeToggleProps {
  className?: string;
  variant?: "badge" | "button" | "minimal" | "icon";
}

const TRANSITION = "transition duration-[var(--duration-fast)] ease-entrance";

export const ThemeToggle = ({
  className = "",
  variant = "badge",
}: ThemeToggleProps) => {
  const [mounted, setMounted] = useState(false);
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const hydrate = useThemeStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
    setMounted(true);
  }, [hydrate]);

  if (variant === "icon") {
    const isLight = mounted && theme === "light";

    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={mounted ? `Switch to ${isLight ? "dark" : "light"} mode` : "Toggle theme mode"}
        className={`flex size-8 items-center justify-center border border-hero-rule text-hero-content/80 hover:border-hero-content hover:text-hero-content focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-content ${TRANSITION} ${className}`}
      >
        {isLight ? (
          <svg
            className="size-4 text-hero-content"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </svg>
        ) : (
          <svg
            className="size-4 text-hero-content"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        )}
      </button>
    );
  }

  if (!mounted) {
    return (
      <span
        aria-hidden
        className={`inline-block border border-hero-rule px-3 py-1 text-hero-caption text-hero-content-muted opacity-50 ${className}`}
      >
        MODE [ --- ]
      </span>
    );
  }

  const isLight = theme === "light";

  if (variant === "minimal") {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
        className={`text-hero-caption text-hero-content-muted hover:text-hero-content focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-content ${TRANSITION} ${className}`}
      >
        {isLight ? "DARK MODE ☾" : "LIGHT MODE ☼"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
      className={`group flex items-center gap-2 border border-hero-rule px-3 py-1 font-mono text-hero-caption leading-none text-hero-content/80 hover:border-hero-content hover:text-hero-content focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-content ${TRANSITION} ${className}`}
    >
      <span className="text-hero-content-faint">MODE:</span>
      <span className="font-bold text-hero-content">
        {isLight ? "LIGHT ☼" : "DARK ☾"}
      </span>
    </button>
  );
};
