// import { useState } from "react";
// import { useLocalStorage } from "./useLocalStorage";
// import { useTotalWish } from "./TotalWishQuantity";

// export function useQuantityWish(productID) {
//   const [wishQuan, setWishQuan] = useLocalStorage(
//     0,
//     `wishQuantity-${productID}`
//   );

//   const { setTotalWish } = useTotalWish();

//   function handleAdd(e) {
//     setWishQuan((wish) => wish + 1);
//     setTotalWish((wish) => wish + 1);
//   }

//   // function handleDec(e) {
//   //   setWishQuan((wish) => wish - 1);
//   //   setTotalWish((wish) => wish - 1);
//   // }

//   function handleDec() {
//     // Only proceed if we have a positive quantity
//     if (wishQuan > 0) {
//       setWishQuan((prevQuantity) => {
//         const newQuantity = Number(prevQuantity) - 1;
//         // Decrease total quantity only if the product quantity becomes 0
//         if (newQuantity === 0) {
//           setTotalWish((prev) => prev - 1);
//         }
//         return newQuantity;
//       });
//     }
//   }
//   return { wishQuan, handleAdd, handleDec };
// }

// export default useQuantityWish;
import { useState } from "react";
import { useTotalWish } from "./TotalWishQuantity";
import { useUser } from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useWishListContext } from "../WishList/WishlistContext";

export function useQuantityWish(productID) {
  const { setTotalWish } = useTotalWish();
  const { countWish, fetchWishList } = useWishListContext();
  const { user } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const { wishListItem } = useWishListContext();

  console.log("user,", user);

  async function handleAdd(e) {
    if (!user) {
      // User not logged in, navigate instead
      navigate("/wishlist");
      return;
    }

    try {
      if (wishListItem) return; // already exists

      const token = await getToken();

      const res = await axios.post(
        "https://nutrigeen.com/api/wishlist",
        {
          user_id: user.id,
          product_id: productID,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await fetchWishList({ userId: user.id }); // <-- must re-fetch latest state

      // If needed, update global wish count (optional)
      setTotalWish((prev) => prev + 1);

      console.log("Product added to wishlist:", res.data);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  }

  async function handleDec() {
    if (countWish > 0) {
      try {
        const token = await getToken();

        const res = await axios.delete(
          `https://nutrigeen.com/api/wishlist/${user.id}/${productID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        await fetchWishList({ userId: user.id }); // <-- must re-fetch latest state

        // If needed, update global wish count (optional)
        setTotalWish((prev) => prev - 1);

        console.log("Product removed from wishlist:", res.data);
      } catch (error) {
        console.error("Error removing from wishlist:", error);
      }
    }
  }

  return { handleAdd, handleDec };
}

export default useQuantityWish;
