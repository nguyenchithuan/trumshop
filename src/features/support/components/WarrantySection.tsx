import type { HomeCopy } from "@/features/home/components/HomePage";

interface WarrantySectionProps { readonly content: HomeCopy; readonly openItem: number; readonly onToggle: (index: number) => void; }

export default function WarrantySection({ content, openItem, onToggle }: WarrantySectionProps) {
  return <section className="policy-section section shell scroll-reveal" id="bao-hanh"><div className="section-label"><span>04</span>{content.policyLabel}</div><div className="policy-layout"><div><p className="section-kicker">{content.policyKicker}</p><h2>{content.policyTitle}</h2><p className="policy-note">{content.policyNote}</p></div><div className="accordion-list">{content.policies.map(([title, body], index) => <article className={`accordion ${openItem === index ? "open" : ""}`} key={title}><button type="button" onClick={() => onToggle(index)}><span><small>0{index + 1}</small>{title}</span><i>+</i></button><div className="accordion-body"><p>{body}</p></div></article>)}</div></div><div className="policy-warning"><span>!</span><p>{content.policyWarning}</p></div></section>;
}
