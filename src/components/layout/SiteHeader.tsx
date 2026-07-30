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
    ? [{ href: `${homeHref}/ban-do-ai`, icon: "map" as const, label: "Bản đồ AI", note: "Tìm theo công việc" }, { href: `${homeHref}/bo-suu-tap`, icon: "sparkles" as const, label: "Chọn theo nhu cầu", note: "Bộ sưu tập" }, { href: `${homeHref}/so-sanh`, icon: "compare" as const, label: "So sánh công cụ", note: "Đặt cạnh nhau" }, { href: `${homeHref}/prompt-studio`, icon: "pen" as const, label: "Prompt Studio", note: "Tạo & lưu prompt" }, { href: `${homeHref}/lo-trinh`, icon: "path" as const, label: "Lộ trình AI", note: "Học theo workflow" }, { href: `${homeHref}/huong-dan`, icon: "guide" as const, label: "Trung tâm hướng dẫn", note: "Bắt đầu nhanh" }]
    : [{ href: `${homeHref}/ban-do-ai`, icon: "map" as const, label: "AI Map", note: "Find by work" }, { href: `${homeHref}/bo-suu-tap`, icon: "sparkles" as const, label: "Choose by goal", note: "Collections" }, { href: `${homeHref}/so-sanh`, icon: "compare" as const, label: "Compare tools", note: "Side by side" }, { href: `${homeHref}/prompt-studio`, icon: "pen" as const, label: "Prompt Studio", note: "Create & save prompts" }, { href: `${homeHref}/lo-trinh`, icon: "path" as const, label: "AI paths", note: "Learn by workflow" }, { href: `${homeHref}/huong-dan`, icon: "guide" as const, label: "Guide center", note: "Start faster" }];
  const discoverLabel = language === "vi" ? "Khám phá" : "Explore";
  const savedLabel = language === "vi" ? "My Toolkit" : "My Toolkit";

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
              {discoverLinks.map((link) => <a href={link.href} key={link.href} onClick={() => setDiscoverOpen(false)}><span><DiscoverMenuIcon name={link.icon} /></span><div><strong>{link.label}</strong><small>{link.note}</small></div><b><ArrowRightIcon /></b></a>)}
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
        <a className="utility-button saved-header-link" href={`${homeHref}/my-toolkit`} aria-label={savedLabel} title={savedLabel}>♡</a>
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
        <div className="mobile-discover-links"><span>{discoverLabel}</span>{discoverLinks.map((link) => <a href={link.href} key={link.href} onClick={onMenuClose}><i><DiscoverMenuIcon name={link.icon} /></i>{link.label}<b><ArrowRightIcon /></b></a>)}</div>
        <a href={`${homeHref}/my-toolkit`} onClick={onMenuClose}>♡ {savedLabel}<b>→</b></a>
        <a href={isCatalogPage ? `${homeHref}#lien-he` : "#lien-he"} onClick={onMenuClose}>{content.contact} <span>↗</span></a>
      </div>
    </header>
  );
}

type DiscoverMenuIconName = "map" | "sparkles" | "compare" | "pen" | "path" | "guide";

function DiscoverMenuIcon({ name }: { readonly name: DiscoverMenuIconName }) {
  if (name === "map") return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m3.5 6.4 5-2.3 7 2.8 5-2.3v13l-5 2.3-7-2.8-5 2.3v-15Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><path d="M8.5 4.1v15.1M15.5 6.9V20" stroke="currentColor" strokeWidth="1.8" /></svg>;
  if (name === "sparkles") return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m12 3 1.72 5.28L19 10l-5.28 1.72L12 17l-1.72-5.28L5 10l5.28-1.72L12 3ZM19 15l.78 2.22L22 18l-2.22.78L19 21l-.78-2.22L16 18l2.22-.78L19 15Z" fill="currentColor" /></svg>;
  if (name === "compare") return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 7h10M7 7l3-3M7 7l3 3M17 17H7m10 0-3-3m3 3-3 3" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  if (name === "pen") return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m14.6 5.1 4.3 4.3M4 20l3.5-.8L19 7.7a3 3 0 0 0-4.3-4.3L3.2 14.9 4 20Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  if (name === "path") return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="6" cy="18" r="2.3" stroke="currentColor" strokeWidth="1.8" /><circle cx="18" cy="6" r="2.3" stroke="currentColor" strokeWidth="1.8" /><path d="M7.8 16.5c5.4-1 1.2-8.1 8.4-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="2.5 3" /></svg>;
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5.5 4.5h8.2a2.3 2.3 0 0 1 2.3 2.3v12.7H7.8a2.3 2.3 0 0 0-2.3 2.3V4.5Zm13 0h-2.5v15h.2a2.3 2.3 0 0 1 2.3 2.3V4.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M8.5 9h4.8M8.5 12.5h4.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>;
}

function ArrowRightIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h13m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
