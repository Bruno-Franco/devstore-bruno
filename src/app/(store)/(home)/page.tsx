import { api } from '@/data/api';
import Image from 'next/image';
import Link from 'next/link';
import { Products } from '@/data/types/products';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
};

async function getFeaturedProducts(): Promise<Products[]> {
  const response = await api('/products/featured', {
    // next: { revalidate: 60 * 60 },
  });
  const data = await response.json();

  return data;
}

export default async function Home() {
  const [highlightedProduct, ...otherProducts] = await getFeaturedProducts();

  return (
    <div className="grid max-h-[650px] grid-cols-9 grid-rows-6 gap-6">
      <Link
        href={`/product/${highlightedProduct.slug}`}
        className="group relative col-span-6 row-span-6 bg-zinc-900 overflow-hidden flex justify-center items-end"
      >
        <Image
          src={highlightedProduct.image}
          className="group-hover:scale-105 transition-transform duration-500"
          width={860}
          height={860}
          quality={100}
          alt={highlightedProduct.title}
        />
        <div className="absolute bottom-28 right-28 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
          <span className="text-sm truncate">{highlightedProduct.title}</span>
          <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
            {highlightedProduct.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'EUR',
              minimumFractionDigits: 0,
            })}
          </span>
        </div>
      </Link>
      {otherProducts.map((product) => {
        return (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="group relative col-span-3 row-span-3 bg-zinc-900 overflow-hidden flex justify-center items-end"
          >
            <Image
              src={product.image}
              className="group-hover:scale-105 transition-transform duration-500"
              width={860}
              height={860}
              quality={100}
              alt={product.title}
            />
            <div className="absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
              <span className="text-sm truncate">{product.title}</span>
              <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
                {product.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'EUR',
                  minimumFractionDigits: 0,
                })}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
