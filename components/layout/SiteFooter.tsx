import type { HomeCopy } from "@/features/home/components/HomePage";

interface SiteFooterProps { readonly content: HomeCopy; }

export default function SiteFooter({ content }: SiteFooterProps) {
  return <footer id="phap-ly"><div className="footer-main shell"><div className="footer-brand"><a className="brand" href="#trang-chu"><span className="brand-mark">T</span><span>TrumShop</span></a><p>{content.footerTagline}</p></div><div className="footer-links"><div><strong>{content.explore}</strong><a href="#goi-dich-vu">{content.servicePlans}</a><a href="#so-sanh">{content.comparePlans}</a><a href="#quy-trinh">{content.buyingProcess}</a></div><div><strong>{content.supportLinks}</strong><a href="#bao-hanh">{content.warrantyPolicy}</a><a href="#faq">{content.commonQuestions}</a><a href="#lien-he">{content.contact}</a></div><div><strong>{content.legal}</strong><a href="#phap-ly">{content.terms}</a><a href="#phap-ly">{content.privacy}</a><a href="#phap-ly">{content.independence}</a></div></div></div><div className="legal shell"><p>{content.disclaimer}</p><span>© 2026 TrumShop</span></div></footer>;
}
