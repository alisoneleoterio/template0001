'use client'

import { useSearchParams } from 'next/navigation'

export default function NotFoundClient() {
  const params = useSearchParams()
  const search = params?.get('query') || 'nada encontrado'

  return (
    <div className="mt-4 text-sm text-gray-500">
      Você buscou por: <strong>{search}</strong>
    </div>
  )
}
