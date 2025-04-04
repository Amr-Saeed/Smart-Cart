import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
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
