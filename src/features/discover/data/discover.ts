import type { Language } from "@/features/home/components/HomePage";

export type CollectionId = "study" | "work" | "code" | "visual";

type LocalizedText = Record<Language, string>;

export type CollectionDefinition = {
  readonly id: CollectionId;
  readonly icon: string;
  readonly accent: string;
  readonly title: LocalizedText;
  readonly description: LocalizedText;
  readonly outcome: LocalizedText;
  readonly productIds: readonly string[];
};

export const collections: readonly CollectionDefinition[] = [
  { id: "study", icon: "✦", accent: "#21c7b7", title: { vi: "Học tập & viết", en: "Study & writing" }, description: { vi: "Tóm tắt tài liệu, học ngoại ngữ và trình bày ý tưởng rõ ràng hơn.", en: "Summarize material, learn languages and express ideas more clearly." }, outcome: { vi: "Một bộ khởi đầu gọn cho học tập mỗi ngày.", en: "A focused daily study starter set." }, productIds: ["chatgpt", "gemini", "canva"] },
  { id: "work", icon: "↗", accent: "#7597ff", title: { vi: "Công việc hằng ngày", en: "Everyday work" }, description: { vi: "Lên kế hoạch, xử lý tài liệu và rút ngắn các việc lặp lại.", en: "Plan, process documents and shorten repetitive work." }, outcome: { vi: "Ưu tiên công cụ linh hoạt, dễ bắt đầu.", en: "Flexible tools that are easy to start with." }, productIds: ["chatgpt", "gemini", "grok"] },
  { id: "code", icon: "⌘", accent: "#78d7ff", title: { vi: "Lập trình", en: "Coding" }, description: { vi: "Viết code, debug, đọc dự án và khám phá giải pháp kỹ thuật.", en: "Write code, debug, read projects and explore technical solutions." }, outcome: { vi: "Một luồng làm việc cho việc học và làm phần mềm.", en: "A workflow for learning and building software." }, productIds: ["cursor", "chatgpt", "gemini"] },
  { id: "visual", icon: "◉", accent: "#ff9a63", title: { vi: "Ảnh & video", en: "Images & video" }, description: { vi: "Tạo concept, dựng video và hoàn thiện nội dung nhanh hơn.", en: "Create concepts, edit video and ship content faster." }, outcome: { vi: "Dành cho creator cần thử nhiều ý tưởng.", en: "For creators who need to explore many ideas." }, productIds: ["kling", "capcut", "openart"] },
];

export type Guide = {
  readonly id: string;
  readonly category: LocalizedText;
  readonly title: LocalizedText;
  readonly description: LocalizedText;
  readonly duration: LocalizedText;
  readonly productIds: readonly string[];
  readonly steps: Record<Language, readonly string[]>;
};

export const guides: readonly Guide[] = [
  { id: "choose-ai", category: { vi: "BẮT ĐẦU", en: "GET STARTED" }, title: { vi: "Chọn công cụ AI theo việc bạn cần làm", en: "Choose an AI tool for the work you do" }, description: { vi: "Một cách đơn giản để bắt đầu từ nhu cầu, thay vì bị ngợp bởi tên gói.", en: "A simple way to start from your task, not an overwhelming plan list." }, duration: { vi: "3 phút đọc", en: "3 min read" }, productIds: ["chatgpt", "gemini", "cursor"], steps: { vi: ["Xác định một việc bạn muốn làm nhanh hơn trong tuần này.", "Chọn nhóm phù hợp: viết, nghiên cứu, code hoặc nội dung hình ảnh.", "Mở trang sản phẩm để xem quyền lợi và hỏi TrumShop về gói phù hợp."], en: ["Pick one task you want to finish faster this week.", "Choose a relevant group: writing, research, code or visual content.", "Open the product page to review benefits and ask TrumShop about a suitable plan."] } },
  { id: "video-workflow", category: { vi: "CREATOR", en: "CREATOR" }, title: { vi: "Luồng làm video từ ý tưởng đến bản đăng", en: "A video workflow from idea to post" }, description: { vi: "Kết hợp tạo concept, dựng clip và hoàn thiện phụ đề trong một quy trình gọn.", en: "Combine concepting, clip generation and captions in one lean process." }, duration: { vi: "4 phút đọc", en: "4 min read" }, productIds: ["kling", "openart", "capcut"], steps: { vi: ["Viết một brief ngắn: người xem, thông điệp và định dạng video.", "Tạo vài concept hình/chuyển động để chọn hướng tốt nhất.", "Dựng, thêm phụ đề và xuất thử một phiên bản ngắn trước khi làm hàng loạt."], en: ["Write a short brief: audience, message and video format.", "Generate a few visual or motion concepts to choose a direction.", "Edit, caption and export a short test before producing at scale."] } },
  { id: "coding-start", category: { vi: "LẬP TRÌNH", en: "CODING" }, title: { vi: "Bắt đầu dùng AI trong dự án code", en: "Start using AI in a code project" }, description: { vi: "Dùng AI để hiểu codebase và kiểm tra hướng giải quyết, không thay thế việc review.", en: "Use AI to understand a codebase and test approaches, not to replace review." }, duration: { vi: "5 phút đọc", en: "5 min read" }, productIds: ["cursor", "chatgpt", "gemini"], steps: { vi: ["Bắt đầu bằng một task nhỏ, có đầu ra rõ ràng và test được.", "Cung cấp đủ ngữ cảnh nhưng bỏ dữ liệu nhạy cảm khỏi prompt.", "Review thay đổi, chạy test và tự quyết định trước khi đưa vào dự án."], en: ["Start with a small task with a clear, testable outcome.", "Provide enough context but keep sensitive data out of prompts.", "Review changes, run tests and make the final decision yourself."] } },
];
