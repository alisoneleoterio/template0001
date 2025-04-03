import type { MetadataRoute } from "next"
import { artworks } from "@/data/artworks"

export default function sitemap(): MetadataRoute.Sitemap {
  // URL base do site
  const baseUrl = "https://www.seudominio.com" // SUBSTITUIR: Adicione seu domínio real aqui

  // Data atual para lastModified
  const currentDate = new Date()

  // Páginas estáticas
  const staticPages = [
    {
      url: `${baseUrl}/`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/works`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ]

  // Páginas dinâmicas (obras)
  const artworkPages = artworks.map((artwork) => ({
    url: `${baseUrl}/works/${artwork.id}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  return [...staticPages, ...artworkPages]
}

