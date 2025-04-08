'use client'

import { useSearchParams } from 'next/navigation'

export default function NotFoundPage() {
  const params = useSearchParams()
  const search = params.get('query') || 'nada encontrado'

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 text-center">
      <h1 className="text-4xl font-bold">Página não encontrada</h1>
      <p className="text-lg mt-2">A página que você procura não existe.</p>
      <div className="mt-4 text-sm text-gray-500">
        Você buscou por: <strong>{search}</strong>
      </div>
    </div>
  )
}
