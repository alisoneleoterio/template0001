// app/404/page.tsx
export default function NotFoundPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-red-600">Página não encontrada</h1>
      <p className="mt-2 text-gray-600">A URL acessada não corresponde a nenhuma página do site.</p>
    </div>
  )
}
