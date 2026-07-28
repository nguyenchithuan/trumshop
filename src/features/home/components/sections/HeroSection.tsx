import type { HomeCopy } from "@/features/home/components/HomePage";

interface HeroSectionProps {
  readonly content: HomeCopy;
  readonly catalogHref: string;
}

export default function HeroSection({ content, catalogHref }: HeroSectionProps) {
  return (
    <section className="hero shell" id="trang-chu">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-copy">
        <div className="eyebrow reveal-one"><span className="status-dot" />{content.saleLabel}</div>
        <h1>{content.heroTitle}<span>{content.heroAccent}</span></h1>
        <p className="hero-lead reveal-two">{content.heroLead}</p>
        <div className="hero-plan-pills reveal-two" aria-label={content.productsLabel}>
          <span>ChatGPT</span><span>Gemini</span><span>Kling AI</span><span>CapCut Pro</span>
        </div>
        <div className="hero-actions reveal-three">
          <a className="button button-primary" href={catalogHref}>{content.seePlans} <span className="arrow">→</span></a>
          <a className="button button-secondary" href="#lien-he">{content.contactNow} <span>↗</span></a>
        </div>
        <div className="trust-row reveal-four">
          {content.trusts.map((item) => <span key={item}><i>✓</i>{item}</span>)}
        </div>
      </div>
      <div className="hero-visual" aria-label="TrumShop digital products">
        <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" />
        <div className="float-card float-card-top"><span className="mini-icon">✦</span><span><small>{content.supporting}</small>{content.quickUpgrade}</span></div>
        <div className="ai-core"><div className="core-glow" /><div className="core-ring" /><div className="core-logo">T</div><p>TRUMSHOP</p></div>
        <div className="float-card float-card-bottom"><div className="signal-bars"><i /><i /><i /><i /></div><span><small>{content.choices}</small>AI · Sáng tạo · Tiện ích</span></div>
        <span className="orbit-node node-one">GPT</span><span className="orbit-node node-two">KLING</span><span className="orbit-node node-three">GEM</span><span className="orbit-node node-four">CUT</span>
      </div>
    </section>
  );
}
