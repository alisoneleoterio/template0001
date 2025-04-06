'use client'

import { useSearchParams } from 'next/navigation'

export default function ContactClient() {
  const params = useSearchParams()
  const name = params.get('name') ?? 'Visitante'

  return <div>Bem-vindo, {name}!</div>
}
