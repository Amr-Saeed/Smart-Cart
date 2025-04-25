import { useEffect, useState, useMemo, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import Header from "../Components/HomePage/Header/Header";
import LowCategories from "../Components/HomePage/Header/LowCategories";

import { useProductsContext } from "../Components/HomePage/ProductsContext";
// import Footer from "../Footer";
// import MayAlsoLike from "./MayAlsoLike";
// import ProductInfo from "./ProductInfo";

const ProductInfo = lazy(() =>
  import("../Components/HomePage/Product/ProductInfo")
);
const MayAlsoLike = lazy(() =>
  import("../Components/HomePage/Product/MayAlsoLike")
);
const Footer = lazy(() => import("../Components/HomePage/Footer"));

function Product() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const [currentProduct, setCurrentProduct] = useState({});
  const { products } = useProductsContext();

  // const [isAddCart, setIsAddCart] = useState(true);

  async function getProduct(id) {
    try {
      setIsLoading(true);
      const res = await fetch(
        `https://smartcart.tryasp.net/api/TodoItems/get-by-id/${id}`
      );
      const data = await res.json();
      setCurrentProduct(data);
    } catch {
      console.log("Error fetching products");
    } finally {
      setIsLoading(false);
      // hasFetched.current = true; // Mark fetch as complete
    }
  }
  if (!currentProduct) return <h1>Product not found</h1>;

  const relatedProducts = useMemo(() => {
    return products.filter(
      (product) =>
        product.category === currentProduct.category &&
        product.id !== currentProduct.id
    );
  }, [products, currentProduct]);
  console.log("currentProduct", currentProduct);
  useEffect(
    function () {
      console.log("i got fetched");
      getProduct(id);
    },
    [id]
  );

  console.log("currentProduct", currentProduct);
  // const {
  //   name,
  //   description,
  //   imageUrl,
  //   price,
  //   stockAvailability,
  //   unit,
  //   offers,
  // } = currentProduct;

  if (isLoading) return <h1>Loading..</h1>;
  console.log(relatedProducts);
  return (
    <>
      <Header />
      <LowCategories />
      <Suspense fallback={<h1>Loading...</h1>}>
        <ProductInfo currentProduct={currentProduct} id={id} />

        <MayAlsoLike relatedProducts={relatedProducts} />
        <Footer />
      </Suspense>
    </>
  );
}

export default Product;
