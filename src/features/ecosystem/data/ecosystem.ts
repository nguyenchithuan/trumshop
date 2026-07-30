import type { Language } from "@/features/home/components/HomePage";

type Localized = Record<Language, string>;

export type AiMapArea = {
  readonly id: "writing" | "research" | "coding" | "visual" | "design";
  readonly icon: string;
  readonly accent: string;
  readonly title: Localized;
  readonly description: Localized;
  readonly productIds: readonly string[];
};

export const aiMapAreas: readonly AiMapArea[] = [
  { id: "writing", icon: "✎", accent: "#21c7b7", title: { vi: "Viết & ý tưởng", en: "Writing & ideas" }, description: { vi: "Lên dàn ý, viết nháp, tối ưu giọng văn và phát triển nội dung.", en: "Outline, draft, refine voice and develop content." }, productIds: ["chatgpt", "gemini", "grok"] },
  { id: "research", icon: "⌕", accent: "#7597ff", title: { vi: "Học & nghiên cứu", en: "Study & research" }, description: { vi: "Tóm tắt tài liệu, đặt câu hỏi và hệ thống hóa kiến thức.", en: "Summarize material, ask better questions and structure knowledge." }, productIds: ["gemini", "chatgpt", "canva"] },
  { id: "coding", icon: "⌘", accent: "#78d7ff", title: { vi: "Code & kỹ thuật", en: "Code & technical work" }, description: { vi: "Hiểu codebase, debug, thử hướng giải quyết và học công nghệ mới.", en: "Understand codebases, debug, explore approaches and learn new technology." }, productIds: ["cursor", "chatgpt", "gemini"] },
  { id: "visual", icon: "◉", accent: "#ff9266", title: { vi: "Ảnh & video", en: "Images & video" }, description: { vi: "Tạo concept, chuyển động, video ngắn và phiên bản nội dung.", en: "Create concepts, motion, short video and content variations." }, productIds: ["kling", "openart", "veo"] },
  { id: "design", icon: "◇", accent: "#d47cc5", title: { vi: "Thiết kế & xuất bản", en: "Design & publishing" }, description: { vi: "Hoàn thiện layout, video, bài trình bày và tài sản thương hiệu.", en: "Finish layouts, video, presentations and brand assets." }, productIds: ["canva", "capcut", "adobe"] },
];

export type PromptTemplate = {
  readonly id: string;
  readonly category: Localized;
  readonly title: Localized;
  readonly description: Localized;
  readonly prompt: Localized;
  readonly productIds: readonly string[];
};

export const promptTemplates: readonly PromptTemplate[] = [
  { id: "content-brief", category: { vi: "CONTENT", en: "CONTENT" }, title: { vi: "Biến brief thành kế hoạch nội dung", en: "Turn a brief into a content plan" }, description: { vi: "Dùng khi bạn cần có góc triển khai, format và lịch đăng rõ ràng.", en: "Use it when you need clear angles, formats and a posting plan." }, prompt: { vi: "Bạn là strategist nội dung. Dựa trên brief dưới đây, hãy tạo kế hoạch gồm: insight người xem, 3 hướng nội dung, format phù hợp, hook cho từng hướng và lịch đăng 7 ngày. Nếu brief thiếu dữ liệu, hãy hỏi tối đa 3 câu trước.\n\nBrief: [dán brief ở đây]", en: "You are a content strategist. Based on the brief below, create a plan with: audience insight, 3 content angles, suitable formats, a hook for each angle and a 7-day posting plan. If information is missing, ask up to 3 questions first.\n\nBrief: [paste here]" }, productIds: ["chatgpt", "gemini"] },
  { id: "study-notes", category: { vi: "HỌC TẬP", en: "STUDY" }, title: { vi: "Tóm tắt tài liệu để dễ ôn", en: "Summarize study material" }, description: { vi: "Chuyển tài liệu dài thành ý chính, flashcard và câu hỏi tự kiểm tra.", en: "Turn long material into key points, flashcards and self-check questions." }, prompt: { vi: "Hãy đóng vai gia sư. Từ nội dung dưới đây, tạo: 1) tóm tắt 8 ý chính, 2) bảng thuật ngữ quan trọng, 3) 10 flashcard hỏi-đáp và 4) 5 câu hỏi tự kiểm tra. Giữ ngôn ngữ dễ hiểu, không tự thêm dữ kiện.\n\nNội dung: [dán tài liệu]", en: "Act as a tutor. From the material below, make: 1) an 8-point summary, 2) a key-term table, 3) 10 Q&A flashcards and 4) 5 self-check questions. Use clear language and do not add facts.\n\nMaterial: [paste here]" }, productIds: ["gemini", "chatgpt"] },
  { id: "code-review", category: { vi: "CODE", en: "CODE" }, title: { vi: "Review một thay đổi code", en: "Review a code change" }, description: { vi: "Yêu cầu AI tìm rủi ro và đề xuất test, thay vì sửa mù quáng.", en: "Ask AI to find risks and propose tests instead of making blind edits." }, prompt: { vi: "Review thay đổi code dưới đây như một senior engineer. Hãy trả lời theo cấu trúc: mục tiêu thay đổi, lỗi/rủi ro có thể có, edge case, test cần thêm và câu hỏi cần làm rõ. Không tự viết lại toàn bộ code nếu chưa cần.\n\nContext dự án: [mô tả]\n\nDiff/code: [dán ở đây]", en: "Review the code change below as a senior engineer. Structure the answer as: change goal, possible bugs/risks, edge cases, tests to add and questions to clarify. Do not rewrite all code unless needed.\n\nProject context: [describe]\n\nDiff/code: [paste here]" }, productIds: ["cursor", "chatgpt"] },
  { id: "video-shotlist", category: { vi: "VIDEO", en: "VIDEO" }, title: { vi: "Viết shot list cho video ngắn", en: "Create a short-video shot list" }, description: { vi: "Từ một ý tưởng thành cảnh quay, text on screen và nhịp dựng.", en: "Turn one idea into scenes, on-screen text and editing rhythm." }, prompt: { vi: "Hãy tạo shot list cho video dọc 30 giây. Bao gồm: hook 3 giây đầu, từng cảnh với thời lượng, hành động/camera, text on screen, voice-over và CTA cuối. Giọng điệu: [điền]. Chủ đề: [điền].", en: "Create a shot list for a 30-second vertical video. Include: a 3-second hook, each scene with duration, action/camera, on-screen text, voice-over and closing CTA. Tone: [fill in]. Topic: [fill in]." }, productIds: ["kling", "capcut", "chatgpt"] },
];

export type LearningPath = {
  readonly id: string;
  readonly icon: string;
  readonly accent: string;
  readonly title: Localized;
  readonly description: Localized;
  readonly productIds: readonly string[];
  readonly lessons: Record<Language, readonly string[]>;
};

export const learningPaths: readonly LearningPath[] = [
  { id: "ai-basics", icon: "01", accent: "#21c7b7", title: { vi: "Bắt đầu dùng AI có mục đích", en: "Start using AI with purpose" }, description: { vi: "Từ việc chọn một task nhỏ đến review đầu ra có trách nhiệm.", en: "From choosing one small task to reviewing outputs responsibly." }, productIds: ["chatgpt", "gemini"], lessons: { vi: ["Chọn một việc cụ thể bạn muốn làm nhanh hơn", "Viết prompt có bối cảnh, đầu ra và tiêu chí", "Kiểm tra dữ kiện, giọng văn và thông tin nhạy cảm", "Lưu workflow tốt nhất cho lần sau"], en: ["Choose one specific task to finish faster", "Write prompts with context, output and criteria", "Check facts, voice and sensitive information", "Save your best workflow for later"] } },
  { id: "creator-flow", icon: "02", accent: "#ff9266", title: { vi: "Workflow video cho creator", en: "A creator video workflow" }, description: { vi: "Đi từ brief tới concept, clip thử và bản xuất cuối.", en: "Move from brief to concept, test clip and final export." }, productIds: ["kling", "openart", "capcut"], lessons: { vi: ["Viết creative brief một trang", "Tạo 3 concept hình ảnh hoặc chuyển động", "Chọn concept và dựng bản thử 15–30 giây", "Thêm phụ đề, CTA và xuất bản"], en: ["Write a one-page creative brief", "Create 3 visual or motion concepts", "Choose a concept and edit a 15–30 second test", "Add captions, CTA and publish"] } },
  { id: "code-flow", icon: "03", accent: "#78d7ff", title: { vi: "AI trong workflow lập trình", en: "AI in a coding workflow" }, description: { vi: "Dùng AI để hiểu, kiểm tra và tăng tốc — không thay thế review.", en: "Use AI to understand, validate and speed up—not replace review." }, productIds: ["cursor", "chatgpt", "gemini"], lessons: { vi: ["Bắt đầu bằng task nhỏ có test rõ ràng", "Cung cấp context vừa đủ, loại bỏ dữ liệu nhạy cảm", "Yêu cầu giải thích trước khi nhận code", "Review diff và chạy test trước khi merge"], en: ["Start with a small task with clear tests", "Give enough context and remove sensitive data", "Ask for an explanation before receiving code", "Review the diff and run tests before merging"] } },
];
