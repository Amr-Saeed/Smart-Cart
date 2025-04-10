import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import { QunatityProvider } from "./Components/HomePage/TotalQuantityContext";
import { WishProvider } from "./Components/HomePage/TotalWishQuantity";
// import Product from "./Components/HomePage/Product/Product";
import Login from "./Pages/Login";
import { lazy, Suspense } from "react";
import { ProductsProvider } from "./Components/HomePage/ProductsContext";
import DashBoard from "./Pages/DashBoard";

const Product = lazy(() => import("./Components/HomePage/Product/Product"));

// export const ProductsContext = createContext();
function App() {
  return (
    <WishProvider>
      <QunatityProvider>
        <ProductsProvider>
          <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                {/* <Route index element={<Login />} /> */}
                {/* <Route path="/HomePage" element={<HomePage />} /> */}
                {/* <Route path="HomePage/:id" element={<Product />} /> */}
                {/* <Route index element={<HomePage />} />
                <Route path="/:id" element={<Product />} /> */}
                <Route index element={<DashBoard />} />
                {/* path="/DashBoard" */}
                {/* <Route path="/HomePage" element={<HomePage />} /> */}
              </Routes>
            </Suspense>
          </BrowserRouter>
        </ProductsProvider>
      </QunatityProvider>
    </WishProvider>
  );

  // <HomePage />;

  // {/* <Login /> */}
}

export default App;
