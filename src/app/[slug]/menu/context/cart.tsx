"use client";

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

export interface CartProduct
  extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
  quantity: number;
}

export interface ICartContext {
  isOpen: boolean;
  products: CartProduct[];
  toggleCart: () => void;
  total: number;
  addProduct: (product: CartProduct) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  removeProduct: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  // Valores padrões do contexto
  isOpen: false,
  products: [],
  toggleCart: () => {},
  addProduct: () => {},
  total: 0,
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProduct: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleCart = () => {
    setIsOpen((prev) => !prev);
  };

  const total = products.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  const addProduct = (product: CartProduct) => {
    //verificar se o produto já está no carrinho
    //se estiver, aumente a sua quantidade
    //se não adicione
    const productAlreadyOnTheCart = products.some(
      (prevProduct) => prevProduct.id === product.id,
    );
    if (!productAlreadyOnTheCart) {
      return setProducts((prev) => [...prev, product]);
    }
    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (prevProduct.id === product.id) {
          return {
            ...prevProduct,
            quantity: prevProduct.quantity + product.quantity,
          };
        }
        return prevProduct;
      });
    });
  };
  const decreaseProductQuantity = (productId: string) => {
    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (prevProduct.id !== productId) {
          return prevProduct;
        }

        if (prevProduct.quantity === 1) {
          return prevProduct;
        }
        return { ...prevProduct, quantity: prevProduct.quantity - 1 };
      });
    });
  };

  const increaseProductQuantity = (productId: string) => {
    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (prevProduct.id !== productId) {
          return prevProduct;
        }
        return { ...prevProduct, quantity: prevProduct.quantity + 1 };
      });
    });
  };

  const removeProduct = (productId: string) => {
    setProducts((prevProducts) =>
      prevProducts.filter((prevProduct) => prevProduct.id !== productId),
    );
  };
  return (
    <CartContext.Provider
      value={{
        isOpen,
        products,
        toggleCart,
        total,
        addProduct,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
