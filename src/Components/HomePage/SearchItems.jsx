import Price from "./Price";

function SearchItems({ img, name, unit, price, offers }) {
  return (
    <li className=" flex !p-3 rounded-2xl w-[105%] md:w-full bg-[var(--main-color)]">
      <img
        className="w-20 h-20 object-contain"
        loading="lazy"
        src={img}
        alt={name}
      />
      <span className="!ml-5 flex items-center justify-center flex-col">
        <a
          href=""
          className="anchorItems text-left md:text-[1.3rem] text-[1.1rem] w-full"
        >
          {`${name} - Per ${unit}`}
        </a>
        <Price
          className="justify-start md:flex-row lg:gap-16 md:gap-8 text-[0.8rem] md:text-[1rem] flex-col gap-0"
          price={price}
          offers={offers}
        />
      </span>
    </li>
  );
}

export default SearchItems;
