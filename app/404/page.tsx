// Em seu arquivo de página 404 (provavelmente app/not-found.tsx ou similar)
import { Suspense } from 'react';
import ContactClient from '@/components/contact-client';

export default function NotFoundPage() {
  return (
    <main>
      <h1>Página não encontrada</h1>
      <Suspense fallback={<div>Carregando...</div>}>
        <ContactClient />
      </Suspense>
    </main>
  );
}