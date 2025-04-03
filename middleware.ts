import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { logger } from "@/lib/logger"

export function middleware(request: NextRequest) {
  // Registrar solicitação para fins de segurança
  logger.security("Solicitação recebida", {
    url: request.url,
    method: request.method,
    ip: request.ip || "unknown",
    userAgent: request.headers.get("user-agent") || "unknown",
  })

  // Clone a resposta
  const response = NextResponse.next()

  // Adicionar headers de segurança

  // Content-Security-Policy - Protege contra ataques XSS
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com https://www.googletagmanager.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: blob: https://*;
    font-src 'self';
    connect-src 'self' https://api.emailjs.com https://www.google-analytics.com;
    frame-src 'self' https://www.google.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'self';
    block-all-mixed-content;
    upgrade-insecure-requests;
  `
    .replace(/\s{2,}/g, " ")
    .trim()

  // Adicionar headers de segurança
  response.headers.set("Content-Security-Policy", cspHeader)
  response.headers.set("X-DNS-Prefetch-Control", "on")
  response.headers.set("X-XSS-Protection", "1; mode=block")
  response.headers.set("X-Frame-Options", "SAMEORIGIN")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), interest-cohort=()")

  // Strict-Transport-Security - Força HTTPS
  response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload")

  return response
}

// Aplicar este middleware apenas a caminhos específicos
export const config = {
  matcher: [
    /*
     * Corresponder a todos os caminhos de solicitação, exceto os que começam com:
     * - api (rotas de API)
     * - _next/static (arquivos estáticos)
     * - _next/image (arquivos de otimização de imagem)
     * - favicon.ico (arquivo de favicon)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}

