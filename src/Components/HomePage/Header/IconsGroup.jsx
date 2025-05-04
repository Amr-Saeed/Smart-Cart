import { useTotalQuantity } from "../TotalQuantityContext";
import { useTotalWish } from "../TotalWishQuantity";
import { UserIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/outline";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Value from "./Value";
import { memo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";

function IconsGroup({ className, navigate }) {
  const { totalQuantity } = useTotalQuantity();
  const { totalWish } = useTotalWish();

  console.log(totalQuantity);

  const location = useLocation();
  const { user } = useUser();
  const isCartPage = location.pathname === "/cart";
  // console.log(totalWish, totalQuantity);

  const isWishListPage = location.pathname === "/wishlist";

  function handleWishlistClick() {
    if (!isWishListPage) {
      navigate("/wishlist");
    }
  }
  function handleClick() {
    if (!isCartPage) {
      navigate("/cart");
    }
  }

  return (
    <div
      className={` ${className} icons  flex justify-end items-center  gap-2.5`}
    >
      <div className="w-[1.3rem] md:w-[1.875rem] cursor-pointer text-[var(--main-color)]">
        {user ? (
          <UserButton />
        ) : (
          <UserIcon
            onClick={() => navigate(-1)}
            className="w-[1.3rem] md:w-[1.875rem] cursor-pointer text-[var(--main-color)]"
          />
        )}
      </div>

      <div className="relative cart text-center">
        <HeartIcon
          className="bx bx-heart w-[1.3rem] md:w-[1.875rem] cursor-pointer text-[var(--main-color)]"
          onClick={handleWishlistClick}
          disabled={isWishListPage}
        />
        {totalWish > 0 && <Value value={totalWish} />}
      </div>
      <div className="relative cart text-center">
        <ShoppingCartIcon
          className="bx bx-cart cursor-pointer w-[1.3rem] md:w-[1.875rem] text-[var(--main-color)]"
          onClick={handleClick}
          disabled={isCartPage}
        />
        {totalQuantity > 0 && <Value value={totalQuantity} />}
      </div>
    </div>
  );
}
export default memo(IconsGroup);
