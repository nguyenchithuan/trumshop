"use client";

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
  const hrefFor = (id: string) => {
    if (id === "san-pham") return catalogHref;
    if (id === "tu-van") return advisorHref;
    return isCatalogPage ? `${homeHref}#${id}` : `#${id}`;
  };

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <a className="brand" href={homeHref} aria-label="TrumShop" onClick={onMenuClose}>
        <span className="brand-mark">T</span>
        <span>TrumShop</span>
      </a>
      <nav className="desktop-nav" aria-label={language === "vi" ? "Điều hướng chính" : "Main navigation"}>
        {content.nav.map(([id, label]) => (
          <a className={activeSection === id || (id === "san-pham" && activeSection === "san-pham-noi-bat") ? "active" : ""} href={hrefFor(id)} key={id}>{label}</a>
        ))}
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
        <a href={isCatalogPage ? `${homeHref}#lien-he` : "#lien-he"} onClick={onMenuClose}>{content.contact} <span>↗</span></a>
      </div>
    </header>
  );
}
