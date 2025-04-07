// // import { useEffect, useState } from "react";

// // export function useProducts() {
// //   const [products, setProducts] = useState([]);
// //   const [isLoading, setIsLoading] = useState(false);
// // console.log("useProducts called");

// //   useEffect(function () {
// //     // const controller = new AbortController();

// //     async function fetchProducts() {
// //       try {
// //         setIsLoading(true);
// //         const res = await fetch(
// //           "https://smartcart.tryasp.net/api/TodoItems/showAll"
// //         );

// //         // if (!res.ok) throw new Error("Something went wrong");

// //         const data = await res.json();
// //         // console.log(data);

// //         // if (data.Response === "False") throw new Error("movie not Found");

// //         setProducts(data);
// //         // console.log(Products);
// //       } catch {
// //         console.log("error");
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     }

// //     fetchProducts();

// //     // return function () {
// //     //   controller.abort();
// //     // };
// //   }, []);

// //   return { products, isLoading };
// // }
// import { useEffect, useState, useRef } from "react";

// export function useProducts() {
//   const [products, setProducts] = useState(null); // Initialize with null to indicate loading state
//   const [isLoading, setIsLoading] = useState(false);
//   const hasFetched = useRef(false); // Track if data has been fetched

//   useEffect(() => {
//     if (hasFetched.current) return; // Skip fetching if already done
//     console.log("useProducts called from useProducts.jsx");
//     const fetchProducts = async () => {
//       try {
//         setIsLoading(true);
//         const res = await fetch(
//           "https://smartcart.tryasp.net/api/TodoItems/showAll"
//         );
//         const data = await res.json();
//         setProducts(data);
//       } catch {
//         console.log("Error fetching products");
//       } finally {
//         setIsLoading(false);
//         hasFetched.current = true; // Mark fetch as complete
//       }
//     };

//     fetchProducts();
//   }, []); // Only run on mount

//   return { products, isLoading };
// }
