import { Link, useNavigate } from "react-router-dom";
import Price from "./Price";
import { memo } from "react";

function SearchItems({ img, name, unit, price, offers, id, setOpen }) {
  return (
    <li className=" flex !p-3 rounded-2xl w-[105%] md:w-full bg-[var(--main-color)]">
      <Link
        className=" flex !p-3 rounded-2xl w-[105%] md:w-full bg-[var(--main-color)]"
        to={`/product/${id}`}
        onClick={() => {
          setOpen(false);
        }}
      >
        <img
          className="w-20 h-20 object-contain"
          loading="lazy"
          src={img}
          alt={name}
        />
        <span className="!ml-5 flex items-center justify-center flex-col">
          <span className="anchorItems text-left md:text-[1.3rem] text-[1.1rem] w-full">
            {`${name} - Per ${unit}`}
          </span>
          <Price
            className="justify-start md:flex-row lg:gap-16 md:gap-8 text-[0.8rem] md:text-[1rem] flex-col gap-0"
            price={price}
            offers={offers}
          />
        </span>
      </Link>
    </li>
  );
}

export default memo(SearchItems); // SearchItems;
