import { useQuantity } from "./useQuantity";

export function Quantity({ stockAvailability, id }) {
  const {
    quantity,
    handleAdd,
    handleDec,
    handleChange,
    handleFocus,
    handleBlur,
  } = useQuantity(id);

  return (
    <div className="QuantityInput  self-center w-[187px] relative rounded-[15px] flex items-center justify-center">
      {stockAvailability ? (
        <>
          <div className="expandInput flex justify-center items-center">
            <button
              aria-label="decrease-quantity"
              onClick={handleDec}
              className="dec w-10 h-10 rounded-[15px] absolute left-0  text-[2rem] flex items-center justify-center"
            >
              -
            </button>
            <span>
              <input
                type="number"
                step={1}
                min={1}
                value={quantity}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="w-[100%] font-bold  h-10 rounded-[15px] input outline-none text-center"
              ></input>
            </span>
          </div>
          <button
            aria-label="increase-quantity"
            onClick={handleAdd}
            className="inc absolute right-0 w-10 h-10 rounded-[15px] text-white text-[2rem] flex items-center justify-center"
          >
            +
          </button>
        </>
      ) : (
        <button
          className="Notify text-white w-full rounded-2xl !p-2.5 font-bold text-center"
          aria-label="Notify-Button"
        >
          Notify Me
        </button>
      )}
    </div>
  );
}
