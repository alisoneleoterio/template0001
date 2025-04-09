"use client"

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

// Componente interno que usa useSearchParams
function ContactClientContent() {
  const params = useSearchParams();
  const name = params.get('name') ?? 'Visitante';
  
  return <div>Bem-vindo, {name}!</div>;
}

// Componente wrapper que já inclui o Suspense
export default function ContactClient() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ContactClientContent />
    </Suspense>
  );
}