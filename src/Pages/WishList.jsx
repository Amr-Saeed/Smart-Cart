import Header from "../Components/HomePage/Header/Header";
import LowCategories from "../Components/HomePage/Header/LowCategories";
import WishListEmpty from "../Components/WishList/WishListEmpty";
import { useProductsContext } from "../Components/HomePage/ProductsContext";
import { useState, useEffect } from "react";
import WishListProducts from "../Components/WishList/WishListProducts";
import { useTotalWish } from "../Components/HomePage/TotalWishQuantity";
import { useWishListContext } from "../Components/WishList/WishlistContext";
import useQuantityWish from "../Components/HomePage/useQuantityWish";
function WishList() {
  const { products } = useProductsContext();
  // const [wishListProducts, setWishListProducts] = useState([]);
  const { totalWish, setTotalWish } = useTotalWish();
  const { wishListItems } = useWishListContext();

  // useEffect(() => {
  //   setWishListProducts(wishListItems || []); // Use wishListItems from context or an empty array if undefined
  // }, [products]); // Re-run when 'products' changes

  // function handleDeleteWish(id) {
  //   handleDec(id);
  // }
  return (
    <>
      <LowCategories />
      {wishListItems.length > 0 ? (
        <WishListProducts
        // wishListProducts={wishListProducts}
        // handleDeleteWish={handleDeleteWish}
        />
      ) : (
        <WishListEmpty />
      )}{" "}
    </>
  );
}

export default WishList;
// // Get products from localStorage and filter them based on their quantity
// const savedwishProducts = products.filter((product) => {
//   const quantity = Number(
//     localStorage.getItem(`wishQuantity-${product.id}`)
//   );
//   return quantity > 0; // Only include products with quantity > 0
// });

// Set the cart products state to the filtered products
// const { handleDec } = useQuantityWish();
// const wishListProducts = products.slice(0, 5);

// const wishListProducts = products.filter((product) => {
//   const quantity = Number(localStorage.getItem(`wishQuantity-${product.id}`));
//   return quantity > 0;
// });
