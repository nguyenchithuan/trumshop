import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductCatalogScreen from "@/features/catalog/components/ProductCatalogScreen";
import { isLocale, type Locale } from "@/i18n/routing";

type ProductPageProps = { readonly params: Promise<{ readonly locale: string }> };

const metadataByLocale: Record<Locale, Metadata> = {
  vi: {
    title: "Danh mục sản phẩm AI & tiện ích số | TrumShop",
    description: "Khám phá ChatGPT, Gemini, Kling AI, OpenArt, CapCut Pro và các tiện ích số tại TrumShop.",
    alternates: { canonical: "/vi/san-pham", languages: { vi: "/vi/san-pham", en: "/en/san-pham" } },
  },
  en: {
    title: "AI & digital product catalog | TrumShop",
    description: "Explore ChatGPT, Gemini, Kling AI, OpenArt, CapCut Pro and more digital tools at TrumShop.",
    alternates: { canonical: "/en/san-pham", languages: { vi: "/vi/san-pham", en: "/en/san-pham" } },
  },
};

export function generateStaticParams(): { readonly locale: Locale }[] { return [{ locale: "vi" }, { locale: "en" }]; }

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? metadataByLocale[locale] : {};
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ProductCatalogScreen initialLanguage={locale} />;
}
