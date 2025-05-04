import CartProducts from "../Components/Cart/CartProducts";
import CartCheckout from "../Components/Cart/CartCheckout";
import Header from "../Components/HomePage/Header/Header";
import LowCategories from "../Components/HomePage/Header/LowCategories";
import { useProductsContext } from "../Components/HomePage/ProductsContext";
import { useState, useEffect } from "react";
import CartEmpty from "../Components/Cart/CartEmpty";
import { ListofCartProducts } from "../Components/Cart/ListofCartProducts";
import { set } from "react-hook-form";
import { useTotalQuantity } from "../Components/HomePage/TotalQuantityContext";
import { useQuantity } from "../Components/HomePage/useQuantity";
import { useUser } from "@clerk/clerk-react";

function Cart() {
  const { products } = useProductsContext();
  const [cartProducts, setCartProducts] = useState([]);
  const { setTotalQuantity, totalQuantity } = useTotalQuantity();
  const { user } = useUser();
  console.log("Total Quantity in Cart:", products); // Log the total quantity for debugging

  // const [cartProducts, setCartProducts] = useState(products.slice(0, 5));

  // function handleDelete(id) {
  //   const UpdatedProducts = cartProducts.filter((product) => product.id !== id);
  //   console.log(UpdatedProducts);
  //   setCartProducts(UpdatedProducts);
  // }

  // const cartProducts = products.slice(0, 5); // Assuming you want to display the first 5 products in the cart

  // const cartProducts = products.filter((product) => {
  //   const quantity = Number(localStorage.getItem(`quantity-${product.id}`));
  //   return quantity > 0;
  // });

  user ? console.log("User ID:", user.id) : console.log("No user logged in");

  // UseEffect to initialize the state with products from localStorage
  useEffect(() => {
    // Get products from localStorage and filter them based on their quantity
    const savedCartProducts = products.filter((product) => {
      const quantity = Number(localStorage.getItem(`quantity-${product.id}`));
      return quantity > 0; // Only include products with quantity > 0
    });

    // Set the cart products state to the filtered products
    setCartProducts(savedCartProducts);
  }, [products]); // Re-run when 'products' changes

  function handleDelete(id) {
    localStorage.removeItem(`quantity-${id}`);
    console.log("Item removed from cart:", id);
    setCartProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
    setTotalQuantity((prev) => prev - 1); // Decrease total quantity in context
  }
  console.log(cartProducts); // Log the cart products to the console for debugging
  return (
    <>
      <LowCategories />
      {cartProducts.length > 0 ? (
        <div className="containerr flex flex-col lg:flex-row gap-[40px] w-full h-full">
          <CartProducts cartProducts={cartProducts}>
            <ListofCartProducts
              cartProducts={cartProducts}
              handleDelete={handleDelete}
            />
          </CartProducts>
          <CartCheckout cartProducts={cartProducts} />
        </div>
      ) : (
        <CartEmpty />
      )}
    </>
  );
}

export default Cart;
