"use client";

import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import ConsultationModal from "@/features/consultation/components/ConsultationModal";
import ContactSection from "@/features/contact/components/ContactSection";
import FloatingContactActions from "@/features/contact/components/FloatingContactActions";
import BenefitsSection from "@/features/home/components/sections/BenefitsSection";
import HeroSection from "@/features/home/components/sections/HeroSection";
import PurchaseProcessSection from "@/features/home/components/sections/PurchaseProcessSection";
import ComparisonSection from "@/features/plans/components/ComparisonSection";
import PlansSection from "@/features/plans/components/PlansSection";
import FaqSection from "@/features/support/components/FaqSection";
import WarrantySection from "@/features/support/components/WarrantySection";
import { CONTACT_LINKS, CONTACTS, copy, products, supportHours, warrantyOptions, type Language, type Theme } from "./HomePage";
import { changeTheme } from "../themeTransition";

type ModalState = { readonly product: string; readonly warranty: string } | null;

interface HomePageScreenProps { readonly initialLanguage: Language; }

export default function HomePageScreen({ initialLanguage }: HomePageScreenProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [language] = useState<Language>(initialLanguage);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("trang-chu");
  const [warranties, setWarranties] = useState<Record<string, number>>(() => Object.fromEntries(products.map((product) => [product.id, 3])));
  const [modal, setModal] = useState<ModalState>(null);
  const [openFaq, setOpenFaq] = useState(0);
  const [openPolicy, setOpenPolicy] = useState(0);
  const [toast, setToast] = useState("");
  const [loadingChannel, setLoadingChannel] = useState("");
  const content = copy[language];
  const theme: Theme = resolvedTheme === "light" ? "light" : "dark";

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const onScroll = () => {
      const documentElement = document.documentElement;
      const scrollable = Math.max(documentElement.scrollHeight - window.innerHeight, 1);
      setScrolled(window.scrollY > 24);
      setProgress(Math.min((window.scrollY / scrollable) * 100, 100));
      const sectionIds = ["trang-chu", "goi-dich-vu", "so-sanh", "quy-trinh", "bao-hanh", "faq", "lien-he"];
      const current = sectionIds.reduce((selected, id) => {
        const section = document.getElementById(id);
        return section && section.offsetTop <= window.scrollY + 190 ? id : selected;
      }, "trang-chu");
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    document.querySelectorAll(".scroll-reveal").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [language]);

  useEffect(() => {
    if (!modal) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setModal(null); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKeyDown); };
  }, [modal]);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(""), 2600);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const consultationMessage = useMemo(() => {
    if (!modal) return "";
    return language === "vi"
      ? `Xin chào TrumShop, tôi muốn được tư vấn ${modal.product} trong 1 tháng, lựa chọn ${modal.warranty}. Vui lòng báo giá và hướng dẫn giúp tôi.`
      : `Hello TrumShop, I would like advice on ${modal.product} for 1 month with ${modal.warranty}. Please send me a quote and instructions.`;
  }, [language, modal]);

  const copyMessage = async () => {
    try { await navigator.clipboard.writeText(consultationMessage); setToast(content.copied); }
    catch { setToast(content.copyFallback); }
  };
  const openAdvice = () => setModal({ product: content.genericProduct, warranty: content.genericWarranty });
  const openPurchase = (productId: string, productName: string) => setModal({ product: productName, warranty: warrantyOptions[language][warranties[productId]] });
  const openChannel = async (channel: "zalo" | "facebook" | "instagram") => {
    setLoadingChannel(channel);
    await new Promise((resolve) => window.setTimeout(resolve, 350));
    const target = CONTACT_LINKS[channel];
    if (target) window.open(target, "_blank", "noopener,noreferrer");
    else { await copyMessage(); setToast(`${content.copied} · ${content.channelUpdating}`); }
    setLoadingChannel("");
  };

  return <main>
    <div className="scroll-progress" style={{ width: `${progress}%` }} />
    <div className="site-noise" aria-hidden="true" /><div className="ambient ambient-one" aria-hidden="true" /><div className="ambient ambient-two" aria-hidden="true" />
    <SiteHeader activeSection={activeSection} content={content} language={language} menuOpen={menuOpen} scrolled={scrolled} theme={theme} onLanguageToggle={() => window.location.assign(language === "vi" ? "/en" : "/vi")} onMenuClose={() => setMenuOpen(false)} onMenuToggle={() => setMenuOpen((value) => !value)} onThemeToggle={() => changeTheme(theme === "dark" ? "light" : "dark", setTheme)} />
    <HeroSection content={content} />
    <PlansSection content={content} language={language} products={products} warranties={warranties} warrantyOptions={warrantyOptions[language]} onPurchase={openPurchase} onWarrantyChange={(productId, event) => setWarranties((current) => ({ ...current, [productId]: Number(event.target.value) }))} />
    <ComparisonSection content={content} /><PurchaseProcessSection content={content} /><BenefitsSection content={content} />
    <WarrantySection content={content} openItem={openPolicy} onToggle={(index) => setOpenPolicy(openPolicy === index ? -1 : index)} />
    <FaqSection content={content} openItem={openFaq} onToggle={(index) => setOpenFaq(openFaq === index ? -1 : index)} />
    <ContactSection contacts={CONTACTS} content={content} language={language} supportHours={supportHours} onAdvice={openAdvice} onToast={() => setToast(content.demoContact)} />
    <SiteFooter content={content} /><FloatingContactActions activeSection={activeSection} content={content} scrolled={scrolled} onAdvice={openAdvice} />
    {modal && <ConsultationModal content={content} loadingChannel={loadingChannel} message={consultationMessage} onChannel={openChannel} onClose={() => setModal(null)} onCopy={copyMessage} />}
    <div className={`toast ${toast ? "show" : ""}`} role="status"><span>✓</span>{toast}</div>
  </main>;
}
