import type { CSSProperties, ChangeEvent } from "react";
import type { HomeCopy, Language } from "@/features/home/components/HomePage";

type Product = {
  readonly id: string;
  readonly name: string | { readonly vi: string; readonly en: string };
  readonly shortName: string;
  readonly symbol: string;
  readonly accent: string;
  readonly popular?: boolean;
  readonly tag: { readonly vi: string; readonly en: string };
  readonly description: { readonly vi: string; readonly en: string };
  readonly features: { readonly vi: readonly string[]; readonly en: readonly string[] };
};

interface ProductCardProps {
  readonly content: HomeCopy;
  readonly index: number;
  readonly language: Language;
  readonly product: Product;
  readonly warrantyIndex: number;
  readonly warrantyOptions: readonly string[];
  readonly onPurchase: () => void;
  readonly onWarrantyChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export default function ProductCard({ content, index, language, product, warrantyIndex, warrantyOptions, onPurchase, onWarrantyChange }: ProductCardProps) {
  const productName = typeof product.name === "string" ? product.name : product.name[language];
  return (
    <article className={`product-card ${product.accent} ${product.popular ? "popular" : ""}`} style={{ "--delay": `${index * 80}ms` } as CSSProperties}>
      {product.popular && <div className="popular-badge">{content.popular}<span>✦</span></div>}
      <div className="product-topline"><span>CHATGPT · {product.shortName.toUpperCase()}</span><span className="stock"><i />{content.available}</span></div>
      <div className="product-icon">{product.symbol}</div><p className="product-tag">{product.tag[language]}</p>
      <div className="product-title"><h3>{product.shortName}</h3><span>{content.month}</span></div>
      <p className="product-description">{product.description[language]}</p>
      <ul>{product.features[language].map((feature) => <li key={feature}><span>✓</span>{feature}</li>)}</ul>
      <div className="warranty-field"><label htmlFor={`warranty-${product.id}`}>{content.warranty}</label><div className="select-wrap">
        <select id={`warranty-${product.id}`} value={warrantyIndex} onChange={onWarrantyChange}>{warrantyOptions.map((option, optionIndex) => <option value={optionIndex} key={option}>{option}</option>)}</select><span>⌄</span>
      </div></div>
      <div className="product-price"><span>{content.planPrice}</span><strong>{product.id === "business" ? content.consult : content.quote}</strong></div>
      <button className="button product-button" type="button" aria-label={`${content.buyNow}: ${productName}`} onClick={onPurchase}>{content.buyNow}<span>↗</span></button>
    </article>
  );
}
