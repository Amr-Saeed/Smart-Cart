import { useTotalQuantity } from "../TotalQuantityContext";
import { useTotalWish } from "../TotalWishQuantity";
import { UserIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/outline";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Value from "./Value";

export default function IconsGroup({ className, navigate }) {
  const { totalQuantity } = useTotalQuantity();
  const { totalWish } = useTotalWish();
  // console.log(totalWish, totalQuantity);

  return (
    <div
      className={` ${className} icons  flex justify-end items-center  gap-2.5`}
    >
      <div>
        <UserIcon
          onClick={() => navigate(-1)}
          className="w-[1.3rem] md:w-[1.875rem] cursor-pointer text-[var(--main-color)]"
        />
      </div>

      <div className="relative cart text-center">
        <HeartIcon className="bx bx-heart w-[1.3rem] md:w-[1.875rem] cursor-pointer text-[var(--main-color)]" />
        {totalWish > 0 && <Value value={totalWish} />}
      </div>
      <div className="relative cart text-center">
        <ShoppingCartIcon className="bx bx-cart cursor-pointer w-[1.3rem] md:w-[1.875rem] text-[var(--main-color)]" />
        {totalQuantity > 0 && <Value value={totalQuantity} />}
      </div>
    </div>
  );
}
