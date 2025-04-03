import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Função para combinar classes condicionalmente
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// SUBSTITUIR: Adicione seu número de WhatsApp no formato internacional sem + ou espaços
const whatsappNumber = "5512997878196" // Exemplo: para +1 (123) 456-7890, use 1234567890

// Função para criar link do WhatsApp com informações da obra
export function createWhatsAppLink(artwork: any) {
  const message = `Olá, tenho interesse na sua obra: "${artwork.title}" (${artwork.medium}, ${artwork.year}) com preço ${artwork.price}.`
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
}

// Função para formatar data
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date)
}

// Função para truncar texto
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

// Função para gerar slug
export function slugify(text: string): string {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
}

