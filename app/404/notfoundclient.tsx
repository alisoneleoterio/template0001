'use client'

import { useSearchParams } from 'next/navigation'

export default function NotFoundClient() {
  const searchParams = useSearchParams()
  const from = searchParams.get('from') ?? 'desconhecido'

  return (
    <p className="text-sm text-gray-500">Origem: {from}</p>
  )
}
