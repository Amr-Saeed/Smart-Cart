import { useState } from "react";
import { useTotalQuantity } from "./TotalQuantityContext";
import { useLocalStorage } from "./useLocalStorage";
export function useQuantity(productID) {
  //   const [quantity, setQuantity] = useState(0);
  const [quantity, setQuantity] = useLocalStorage(0, `quantity-${productID}`);

  const { setTotalQuantity, totalQuantity } = useTotalQuantity();

  function handleAdd(e) {
    // Save the current quantity value before updating
    const currentQuantity = quantity;

    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity === "" ? 1 : Number(prevQuantity) + 1;
      return newQuantity;
    });

    // Update total separately using the current known values, not in a nested callback
    setTotalQuantity((prev) => prev + 1);
  }

  function handleDec() {
    // Only proceed if we have a positive quantity
    if (quantity > 0) {
      setQuantity(Number(quantity) - 1);
      setTotalQuantity((prev) => prev - 1);
    }
  }
  function handleFocus(e) {
    e.preventDefault();
    if (quantity === 0) setQuantity("");
  }

  function handleBlur(e) {
    if (quantity === "") setQuantity(0);
  }

  function handleChange(e) {
    const value = e.target.value;

    // If the input is cleared (empty string), set quantity to empty string
    if (value === "") {
      setTotalQuantity((totalQuantity) => totalQuantity - quantity);
      setQuantity("");
    } else {
      // Otherwise, parse the value as a number
      const numValue = Number(value);
      if (!isNaN(numValue) && numValue >= 0) {
        setTotalQuantity((total) => total - quantity + numValue);
        setQuantity(numValue);
      }
    }
  }

  return {
    quantity,
    handleAdd,
    handleDec,
    handleChange,
    handleFocus,
    handleBlur,
  };
}
