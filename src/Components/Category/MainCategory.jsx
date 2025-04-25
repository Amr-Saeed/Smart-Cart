import { BreadcrumbDemo } from "./BreadCrumb";
import MyToggle from "./ToggleSwitch";
import { IoClose } from "react-icons/io5";
import { useMemo } from "react";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import MultiSlider from "./MultiRangeSlider";
import FilterDropDown from "./FilterDropDown";
import ProductCard from "../HomePage/ProdutCard";
import TitleandDes from "../HomePage/TitleandDes";
import Price from "../HomePage/Price";
import FavBtn from "../HomePage/FavBtn";
import { Offer } from "../HomePage/Offer";
import { SwiperSlide } from "swiper/react";

function MainCategory({ category, categoryProducts }) {
  const [openDropDown, setOpenDropDown] = useState(false);
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

  console.log("categoryProductssssssssssss", categoryProducts);
  function handleDropDown(filterName) {
    setOpenDropDown((pervKey) => (pervKey === filterName ? null : filterName));
  }

  return (
    <section className="main-category !mt-[30px] containerr">
      <div className="flex flex-col gap-5">
        <BreadcrumbDemo />
        <h1 className="text-[2rem] text-[var(--main-color)] font-extrabold">
          {category}
        </h1>
      </div>

      <section className="!mt-[30px] ">
        <div className="filters  flex gap-[30px]">
          <FilterDropDown
            label="Has Deal"
            name="deal"
            options={filterOptions.deal}
            isOpen={openDropDown === "deal"}
            onToggle={handleDropDown}
          />

          <FilterDropDown
            label="Available Stores"
            name="store"
            options={filterOptions.store}
            isOpen={openDropDown === "store"}
            onToggle={handleDropDown}
          />

          <div className="priceFilter h-[50px] relative">
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

            {openDropDown === "price" && (
              <div className="priceList absolute border-1 border-[blueviolet] !p-2.5 bg-white w-[250px] border-t-0 rounded-br-[8px] rounded-bl-[8px]">
                <div className="absolute top-0 left-[33%] w-[67%] h-[0.5px] bg-[blueviolet]"></div>

                <div className="sliderr">
                  <MultiSlider />
                </div>
                <div className="minmax flex justify-between">
                  <div className="min flex flex-col gap-1 w-[48%]">
                    <label className="text-[blueviolet] font-extrabold">
                      Min
                    </label>
                    <input
                      type="text"
                      placeholder="0"
                      className="w-[100%] text-[blueviolet] outline-0 border-1 border-[blueviolet] rounded-[8px] !p-2.5"
                    />
                  </div>
                  <div className="min flex flex-col gap-1 w-[48%]">
                    <label className="text-[blueviolet] font-extrabold">
                      Max
                    </label>
                    <input
                      type="text"
                      placeholder="100"
                      className="w-[100%] text-[blueviolet] border-1 outline-0 border-[blueviolet] rounded-[8px] !p-2.5"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="onSale flex flex-col">
            <MyToggle />
            <label className="text-[var(--main-color)] font-semibold">
              On Sale
            </label>
          </div>
          <button className="text-[var(--main-color)] font-semibold">
            Reset
          </button>

          <FilterDropDown
            label="Default Sort"
            name="Sort"
            options={filterOptions.sort}
            isOpen={openDropDown === "Sort"}
            onToggle={handleDropDown}
          />
        </div>
        <div className="closeFilters !mt-[15px] flex justify-between bg-[#b076e78a] w-[30%] !py-1.5 !px-2.5 rounded-[8px] text-[#6208b6] font-semibold">
          <span>Close Close Close</span>
          <IoClose className="text-2xl" />
        </div>
        <div className="products"></div>
      </section>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px] mt-[30px] ">
        {categoryProducts.map((product) => (
          <div className="relative !mb-[20px]" key={product.id}>
            {product.offers > 0 && (
              <Offer offers={product.offers} prodCategory={true} />
            )}
            <ProductCard
              productImg={product.imageUrl}
              name={product.name}
              key={product.id}
              id={product.id}
              stockAvailability={product.stockAvailability}
              prodCtegory={true}
            >
              <TitleandDes
                name={product.name}
                unit={product.unit}
                description={product.description}
                id={product.id}
              />
              <Price price={product.price} offers={product.offers} />
            </ProductCard>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MainCategory;
