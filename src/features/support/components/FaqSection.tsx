import type { HomeCopy } from "@/features/home/components/HomePage";

interface FaqSectionProps { readonly content: HomeCopy; readonly openItem: number; readonly onToggle: (index: number) => void; }

export default function FaqSection({ content, openItem, onToggle }: FaqSectionProps) {
  return <section className="faq-section section shell scroll-reveal" id="faq"><div className="section-label"><span>06</span>{content.faqLabel}</div><div className="faq-layout"><div className="faq-copy"><p className="section-kicker">{content.faqKicker}</p><h2>{content.faqTitle}</h2><p>{content.faqLead}</p><a className="text-link" href="#lien-he">{content.faqContact}<span>→</span></a></div><div className="accordion-list faq-list">{content.faqs.map(([question, answer], index) => <article className={`accordion ${openItem === index ? "open" : ""}`} key={question}><button type="button" onClick={() => onToggle(index)}><span><small>{String(index + 1).padStart(2, "0")}</small>{question}</span><i>+</i></button><div className="accordion-body"><p>{answer}</p></div></article>)}</div></div></section>;
}
