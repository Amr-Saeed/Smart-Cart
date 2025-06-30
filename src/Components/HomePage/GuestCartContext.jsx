// GuestCartContext.js
import { createContext, useContext, useState, useEffect } from "react";

const GuestCartContext = createContext();

export function GuestCartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const data = Object.entries(localStorage)
      .filter(([key]) => key.startsWith("quantity-"))
      .map(([key, value]) => ({
        productId: key.split("-")[1],
        quantity: Number(value),
      }));
    setCartItems(data);
  }, []);

  const addToCart = (productId) => {
    const key = `quantity-${productId}`;
    const prev = Number(localStorage.getItem(key)) || 0;
    localStorage.setItem(key, prev + 1);
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.productId === productId);
      if (existing) {
        return prevItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { productId, quantity: 1 }];
      }
    });
  };

  const guestTotalCount = cartItems.filter((item) => item.quantity > 0).length;

  return (
    <GuestCartContext.Provider
      value={{ cartItems, addToCart, guestTotalCount }}
    >
      {children}
    </GuestCartContext.Provider>
  );
}

export function useGuestCart() {
  return useContext(GuestCartContext);
}
