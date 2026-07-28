import type { ChangeEvent } from "react";
import type { HomeCopy, Language } from "@/features/home/components/HomePage";
import ProductCard from "./ProductCard";

interface PlansSectionProps {
  readonly content: HomeCopy;
  readonly language: Language;
  readonly products: readonly Parameters<typeof ProductCard>[0]["product"][];
  readonly warranties: Readonly<Record<string, number>>;
  readonly warrantyOptions: readonly string[];
  readonly onPurchase: (productId: string, productName: string) => void;
  readonly onWarrantyChange: (productId: string, event: ChangeEvent<HTMLSelectElement>) => void;
}

export default function PlansSection({ content, language, products, warranties, warrantyOptions, onPurchase, onWarrantyChange }: PlansSectionProps) {
  return (
    <section className="products-section section shell scroll-reveal" id="goi-dich-vu">
      <div className="section-label"><span>01</span>{content.productsLabel}</div>
      <div className="section-heading"><div><p className="section-kicker">{content.productsKicker}</p><h2>{content.productsTitle}</h2></div><p>{content.productsNote}</p></div>
      <div className="product-grid">{products.map((product, index) => {
        const productName = typeof product.name === "string" ? product.name : product.name[language];
        return <ProductCard key={product.id} content={content} index={index} language={language} product={product} warrantyIndex={warranties[product.id] ?? 0} warrantyOptions={warrantyOptions} onPurchase={() => onPurchase(product.id, productName)} onWarrantyChange={(event) => onWarrantyChange(product.id, event)} />;
      })}</div>
    </section>
  );
}
