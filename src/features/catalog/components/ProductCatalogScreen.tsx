"use client";

import { useEffect, useMemo, useState } from "react";
import { useTheme } from "@/providers/AppProviders";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import ConsultationModal from "@/features/consultation/components/ConsultationModal";
import QuickContactWidget from "@/features/contact/components/QuickContactWidget";
import { CONTACT_LINKS, copy, type Language, type Theme } from "@/features/home/components/HomePage";
import { changeTheme } from "@/features/home/themeTransition";
import type { CatalogProduct } from "@/features/catalog/data/catalog";
import ProductCatalog from "./ProductCatalog";

type ModalState = { readonly product: string; readonly warranty: string } | null;

interface ProductCatalogScreenProps { readonly initialLanguage: Language; }

export default function ProductCatalogScreen({ initialLanguage }: ProductCatalogScreenProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [language] = useState<Language>(initialLanguage);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState<ModalState>(null);
  const [toast, setToast] = useState("");
  const content = copy[language];
  const theme: Theme = resolvedTheme === "light" ? "light" : "dark";
  const homeHref = `/${language}`;
  const catalogHref = `/${language}/san-pham`;

  useEffect(() => {
    document.documentElement.lang = language;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [language]);

  useEffect(() => {
    if (!modal) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setModal(null); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKeyDown); };
  }, [modal]);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(""), 2600);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const message = useMemo(() => {
    if (!modal) return "";
    return language === "vi"
      ? `Xin chào TrumShop, tôi muốn được tư vấn ${modal.product}. ${modal.warranty}. Vui lòng báo giá và hướng dẫn giúp tôi.`
      : `Hello TrumShop, I would like advice on ${modal.product}. ${modal.warranty}. Please send me a quote and instructions.`;
  }, [language, modal]);

  const selectProduct = (product: CatalogProduct) => setModal({ product: product.name[language], warranty: product.warranty[language] });
  const openChannel = (channel: "zalo" | "facebook" | "instagram") => {
    const target = CONTACT_LINKS[channel];
    if (target) { window.open(target, "_blank", "noopener,noreferrer"); return; }
    setToast(content.channelUpdating);
  };

  return <main className="catalog-page">
    <div className="site-noise" aria-hidden="true" /><div className="ambient ambient-one" aria-hidden="true" /><div className="ambient ambient-two" aria-hidden="true" />
    <SiteHeader activeSection="san-pham" catalogHref={catalogHref} content={content} homeHref={homeHref} isCatalogPage language={language} menuOpen={menuOpen} scrolled={scrolled} theme={theme} onLanguageToggle={() => window.location.assign(`/${language === "vi" ? "en" : "vi"}/san-pham`)} onMenuClose={() => setMenuOpen(false)} onMenuToggle={() => setMenuOpen((value) => !value)} onThemeToggle={(origin) => changeTheme(theme === "dark" ? "light" : "dark", setTheme, origin)} />
    <ProductCatalog language={language} onSelect={selectProduct} />
    <SiteFooter catalogHref={catalogHref} content={content} homeHref={homeHref} />
    <QuickContactWidget language={language} />
    {modal && <ConsultationModal content={content} message={message} onChannel={openChannel} onClose={() => setModal(null)} />}
    <div className={`toast ${toast ? "show" : ""}`} role="status"><span>✓</span>{toast}</div>
  </main>;
}
