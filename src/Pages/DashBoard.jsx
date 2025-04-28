import DashSideBar from "../Components/DashBoard/DashSideBar";
import DashHome from "../Components/DashBoard/DashHome";
import { useState, useMemo } from "react";
import { useProductsContext } from "../Components/HomePage/ProductsContext";
// const defaultProduct = {
//   name: "",
//   price: "",
//   offers: "",
//   inStock: "",
//   unit: "",
//   imageUrl: "",
//   category: "",
// };

const defaultProduct = {
  name: "",
  price: "",
  unit: "",
  category: "",
  stockAvailability: true, // assuming default is true, can change based on logic
  inStock: 0, // assuming default is 0, can change based on logic
  description: "",
  rating: 1.0, // default rating, you can modify as needed
  offers: 0, // default offers, can be modified later
  bestDeal: false, // assuming it's false by default
  topSelling: false, // assuming it's false by default
  everydayNeeds: false, // assuming it's false by default
  barcode: "", // default empty, can be filled later
  new_arrival: false, // assuming it's false by default
};
function DashBoard() {
  const [product, setProduct] = useState(defaultProduct);
  const [selectedCategory, setSelectedCategory] = useState("");
  function handleCategoryChange(category) {
    console.log("Selected categorssssssssssssy:", category);
    setSelectedCategory(category);
  }

  const { products } = useProductsContext();

  return (
    <div className="flex ">
      <DashSideBar
        product={product}
        products={products}
        selectedCategory={selectedCategory}
        handleCategoryChange={handleCategoryChange}
        setProduct={setProduct}
        defaultProduct={defaultProduct}
      />
      <DashHome
        product={product}
        products={products}
        selectedCategory={selectedCategory}
        handleCategoryChange={handleCategoryChange}
        defaultProduct={defaultProduct}
        setProduct={setProduct}
      />
    </div>
  );
}

export default DashBoard;
