import type { HomeCopy } from "@/features/home/components/HomePage";

interface FloatingContactActionsProps { readonly activeSection: string; readonly content: HomeCopy; readonly scrolled: boolean; readonly onAdvice: () => void; readonly onZalo: () => void; }

export default function FloatingContactActions({ activeSection, content, scrolled, onAdvice, onZalo }: FloatingContactActionsProps) {
  const showMobileActions = scrolled && activeSection !== "goi-dich-vu";
  return <><a className={`floating-contact ${scrolled ? "visible" : ""}`} href="#lien-he"><span>✦</span><strong>{content.contact}</strong></a><button className={`back-to-top ${scrolled ? "visible" : ""}`} type="button" aria-label={content.backTop} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>↑</button><div className={`mobile-contact-bar ${showMobileActions ? "visible" : ""}`}><button type="button" onClick={onZalo}>Zalo</button><button type="button" onClick={onAdvice}>{content.advice}<span>↗</span></button></div></>;
}
