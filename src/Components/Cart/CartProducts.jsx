import { CardActions } from "../HomePage/CardActions";
import FavBtn from "../HomePage/FavBtn";
import Product from "../../Pages/Product";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Quantity } from "../HomePage/Quantity";
import Price from "../HomePage/Price";
import { Link } from "react-router-dom";
import { ListofCartProducts } from "./ListofCartProducts";

function CartProducts({ cartProducts, children }) {
  return (
    <section className="cart-products flex flex-col gap-4 p-4 w-full lg:w-2/3 !mt-[40px]">
      <div className="title">
        <h1 className="text-[3rem] text-[blueviolet] font-bold">Your Cart</h1>
        <p className="text-[1.2rem] !pl-[8px] text-[#000000bf]">
          You have {cartProducts.length} items in your cart
        </p>
      </div>

      {/* <ListofCartProducts cartProducts={cartProducts} /> */}
      {children}
    </section>
  );
}

export function ProductCart({ product, handleDelete }) {
  const { id, name, price, imageUrl, stockAvailability, unit, offers } =
    product;

  return (
    <li key={id}>
      <div className="cartData border-b border-b-[var(--main-color)] relative flex-col md:flex-row flex md:gap-[30px]">
        <div>
          <figure className="relative w-[200px]">
            <FavBtn id={id} prod={true} />{" "}
            <img
              loading="lazy"
              src={imageUrl}
              alt={name}
              className="!mb-[20px] !mt-[20px] !rounded-[10px]"
            />
          </figure>
        </div>

        <div className="data md:!mt-[20px] flex flex-col w-full justify-between">
          <Link to={`/product/${id}`}>
            <span className="cartProdName inline-block text-[1.1rem] text-[var(--main-color-2)] font-bold transition-all duration-300">{`${name} - Per ${unit}`}</span>{" "}
            {/* inline element doesn't respond to transform so we make it inline-block */}
          </Link>
          <div className="flex items-center justify-between">
            <CardActions commingfromcartProd={true}>
              <Quantity id={id} stockAvailability={stockAvailability} />
            </CardActions>
            <Price
              showContent={true}
              commingFromCartProd={true}
              noWidthforCartProd={true}
              price={price}
              offers={offers}
            />
          </div>
        </div>
        <button
          className="absolute text-[2rem] lg:text-[1.3rem] top-0 right-0 !mt-[20px]"
          onClick={() => handleDelete(id)}
        >
          <RiDeleteBin6Line color="#ff3333" />
        </button>
      </div>
    </li>
  );
}
export default CartProducts;
