import "./styles.css";
import { useProducts } from "../useProducts";
import { useState } from "react";
import { useQuantity } from "./useQuantity";
export default function ProductCard({
  productImg,
  name,
  stockAvailability,
  children,
  id,
}) {
  // const [quantity, setQuantity] = useState(0);

  // function handleAdd(e) {
  //   // e.preventDefault();
  //   // setQuantity((quantity) => quantity + 1);
  //   setQuantity((quantity) => (quantity === "" ? 1 : Number(quantity) + 1));
  // }
  // function handleDec(e) {
  //   // e.preventDefault();
  //   setQuantity((quantity) => (quantity > 1 ? quantity - 1 : 0));
  //   // setQuantity((quantity) => (quantity > 1 ? Number(quantity) - 1 : ""));
  // }

  // function handleChange(e) {
  //   const value = e.target.value;

  //   // If the input is cleared (empty string), set quantity to empty string
  //   if (value === "") {
  //     setQuantity("");
  //   } else {
  //     // Otherwise, parse the value as a number
  //     const numValue = Number(value);
  //     if (!isNaN(numValue) && numValue >= 0) {
  //       setQuantity(numValue);
  //     }
  //   }
  // }

  // const { quantity, handleAdd, handleDec, handleChange } = useQuantity(id);
  // console.log(id);

  return (
    <>
      <div className="card h-[399px]">
        <figure className="relative flex items-center justify-center">
          {stockAvailability === false && <OutOfStock />}
          <img loading="lazy" src={productImg} alt={name} />
        </figure>
        <div className="card-content flex flex-col justify-between items-start">
          {children}
        </div>
        <CardActions>
          <Quantity id={id} stockAvailability={stockAvailability} />
        </CardActions>
      </div>
    </>
  );
}
function OutOfStock() {
  return (
    <div className="outOfStock flex items-center justify-center absolute bg-amber-300 !pt-[0.4rem] !pb-[0.4rem] !pr-[0.7rem] !pl-[0.7rem] w-36 rounded-2xl  ">
      <span className="font-bold text-[1rem]">OUT OF STOCK</span>
    </div>
  );
}
function CardActions({ children }) {
  return (
    <div className="card-actions flex items-center !p-2 h-10">{children}</div>
  );
}

function Quantity({ stockAvailability, id }) {
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
            onClick={handleAdd}
            className="inc absolute right-0 w-10 h-10 rounded-[15px] text-white text-[2rem] flex items-center justify-center"
          >
            +
          </button>
        </>
      ) : (
        <button className="Notify text-white w-full rounded-2xl !p-2.5 font-bold text-center">
          Notify Me
        </button>
      )}
    </div>
  );
}
