// Utilitário para limitar a taxa de solicitações
export function rateLimit({ interval, uniqueTokenPerInterval }: { interval: number; uniqueTokenPerInterval: number }) {
  const tokenCache = new Map()

  return {
    check: (limit: number, token: string) =>
      new Promise<void>((resolve, reject) => {
        const tokenCount = tokenCache.get(token) || 0

        if (tokenCount >= limit) {
          reject(new Error("Rate limit exceeded"))
          return
        }

        tokenCache.set(token, tokenCount + 1)

        setTimeout(() => {
          tokenCache.delete(token)
        }, interval)

        resolve()
      }),
  }
}

