"use client";

import { useState } from "react";
import type { HomeCopy, Language, Theme } from "@/features/home/components/HomePage";

interface SiteHeaderProps {
  readonly activeSection: string;
  readonly content: HomeCopy;
  readonly language: Language;
  readonly menuOpen: boolean;
  readonly scrolled: boolean;
  readonly theme: Theme;
  readonly catalogHref?: string;
  readonly advisorHref?: string;
  readonly homeHref?: string;
  readonly isCatalogPage?: boolean;
  readonly onLanguageToggle: () => void;
  readonly onMenuClose: () => void;
  readonly onMenuToggle: () => void;
  readonly onThemeToggle: (origin: HTMLButtonElement) => void;
}

export default function SiteHeader({
  activeSection,
  content,
  language,
  menuOpen,
  scrolled,
  theme,
  catalogHref = "#goi-dich-vu",
  advisorHref = "#tu-van",
  homeHref = "#trang-chu",
  isCatalogPage = false,
  onLanguageToggle,
  onMenuClose,
  onMenuToggle,
  onThemeToggle,
}: SiteHeaderProps) {
  const [discoverOpen, setDiscoverOpen] = useState(false);
  const hrefFor = (id: string) => {
    if (id === "san-pham") return catalogHref;
    if (id === "tu-van") return advisorHref;
    return isCatalogPage ? `${homeHref}#${id}` : `#${id}`;
  };
  const discoverLinks = language === "vi"
    ? [{ href: `${homeHref}/bo-suu-tap`, icon: "✦", label: "Chọn theo nhu cầu", note: "Bộ sưu tập" }, { href: `${homeHref}/so-sanh`, icon: "↔", label: "So sánh công cụ", note: "Đặt cạnh nhau" }, { href: `${homeHref}/huong-dan`, icon: "?", label: "Trung tâm hướng dẫn", note: "Bắt đầu nhanh" }]
    : [{ href: `${homeHref}/bo-suu-tap`, icon: "✦", label: "Choose by goal", note: "Collections" }, { href: `${homeHref}/so-sanh`, icon: "↔", label: "Compare tools", note: "Side by side" }, { href: `${homeHref}/huong-dan`, icon: "?", label: "Guide center", note: "Start faster" }];
  const discoverLabel = language === "vi" ? "Khám phá" : "Explore";
  const savedLabel = language === "vi" ? "Sản phẩm đã lưu" : "Saved products";

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <a className="brand" href={homeHref} aria-label="TrumShop" onClick={onMenuClose}>
        <span className="brand-mark">T</span>
        <span>TrumShop</span>
      </a>
      <nav className="desktop-nav" aria-label={language === "vi" ? "Điều hướng chính" : "Main navigation"}>
        {content.nav.map(([id, label]) => <div className="desktop-nav-item" key={id}>
          <a className={activeSection === id || (id === "san-pham" && activeSection === "san-pham-noi-bat") ? "active" : ""} href={hrefFor(id)}>{label}</a>
          {id === "san-pham" && <div className="discover-menu" onMouseLeave={() => setDiscoverOpen(false)}>
            <button aria-expanded={discoverOpen} className={discoverOpen ? "active" : ""} type="button" onClick={() => setDiscoverOpen((open) => !open)}>{discoverLabel}<i aria-hidden="true" /></button>
            <div className={`discover-popover ${discoverOpen ? "open" : ""}`}>
              {discoverLinks.map((link) => <a href={link.href} key={link.href} onClick={() => setDiscoverOpen(false)}><span>{link.icon}</span><div><strong>{link.label}</strong><small>{link.note}</small></div><b>→</b></a>)}
            </div>
          </div>}
        </div>)}
      </nav>
      <div className="header-tools">
        <button
          className="utility-button theme-toggle"
          type="button"
          aria-label={theme === "dark" ? content.themeLight : content.themeDark}
          title={theme === "dark" ? content.themeLight : content.themeDark}
          onClick={(event) => onThemeToggle(event.currentTarget)}
        >
          <span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
          <small>{theme === "dark" ? "Light" : "Dark"}</small>
        </button>
        <button
          className="utility-button language-toggle"
          type="button"
          aria-label={language === "vi" ? "Switch to English" : "Chuyển sang tiếng Việt"}
          onClick={onLanguageToggle}
        >
          <span className="language-icon" aria-hidden="true">文</span>
          <strong>{language.toUpperCase()}</strong>
        </button>
        <a className="utility-button saved-header-link" href={`${homeHref}/da-luu`} aria-label={savedLabel} title={savedLabel}>♡</a>
      </div>
      <a className="button button-small button-ghost header-cta" href={isCatalogPage ? `${homeHref}#lien-he` : "#lien-he"}>{content.contact} <span>↗</span></a>
      <button
        className={`menu-toggle ${menuOpen ? "open" : ""}`}
        type="button"
        aria-label={menuOpen ? content.menuClose : content.menuOpen}
        aria-expanded={menuOpen}
        onClick={onMenuToggle}
      >
        <i /><i />
      </button>
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {content.nav.map(([id, label]) => (
          <a href={hrefFor(id)} key={id} onClick={onMenuClose}>{label}</a>
        ))}
        <div className="mobile-discover-links"><span>{discoverLabel}</span>{discoverLinks.map((link) => <a href={link.href} key={link.href} onClick={onMenuClose}>{link.icon} {link.label}<b>→</b></a>)}</div>
        <a href={`${homeHref}/da-luu`} onClick={onMenuClose}>♡ {savedLabel}<b>→</b></a>
        <a href={isCatalogPage ? `${homeHref}#lien-he` : "#lien-he"} onClick={onMenuClose}>{content.contact} <span>↗</span></a>
      </div>
    </header>
  );
}
