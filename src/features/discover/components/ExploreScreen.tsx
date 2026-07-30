"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import type { CSSProperties } from "react";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import QuickContactWidget from "@/features/contact/components/QuickContactWidget";
import { catalogProductDetails, catalogProducts, type CatalogProduct } from "@/features/catalog/data/catalog";
import { copy, type Language, type Theme } from "@/features/home/components/HomePage";
import { changeTheme } from "@/features/home/themeTransition";
import { useTheme } from "@/providers/AppProviders";
import { collections, guides, type CollectionId, type Guide } from "../data/discover";

export type ExploreView = "collections" | "compare" | "guides" | "saved";

interface ExploreScreenProps { readonly initialLanguage: Language; readonly view: ExploreView; }

const productFromIds = (ids: readonly string[]) => ids.map((id) => catalogProducts.find((product) => product.id === id)).filter((product): product is CatalogProduct => Boolean(product));

export default function ExploreScreen({ initialLanguage, view }: ExploreScreenProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [language] = useState<Language>(initialLanguage);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCollection, setActiveCollection] = useState<CollectionId>("study");
  const [comparedIds, setComparedIds] = useState<readonly string[]>(["chatgpt", "gemini"]);
  const [activeGuide, setActiveGuide] = useState<Guide | null>(guides[0]);
  const [guideQuery, setGuideQuery] = useState("");
  const [savedIds, setSavedIds] = useState<readonly string[]>([]);
  const content = copy[language];
  const theme: Theme = resolvedTheme === "light" ? "light" : "dark";
  const homeHref = `/${language}`;
  const catalogHref = `/${language}/san-pham`;
  const advisorHref = `/${language}/tu-van`;
  const activeBundle = collections.find((collection) => collection.id === activeCollection) ?? collections[0];
  const comparedProducts = productFromIds(comparedIds);
  const visibleGuides = useMemo(() => {
    const query = guideQuery.trim().toLocaleLowerCase();
    if (!query) return guides;
    return guides.filter((guide) => [guide.title[language], guide.description[language], guide.category[language]].join(" ").toLocaleLowerCase().includes(query));
  }, [guideQuery, language]);
  const savedProducts = productFromIds(savedIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const frame = window.requestAnimationFrame(() => {
      try {
        const stored = JSON.parse(window.localStorage.getItem("trumshop-saved") ?? "[]");
        if (Array.isArray(stored)) setSavedIds(stored.filter((id): id is string => typeof id === "string"));
      } catch { /* Saved products are only a device-local convenience. */ }
    });
    return () => { window.removeEventListener("scroll", onScroll); window.cancelAnimationFrame(frame); };
  }, []);

  const labels = language === "vi"
    ? {
      collections: { eyebrow: "CHỌN THEO NHU CẦU", title: "Một bộ công cụ.\nMột nhịp làm việc tốt hơn.", lead: "Các bộ sưu tập được sắp theo việc bạn cần làm, để bắt đầu nhanh mà không phải tự ghép từng công cụ.", pick: "Chọn một bộ sưu tập", includes: "BỘ NÀY GỒM", outcome: "KẾT QUẢ HƯỚNG TỚI", view: "Xem chi tiết" },
      compare: { eyebrow: "SO SÁNH THÔNG MINH", title: "Đặt công cụ cạnh nhau.\nChọn rõ ràng hơn.", lead: "Chọn tối đa ba công cụ để xem điểm mạnh, loại quyền lợi và ghi chú sử dụng trong cùng một nơi.", select: "Chọn công cụ để so sánh", limit: "Tối đa 3 công cụ", capability: "Điểm phù hợp", plans: "Loại gói", warranty: "Hỗ trợ & bảo hành", empty: "Hãy chọn ít nhất một công cụ để bắt đầu." },
      guides: { eyebrow: "TRUNG TÂM HƯỚNG DẪN", title: "Bắt đầu tự tin.\nDùng công cụ có mục đích.", lead: "Các hướng dẫn ngắn, thực tế để bạn đi từ nhu cầu đến quy trình làm việc phù hợp.", search: "Tìm hướng dẫn", placeholder: "Tìm AI, video, code...", read: "Mở hướng dẫn", steps: "CÁC BƯỚC GỢI Ý", tools: "CÔNG CỤ LIÊN QUAN" },
      saved: { eyebrow: "DANH SÁCH CỦA BẠN", title: "Những công cụ\nbạn đang cân nhắc.", lead: "Danh sách này được lưu ngay trên thiết bị của bạn. Không cần tài khoản, không gửi dữ liệu đi đâu.", emptyTitle: "Chưa có sản phẩm được lưu", emptyLead: "Khi gặp công cụ phù hợp, hãy nhấn biểu tượng trái tim để quay lại xem sau.", browse: "Khám phá danh mục", remove: "Bỏ lưu" },
    }
    : {
      collections: { eyebrow: "CHOOSE BY GOAL", title: "One toolset.\nA better rhythm.", lead: "Collections are organized around what you need to do, so you can start without piecing every tool together.", pick: "Choose a collection", includes: "THIS COLLECTION INCLUDES", outcome: "DESIGNED TO HELP YOU", view: "View details" },
      compare: { eyebrow: "SMART COMPARISON", title: "Put tools side by side.\nChoose with clarity.", lead: "Choose up to three tools to compare strengths, plan types and usage notes in one place.", select: "Select tools to compare", limit: "Up to 3 tools", capability: "A good fit for", plans: "Plan types", warranty: "Support & warranty", empty: "Choose at least one tool to begin." },
      guides: { eyebrow: "GUIDE CENTER", title: "Start with confidence.\nUse tools with purpose.", lead: "Short, practical guides to move from a need to a fitting workflow.", search: "Search guides", placeholder: "Search AI, video, code...", read: "Open guide", steps: "SUGGESTED STEPS", tools: "RELATED TOOLS" },
      saved: { eyebrow: "YOUR LIST", title: "Tools you are\nconsidering.", lead: "This list is saved on this device. No account needed, and no data is sent anywhere.", emptyTitle: "No saved products yet", emptyLead: "When you find a good fit, tap the heart icon and come back to it later.", browse: "Browse catalog", remove: "Remove" },
    };
  const label = labels[view];

  const toggleCompared = (productId: string) => setComparedIds((current) => current.includes(productId) ? current.filter((id) => id !== productId) : current.length >= 3 ? current : [...current, productId]);
  const removeSaved = (productId: string) => {
    const next = savedIds.filter((id) => id !== productId);
    setSavedIds(next);
    try { window.localStorage.setItem("trumshop-saved", JSON.stringify(next)); } catch { /* Optional browser storage. */ }
  };

  return <main className="discover-page">
    <div className="site-noise" aria-hidden="true" /><div className="ambient ambient-one" aria-hidden="true" /><div className="ambient ambient-two" aria-hidden="true" />
    <SiteHeader activeSection="san-pham" advisorHref={advisorHref} catalogHref={catalogHref} content={content} homeHref={homeHref} isCatalogPage language={language} menuOpen={menuOpen} scrolled={scrolled} theme={theme} onLanguageToggle={() => window.location.assign(`/${language === "vi" ? "en" : "vi"}/${view === "collections" ? "bo-suu-tap" : view === "compare" ? "so-sanh" : view === "guides" ? "huong-dan" : "da-luu"}`)} onMenuClose={() => setMenuOpen(false)} onMenuToggle={() => setMenuOpen((value) => !value)} onThemeToggle={(origin) => changeTheme(theme === "dark" ? "light" : "dark", setTheme, origin)} />
    <section className="discover-shell shell"><div className="discover-intro"><span className="catalog-kicker"><span className="status-dot" />{label.eyebrow}</span><h1>{label.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h1><p>{label.lead}</p></div>
      {view === "collections" && <CollectionsView activeBundle={activeBundle} catalogHref={catalogHref} language={language} label={label} onSelect={setActiveCollection} />}
      {view === "compare" && <CompareView comparedProducts={comparedProducts} comparedIds={comparedIds} language={language} label={label} onToggle={toggleCompared} />}
      {view === "guides" && <GuidesView activeGuide={activeGuide} catalogHref={catalogHref} guides={visibleGuides} language={language} label={label} query={guideQuery} onGuide={setActiveGuide} onQuery={setGuideQuery} />}
      {view === "saved" && <SavedView catalogHref={catalogHref} language={language} label={label} products={savedProducts} onRemove={removeSaved} />}
    </section>
    <SiteFooter catalogHref={catalogHref} content={content} homeHref={homeHref} language={language} /><QuickContactWidget language={language} />
  </main>;
}

function ProductIcon({ product, size = 28 }: { readonly product: CatalogProduct; readonly size?: number }) {
  return <>{product.iconPath ? <Image alt="" height={size} src={product.iconPath} unoptimized width={size} /> : product.icon}</>;
}

function CollectionsView({ activeBundle, catalogHref, language, label, onSelect }: { readonly activeBundle: typeof collections[number]; readonly catalogHref: string; readonly language: Language; readonly label: Record<string, string>; readonly onSelect: (id: CollectionId) => void }) {
  const products = productFromIds(activeBundle.productIds);
  return <div className="collection-layout"><div className="collection-picker"><p>{label.pick}</p>{collections.map((collection) => <button className={activeBundle.id === collection.id ? "active" : ""} key={collection.id} type="button" onClick={() => onSelect(collection.id)} style={{ "--collection-accent": collection.accent } as CSSProperties}><span>{collection.icon}</span><div><strong>{collection.title[language]}</strong><small>{collection.description[language]}</small></div><b>→</b></button>)}</div><section className="collection-detail" style={{ "--collection-accent": activeBundle.accent } as CSSProperties}><div className="collection-detail-head"><span>{activeBundle.icon}</span><div><p>{label.includes}</p><h2>{activeBundle.title[language]}</h2></div></div><p className="collection-outcome"><i>✦</i>{activeBundle.outcome[language]}</p><div className="collection-products">{products.map((product) => <a href={`${catalogHref}/${product.id}`} key={product.id}><span><ProductIcon product={product} /></span><div><small>{product.category === "creative" ? (language === "vi" ? "SÁNG TẠO" : "CREATIVE") : (language === "vi" ? "CÔNG CỤ" : "TOOL")}</small><h3>{product.name[language]}</h3><p>{product.description[language]}</p></div><b>→</b></a>)}</div></section></div>;
}

function CompareView({ comparedIds, comparedProducts, language, label, onToggle }: { readonly comparedIds: readonly string[]; readonly comparedProducts: readonly CatalogProduct[]; readonly language: Language; readonly label: Record<string, string>; readonly onToggle: (id: string) => void }) {
  return <div className="compare-layout"><section className="compare-picker"><div><p>{label.select}</p><small>{label.limit}</small></div><div>{catalogProducts.filter((product) => !product.soldOut).map((product) => <button className={comparedIds.includes(product.id) ? "selected" : ""} key={product.id} type="button" onClick={() => onToggle(product.id)} style={{ "--compare-accent": product.accent } as CSSProperties}><span><ProductIcon product={product} size={22} /></span>{product.name[language]}<i>{comparedIds.includes(product.id) ? "✓" : "+"}</i></button>)}</div></section>{comparedProducts.length ? <section className="compare-table-wrap"><div className="compare-table" style={{ "--compare-columns": comparedProducts.length } as CSSProperties}><div className="compare-label-cell" /><div className="compare-product-heads">{comparedProducts.map((product) => <a href={`/${language}/san-pham/${product.id}`} key={product.id} style={{ "--compare-accent": product.accent } as CSSProperties}><span><ProductIcon product={product} /></span><strong>{product.name[language]}</strong><b>→</b></a>)}</div><div className="compare-label-cell">{label.capability}</div><div className="compare-product-cells">{comparedProducts.map((product) => <ul key={product.id}>{catalogProductDetails[product.id].capabilities[language].slice(0, 3).map((item) => <li key={item}>✓ {item}</li>)}</ul>)}</div><div className="compare-label-cell">{label.plans}</div><div className="compare-product-cells">{comparedProducts.map((product) => <ul key={product.id}>{product.variants[language].slice(0, 3).map((item) => <li key={item}>{item}</li>)}</ul>)}</div><div className="compare-label-cell">{label.warranty}</div><div className="compare-product-cells">{comparedProducts.map((product) => <p key={product.id}>◌ {product.warranty[language]}</p>)}</div></div></section> : <div className="discover-empty">⌕<p>{label.empty}</p></div>}</div>;
}

function GuidesView({ activeGuide, catalogHref, guides: visibleGuides, language, label, onGuide, onQuery, query }: { readonly activeGuide: Guide | null; readonly catalogHref: string; readonly guides: readonly Guide[]; readonly language: Language; readonly label: Record<string, string>; readonly query: string; readonly onGuide: (guide: Guide) => void; readonly onQuery: (value: string) => void }) {
  return <div className="guides-layout"><div className="guide-search"><label>{label.search}<input placeholder={label.placeholder} value={query} onChange={(event) => onQuery(event.target.value)} /></label></div><div className="guide-grid">{visibleGuides.map((guide, index) => <button className={activeGuide?.id === guide.id ? "active" : ""} key={guide.id} type="button" onClick={() => onGuide(guide)}><span>0{index + 1}</span><small>{guide.category[language]} · {guide.duration[language]}</small><h2>{guide.title[language]}</h2><p>{guide.description[language]}</p><b>{label.read} →</b></button>)}</div>{activeGuide && <article className="guide-article"><div><p className="section-kicker">{activeGuide.category[language]}</p><h2>{activeGuide.title[language]}</h2><p>{activeGuide.description[language]}</p></div><div className="guide-steps"><p>{label.steps}</p><ol>{activeGuide.steps[language].map((step) => <li key={step}>{step}</li>)}</ol></div><div className="guide-tools"><p>{label.tools}</p>{productFromIds(activeGuide.productIds).map((product) => <a href={`${catalogHref}/${product.id}`} key={product.id}><span><ProductIcon product={product} size={20} /></span>{product.name[language]}<b>→</b></a>)}</div></article>}</div>;
}

function SavedView({ catalogHref, label, language, onRemove, products }: { readonly catalogHref: string; readonly label: Record<string, string>; readonly language: Language; readonly onRemove: (id: string) => void; readonly products: readonly CatalogProduct[] }) {
  if (!products.length) return <div className="saved-empty"><span>♡</span><h2>{label.emptyTitle}</h2><p>{label.emptyLead}</p><a href={catalogHref}>{label.browse}<b>→</b></a></div>;
  return <div className="saved-grid">{products.map((product) => <article key={product.id} style={{ "--saved-accent": product.accent } as CSSProperties}><button aria-label={label.remove} type="button" onClick={() => onRemove(product.id)}>×</button><span className="saved-product-icon"><ProductIcon product={product} size={34} /></span><small>{product.category === "creative" ? (language === "vi" ? "SÁNG TẠO AI" : "CREATIVE AI") : (language === "vi" ? "TIỆN ÍCH SỐ" : "DIGITAL TOOL")}</small><h2>{product.name[language]}</h2><p>{product.description[language]}</p><a href={`${catalogHref}/${product.id}`}>{language === "vi" ? "Xem sản phẩm" : "View product"}<b>→</b></a></article>)}</div>;
}
