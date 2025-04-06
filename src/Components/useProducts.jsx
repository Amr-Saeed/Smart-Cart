import { useEffect, useState } from "react";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    // const controller = new AbortController();

    async function fetchProducts() {
      try {
        setIsLoading(true);
        const res = await fetch(
          "https://smartcart.tryasp.net/api/TodoItems/showAll"
        );

        // if (!res.ok) throw new Error("Something went wrong");

        const data = await res.json();
        // console.log(data);

        // if (data.Response === "False") throw new Error("movie not Found");

        setProducts(data);
        // console.log(Products);
      } catch {
        console.log("error");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();

    // return function () {
    //   controller.abort();
    // };
  }, []);

  return { products, isLoading };
}
