import { z } from 'zod';
import data from '../data.json';

type Params = Promise<{
  slug: string;
}>;

export async function GET(_: Request, { params }: { params: Params }) {
  const slug = z.string().parse((await params).slug);

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const product = data.products.find((product) => product.slug === slug);

  if (!product) {
    return Response.json({ message: 'Product not Found!' }, { status: 400 });
  }
  return Response.json(product);
}
