import Footer from "../HomePage/Footer";
import { Link } from "react-router-dom";

function WishListEmpty() {
  return (
    <>
      <section className="cart-empty containerr !mt-[25px]">
        <h1 className="text-[3rem] text-[blueviolet] font-bold">My WishList</h1>
        <div className="flex flex-col items-center  gap-4">
          <picture>
            <img
              src="/wish-list.svg"
              alt="WishList empty"
              className="w-[500px]"
            />
          </picture>
          <h2 className="text-[1.5rem] text-[blueviolet] font-bold">
            {/* Your WishList is empty */}
            Sign in to view your saved items
          </h2>

          <button className="w-[250px] !mt-[15px] bg-[blueviolet] text-white font-bold text-[1.4rem] h-12 rounded-[20px] hover:bg-[#aa8cee] transition duration-300">
            <Link to="/">Sign In</Link>
          </button>
        </div>
      </section>
    </>
  );
}

export default WishListEmpty;
