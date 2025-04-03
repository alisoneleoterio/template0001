"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname) {
      // Exemplo de código para Google Analytics
      // Você pode substituir isso pelo seu próprio código de analytics
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")

      // Enviar pageview para Google Analytics (se estiver configurado)
      if (typeof window.gtag === "function") {
        window.gtag("config", "G-XXXXXXXXXX", {
          page_path: url,
        })
      }

      // Você também pode adicionar outros serviços de analytics aqui
    }
  }, [pathname, searchParams])

  return null
}

