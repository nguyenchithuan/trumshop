import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ExploreScreen from "@/features/discover/components/ExploreScreen";
import { isLocale, type Locale } from "@/i18n/routing";

type PageProps = { readonly params: Promise<{ readonly locale: string }> };
const metadata: Record<Locale, Metadata> = {
  vi: { title: "So sánh công cụ AI | TrumShop", description: "Đặt các công cụ AI cạnh nhau để chọn lựa phù hợp với nhu cầu của bạn." },
  en: { title: "Compare AI tools | TrumShop", description: "Put AI tools side by side to choose one that fits your needs." },
};
export function generateStaticParams() { return [{ locale: "vi" }, { locale: "en" }]; }
export async function generateMetadata({ params }: PageProps): Promise<Metadata> { const { locale } = await params; return isLocale(locale) ? metadata[locale] : {}; }
export default async function ComparePage({ params }: PageProps) { const { locale } = await params; if (!isLocale(locale)) notFound(); return <ExploreScreen initialLanguage={locale} view="compare" />; }
