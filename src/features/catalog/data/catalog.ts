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

export type ProductDetail = {
  readonly overview: Record<Language, string>;
  readonly capabilities: Record<Language, readonly string[]>;
  readonly planBenefits: Record<Language, readonly string[]>;
  readonly availabilityNote: Record<Language, string>;
  readonly officialUrl?: string;
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

export const catalogProductDetails: Readonly<Record<string, ProductDetail>> = {
  chatgpt: {
    overview: { vi: "Trợ lý AI đa năng cho học tập, công việc, sáng tạo và lập trình. Phù hợp khi bạn cần biến ý tưởng thành bản nháp, phân tích hoặc kế hoạch nhanh hơn.", en: "A versatile AI assistant for study, work, creativity and coding—helping turn ideas into drafts, analysis and plans faster." },
    capabilities: { vi: ["Viết, tóm tắt, dịch và lên ý tưởng nội dung", "Phân tích tệp, dữ liệu và hình ảnh", "Hỗ trợ viết, giải thích và rà soát code", "Tìm kiếm, nghiên cứu chuyên sâu và làm việc bằng giọng nói"], en: ["Write, summarize, translate and brainstorm", "Analyze files, data and images", "Write, explain and review code", "Search, research and use voice interactions"] },
    planBenefits: { vi: ["Go / Plus: hạn mức sử dụng cao hơn và nhiều công cụ nâng cao hơn gói miễn phí", "Plus: có thể dùng các tính năng như dự án, GPT tùy chỉnh, phân tích dữ liệu hoặc tạo ảnh tùy khu vực", "Pro: ưu tiên hạn mức cao hơn cho các model suy luận, nghiên cứu sâu và tính năng mới", "Nâng cấp chính chủ: dùng trên chính tài khoản của bạn sau khi xác nhận điều kiện"], en: ["Go / Plus: higher usage limits and more advanced tools than the free plan", "Plus: projects, custom GPTs, data analysis or image creation where available", "Pro: higher-priority access to reasoning, deep research and new features", "Owner upgrade: applied to your own account after eligibility is confirmed"] },
    availabilityNote: { vi: "Tính năng, model và hạn mức có thể thay đổi theo OpenAI, quốc gia và trạng thái tài khoản.", en: "Features, models and limits may vary by OpenAI, country and account status." },
    officialUrl: "https://openai.com/chatgpt/pricing",
  },
  gemini: {
    overview: { vi: "Trợ lý AI của Google dành cho nghiên cứu, viết, lập trình và làm việc cùng hệ sinh thái Google. Hợp với người cần xử lý tài liệu dài hoặc làm việc qua Gmail, Docs và Drive.", en: "Google's AI assistant for research, writing, coding and work across Google's ecosystem." },
    capabilities: { vi: ["Trao đổi, viết và nghiên cứu nhiều nguồn với Deep Research", "Đọc, tóm tắt và phân tích tài liệu dài", "Tạo/chỉnh sửa hình ảnh, hỗ trợ Canvas và Gemini Live", "Hỗ trợ code, giải thích lỗi và gợi ý giải pháp"], en: ["Chat, write and research across sources with Deep Research", "Read, summarize and analyze long documents", "Generate/edit images, use Canvas and Gemini Live", "Code assistance, debugging and solution ideas"] },
    planBenefits: { vi: ["Gemini Pro: hạn mức cao hơn cho model mạnh, Deep Research và các công cụ Google AI", "Gemini Ultra: mức truy cập cao nhất cho các model/tính năng sáng tạo và nghiên cứu", "Nâng cấp Pixel chính chủ: sử dụng trên tài khoản Google của bạn khi đủ điều kiện", "Add Family / AntiGravity: được tư vấn theo hình thức tài khoản và khu vực đang hỗ trợ"], en: ["Gemini Pro: higher limits for advanced models, Deep Research and Google AI tools", "Gemini Ultra: highest access level for models plus creative and research features", "Owner Pixel upgrade: used on your Google account when eligible", "Add Family / AntiGravity: availability is confirmed per account and region"] },
    availabilityNote: { vi: "Quyền lợi Google AI khác nhau theo quốc gia, độ tuổi, tài khoản và thay đổi từ Google.", en: "Google AI benefits vary by country, age, account and Google's ongoing updates." },
    officialUrl: "https://gemini.google.com/advanced",
  },
  cursor: {
    overview: { vi: "Trình soạn thảo code có AI, giúp hiểu codebase, viết tính năng và xử lý lỗi ngay trong môi trường lập trình.", en: "An AI code editor that helps understand codebases, build features and resolve bugs inside your development environment." },
    capabilities: { vi: ["Gợi ý code khi gõ và chỉnh sửa trực tiếp trong tệp", "Agent hỗ trợ đọc codebase, lập kế hoạch và triển khai nhiều bước", "Hỏi đáp về code, debug và tái cấu trúc", "Làm việc với nhiều model coding và ngữ cảnh dự án"], en: ["Inline code completion and in-file editing", "Agents that read codebases, plan and implement multi-step work", "Code Q&A, debugging and refactoring", "Work with multiple coding models and project context"] },
    planBenefits: { vi: ["Gói cá nhân: dùng Agent, code completion và model theo hạn mức tài khoản", "Gói cấp sẵn: TrumShop xác nhận loại tài khoản, thời hạn và cách đăng nhập trước khi giao", "Nhu cầu code nhiều: nên liên hệ để chọn hạn mức Agent/model phù hợp", "Các tính năng như cloud agent hoặc Bugbot tùy gói chính thức đang kích hoạt"], en: ["Personal plan: use Agent, code completion and models within account limits", "Ready account: TrumShop confirms account type, duration and login method before delivery", "For heavier coding use, contact us for suitable Agent/model limits", "Cloud agents and Bugbot depend on the active official plan"] },
    availabilityNote: { vi: "Hạn mức Agent phụ thuộc model được chọn và chính sách Cursor tại thời điểm sử dụng.", en: "Agent limits depend on the selected model and Cursor policy at the time of use." },
    officialUrl: "https://cursor.com/pricing",
  },
  claude: {
    overview: { vi: "Trợ lý AI của Anthropic, mạnh về viết, phân tích tài liệu và hỗ trợ công việc cần suy luận kỹ. Sản phẩm hiện tạm hết hàng.", en: "Anthropic's AI assistant for writing, document analysis and reasoning-intensive work. This product is currently out of stock." },
    capabilities: { vi: ["Viết, chỉnh sửa và diễn đạt nội dung", "Phân tích văn bản, tài liệu và thông tin phức tạp", "Hỗ trợ lập trình, giải thích và rà soát logic", "Thảo luận, lập kế hoạch và tổng hợp ý tưởng"], en: ["Write, edit and refine content", "Analyze text, documents and complex information", "Assist with coding, explanations and logic review", "Discuss, plan and synthesize ideas"] },
    planBenefits: { vi: ["Hiện chưa nhận đơn Claude do tạm hết nguồn hàng", "Khi mở lại, quyền lợi sẽ được xác nhận theo đúng gói và khu vực", "Bạn vẫn có thể xem thông tin để so sánh với các AI cho code khác"], en: ["Claude orders are not available while stock is paused", "When reopened, benefits will be confirmed for the exact plan and region", "You can still review this overview against other coding AI tools"] },
    availabilityNote: { vi: "Tạm hết hàng — chưa thể chọn gói hoặc báo giá.", en: "Temporarily out of stock — plans and quotes are unavailable." },
    officialUrl: "https://www.anthropic.com/claude",
  },
  kling: {
    overview: { vi: "Công cụ tạo video AI từ mô tả hoặc ảnh tham chiếu, phù hợp làm video ngắn, chuyển động sản phẩm và ý tưởng sáng tạo.", en: "An AI video tool for prompts or reference images, suited to short videos, product motion and creative concepts." },
    capabilities: { vi: ["Tạo video từ text hoặc image-to-video", "Tạo chuyển động, bối cảnh và góc máy theo prompt", "Dùng credit để thực hiện các lượt tạo video", "Phù hợp thử concept, social clip và tư liệu sáng tạo"], en: ["Create video from text or images", "Direct motion, scenes and camera through prompts", "Use credits for video-generation runs", "Explore concepts, social clips and creative material"] },
    planBenefits: { vi: ["Standard: mức credit cơ bản cho nhu cầu tạo video thường xuyên", "Pro: nhiều credit hơn cho quy trình thử nghiệm và tạo nhiều phiên bản", "Premier: dung lượng credit lớn cho nhu cầu sản xuất cao", "Tùy gói có bảo hành login hoặc 30 ngày như đã ghi khi tư vấn"], en: ["Standard: baseline credits for regular video creation", "Pro: more credits for iteration and more versions", "Premier: larger credit volume for heavier production", "Selected plans include login or 30-day warranty as confirmed during consultation"] },
    availabilityNote: { vi: "Credit tiêu hao theo model, độ dài và cài đặt video; quyền lợi thực tế sẽ được chốt trước khi giao.", en: "Credit use depends on model, video length and settings; actual benefits are confirmed before delivery." },
    officialUrl: "https://klingai.com/",
  },
  openart: {
    overview: { vi: "Không gian sáng tạo AI kết hợp tạo ảnh, video và các công cụ chỉnh sửa để biến prompt, ảnh sản phẩm hoặc kịch bản thành nội dung.", en: "An AI creative workspace for images, video and editing—turning prompts, product photos or scripts into content." },
    capabilities: { vi: ["Tạo ảnh từ mô tả, ảnh tham chiếu và nhiều model", "Tạo video từ text hoặc ảnh", "Chỉnh sửa ảnh, upscale, đổi phong cách và background", "Làm nội dung quảng cáo, social hoặc storyboard"], en: ["Generate images from prompts, references and multiple models", "Create video from text or images", "Edit, upscale, restyle and replace backgrounds", "Make ad, social and storyboard content"] },
    planBenefits: { vi: ["4K credits: phù hợp thử workflow và nhu cầu sáng tạo vừa phải", "12K credits: phù hợp tạo nhiều phiên bản hoặc nội dung thường xuyên", "Credit được dùng theo model/tác vụ bạn chọn trong OpenArt", "Bảo hành 1 ngày theo gói hiện có"], en: ["4K credits: suited to trying workflows and moderate creation", "12K credits: suited to more versions or frequent content", "Credits are consumed by the model/task chosen in OpenArt", "Current packages include a one-day warranty"] },
    availabilityNote: { vi: "Lượng credit cần thiết phụ thuộc model, ảnh/video và cài đặt xuất nội dung.", en: "Credit needs depend on the model, image/video type and output settings." },
    officialUrl: "https://openart.ai/features/",
  },
  capcut: {
    overview: { vi: "Bộ công cụ dựng video cho creator, từ template và hiệu ứng đến phụ đề, giọng nói và các công cụ AI hỗ trợ làm video nhanh.", en: "A creator video-editing suite with templates, effects, captions, voice and AI tools for faster production." },
    capabilities: { vi: ["Template, hiệu ứng, transition, filter và text nâng cao", "Phụ đề tự động, text-to-speech và công cụ chỉnh sửa video", "Tính năng AI như script-to-video hoặc avatar tùy nền tảng/khu vực", "Lưu trữ đám mây và workflow đa thiết bị theo quyền lợi gói"], en: ["Advanced templates, effects, transitions, filters and text", "Auto captions, text-to-speech and video editing tools", "AI tools such as script-to-video or avatars where available", "Cloud storage and multi-device workflows depending on plan benefits"] },
    planBenefits: { vi: ["Mail riêng tư 1 thiết bị: gói dùng cá nhân theo thời hạn", "Mail riêng tư 2 thiết bị: dùng được trên 2 thiết bị theo gói", "Nâng mail chính chủ 2 thiết bị: kích hoạt trên mail của bạn sau khi xác nhận", "Gói chính chủ có dung lượng/credit theo thông tin đã xác nhận trước khi giao"], en: ["Private email, 1 device: personal use for the selected duration", "Private email, 2 devices: two-device use within the plan", "Owner email upgrade, 2 devices: activated on your email after confirmation", "Owner benefits such as storage/credits are confirmed before delivery"] },
    availabilityNote: { vi: "Một số tính năng CapCut thay đổi theo nền tảng, quốc gia và phiên bản ứng dụng.", en: "Some CapCut features vary by platform, country and app version." },
    officialUrl: "https://www.capcut.com/help/capcut-pro",
  },
  grok: {
    overview: { vi: "Trợ lý AI của xAI cho trò chuyện, khám phá ý tưởng, phân tích và hỗ trợ công việc thường ngày.", en: "xAI's assistant for conversation, exploration, analysis and everyday work." },
    capabilities: { vi: ["Trao đổi và phát triển ý tưởng", "Hỗ trợ viết, tóm tắt và phân tích", "Giải đáp kiến thức và xử lý yêu cầu theo hội thoại", "Hỗ trợ suy nghĩ về code và kỹ thuật khi phù hợp"], en: ["Discuss and develop ideas", "Support writing, summaries and analysis", "Answer questions through conversation", "Assist with code and technical thinking when appropriate"] },
    planBenefits: { vi: ["Gói ngắn ngày: phù hợp trải nghiệm hoặc nhu cầu tạm thời", "Gói 15–20 ngày: cân bằng cho nhu cầu thường xuyên", "Gói dài ngày: phù hợp dùng liên tục", "Loại quyền lợi và phương thức dùng sẽ được xác nhận trước khi giao"], en: ["Short plan: for trials or temporary needs", "15–20 day plan: balanced for regular use", "Longer plan: for continuous use", "Access type and delivery method are confirmed before delivery"] },
    availabilityNote: { vi: "Tính năng và hạn mức phụ thuộc gói Grok đang được kích hoạt.", en: "Features and limits depend on the active Grok plan." },
    officialUrl: "https://x.ai/grok",
  },
  veo: {
    overview: { vi: "Model tạo video của Google DeepMind, giúp biến mô tả hoặc hình tham chiếu thành các đoạn video có chuyển động và câu chuyện.", en: "Google DeepMind's video-generation model for turning descriptions or reference images into moving clips and stories." },
    capabilities: { vi: ["Tạo video từ prompt và ý tưởng cảnh", "Khai thác credit để thử nhiều concept video", "Phục vụ storyboard, nội dung social và concept quảng cáo", "Dùng qua các sản phẩm/tài khoản hỗ trợ Veo tùy thời điểm"], en: ["Generate video from prompts and scene ideas", "Use credits to explore multiple video concepts", "Support storyboards, social content and ad concepts", "Access through products/accounts that support Veo at the time"] },
    planBenefits: { vi: ["Veo Ultra credits: dùng credit cho các lượt tạo video", "AntiGravity: được tư vấn theo phương thức quyền lợi hiện có", "Gói chính chủ: sử dụng trên tài khoản của bạn khi đủ điều kiện", "Bảo hành được xác nhận trước khi thanh toán"], en: ["Veo Ultra credits: use credits for video generations", "AntiGravity: confirmed against the currently available benefit method", "Owner plan: used on your account when eligible", "Warranty is confirmed before payment"] },
    availabilityNote: { vi: "Model, credit và khả năng truy cập Veo thay đổi theo dịch vụ Google đang hỗ trợ.", en: "Veo models, credits and access vary by the supporting Google service." },
    officialUrl: "https://deepmind.google/models/veo/",
  },
  canva: {
    overview: { vi: "Nền tảng thiết kế trực quan để làm bài thuyết trình, social post, video, tài liệu và tài sản thương hiệu mà không cần bắt đầu từ con số 0.", en: "A visual design platform for presentations, social posts, video, documents and brand assets without starting from scratch." },
    capabilities: { vi: ["Thiết kế từ template cho social, slide, tài liệu và video", "Chỉnh sửa hình, text, layout và tài sản thương hiệu", "Chia sẻ, cộng tác và xuất nội dung nhiều định dạng", "Hỗ trợ các công cụ sáng tạo AI tùy quyền lợi tài khoản"], en: ["Design with templates for social, slides, documents and video", "Edit images, text, layouts and brand assets", "Share, collaborate and export in multiple formats", "Use AI creative tools depending on account benefits"] },
    planBenefits: { vi: ["Canva Education: quyền lợi phục vụ học tập khi đáp ứng điều kiện", "Gói được tư vấn theo mục tiêu thiết kế hoặc làm nội dung", "Loại tài khoản và cách dùng được xác nhận trước khi giao"], en: ["Canva Education: study-related benefits when eligible", "Plans are advised according to design or content needs", "Account type and usage method are confirmed before delivery"] },
    availabilityNote: { vi: "Quyền lợi Canva phụ thuộc loại tài khoản, điều kiện xác minh và khu vực.", en: "Canva benefits depend on account type, verification eligibility and region." },
    officialUrl: "https://www.canva.com/pro/",
  },
  adobe: {
    overview: { vi: "Hệ sinh thái sáng tạo chuyên nghiệp cho thiết kế hình ảnh, video, tài liệu và nội dung số.", en: "A professional creative ecosystem for visual design, video, documents and digital content." },
    capabilities: { vi: ["Thiết kế ảnh, đồ họa, layout và tài liệu", "Chỉnh sửa video, âm thanh và motion", "Làm việc với các ứng dụng Adobe theo quyền lợi gói", "Lưu trữ, đồng bộ và chia sẻ tài nguyên sáng tạo"], en: ["Design images, graphics, layouts and documents", "Edit video, audio and motion", "Use Adobe applications included by the active plan", "Store, sync and share creative assets"] },
    planBenefits: { vi: ["Adobe Full App: dùng các ứng dụng có trong quyền lợi của gói", "Gói theo thời hạn: chọn thời gian phù hợp nhu cầu", "Khả năng dùng app/dịch vụ được chốt theo đúng tài khoản trước khi giao"], en: ["Adobe Full App: use applications included in the active benefit", "Duration plans: choose a suitable period", "Included apps/services are confirmed for the exact account before delivery"] },
    availabilityNote: { vi: "Danh sách ứng dụng và quyền lợi Adobe thay đổi theo gói, vùng và điều khoản của Adobe.", en: "Adobe apps and benefits vary by plan, region and Adobe terms." },
    officialUrl: "https://www.adobe.com/creativecloud.html",
  },
  "more-tools": {
    overview: { vi: "Nhóm tiện ích số được cập nhật theo nhu cầu thực tế, từ công cụ sáng tạo đến bảo mật và dịch vụ hỗ trợ khác.", en: "A flexible group of digital utilities, updated for current needs—from creative tools to privacy and support services." },
    capabilities: { vi: ["Cập nhật các tiện ích theo nguồn hàng hiện có", "Tư vấn theo mục đích sử dụng thực tế", "Xác nhận loại tài khoản, thời hạn và quyền lợi trước khi giao"], en: ["Update utilities according to available supply", "Advise based on practical usage needs", "Confirm account type, duration and benefits before delivery"] },
    planBenefits: { vi: ["Meitu VIP, HMA, ExpressVPN và các tiện ích khác", "Mỗi tiện ích có quyền lợi, thời hạn và chính sách riêng", "Liên hệ để nhận danh sách đang có và lựa chọn phù hợp"], en: ["Meitu VIP, HMA, ExpressVPN and other utilities", "Each utility has its own benefits, duration and policy", "Contact us for the current list and a suitable option"] },
    availabilityNote: { vi: "Danh mục này thay đổi theo nguồn hàng thực tế.", en: "This catalog changes with actual availability." },
  },
};
