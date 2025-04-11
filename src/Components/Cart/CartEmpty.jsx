import Footer from "../HomePage/Footer";
import { Link } from "react-router-dom";

function CartEmpty() {
  return (
    <>
      <section className="cart-empty containerr !mt-[25px]">
        <h1 className="text-[3rem] text-[blueviolet] font-bold">Your Cart</h1>
        <div className="flex flex-col items-center  gap-4">
          <picture>
            <img src="/empty-cart.svg" alt="cart empty" className="w-[500px]" />
          </picture>
          <h2 className="text-[1.5rem] text-[blueviolet] font-bold">
            Your cart is empty
          </h2>

          <button className="w-[250px] !mt-[15px] bg-[blueviolet] text-white font-bold text-[1.4rem] h-12 rounded-[20px] hover:bg-[#aa8cee] transition duration-300">
            <Link to="/">Browse Products</Link>
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default CartEmpty;
