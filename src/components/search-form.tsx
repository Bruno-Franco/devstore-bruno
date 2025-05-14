'use client';

import { Search } from 'lucide-react';
import { FormEvent, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function SearchFormArea() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    const formData = new FormData(form);
    const objForm = Object.fromEntries(formData);
    if (!objForm.q) {
      return null;
    }
    router.push(`/search?q=${objForm.q}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-[320px] items-center gap-3 rounded-full bg-zinc-900 px-5 py-3 ring-zinc-700"
    >
      <Search className="w-5 h-5 text-zinc-500" />
      <input
        name="q"
        defaultValue={query ?? ''}
        placeholder="Buscar produtos..."
        className="bg-transparent flex-1 text-sm outline-none placeholder:text-zinc-500"
        required
      />
    </form>
  );
}
export default function SearchForm() {
  return (
    <Suspense fallback={null}>
      <SearchFormArea />
    </Suspense>
  );
}
