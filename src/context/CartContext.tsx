"use client";

import axios from "axios";
import { createContext, ReactNode, useContext, useEffect, useState, useCallback } from "react";
import { useAuth } from "./AuthContext";
import { getApiUrl, getApiHeaders, API_CONFIG } from "../lib/api-config";

// Define TypeScript interfaces
interface ProductImage {
  url: string;
  alt?: string;
  isPrimary?: boolean;
}

interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
  discountPrice?: number;
  images?: ProductImage[];
  thumbnail?: string;
}

interface CartProduct {
  id: number;
  product: Product;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface Cart {
  items: CartProduct[];
  totalItems: number;
  totalPrice: number;
}

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  refetch: () => Promise<void>;
  updateCartItem: (
    cartItemId: number,
    quantity: number
  ) => Promise<void>;
  deleteCartItem: (cartItemId: number) => Promise<void>;
  addCartItem: (
    productId: number,
    quantity: number
  ) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Context Provider Component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { userSession } = useAuth();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = useCallback(async () => {
    if (!userSession?.userId || !userSession?.accessToken) {
      setCart(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const companyId = userSession.companyId || API_CONFIG.companyId;
      const response = await axios.get(
        getApiUrl(`/cartproducts/user/${userSession.userId}?companyId=${companyId}`),
        {
          headers: getApiHeaders(userSession.accessToken),
        }
      );

      const items: CartProduct[] = response.data.data || [];
      const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = items.reduce((sum, item) => sum + item.totalPrice, 0);

      setCart({
        items,
        totalItems,
        totalPrice,
      });
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCart(null);
    } finally {
      setLoading(false);
    }
  }, [userSession?.userId, userSession?.accessToken, userSession?.companyId]);

  useEffect(() => {
    fetchCart();
  }, [userSession?.userId, userSession?.accessToken, fetchCart]);

  // Function to update cart item quantity
  const updateCartItem = async (
    cartItemId: number,
    quantity: number
  ): Promise<void> => {
    try {
      if (quantity <= 0) {
        await deleteCartItem(cartItemId);
        return;
      }
      const companyId = userSession?.companyId || API_CONFIG.companyId;
      await axios.patch(
        getApiUrl(`/cartproducts/${cartItemId}?companyId=${companyId}`),
        { quantity },
        { headers: getApiHeaders(userSession?.accessToken) },
      );

      await fetchCart();
    } catch (error) {
      console.error("Error updating cart item:", error);
      throw error;
    }
  };

  // Function to remove a cart item
  const deleteCartItem = async (cartItemId: number): Promise<void> => {
    try {
      const companyId = userSession?.companyId || API_CONFIG.companyId;
      await axios.delete(
        getApiUrl(`/cartproducts/${cartItemId}?companyId=${companyId}`),
        {
          headers: getApiHeaders(userSession?.accessToken),
        }
      );

      await fetchCart();
    } catch (error) {
      console.error("Error deleting cart item:", error);
      throw error;
    }
  };

  // function to add cart item
  const addCartItem = async (
    productId: number,
    quantity: number
  ): Promise<void> => {
    if (!userSession?.accessToken || !userSession?.userId) {
      console.error("User not authenticated");
      throw new Error("User must be logged in to add items to cart");
    }

    try {
      const companyId = userSession.companyId || API_CONFIG.companyId;
      await axios.post(
        getApiUrl(`/cartproducts?companyId=${companyId}`),
        {
          userId: Number(userSession.userId),
          productId: Number(productId),
          quantity: Number(quantity),
          companyId,
        },
        {
          headers: getApiHeaders(userSession.accessToken),
        }
      );

      await fetchCart();
    } catch (error) {
      const err = error as { response?: { data?: { message?: string; error?: string } | string[] }; message?: string };
      const responseData = err?.response?.data;
      const apiMessage =
        (responseData && typeof responseData === 'object' && !Array.isArray(responseData) && 'message' in responseData) 
          ? responseData.message 
          : (responseData && typeof responseData === 'object' && !Array.isArray(responseData) && 'error' in responseData)
          ? responseData.error
          : Array.isArray(responseData) 
          ? responseData.join(", ") 
          : undefined;
      const finalMessage = apiMessage || err?.message || "Error adding cart item";
      console.error("Error adding cart item:", finalMessage, err);
      throw new Error(finalMessage);
    }
  };

  // function to clear cart
  const clearCart = async (): Promise<void> => {
    if (!userSession?.accessToken || !userSession?.userId) {
      console.error("User not authenticated");
      return;
    }

    try {
      const companyId = userSession.companyId || API_CONFIG.companyId;
      await axios.delete(
        getApiUrl(`/cartproducts/user/${userSession.userId}?companyId=${companyId}`),
        {
          headers: getApiHeaders(userSession.accessToken),
        }
      );

      await fetchCart();
    } catch (error) {
      console.error("Error clearing cart:", error);
      throw error;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        refetch: fetchCart,
        updateCartItem,
        deleteCartItem,
        addCartItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook for using Cart Context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
