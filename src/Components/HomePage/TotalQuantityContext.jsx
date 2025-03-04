import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

const QuantityContext = createContext();

function QunatityProvider({ children }) {
  // const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalQuantity, setTotalQuantity] = useLocalStorage(0, "totalQuantity");

  return (
    <QuantityContext.Provider value={{ totalQuantity, setTotalQuantity }}>
      {children}
    </QuantityContext.Provider>
  );
}

function useTotalQuantity() {
  const context = useContext(QuantityContext);
  if (context === undefined)
    throw new Error("QuantityContext was used outside of QuantityProvider");
  return context;
}

export { QunatityProvider, useTotalQuantity };
