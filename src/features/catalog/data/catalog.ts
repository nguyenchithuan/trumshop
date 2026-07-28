import type { Language } from "@/features/home/components/HomePage";

export type CatalogCategory = "featured" | "chatgpt" | "gemini" | "creative" | "tools";

export type CatalogProduct = {
  readonly id: string;
  readonly name: Record<Language, string>;
  readonly icon: string;
  readonly iconPath?: string;
  readonly iconLabel: string;
  readonly category: CatalogCategory;
  readonly accent: string;
  readonly featured?: boolean;
  readonly soldOut?: boolean;
  readonly codeRelated?: boolean;
  readonly description: Record<Language, string>;
  readonly variants: Record<Language, readonly string[]>;
  readonly warranty: Record<Language, string>;
};

export const categoryLabels: Record<Language, Record<"all" | "code" | CatalogCategory, string>> = {
  vi: { all: "Tất cả", featured: "Bán chạy", code: "AI cho code", chatgpt: "ChatGPT", gemini: "Gemini", creative: "Sáng tạo AI", tools: "Tiện ích số" },
  en: { all: "All products", featured: "Best sellers", code: "Coding AI", chatgpt: "ChatGPT", gemini: "Gemini", creative: "Creative AI", tools: "Digital tools" },
};

export const catalogProducts: readonly CatalogProduct[] = [
  {
    id: "chatgpt", name: { vi: "ChatGPT", en: "ChatGPT" }, icon: "GPT", iconPath: "/product-icons/openai.svg", iconLabel: "ChatGPT", category: "chatgpt", accent: "#21c7b7", featured: true, codeRelated: true,
    description: { vi: "Các lựa chọn ChatGPT cho học tập, công việc và nhu cầu chuyên sâu.", en: "ChatGPT options for study, work and demanding use." },
    variants: { vi: ["ChatGPT Go", "ChatGPT Plus", "ChatGPT Pro", "Nâng cấp chính chủ"], en: ["ChatGPT Go", "ChatGPT Plus", "ChatGPT Pro", "Owner account upgrade"] },
    warranty: { vi: "Bảo hành theo gói đã xác nhận", en: "Warranty confirmed with your plan" },
  },
  {
    id: "gemini", name: { vi: "Gemini", en: "Gemini" }, icon: "✦", iconPath: "/product-icons/gemini.svg", iconLabel: "Gemini", category: "gemini", accent: "#7597ff", featured: true, codeRelated: true,
    description: { vi: "Gói Gemini phục vụ nghiên cứu, sáng tạo và công việc hằng ngày.", en: "Gemini plans for research, creativity and daily work." },
    variants: { vi: ["Gemini Pro", "Gemini Ultra", "Nâng cấp Pixel chính chủ", "Add Family / AntiGravity"], en: ["Gemini Pro", "Gemini Ultra", "Owner Pixel upgrade", "Add Family / AntiGravity"] },
    warranty: { vi: "Tư vấn đúng nhu cầu sử dụng", en: "Guidance for your use case" },
  },
  {
    id: "kling", name: { vi: "Kling AI", en: "Kling AI" }, icon: "K", iconPath: "/product-icons/kling.ico", iconLabel: "Kling AI", category: "creative", accent: "#ff9a63",
    description: { vi: "Tài khoản Kling AI cấp sẵn, dùng riêng cho nhu cầu tạo video.", en: "Ready-to-use private Kling AI accounts for video creation." },
    variants: { vi: ["Standard 680 credit — BH login", "Standard random 750–1K credit — BH 30 ngày", "Pro 3K / 4.5K credit — BH 30 ngày", "Premier 12K / 26K credit"], en: ["Standard 680 credits — login warranty", "Standard random 750–1K credits — 30-day warranty", "Pro 3K / 4.5K credits — 30-day warranty", "Premier 12K / 26K credits"] },
    warranty: { vi: "Có lựa chọn BH login hoặc 30 ngày", en: "Login or 30-day warranty options" },
  },
  {
    id: "openart", name: { vi: "OpenArt", en: "OpenArt" }, icon: "OA", iconPath: "/product-icons/openart.png", iconLabel: "OpenArt", category: "creative", accent: "#ea70c9",
    description: { vi: "Credits OpenArt cho quy trình sáng tạo hình ảnh và nội dung AI.", en: "OpenArt credits for AI image and content workflows." },
    variants: { vi: ["Gói 4K credits", "Gói 12K credits"], en: ["4K credits package", "12K credits package"] },
    warranty: { vi: "Bảo hành 1 ngày", en: "1-day warranty" },
  },
  {
    id: "capcut", name: { vi: "CapCut Pro", en: "CapCut Pro" }, icon: "✂", iconPath: "/product-icons/capcut.ico", iconLabel: "CapCut Pro", category: "creative", accent: "#d9dee8",
    description: { vi: "Lựa chọn CapCut Pro theo số thiết bị và hình thức nâng cấp phù hợp.", en: "CapCut Pro options by device count and upgrade method." },
    variants: { vi: ["Mail riêng tư · 1 thiết bị: 7 ngày đến 1 năm", "Mail riêng tư · 2 thiết bị: 30 ngày đến 1 năm", "Nâng mail chính chủ · 2 thiết bị: 1 tháng đến 1 năm", "Gói chính chủ có 1TB và credit theo tuần"], en: ["Private email · 1 device: 7 days to 1 year", "Private email · 2 devices: 30 days to 1 year", "Owner email upgrade · 2 devices: 1 month to 1 year", "Owner plan includes 1TB and weekly credits"] },
    warranty: { vi: "Bảo hành đầy đủ theo đúng thời gian gói", en: "Full warranty for the selected plan duration" },
  },
  {
    id: "grok", name: { vi: "Grok Super", en: "Grok Super" }, icon: "G", iconPath: "/product-icons/xai.ico", iconLabel: "Grok", category: "tools", accent: "#c8d1dc",
    description: { vi: "Tùy chọn Grok Super linh hoạt theo thời gian sử dụng.", en: "Flexible Grok Super options by usage duration." },
    variants: { vi: ["Gói ngắn ngày", "Gói 15–20 ngày", "Gói 65–68 ngày"], en: ["Short-term plan", "15–20 day plan", "65–68 day plan"] },
    warranty: { vi: "Liên hệ để nhận lựa chọn phù hợp", en: "Contact us for the suitable option" },
  },
  {
    id: "veo", name: { vi: "Veo 3", en: "Veo 3" }, icon: "V", iconPath: "/product-icons/deepmind.svg", iconLabel: "Veo 3", category: "creative", accent: "#ff6c58",
    description: { vi: "Credits và lựa chọn Veo 3 cho sản xuất video bằng AI.", en: "Credits and Veo 3 options for AI video production." },
    variants: { vi: ["Veo 3 Ultra credits", "Veo 3 AntiGravity", "Gói chính chủ"], en: ["Veo 3 Ultra credits", "Veo 3 AntiGravity", "Owner plan"] },
    warranty: { vi: "Chính sách bảo hành được xác nhận trước", en: "Warranty policy confirmed before purchase" },
  },
  {
    id: "canva", name: { vi: "Canva", en: "Canva" }, icon: "C", iconPath: "/product-icons/canva.svg", iconLabel: "Canva", category: "tools", accent: "#30cddd",
    description: { vi: "Tài khoản Canva phục vụ thiết kế, học tập và làm nội dung.", en: "Canva accounts for design, study and content work." },
    variants: { vi: ["Canva Education", "Tư vấn theo nhu cầu"], en: ["Canva Education", "Needs-based guidance"] },
    warranty: { vi: "Liên hệ để được tư vấn", en: "Contact us for guidance" },
  },
  {
    id: "adobe", name: { vi: "Adobe", en: "Adobe" }, icon: "A", iconPath: "/product-icons/adobe.svg", iconLabel: "Adobe", category: "tools", accent: "#f36d72",
    description: { vi: "Giải pháp Adobe cho thiết kế, chỉnh sửa và sáng tạo chuyên nghiệp.", en: "Adobe solutions for professional design, editing and creativity." },
    variants: { vi: ["Adobe Full App", "Gói theo thời hạn"], en: ["Adobe Full App", "Duration-based plan"] },
    warranty: { vi: "Hỗ trợ theo gói đăng ký", en: "Support according to the selected plan" },
  },
  {
    id: "cursor", name: { vi: "Cursor", en: "Cursor" }, icon: "⌘", iconPath: "/product-icons/cursor.ico", iconLabel: "Cursor", category: "tools", accent: "#78d7ff", codeRelated: true,
    description: { vi: "Công cụ hỗ trợ lập trình với AI cho người học và lập trình viên.", en: "An AI-assisted coding tool for learners and developers." },
    variants: { vi: ["Tài khoản Cursor", "Gói dùng cá nhân", "Tư vấn theo nhu cầu sử dụng"], en: ["Cursor account", "Personal-use plan", "Guidance for your needs"] },
    warranty: { vi: "Liên hệ để được tư vấn", en: "Contact us for guidance" },
  },
  {
    id: "claude", name: { vi: "Claude", en: "Claude" }, icon: "AI", iconPath: "/product-icons/anthropic.svg", iconLabel: "Claude", category: "tools", accent: "#e7a573", soldOut: true, codeRelated: true,
    description: { vi: "Trợ lý AI dành cho viết, phân tích và xử lý công việc chuyên sâu.", en: "An AI assistant for writing, analysis and focused work." },
    variants: { vi: ["Claude", "Đang chờ cập nhật nguồn hàng"], en: ["Claude", "Awaiting stock update"] },
    warranty: { vi: "Tạm hết hàng", en: "Temporarily out of stock" },
  },
  {
    id: "more-tools", name: { vi: "Tiện ích khác", en: "More tools" }, icon: "＋", iconLabel: "More digital tools", category: "tools", accent: "#a789ff",
    description: { vi: "Một số tiện ích số khác luôn được cập nhật theo nhu cầu thực tế.", en: "Additional digital tools are updated for current needs." },
    variants: { vi: ["Meitu VIP", "HMA", "ExpressVPN", "Liên hệ để hỏi thêm sản phẩm"], en: ["Meitu VIP", "HMA", "ExpressVPN", "Contact us for more products"] },
    warranty: { vi: "Tùy từng sản phẩm", en: "Depends on the product" },
  },
];
