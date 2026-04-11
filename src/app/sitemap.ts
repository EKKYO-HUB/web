import { MetadataRoute } from "next";
import { getPortfolioProjects } from "@/lib/mdx";
import { getPressReleases } from "@/lib/press-releases";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.ekkyo.jp";
  const projects = getPortfolioProjects();
  const pressReleases = getPressReleases();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/media`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/members`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/portfolio/${project.slug}`,
    lastModified: new Date(project.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const pressPages: MetadataRoute.Sitemap = pressReleases.map((pr) => ({
    url: `${baseUrl}/media/news/${pr.slug}`,
    lastModified: new Date(pr.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...projectPages, ...pressPages];
}
