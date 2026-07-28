import { defineConfig } from "@lingui/conf";
import { formatter } from "@lingui/format-po";

export default defineConfig({
  catalogs: [{ include: ["src/features"], path: "src/locales/{locale}/messages" }],
  fallbackLocales: { default: "vi" },
  format: formatter({ lineNumbers: false }),
  locales: ["vi", "en"],
  sourceLocale: "vi",
});
