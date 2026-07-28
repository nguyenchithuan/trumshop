# Kế hoạch triển khai TrumShop

## 1. Mục tiêu

Xây dựng lại TrumShop trong thư mục này bằng Next.js, với hai yêu cầu không
được đánh đổi:

1. Giữ nguyên giao diện, nội dung, responsive behavior và toàn bộ animation
   của `../TrumShop-Full-Source-v4`.
2. Tổ chức code theo tư duy feature-first của `../call-my-kin`: route mỏng,
   component ngắn và có một trách nhiệm, phân biệt rõ feature, common,
   layout, data, hook và utility.

Đây là frontend tĩnh ở giai đoạn đầu: không thêm database, API bán hàng,
Supabase hay React Query. Các hành động mua/tư vấn hiện tại vẫn là modal và
liên kết liên hệ như bản tham chiếu.

## 2. Nguồn tham chiếu và nguyên tắc giữ nguyên UI

### Nguồn UI

- UI chuẩn: `../TrumShop-Full-Source-v4`.
- Không tự đổi palette, typography, khoảng cách, copywriting, thứ tự section,
  breakpoint, hiệu ứng hover hoặc animation nếu chưa có yêu cầu thiết kế mới.
- Bản hiện có gồm hero, bốn gói, bảng so sánh, quy trình mua, lợi ích, bảo
  hành, FAQ, liên hệ, footer, modal tư vấn, toast, dark/light và Việt/Anh.

### Nguồn kiến trúc

- Kiến trúc chuẩn: `../call-my-kin`.
- Học cách tách route -> feature component/hook, không sao chép phần mobile,
  Supabase, React Query hay native code sang TrumShop.

### Định nghĩa “giống 100%”

Trước khi refactor, tạo baseline ảnh và hành vi từ source v4. Mỗi thay đổi chỉ
được chấp nhận khi bản mới khớp baseline tại desktop và mobile về:

- bố cục, chiều cao section, màu, gradient, border, shadow và typography;
- tất cả state dark/light, Việt/Anh, menu, accordion, modal và toast;
- animation load, scroll reveal, hover, floating elements và responsive menu;
- nội dung và thứ tự hiển thị.

Mọi khác biệt có chủ đích phải được ghi rõ trong PR/commit; nếu không, xem là
lỗi regression.

## 3. Stack chốt cho phiên bản frontend

### Giữ nền tảng hiện có

- Next.js 16 App Router.
- React 19 và TypeScript strict.
- Tailwind CSS 4 cho utility class của component mới; CSS custom vẫn là lựa
  chọn chính cho hiệu ứng thiết kế riêng của TrumShop.
- `next/font` cho font tự host và tối ưu tải trang.

### Thêm khi triển khai

- Lingui: `@lingui/core`, `@lingui/react`, `@lingui/cli`, formatter catalog
  và plugin compile phù hợp với Next.js 16.
- `next-themes`: quản lý dark/light, lưu lựa chọn người dùng và hạn chế flash
  sai theme. Giữ selector `html[data-theme="light"]` hiện tại.
- `lucide-react`: chỉ dùng khi thay một icon ký tự mà không làm khác hình ảnh
  giao diện; không thay icon hàng loạt chỉ vì thư viện mới.
- `clsx` và `tailwind-merge`: helper cho class điều kiện của component Tailwind
  mới. Không ép phần CSS custom cũ phải chuyển sang utility class.
- `@playwright/test`: visual regression và end-to-end test.

Không thêm backend library, form library, animation library, UI kit hoặc SEO
wrapper trong giai đoạn này. Next.js có sẵn metadata, sitemap và robots; CSS
hiện tại đủ để tái tạo animation chính xác hơn một animation library mới.

## 4. Cấu trúc thư mục đích

```text
app/
├── [locale]/
│   ├── layout.tsx                   # html lang, metadata theo locale
│   └── page.tsx                     # chỉ ghép các feature của trang chủ
├── layout.tsx                       # font, global style, provider root
├── sitemap.ts
└── robots.ts

components/
├── common/                          # chỉ UI dùng từ >= 2 feature
│   ├── Accordion.tsx
│   ├── Button.tsx
│   ├── Logo.tsx
│   └── SectionHeading.tsx
└── layout/                          # chỉ site-wide layout, không business logic
    ├── SiteHeader.tsx
    ├── SiteFooter.tsx
    └── SiteShell.tsx

features/
├── landing/
│   └── components/
│       ├── HeroSection.tsx
│       ├── BenefitsSection.tsx
│       └── PurchaseProcessSection.tsx
├── plans/
│   ├── components/
│   │   ├── PlansSection.tsx
│   │   ├── ProductCard.tsx
│   │   └── ComparisonTable.tsx
│   ├── data/
│   │   ├── plans.ts
│   │   └── warranties.ts
│   └── types/
│       └── plan.ts
├── support/
│   ├── components/
│   │   ├── WarrantySection.tsx
│   │   └── FaqSection.tsx
│   └── data/
│       ├── policies.ts
│       └── faqs.ts
├── consultation/
│   ├── components/ConsultationModal.tsx
│   ├── hooks/useConsultation.ts
│   ├── types/consultation.ts
│   └── utils/createConsultationMessage.ts
└── contact/
    ├── components/
    │   ├── ContactSection.tsx
    │   └── FloatingContactActions.tsx
    └── data/contact.ts

hooks/
├── useActiveSection.ts
├── useScrollProgress.ts
└── useScrollReveal.ts

i18n/
├── config.ts
└── routing.ts

locales/
├── vi/messages.po
└── en/messages.po

providers/
└── AppProviders.tsx                 # Lingui + ThemeProvider boundary

styles/
├── tokens.css                       # colour, spacing, font variables
├── base.css                          # reset, document-level styles
├── animations.css                    # keyframes, reveal and reduced motion
└── features/                         # styles scoped by feature when safe

tests/
├── e2e/
│   ├── home.spec.ts
│   ├── interactions.spec.ts
│   ├── locales.spec.ts
│   └── visual.spec.ts
└── visual-baselines/
```

## 5. Quy tắc đặt file

- `app/[locale]/page.tsx` chỉ điều phối layout và feature entry points; không
  chứa state của modal, product, scroll hay hàng trăm dòng JSX.
- Một component chỉ thuộc `components/common` khi có ít nhất hai feature dùng
  cùng contract. Ví dụ `Button` và `Accordion` là common.
- `ProductCard` luôn ở `features/plans`; `ConsultationModal` luôn ở
  `features/consultation`; không đưa chúng vào common chỉ vì chúng đẹp hoặc
  tiện import.
- `components/layout` chỉ xử lý chrome của website (header/footer/shell), không
  được giữ state tư vấn, dữ liệu gói hoặc logic bảo hành.
- Data tĩnh nằm cạnh feature sở hữu nó. Khi có các trang gói riêng trong tương
  lai, `features/plans/data` là nguồn dùng chung.
- Hook tách ra khi nó có state/effect/handler độc lập; utility tách ra khi nó
  biến đổi dữ liệu mà không phụ thuộc React.
- Không tạo “god component” hoặc “god hook”. Tách theo trách nhiệm có nghĩa,
  không tách một JSX 15 dòng thành file vô ích.
- Mọi component, hook và helper public phải có type rõ ràng; không dùng `any`.

## 6. Lộ trình triển khai

### Phase 0 — Baseline và kiểm kê

1. Chạy source v4, lập danh sách chính xác mọi interaction, style state và
   breakpoint.
2. Chụp baseline tại tối thiểu 1440x1200, 1024x1200, 768x1200 và 390x844;
   chụp cho cả dark/light và Việt/Anh.
3. Ghi nhận đặc tả animation: duration, easing, delay, opacity, transform,
   hover state, scroll reveal, ambient orbit và modal transition.
4. Sửa rào cản build trong source tham chiếu nếu cần để baseline có thể tái tạo
   trên macOS; không thay UI của source tham chiếu.

### Phase 1 — Foundation

1. Cài các dependency đã chốt và khóa version tương thích.
2. Thiết lập Lingui, routing `/vi` và `/en`, locale mặc định `vi`, catalog
   nguồn và script extract/compile.
3. Thiết lập `ThemeProvider` với `attribute="data-theme"`, hai theme `dark` và
   `light`, lưu preference và dùng `suppressHydrationWarning` đúng phạm vi.
4. Tạo `AppProviders` để isolate client provider khỏi server-rendered page.
5. Đưa tokens, reset và keyframes vào style layer nhưng giữ nguyên giá trị CSS
   từ v4.

### Phase 2 — Tách cấu trúc nhưng chưa đổi thiết kế

1. Tách data/translation ra khỏi component trang lớn.
2. Tách `SiteHeader`, `SiteFooter`, `HeroSection`, plan/comparison, process,
   benefits, warranty, FAQ, contact và floating actions theo cấu trúc trên.
3. Tách `useActiveSection`, `useScrollProgress`, `useScrollReveal` và
   `useConsultation`; các section chỉ nhận props cần thiết.
4. Chuyển state chọn bảo hành, modal tư vấn, toast và channel loading vào
   feature/hook sở hữu chúng.
5. Sau mỗi section tách xong, so ảnh với baseline trước khi tách section tiếp.

### Phase 3 — SEO và i18n production-ready

1. Render content chính từ server/static HTML; client component chỉ giữ phần
   tương tác.
2. Tạo metadata Việt/Anh, canonical, Open Graph, Twitter card và `html lang`
   đúng locale.
3. Tạo `sitemap.ts`, `robots.ts`, alternate links/hreflang và JSON-LD cho
   Organization, Service/Product và FAQPage khi phù hợp với nội dung thật.
4. Kiểm tra cả `/vi` và `/en` có HTML hoàn chỉnh mà không cần người dùng bấm
   nút đổi ngôn ngữ.

### Phase 4 — Animation và responsive parity

1. Giữ nguyên keyframe, duration, easing, stagger delay, blur, gradient và
   transform của v4.
2. Chỉ dùng CSS animation; không thay bằng Framer Motion/Moti vì có thể làm
   lệch timing và cảm giác của bản thiết kế gốc.
3. Test hover/focus/touch trên desktop và mobile; tôn trọng
   `prefers-reduced-motion` mà không phá bố cục.
4. Kiểm tra menu mobile, bảng so sánh overflow, modal, thanh liên hệ cố định và
   scroll progress tại toàn bộ viewport baseline.

### Phase 5 — Kiểm thử, tối ưu và bàn giao

1. Chạy TypeScript, ESLint, Lingui extract/compile và production build.
2. Viết Playwright test cho luồng menu, đổi locale, đổi theme, chọn bảo hành,
   mở/đóng FAQ/policy, modal, Escape/backdrop, copy message và contact CTA.
3. Chạy visual screenshot comparison cho từng viewport/theme/locale.
4. Kiểm tra Lighthouse/Core Web Vitals, keyboard navigation, focus state và
   semantic heading.
5. Chỉ xóa code cũ sau khi snapshot, interaction và production build đều pass.

## 7. Tiêu chí nghiệm thu

- `npm run build` pass trong project `trumshop`.
- Không còn `app/page.tsx` khổng lồ; route page chỉ là composition layer.
- Không component nào chứa đồng thời data tĩnh, nhiều effect scroll, modal
  business state và hàng trăm dòng UI.
- UI của các baseline khớp source v4 ở tất cả viewport/theme/locale đã định.
- Tất cả animation quan trọng hoạt động như v4 và không có layout shift/flashing
  theme ngoài ý muốn.
- Text tiếng Việt/Anh lấy từ Lingui catalogs, không dùng state đổi text trong
  một URL duy nhất.
- `common`, `layout` và `features` được dùng đúng phạm vi, dễ tìm và dễ mở rộng.
- Không có backend hoặc dependency ngoài scope được thêm vào.

## 8. Rủi ro và cách xử lý

| Rủi ro | Cách xử lý |
| --- | --- |
| Tách component làm khác UI | Tách theo từng section, screenshot diff ngay sau mỗi lần tách. |
| Lingui/locale routing làm mất SEO hoặc flash | Server-render theo locale, test HTML trực tiếp và snapshot cả hai URL. |
| Theme gây hydration mismatch | `next-themes` quản lý `data-theme`; UI toggle chỉ render state sau mount khi cần. |
| CSS v4 dài và nhiều selector phụ thuộc nhau | Giữ nguyên selector/giá trị trong giai đoạn parity; chỉ modularize sau khi visual test pass. |
| Animation bị thay đổi cảm giác | Không thay animation library; so keyframe, duration và transform với v4. |
| Source v4 build không chạy được trên macOS | Dùng dev/preview phù hợp để lấy baseline, đồng thời ghi nhận và sửa riêng pipeline tham chiếu nếu cần. |

## 9. Thứ tự làm việc bắt buộc

Baseline trước -> Foundation -> tách từng feature -> visual diff -> SEO/i18n ->
full regression -> production build. Không được bắt đầu “làm đẹp” hay đổi UI
trước khi đạt visual parity với v4.
