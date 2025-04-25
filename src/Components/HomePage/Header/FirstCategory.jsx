import { memo } from "react";
import { Link } from "react-router-dom";

function FirstCategory({ category }) {
  return (
    <li className="min-w-max text-[var(--category-color)] font-bold">
      <Link
        to={`/${category}`}
        className="min-w-max text-[var(--category-color)] font-bold"
      >
        <span href="#">{category}</span>
      </Link>
    </li>
  );
}

export default memo(FirstCategory); // Use memo to prevent unnecessary re-renders
