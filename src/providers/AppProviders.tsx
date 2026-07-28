"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

interface AppProvidersProps {
  readonly children: ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="dark"
      disableTransitionOnChange
      enableColorScheme
      enableSystem={false}
      storageKey="trumshop-theme"
      themes={["dark", "light"]}
    >
      {children}
    </ThemeProvider>
  );
}
