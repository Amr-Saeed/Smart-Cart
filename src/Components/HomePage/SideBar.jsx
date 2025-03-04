import { useState } from "react";
import { useProducts } from "../useProducts";
import { img } from "framer-motion/client";

export default function Sidebar({ isOpen, setIsOpen }) {
  const [accordionOpen, setAccordionOpen] = useState(false);

  const { products } = useProducts();

  // const AllCAtegories = products.reduce((arr, product) => {
  //   // Special case: If category is "Meat", only include product with id = 11
  //   if (product.category === "Meat & Poultry") {
  //     const hasMeatId11 = arr.some((el) => el.category === "Meat & Poultry");
  //     if (!hasMeatId11 && product.id === 11) {
  //       return [
  //         ...arr,
  //         {
  //           category: product.category,
  //           img: product.imageUrl,
  //         },
  //       ];
  //     }
  //   } else if (product.category === "Fruits & Vegetables") {
  //     const hasCheese = arr.some((el) => el.category === "Fruits & Vegetables");

  //     if (!hasCheese && product.id === 7) {
  //       return [
  //         ...arr,
  //         {
  //           category: product.category,
  //           img: product.imageUrl,
  //         },
  //       ];
  //     }
  //   } else if (!arr.map((el) => el.category).includes(product.category)) {
  //     return [...arr, { category: product.category, img: product.imageUrl }];
  //   }
  //   return arr;
  // }, []);

  const AllCAtegories = products.reduce((arr, product) => {
    // Replace " and " with " & " in category names
    const categoryName = product.category.replace(/ and /g, " & ");

    // Special case: If category is "Meat & Poultry", only include product with id = 11
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
      const hasCheese = arr.some((el) => el.category === "Fruits & Vegetables");
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

  //Let's Take Products Depending on Category
  const categoryProducts = AllCAtegories.map((cat) => ({
    category: cat.category,
    products: products.filter(
      (product) => product.category.replace(/ and /g, " & ") === cat.category
    ),
  }));

  console.log(`categoryProducts`, categoryProducts);
  // const productsByCategory = AllCAtegories.reduce((arr, category) => {
  //   return [
  //     ...arr,
  //     {
  //       ...category,
  //       products: products.filter(
  //         (product) => product.category === category.category
  //       ),
  //     },
  //   ];
  // }, []);
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
              <i className="bx bx-x text-3xl"></i>
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
                  accordionOpen={accordionOpen}
                  setAccordionOpen={setAccordionOpen}
                />
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

function SideCategories({
  category,
  categoryProducts,
  accordionOpen,
  setAccordionOpen,
}) {
  const isOpen = accordionOpen === category.category;
  // Find the matching products for this category
  const categoryData = categoryProducts.find(
    (cat) => cat.category === category.category
  );
  const productsList = categoryData ? categoryData.products : [];
  console.log(`productsList`, productsList);
  return (
    <li className="menu-item !pr-4 !pl-4  rounded-2xl md:w-full !mb-[55px] w-[130%]">
      <button
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
              <CategoriesItems key={product.id} product={product} />
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No products available</p>
        ))}
    </li>
  );
}

function CategoriesItems({ product }) {
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
