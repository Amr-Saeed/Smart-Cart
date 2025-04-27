import BreadcrumbDemo from "./BreadCrumb";
import MyToggle from "./ToggleSwitch";
import { IoClose } from "react-icons/io5";
import { useMemo, useReducer } from "react";

import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import MultiSlider from "./MultiRangeSlider";
import FilterDropDown from "./FilterDropDown";
import MainProducts from "./MainProducts";
const initialState = {
  hasDeal: null,
  stores: null,
  sort: "Default",
};

function filtersReducer(state, action) {
  switch (action.type) {
    case "SET_DEAL":
      return { ...state, hasDeal: action.payload };
    case "SET_STORE":
      return { ...state, stores: action.payload };
    case "SET_SORT":
      return { ...state, sort: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}
function MainCategory({ category, categoryProducts }) {
  const [openDropDown, setOpenDropDown] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const [filters, dispatch] = useReducer(filtersReducer, initialState);
  const { hasDeal, stores, sort } = filters;

  const filterOptions = {
    deal: ["Yes", "No"],
    store: Array.from({ length: 10 }, (_, i) => i + 1),
    sort: [
      "Default",
      "Price: Low to High",
      "Price: High to Low",
      "A to Z",
      "Z to A",
    ],
  };

  function handleDropDown(filterName) {
    setOpenDropDown((pervKey) => (pervKey === filterName ? null : filterName));
  }
  // const filteredProducts = useMemo(() => {
  //   return categoryProducts.filter((product) => {
  //     if (hasDeal === "Yes") {
  //       return product.bestDeal === true; // Only products with bestDeal true
  //     } else {
  //       return true; // All products (no filtering)
  //     }
  //   });
  // }, [categoryProducts, hasDeal]);

  const filteredProducts = useMemo(() => {
    let result = categoryProducts.filter((product) => {
      //checking the hasDEal
      const matchDeal = hasDeal === "Yes" ? product.bestDeal === true : true;
      const noDeal = hasDeal === "No" ? product.bestDeal === false : true;

      //checking the stores
      const matchStores = stores > 0 ? product.inStock >= stores : true;

      //checking the price
      const matchPrice = product.price >= minPrice && product.price <= maxPrice;

      return matchDeal && noDeal && matchStores && matchPrice;
    });

    //checking the sort
    if (sort === "Price: Low to High") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "Price: High to Low") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "A to Z") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "Z to A") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [categoryProducts, hasDeal, stores, minPrice, maxPrice, sort]);

  return (
    <section className="main-category !mt-[30px] containerr">
      <div className="flex flex-col gap-5">
        <BreadcrumbDemo />
        <h1 className="text-[2rem] text-[var(--main-color)] font-extrabold">
          {category}
        </h1>
      </div>

      <section className="!mt-[30px] !mb-[15px]">
        <div className="filters  flex gap-[30px]">
          <FilterDropDown
            label="Has Deal"
            name="deal"
            options={filterOptions.deal}
            isOpen={openDropDown === "deal"}
            onToggle={handleDropDown}
            onSelect={(option) => {
              dispatch({ type: "SET_DEAL", payload: option });
              setOpenDropDown(false);
            }}
          />

          <FilterDropDown
            label="Available Stores"
            name="store"
            options={filterOptions.store}
            isOpen={openDropDown === "store"}
            onToggle={handleDropDown}
            onSelect={(option) => {
              dispatch({ type: "SET_STORE", payload: option });
              setOpenDropDown(false);
            }}
          />

          <div className="priceFilter h-[50px] relative">
            <PriceBtn
              openDropDown={openDropDown}
              handleDropDown={handleDropDown}
            />

            <PriceList
              openDropDown={openDropDown}
              minValue={minPrice}
              maxValue={maxPrice}
              setMinValue={setMinPrice}
              setMaxValue={setMaxPrice}
            />
          </div>

          <OnsaleReset dispatch={dispatch}>
            <MyToggle hasDeal={hasDeal} dispatch={dispatch} />
          </OnsaleReset>

          <FilterDropDown
            label="Default Sort"
            name="Sort"
            options={filterOptions.sort}
            isOpen={openDropDown === "Sort"}
            onToggle={handleDropDown}
            onSelect={(option) => {
              dispatch({ type: "SET_SORT", payload: option });
              setOpenDropDown(false);
            }}
          />
        </div>
        <CloseFilters
          hasDeal={hasDeal}
          stores={stores}
          sort={sort}
          minPrice={minPrice}
          maxPrice={maxPrice}
          dispatch={dispatch}
          setMaxPrice={setMaxPrice}
          setMinPrice={setMinPrice}
        />
      </section>
      <MainProducts filteredProducts={filteredProducts} />
    </section>
  );
}

function PriceBtn({ openDropDown, handleDropDown }) {
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

function PriceList({
  openDropDown,
  minValue,
  maxValue,
  setMinValue,
  setMaxValue,
}) {
  return (
    openDropDown === "price" && (
      <div className="priceList z-[42] absolute border-1 border-[blueviolet] !p-2.5 bg-white w-[250px] border-t-0 rounded-br-[8px] rounded-bl-[8px]">
        <div className="absolute top-0 left-[33%] w-[67%] h-[0.5px] bg-[blueviolet]"></div>

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
    )
  );
}

function CloseFilters({
  hasDeal,
  stores,
  sort,
  minPrice,
  maxPrice,
  dispatch,
  setMinPrice,
  setMaxPrice,
}) {
  const filters = useMemo(() => {
    const filters = [];

    if (hasDeal === "Yes" || hasDeal === "No") {
      filters.push({ value: hasDeal, type: "SET_DEAL" });
    }
    if (stores) {
      filters.push({ value: stores, type: "SET_STORE" });
    }
    if (sort && sort !== "Default") {
      filters.push({ value: sort, type: "SET_SORT" });
    }
    if (minPrice !== 0 || maxPrice !== 1000) {
      filters.push({
        value: `Min:${minPrice}EGP | Max:${maxPrice}EGP`,
        type: "SET_PRICE",
      });
    }

    return filters;
  }, [hasDeal, stores, sort, minPrice, maxPrice]);
  console.log(filters);
  return (
    <div className="closeFilters !mt-[15px] flex gap-[10px] ">
      {filters.length > 0
        ? filters.map((filter, index) => (
            <div
              className="bg-[#b076e78a] flex w-fit !py-1.5 !px-2.5 rounded-[8px] text-[#6208b6] font-semibold"
              key={index}
            >
              <span>{filter.value}</span>
              <IoClose
                className="text-2xl cursor-pointer"
                onClick={() => {
                  dispatch({
                    type: filter.type,
                    payload: null,
                  });
                  if (filter.type === "SET_PRICE") {
                    setMinPrice(0);
                    setMaxPrice(1000);
                  }
                }}
              />
            </div>
          ))
        : null}
    </div>
  );
}

function OnsaleReset({ children, dispatch }) {
  return (
    <>
      <div className="onSale flex flex-col">
        {children}
        <label className="text-[var(--main-color)] font-semibold">
          On Sale
        </label>
      </div>
      <button
        className="text-[var(--main-color)] font-semibold"
        onClick={() => dispatch({ type: "RESET" })}
      >
        Reset
      </button>
    </>
  );
}

export default MainCategory;
