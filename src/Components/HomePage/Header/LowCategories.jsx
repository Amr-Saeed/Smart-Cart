import { BiSolidOffer } from "react-icons/bi";
import { HiMenuAlt2 } from "react-icons/hi";
import FirstCategory from "./FirstCategory";
import { memo, useMemo, useEffect, useState } from "react";

function LowCategories({ children, setIsSideBarOpen, products }) {
  // const [categoryDrawerOpen, setCategoryDrawerOpen] = useState(false);

  // Always call useMemo
  const productsCategories = useMemo(() => {
    if (!products || products.length === 0) return []; // Don't compute categories if products are null

    return products
      .reduce((arr, product) => {
        if (!arr.map((el) => el.category).includes(product.category)) {
          return [...arr, { category: product.category }];
        } else return arr;
      }, [])
      .slice(0, 4);
  }, [products]); // Recalculate only when products change

  // 🚫 Don't render anything until products are fetched
  if (!products || products.length === 0) {
    return null; // Skip rendering until products are fetched
  }

  return (
    // <div className="containerr low sticky top-0 z-50">
    <div className="containerr low sticky top-0 z-50">
      <div className="lower-header hidden lg:flex  items-center">
        <ul className="categories lg:flex justify-center items-center gap-12 hidden  ">
          <li className="min-w-max text-[var(--category-color)] font-bold">
            <button
              // onClick={() => setOpen((open) => !open)}
              onClick={() => setIsSideBarOpen(true)}
              className="flex justify-center items-center gap-1 !cursor-pointer"
            >
              {/* <i className="bx bx-menu-alt-left"></i> */}
              <HiMenuAlt2 className="bx bx-menu-alt-left " />
              All Categories
            </button>
          </li>
          {productsCategories.map((category) => (
            <FirstCategory
              key={category.category}
              category={category.category}
            />
          ))}

          <li className="min-w-max flex justify-center items-center text-[#b8a6e3] font-bold">
            <a href="#" className="flex justify-center items-center gap-1">
              {/* <i className="bx bxs-offer "></i> */}
              <BiSolidOffer className="bxs-offer" />
              Deals
            </a>
          </li>
        </ul>
      </div>
      {children}
    </div>
  );
}

export default memo(LowCategories); // Use memo to prevent unnecessary re-renders LowCategories;
