"use client";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "../ui/drawer";
import { GoArrowLeft } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PriceList from "./PriceList";

export default function BottomDrawerFilters({
  open,
  onClose,
  hasDeal,
  stores,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  dispatch,
  filterOptions,
}) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (name) => {
    setExpanded((prev) => (prev === name ? null : name));
  };
  return (
    <Drawer
      open={open}
      position="bottom"
      className="lg:hidden block !h-[100vh] max-h-[100vh]"
      style={{ backgroundColor: "#ffe6e6" }}
    >
      <DrawerContent>
        <DrawerTitle>Filter Mode</DrawerTitle>
        <DrawerDescription>
          This is the filter drawer content.
        </DrawerDescription>
        <div className="w-full h-[85%] relative">
          <div className="flex items-center justify-between !pl-5 !pr-5 w-full !mt-[50px] font-bold text-[blueviolet]">
            <button onClick={onClose} className="cursor-pointer text-[25px]">
              <GoArrowLeft />
            </button>
            <h2>Filter By</h2>
            <button
              onClick={() => dispatch({ type: "RESET" })}
              className="cursor-pointer"
            >
              Reset
            </button>
          </div>
          {/* Mapped Filters */}
          <div className="w-full h-[415px] overflow-y-auto overflow-x-hidden">
            <EachFilter
              title="Has Deal"
              name="deal"
              expanded={expanded === "deal"}
              onToggle={toggleExpand}
            >
              <div className="!mt-4">
                {filterOptions.deal.map((option) => (
                  <label
                    key={option}
                    className="cursor-pointer flex gap-1 items-center"
                  >
                    <input
                      type="radio"
                      name="deal"
                      checked={hasDeal === option}
                      onChange={() =>
                        dispatch({ type: "SET_DEAL", payload: option })
                      }
                    />
                    {option}
                  </label>
                ))}
              </div>
            </EachFilter>

            <EachFilter
              title="Available Stores"
              name="store"
              expanded={expanded === "store"}
              onToggle={toggleExpand}
            >
              <div className="!mt-4">
                {filterOptions.store.map((store) => (
                  <label
                    key={store}
                    className="cursor-pointer flex gap-1 items-center"
                  >
                    <input
                      type="radio"
                      name="store"
                      checked={stores === store}
                      onChange={() =>
                        dispatch({ type: "SET_STORE", payload: store })
                      }
                    />
                    {store}
                  </label>
                ))}
              </div>
            </EachFilter>

            <EachFilter
              title="Prices"
              name="price"
              expanded={expanded === "price"}
              onToggle={toggleExpand}
              lastElement={true}
            >
              <PriceList
                minValue={minPrice}
                maxValue={maxPrice}
                setMinValue={setMinPrice}
                setMaxValue={setMaxPrice}
                isDrawer={true}
                commingfromDrawer={true}
              />{" "}
            </EachFilter>
          </div>
          {/* Add your filter UI here */}
          {/* Bottom Button */}
          <button
            onClick={onClose}
            className=" flex bottom-0 w-full absolute items-center justify-center bg-[blueviolet] text-white font-bold text-[1.4rem] h-[104px]  hover:bg-[#aa8cee] transition duration-300"
          >
            Apply Filters
          </button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function EachFilter({
  title,
  children,
  name,
  expanded,
  onToggle,
  lastElement = false,
}) {
  return (
    <div
      className={`anyFilter relative !mt-[70px]  w-full font-bold text-[blueviolet] !pb-2
        ${
          lastElement
            ? ""
            : "after:content-[''] after:absolute after:h-[1px] after:bg-[#8a2be261] after:bottom-2 after:left-[15px] after:right-[15px]"
        }`}
    >
      <div
        className="flex !mb-[15px] items-center justify-between !px-5 cursor-pointer"
        onClick={() => onToggle(name)}
      >
        <span>{title}</span>
        <span
          className={`text-[24px] transition-transform duration-300 ${
            expanded ? "rotate-180" : ""
          }`}
        >
          <IoIosArrowDown color="blueviolet" />
        </span>
      </div>
      <div
        className={`transition-all duration-10 !px-5 ${
          expanded
            ? "max-h-[1000px] opacity-100 !mt-4"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

// function EachFilter({ title, children, name, expanded, onToggle }) {
//   return (
//     <div
//       className="anyFilter relative !mt-[100px] flex items-center justify-between  w-full font-bold text-[blueviolet]
//     after:content[''] after:absolute after:h-[1px] after:bg-[#8a2be261] after:bottom-[2px] after:left-[15px] after:right-[15px]
//     after:top-[67px]"
//     >
//       <div
//         className="flex items-center justify-between !pl-5 !pr-5 w-full font-bold text-[blueviolet]"
//         onClick={() => onToggle(name)}
//       >
//         <span>{title}</span>
//         <span
//           className={`text-[24px] transition-transform duration-300 ${
//             expanded ? "rotate-180" : ""
//           }`}
//         >
//           {" "}
//           <IoIosArrowDown color="blueviolet" />
//         </span>
//       </div>
//       <div
//         className={`overflow-hidden transition-all duration-300 absolute !p-5 !mt-[100px] ${
//           expanded ? "max-h-[200px] opacity-100 mt-4" : "max-h-0 opacity-0"
//         }`}
//       >
//         {children}
//       </div>
//     </div>
//   );
// }
