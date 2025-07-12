import { IoIosArrowDown } from "react-icons/io";
// import { IoIosArrowUp } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa6";
import { useMemo, useState } from "react";
import { RiVisaFill } from "react-icons/ri";

function CartCheckout({ cartProducts, user, APIToialPrice }) {
  const [isPromoCodeVisible, setIsPromoCodeVisible] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [promoCode, setPromoCode] = useState("");

  // const pricesafterOffers = useMemo(() => {
  //   return cartProducts.map((product) => {
  //     return product.price - (product.price * product.offers) / 100;
  //   });
  // }, [cartProducts]);
  // useMemo is used to memoize the prices after applying offers to avoid recalculating on every render

  const pricesafterOffers = useMemo(() => {
    return cartProducts.map((product) => {
      const quantity =
        Number(localStorage.getItem(`quantity-${product.id}`)) || 1;
      const discountedPrice =
        product.price - (product.price * product.offers) / 100;
      return discountedPrice * quantity;
    });
  }, [cartProducts]);

  const totalPrice = useMemo(() => {
    return pricesafterOffers.reduce((acc, price) => acc + price, 0);
  }, [pricesafterOffers]);
  // useMemo is used to memoize the total price to avoid recalculating on every render
  // Final total price based on whether user is logged in
  const finalTotalPrice = user ? APIToialPrice : totalPrice;
  function handlePromoCodeToggle() {
    setIsPromoCodeVisible((isPromoCodeVisible) => !isPromoCodeVisible);
  }

  const handlePromoSubmit = (e) => {
    e.preventDefault();
    if (promoCode.trim().toLowerCase() === "smart-cart") {
      setDiscount(0.1); // 10% discount
    } else {
      setDiscount(0); // No discount if incorrect
    }
  };
  return (
    <section className="w-full lg:w-1/3 !mt-[-65px] lg:!mt-[50px]">
      <div className="PaymentSummary bg-[#aa8cee9e] !p-[20px] rounded-lg shadow-md flex flex-col gap-4 h-[500px]">
        <h2 className="text-[blueviolet] font-bold text-[1.4rem]">
          Payment Summary
        </h2>
        <div className="subTotal flex justify-between text-[#000000b3] !mt-[15px]">
          <p>SubTotal</p>
          <span> {`${(finalTotalPrice * (1 - discount)).toFixed(2)}EGP`}</span>
        </div>
        <div className="promoCode flex justify-between  !mt-[15px] items-center">
          <p className="text-[blueviolet] font-bold text-[1.3rem]">
            Promo Code
          </p>
          <button
            className="text-[blueviolet] font-bold text-[2rem]"
            onClick={handlePromoCodeToggle}
          >
            {/* {isPromoCodeVisible ? (
              <IoIosArrowUp color="blueviolet" />
            ) : (
              <IoIosArrowDown color="blueviolet" />
            )} */}
            {/* this or this like having two different icons or just rotate the down to make it up */}
            <span
              className={`inline-block transition-transform duration-500 ${
                isPromoCodeVisible ? "rotate-180" : ""
              }`}
            >
              <IoIosArrowDown color="blueviolet" />
            </span>
          </button>
        </div>
        {
          <div
            className={`transition-all duration-500  transform  ${
              isPromoCodeVisible
                ? "opacity-100 h-auto translate-y-0"
                : "opacity-0 h-0 translate-y-2 pointer-events-none"
            }`}
          >
            <form
              id="searchForm"
              className="searchBar flex"
              onSubmit={handlePromoSubmit}
            >
              <div className="w-full relative">
                <label className="font-semibold text-[0.9rem] text-[#0000008c]">
                  Add Code
                </label>
                <input
                  onChange={(e) => setPromoCode(e.target.value)}
                  type="text"
                  className="searchInput   bg-white outline-none   rounded-lg relative h-12 w-full"
                />
                <button
                  aria-label="search"
                  type="submit"
                  className="searchButton absolute !right-[-2px] top-[24px] rounded-[10px] h-12   w-[4rem] md:w-12 flex justify-center items-center"
                  // onClick={(e) => e.preventDefault()}
                >
                  <FaArrowRight color="white" size={20} />
                </button>
              </div>
            </form>
          </div>
        }
        <div className="Total flex justify-between  !mt-[15px] items-center">
          <p className="text-[blueviolet] font-bold text-[2rem]">Total</p>
          <span className="text-[1.5rem] text-black font-bold">
            {" "}
            {`${(finalTotalPrice * (1 - discount)).toFixed(2)}EGP`}
          </span>
        </div>
        <button className="w-full !mt-[15px] bg-[blueviolet] text-white font-bold text-[1.4rem] h-12 rounded-[20px] hover:bg-[#aa8cee] transition duration-300">
          Checkout
        </button>
        <div className="place-items-center !mt-[15px]">
          <RiVisaFill size={50} />
        </div>
      </div>
    </section>
  );
}

export default CartCheckout;
