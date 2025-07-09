// // src/WebSockets/SocketManager.jsx
// import { useEffect } from "react";
// import { setupScannerListener } from "./Sockethandler";
// import { useProductsContext } from "../Components/HomePage/ProductsContext";

// function SocketManager({ onScan }) {
//   const { products } = useProductsContext();

//   console.log("products", products);

//   useEffect(() => {
//     setupScannerListener(products);
//   }, [products]);

//   return null; // doesn't render UI
// }

// export default SocketManager;

// import { useEffect } from "react";
// import { setupScannerListener } from "./Sockethandler";
// import { useProductsContext } from "../Components/HomePage/ProductsContext";

// function SocketManager() {
//   const { products } = useProductsContext();

//   useEffect(() => {
//     if (products && products.length > 0) {
//       setupScannerListener(products);
//     }
//   }, [products]);

//   return null; // no UI
// }

// export default SocketManager;

import { useEffect, useState } from "react";
import { setupScannerListener } from "./Sockethandler";
import { useProductsContext } from "../Components/HomePage/ProductsContext";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useCartContext } from "../Components/Cart/CartContext";
import ScanPopup from "./ScanPopUp";

function SocketManager() {
  const { products } = useProductsContext();
  const { user } = useUser();
  const { getToken } = useAuth();
  const { cartItems, fetchCart } = useCartContext();
  const [scannedProduct, setScannedProduct] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      setupScannerListener(
        products,
        user,
        cartItems,
        fetchCart,
        getToken,
        (product) => {
          setScannedProduct(product); // ✅ show popup
          //   setTimeout(() => setScannedProduct(null), 4000); // optional auto-close
        },
        setRecommendations // ✅ pass to handler
      );
    }
  }, [products, user, cartItems]);

  return (
    <>
      {scannedProduct && (
        <ScanPopup
          product={scannedProduct}
          onClose={() => setScannedProduct(null)}
          recommendations={recommendations} // ✅ add this prop
          allProducts={products} // pass all products if needed
        />
      )}
    </>
  );
}

export default SocketManager;
