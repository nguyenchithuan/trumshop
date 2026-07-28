import type { MetadataRoute } from "next";

const siteUrl = "https://trumshop.maianh62878woig.chatgpt.site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["vi", "en"].map((locale) => ({ url: `${siteUrl}/${locale}`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 }));
}
