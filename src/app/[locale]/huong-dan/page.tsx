import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ExploreScreen from "@/features/discover/components/ExploreScreen";
import { isLocale, type Locale } from "@/i18n/routing";

type PageProps = { readonly params: Promise<{ readonly locale: string }> };
const metadata: Record<Locale, Metadata> = {
  vi: { title: "Trung tâm hướng dẫn | TrumShop", description: "Các hướng dẫn ngắn để bắt đầu dùng công cụ AI đúng mục đích." },
  en: { title: "Guide center | TrumShop", description: "Short practical guides for getting started with AI tools purposefully." },
};
export function generateStaticParams() { return [{ locale: "vi" }, { locale: "en" }]; }
export async function generateMetadata({ params }: PageProps): Promise<Metadata> { const { locale } = await params; return isLocale(locale) ? metadata[locale] : {}; }
export default async function GuidesPage({ params }: PageProps) { const { locale } = await params; if (!isLocale(locale)) notFound(); return <ExploreScreen initialLanguage={locale} view="guides" />; }
