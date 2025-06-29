import { useState, useEffect } from "react";
import { useTotalQuantity } from "./TotalQuantityContext";
import { useLocalStorage } from "./useLocalStorage";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { useToken } from "../TokenContext";
import { useCartContext } from "../Cart/CartContext";
import { debounce } from "../../utils/debounce";
import { set } from "react-hook-form";
export function useQuantity(productID) {
  //   const [quantity, setQuantity] = useState(0);
  const [quantity, setQuantity] = useLocalStorage(0, `quantity-${productID}`);
  const [isFirstChange, setIsFirstChange] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { setTotalQuantity, totalQuantity } = useTotalQuantity();
  const { user } = useUser();
  const { getToken } = useAuth(); // use getToken from Clerk
  const { fetchCart, setCart, cartItems } = useCartContext();
  const cartItem = cartItems.find((item) => item.product_id === productID);
  const newQuantity = user ? cartItem?.quantity ?? 0 : quantity;
  const [inputValue, setInputValue] = useState(newQuantity);

  // Sync this state with the quantity in the api whenever it changes
  useEffect(() => {
    setInputValue(newQuantity);
  }, [newQuantity]);

  async function handleAdd(e) {
    const newQuantity = quantity === "" ? 1 : Number(quantity) + 1;
    const currentQuantity = quantity;

    if (user) {
      try {
        setIsLoading(true);
        const { token } = await getToken();
        const res = await axios.post(
          "https://nutrigeen.com/api/cart",
          {
            user_id: user.id,
            product_id: productID,
            quantity: newQuantity,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Use user.token if available
            },
          }
        );
        // console.log("Product added to cart:", res.data.product.quantity);

        await fetchCart({ userId: user.id }); // Fetch the updated cart after adding the product

        //another methid to update the quantity in the input field after pressing + but this only work if the post api returns the quantity to u
        // setCart((prev) => ({
        //   ...prev,
        //   cart: prev.cart.map((item) =>
        //     item.product_id === productID
        //       ? { ...item, quantity: res.data.product.quantity }
        //       : item
        //   ),
        // }));
      } catch (error) {
        console.error("Error adding product to cart:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Not authenticated: Save to localStorage
      setQuantity((prevQuantity) => {
        const newQuantity = prevQuantity === "" ? 1 : Number(prevQuantity) + 1;
        return newQuantity;
      });

      if (isFirstChange && currentQuantity === 0) {
        setTotalQuantity((prev) => prev + 1);
        setIsFirstChange(false);
      }
    }
  }

  async function handleDec(productID) {
    console.log("handleDec called with productID:", newQuantity);

    if (newQuantity > 1) {
      const decQuantity = Number(newQuantity) - 1; //this for the api
      const currentQuantity = Number(quantity) - 1; //this for the local storage
      // const currentQuantity = quantity;

      // ---------------------------------------------
      // another approach to get the current quantity but for both api and local storage at the same time
      // const currentQuantity = user
      //   ? cartItem?.quantity ?? 0 // API quantity
      //   : Number(quantity);
      // const updatedQuantity = currentQuantity - 1;
      // ---------------------------------------------

      if (user) {
        try {
          setIsLoading(true);
          const token = await getToken();

          const res = await axios.put(
            `https://nutrigeen.com/api/cart/${user.id}/${productID}`,
            {
              quantity: decQuantity,
            },

            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          await fetchCart({ userId: user.id }); // Refresh the cart after update
        } catch (error) {
          console.error("Error updating product quantity in cart:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        // Not authenticated: update localStorage
        setQuantity(currentQuantity);

        // If product quantity becomes 0, update totalQuantity
        if (currentQuantity === 0) {
          setTotalQuantity((prev) => prev - 1);
          setIsFirstChange(true);
        }
      }
    } else if (newQuantity === 1) {
      // If quantity is 1 and user clicks to decrease, remove the product
      if (user) {
        try {
          setIsLoading(true);
          const token = await getToken();

          await axios.delete(
            `https://nutrigeen.com/api/cart/${user.id}/${productID}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          await fetchCart({ userId: user.id }); // Refresh the cart after deletion
        } catch (error) {
          console.error("Error removing product from cart:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        // Not authenticated: update localStorage
        setQuantity(0);
        setTotalQuantity((prev) => prev - 1);
        setIsFirstChange(true);
      }
    }
  }

  function handleFocus(e) {
    e.preventDefault();
    if (quantity === 0) setQuantity("");
    if (+inputValue === 0) setInputValue("");
  }

  // function handleBlur(e) {
  //   if (quantity === "") setQuantity(0);
  // }

  async function handleBlur(e) {
    const value = e.target.value;
    const numValue = Number(value);

    // If empty input, reset to 0
    if (value === "") {
      setInputValue(0);
      setQuantity(0); // still update localStorage
      return;
    }

    if (!isNaN(numValue) && numValue >= 0) {
      setQuantity(numValue); // update localStorage
      setInputValue(numValue); // update visible input
      if (user && numValue === newQuantity) return;

      if (user) {
        try {
          setIsLoading(true);
          const token = await getToken();

          if (numValue === 0) {
            await axios.delete(
              `https://nutrigeen.com/api/cart/${user.id}/${productID}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          } else {
            await axios.put(
              `https://nutrigeen.com/api/cart/${user.id}/${productID}`,
              {
                quantity: numValue,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          }

          await fetchCart({ userId: user.id });
        } catch (error) {
          console.error("Error syncing on blur:", error);
        } finally {
          setIsLoading(false);
        }
      }
    } else {
      setInputValue(numValue); // revert input if invalid
    }
  }

  // use this function to handle input changes if the user is not logged in because there is no api calls here
  function handleChange(e) {
    const value = e.target.value;

    // If the input is cleared (empty string), set quantity to empty string
    if (value === "") {
      setTotalQuantity((totalQuantity) => totalQuantity - quantity);
      setQuantity("");
      setInputValue("");
    } else {
      // Otherwise, parse the value as a number
      const numValue = Number(value);
      if (!isNaN(numValue) && numValue >= 0) {
        setTotalQuantity((total) => total - quantity + numValue);
        setQuantity(numValue);
        setInputValue(numValue);
      }
    }
  }
  function handleEnter(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleBlur(e); // Explicit enter means real intent
      e.target.blur(); // Remove focus manually
    }
  }
  return {
    quantity,
    handleAdd,
    handleDec,
    handleChange,
    handleFocus,
    handleBlur,
    isLoading,
    inputValue,
    handleEnter,
  };
}

// function handleAdd(e) {
//   // Save the current quantity value before updating
//   const currentQuantity = quantity;

//   setQuantity((prevQuantity) => {
//     const newQuantity = prevQuantity === "" ? 1 : Number(prevQuantity) + 1;
//     return newQuantity;
//   });

//   // Update total separately using the current known values, not in a nested callback
//   // Update total quantity only if it's the first change (new product)
//   if (isFirstChange && currentQuantity === 0) {
//     setTotalQuantity((prev) => prev + 1);
//     setIsFirstChange(false); // Mark that this product has been added at least once
//   }
// }

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

// function handleDec() {
//   // Only proceed if we have a positive quantity
//   if (quantity > 0) {
//     setQuantity((prevQuantity) => {
//       const newQuantity = Number(prevQuantity) - 1;
//       // Decrease total quantity only if the product quantity becomes 0
//       if (newQuantity === 0) {
//         setTotalQuantity((prev) => prev - 1);
//         setIsFirstChange(true); // Reset isFirstChange since the product is removed
//       }
//       return newQuantity;
//     });
//   }
// }
