import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import { QunatityProvider } from "./Components/HomePage/TotalQuantityContext";
import { WishProvider } from "./Components/HomePage/TotalWishQuantity";
// import Product from "./Components/HomePage/Product/Product";
// import Login from "./Pages/Login";
import { lazy, Suspense } from "react";
import { ProductsProvider } from "./Components/HomePage/ProductsContext";
import DashBoard from "./Pages/DashBoard";
import WishList from "./Pages/WishList";
import { SignIn, useUser, SignUp } from "@clerk/clerk-react";
import CustomSignIn from "./Pages/CustomSignIn";
import { Navigate } from "react-router-dom";
import CustomSignUp from "./Pages/CustomSignUp";
import Category from "./Pages/Category";

const Product = lazy(() => import("./Pages/Product"));

const Cart = lazy(() => import("./Pages/Cart"));

// export const ProductsContext = createContext();
function App() {
  // const { user, isLoaded } = useUser(); // Get the current user

  // // If the user data is not loaded yet, you can show a loading spinner or something else
  // if (!isLoaded) {
  //   return <div>Loading...</div>;
  // }
  // console.log(user);

  // // Check if the user has an "admin" role
  // const isAdmin = user?.publicMetadata?.example === "admin"; // Assuming 'example' stores the role
  // console.log(isAdmin);
  return (
    <WishProvider>
      <QunatityProvider>
        <ProductsProvider>
          <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                {/* <Route
                  index
                  element={
                    user ? (
                      isAdmin ? (
                        <Navigate to="/DashBoard" />
                      ) : (
                        <Navigate to="/HomePage" />
                      )
                    ) : (
                      <CustomSignIn />
                    )
                  }
                /> */}
                {/* Sign Up Route */}
                {/* <Route
                  path="/sign-up"
                  element={
                    <CustomSignUp signInUrl="/" redirectUrl="/HomePage" />
                  } // Redirect to SignIn when "Sign In" is clicked
                /> */}
                <Route path="/" element={<HomePage />} />
                {/* <Route path="HomePage/:id" element={<Product />} /> */}

                <Route path="/:category" element={<Category />} />

                {/* <Route index element={<HomePage />} /> */}
                <Route path="/Cart" element={<Cart />} />
                {/* <Route path="/wishlist" element={<WishList />} /> */}

                {/* <Route path="/:id" element={<Product />} /> */}
                {/* <Route
                  path="/DashBoard"
                  element={isAdmin ? <DashBoard /> : <Navigate to="/" />}
                /> */}
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
