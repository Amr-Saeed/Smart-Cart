import { useQuantityWish } from "./useQuantityWish";
import { useTotalWish } from "./TotalWishQuantity";
import { HiOutlineHeart } from "react-icons/hi";
import { memo } from "react";

function FavBtn({ id, prod = false }) {
  const { wishQuan, handleAdd, handleDec } = useQuantityWish(id);
  const { totalWish } = useTotalWish();

  const isLiked = wishQuan > 0;

  function handleToggle() {
    // setIsLiked((is) => !is);
    isLiked ? handleDec() : handleAdd();
  }

  return (
    <div
      className={` favoriteButton  absolute flex align-middle justify-center w-[50px] h-[50px] rounded-[50%] ${
        prod ? "top-[-16px] z-0" : "top-[-44px] z-50"
      } right-[-12px]`}
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
