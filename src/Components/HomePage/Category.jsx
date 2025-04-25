import { Link } from "react-router-dom";

export default function Category({ product }) {
  return (
    <div className="category flex flex-col align-middle justify-center hover:scale-[1.1] transition-all duration-300 ease-in-out">
      <Link
        to={`/${product.category}`}
        className="category flex flex-col align-middle justify-center"
      >
        <div className="pic h-12 w-[80%] lg:w-full rounded-2xl flex justify-center align-middle ">
          <img
            loading="lazy"
            src={product.imageUrl}
            alt={product.name}
            className="w-14 h-14 lg:w-24 lg:h-24 translate-y-[-50%]"
          />
        </div>
        <p className="text-center categoryName w-[80%] lg:w-full font-semibold">
          {product.category}
        </p>
      </Link>
    </div>
  );
}
