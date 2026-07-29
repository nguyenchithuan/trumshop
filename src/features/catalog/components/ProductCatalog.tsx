"use client";

import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import type { CatalogCategory, CatalogProduct } from "@/features/catalog/data/catalog";
import { catalogProducts, categoryLabels } from "@/features/catalog/data/catalog";
import type { Language } from "@/features/home/components/HomePage";

type Filter = "all" | "code" | "saved" | CatalogCategory;

interface ProductCatalogProps {
  readonly language: Language;
  readonly onSelect: (product: CatalogProduct) => void;
  readonly onDetails: (product: CatalogProduct) => void;
}

export default function ProductCatalog({ language, onDetails, onSelect }: ProductCatalogProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [savedIds, setSavedIds] = useState<readonly string[]>([]);
  const [recentIds, setRecentIds] = useState<readonly string[]>([]);
  const labels = categoryLabels[language];
  const filters: readonly Filter[] = ["all", "featured", "chatgpt", "gemini", "creative", "tools", "code"];

  useEffect(() => {
    const timeout = window.setTimeout(() => setDebouncedQuery(query), 180);
    return () => window.clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const saved = JSON.parse(window.localStorage.getItem("trumshop-saved") ?? "[]");
        const recent = JSON.parse(window.localStorage.getItem("trumshop-recent") ?? "[]");
        if (Array.isArray(saved)) setSavedIds(saved.filter((id): id is string => typeof id === "string"));
        if (Array.isArray(recent)) setRecentIds(recent.filter((id): id is string => typeof id === "string"));
      } catch { /* Storage is an optional convenience, never a requirement. */ }

      const params = new URLSearchParams(window.location.search);
      const category = params.get("category") as Filter | null;
      const validFilters: readonly Filter[] = ["all", "featured", "chatgpt", "gemini", "creative", "tools", "code", "saved"];
      if (category && validFilters.includes(category)) setFilter(category);
      const initialQuery = params.get("q");
      if (initialQuery) { setQuery(initialQuery); setDebouncedQuery(initialQuery); }
      const product = catalogProducts.find((item) => item.id === params.get("product"));
      if (product) onDetails(product);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [onDetails]);

  const visibleProducts = useMemo(() => {
    const normalizedQuery = debouncedQuery.trim().toLocaleLowerCase();
    return catalogProducts.filter((product) => {
      const matchesFilter = filter === "all" || (filter === "featured" ? product.featured : filter === "code" ? product.codeRelated : filter === "saved" ? savedIds.includes(product.id) : product.category === filter);
      const haystack = [product.name[language], product.description[language], ...product.variants[language]].join(" ").toLocaleLowerCase();
      return matchesFilter && (!normalizedQuery || haystack.includes(normalizedQuery));
    }).sort((first, second) => Number(Boolean(second.codeRelated)) - Number(Boolean(first.codeRelated)));
  }, [debouncedQuery, filter, language, savedIds]);

  const updateUrl = (nextFilter: Filter, nextQuery = query) => {
    const params = new URLSearchParams();
    if (nextFilter !== "all") params.set("category", nextFilter);
    if (nextQuery.trim()) params.set("q", nextQuery.trim());
    const suffix = params.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${suffix ? `?${suffix}` : ""}`);
  };
  const chooseFilter = (nextFilter: Filter) => { setFilter(nextFilter); updateUrl(nextFilter); };
  const clearFilters = () => { setFilter("all"); setQuery(""); setDebouncedQuery(""); updateUrl("all", ""); };
  const toggleSaved = (id: string) => {
    const next = savedIds.includes(id) ? savedIds.filter((item) => item !== id) : [...savedIds, id];
    setSavedIds(next);
    try { window.localStorage.setItem("trumshop-saved", JSON.stringify(next)); } catch { /* Optional storage. */ }
  };
  const openDetails = (product: CatalogProduct) => {
    const next = [product.id, ...recentIds.filter((id) => id !== product.id)].slice(0, 4);
    setRecentIds(next);
    try { window.localStorage.setItem("trumshop-recent", JSON.stringify(next)); } catch { /* Optional storage. */ }
    onDetails(product);
  };
  const recentProducts = recentIds.map((id) => catalogProducts.find((product) => product.id === id)).filter((product): product is CatalogProduct => Boolean(product));

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
        {filters.map((item) => <button className={filter === item ? "active" : ""} type="button" key={item} onClick={() => chooseFilter(item)}>{item === "saved" ? (language === "vi" ? "Đã lưu" : "Saved") : labels[item]}</button>)}
        {savedIds.length > 0 && <button className={filter === "saved" ? "active" : ""} type="button" onClick={() => chooseFilter("saved")}>♡ {language === "vi" ? `Đã lưu (${savedIds.length})` : `Saved (${savedIds.length})`}</button>}
      </div>
    </div>

    <div className="catalog-results" aria-live="polite"><span>{language === "vi" ? `${visibleProducts.length} sản phẩm phù hợp` : `${visibleProducts.length} matching products`}</span>{filter !== "all" || query ? <button type="button" onClick={clearFilters}>{language === "vi" ? "Xóa bộ lọc" : "Clear filters"}</button> : null}</div>
    <div className="catalog-grid">
      {visibleProducts.map((product, index) => <article className={`catalog-card ${product.featured ? "is-featured" : ""}`} key={product.id} style={{ "--catalog-accent": product.accent, "--catalog-delay": `${index * 55}ms` } as CSSProperties}>
        <div className="catalog-card-head"><div className="catalog-icon" aria-label={product.iconLabel}>{product.iconPath ? <Image alt="" height={32} src={product.iconPath} unoptimized width={32} /> : product.icon}</div><div className="catalog-card-badges"><button className={`save-product ${savedIds.includes(product.id) ? "saved" : ""}`} type="button" aria-label={savedIds.includes(product.id) ? (language === "vi" ? "Bỏ lưu sản phẩm" : "Remove saved product") : (language === "vi" ? "Lưu sản phẩm" : "Save product")} onClick={() => toggleSaved(product.id)}>{savedIds.includes(product.id) ? "♥" : "♡"}</button>{product.soldOut ? <span className="sold-out-badge">{language === "vi" ? "Hết hàng" : "Out of stock"}</span> : product.featured && <span className="best-seller">{language === "vi" ? "Bán chạy" : "Best seller"}</span>}<span className="catalog-category">{labels[product.category]}</span></div></div>
        <h2>{product.name[language]}</h2><p>{product.description[language]}</p>
        <ul>{product.variants[language].map((variant) => <li key={variant}><i>✓</i>{variant}</li>)}</ul>
        <div className="catalog-card-foot"><span><i>◌</i>{product.warranty[language]}</span><div className="catalog-card-actions"><button className="catalog-detail-button" type="button" onClick={() => openDetails(product)}>{language === "vi" ? "Xem chi tiết" : "View details"}<b>→</b></button><button className={product.soldOut ? "is-sold-out" : ""} disabled={product.soldOut} type="button" onClick={() => onSelect(product)}>{product.soldOut ? (language === "vi" ? "Tạm hết hàng" : "Out of stock") : (language === "vi" ? "Liên hệ chọn gói" : "Choose this plan")}<b>{product.soldOut ? "—" : "↗"}</b></button></div></div>
      </article>)}
    </div>
    {visibleProducts.length === 0 && <div className="catalog-empty"><span>⌕</span><h2>{language === "vi" ? "Chưa thấy sản phẩm phù hợp" : "No matching products yet"}</h2><p>{language === "vi" ? "Thử đổi từ khóa hoặc xóa bộ lọc để xem toàn bộ danh mục." : "Try another keyword or clear filters to view the full catalog."}</p><button type="button" onClick={clearFilters}>{language === "vi" ? "Xem toàn bộ sản phẩm" : "View all products"}</button></div>}
    {recentProducts.length > 0 && <section className="recent-products"><div><p className="section-kicker">{language === "vi" ? "XEM GẦN ĐÂY" : "RECENTLY VIEWED"}</p><h2>{language === "vi" ? "Tiếp tục xem sản phẩm bạn quan tâm." : "Pick up where you left off."}</h2></div><div>{recentProducts.map((product) => <button key={product.id} type="button" onClick={() => openDetails(product)}><span>{product.iconPath ? <Image alt="" height={22} src={product.iconPath} unoptimized width={22} /> : product.icon}</span>{product.name[language]}<b>→</b></button>)}</div></section>}
  </section>;
}
