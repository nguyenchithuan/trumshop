import AppProviders from "@/providers/AppProviders";
import "../globals.css";

export default function RedirectLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi" suppressHydrationWarning><body><AppProviders>{children}</AppProviders></body></html>;
}
