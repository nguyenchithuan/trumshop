import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EcosystemScreen from "@/features/ecosystem/components/EcosystemScreen";
import { isLocale, type Locale } from "@/i18n/routing";

type PageProps = { readonly params: Promise<{ readonly locale: string }> };
const metadata: Record<Locale, Metadata> = { vi: { title: "Bản đồ AI | TrumShop", description: "Khám phá công cụ AI theo việc bạn muốn làm." }, en: { title: "AI Map | TrumShop", description: "Explore AI tools by the work you want to do." } };
export function generateStaticParams() { return [{ locale: "vi" }, { locale: "en" }]; }
export async function generateMetadata({ params }: PageProps): Promise<Metadata> { const { locale } = await params; return isLocale(locale) ? metadata[locale] : {}; }
export default async function AiMapPage({ params }: PageProps) { const { locale } = await params; if (!isLocale(locale)) notFound(); return <EcosystemScreen initialLanguage={locale} view="map" />; }
