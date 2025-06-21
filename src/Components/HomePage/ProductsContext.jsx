import { createContext, useContext, useState, useMemo, useEffect } from "react";

const ProductsContext = createContext();

function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  console.log("products", products);

  useEffect(function () {
    async function fetchProducts() {
      try {
        // setIsLoading(true);
        const res = await fetch(
          "https://nutrigeen.com/api/products" //https://nutrigeen.com/api/products  //https://smartcart.tryasp.net/api/TodoItems/showAll
        );
        const data = await res.json();
        setProducts(data);
      } catch {
        console.log("Error fetching products");
      } finally {
        // setIsLoading(false);
        // hasFetched.current = true; // Mark fetch as complete
      }
    }

    fetchProducts();
  }, []); // Only run on mount

  console.log("Products fetched successfully:", products);

  const contextValue = useMemo(() => ({ products, setProducts }), [products]);

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
}

function useProductsContext() {
  const context = useContext(ProductsContext);
  if (context === undefined)
    throw new Error("ProductsContext was used outside of ProductsProvider");
  return context;
}

export { ProductsProvider, useProductsContext };
