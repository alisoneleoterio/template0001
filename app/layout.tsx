import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@/components/analytics"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  // SUBSTITUIR: Adicione o título e descrição reais do seu site
  title: {
    default: "Portfólio de Arte | Seu Nome",
    template: "%s | Portfólio de Arte",
  },
  description: "Portfólio de obras de arte originais incluindo pinturas, arte digital e técnicas mistas.",
  keywords: "arte, pintura, artista, galeria, obras de arte, comprar arte",
  authors: [{ name: "Seu Nome" }], // SUBSTITUIR: Adicione seu nome real aqui
  creator: "Seu Nome", // SUBSTITUIR: Adicione seu nome real aqui
  publisher: "Seu Nome", // SUBSTITUIR: Adicione seu nome real aqui
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://www.alisoneleoterioartes.com/", // SUBSTITUIR: Adicione seu domínio real aqui
    title: "PAlison Eleotério", // SUBSTITUIR: Adicione seu nome real aqui
    description: "Descubra obras de arte únicas e expressivas.",
    siteName: "Alison Eleotério", // SUBSTITUIR: Adicione o nome real do seu site aqui
    images: [
      {
        url: "/og-image.jpg", // SUBSTITUIR: Adicione sua imagem real aqui
        width: 1200,
        height: 630,
        alt: "Portfólio de Arte - Alison Eleotério",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alison Eleotério", // SUBSTITUIR: Adicione seu nome real aqui
    description: "Descubra obras de arte únicas e expressivas.",
    creator: "@seuhandle", // SUBSTITUIR: Adicione seu handle real do Twitter aqui
    images: ["/og-image.jpg"], // SUBSTITUIR: Adicione sua imagem real aqui
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  verification: {
    // SUBSTITUIR: Adicione suas verificações reais aqui, se necessário
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow dark:bg-gray-900">{children}</div>
            <Footer />
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}



import './globals.css'