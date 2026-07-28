import type { MetadataRoute } from "next";

const siteUrl = "https://trumshop.maianh62878woig.chatgpt.site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["vi", "en"].flatMap((locale) => [
    { url: `${siteUrl}/${locale}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${siteUrl}/${locale}/san-pham`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
  ]);
}
