"use client";

import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import { copy, type Language, type Theme } from "@/features/home/components/HomePage";
import { changeTheme } from "@/features/home/themeTransition";
import { catalogProducts } from "@/features/catalog/data/catalog";
import { useTheme } from "@/providers/AppProviders";

type GoalId = "study" | "work" | "code" | "visual";

const recommendations: Record<GoalId, readonly string[]> = {
  study: ["chatgpt", "gemini", "canva"],
  work: ["chatgpt", "gemini", "grok"],
  code: ["cursor", "chatgpt", "gemini"],
  visual: ["kling", "capcut", "openart"],
};

interface ProductAdvisorScreenProps { readonly initialLanguage: Language; }

export default function ProductAdvisorScreen({ initialLanguage }: ProductAdvisorScreenProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [language] = useState<Language>(initialLanguage);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [goal, setGoal] = useState<GoalId | null>(null);
  const content = copy[language];
  const theme: Theme = resolvedTheme === "light" ? "light" : "dark";
  const homeHref = `/${language}`;
  const catalogHref = `/${language}/san-pham`;
  const advisorHref = `/${language}/tu-van`;
  const isVietnamese = language === "vi";

  const choices = isVietnamese
    ? [
      { id: "study" as const, icon: "✦", title: "Học tập & viết", body: "Tóm tắt, làm bài, ngoại ngữ và trình bày ý tưởng." },
      { id: "work" as const, icon: "↗", title: "Công việc hằng ngày", body: "Lên kế hoạch, phân tích tài liệu và làm việc nhanh hơn." },
      { id: "code" as const, icon: "⌘", title: "Lập trình", body: "Viết code, debug và hiểu dự án phức tạp." },
      { id: "visual" as const, icon: "◉", title: "Ảnh & video", body: "Tạo video, thiết kế và sản xuất nội dung." },
    ]
    : [
      { id: "study" as const, icon: "✦", title: "Study & writing", body: "Summaries, coursework, languages and clearer ideas." },
      { id: "work" as const, icon: "↗", title: "Everyday work", body: "Planning, document analysis and faster execution." },
      { id: "code" as const, icon: "⌘", title: "Coding", body: "Write code, debug and understand complex projects." },
      { id: "visual" as const, icon: "◉", title: "Images & video", body: "Create videos, design assets and produce content." },
    ];

  const products = useMemo(() => goal ? recommendations[goal].map((id) => catalogProducts.find((product) => product.id === id)).filter(Boolean) : [], [goal]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const fromHash = window.location.hash.replace("#", "") as GoalId;
    const frame = window.requestAnimationFrame(() => {
      if (Object.hasOwn(recommendations, fromHash)) setGoal(fromHash);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return <main className="advisor-page">
    <div className="site-noise" aria-hidden="true" /><div className="ambient ambient-one" aria-hidden="true" /><div className="ambient ambient-two" aria-hidden="true" />
    <SiteHeader activeSection="tu-van" advisorHref={advisorHref} catalogHref={catalogHref} content={content} homeHref={homeHref} isCatalogPage language={language} menuOpen={menuOpen} scrolled={scrolled} theme={theme} onLanguageToggle={() => window.location.assign(`/${language === "vi" ? "en" : "vi"}/tu-van`)} onMenuClose={() => setMenuOpen(false)} onMenuToggle={() => setMenuOpen((value) => !value)} onThemeToggle={(origin) => changeTheme(theme === "dark" ? "light" : "dark", setTheme, origin)} />
    <section className="advisor-shell shell">
      <div className="advisor-intro">
        <span className="catalog-kicker"><span className="status-dot" />{isVietnamese ? "GỢI Ý THÔNG MINH" : "SMART MATCHER"}</span>
        <h1>{isVietnamese ? "Bạn muốn làm gì nhanh hơn?" : "What do you want to do faster?"}<span>{isVietnamese ? "Chọn một nhu cầu, có ngay gợi ý." : "Choose a need, get a clear starting point."}</span></h1>
        <p>{isVietnamese ? "Không cần hiểu hết mọi gói. Chọn mục đích của bạn và TrumShop sẽ đưa ra vài công cụ dễ bắt đầu nhất." : "You do not need to understand every plan. Choose your goal and get a few easy starting points."}</p>
      </div>
      <div className="advisor-steps" aria-label={isVietnamese ? "Các bước chọn công cụ" : "Tool selection steps"}><span className="active">01 <b>{isVietnamese ? "Chọn nhu cầu" : "Choose a goal"}</b></span><i /><span className={goal ? "active" : ""}>02 <b>{isVietnamese ? "Xem gợi ý" : "See matches"}</b></span><i /><span>03 <b>{isVietnamese ? "Chọn gói" : "Choose a plan"}</b></span></div>
      <div className="advisor-goals">
        {choices.map((choice) => <button className={goal === choice.id ? "active" : ""} key={choice.id} type="button" onClick={() => setGoal(choice.id)}><span>{choice.icon}</span><strong>{choice.title}</strong><p>{choice.body}</p><b>{goal === choice.id ? "✓" : "→"}</b></button>)}
      </div>
      {goal && <section className="advisor-results" aria-live="polite">
        <div className="advisor-result-head"><div><p className="section-kicker">{isVietnamese ? "GỢI Ý CHO BẠN" : "YOUR STARTING POINT"}</p><h2>{isVietnamese ? "Bắt đầu với các lựa chọn này." : "Start with these options."}</h2></div><a href={`${catalogHref}?category=${goal === "visual" ? "creative" : goal === "code" ? "code" : "all"}`}>{isVietnamese ? "Xem cả danh mục" : "Browse full catalog"}<span>↗</span></a></div>
        <div className="advisor-product-grid">
          {products.map((product) => product && <a href={`${catalogHref}?product=${product.id}`} key={product.id} style={{ "--advisor-accent": product.accent } as CSSProperties}><span className="advisor-product-icon">{product.iconPath ? <Image alt="" height={28} src={product.iconPath} unoptimized width={28} /> : product.icon}</span><div><small>{isVietnamese ? "PHÙ HỢP ĐỂ BẮT ĐẦU" : "A GREAT START"}</small><h3>{product.name[language]}</h3><p>{product.description[language]}</p></div><b>→</b></a>)}
        </div>
        <div className="advisor-next"><span>✦</span><p>{isVietnamese ? "Chọn một sản phẩm để xem quyền lợi, loại gói và cách nhận tư vấn có sẵn tên sản phẩm." : "Choose a product to review benefits, plan types and get product-specific guidance."}</p></div>
      </section>}
    </section>
    <SiteFooter catalogHref={catalogHref} content={content} homeHref={homeHref} />
  </main>;
}
