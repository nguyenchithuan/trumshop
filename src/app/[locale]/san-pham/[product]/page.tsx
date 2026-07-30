import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductInfoPageScreen from "@/features/product/components/ProductInfoPageScreen";
import { catalogProducts } from "@/features/catalog/data/catalog";
import { isLocale, locales, type Locale } from "@/i18n/routing";

type ProductPageProps = { readonly params: Promise<{ readonly locale: string; readonly product: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) => catalogProducts.map((product) => ({ locale, product: product.id })));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { locale, product: productId } = await params;
  if (!isLocale(locale)) return {};
  const product = catalogProducts.find((item) => item.id === productId);
  if (!product) return {};
  const language: Locale = locale;
  return {
    title: `${product.name[language]} | TrumShop`,
    description: product.description[language],
    alternates: { canonical: `/${language}/san-pham/${product.id}`, languages: { vi: `/vi/san-pham/${product.id}`, en: `/en/san-pham/${product.id}` } },
  };
}

export default async function ProductInfoPage({ params }: ProductPageProps) {
  const { locale, product: productId } = await params;
  if (!isLocale(locale)) notFound();
  const product = catalogProducts.find((item) => item.id === productId);
  if (!product) notFound();
  return <ProductInfoPageScreen initialLanguage={locale} product={product} />;
}
