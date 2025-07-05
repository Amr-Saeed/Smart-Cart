import { useQuantityWish } from "./useQuantityWish";
import { useTotalWish } from "./TotalWishQuantity";
import { HiOutlineHeart } from "react-icons/hi";
import { memo } from "react";
import { useWishListContext } from "../WishList/WishlistContext";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { CgSpinner } from "react-icons/cg";

function FavBtn({
  id,
  prod = false,
  prodCtegory,
  commingFromScanPopUp = false,
  onCardClick, // ✅ Add this
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { wishQuan, handleAdd, handleDec } = useQuantityWish(id);
  const { totalWish } = useTotalWish();
  const { countWish, wishListItems } = useWishListContext();
  const { user } = useUser();

  console.log("wishListItemswishListItems", wishListItems);
  const wishListItem = wishListItems.find((item) => item.product_id === id);
  const newWishQuan = wishListItem ? wishListItem.quantity : 0;

  const isLiked = newWishQuan > 0;
  // const isLiked = wishListItem !== undefined; // if it exists, it’s liked

  console.log("isLiked", isLiked);
  console.log("wishQuan", newWishQuan);

  // function handleToggle() {
  //   if (isLiked) {
  //     handleDec();
  //     // if (handleDeleteWish) handleDeleteWish(id); // <<< Call handleDeleteWish here when unliking
  //   } else {
  //     handleAdd();
  //   }
  // }

  async function handleToggle() {
    setIsLoading(true);
    try {
      if (isLiked) {
        await handleDec();
      } else {
        await handleAdd();
      }
    } catch (err) {
      console.error("Error toggling favorite:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className={` favoriteButton  absolute flex align-middle justify-center w-[50px] h-[50px] rounded-[50%] ${
        !prod && !prodCtegory && !commingFromScanPopUp
          ? " top-[-44px] z-40"
          : " z-0"
      } right-[-12px] top-[-16px] ${prodCtegory ? "top-[-16px] z-40" : "z-0"} ${
        commingFromScanPopUp ? "top-[-14px] z-40" : ""
      }`}
    >
      <button
        aria-label="add-to-Cart"
        onClick={handleToggle}
        className="w-10 h-10  flex align-middle justify-center rounded-[50%] favBtn"
      >
        {/* <i
            className={isLiked ? "bx bxs-heart text-2xl" : "bx bx-heart text-2xl"}
          ></i> */}
        {isLoading ? (
          <CgSpinner className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin text-[blueviolet]" />
        ) : isLiked ? (
          <HiOutlineHeart
            className="heart text-2xl  bxs-heart fill-[var(--main-color)]"
            onClick={onCardClick}
          />
        ) : (
          <HiOutlineHeart
            className="text-2xl heart bx-heart"
            onClick={onCardClick}
          />
        )}
        {/* <i class="bx bxs-heart"></i> */}
      </button>
    </div>
  );
}

export default memo(FavBtn);
