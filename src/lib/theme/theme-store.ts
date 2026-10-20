"use client";

import { create } from "zustand";

export type Theme = "dark" | "light";

const STORAGE_KEY = "dunkbull-theme";

interface ThemeStore {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  hydrate: () => void;
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: "dark",

  hydrate: () => {
    if (typeof window === "undefined") return;
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
      const initial = saved === "light" || saved === "dark" ? saved : "dark";
      document.documentElement.setAttribute("data-theme", initial);
      set({ theme: initial });
    } catch {
      // ignore localStorage errors
    }
  },

  setTheme: (theme) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, theme);
        document.documentElement.setAttribute("data-theme", theme);
      } catch {
        // ignore
      }
    }
    set({ theme });
  },

  toggleTheme: () => {
    const next = get().theme === "dark" ? "light" : "dark";
    get().setTheme(next);
  },
}));
