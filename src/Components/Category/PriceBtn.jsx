import { IoIosArrowDown } from "react-icons/io";

export function PriceBtn({ openDropDown, handleDropDown }) {
  return (
    <button
      className={`flex lg:h-auto h-[70.6px] items-center justify-center gap-1.5 border-1 border-[blueviolet] !p-2.5 rounded-[8px] text-[var(--main-color)] ${
        openDropDown === "price" ? "bg-white" : ""
      } font-semibold`}
      onClick={() => handleDropDown("price")}
    >
      <span>Price</span>
      <span
        className={`transition-transform ${
          openDropDown === "price" ? "rotate-180" : ""
        }`}
      >
        <IoIosArrowDown />
      </span>
    </button>
  );
}
