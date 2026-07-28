import { catalogProducts } from "@/features/catalog/data/catalog";
import type { Language } from "@/features/home/components/HomePage";
import type { CSSProperties } from "react";
import Image from "next/image";

interface FeaturedCatalogSectionProps {
  readonly catalogHref: string;
  readonly language: Language;
}

export default function FeaturedCatalogSection({ catalogHref, language }: FeaturedCatalogSectionProps) {
  const products = catalogProducts.filter((product) => product.codeRelated).slice(0, 4);
  const text = language === "vi"
    ? { label: "Sản phẩm nổi bật", kicker: "ĐƯỢC QUAN TÂM NHIỀU", title: "Công cụ đúng gu.\nBắt đầu đúng lúc.", lead: "Từ AI hỗ trợ công việc đến công cụ viết code, TrumShop giúp bạn tìm nhanh lựa chọn phù hợp.", action: "Khám phá toàn bộ sản phẩm", soldOut: "Hết hàng" }
    : { label: "Featured products", kicker: "MOST REQUESTED", title: "The right tools.\nRight when you need them.", lead: "From AI for everyday work to coding tools, TrumShop helps you find the right option faster.", action: "Explore all products", soldOut: "Out of stock" };

  return <section className="featured-catalog section shell scroll-reveal" id="san-pham-noi-bat">
    <div className="section-label"><span>01</span>{text.label}</div>
    <div className="featured-catalog-intro"><div><p className="section-kicker">{text.kicker}</p><h2>{text.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h2></div><div><p>{text.lead}</p><a className="button button-primary featured-catalog-action" href={catalogHref}>{text.action}<span>↗</span></a></div></div>
    <div className="featured-catalog-grid">
      {products.map((product, index) => <a className={`featured-catalog-card ${product.soldOut ? "is-sold-out" : ""}`} href={catalogHref} key={product.id} style={{ "--featured-accent": product.accent, "--featured-delay": `${index * 85}ms` } as CSSProperties}>
        <div className="featured-card-top"><span className="featured-product-icon">{product.iconPath ? <Image alt="" height={28} src={product.iconPath} unoptimized width={28} /> : product.icon}</span>{product.soldOut && <span className="featured-stock">{text.soldOut}</span>}</div>
        <h3>{product.name[language]}</h3><p>{product.description[language]}</p><span className="featured-card-link">{language === "vi" ? "Xem sản phẩm" : "View product"}<b>→</b></span>
      </a>)}
    </div>
  </section>;
}
