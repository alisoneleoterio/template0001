import { NextResponse } from "next/server"
import { rateLimit } from "@/lib/rate-limit"
import { logger } from "@/lib/logger"

// Criar um limitador de taxa que permite 5 solicitações por minuto
const limiter = rateLimit({
  interval: 60 * 1000, // 1 minuto
  uniqueTokenPerInterval: 500, // Máximo 500 usuários por intervalo
})

export async function POST(request) {
  const ip = request.headers.get("x-forwarded-for") || "anonymous"
  const startTime = Date.now()

  try {
    // Verificar limite de taxa
    await limiter.check(5, ip) // 5 solicitações por minuto por IP

    // Processar a solicitação
    const body = await request.json()

    // Validar dados
    if (!body.name || !body.email || !body.message) {
      logger.security("Tentativa de envio de formulário com dados inválidos", { ip })
      return NextResponse.json(
        { error: "Dados inválidos. Por favor, preencha todos os campos obrigatórios." },
        { status: 400 },
      )
    }

    // Validar token reCAPTCHA (em um cenário real, você verificaria com a API do Google)
    if (!body.recaptchaToken) {
      logger.security("Tentativa de envio de formulário sem token reCAPTCHA", { ip })
      return NextResponse.json({ error: "Verificação reCAPTCHA falhou." }, { status: 400 })
    }

    // Aqui você implementaria a lógica para enviar o email
    // Por exemplo, usando um serviço como SendGrid, Mailgun, etc.

    // Registrar sucesso
    logger.info("Formulário de contato enviado com sucesso", {
      email: body.email,
      responseTime: Date.now() - startTime,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error.message === "Rate limit exceeded") {
      logger.security("Limite de taxa excedido", { ip })
      return NextResponse.json(
        { error: "Limite de taxa excedido. Por favor, tente novamente mais tarde." },
        { status: 429 },
      )
    }

    logger.error("Erro ao processar formulário de contato", error)
    return NextResponse.json({ error: "Ocorreu um erro ao processar sua solicitação." }, { status: 500 })
  }
}

