import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useUser();

  async function fetchCart({ userId }) {
    try {
      setIsLoading(true);
      const res = await fetch(
        `https://nutrigeen.com/api/cart/${userId}` //https://nutrigeen.com/api/Cart  //https://smartcart.tryasp.net/api/TodoItems/showAll
      );
      const data = await res.json();
      setCart(data);
    } catch {
      console.log("Error fetching Cart");
    } finally {
      setIsLoading(false);
      // hasFetched.current = true; // Mark fetch as complete
    }
  }

  useEffect(() => {
    fetchCart({ userId: user?.id });
  }, [user]); // Only run on mount

  // console.log("Cart fetched successdffdfdfdfdfdffully:", cart);

  const cartItems = cart.cart || [];
  const count = cart.count;
  // const cartQuantity = cartItems?.[0]?.quantity || 0; // Assuming cartItems is an array and you want the quantity of the first item

  const quantityByProductId = useMemo(() => {
    const map = {};
    cartItems.forEach((item) => {
      map[item.product_id] = item.quantity;
    });
    return map;
  }, [cartItems]);

  const contextValue = useMemo(
    () => ({
      cart,
      setCart,
      cartItems,
      count,
      fetchCart,
      // quantityByProductId,
    }),
    [cart]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

function useCartContext() {
  const context = useContext(CartContext);
  if (context === undefined)
    throw new Error("CartContext was used outside of CartProvider");
  return context;
}

export { CartProvider, useCartContext };
