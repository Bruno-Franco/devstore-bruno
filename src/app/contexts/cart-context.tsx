'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

export type CartItem = {
  productId: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (productId: string) => void;
};

const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const addToCart = (productId: string) => {
    setCartItems((state) => {
      const product = state.find((item) => item.productId === productId);
      if (!product) {
        return [...state, { productId, quantity: 1 }];
      } else {
        return state.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
    });
  };
  return (
    <CartContext.Provider value={{ items: cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook proprio para simplificar o useContext
export const useCart = () => useContext(CartContext);
