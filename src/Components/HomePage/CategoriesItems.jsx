import { Link } from "react-router-dom";

export function CategoriesItems({ product }) {
  return (
    <button aria-label="open-product">
      <li key={product.id}>
        <Link to={`/product/${product.id}`} className="flex items-center gap-3">
          <img
            loading="lazy"
            src={product.imageUrl}
            alt={product.name}
            className="w-20 h-20 object-contain rounded-lg"
          />
          <span className="text-[var(--main-color)] font-bold">
            {product.name}
          </span>
        </Link>
      </li>
    </button>
  );
}
