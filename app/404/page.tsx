import dynamic from 'next/dynamic'

export const dynamicSetting = 'force-dynamic' // evita problemas no build

const NotFoundClient = dynamic(() => import('./notfoundclient'), {
  ssr: false,
  loading: () => null, // evita suspense
})

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 text-center">
      <h1 className="text-4xl font-bold">Página não encontrada</h1>
      <p className="text-lg mt-2">A página que você procura não existe.</p>
      <NotFoundClient />
    </div>
  )
}
