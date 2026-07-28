import type { CSSProperties } from "react";
import type { HomeCopy } from "@/features/home/components/HomePage";

interface PurchaseProcessSectionProps { readonly content: HomeCopy; }

export default function PurchaseProcessSection({ content }: PurchaseProcessSectionProps) {
  return <section className="process-section section shell scroll-reveal" id="quy-trinh"><div className="section-label"><span>03</span>{content.processLabel}</div><div className="process-layout"><div className="process-copy"><p className="section-kicker">{content.processKicker}</p><h2>{content.processTitle}</h2><p>{content.processNote}</p><a className="text-link" href="#goi-dich-vu">{content.start}<span>→</span></a></div><div className="timeline">{content.steps.map(([number, title, body], index) => <article className="timeline-step" key={number} style={{ "--delay": `${index * 100}ms` } as CSSProperties}><div className="step-number">{number}</div><div><h3>{title}</h3><p>{body}</p></div></article>)}</div></div></section>;
}
