import Header from "../Components/HomePage/Header/Header";
import LowCategories from "../Components/HomePage/Header/LowCategories";
import WishListEmpty from "../Components/WishList/WishListEmpty";
import { useProductsContext } from "../Components/HomePage/ProductsContext";
import { useState } from "react";
import WishListProducts from "../Components/WishList/WishListProducts";
function WishList() {
  const { products } = useProductsContext();
  const wishListProducts = products.slice(0, 5);
  return (
    <>
      <Header />
      <LowCategories />
      {wishListProducts.length > 0 ? (
        <WishListProducts wishListProducts={wishListProducts} />
      ) : (
        <WishListEmpty />
      )}{" "}
    </>
  );
}

export default WishList;
