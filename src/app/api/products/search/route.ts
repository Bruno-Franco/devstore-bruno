import data from '../data.json';
import { z } from 'zod';
import type { NextRequest } from 'next/server';

export function GET(resquest: NextRequest) {
  const { searchParams } = resquest.nextUrl;

  const query = z.string().parse(searchParams.get('q'));

  const products = data.products.filter((product) => {
    return product.title
      .toLocaleLowerCase()
      .includes(query.toLocaleLowerCase());
  });
  return Response.json(products);
}
