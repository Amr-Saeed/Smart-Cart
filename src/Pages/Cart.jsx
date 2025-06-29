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
import { useCartContext } from "../Components/Cart/CartContext";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

function Cart() {
  const { products } = useProductsContext();
  const [cartProducts, setCartProducts] = useState([]);
  const { setTotalQuantity, totalQuantity } = useTotalQuantity();
  const { user } = useUser();
  const { cart, fetchCart } = useCartContext();
  const { getToken } = useAuth();

  console.log("Total Quantity in Cart:", cart); // Log the total quantity for debugging

  user ? console.log("User ID:", user.id) : console.log("No user logged in");

  const cartItems = cart.cart || [];

  useEffect(() => {
    if (!user) {
      // Not logged in → get cart products from localStorage
      const savedCartProducts = products.filter((product) => {
        const quantity = Number(localStorage.getItem(`quantity-${product.id}`));
        return quantity > 0;
      });
      setCartProducts(savedCartProducts);
    } else {
      // Logged in → get cart products from backend/context
      setCartProducts(cartItems);
    }
  }, [products, cart, user]);

  console.log("Cart Products:", cart); // Log the cart products for debugging
  console.log("cartProducts Products:", cartProducts); // Log the cart products for debugging

  const APIToialPrice = cart.total_price || 0;

  console.log("API Total Price:", APIToialPrice); // Log the total price for debugging

  async function handleDelete(id) {
    console.log("Deleting item with ID:", id); // Log the ID of the item being deleted
    if (!user) {
      localStorage.removeItem(`quantity-${id}`);
      console.log("Item removed from cart:", id);
      setCartProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
      setTotalQuantity((prev) => prev - 1); // Decrease total quantity in context
    } else {
      try {
        const token = await getToken();

        const res = await axios.delete(
          `https://nutrigeen.com/api/cart/${user.id}/${id}`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Deleted from server:", res.data);

        setCartProducts((prev) =>
          prev.filter((product) => product.product_id !== id)
        );

        setTotalQuantity((prev) => prev - 1);
        await fetchCart({ userId: user.id }); // Refresh the cart after deletion
      } catch (error) {
        console.error("Failed to delete from backend:", error);
      }
    }
  }
  console.log(cartProducts); // Log the cart products to the console for debugging
  return (
    <>
      <LowCategories />
      {cartProducts.length > 0 ? (
        <div className="containerr flex flex-col lg:flex-row gap-[40px] w-full h-full">
          <CartProducts cartProducts={cartProducts}>
            <ListofCartProducts
              key={cartProducts.id}
              cartProducts={cartProducts}
              handleDelete={handleDelete}
            />
          </CartProducts>
          <CartCheckout
            cartProducts={cartProducts}
            APIToialPrice={APIToialPrice}
            user={user}
          />
        </div>
      ) : (
        <CartEmpty />
      )}
    </>
  );
}

export default Cart;

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
