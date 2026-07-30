import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AppProviders from "@/providers/AppProviders";
import { isLocale } from "@/i18n/routing";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://trumshop.maianh62878woig.chatgpt.site"),
  openGraph: { type: "website", siteName: "TrumShop", images: [{ url: "/trumshop-og.png", width: 1200, height: 630, alt: "TrumShop - Go, Plus, Pro theo tháng" }] },
  twitter: { card: "summary_large_image", images: ["/trumshop-og.png"] },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

type LocaleLayoutProps = Readonly<{ children: React.ReactNode; params: Promise<{ readonly locale: string }> }>;

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <html data-theme="light" lang={locale} suppressHydrationWarning><body className="antialiased"><AppProviders>{children}</AppProviders></body></html>;
}
