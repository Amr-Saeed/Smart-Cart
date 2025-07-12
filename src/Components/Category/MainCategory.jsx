import BreadcrumbDemo from "./BreadCrumb";
import MyToggle from "./ToggleSwitch";
import { useMemo, useReducer } from "react";

import { useState } from "react";
import MultiSlider from "./MultiRangeSlider";
import FilterDropDown from "./FilterDropDown";
import MainProducts from "./MainProducts";
import BottomDrawer from "../HomePage/BottomDrawer";
import BottomDrawerFilters from "./BottomDrawerFilters";
import { PriceBtn } from "./PriceBtn";
import { CloseFilters } from "./CloseFilters";
import PriceList from "./PriceList";
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

  const filteredProducts = useMemo(() => {
    let result = categoryProducts.filter((product) => {
      //checking the hasDEal
      const matchDeal = hasDeal === "Yes" ? product.bestDeal === 1 : true;
      const noDeal = hasDeal === "No" ? product.bestDeal === 0 : true;

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
          <div className="md:flex gap-[30px] hidden">
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
          </div>

          <div className="filtersDrawer md:hidden flex">
            <FilterDropDown
              label="Filters"
              name="filters"
              onToggle={handleDropDown}
            >
              <BottomDrawerFilters
                onClose={() => handleDropDown(null)}
                open={openDropDown === "filters"}
                dispatch={dispatch}
                hasDeal={hasDeal}
                stores={stores}
                minPrice={minPrice}
                maxPrice={maxPrice}
                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
                filterOptions={filterOptions}
              />
            </FilterDropDown>
          </div>

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
