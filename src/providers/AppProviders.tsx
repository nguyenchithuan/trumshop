"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore, type ReactNode } from "react";

export type AppTheme = "dark" | "light";

interface ThemeContextValue {
  readonly resolvedTheme: AppTheme;
  readonly setTheme: (theme: AppTheme) => void;
}

const THEME_STORAGE_KEY = "trumshop-theme";
const ThemeContext = createContext<ThemeContextValue | null>(null);
const themeSubscribers = new Set<() => void>();

function applyTheme(theme: AppTheme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
}

function getThemeSnapshot(): AppTheme {
  return window.localStorage.getItem(THEME_STORAGE_KEY) === "dark" ? "dark" : "light";
}

function subscribeToTheme(onStoreChange: () => void) {
  themeSubscribers.add(onStoreChange);
  const syncTheme = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY) onStoreChange();
  };
  window.addEventListener("storage", syncTheme);
  return () => {
    themeSubscribers.delete(onStoreChange);
    window.removeEventListener("storage", syncTheme);
  };
}

interface AppProvidersProps {
  readonly children: ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  // Keep the server and the first client render identical. The saved preference
  // is read only after hydration, which prevents the header from mismatching.
  const resolvedTheme = useSyncExternalStore<AppTheme>(subscribeToTheme, getThemeSnapshot, () => "light");

  const setTheme = useCallback((theme: AppTheme) => {
    applyTheme(theme);
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    themeSubscribers.forEach((onStoreChange) => onStoreChange());
  }, []);

  useEffect(() => {
    applyTheme(resolvedTheme);
  }, [resolvedTheme]);

  const value = useMemo(() => ({ resolvedTheme, setTheme }), [resolvedTheme, setTheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const theme = useContext(ThemeContext);
  if (!theme) throw new Error("useTheme must be used within AppProviders.");
  return theme;
}
