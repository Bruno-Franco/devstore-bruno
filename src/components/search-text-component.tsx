'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function Text() {
  const search = useSearchParams();
  const q = search.get('q');
  return (
    <p className="text-sm">
      Resultados para: <span className="font-semibold">{q ?? ''}</span>
    </p>
  );
}

export default function SearchText() {
  return (
    <Suspense>
      <Text />
    </Suspense>
  );
}
