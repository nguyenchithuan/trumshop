"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import type { CatalogProduct } from "@/features/catalog/data/catalog";
import { catalogProducts, categoryLabels } from "@/features/catalog/data/catalog";
import type { Language } from "@/features/home/components/HomePage";

type SelectableFilter = "featured" | "creative" | "tools" | "code" | "saved";

interface ProductCatalogProps {
  readonly language: Language;
  readonly onSelect: (product: CatalogProduct) => void;
  readonly onDetails: (product: CatalogProduct) => void;
}

export default function ProductCatalog({ language, onDetails, onSelect }: ProductCatalogProps) {
  const [selectedFilters, setSelectedFilters] = useState<readonly SelectableFilter[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [savedIds, setSavedIds] = useState<readonly string[]>([]);
  const [recentIds, setRecentIds] = useState<readonly string[]>([]);
  const filterControlRef = useRef<HTMLDivElement>(null);
  const hasReadInitialState = useRef(false);
  const labels = categoryLabels[language];
  const filters: readonly SelectableFilter[] = ["featured", "creative", "tools", "code", "saved"];

  useEffect(() => {
    const timeout = window.setTimeout(() => setDebouncedQuery(query), 180);
    return () => window.clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    if (hasReadInitialState.current) return;
    hasReadInitialState.current = true;
    const frame = window.requestAnimationFrame(() => {
      try {
        const saved = JSON.parse(window.localStorage.getItem("trumshop-saved") ?? "[]");
        const recent = JSON.parse(window.localStorage.getItem("trumshop-recent") ?? "[]");
        if (Array.isArray(saved)) setSavedIds(saved.filter((id): id is string => typeof id === "string"));
        if (Array.isArray(recent)) setRecentIds(recent.filter((id): id is string => typeof id === "string"));
      } catch { /* Storage is an optional convenience, never a requirement. */ }

      const params = new URLSearchParams(window.location.search);
      const category = params.get("category");
      const validFilters: readonly SelectableFilter[] = ["featured", "creative", "tools", "code", "saved"];
      const initialFilters = (category ?? "").split(",").filter((item): item is SelectableFilter => validFilters.includes(item as SelectableFilter));
      if (initialFilters.length) setSelectedFilters(initialFilters);
      const initialQuery = params.get("q");
      if (initialQuery) { setQuery(initialQuery); setDebouncedQuery(initialQuery); }
      const product = catalogProducts.find((item) => item.id === params.get("product"));
      if (product) onDetails(product);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [onDetails]);

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (filterControlRef.current && !filterControlRef.current.contains(event.target as Node)) setIsFilterOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsFilterOpen(false);
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const visibleProducts = useMemo(() => {
    const normalizedQuery = debouncedQuery.trim().toLocaleLowerCase();
    return catalogProducts.filter((product) => {
      const matchesFilter = selectedFilters.length === 0 || selectedFilters.some((filter) => {
        if (filter === "featured") return product.featured;
        if (filter === "code") return product.codeRelated;
        if (filter === "saved") return savedIds.includes(product.id);
        return product.category === filter;
      });
      const haystack = [product.name[language], product.description[language], ...product.variants[language]].join(" ").toLocaleLowerCase();
      return matchesFilter && (!normalizedQuery || haystack.includes(normalizedQuery));
    }).sort((first, second) => Number(Boolean(second.codeRelated)) - Number(Boolean(first.codeRelated)));
  }, [debouncedQuery, language, savedIds, selectedFilters]);

  const updateUrl = (nextFilters: readonly SelectableFilter[], nextQuery = query) => {
    const params = new URLSearchParams();
    if (nextFilters.length) params.set("category", nextFilters.join(","));
    if (nextQuery.trim()) params.set("q", nextQuery.trim());
    const suffix = params.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${suffix ? `?${suffix}` : ""}`);
  };
  const toggleFilter = (nextFilter: SelectableFilter) => {
    const nextFilters = selectedFilters.includes(nextFilter) ? selectedFilters.filter((filter) => filter !== nextFilter) : [...selectedFilters, nextFilter];
    setSelectedFilters(nextFilters);
    updateUrl(nextFilters);
  };
  const clearFilters = () => { setSelectedFilters([]); setQuery(""); setDebouncedQuery(""); updateUrl([], ""); };
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
    <nav className="catalog-explore-shortcuts" aria-label={language === "vi" ? "Khám phá thêm" : "Explore more"}>
      <a href={`/${language}/so-sanh`}><span>↔</span><div><strong>{language === "vi" ? "So sánh công cụ" : "Compare tools"}</strong><small>{language === "vi" ? "Đặt các lựa chọn cạnh nhau" : "See choices side by side"}</small></div><b>→</b></a>
      <a href={`/${language}/bo-suu-tap`}><span>✦</span><div><strong>{language === "vi" ? "Chọn theo nhu cầu" : "Choose by goal"}</strong><small>{language === "vi" ? "Bộ công cụ cho từng việc" : "Toolsets for each goal"}</small></div><b>→</b></a>
      <a href={`/${language}/huong-dan`}><span>?</span><div><strong>{language === "vi" ? "Xem hướng dẫn" : "Read guides"}</strong><small>{language === "vi" ? "Bắt đầu dùng tự tin hơn" : "Start with confidence"}</small></div><b>→</b></a>
    </nav>

    <div className="catalog-controls" aria-label={language === "vi" ? "Tìm và lọc sản phẩm" : "Search and filter products"}>
      <div className="catalog-search-area">
        <span className="catalog-control-label">{language === "vi" ? "TÌM SẢN PHẨM" : "SEARCH PRODUCTS"}</span>
        <label className="catalog-search">
          <span aria-hidden="true">⌕</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={language === "vi" ? "Tìm ChatGPT, Kling AI, CapCut..." : "Search ChatGPT, Kling AI, CapCut..."} />
          {query && <button type="button" onClick={() => { setQuery(""); setDebouncedQuery(""); updateUrl(selectedFilters, ""); }} aria-label={language === "vi" ? "Xóa tìm kiếm" : "Clear search"}>×</button>}
        </label>
      </div>
      <div className="catalog-filter-control" ref={filterControlRef}>
        <span className="catalog-control-label">{language === "vi" ? "LỌC DANH MỤC" : "FILTER CATALOG"}</span>
        <button className={`catalog-filter-trigger ${selectedFilters.length ? "has-selection" : ""}`} type="button" aria-expanded={isFilterOpen} aria-controls="catalog-filter-panel" onClick={() => setIsFilterOpen((open) => !open)}>
          <span className="filter-icon" aria-hidden="true">≡</span>
          <span>{language === "vi" ? "Filter" : "Filter"}</span>
          {selectedFilters.length > 0 && <b>{selectedFilters.length}</b>}
          <i aria-hidden="true" />
        </button>
        {isFilterOpen && <div className="catalog-filter-popover" id="catalog-filter-panel" role="dialog" aria-label={language === "vi" ? "Chọn bộ lọc" : "Choose filters"}>
          <div className="catalog-filter-popover-heading"><div><strong>{language === "vi" ? "Chọn danh mục" : "Choose categories"}</strong><span>{language === "vi" ? "Có thể chọn nhiều mục" : "Select one or more"}</span></div>{selectedFilters.length > 0 && <button type="button" onClick={() => { setSelectedFilters([]); updateUrl([]); }}>{language === "vi" ? "Xóa chọn" : "Clear"}</button>}</div>
          <div className="catalog-filter-options">
            {filters.map((item) => <label className={selectedFilters.includes(item) ? "selected" : ""} key={item}>
              <input checked={selectedFilters.includes(item)} type="checkbox" onChange={() => toggleFilter(item)} />
              <span className="filter-checkbox" aria-hidden="true">✓</span>
              <span>{item === "saved" ? (language === "vi" ? `Đã lưu${savedIds.length ? ` (${savedIds.length})` : ""}` : `Saved${savedIds.length ? ` (${savedIds.length})` : ""}`) : labels[item]}</span>
            </label>)}
          </div>
          <button className="catalog-filter-done" type="button" onClick={() => setIsFilterOpen(false)}>{language === "vi" ? "Xong" : "Done"}<span>→</span></button>
        </div>}
      </div>
    </div>

    <div className="catalog-results" aria-live="polite"><span>{language === "vi" ? `${visibleProducts.length} sản phẩm phù hợp` : `${visibleProducts.length} matching products`}</span>{selectedFilters.length > 0 || query ? <button type="button" onClick={clearFilters}>{language === "vi" ? "Xóa bộ lọc" : "Clear filters"}</button> : null}</div>
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
