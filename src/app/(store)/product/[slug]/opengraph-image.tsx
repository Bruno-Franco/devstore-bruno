import { ImageResponse } from 'next/og';
import { api } from '@/data/api';
import { Products } from '@/data/types/products';
import { env } from '../../../../../env';

type Params = Promise<{ slug: string }>;

async function getProduct(slug: string): Promise<Products> {
  const response = await api(`/products/${slug}`);
  const product = await response.json();

  return product;
}

export const alt = 'About Acme';

// export const alt =
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function OgImage({ params }: { params: Params }) {
  const product = await getProduct((await params).slug);
  const productURL = new URL(product.image, env.APP_URL).toString();

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <img
          src={productURL}
          alt=""
          style={{ width: '100%' }}
        />
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
    }
  );
}
