import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HomePageScreen from "@/features/home/components/HomePageScreen";
import { isLocale, type Locale } from "@/i18n/routing";

type LocalePageProps = { readonly params: Promise<{ readonly locale: string }> };

const metadataByLocale: Record<Locale, Metadata> = {
  vi: {
    title: "Nâng cấp ChatGPT Go, Plus, Pro 1 tháng | TrumShop",
    description: "Tư vấn đăng ký ChatGPT Go, Plus và Pro theo tháng. Nhiều lựa chọn bảo hành, hỗ trợ trực tiếp qua Zalo, Facebook và Instagram.",
    alternates: { canonical: "/vi", languages: { vi: "/vi", en: "/en" } },
    openGraph: { locale: "vi_VN", url: "/vi", title: "Nâng cấp ChatGPT Go, Plus, Pro theo tháng | TrumShop", description: "Chọn gói phù hợp, lựa chọn bảo hành linh hoạt và liên hệ TrumShop để được tư vấn trực tiếp." },
  },
  en: {
    title: "ChatGPT Go, Plus & Pro monthly plans | TrumShop",
    description: "Monthly ChatGPT plan guidance with flexible warranty options and direct support from TrumShop.",
    alternates: { canonical: "/en", languages: { vi: "/vi", en: "/en" } },
    openGraph: { locale: "en_US", url: "/en", title: "ChatGPT Go, Plus & Pro monthly plans | TrumShop", description: "Choose a suitable plan, flexible warranty and direct guidance from TrumShop." },
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
