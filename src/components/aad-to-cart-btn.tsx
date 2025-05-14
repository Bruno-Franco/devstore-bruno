'use client';

import { useCart } from '@/app/contexts/cart-context';

export default function AddToCartBTN(productId: { productId: string }) {
  const { addToCart } = useCart();

  function handleAddToCart() {
    addToCart(productId.productId);
  }
  return (
    <button
      type="button"
      className="text-white mt-8 flex h-12 items-center justify-center rounded-full bg-emerald-600 font-semibold"
      onClick={handleAddToCart}
    >
      Adicionar ao carrinho
    </button>
  );
}
