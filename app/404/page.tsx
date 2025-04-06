import { Suspense } from 'react'
import NotFoundClient from './notfoundclient'

export default function NotFound() {
  return (
    <div>
      <h1>404</h1>
      <Suspense fallback={<div>Carregando...</div>}>
        <NotFoundClient />
      </Suspense>
    </div>
  )
}
