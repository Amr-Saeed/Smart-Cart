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

  function handleDec(e) {
    setWishQuan((wish) => wish - 1);
    setTotalWish((wish) => wish - 1);
  }
  return { wishQuan, handleAdd, handleDec };
}

export default useQuantityWish;
