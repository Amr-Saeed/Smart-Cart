import Header from "../Components/HomePage/Header/Header";
import LowCategories from "../Components/HomePage/Header/LowCategories";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MainCategory from "../Components/Category/MainCategory";

function Category() {
  const [currentCategoryProducts, setCurrentCategoryProducts] = useState([]);
  const { category } = useParams();

  async function getCategoryProducts(category) {
    try {
      const res = await fetch(
        `https://smartcart.tryasp.net/api/TodoItems/get-by-category/${category}`
      );

      const data = await res.json();
      setCurrentCategoryProducts(data);
    } catch (error) {
      console.log("Error fetching products", error);
    }
  }
  if (!currentCategoryProducts) return <h1>Product not found</h1>;

  useEffect(() => {
    getCategoryProducts(category);
  }, [category]);
  console.log("currentCategoryProductsssssss", currentCategoryProducts);
  return (
    <>
      <LowCategories />
      <div className="flex ">
        <MainCategory
          category={category}
          categoryProducts={currentCategoryProducts}
        />

        <div className="lg:basis-[30%] md:basis-[10%]"></div>
      </div>
    </>
  );
}

export default Category;
