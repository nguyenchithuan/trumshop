import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ExploreScreen from "@/features/discover/components/ExploreScreen";
import { isLocale, type Locale } from "@/i18n/routing";

type PageProps = { readonly params: Promise<{ readonly locale: string }> };
const metadata: Record<Locale, Metadata> = {
  vi: { title: "Bộ sưu tập theo nhu cầu | TrumShop", description: "Khám phá bộ công cụ AI cho học tập, công việc, lập trình và sáng tạo nội dung." },
  en: { title: "Collections by goal | TrumShop", description: "Explore AI tool collections for study, work, coding and visual creation." },
};
export function generateStaticParams() { return [{ locale: "vi" }, { locale: "en" }]; }
export async function generateMetadata({ params }: PageProps): Promise<Metadata> { const { locale } = await params; return isLocale(locale) ? metadata[locale] : {}; }
export default async function CollectionsPage({ params }: PageProps) { const { locale } = await params; if (!isLocale(locale)) notFound(); return <ExploreScreen initialLanguage={locale} view="collections" />; }
