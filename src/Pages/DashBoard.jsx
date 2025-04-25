import DashSideBar from "../Components/DashBoard/DashSideBar";
import DashHome from "../Components/DashBoard/DashHome";
import { useState, useMemo } from "react";
import { useProductsContext } from "../Components/HomePage/ProductsContext";
const defaultProduct = {
  name: "",
  price: "",
  offers: "",
  inStock: "",
  unit: "",
  imageUrl: "",
  category: "",
};
function DashBoard() {
  const [product, setProduct] = useState(defaultProduct);
  const [selectedCategory, setSelectedCategory] = useState("Water");
  function handleCategoryChange(category) {
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
