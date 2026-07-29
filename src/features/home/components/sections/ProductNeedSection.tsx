import type { Language } from "@/features/home/components/HomePage";

interface ProductNeedSectionProps { readonly advisorHref: string; readonly catalogHref: string; readonly language: Language; }

export default function ProductNeedSection({ advisorHref, catalogHref, language }: ProductNeedSectionProps) {
  const isVietnamese = language === "vi";
  const items = isVietnamese
    ? [
      { icon: "✦", title: "Học tập & viết", text: "Tóm tắt, nghiên cứu, làm bài và trình bày ý tưởng.", href: `${advisorHref}#study` },
      { icon: "↗", title: "Công việc", text: "Lên kế hoạch, xử lý tài liệu và làm việc hiệu quả hơn.", href: `${advisorHref}#work` },
      { icon: "⌘", title: "Lập trình", text: "Viết code, debug và tăng tốc quy trình phát triển.", href: `${catalogHref}?category=code` },
      { icon: "◉", title: "Ảnh & video", text: "Tạo nội dung, dựng video và thiết kế bằng AI.", href: `${catalogHref}?category=creative` },
    ]
    : [
      { icon: "✦", title: "Study & writing", text: "Summarize, research, learn and shape clearer ideas.", href: `${advisorHref}#study` },
      { icon: "↗", title: "Everyday work", text: "Plan, process documents and move work forward.", href: `${advisorHref}#work` },
      { icon: "⌘", title: "Coding", text: "Write code, debug and speed up development workflows.", href: `${catalogHref}?category=code` },
      { icon: "◉", title: "Images & video", text: "Create content, edit video and design with AI.", href: `${catalogHref}?category=creative` },
    ];

  return <section className="need-section shell scroll-reveal" aria-label={isVietnamese ? "Chọn sản phẩm theo nhu cầu" : "Choose products by need"}>
    <div className="need-section-heading"><div><p className="section-kicker">{isVietnamese ? "CHỌN THEO NHU CẦU" : "SHOP BY GOAL"}</p><h2>{isVietnamese ? "Bạn cần hoàn thành việc gì?" : "What are you trying to get done?"}</h2></div><a href={advisorHref}>{isVietnamese ? "Để TrumShop gợi ý" : "Let TrumShop suggest"}<span>→</span></a></div>
    <div className="need-grid">{items.map((item) => <a href={item.href} key={item.title}><span>{item.icon}</span><strong>{item.title}</strong><p>{item.text}</p><b>→</b></a>)}</div>
  </section>;
}
