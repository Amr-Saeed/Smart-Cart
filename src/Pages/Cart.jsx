import CartProducts from "../Components/Cart/CartProducts";
import CartCheckout from "../Components/Cart/CartCheckout";
import Header from "../Components/HomePage/Header/Header";
import LowCategories from "../Components/HomePage/Header/LowCategories";
import { useProductsContext } from "../Components/HomePage/ProductsContext";
import { useState } from "react";
import CartEmpty from "../Components/Cart/CartEmpty";

function Cart() {
  const { products } = useProductsContext();

  // const [cartProducts, setCartProducts] = useState(products.slice(0, 5));

  // function handleDelete(id) {
  //   const UpdatedProducts = cartProducts.filter((product) => product.id !== id);
  //   console.log(UpdatedProducts);
  //   setCartProducts(UpdatedProducts);
  // }

  const cartProducts = products.slice(0, 5); // Assuming you want to display the first 5 products in the cart

  console.log(cartProducts); // Log the cart products to the console for debugging
  return (
    <>
      <Header />
      <LowCategories />
      {cartProducts.length > 0 ? (
        <div className="containerr flex flex-col lg:flex-row gap-[40px] w-full h-full">
          <CartProducts cartProducts={cartProducts} />
          <CartCheckout cartProducts={cartProducts} />
        </div>
      ) : (
        <CartEmpty />
      )}
    </>
  );
}

export default Cart;
