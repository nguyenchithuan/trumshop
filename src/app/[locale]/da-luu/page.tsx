import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ExploreScreen from "@/features/discover/components/ExploreScreen";
import { isLocale, type Locale } from "@/i18n/routing";

type PageProps = { readonly params: Promise<{ readonly locale: string }> };
const metadata: Record<Locale, Metadata> = {
  vi: { title: "Sản phẩm đã lưu | TrumShop", description: "Xem lại các công cụ bạn đã lưu trên thiết bị này." },
  en: { title: "Saved products | TrumShop", description: "Review the tools you saved on this device." },
};
export function generateStaticParams() { return [{ locale: "vi" }, { locale: "en" }]; }
export async function generateMetadata({ params }: PageProps): Promise<Metadata> { const { locale } = await params; return isLocale(locale) ? metadata[locale] : {}; }
export default async function SavedPage({ params }: PageProps) { const { locale } = await params; if (!isLocale(locale)) notFound(); return <ExploreScreen initialLanguage={locale} view="saved" />; }
