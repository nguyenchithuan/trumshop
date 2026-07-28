import type { HomeCopy } from "@/features/home/components/HomePage";

interface ComparisonSectionProps { readonly content: HomeCopy; }

export default function ComparisonSection({ content }: ComparisonSectionProps) {
  return <section className="comparison-section section shell scroll-reveal" id="so-sanh"><div className="section-label"><span>02</span>{content.comparisonLabel}</div><div className="section-heading compact"><div><p className="section-kicker">{content.comparisonKicker}</p><h2>{content.comparisonTitle}</h2></div><p>{content.comparisonNote}</p></div><div className="comparison-wrap"><table><thead><tr><th>{content.criteria}</th><th><span className="table-dot cyan" />Go</th><th><span className="table-dot violet" />Plus <small>{content.recommended}</small></th><th><span className="table-dot blue" />Pro</th><th><span className="table-dot emerald" />Business</th></tr></thead><tbody>{content.comparisonRows.map((row) => <tr key={row[0]}>{row.map((cell, index) => index === 0 ? <th key={`${row[0]}-${index}`}>{cell}</th> : <td key={`${row[0]}-${index}`}>{cell}</td>)}</tr>)}</tbody></table></div></section>;
}
