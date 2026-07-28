import type { HomeCopy } from "@/features/home/components/HomePage";

interface SiteFooterProps { readonly content: HomeCopy; readonly catalogHref?: string; readonly homeHref?: string; }

export default function SiteFooter({ content, catalogHref = "#goi-dich-vu", homeHref = "#trang-chu" }: SiteFooterProps) {
  return <footer id="phap-ly"><div className="footer-main shell"><div className="footer-brand"><a className="brand" href={homeHref}><span className="brand-mark">T</span><span>TrumShop</span></a><p>{content.footerTagline}</p></div><div className="footer-links"><div><strong>{content.explore}</strong><a href={catalogHref}>{content.servicePlans}</a><a href={catalogHref}>{content.comparePlans}</a><a href={`${homeHref}#quy-trinh`}>{content.buyingProcess}</a></div><div><strong>{content.supportLinks}</strong><a href={`${homeHref}#bao-hanh`}>{content.warrantyPolicy}</a><a href={`${homeHref}#faq`}>{content.commonQuestions}</a><a href={`${homeHref}#lien-he`}>{content.contact}</a></div><div><strong>{content.legal}</strong><a href="#phap-ly">{content.terms}</a><a href="#phap-ly">{content.privacy}</a><a href="#phap-ly">{content.independence}</a></div></div></div><div className="legal shell"><p>{content.disclaimer}</p><span>© 2026 TrumShop</span></div></footer>;
}
