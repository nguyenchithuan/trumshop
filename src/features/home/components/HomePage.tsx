"use client";

import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { useTheme } from "@/providers/AppProviders";
import { changeTheme } from "../themeTransition";
import SiteHeader from "@/components/layout/SiteHeader";

export type Language = "vi" | "en";
export type Theme = "dark" | "light";

export const CONTACTS = {
  zalo: "0999 999 998",
  facebook: "TrumShop Việt Nam",
  instagram: "@trumshop.vn",
  hotline: "0999 999 998",
  email: "hello@trumshop.vn",
};

export const CONTACT_LINKS = {
  zalo: "https://zalo.me/0999999998",
  // Placeholder page requested by the user. Replace this with the official page URL when available.
  facebook: "https://www.facebook.com/TrumShopVietNam",
  instagram: "https://www.instagram.com/trumshop.vn/",
  hotline: "tel:0999999998",
  email: "mailto:hello@trumshop.vn",
};

export const supportHours = {
  vi: "8:00–23:00 hằng ngày",
  en: "8:00–23:00 daily",
};

export const warrantyOptions = {
  vi: [
    "Không bảo hành",
    "Bảo hành 1 ngày",
    "Bảo hành 3 ngày",
    "Bảo hành 7 ngày",
    "Bảo hành 10 ngày",
    "Bảo hành 20 ngày",
    "BHF – toàn thời hạn gói",
  ],
  en: [
    "No warranty",
    "1-day warranty",
    "3-day warranty",
    "7-day warranty",
    "10-day warranty",
    "20-day warranty",
    "BHF – full plan duration",
  ],
};

export const products = [
  {
    id: "go",
    name: "ChatGPT Go",
    shortName: "Go",
    symbol: "G",
    accent: "cyan",
    tag: { vi: "Gọn nhẹ, tiết kiệm", en: "Simple & affordable" },
    description: {
      vi: "Dành cho nhu cầu học tập và sử dụng AI hằng ngày.",
      en: "For learning and everyday AI tasks.",
    },
    features: {
      vi: ["Nhiều lượt dùng hơn bản miễn phí", "Tải tệp & tạo hình ảnh", "Phù hợp người dùng cá nhân"],
      en: ["More usage than Free", "File uploads & image generation", "Ideal for personal use"],
    },
  },
  {
    id: "plus",
    name: "ChatGPT Plus",
    shortName: "Plus",
    symbol: "P",
    accent: "violet",
    popular: true,
    tag: { vi: "Lựa chọn phổ biến", en: "Most popular choice" },
    description: {
      vi: "Cân bằng tốt cho học tập, công việc và sáng tạo.",
      en: "A balanced plan for work, study and creativity.",
    },
    features: {
      vi: ["Suy luận nâng cao", "Phân tích tệp & dữ liệu", "Hạn mức sử dụng mở rộng"],
      en: ["Advanced reasoning", "File & data analysis", "Expanded usage limits"],
    },
  },
  {
    id: "pro",
    name: "ChatGPT Pro",
    shortName: "Pro",
    symbol: "P",
    accent: "blue",
    tag: { vi: "Hiệu suất chuyên sâu", en: "Professional performance" },
    description: {
      vi: "Cho nghiên cứu, lập trình và khối lượng công việc lớn.",
      en: "For research, coding and demanding workloads.",
    },
    features: {
      vi: ["Hạn mức sử dụng cao", "Suy luận chuyên sâu", "Tối ưu cho công việc nặng"],
      en: ["High usage limits", "Deep reasoning", "Built for demanding work"],
    },
  },
  {
    id: "business",
    name: { vi: "Gói doanh nghiệp", en: "Business plan" },
    shortName: "Business",
    symbol: "B",
    accent: "emerald",
    tag: { vi: "Thiết kế theo nhu cầu", en: "Tailored to your team" },
    description: {
      vi: "Giải pháp tư vấn riêng cho nhóm và doanh nghiệp.",
      en: "Tailored guidance for teams and businesses.",
    },
    features: {
      vi: ["Tư vấn theo số lượng", "Báo giá theo nhu cầu", "Hỗ trợ thống nhất trước"],
      en: ["Seat-based consultation", "Custom quotation", "Agreed support policy"],
    },
  },
];

export const copy = {
  vi: {
    nav: [
      ["trang-chu", "Trang chủ"],
      ["goi-dich-vu", "Sản phẩm"],
      ["so-sanh", "So sánh"],
      ["quy-trinh", "Cách mua"],
      ["bao-hanh", "Bảo hành"],
      ["faq", "FAQ"],
    ],
    contact: "Liên hệ mua gói",
    menuOpen: "Mở menu",
    menuClose: "Đóng menu",
    themeLight: "Chuyển sang giao diện sáng",
    themeDark: "Chuyển sang giao diện tối",
    saleLabel: "DỊCH VỤ NÂNG CẤP CHATGPT",
    heroTitle: "Gói ChatGPT Go, Plus, Pro & Business",
    heroAccent: "Mua nhanh. Hỗ trợ trực tiếp.",
    heroLead: "Gói dùng theo tháng, bảo hành linh hoạt và tư vấn rõ ràng từ TrumShop.",
    seePlans: "Xem sản phẩm",
    contactNow: "Liên hệ ngay",
    trusts: ["Tài khoản chính chủ", "Gói theo tháng", "Không nhập mật khẩu"],
    supporting: "ĐANG HỖ TRỢ",
    quickUpgrade: "Nâng cấp nhanh chóng",
    choices: "LỰA CHỌN",
    productsLabel: "Sản phẩm ChatGPT",
    productsKicker: "Chọn gói phù hợp",
    productsTitle: "Bạn muốn mua gói ChatGPT nào?",
    productsNote: "Go cho nhu cầu gọn nhẹ, Plus cho số đông, Pro cho công việc chuyên sâu và Business cho đội nhóm.",
    popular: "Phổ biến nhất",
    available: "Đang nhận đăng ký",
    month: "1 tháng",
    warranty: "Chọn bảo hành",
    planPrice: "Giá gói",
    quote: "Liên hệ báo giá",
    consult: "Liên hệ tư vấn",
    buyNow: "Mua gói này",
    comparisonLabel: "So sánh nhanh",
    comparisonKicker: "Đủ 4 lựa chọn",
    comparisonTitle: "Chọn đúng gói trong 30 giây.",
    comparisonNote: "Thông tin mang tính tham khảo; tính năng và hạn mức có thể thay đổi.",
    criteria: "Tiêu chí",
    recommended: "Đề xuất",
    comparisonRows: [
      ["Phù hợp với", "Cá nhân", "Học tập & công việc", "Chuyên nghiệp", "Đội nhóm"],
      ["Mức sử dụng", "Cơ bản", "Thường xuyên", "Chuyên sâu", "Theo tổ chức"],
      ["Tài liệu & dữ liệu", "Có hỗ trợ", "Nâng cao", "Chuyên sâu", "Cộng tác nhóm"],
      ["Lập trình", "Cơ bản", "Nâng cao", "Hiệu suất cao", "Theo nhu cầu"],
      ["Hạn mức", "Mở rộng", "Cao hơn", "Cao", "Theo số lượng"],
      ["Thời hạn", "1 tháng", "1 tháng", "1 tháng", "Tư vấn riêng"],
    ],
    processLabel: "Cách mua",
    processKicker: "Chỉ 4 bước",
    processTitle: "Chọn gói. Liên hệ. Nâng cấp.",
    processNote: "Website không yêu cầu mật khẩu hay thanh toán trực tuyến.",
    start: "Bắt đầu chọn gói",
    steps: [
      ["01", "Chọn gói", "Go, Plus, Pro hoặc Business."],
      ["02", "Chọn bảo hành", "Từ không bảo hành đến BHF."],
      ["03", "Nhắn TrumShop", "Gửi nhu cầu qua kênh liên hệ."],
      ["04", "Hoàn tất", "Xác nhận và nhận hướng dẫn."],
    ],
    whyLabel: "Vì sao chọn TrumShop?",
    rightNeed: "Tư vấn đúng nhu cầu",
    rightTitle: "Không cần gói cao nhất. Chỉ cần gói phù hợp nhất.",
    rightText: "Chọn theo nhu cầu, tần suất và mức bảo hành bạn muốn.",
    flexible: "Bảo hành linh hoạt",
    flexibleText: "Nhiều mốc hỗ trợ, từ bàn giao đến toàn thời hạn.",
    direct: "Hỗ trợ trực tiếp",
    directText: "Trao đổi rõ ràng qua các kênh liên hệ quen thuộc.",
    clear: "Minh bạch, dễ kiểm tra",
    clearText: "Giá, bảo hành và cách nâng cấp được xác nhận trước.",
    clearBadge: "RÕ",
    policyLabel: "Chính sách bảo hành",
    policyKicker: "Linh hoạt & rõ ràng",
    policyTitle: "Chọn mức hỗ trợ phù hợp.",
    policyNote: "Phạm vi cụ thể được xác nhận trước khi đăng ký.",
    policies: [
      ["Không bảo hành", "Kiểm tra tại thời điểm bàn giao."],
      ["Bảo hành 1–20 ngày", "Hỗ trợ theo đúng số ngày đã chọn."],
      ["BHF – toàn thời hạn", "Hỗ trợ trong toàn bộ hiệu lực gói theo điều kiện đã xác nhận."],
    ],
    policyWarning: "Bảo hành áp dụng theo phạm vi đã thống nhất và hướng dẫn sử dụng.",
    faqLabel: "Câu hỏi thường gặp",
    faqKicker: "Hỏi nhanh, đáp gọn",
    faqTitle: "Điều cần biết trước khi mua.",
    faqLead: "Cần thêm thông tin? Liên hệ TrumShop để được tư vấn trực tiếp.",
    faqContact: "Liên hệ TrumShop",
    faqs: [
      ["Website có thanh toán trực tuyến không?", "Không. Website giới thiệu sản phẩm và tiếp nhận nhu cầu; TrumShop báo giá trực tiếp."],
      ["Gói có thời hạn bao lâu?", "Các lựa chọn hiện tại có thời hạn một tháng."],
      ["Nên chọn Go, Plus, Pro hay Business?", "Go cho nhu cầu cơ bản, Plus cho sử dụng thường xuyên, Pro cho công việc chuyên sâu và Business cho đội nhóm."],
      ["Có cần nhập mật khẩu không?", "Không nhập mật khẩu trên website. TrumShop sẽ hướng dẫn riêng khi liên hệ."],
      ["BHF là gì?", "Là lựa chọn hỗ trợ trong toàn bộ thời gian hiệu lực của gói theo điều kiện xác nhận trước."],
    ],
    contactLabel: "Mua gói ChatGPT tại TrumShop",
    contactTitle: "Sẵn sàng nâng cấp? Liên hệ ngay.",
    contactText: "Gửi nhu cầu để nhận tư vấn gói, bảo hành và báo giá phù hợp.",
    support: "Hỗ trợ",
    updating: "Đang cập nhật",
    getAdvice: "Nhận tư vấn mua gói",
    callHotline: "Gọi 0999 999 998",
    demoContact: "Thông tin liên hệ hiện đang là dữ liệu mẫu",
    explore: "Khám phá",
    supportLinks: "Hỗ trợ",
    legal: "Pháp lý",
    servicePlans: "Gói ChatGPT",
    comparePlans: "So sánh gói",
    buyingProcess: "Cách mua",
    warrantyPolicy: "Chính sách bảo hành",
    commonQuestions: "Câu hỏi thường gặp",
    terms: "Điều khoản sử dụng",
    privacy: "Chính sách riêng tư",
    independence: "Tuyên bố độc lập",
    footerTagline: "Gói ChatGPT theo tháng · Tư vấn trực tiếp · Bảo hành rõ ràng.",
    disclaimer: "TrumShop là đơn vị tư vấn và hỗ trợ đăng ký độc lập, không phải website chính thức và không đại diện cho OpenAI. ChatGPT và OpenAI là nhãn hiệu của chủ sở hữu tương ứng.",
    backTop: "Quay lại đầu trang",
    advice: "Tư vấn ngay",
    modalKicker: "Liên hệ mua gói",
    modalTitle: "Tin nhắn tư vấn đã sẵn sàng.",
    message: "NỘI DUNG TƯ VẤN",
    copy: "Sao chép",
    copied: "Đã sao chép nội dung tư vấn",
    copyFallback: "Hãy sao chép nội dung trong hộp thoại",
    channelUpdating: "Thông tin liên hệ mẫu",
    channels: ["Nhắn qua Zalo", "Nhắn Facebook", "Nhắn Instagram"],
    opening: "Đang mở…",
    placeholder: "Thông tin liên hệ đang hiển thị ở dạng mẫu. Khi bấm, tin nhắn tư vấn sẽ được sao chép để bạn dùng ngay.",
    safety: "Không thanh toán và không nhập mật khẩu trên website.",
    genericProduct: "gói phù hợp với nhu cầu",
    genericWarranty: "bảo hành cần tư vấn",
  },
  en: {
    nav: [
      ["trang-chu", "Home"],
      ["goi-dich-vu", "Plans"],
      ["so-sanh", "Compare"],
      ["quy-trinh", "How to buy"],
      ["bao-hanh", "Warranty"],
      ["faq", "FAQ"],
    ],
    contact: "Contact to buy",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    themeLight: "Switch to light theme",
    themeDark: "Switch to dark theme",
    saleLabel: "CHATGPT UPGRADE SERVICE",
    heroTitle: "ChatGPT Go, Plus, Pro & Business plans",
    heroAccent: "Fast setup. Direct support.",
    heroLead: "Monthly plans, flexible warranty and straightforward guidance from TrumShop.",
    seePlans: "View plans",
    contactNow: "Contact now",
    trusts: ["Your own account", "Monthly plans", "No password entry"],
    supporting: "NOW SUPPORTING",
    quickUpgrade: "Quick upgrade",
    choices: "AVAILABLE",
    productsLabel: "ChatGPT plans",
    productsKicker: "Find your fit",
    productsTitle: "Which ChatGPT plan do you need?",
    productsNote: "Go for light use, Plus for most people, Pro for demanding work, and Business for teams.",
    popular: "Most popular",
    available: "Taking orders",
    month: "1 month",
    warranty: "Choose warranty",
    planPrice: "Plan price",
    quote: "Contact for quote",
    consult: "Get a consultation",
    buyNow: "Buy this plan",
    comparisonLabel: "Quick comparison",
    comparisonKicker: "All 4 options",
    comparisonTitle: "Pick the right plan in 30 seconds.",
    comparisonNote: "For reference only; features and limits may change.",
    criteria: "Criteria",
    recommended: "Recommended",
    comparisonRows: [
      ["Best for", "Personal use", "Study & work", "Professional work", "Teams"],
      ["Usage level", "Basic", "Regular", "Intensive", "Organization-wide"],
      ["Files & data", "Supported", "Advanced", "In-depth", "Team collaboration"],
      ["Coding", "Basic", "Advanced", "High performance", "Needs-based"],
      ["Usage limits", "Expanded", "Higher", "High", "Seat-based"],
      ["Duration", "1 month", "1 month", "1 month", "Custom"],
    ],
    processLabel: "How to buy",
    processKicker: "Only 4 steps",
    processTitle: "Pick. Contact. Upgrade.",
    processNote: "This website never asks for your password or online payment.",
    start: "Choose a plan",
    steps: [
      ["01", "Pick a plan", "Go, Plus, Pro or Business."],
      ["02", "Pick warranty", "From no warranty to BHF."],
      ["03", "Message us", "Send your needs via a contact channel."],
      ["04", "Complete", "Confirm and receive instructions."],
    ],
    whyLabel: "Why TrumShop?",
    rightNeed: "Needs-based advice",
    rightTitle: "You do not need the highest plan. You need the right one.",
    rightText: "Choose by use case, frequency and preferred warranty.",
    flexible: "Flexible warranty",
    flexibleText: "Support options from handover to the full plan duration.",
    direct: "Direct support",
    directText: "Clear conversations through familiar channels.",
    clear: "Clear and verifiable",
    clearText: "Price, warranty and upgrade steps are agreed upfront.",
    clearBadge: "CLEAR",
    policyLabel: "Warranty policy",
    policyKicker: "Flexible & clear",
    policyTitle: "Choose your support level.",
    policyNote: "The exact scope is confirmed before registration.",
    policies: [
      ["No warranty", "We verify the plan at handover."],
      ["1–20 day warranty", "Support applies for the exact period selected."],
      ["BHF – full duration", "Support throughout the active plan under agreed terms."],
    ],
    policyWarning: "Warranty applies within the agreed scope and usage guidelines.",
    faqLabel: "Frequently asked questions",
    faqKicker: "Quick answers",
    faqTitle: "What to know before buying.",
    faqLead: "Need more information? Contact TrumShop for direct guidance.",
    faqContact: "Contact TrumShop",
    faqs: [
      ["Can I pay on this website?", "No. This site introduces the plans and collects enquiries; TrumShop quotes directly."],
      ["How long does a plan last?", "Current plan options last one month."],
      ["Should I choose Go, Plus, Pro or Business?", "Go suits basic use, Plus regular use, Pro demanding work, and Business team needs."],
      ["Do I need to enter my password?", "No password is entered on this website. TrumShop provides separate guidance after contact."],
      ["What is BHF?", "It is support for the full active duration of the plan under terms confirmed in advance."],
    ],
    contactLabel: "Buy ChatGPT plans from TrumShop",
    contactTitle: "Ready to upgrade? Contact us.",
    contactText: "Send your needs to get plan advice, warranty options and a suitable quote.",
    support: "Support",
    updating: "Updating",
    getAdvice: "Get purchase advice",
    callHotline: "Call 0999 999 998",
    demoContact: "Contact information is currently sample data",
    explore: "Explore",
    supportLinks: "Support",
    legal: "Legal",
    servicePlans: "ChatGPT plans",
    comparePlans: "Compare plans",
    buyingProcess: "How to buy",
    warrantyPolicy: "Warranty policy",
    commonQuestions: "FAQ",
    terms: "Terms of use",
    privacy: "Privacy policy",
    independence: "Independence notice",
    footerTagline: "Monthly ChatGPT plans · Direct guidance · Clear warranty.",
    disclaimer: "TrumShop is an independent registration support and consulting service. It is not an official website and does not represent OpenAI. ChatGPT and OpenAI are trademarks of their respective owners.",
    backTop: "Back to top",
    advice: "Get advice",
    modalKicker: "Contact to buy",
    modalTitle: "Your enquiry message is ready.",
    message: "ENQUIRY MESSAGE",
    copy: "Copy",
    copied: "Enquiry message copied",
    copyFallback: "Please copy the message in this dialog",
    channelUpdating: "Sample contact information",
    channels: ["Message on Zalo", "Message on Facebook", "Message on Instagram"],
    opening: "Opening…",
    placeholder: "Contact details are currently sample data. Clicking a channel copies the enquiry message for immediate use.",
    safety: "No payment and no password entry on this website.",
    genericProduct: "the right plan for my needs",
    genericWarranty: "a warranty option to be advised",
  },
} as const;

export type HomeCopy = (typeof copy)[Language];

type ModalState = { product: string; warranty: string } | null;

export default function Home() {
  const { resolvedTheme, setTheme } = useTheme();
  const [lang, setLang] = useState<Language>("vi");
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("trang-chu");
  const [warranties, setWarranties] = useState<Record<string, number>>(() =>
    Object.fromEntries(products.map((product) => [product.id, 3])),
  );
  const [modal, setModal] = useState<ModalState>(null);
  const [openFaq, setOpenFaq] = useState(0);
  const [openPolicy, setOpenPolicy] = useState(0);
  const [toast, setToast] = useState("");
  const theme: Theme = resolvedTheme === "light" ? "light" : "dark";
  const t = copy[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    window.localStorage.setItem("trumshop-lang", lang);
  }, [lang]);

  const consultationMessage = useMemo(() => {
    if (!modal) return "";
    if (lang === "vi") {
      return `Xin chào TrumShop, tôi muốn được tư vấn ${modal.product} trong 1 tháng, lựa chọn ${modal.warranty}. Vui lòng báo giá và hướng dẫn giúp tôi.`;
    }
    return `Hello TrumShop, I would like advice on ${modal.product} for 1 month with ${modal.warranty}. Please send me a quote and instructions.`;
  }, [lang, modal]);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = Math.max(doc.scrollHeight - window.innerHeight, 1);
      setScrolled(window.scrollY > 24);
      setProgress(Math.min((window.scrollY / scrollable) * 100, 100));
      const sectionIds = ["trang-chu", "goi-dich-vu", "so-sanh", "quy-trinh", "bao-hanh", "faq", "lien-he"];
      const currentPosition = window.scrollY + 190;
      const current = sectionIds.reduce((selected, id) => {
        const section = document.getElementById(id);
        return section && section.offsetTop <= currentPosition ? id : selected;
      }, "trang-chu");
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".scroll-reveal").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [lang]);

  useEffect(() => {
    if (!modal) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setModal(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [modal]);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(""), 2600);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const handleChannel = (channel: "zalo" | "facebook" | "instagram") => {
    const target = CONTACT_LINKS[channel];
    if (target) {
      window.open(target, "_blank", "noopener,noreferrer");
      return;
    }
    setToast(t.channelUpdating);
  };

  const openPurchaseModal = (productId: string, productName: string) => {
    setModal({ product: productName, warranty: warrantyOptions[lang][warranties[productId]] });
  };

  const openGenericModal = () => {
    setModal({ product: t.genericProduct, warranty: t.genericWarranty });
  };

  const productName = (product: (typeof products)[number]) =>
    typeof product.name === "string" ? product.name : product.name[lang];

  return (
    <main>
      <div className="scroll-progress" style={{ width: `${progress}%` }} />
      <div className="site-noise" aria-hidden="true" />
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <SiteHeader
        activeSection={activeSection}
        content={t}
        language={lang}
        menuOpen={menuOpen}
        scrolled={scrolled}
        theme={theme}
        onLanguageToggle={() => setLang(lang === "vi" ? "en" : "vi")}
        onMenuClose={() => setMenuOpen(false)}
        onMenuToggle={() => setMenuOpen((value) => !value)}
        onThemeToggle={() => changeTheme(theme === "dark" ? "light" : "dark", setTheme)}
      />

      <section className="hero shell" id="trang-chu">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <div className="eyebrow reveal-one"><span className="status-dot" />{t.saleLabel}</div>
          <h1>{t.heroTitle}<span>{t.heroAccent}</span></h1>
          <p className="hero-lead reveal-two">{t.heroLead}</p>
          <div className="hero-plan-pills reveal-two" aria-label={t.productsLabel}>
            <span>ChatGPT Go</span><span>ChatGPT Plus</span><span>ChatGPT Pro</span><span>ChatGPT Business</span>
          </div>
          <div className="hero-actions reveal-three">
            <a className="button button-primary" href="#goi-dich-vu">{t.seePlans} <span className="arrow">↓</span></a>
            <a className="button button-secondary" href="#lien-he">{t.contactNow} <span>↗</span></a>
          </div>
          <div className="trust-row reveal-four">
            {t.trusts.map((item) => <span key={item}><i>✓</i>{item}</span>)}
          </div>
        </div>

        <div className="hero-visual" aria-label="TrumShop ChatGPT plans">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="orbit orbit-three" />
          <div className="float-card float-card-top">
            <span className="mini-icon">✦</span>
            <span><small>{t.supporting}</small>{t.quickUpgrade}</span>
          </div>
          <div className="ai-core">
            <div className="core-glow" /><div className="core-ring" />
            <div className="core-logo">T</div><p>TRUMSHOP</p>
          </div>
          <div className="float-card float-card-bottom">
            <div className="signal-bars"><i /><i /><i /><i /></div>
            <span><small>{t.choices}</small>Go · Plus · Pro · Business</span>
          </div>
          <span className="orbit-node node-one">GO</span>
          <span className="orbit-node node-two">PRO</span>
          <span className="orbit-node node-three">PLUS</span>
          <span className="orbit-node node-four">BIZ</span>
        </div>
      </section>

      <section className="products-section section shell scroll-reveal" id="goi-dich-vu">
        <div className="section-label"><span>01</span>{t.productsLabel}</div>
        <div className="section-heading">
          <div><p className="section-kicker">{t.productsKicker}</p><h2>{t.productsTitle}</h2></div>
          <p>{t.productsNote}</p>
        </div>
        <div className="product-grid">
          {products.map((product, index) => (
            <article
              className={`product-card ${product.accent} ${product.popular ? "popular" : ""}`}
              key={product.id}
              style={{ "--delay": `${index * 80}ms` } as CSSProperties}
            >
              {product.popular && <div className="popular-badge">{t.popular}<span>✦</span></div>}
              <div className="product-topline">
                <span>CHATGPT · {product.shortName.toUpperCase()}</span>
                <span className="stock"><i />{t.available}</span>
              </div>
              <div className="product-icon">{product.symbol}</div>
              <p className="product-tag">{product.tag[lang]}</p>
              <div className="product-title"><h3>{product.shortName}</h3><span>{t.month}</span></div>
              <p className="product-description">{product.description[lang]}</p>
              <ul>{product.features[lang].map((feature) => <li key={feature}><span>✓</span>{feature}</li>)}</ul>
              <div className="warranty-field">
                <label htmlFor={`warranty-${product.id}`}>{t.warranty}</label>
                <div className="select-wrap">
                  <select
                    id={`warranty-${product.id}`}
                    value={warranties[product.id]}
                    onChange={(event) => setWarranties((current) => ({
                      ...current,
                      [product.id]: Number(event.target.value),
                    }))}
                  >
                    {warrantyOptions[lang].map((option, optionIndex) => (
                      <option value={optionIndex} key={option}>{option}</option>
                    ))}
                  </select>
                  <span>⌄</span>
                </div>
              </div>
              <div className="product-price">
                <span>{t.planPrice}</span>
                <strong>{product.id === "business" ? t.consult : t.quote}</strong>
              </div>
              <button
                className="button product-button"
                type="button"
                aria-label={`${t.buyNow}: ${productName(product)}`}
                onClick={() => openPurchaseModal(product.id, productName(product))}
              >
                {t.buyNow}<span>↗</span>
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="comparison-section section shell scroll-reveal" id="so-sanh">
        <div className="section-label"><span>02</span>{t.comparisonLabel}</div>
        <div className="section-heading compact">
          <div><p className="section-kicker">{t.comparisonKicker}</p><h2>{t.comparisonTitle}</h2></div>
          <p>{t.comparisonNote}</p>
        </div>
        <div className="comparison-wrap">
          <table>
            <thead><tr>
              <th>{t.criteria}</th>
              <th><span className="table-dot cyan" />Go</th>
              <th><span className="table-dot violet" />Plus <small>{t.recommended}</small></th>
              <th><span className="table-dot blue" />Pro</th>
              <th><span className="table-dot emerald" />Business</th>
            </tr></thead>
            <tbody>{t.comparisonRows.map((row) => (
              <tr key={row[0]}>{row.map((cell, index) => (
                index === 0 ? <th key={`${row[0]}-${index}`}>{cell}</th> : <td key={`${row[0]}-${index}`}>{cell}</td>
              ))}</tr>
            ))}</tbody>
          </table>
        </div>
      </section>

      <section className="process-section section shell scroll-reveal" id="quy-trinh">
        <div className="section-label"><span>03</span>{t.processLabel}</div>
        <div className="process-layout">
          <div className="process-copy">
            <p className="section-kicker">{t.processKicker}</p>
            <h2>{t.processTitle}</h2><p>{t.processNote}</p>
            <a className="text-link" href="#goi-dich-vu">{t.start}<span>→</span></a>
          </div>
          <div className="timeline">{t.steps.map(([number, title, body], index) => (
            <article className="timeline-step" key={number} style={{ "--delay": `${index * 100}ms` } as CSSProperties}>
              <div className="step-number">{number}</div><div><h3>{title}</h3><p>{body}</p></div>
            </article>
          ))}</div>
        </div>
      </section>

      <section className="benefits-section section shell scroll-reveal">
        <div className="section-label"><span>04</span>{t.whyLabel}</div>
        <div className="bento-grid">
          <article className="bento-card bento-main">
            <span className="bento-icon">◎</span><p className="section-kicker">{t.rightNeed}</p>
            <h2>{t.rightTitle}</h2><p>{t.rightText}</p>
            <div className="mini-chart" aria-hidden="true"><i /><i /><i /><i /><i /></div>
          </article>
          <article className="bento-card bento-small">
            <span className="bento-icon">◇</span><h3>{t.flexible}</h3><p>{t.flexibleText}</p>
          </article>
          <article className="bento-card bento-small">
            <span className="bento-icon">↗</span><h3>{t.direct}</h3><p>{t.directText}</p>
          </article>
          <article className="bento-card bento-wide">
            <div><span className="bento-icon">✓</span><h3>{t.clear}</h3><p>{t.clearText}</p></div>
            <div className="transparency-orb" aria-hidden="true"><span>{t.clearBadge}</span><i /><i /><i /></div>
          </article>
        </div>
      </section>

      <section className="policy-section section shell scroll-reveal" id="bao-hanh">
        <div className="section-label"><span>05</span>{t.policyLabel}</div>
        <div className="policy-layout">
          <div><p className="section-kicker">{t.policyKicker}</p><h2>{t.policyTitle}</h2><p className="policy-note">{t.policyNote}</p></div>
          <div className="accordion-list">{t.policies.map(([title, body], index) => (
            <article className={`accordion ${openPolicy === index ? "open" : ""}`} key={title}>
              <button type="button" onClick={() => setOpenPolicy(openPolicy === index ? -1 : index)}>
                <span><small>0{index + 1}</small>{title}</span><i>+</i>
              </button>
              <div className="accordion-body"><p>{body}</p></div>
            </article>
          ))}</div>
        </div>
        <div className="policy-warning"><span>!</span><p>{t.policyWarning}</p></div>
      </section>

      <section className="faq-section section shell scroll-reveal" id="faq">
        <div className="section-label"><span>06</span>{t.faqLabel}</div>
        <div className="faq-layout">
          <div className="faq-copy">
            <p className="section-kicker">{t.faqKicker}</p><h2>{t.faqTitle}</h2><p>{t.faqLead}</p>
            <a className="text-link" href="#lien-he">{t.faqContact}<span>→</span></a>
          </div>
          <div className="accordion-list faq-list">{t.faqs.map(([question, answer], index) => (
            <article className={`accordion ${openFaq === index ? "open" : ""}`} key={question}>
              <button type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
                <span><small>{String(index + 1).padStart(2, "0")}</small>{question}</span><i>+</i>
              </button>
              <div className="accordion-body"><p>{answer}</p></div>
            </article>
          ))}</div>
        </div>
      </section>

      <section className="contact-section section shell scroll-reveal" id="lien-he">
        <div className="contact-glow" aria-hidden="true" />
        <div className="contact-grid">
          <div className="contact-copy">
            <p className="section-kicker">{t.contactLabel}</p><h2>{t.contactTitle}</h2><p>{t.contactText}</p>
            <div className="contact-plan-chips"><span>GO</span><span>PLUS</span><span>PRO</span><span>BUSINESS</span></div>
          </div>
          <div className="contact-panel">
            <div className="contact-status"><span className="status-dot" />{t.support} {supportHours[lang]}</div>
            <div className="contact-list">{[
              ["Zalo", CONTACTS.zalo], ["Facebook", CONTACTS.facebook], ["Instagram", CONTACTS.instagram],
              ["Hotline", CONTACTS.hotline], ["Email", CONTACTS.email],
            ].map(([label, value]) => (
              <div key={label}><span>{label}</span><strong>{value || t.updating}</strong></div>
            ))}</div>
            <div className="contact-buttons">
              <button type="button" onClick={openGenericModal}>{t.getAdvice}<span>↗</span></button>
              {CONTACT_LINKS.hotline
                ? <a href={`tel:${CONTACTS.hotline}`}>Hotline</a>
                : <button className="muted-action" type="button" onClick={() => setToast(t.demoContact)}>{t.callHotline}</button>}
            </div>
          </div>
        </div>
      </section>

      <footer id="phap-ly">
        <div className="footer-main shell">
          <div className="footer-brand">
            <a className="brand" href="#trang-chu"><span className="brand-mark">T</span><span>TrumShop</span></a>
            <p>{t.footerTagline}</p>
          </div>
          <div className="footer-links">
            <div><strong>{t.explore}</strong><a href="#goi-dich-vu">{t.servicePlans}</a><a href="#so-sanh">{t.comparePlans}</a><a href="#quy-trinh">{t.buyingProcess}</a></div>
            <div><strong>{t.supportLinks}</strong><a href="#bao-hanh">{t.warrantyPolicy}</a><a href="#faq">{t.commonQuestions}</a><a href="#lien-he">{t.contact}</a></div>
            <div><strong>{t.legal}</strong><a href="#phap-ly">{t.terms}</a><a href="#phap-ly">{t.privacy}</a><a href="#phap-ly">{t.independence}</a></div>
          </div>
        </div>
        <div className="legal shell"><p>{t.disclaimer}</p><span>© 2026 TrumShop</span></div>
      </footer>

      <a className={`floating-contact ${scrolled ? "visible" : ""}`} href="#lien-he">
        <span>✦</span><strong>{t.contact}</strong>
      </a>
      <button
        className={`back-to-top ${scrolled ? "visible" : ""}`}
        type="button"
        aria-label={t.backTop}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >↑</button>
      <div className={`mobile-contact-bar ${scrolled ? "visible" : ""}`}>
        <button type="button" onClick={openGenericModal}>Zalo</button>
        <button type="button" onClick={openGenericModal}>{t.advice}<span>↗</span></button>
      </div>

      {modal && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setModal(null);
        }}>
          <section className="contact-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <button className="modal-close" type="button" aria-label={t.menuClose} onClick={() => setModal(null)}>×</button>
            <div className="modal-icon">T</div><p className="section-kicker">{t.modalKicker}</p>
            <h2 id="modal-title">{t.modalTitle}</h2>
            <div className="message-preview">
              <span>{t.message}</span><p>{consultationMessage}</p>
            </div>
            <div className="modal-channels">{([
              ["zalo", "Z", t.channels[0]], ["facebook", "f", t.channels[1]], ["instagram", "◎", t.channels[2]],
            ] as const).map(([channel, icon, label]) => (
              <button
                type="button"
                className={`channel-${channel}`}
                key={channel}
                onClick={() => handleChannel(channel)}
              >
                <span>{icon}</span>{label}<i>↗</i>
              </button>
            ))}</div>
            {!CONTACT_LINKS.zalo && <p className="contact-placeholder-note">{t.placeholder}</p>}
            <p className="modal-safety">{t.safety}</p>
          </section>
        </div>
      )}
      <div className={`toast ${toast ? "show" : ""}`} role="status"><span>✓</span>{toast}</div>
    </main>
  );
}
