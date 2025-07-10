import TrueFocus from "../TextAnimations/TrueFocus/TrueFocus";
// import { useProducts } from "../useProducts";
import { useProductsContext } from "../HomePage/ProductsContext";

// import Category from "./Category";
import { lazy, Suspense, useMemo } from "react";
import Loader from "../Loader";

const Category = lazy(() => import("./Category"));
function CategorySection() {
  const { products } = useProductsContext();

  const newProduct = useMemo(() => {
    if (!products || products.length === 0) return []; // Don't compute categories if products are null

    return products.reduce((arr, product) => {
      // Special case: If category is "Meat", only include product with id = 11
      if (product.category === "Meat & Poultry") {
        const hasMeatId11 = arr.some((el) => el.category === "Meat & Poultry");
        if (!hasMeatId11 && product.id === 11) {
          return [
            ...arr,
            {
              category: product.category,
              name: product.name,
              imageUrl: product.imageUrl,
              id: product.id,
            },
          ];
        }
      } else if (product.category === "Dairy, Eggs & Cheese") {
        const hasCheese = arr.some(
          (el) => el.category === "Dairy, Eggs & Cheese"
        );

        if (!hasCheese && product.id === 5) {
          return [
            ...arr,
            {
              category: product.category,
              name: product.name,
              imageUrl: product.imageUrl,
              id: product.id,
            },
          ];
        }
      }
      // General case: Add product if category is not already in arr
      else {
        const categoryExists = arr.some(
          (el) => el.category === product.category
        );
        if (!categoryExists) {
          return [
            ...arr,
            {
              category: product.category,
              name: product.name,
              imageUrl: product.imageUrl,
              id: product.id,
            },
          ];
        }
      }

      return arr;
    }, []);
  }, [products]); // Recompute when products change

  // 🚫 Don't render anything until products are fetched
  if (products === null) {
    return null; // Skip rendering until products are fetched
  }
  // if (isLoading) return <h1>Loading...</h1>;

  return (
    <section className="categorySection ">
      <h2 className="main-title text-2xl font-bold text-center">
        <TrueFocus
          borderColor="#aa8cee"
          manualMode={true}
          sentence="Featured Categories"
        />

        {/* Featured Categories */}
      </h2>
      <div className="containerr grid grid-cols-4 lg:grid lg:grid-cols-8 gap-x-4">
        {newProduct.map((product) => (
          <Suspense fallback={<Loader />} key={product.id}>
            <Category product={product} key={product.id} />
          </Suspense>
        ))}
      </div>
    </section>
  );
}

export default CategorySection;
