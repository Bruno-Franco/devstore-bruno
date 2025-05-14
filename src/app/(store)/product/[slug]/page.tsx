import { api } from '@/data/api';
import { Products } from '@/data/types/products';
import Image from 'next/image';
import { Metadata } from 'next';
import AddToCartBTN from '@/components/aad-to-cart-btn';

async function getProduct(slug: string): Promise<Products> {
  const response = await api(`/products/${slug}`, {
    next: { revalidate: 60 * 60 },
  });
  const products = response.json();
  return products;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const product = await getProduct((await params).slug);
  return {
    title: product.title,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // const { slug } = await params;

  const product = await getProduct((await params).slug);
  const productId: string = product.id.toString();

  return (
    <div className="relative grid max-h-[650px] grid-cols-3">
      <div className="col-span-2 overflow-hidden">
        <Image
          src={product.image}
          alt="camiseta"
          width={1000}
          height={1000}
          quality={100}
        />
      </div>
      <div className="flex flex-col justify-center px-12">
        <h1 className="text-3xl font-bold leading-tight">{product.title}</h1>
        <p className="mt-2 leading-relaxed text-zinc-400">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas fugit.
        </p>
        <div className="mt-8 flex items-center gap-3">
          <span className="flex items-center justify-center rounded-full bg-violet-500 px-5 py-2.5 font-semibold">
            {product.price.toLocaleString('pt-Br', {
              style: 'currency',
              currency: 'EUR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
          <span className="text-sm text-zinc-400">
            {`Em 12x de 
            ${(product.price / 12).toLocaleString('pt-Br', {
              style: 'currency',
              currency: 'EUR',
            })}`}
          </span>
        </div>
        <div className="mt-8 space-y-4">
          <span className="block font-semibold">Tamanhos</span>
          <div className="flex gap-2">
            <button className="flex h-9 w-14 items-center justify-center rounded-full bg-zinc-800 border border-zinc-700 text-sm font-semibold">
              P
            </button>
            <button className="flex h-9 w-14 items-center justify-center rounded-full bg-zinc-800 border border-zinc-700 text-sm font-semibold">
              M
            </button>
            <button className="flex h-9 w-14 items-center justify-center rounded-full bg-zinc-800 border border-zinc-700 text-sm font-semibold">
              G
            </button>
            <button className="flex h-9 w-14 items-center justify-center rounded-full bg-zinc-800 border border-zinc-700 text-sm font-semibold">
              GG
            </button>
          </div>
        </div>
        <AddToCartBTN productId={productId} />
      </div>
    </div>
  );
}
