"use client"

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ContactClientInner() {
  const params = useSearchParams();
  const name = params.get('name') ?? 'Visitante';
  
  return <div>Bem-vindo, {name}!</div>;
}

export default function ContactClient() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ContactClientInner />
    </Suspense>
  );
}