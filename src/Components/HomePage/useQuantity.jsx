import { useState } from "react";
import { useTotalQuantity } from "./TotalQuantityContext";
import { useLocalStorage } from "./useLocalStorage";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { useToken } from "../TokenContext";
export function useQuantity(productID) {
  //   const [quantity, setQuantity] = useState(0);
  const [quantity, setQuantity] = useLocalStorage(0, `quantity-${productID}`);
  const [isFirstChange, setIsFirstChange] = useState(true);

  const { setTotalQuantity, totalQuantity } = useTotalQuantity();

  const { user } = useUser();
  const { getToken } = useAuth(); // use getToken from Clerk

  // async function handleAdd(e) {
  //   const newQuantity = quantity === "" ? 1 : Number(quantity) + 1;
  //   const currentQuantity = quantity;

  //   if (user) {
  //     try {
  //       const { token } = await getToken();
  //       const res = await axios.post(
  //         "https://nutrigeen.com/api/cart",
  //         {
  //           user_id: user.id,
  //           product_id: productID,
  //           quantity: newQuantity,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`, // Use user.token if available
  //           },
  //         }
  //       );
  //       console.log("Product added to cart:", res.data);
  //     } catch (error) {
  //       console.error("Error adding product to cart:", error);
  //     }
  //   } else {
  //     // Not authenticated: Save to localStorage
  //     setQuantity((prevQuantity) => {
  //       const newQuantity = prevQuantity === "" ? 1 : Number(prevQuantity) + 1;
  //       return newQuantity;
  //     });

  //     if (isFirstChange && currentQuantity === 0) {
  //       setTotalQuantity((prev) => prev + 1);
  //       setIsFirstChange(false);
  //     }
  //   }
  // }

  function handleAdd(e) {
    // Save the current quantity value before updating
    const currentQuantity = quantity;

    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity === "" ? 1 : Number(prevQuantity) + 1;
      return newQuantity;
    });

    // Update total separately using the current known values, not in a nested callback
    // Update total quantity only if it's the first change (new product)
    if (isFirstChange && currentQuantity === 0) {
      setTotalQuantity((prev) => prev + 1);
      setIsFirstChange(false); // Mark that this product has been added at least once
    }
  }

  // function handleDec() {
  //   // Only proceed if we have a positive quantity
  //   if (quantity > 0) {
  //     setQuantity(Number(quantity) - 1);
  //     setTotalQuantity((prev) => prev - 1);
  //     // Decrease total quantity only if the product quantity becomes 0
  //     if (quantity === 1) {
  //       setTotalQuantity((prev) => prev - 1);
  //       setIsFirstChange(true); // Reset isFirstChange since the product is removed
  //     }
  //   }
  // }

  function handleDec() {
    // Only proceed if we have a positive quantity
    if (quantity > 0) {
      setQuantity((prevQuantity) => {
        const newQuantity = Number(prevQuantity) - 1;
        // Decrease total quantity only if the product quantity becomes 0
        if (newQuantity === 0) {
          setTotalQuantity((prev) => prev - 1);
          setIsFirstChange(true); // Reset isFirstChange since the product is removed
        }
        return newQuantity;
      });
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
