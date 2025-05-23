import { CategoriesItems } from "./CategoriesItems";
import { useMemo, useState } from "react";

export function SideCategories({ category, categoryProducts, setIsOpen }) {
  const [accordionOpen, setAccordionOpen] = useState(null); //Keeps track of which category is currently open.

  const isOpen = accordionOpen === category.category;

  // Find the matching products for this category
  const categoryData = useMemo(
    () =>
      categoryProducts.find(
        (cat) => cat.category.replace(/ and /g, " & ") === category.category
      ),
    [categoryProducts, category.category]
  );
  const productsList = useMemo(
    () => categoryData?.products || [],
    [categoryData]
  ); // Get the products list for this category
  // Check if the category has products
  return (
    <li className="menu-item !pr-4 !pl-4  rounded-2xl md:w-full !mb-[55px] w-[130%]">
      <button
        aria-label="open-category"
        className="bg-[var(--main-color)] w-full h-14 flex items-center gap-2.5 text-[1rem] md:text-[1.125rem] leading-5 font-bold text-[var(--main-color-2)] rounded-[18px]"
        onClick={() => setAccordionOpen(isOpen ? null : category.category)} // Open one, close others
      >
        <img
          loading="lazy"
          src={category.img}
          alt={category.category}
          className="md:w-[6rem] w-[4rem] object-contain translate-y-[-13%] "
        />
        {category.category}
      </button>
      {/* Accordion Content (Products List) */}
      {isOpen &&
        (productsList.length > 0 ? (
          <ul className=" shadow-2xl !p-4 rounded-2xl flex flex-col">
            {productsList.map((product) => (
              <CategoriesItems
                key={product.id}
                product={product}
                setIsOpen={setIsOpen}
              />
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No products available</p>
        ))}
    </li>
  );
}
