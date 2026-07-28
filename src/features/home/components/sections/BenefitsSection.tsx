import type { HomeCopy } from "@/features/home/components/HomePage";

interface BenefitsSectionProps { readonly content: HomeCopy; }

export default function BenefitsSection({ content }: BenefitsSectionProps) {
  return <section className="benefits-section section shell scroll-reveal"><div className="section-label"><span>03</span>{content.whyLabel}</div><div className="bento-grid"><article className="bento-card bento-main"><span className="bento-icon">◎</span><p className="section-kicker">{content.rightNeed}</p><h2>{content.rightTitle}</h2><p>{content.rightText}</p><div className="mini-chart" aria-hidden="true"><i /><i /><i /><i /><i /></div></article><article className="bento-card bento-small"><span className="bento-icon">◇</span><h3>{content.flexible}</h3><p>{content.flexibleText}</p></article><article className="bento-card bento-small"><span className="bento-icon">↗</span><h3>{content.direct}</h3><p>{content.directText}</p></article><article className="bento-card bento-wide"><div><span className="bento-icon">✓</span><h3>{content.clear}</h3><p>{content.clearText}</p></div><div className="transparency-orb" aria-hidden="true"><span>{content.clearBadge}</span><i /><i /><i /></div></article></div></section>;
}
