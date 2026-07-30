import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EcosystemScreen from "@/features/ecosystem/components/EcosystemScreen";
import { isLocale, type Locale } from "@/i18n/routing";

type PageProps = { readonly params: Promise<{ readonly locale: string }> };
const metadata: Record<Locale, Metadata> = { vi: { title: "Prompt Studio | TrumShop", description: "Chọn, tùy chỉnh và lưu prompt ngay trên thiết bị." }, en: { title: "Prompt Studio | TrumShop", description: "Choose, tailor and save prompts right on your device." } };
export function generateStaticParams() { return [{ locale: "vi" }, { locale: "en" }]; }
export async function generateMetadata({ params }: PageProps): Promise<Metadata> { const { locale } = await params; return isLocale(locale) ? metadata[locale] : {}; }
export default async function PromptStudioPage({ params }: PageProps) { const { locale } = await params; if (!isLocale(locale)) notFound(); return <EcosystemScreen initialLanguage={locale} view="prompts" />; }
