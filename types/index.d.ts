// Declaração de tipos globais
declare global {
  interface Window {
    gtag: (command: string, target: string, params?: any) => void
  }
}

// Tipos para obras de arte
export interface Artwork {
  id: number
  title: string
  medium: string
  year: string
  price: string
  category: string
  imagePath: string
  description?: string
  dimensions?: string
  moreImages?: string[]
}

// Tipos para formulário de contato
export interface ContactFormData {
  name: string
  email: string
  subject?: string
  message: string
  recaptchaToken?: string
}

