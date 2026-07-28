"use client";

import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import type { CatalogCategory, CatalogProduct } from "@/features/catalog/data/catalog";
import { catalogProducts, categoryLabels } from "@/features/catalog/data/catalog";
import type { Language } from "@/features/home/components/HomePage";

type Filter = "all" | "code" | CatalogCategory;

interface ProductCatalogProps {
  readonly language: Language;
  readonly onSelect: (product: CatalogProduct) => void;
  readonly onDetails: (product: CatalogProduct) => void;
}

export default function ProductCatalog({ language, onDetails, onSelect }: ProductCatalogProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const labels = categoryLabels[language];
  const filters: readonly Filter[] = ["all", "featured", "code", "creative", "tools"];

  useEffect(() => {
    const timeout = window.setTimeout(() => setDebouncedQuery(query), 2000);
    return () => window.clearTimeout(timeout);
  }, [query]);

  const visibleProducts = useMemo(() => {
    const normalizedQuery = debouncedQuery.trim().toLocaleLowerCase();
    return catalogProducts.filter((product) => {
      const matchesFilter = filter === "all" || (filter === "featured" ? product.featured : filter === "code" ? product.codeRelated : product.category === filter);
      const haystack = [product.name[language], product.description[language], ...product.variants[language]].join(" ").toLocaleLowerCase();
      return matchesFilter && (!normalizedQuery || haystack.includes(normalizedQuery));
    }).sort((first, second) => Number(Boolean(second.codeRelated)) - Number(Boolean(first.codeRelated)));
  }, [debouncedQuery, filter, language]);

  return <section className="catalog-shell shell" id="san-pham">
    <div className="catalog-hero">
      <div className="catalog-kicker"><span className="status-dot" />{language === "vi" ? "DANH MỤC SỐ" : "DIGITAL CATALOG"}</div>
      <h1>{language === "vi" ? "Chọn đúng công cụ." : "Find the right tool."}<span>{language === "vi" ? "Bắt đầu nhanh hơn." : "Start faster."}</span></h1>
      <p>{language === "vi" ? "Khám phá các gói AI, sáng tạo và tiện ích số. ChatGPT và Gemini luôn được ưu tiên để bạn dễ tìm thấy nhất." : "Explore AI, creative and digital tools. ChatGPT and Gemini stay front and center for faster discovery."}</p>
      <div className="catalog-highlight-chips"><span>✦ ChatGPT</span><span>✦ Gemini</span><span>◉ Kling AI</span><span>✂ CapCut Pro</span></div>
    </div>

    <div className="catalog-toolbar" aria-label={language === "vi" ? "Tìm và lọc sản phẩm" : "Search and filter products"}>
      <label className="catalog-search">
        <span aria-hidden="true">⌕</span>
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={language === "vi" ? "Tìm ChatGPT, Kling AI, CapCut..." : "Search ChatGPT, Kling AI, CapCut..."} />
        {query && <button type="button" onClick={() => { setQuery(""); setDebouncedQuery(""); }} aria-label={language === "vi" ? "Xóa tìm kiếm" : "Clear search"}>×</button>}
      </label>
      <div className="catalog-filter-row" role="group" aria-label={language === "vi" ? "Nhóm sản phẩm" : "Product groups"}>
        {filters.map((item) => <button className={filter === item ? "active" : ""} type="button" key={item} onClick={() => setFilter(item)}>{labels[item]}</button>)}
      </div>
    </div>

    <div className="catalog-results" aria-live="polite"><span>{language === "vi" ? `${visibleProducts.length} sản phẩm phù hợp` : `${visibleProducts.length} matching products`}</span>{filter !== "all" || query ? <button type="button" onClick={() => { setFilter("all"); setQuery(""); setDebouncedQuery(""); }}>{language === "vi" ? "Xóa bộ lọc" : "Clear filters"}</button> : null}</div>
    <div className="catalog-grid">
      {visibleProducts.map((product, index) => <article className={`catalog-card ${product.featured ? "is-featured" : ""}`} key={product.id} style={{ "--catalog-accent": product.accent, "--catalog-delay": `${index * 55}ms` } as CSSProperties}>
        <div className="catalog-card-head"><div className="catalog-icon" aria-label={product.iconLabel}>{product.iconPath ? <Image alt="" height={32} src={product.iconPath} unoptimized width={32} /> : product.icon}</div><div>{product.soldOut ? <span className="sold-out-badge">{language === "vi" ? "Hết hàng" : "Out of stock"}</span> : product.featured && <span className="best-seller">{language === "vi" ? "Bán chạy" : "Best seller"}</span>}<span className="catalog-category">{labels[product.category]}</span></div></div>
        <h2>{product.name[language]}</h2><p>{product.description[language]}</p>
        <ul>{product.variants[language].map((variant) => <li key={variant}><i>✓</i>{variant}</li>)}</ul>
        <div className="catalog-card-foot"><span><i>◌</i>{product.warranty[language]}</span><div className="catalog-card-actions"><button className="catalog-detail-button" type="button" onClick={() => onDetails(product)}>{language === "vi" ? "Xem chi tiết" : "View details"}<b>→</b></button><button className={product.soldOut ? "is-sold-out" : ""} disabled={product.soldOut} type="button" onClick={() => onSelect(product)}>{product.soldOut ? (language === "vi" ? "Tạm hết hàng" : "Out of stock") : (language === "vi" ? "Liên hệ chọn gói" : "Choose this plan")}<b>{product.soldOut ? "—" : "↗"}</b></button></div></div>
      </article>)}
    </div>
    {visibleProducts.length === 0 && <div className="catalog-empty"><span>⌕</span><h2>{language === "vi" ? "Chưa thấy sản phẩm phù hợp" : "No matching products yet"}</h2><p>{language === "vi" ? "Thử đổi từ khóa hoặc xóa bộ lọc để xem toàn bộ danh mục." : "Try another keyword or clear filters to view the full catalog."}</p><button type="button" onClick={() => { setFilter("all"); setQuery(""); setDebouncedQuery(""); }}>{language === "vi" ? "Xem toàn bộ sản phẩm" : "View all products"}</button></div>}
  </section>;
}
