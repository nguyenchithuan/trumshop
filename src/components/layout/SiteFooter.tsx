import type { HomeCopy, Language } from "@/features/home/components/HomePage";

interface SiteFooterProps { readonly content: HomeCopy; readonly language: Language; readonly catalogHref?: string; readonly homeHref?: string; }

export default function SiteFooter({ content, language, catalogHref = "#goi-dich-vu", homeHref = "#trang-chu" }: SiteFooterProps) {
  const isVietnamese = language === "vi";
  const baseHref = homeHref === "#trang-chu" ? "" : homeHref;
  return <footer id="phap-ly"><div className="footer-main shell"><div className="footer-brand"><a className="brand" href={homeHref}><span className="brand-mark">T</span><span>TrumShop</span></a><p>{content.footerTagline}</p></div><div className="footer-links"><div><strong>{content.explore}</strong><a href={catalogHref}>{content.servicePlans}</a><a href={`${baseHref}/ban-do-ai`}>{isVietnamese ? "Bản đồ AI" : "AI Map"}</a><a href={`${baseHref}/so-sanh`}>{isVietnamese ? "So sánh công cụ" : "Compare tools"}</a></div><div><strong>{content.supportLinks}</strong><a href={`${baseHref}/prompt-studio`}>Prompt Studio</a><a href={`${baseHref}/lo-trinh`}>{isVietnamese ? "Lộ trình AI" : "AI paths"}</a><a href={`${baseHref}/my-toolkit`}>My Toolkit</a></div><div><strong>{content.legal}</strong><a href={`${homeHref}#bao-hanh`}>{content.warrantyPolicy}</a><a href="#phap-ly">{content.privacy}</a><a href="#phap-ly">{content.independence}</a></div></div></div><div className="legal shell"><p>{content.disclaimer}</p><span>© 2026 TrumShop</span></div></footer>;
}
