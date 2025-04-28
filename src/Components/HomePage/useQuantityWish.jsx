import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useTotalWish } from "./TotalWishQuantity";

export function useQuantityWish(productID) {
  const [wishQuan, setWishQuan] = useLocalStorage(
    0,
    `wishQuantity-${productID}`
  );

  const { setTotalWish } = useTotalWish();

  function handleAdd(e) {
    setWishQuan((wish) => wish + 1);
    setTotalWish((wish) => wish + 1);
  }

  // function handleDec(e) {
  //   setWishQuan((wish) => wish - 1);
  //   setTotalWish((wish) => wish - 1);
  // }

  function handleDec() {
    // Only proceed if we have a positive quantity
    if (wishQuan > 0) {
      setWishQuan((prevQuantity) => {
        const newQuantity = Number(prevQuantity) - 1;
        // Decrease total quantity only if the product quantity becomes 0
        if (newQuantity === 0) {
          setTotalWish((prev) => prev - 1);
        }
        return newQuantity;
      });
    }
  }
  return { wishQuan, handleAdd, handleDec };
}

export default useQuantityWish;
