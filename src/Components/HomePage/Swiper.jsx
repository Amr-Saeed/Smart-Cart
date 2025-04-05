import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules"; // Import Navigation module
import { useProducts } from "../useProducts";
import Price from "./Price";
import TitleandDes from "./TitleandDes";
import FavBtn from "./FavBtn";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";
import ProductCard from "../HomePage/ProdutCard";

// import required modules
import { Pagination } from "swiper/modules";
import { Offer } from "./Offer";
// import { useLocalStorage } from "./useLocalStorage";

export default function SwiperComponent({ content, title }) {
  const { products, isLoading } = useProducts();
  const bestDealsProducts = products?.filter(
    (product) => product?.bestDeal === true
  );

  const uniqueNavPrev = `swiper-button-prev-${title.replace(/\s+/g, "")}`;
  const uniqueNavNext = `swiper-button-next-${title.replace(/\s+/g, "")}`;

  return (
    <>
      <div className="swiper-container">
        {/* Unique Custom Navigation Buttons */}
        <button
          className={`swiper-button-prev ${uniqueNavPrev} hidden lg:flex`}
        >
          {"<"}
        </button>
        <button
          className={`swiper-button-next ${uniqueNavNext} hidden lg:flex`}
        >
          {">"}
        </button>

        <Swiper
          className={`swiper-${title.replace(/\s+/g, "")}`}
          slidesPerView="auto"
          spaceBetween={30}
          pagination={{ clickable: true }}
          navigation={{
            nextEl: `.${uniqueNavNext}`,
            prevEl: `.${uniqueNavPrev}`,
            disabledClass: "swiper-button-disabled",
          }} // Link buttons
          watchOverflow={true}
          watchSlidesProgress={true} // Track slide progress
          modules={[Pagination, Navigation]} // Include Navigation module
          freeMode={true}
        >
          {products.map(
            (product) =>
              (title === "Best Deals"
                ? product.bestDeal
                : product.everydayNeeds) && (
                <SwiperSlide className="relative" key={product.id}>
                  <FavBtn id={product.id} />

                  {product.offers > 0 && <Offer offers={product.offers} />}

                  <ProductCard
                    productImg={product.imageUrl}
                    name={product.name}
                    key={product.id}
                    id={product.id}
                    stockAvailability={product.stockAvailability}
                  >
                    <TitleandDes
                      name={product.name}
                      unit={product.unit}
                      description={product.description}
                    />
                    <Price price={product.price} offers={product.offers} />
                  </ProductCard>
                </SwiperSlide>
              )
          )}
        </Swiper>
      </div>
    </>
  );
}
