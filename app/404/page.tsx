import { Suspense } from 'react'
import NotFoundClient from './notfoundclient'

export const dynamic = 'force-dynamic'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 text-center">
      <h1 className="text-4xl font-bold">Página não encontrada</h1>
      <p className="text-lg mt-2">A página que você procura não existe.</p>

      <Suspense fallback={<p className="mt-4 text-sm text-gray-400">Carregando…</p>}>
        <NotFoundClient />
      </Suspense>
    </div>
  )
}
