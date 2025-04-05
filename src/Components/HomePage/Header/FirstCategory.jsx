export function FirstCategory({ category }) {
  return (
    <li className="min-w-max text-[var(--category-color)] font-bold">
      <a href="#">{category}</a>
    </li>
  );
}
