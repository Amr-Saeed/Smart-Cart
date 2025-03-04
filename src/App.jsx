import { BrowserRouter, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import { Route } from "react-router-dom";
import BoxRegister from "./Components/Login/BoxRegister";
// import SignUp from "./Pages/SignUp";
import HomePage from "./Pages/HomePage";
import { createContext, useEffect, useState } from "react";
import { QunatityProvider } from "./Components/HomePage/TotalQuantityContext";
import { WishProvider } from "./Components/HomePage/TotalWishQuantity";

// export const ProductsContext = createContext();
function App() {
  return (
    <WishProvider>
      <QunatityProvider>
        <BrowserRouter>
          <Routes>
            {/* <Route index element={<Login />} /> */}
            <Route index element={<HomePage />} />
            {/* <Route path="/HomePage" element={<HomePage />} /> */}
          </Routes>
        </BrowserRouter>
      </QunatityProvider>
    </WishProvider>
  );

  // <HomePage />;

  // {/* <Login /> */}
}

export default App;
