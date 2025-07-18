import React, { useMemo, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules"; // Import Navigation module
import { useProductsContext } from "../HomePage/ProductsContext";
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

export default function SwiperComponent({ content, title, relatedProducts }) {
  const { products } = useProductsContext();

  console.log("Products in SwiperComponent:", products); // Log products for debugging

  const bestDealsProducts = useMemo(() => {
    if (!products || products.length === 0) return []; // Don't compute categories if products are null

    return products?.filter((product) => product?.bestDeal === true);
  });
  // 🚫 Don't render anything until products are fetched
  if (products === null) {
    return null; // Skip rendering until products are fetched
  }
  // Determine which products to render based on the title and relatedProducts prop
  const productsToRender = useMemo(() => {
    if (title === "You May Also Like") {
      return relatedProducts || []; // Use relatedProducts if provided
    }

    if (title === "Best Deals") {
      return products.filter((product) => product.bestDeal);
    }

    if (title === "EveryDay Needs") {
      return products.filter((product) => product.everydayNeeds);
    }

    return [];
  }, [title, relatedProducts, products]);

  const uniqueNavPrev = `swiper-button-prev-${title.replace(/\s+/g, "")}`;
  const uniqueNavNext = `swiper-button-next-${title.replace(/\s+/g, "")}`;

  return (
    <>
      <div className="swiper-container">
        {/* Unique Custom Navigation Buttons */}
        <button
          aria-label="swiper-button-prev"
          className={`swiper-button-prev ${uniqueNavPrev} hidden lg:flex`}
        >
          {"<"}
        </button>
        <button
          aria-label="swiper-button-next"
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
          {/* {products.map(
            (product) =>
              (title === "Best Deals"
                ? product.bestDeal
                : title === "You May Also Like"
                ? relatedProducts.some((p) => p.id === product.id)
                : product.everydayNeeds) */}
          {productsToRender.map((product) => (
            <SwiperSlide className="relative" key={product.id}>
              {/* <FavBtn id={product.id} /> */}

              {/* {product.offers > 0 && <Offer offers={product.offers} />} */}

              <ProductCard
                productImg={product.imageUrl}
                name={product.name}
                key={product.id}
                id={product.id}
                x={product.x}
                y={product.y}
                stockAvailability={product.stockAvailability}
                offers={product.offers}
              >
                <TitleandDes
                  name={product.name}
                  unit={product.unit}
                  description={product.description}
                  id={product.id}
                />
                <Price price={product.price} offers={product.offers} />
              </ProductCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
