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
import { useCartContext } from "../../Cart/CartContext";
import { useWishListContext } from "../../WishList/WishlistContext";

function IconsGroup({ className, navigate }) {
  const { totalQuantity } = useTotalQuantity();
  const { totalWish } = useTotalWish();
  const { cart, cartItems, count, cartQuantity } = useCartContext();
  const { countWish } = useWishListContext();

  console.log("countWish", countWish);

  console.log("Carsddddssst", cart);

  console.log(totalQuantity);

  console.log("cartQuantitycartQuantitycartQuantity", cartQuantity);

  const location = useLocation();
  const { user } = useUser();
  const isCartPage = location.pathname === "/cart";
  // console.log(totalWish, totalQuantity);

  const isWishListPage = location.pathname === "/wishlist";

  console.log("cartItems", cartItems);

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

  const totalCount = user ? count || 0 : totalQuantity;

  return (
    <div
      className={` ${className} icons  flex justify-end items-center  gap-2.5`}
    >
      <div className="w-[1.3rem] md:w-[1.875rem] cursor-pointer text-[var(--main-color)]">
        {user ? (
          <UserButton />
        ) : (
          <UserIcon
            onClick={() => navigate("/")}
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
        {countWish > 0 && <Value value={countWish} />}
      </div>
      <div className="relative cart text-center">
        <ShoppingCartIcon
          className="bx bx-cart cursor-pointer w-[1.3rem] md:w-[1.875rem] text-[var(--main-color)]"
          onClick={handleClick}
          disabled={isCartPage}
        />
        {totalCount > 0 && <Value value={totalCount} />}
      </div>
    </div>
  );
}
export default memo(IconsGroup);
