import { CardActions } from "../HomePage/CardActions";
import FavBtn from "../HomePage/FavBtn";
import Product from "../../Pages/Product";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Quantity } from "../HomePage/Quantity";
import Price from "../HomePage/Price";
import { Link } from "react-router-dom";
import { Children } from "react";
import { useQuantityWish } from "../HomePage/useQuantityWish";

function WishListProducts({ wishListProducts, handleDeleteWish }) {
  return (
    <div className="cartProduct flex flex-col w-full lg:!w-[80%] containerr">
      <ul className="flex flex-col justify-center items-center w-full">
        {wishListProducts.map((product) => (
          // <ProductCart
          //   key={product.id}
          //   product={product}
          //   handleDeleteWish={handleDeleteWish}
          // />

          //دي اللي شغالة اللي فوق لا ابقي اسأل جبتي فيها بس غالباً علشان لسه محطناش كل المنتجات فكده في مشكلة في الid
          <ProductCart
            key={product.id || product.product_id}
            product={{ ...product, id: product.id || product.product_id }}
          />
        ))}
      </ul>
      <a href="/" className="flex justify-center items-center">
        <span className="!mt-[10px] inline-block text-[blueviolet] font-semibold  underline  w-[80%]">
          Continue Shopping
        </span>
      </a>
    </div>
  );
}

export function ProductCart({ product, handleDeleteWish }) {
  // const { handleDec } = useQuantityWish(product.id);
  const { id, name, price, imageUrl, stockAvailability, unit, offers } =
    product;

  return (
    <li key={id} className="w-full flex justify-center items-center">
      <div className="cartData border-b border-b-[var(--main-color)] w-[80%] relative flex-col md:flex-row flex md:gap-[30px]">
        <div>
          <figure className="relative w-[200px]">
            <FavBtn id={product.id} prod={true} />{" "}
            <img
              loading="lazy"
              src={imageUrl}
              alt={name}
              className="!mb-[20px] !mt-[20px] !rounded-[10px]"
            />
          </figure>
        </div>

        <div className="data md:!mt-[20px] flex flex-col w-[40%] justify-between">
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
      </div>
    </li>
  );
}

export default WishListProducts;
