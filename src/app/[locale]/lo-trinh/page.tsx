import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EcosystemScreen from "@/features/ecosystem/components/EcosystemScreen";
import { isLocale, type Locale } from "@/i18n/routing";

type PageProps = { readonly params: Promise<{ readonly locale: string }> };
const metadata: Record<Locale, Metadata> = { vi: { title: "Lộ trình AI | TrumShop", description: "Các workflow thực hành ngắn cho học tập, sáng tạo và lập trình." }, en: { title: "AI learning paths | TrumShop", description: "Short practical workflows for study, creation and coding." } };
export function generateStaticParams() { return [{ locale: "vi" }, { locale: "en" }]; }
export async function generateMetadata({ params }: PageProps): Promise<Metadata> { const { locale } = await params; return isLocale(locale) ? metadata[locale] : {}; }
export default async function LearningPathsPage({ params }: PageProps) { const { locale } = await params; if (!isLocale(locale)) notFound(); return <EcosystemScreen initialLanguage={locale} view="paths" />; }
