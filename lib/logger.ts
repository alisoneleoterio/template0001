// Utilitário de logging para rastrear eventos e erros
export const logger = {
  info: (message: string, data = {}) => {
    console.log(`[INFO] ${message}`, data)
    // Em produção, você pode querer enviar isso para um serviço de logging
    // como Sentry, LogRocket, etc.
  },
  error: (message: string, error = null) => {
    console.error(`[ERROR] ${message}`, error)
    // Em produção, você pode querer enviar isso para um serviço de logging
    // e talvez notificar os desenvolvedores
  },
  security: (message: string, data = {}) => {
    console.warn(`[SECURITY] ${message}`, data)
    // Em produção, você pode querer enviar isso para um serviço de logging
    // ou sistema de alerta para possíveis problemas de segurança
  },
  performance: (message: string, timing = {}) => {
    console.log(`[PERFORMANCE] ${message}`, timing)
    // Em produção, você pode querer enviar isso para um serviço de
    // monitoramento de performance como New Relic, Datadog, etc.
  },
}

