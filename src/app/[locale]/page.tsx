import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HomePageScreen from "@/features/home/components/HomePageScreen";
import { isLocale, type Locale } from "@/i18n/routing";

type LocalePageProps = { readonly params: Promise<{ readonly locale: string }> };

const metadataByLocale: Record<Locale, Metadata> = {
  vi: {
    title: "Công cụ AI & tiện ích số | TrumShop",
    description: "Khám phá ChatGPT, Gemini, Kling AI, OpenArt, CapCut Pro và nhiều tiện ích số với tư vấn trực tiếp từ TrumShop.",
    alternates: { canonical: "/vi", languages: { vi: "/vi", en: "/en" } },
    openGraph: { locale: "vi_VN", url: "/vi", title: "Công cụ AI & tiện ích số | TrumShop", description: "Khám phá công cụ phù hợp, chọn bảo hành rõ ràng và liên hệ TrumShop để được tư vấn trực tiếp." },
  },
  en: {
    title: "AI tools & digital utilities | TrumShop",
    description: "Explore ChatGPT, Gemini, Kling AI, OpenArt, CapCut Pro and more digital tools with direct guidance from TrumShop.",
    alternates: { canonical: "/en", languages: { vi: "/vi", en: "/en" } },
    openGraph: { locale: "en_US", url: "/en", title: "AI tools & digital utilities | TrumShop", description: "Find a suitable tool, get clear warranty options and direct guidance from TrumShop." },
  },
};

export function generateStaticParams(): { readonly locale: Locale }[] {
  return [{ locale: "vi" }, { locale: "en" }];
}

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? metadataByLocale[locale] : {};
}

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <HomePageScreen initialLanguage={locale} />;
}
