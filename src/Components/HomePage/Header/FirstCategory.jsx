import { memo } from "react";

function FirstCategory({ category }) {
  return (
    <li className="min-w-max text-[var(--category-color)] font-bold">
      <a href="#">{category}</a>
    </li>
  );
}

export default memo(FirstCategory); // Use memo to prevent unnecessary re-renders
