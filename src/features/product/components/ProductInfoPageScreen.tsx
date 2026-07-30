"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import type { CSSProperties } from "react";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import ConsultationModal from "@/features/consultation/components/ConsultationModal";
import QuickContactWidget from "@/features/contact/components/QuickContactWidget";
import { CONTACT_LINKS, copy, type Language, type Theme } from "@/features/home/components/HomePage";
import { changeTheme } from "@/features/home/themeTransition";
import { catalogProductDetails, catalogProducts, type CatalogProduct } from "@/features/catalog/data/catalog";
import { useTheme } from "@/providers/AppProviders";

interface ProductInfoPageScreenProps { readonly initialLanguage: Language; readonly product: CatalogProduct; }

export default function ProductInfoPageScreen({ initialLanguage, product }: ProductInfoPageScreenProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [language] = useState<Language>(initialLanguage);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isConsulting, setIsConsulting] = useState(false);
  const [toast, setToast] = useState("");
  const content = copy[language];
  const detail = catalogProductDetails[product.id];
  const theme: Theme = resolvedTheme === "light" ? "light" : "dark";
  const homeHref = `/${language}`;
  const catalogHref = `/${language}/san-pham`;
  const advisorHref = `/${language}/tu-van`;
  const relatedProducts = catalogProducts.filter((item) => item.id !== product.id && (item.category === product.category || item.codeRelated === product.codeRelated)).slice(0, 3);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const frame = window.requestAnimationFrame(() => {
      try { setIsSaved(JSON.parse(window.localStorage.getItem("trumshop-saved") ?? "[]").includes(product.id)); } catch { /* Optional browser convenience. */ }
    });
    return () => { window.removeEventListener("scroll", onScroll); window.cancelAnimationFrame(frame); };
  }, [product.id]);

  useEffect(() => {
    if (!isConsulting) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setIsConsulting(false); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKeyDown); };
  }, [isConsulting]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2400);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const message = useMemo(() => language === "vi"
    ? `Xin chào TrumShop, tôi muốn được tư vấn ${product.name.vi}. ${product.warranty.vi}. Vui lòng báo giá và hướng dẫn giúp tôi.`
    : `Hello TrumShop, I would like advice on ${product.name.en}. ${product.warranty.en}. Please send me a quote and instructions.`, [language, product]);

  const toggleSaved = () => {
    const next = !isSaved;
    setIsSaved(next);
    try {
      const saved = JSON.parse(window.localStorage.getItem("trumshop-saved") ?? "[]") as unknown;
      const savedIds = Array.isArray(saved) ? saved.filter((id): id is string => typeof id === "string") : [];
      window.localStorage.setItem("trumshop-saved", JSON.stringify(next ? [...new Set([...savedIds, product.id])] : savedIds.filter((id) => id !== product.id)));
    } catch { /* Saving is intentionally non-essential. */ }
    setToast(next ? (language === "vi" ? "Đã lưu sản phẩm" : "Product saved") : (language === "vi" ? "Đã bỏ lưu sản phẩm" : "Product removed from saved"));
  };

  const openChannel = (channel: "zalo" | "facebook" | "instagram") => {
    const target = CONTACT_LINKS[channel];
    if (target) {
      const opened = window.open(target, "_blank", "noopener,noreferrer");
      if (!opened) window.location.assign(target);
      return;
    }
    setToast(content.channelUpdating);
  };

  return <main className="product-page">
    <div className="site-noise" aria-hidden="true" /><div className="ambient ambient-one" aria-hidden="true" /><div className="ambient ambient-two" aria-hidden="true" />
    <SiteHeader activeSection="san-pham" advisorHref={advisorHref} catalogHref={catalogHref} content={content} homeHref={homeHref} isCatalogPage language={language} menuOpen={menuOpen} scrolled={scrolled} theme={theme} onLanguageToggle={() => window.location.assign(`/${language === "vi" ? "en" : "vi"}/san-pham/${product.id}`)} onMenuClose={() => setMenuOpen(false)} onMenuToggle={() => setMenuOpen((value) => !value)} onThemeToggle={(origin) => changeTheme(theme === "dark" ? "light" : "dark", setTheme, origin)} />
    <section className="product-page-shell shell" style={{ "--product-accent": product.accent } as CSSProperties}>
      <a className="breadcrumb-link" href={catalogHref}>← {language === "vi" ? "Quay lại danh mục" : "Back to catalog"}</a>
      <div className="product-page-hero">
        <div className="product-page-icon">{product.iconPath ? <Image alt="" height={54} src={product.iconPath} unoptimized width={54} /> : product.icon}</div>
        <div className="product-page-title"><p>{language === "vi" ? "TRANG SẢN PHẨM" : "PRODUCT PAGE"}</p><h1>{product.name[language]}</h1><span>{product.soldOut ? (language === "vi" ? "Tạm hết hàng" : "Temporarily unavailable") : (product.featured ? (language === "vi" ? "Được quan tâm nhiều" : "Popular choice") : (language === "vi" ? "Có sẵn để tư vấn" : "Available for consultation"))}</span></div>
        <button className={`product-save-button ${isSaved ? "saved" : ""}`} type="button" onClick={toggleSaved}>{isSaved ? "♥" : "♡"}<span>{isSaved ? (language === "vi" ? "Đã lưu" : "Saved") : (language === "vi" ? "Lưu sản phẩm" : "Save product")}</span></button>
      </div>
      <div className="product-page-layout">
        <div className="product-page-main"><p className="product-page-overview">{detail.overview[language]}</p><section className="product-page-panel"><p className="product-detail-kicker">{language === "vi" ? "AI NÀY LÀM ĐƯỢC GÌ?" : "WHAT CAN IT DO?"}</p><ul className="product-detail-list">{detail.capabilities[language].map((item) => <li key={item}><i>✦</i>{item}</li>)}</ul></section><section className="product-page-panel"><p className="product-detail-kicker">{language === "vi" ? "LƯU Ý KHI CHỌN GÓI" : "BEFORE YOU CHOOSE"}</p><p className="product-page-note">◌ {detail.availabilityNote[language]}</p></section></div>
        <aside className="product-page-sidebar"><div className="product-plan-card"><p>{language === "vi" ? "CÁC LỰA CHỌN ĐANG CÓ" : "AVAILABLE OPTIONS"}</p><h2>{language === "vi" ? "Chọn đúng gói, dùng đúng việc." : "Choose the plan for the job."}</h2><ul>{product.variants[language].map((variant) => <li key={variant}><i>✓</i>{variant}</li>)}</ul><small>◌ {product.warranty[language]}</small><button className={product.soldOut ? "is-sold-out" : ""} disabled={product.soldOut} type="button" onClick={() => setIsConsulting(true)}>{product.soldOut ? (language === "vi" ? "Tạm hết hàng" : "Out of stock") : (language === "vi" ? "Nhận tư vấn gói phù hợp" : "Get plan advice")}<b>↗</b></button>{detail.officialUrl && <a href={detail.officialUrl} rel="noreferrer" target="_blank">{language === "vi" ? "Xem trang chính thức" : "Visit official website"}<b>↗</b></a>}</div><div className="product-page-trust"><span>✦</span><p>{language === "vi" ? "Quyền lợi, thời hạn và cách nhận sẽ được xác nhận rõ trước khi bạn chọn gói." : "Benefits, duration and delivery method are confirmed clearly before you choose a plan."}</p></div></aside>
      </div>
      <section className="product-related"><div><p className="section-kicker">{language === "vi" ? "KHÁM PHÁ THÊM" : "KEEP EXPLORING"}</p><h2>{language === "vi" ? "Có thể bạn cũng cần." : "You may also need."}</h2></div><div className="product-related-grid">{relatedProducts.map((item) => <a href={`${catalogHref}/${item.id}`} key={item.id} style={{ "--related-accent": item.accent } as CSSProperties}><span>{item.iconPath ? <Image alt="" height={25} src={item.iconPath} unoptimized width={25} /> : item.icon}</span><div><small>{item.category === "creative" ? (language === "vi" ? "SÁNG TẠO" : "CREATIVE") : (language === "vi" ? "CÔNG CỤ SỐ" : "DIGITAL TOOL")}</small><h3>{item.name[language]}</h3></div><b>→</b></a>)}</div></section>
    </section>
    <SiteFooter catalogHref={catalogHref} content={content} homeHref={homeHref} language={language} /><QuickContactWidget language={language} />
    {isConsulting && <ConsultationModal content={content} message={message} onChannel={openChannel} onClose={() => setIsConsulting(false)} />}
    <div className={`toast ${toast ? "show" : ""}`} role="status"><span>✓</span>{toast}</div>
  </main>;
}
