import React from "react";
import MultiSlider from "./MultiRangeSlider";

export default function PriceList({
  openDropDown,
  minValue,
  maxValue,
  setMinValue,
  setMaxValue,
  isDrawerOpen = false, // add default false
  commingfromDrawer = false, // add default false
}) {
  if (!isDrawerOpen && openDropDown !== undefined && openDropDown !== "price")
    return null;
  return (
    <div
      className={`priceList z-[42] ${
        commingfromDrawer
          ? "w-full"
          : "w-[250px] absolute border-1 border-[blueviolet] "
      }   !p-2.5 bg-white  border-t-0 rounded-br-[8px] rounded-bl-[8px]`}
    >
      {!commingfromDrawer && (
        <div className="absolute top-0 left-[33%] w-[67%] h-[0.5px] bg-[blueviolet]"></div>
      )}

      <div className="sliderr">
        <MultiSlider
          minValue={minValue}
          maxValue={maxValue}
          setMaxValue={setMaxValue}
          setMinValue={setMinValue}
        />
      </div>
      <div className="minmax flex justify-between">
        <div className="min flex flex-col gap-1 w-[48%]">
          <label className="text-[blueviolet] font-extrabold">Min</label>
          <input
            type="text"
            placeholder="0"
            className="w-[100%] text-[blueviolet] outline-0 border-1 border-[blueviolet] rounded-[8px] !p-2.5"
            value={minValue}
            onChange={(e) => setMinValue(+e.target.value)}
          />
        </div>
        <div className="min flex flex-col gap-1 w-[48%]">
          <label className="text-[blueviolet] font-extrabold">Max</label>
          <input
            type="text"
            placeholder="100"
            className="w-[100%] text-[blueviolet] border-1 outline-0 border-[blueviolet] rounded-[8px] !p-2.5"
            value={maxValue}
            onChange={(e) => setMaxValue(+e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
