'use client'

import { useSearchParams } from 'next/navigation'

export default function NotFoundClient() {
  const params = useSearchParams()
  const from = params.get('from') ?? 'desconhecido'

  return (
    <div>
      <h2>Página não encontrada</h2>
      <p>Origem: {from}</p>
    </div>
  )
}
