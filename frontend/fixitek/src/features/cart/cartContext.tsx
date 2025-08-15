import { getStoredCartId, storeCartId } from "@/lib/helper";
import { createContext, useContext, useEffect, useState } from "react";
import { addToCart, createCart, getCart, removeFromCart } from "./cartApi";

type CartItem = {
  id: number;
  service_name: string;
  quantity: number;
};

type Cart = {
  id: string;
  items: CartItem[];
};

type CartContextType = {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  refreshCart: () => Promise<void>;
  addItem: (item: { service_id: number; quantity: number }) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshCart = async () => {
    setLoading(true);
    setError(null);

    try {
      let cartId = getStoredCartId();
      if (!cartId) {
        const cart = await createCart();
        console.log("Created cart:", cart);
        
        cartId = cart.id;
        storeCartId(cartId);
      }
      const fetchedCart = await getCart(cartId);
      setCart(fetchedCart);
    } catch (e) {
      setError("Failed to load cart.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (item: { service_id: number; quantity: number }) => {
    const cartId = getStoredCartId();
    if (!cartId) return;
    await addToCart(cartId, item);
    await refreshCart();
  };

  const removeItem = async (itemId: number) => {
    const cartId = getStoredCartId();
    if (!cartId) return;
    await removeFromCart(cartId, itemId);
    await refreshCart();
  };

  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <CartContext.Provider
      value={{ cart, loading, error, refreshCart, addItem, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
