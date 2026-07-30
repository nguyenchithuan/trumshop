"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import type { CSSProperties } from "react";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import QuickContactWidget from "@/features/contact/components/QuickContactWidget";
import { catalogProducts, type CatalogProduct } from "@/features/catalog/data/catalog";
import { copy, type Language, type Theme } from "@/features/home/components/HomePage";
import { changeTheme } from "@/features/home/themeTransition";
import { useTheme } from "@/providers/AppProviders";
import { aiMapAreas, learningPaths, promptTemplates, type AiMapArea, type LearningPath, type PromptTemplate } from "../data/ecosystem";

export type EcosystemView = "map" | "prompts" | "paths" | "toolkit";
type SavedPrompt = { readonly id: string; readonly title: string; readonly text: string };

interface EcosystemScreenProps { readonly initialLanguage: Language; readonly view: EcosystemView; }

const routeByView: Record<EcosystemView, string> = { map: "ban-do-ai", prompts: "prompt-studio", paths: "lo-trinh", toolkit: "my-toolkit" };

function productsFor(ids: readonly string[]) {
  return ids.map((id) => catalogProducts.find((product) => product.id === id)).filter((product): product is CatalogProduct => Boolean(product));
}

function readLocal<T>(key: string, fallback: T): T {
  try { return JSON.parse(window.localStorage.getItem(key) ?? "") as T; } catch { return fallback; }
}

export default function EcosystemScreen({ initialLanguage, view }: EcosystemScreenProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [language] = useState<Language>(initialLanguage);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [toast, setToast] = useState("");
  const content = copy[language];
  const theme: Theme = resolvedTheme === "light" ? "light" : "dark";
  const homeHref = `/${language}`;
  const catalogHref = `/${language}/san-pham`;
  const advisorHref = `/${language}/tu-van`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const header = view === "map"
    ? language === "vi" ? { eyebrow: "AI MAP", title: "Nhìn đúng bức tranh.\nChọn đúng công cụ.", lead: "Khám phá các công cụ theo việc bạn muốn làm, không phải theo một danh sách tên khó nhớ." } : { eyebrow: "AI MAP", title: "See the whole picture.\nChoose the right tool.", lead: "Explore tools by the job you want to do, not by a hard-to-scan list of names." }
    : view === "prompts"
      ? language === "vi" ? { eyebrow: "PROMPT STUDIO", title: "Ý tưởng rõ hơn.\nPrompt tốt hơn.", lead: "Lấy prompt mẫu, chỉnh theo việc của bạn và lưu lại ngay trên thiết bị." } : { eyebrow: "PROMPT STUDIO", title: "Clearer ideas.\nBetter prompts.", lead: "Start with a template, tailor it to your job and save it on this device." }
      : view === "paths"
        ? language === "vi" ? { eyebrow: "LỘ TRÌNH & WORKFLOW", title: "Học từng bước.\nLàm được ngay.", lead: "Các checklist ngắn để biến một công cụ AI thành workflow thực tế." } : { eyebrow: "PATHS & WORKFLOWS", title: "Learn in steps.\nApply right away.", lead: "Short checklists that turn an AI tool into a practical workflow." }
        : language === "vi" ? { eyebrow: "MY TOOLKIT", title: "Góc làm việc\ncủa riêng bạn.", lead: "Sản phẩm, prompt và tiến độ bạn đã lưu — tất cả ở ngay trên thiết bị này." } : { eyebrow: "MY TOOLKIT", title: "Your personal\nworkspace.", lead: "Saved products, prompts and progress—kept right on this device." };

  return <main className="ecosystem-page">
    <div className="site-noise" aria-hidden="true" /><div className="ambient ambient-one" aria-hidden="true" /><div className="ambient ambient-two" aria-hidden="true" />
    <SiteHeader activeSection="san-pham" advisorHref={advisorHref} catalogHref={catalogHref} content={content} homeHref={homeHref} isCatalogPage language={language} menuOpen={menuOpen} scrolled={scrolled} theme={theme} onLanguageToggle={() => window.location.assign(`/${language === "vi" ? "en" : "vi"}/${routeByView[view]}`)} onMenuClose={() => setMenuOpen(false)} onMenuToggle={() => setMenuOpen((current) => !current)} onThemeToggle={(origin) => changeTheme(theme === "dark" ? "light" : "dark", setTheme, origin)} />
    <section className="ecosystem-shell shell"><header className="ecosystem-intro"><span className="catalog-kicker"><span className="status-dot" />{header.eyebrow}</span><h1>{header.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h1><p>{header.lead}</p></header>
      {view === "map" && <AiMap catalogHref={catalogHref} language={language} />}
      {view === "prompts" && <PromptStudio language={language} onToast={setToast} />}
      {view === "paths" && <LearningPaths catalogHref={catalogHref} language={language} />}
      {view === "toolkit" && <MyToolkit catalogHref={catalogHref} language={language} />}
    </section>
    <SiteFooter catalogHref={catalogHref} content={content} homeHref={homeHref} language={language} /><QuickContactWidget language={language} />
    <div className={`toast ${toast ? "show" : ""}`} role="status"><span>✓</span>{toast}</div>
  </main>;
}

function ProductMark({ product, size = 25 }: { readonly product: CatalogProduct; readonly size?: number }) {
  return product.iconPath ? <Image alt="" height={size} src={product.iconPath} unoptimized width={size} /> : <>{product.icon}</>;
}

function AiMap({ catalogHref, language }: { readonly catalogHref: string; readonly language: Language }) {
  const [activeArea, setActiveArea] = useState<AiMapArea>(aiMapAreas[0]);
  return <div className="ai-map-layout"><nav className="ai-map-areas" aria-label={language === "vi" ? "Nhóm nhu cầu" : "Need areas"}>{aiMapAreas.map((area) => <button className={activeArea.id === area.id ? "active" : ""} key={area.id} type="button" onClick={() => setActiveArea(area)} style={{ "--map-accent": area.accent } as CSSProperties}><span>{area.icon}</span><strong>{area.title[language]}</strong><i>→</i></button>)}</nav><section className="ai-map-board" style={{ "--map-accent": activeArea.accent } as CSSProperties}><div className="ai-map-board-head"><span>{activeArea.icon}</span><div><p>{language === "vi" ? "BẠN MUỐN LÀM GÌ?" : "WHAT DO YOU WANT TO DO?"}</p><h2>{activeArea.title[language]}</h2></div></div><p className="ai-map-description">{activeArea.description[language]}</p><div className="ai-map-products">{productsFor(activeArea.productIds).map((product, index) => <a href={`${catalogHref}/${product.id}`} key={product.id} style={{ "--map-product": product.accent, "--map-delay": `${index * 70}ms` } as CSSProperties}><span><ProductMark product={product} /></span><div><small>{language === "vi" ? "CÔNG CỤ GỢI Ý" : "SUGGESTED TOOL"}</small><h3>{product.name[language]}</h3><p>{product.description[language]}</p></div><b>→</b></a>)}</div><a className="ai-map-advisor-link" href={`${catalogHref}?category=${activeArea.id === "coding" ? "code" : activeArea.id === "visual" ? "creative" : ""}`}>{language === "vi" ? "Xem thêm trong danh mục" : "See more in the catalog"}<b>↗</b></a></section></div>;
}

function PromptStudio({ language, onToast }: { readonly language: Language; readonly onToast: (message: string) => void }) {
  const [activeTemplate, setActiveTemplate] = useState<PromptTemplate>(promptTemplates[0]);
  const [draft, setDraft] = useState(promptTemplates[0].prompt[language]);
  const [goal, setGoal] = useState("");
  const [tone, setTone] = useState("");
  const [savedPrompts, setSavedPrompts] = useState<readonly SavedPrompt[]>([]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setSavedPrompts(readLocal<readonly SavedPrompt[]>("trumshop-prompts", [])));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const generatedPrompt = useMemo(() => draft.replace("[dán brief ở đây]", goal || "[dán brief ở đây]").replace("[dán tài liệu]", goal || "[dán tài liệu]").replace("[dán ở đây]", goal || "[dán ở đây]").replace("[điền]", tone || "[điền]"), [draft, goal, tone]);
  const selectTemplate = (template: PromptTemplate) => { setActiveTemplate(template); setDraft(template.prompt[language]); };
  const copyPrompt = async () => {
    try { await navigator.clipboard.writeText(generatedPrompt); onToast(language === "vi" ? "Đã copy prompt" : "Prompt copied"); }
    catch { onToast(language === "vi" ? "Hãy bôi đen và copy prompt" : "Select and copy the prompt"); }
  };
  const savePrompt = () => {
    const entry: SavedPrompt = { id: `${Date.now()}`, title: activeTemplate.title[language], text: generatedPrompt };
    const next = [entry, ...savedPrompts].slice(0, 20);
    setSavedPrompts(next);
    try { window.localStorage.setItem("trumshop-prompts", JSON.stringify(next)); } catch { /* Optional device-local storage. */ }
    onToast(language === "vi" ? "Đã lưu vào My Toolkit" : "Saved to My Toolkit");
  };
  return <div className="prompt-studio-layout"><aside className="prompt-template-list"><p>{language === "vi" ? "PROMPT MẪU" : "TEMPLATES"}</p>{promptTemplates.map((template) => <button className={activeTemplate.id === template.id ? "active" : ""} key={template.id} type="button" onClick={() => selectTemplate(template)}><small>{template.category[language]}</small><strong>{template.title[language]}</strong><span>→</span></button>)}</aside><section className="prompt-workspace"><div className="prompt-workspace-head"><div><p className="section-kicker">{activeTemplate.category[language]}</p><h2>{activeTemplate.title[language]}</h2><span>{activeTemplate.description[language]}</span></div><div>{productsFor(activeTemplate.productIds).map((product) => <i key={product.id} title={product.name[language]}><ProductMark product={product} size={19} /></i>)}</div></div><div className="prompt-builder-fields"><label>{language === "vi" ? "Thông tin / ngữ cảnh" : "Context / brief"}<textarea placeholder={language === "vi" ? "Dán brief, tài liệu hoặc yêu cầu ở đây..." : "Paste your brief, material or request..."} value={goal} onChange={(event) => setGoal(event.target.value)} /></label><label>{language === "vi" ? "Giọng điệu (không bắt buộc)" : "Tone (optional)"}<input placeholder={language === "vi" ? "Ví dụ: thân thiện, ngắn gọn" : "e.g. friendly, concise"} value={tone} onChange={(event) => setTone(event.target.value)} /></label></div><label className="prompt-output"><span>{language === "vi" ? "PROMPT CỦA BẠN" : "YOUR PROMPT"}</span><textarea value={generatedPrompt} onChange={(event) => setDraft(event.target.value)} /></label><div className="prompt-actions"><button className="prompt-save" type="button" onClick={savePrompt}>♡ {language === "vi" ? "Lưu prompt" : "Save prompt"}</button><button className="prompt-copy" type="button" onClick={copyPrompt}>{language === "vi" ? "Copy để dùng" : "Copy to use"}<b>↗</b></button></div></section></div>;
}

function LearningPaths({ catalogHref, language }: { readonly catalogHref: string; readonly language: Language }) {
  const [activePath, setActivePath] = useState<LearningPath>(learningPaths[0]);
  const [completed, setCompleted] = useState<Readonly<Record<string, boolean>>>({});
  useEffect(() => { const frame = window.requestAnimationFrame(() => setCompleted(readLocal<Readonly<Record<string, boolean>>>("trumshop-learning-progress", {}))); return () => window.cancelAnimationFrame(frame); }, []);
  const toggleLesson = (index: number) => {
    const key = `${activePath.id}-${index}`;
    const next = { ...completed, [key]: !completed[key] };
    setCompleted(next);
    try { window.localStorage.setItem("trumshop-learning-progress", JSON.stringify(next)); } catch { /* Optional device-local storage. */ }
  };
  const completedCount = activePath.lessons[language].filter((_, index) => completed[`${activePath.id}-${index}`]).length;
  return <div className="learning-layout"><div className="learning-path-list">{learningPaths.map((path) => { const count = path.lessons[language].filter((_, index) => completed[`${path.id}-${index}`]).length; return <button className={activePath.id === path.id ? "active" : ""} key={path.id} type="button" onClick={() => setActivePath(path)} style={{ "--path-accent": path.accent } as CSSProperties}><span>{path.icon}</span><div><strong>{path.title[language]}</strong><small>{count}/{path.lessons[language].length} {language === "vi" ? "bước" : "steps"}</small></div><b>→</b></button>; })}</div><section className="learning-detail" style={{ "--path-accent": activePath.accent } as CSSProperties}><div className="learning-detail-head"><div><p>{language === "vi" ? "WORKFLOW THỰC HÀNH" : "PRACTICAL WORKFLOW"}</p><h2>{activePath.title[language]}</h2><span>{activePath.description[language]}</span></div><strong>{completedCount}<small>/{activePath.lessons[language].length}</small></strong></div><div className="learning-progress"><i style={{ width: `${(completedCount / activePath.lessons[language].length) * 100}%` }} /></div><ol className="learning-lessons">{activePath.lessons[language].map((lesson, index) => { const done = Boolean(completed[`${activePath.id}-${index}`]); return <li className={done ? "done" : ""} key={lesson}><button aria-pressed={done} type="button" onClick={() => toggleLesson(index)}><span>{done ? "✓" : String(index + 1).padStart(2, "0")}</span><strong>{lesson}</strong></button></li>; })}</ol><div className="learning-tools"><p>{language === "vi" ? "CÔNG CỤ GỢI Ý CHO LỘ TRÌNH" : "SUGGESTED TOOLS FOR THIS PATH"}</p>{productsFor(activePath.productIds).map((product) => <a href={`${catalogHref}/${product.id}`} key={product.id}><span><ProductMark product={product} size={20} /></span>{product.name[language]}<b>→</b></a>)}</div></section></div>;
}

function MyToolkit({ catalogHref, language }: { readonly catalogHref: string; readonly language: Language }) {
  const [savedIds, setSavedIds] = useState<readonly string[]>([]);
  const [savedPrompts, setSavedPrompts] = useState<readonly SavedPrompt[]>([]);
  const [completed, setCompleted] = useState<Readonly<Record<string, boolean>>>({});
  useEffect(() => { const frame = window.requestAnimationFrame(() => { setSavedIds(readLocal<readonly string[]>("trumshop-saved", [])); setSavedPrompts(readLocal<readonly SavedPrompt[]>("trumshop-prompts", [])); setCompleted(readLocal<Readonly<Record<string, boolean>>>("trumshop-learning-progress", {})); }); return () => window.cancelAnimationFrame(frame); }, []);
  const savedProducts = productsFor(savedIds);
  const completedLessons = Object.values(completed).filter(Boolean).length;
  return <div className="toolkit-layout"><section className="toolkit-summary"><article><span>♡</span><strong>{savedProducts.length}</strong><p>{language === "vi" ? "Sản phẩm đã lưu" : "Saved products"}</p></article><article><span>✦</span><strong>{savedPrompts.length}</strong><p>{language === "vi" ? "Prompt của bạn" : "Your prompts"}</p></article><article><span>✓</span><strong>{completedLessons}</strong><p>{language === "vi" ? "Bước đã hoàn thành" : "Completed steps"}</p></article></section><div className="toolkit-columns"><section><div className="toolkit-section-head"><div><p className="section-kicker">{language === "vi" ? "SẢN PHẨM" : "PRODUCTS"}</p><h2>{language === "vi" ? "Bạn đang cân nhắc" : "You are considering"}</h2></div><a href={`${catalogHref}/?category=saved`}>{language === "vi" ? "Xem tất cả" : "See all"} →</a></div>{savedProducts.length ? <div className="toolkit-products">{savedProducts.slice(0, 4).map((product) => <a href={`${catalogHref}/${product.id}`} key={product.id} style={{ "--toolkit-accent": product.accent } as CSSProperties}><span><ProductMark product={product} size={22} /></span><strong>{product.name[language]}</strong><b>→</b></a>)}</div> : <ToolkitEmpty href={catalogHref} label={language === "vi" ? "Lưu sản phẩm để tạo bộ công cụ của bạn." : "Save products to build your own toolkit."} action={language === "vi" ? "Khám phá sản phẩm" : "Browse products"} />}</section><section><div className="toolkit-section-head"><div><p className="section-kicker">PROMPTS</p><h2>{language === "vi" ? "Prompt đã lưu" : "Saved prompts"}</h2></div><a href={`/${language}/prompt-studio`}>{language === "vi" ? "Mở Studio" : "Open Studio"} →</a></div>{savedPrompts.length ? <div className="toolkit-prompts">{savedPrompts.slice(0, 3).map((prompt) => <article key={prompt.id}><span>✦</span><div><strong>{prompt.title}</strong><p>{prompt.text}</p></div></article>)}</div> : <ToolkitEmpty href={`/${language}/prompt-studio`} label={language === "vi" ? "Tạo prompt đầu tiên trong Prompt Studio." : "Create your first prompt in Prompt Studio."} action={language === "vi" ? "Tạo prompt" : "Create prompt"} />}</section></div></div>;
}

function ToolkitEmpty({ action, href, label }: { readonly action: string; readonly href: string; readonly label: string }) {
  return <div className="toolkit-empty"><p>{label}</p><a href={href}>{action}<b>→</b></a></div>;
}
