import { useQuantityWish } from "./useQuantityWish";
import { useTotalWish } from "./TotalWishQuantity";
import { HiOutlineHeart } from "react-icons/hi";
import { memo } from "react";

function FavBtn({ id, prod = false, prodCtegory, handleDeleteWish }) {
  const { wishQuan, handleAdd, handleDec } = useQuantityWish(id);
  const { totalWish } = useTotalWish();

  const isLiked = wishQuan > 0;

  function handleToggle() {
    if (isLiked) {
      handleDec();
      if (handleDeleteWish) handleDeleteWish(id); // <<< Call handleDeleteWish here when unliking
    } else {
      handleAdd();
    }
  }
  return (
    <div
      className={` favoriteButton  absolute flex align-middle justify-center w-[50px] h-[50px] rounded-[50%] ${
        !prod && !prodCtegory ? " top-[-44px] z-40" : " z-0"
      } right-[-12px] top-[-16px] ${prodCtegory ? "top-[-16px] z-40" : "z-0"}`}
    >
      <button
        aria-label="add-to-Cart"
        onClick={handleToggle}
        className="w-10 h-10  flex align-middle justify-center rounded-[50%] favBtn"
      >
        {/* <i
            className={isLiked ? "bx bxs-heart text-2xl" : "bx bx-heart text-2xl"}
          ></i> */}
        {isLiked ? (
          <HiOutlineHeart className="heart text-2xl  bxs-heart fill-[var(--main-color)]" />
        ) : (
          <HiOutlineHeart className="text-2xl heart bx-heart" />
        )}
        {/* <i class="bx bxs-heart"></i> */}
      </button>
    </div>
  );
}

export default memo(FavBtn);
