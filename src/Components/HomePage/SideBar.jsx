import { memo, useMemo, useState, useEffect } from "react";
import { HiOutlineX } from "react-icons/hi";
import { SideCategories } from "./SideCategories";

function SideBar({ isOpen, setIsOpen, products }) {
  console.log("👀 SideBar component loaded");

  const AllCAtegories = useMemo(() => {
    if (!products || products.length === 0) return []; // Don't compute categories if products are null

    return products.reduce((arr, product) => {
      const categoryName = product.category.replace(/ and /g, " & ");

      if (categoryName === "Meat & Poultry") {
        const hasMeatId11 = arr.some((el) => el.category === "Meat & Poultry");
        if (!hasMeatId11 && product.id === 11) {
          return [
            ...arr,
            {
              category: categoryName,
              img: product.imageUrl,
            },
          ];
        }
      } else if (categoryName === "Fruits & Vegetables") {
        const hasCheese = arr.some(
          (el) => el.category === "Fruits & Vegetables"
        );
        if (!hasCheese && product.id === 7) {
          return [
            ...arr,
            {
              category: categoryName,
              img: product.imageUrl,
            },
          ];
        }
      } else if (!arr.map((el) => el.category).includes(categoryName)) {
        return [...arr, { category: categoryName, img: product.imageUrl }];
      }

      return arr;
    }, []);
    // Only recompute when `products` changes
  }, [products]); // Memoize the categories to avoid unnecessary recalculations

  //Let's Take Products Depending on Category
  const categoryProducts = useMemo(() => {
    if (!products || products.length === 0) return []; // Don't compute categories if products are null
    return AllCAtegories.map((cat) => ({
      category: cat.category,
      products: products.filter(
        (product) => product.category.replace(/ and /g, " & ") === cat.category
      ),
    }));
  }, [AllCAtegories, products]); // Memoize the category products to avoid unnecessary recalculations
  // Only recompute when `AllCAtegories` or `products` changes

  if (products === null) {
    return null; // Skip rendering until products are fetched
  }
  console.log("👀 SideBar component loadedssssssss");

  return (
    <div className={`drawer ${isOpen ? "open" : ""}`}>
      <div className="drawer-content">
        {/* Sidebar Overlay to Close Drawer */}
        {isOpen && (
          <div
            className="drawer-overlay fixed inset-0 "
            onClick={() => setIsOpen(false)}
          ></div>
        )}

        {/* Sidebar Content */}
        <div
          className={`drawer-side w-full max-h-screen overflow-y-scroll !p-10 lg:w-[40%] md:w-[60%] bg-base-200 text-base-content min-h-full fixed top-0 left-0 transition-transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <header className="sideBarHeader ">
            <button
              className="w-full h-14 flex items-center justify-end "
              onClick={() => setIsOpen(false)}
            >
              {/* <i className="bx bx-x text-3xl"></i> */}
              <HiOutlineX className="bx bx-x text-3xl" />
            </button>
            <div className="sideBarContent">
              <h2 className="text-[1.4rem] text-[var(--main-color-2)] font-extrabold !mb-[5px]">
                Start Shopping!
              </h2>
              <h3 className="text-gray-700 font-normal text-sm !mb-8">
                By Categories
              </h3>
            </div>
          </header>

          <nav>
            <ul className="menu flex-col flex items-center w-full">
              {AllCAtegories.map((category) => (
                <SideCategories
                  key={category.category}
                  category={category}
                  categoryProducts={categoryProducts}
                />
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
export default memo(SideBar); // Use memo to prevent unnecessary re-renders Sidebar;
