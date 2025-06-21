import { useUser } from "@clerk/clerk-react";
import { useQuantity } from "./useQuantity";
import { useCartContext } from "../Cart/CartContext";
import { CgSpinner } from "react-icons/cg";

export function Quantity({
  stockAvailability,
  id,
  atProduct = false,
  comingFromSmallScreenProduct = false,
  comingFromSmScreensCategoryPage = false,
}) {
  const {
    quantity,
    handleAdd,
    handleDec,
    handleChange,
    handleFocus,
    handleBlur,
    isLoading,
  } = useQuantity(id);

  const { cartItems } = useCartContext();
  const { user } = useUser();

  // const newQuantity = user ? cartQuantity : quantity; // Assuming 'example' stores the role
  const cartItem = cartItems.find((item) => item.product_id === id);
  const newQuantity = user ? cartItem?.quantity ?? 0 : quantity;

  // const newQuantity = user ? quantityByProductId[id] || 0 : quantity;
  return (
    <div
      className={`QuantityInput  self-center ${
        comingFromSmallScreenProduct
          ? "w-full"
          : comingFromSmScreensCategoryPage
          ? "w-[135px]"
          : "w-[187px]"
      } relative rounded-[15px] flex items-center justify-center `}
    >
      {stockAvailability ? (
        <>
          <div
            className={`expandInput ${
              comingFromSmallScreenProduct
                ? "w-full"
                : "flex justify-center items-center"
            } `}
          >
            <button
              aria-label="decrease-quantity"
              onClick={() => handleDec(id)}
              className="dec w-10 h-10 rounded-[15px] absolute left-0  text-[2rem] flex items-center justify-center"
            >
              -
            </button>
            <span>
              <input
                type="number"
                step={1}
                min={1}
                value={isLoading ? "" : newQuantity}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="w-[100%] font-bold  h-10 rounded-[15px] input outline-none text-center"
              />
              {isLoading && (
                <CgSpinner className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin text-[blueviolet]" />
              )}
            </span>
          </div>
          <button
            aria-label="increase-quantity"
            onClick={() => handleAdd(id)}
            className={` inc absolute ${
              isLoading ? "bg-[#c9b2ff]" : "bg-[var(--main-color-2)]"
            } right-0 w-10 h-10  rounded-[15px] text-white text-[2rem] flex items-center justify-center`}
            disabled={isLoading}
          >
            +
          </button>

          {/* {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-60 rounded-[15px]">
              <span className="loader" />{" "}
              <span className="sr-only">Loading...</span>
            </div>
          )} */}
        </>
      ) : (
        <button
          className={`Notify text-white  ${
            comingFromSmScreensCategoryPage ? "w-[135px]" : "w-full"
          } rounded-2xl !p-2.5 font-bold text-center`}
          aria-label="Notify-Button"
        >
          {atProduct ? "Add to Cart" : "Notify Me"}
        </button>
      )}
    </div>
  );
}
