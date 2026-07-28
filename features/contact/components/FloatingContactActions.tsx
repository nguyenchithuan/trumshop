import type { HomeCopy } from "@/features/home/components/HomePage";

interface FloatingContactActionsProps { readonly content: HomeCopy; readonly scrolled: boolean; readonly onAdvice: () => void; }

export default function FloatingContactActions({ content, scrolled, onAdvice }: FloatingContactActionsProps) {
  return <><a className={`floating-contact ${scrolled ? "visible" : ""}`} href="#lien-he"><span>✦</span><strong>{content.contact}</strong></a><button className={`back-to-top ${scrolled ? "visible" : ""}`} type="button" aria-label={content.backTop} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>↑</button><div className={`mobile-contact-bar ${scrolled ? "visible" : ""}`}><button type="button" onClick={onAdvice}>Zalo</button><button type="button" onClick={onAdvice}>{content.advice}<span>↗</span></button></div></>;
}
