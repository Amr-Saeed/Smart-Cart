export function CategoriesItems({ product }) {
  return (
    <button>
      <li key={product.id} className="flex items-center gap-3">
        <img
          loading="lazy"
          src={product.imageUrl}
          alt={product.name}
          className="w-20 h-20 object-contain rounded-lg"
        />
        <span className="text-[var(--main-color)] font-bold">
          {product.name}
        </span>
      </li>
    </button>
  );
}
