import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductAdvisorScreen from "@/features/advisor/components/ProductAdvisorScreen";
import { isLocale, type Locale } from "@/i18n/routing";

type AdvisorPageProps = { readonly params: Promise<{ readonly locale: string }> };

const metadataByLocale: Record<Locale, Metadata> = {
  vi: { title: "Tìm công cụ AI phù hợp | TrumShop", description: "Chọn nhu cầu để nhận gợi ý công cụ AI, sáng tạo và tiện ích số phù hợp tại TrumShop." },
  en: { title: "Find the right AI tool | TrumShop", description: "Choose your goal and get matched with suitable AI, creative and digital tools." },
};

export function generateStaticParams(): { readonly locale: Locale }[] { return [{ locale: "vi" }, { locale: "en" }]; }

export async function generateMetadata({ params }: AdvisorPageProps): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? metadataByLocale[locale] : {};
}

export default async function AdvisorPage({ params }: AdvisorPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ProductAdvisorScreen initialLanguage={locale} />;
}
