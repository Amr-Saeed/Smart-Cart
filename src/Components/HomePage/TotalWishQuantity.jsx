import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

const WishContext = createContext();

function WishProvider({ children }) {
  // const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalWish, setTotalWish] = useLocalStorage(0, "totalWish");

  return (
    <WishContext.Provider value={{ totalWish, setTotalWish }}>
      {children}
    </WishContext.Provider>
  );
}

function useTotalWish() {
  const context = useContext(WishContext);
  if (context === undefined)
    throw new Error("WishContext was used outside of WishProvider");
  return context;
}

export { WishProvider, useTotalWish };
