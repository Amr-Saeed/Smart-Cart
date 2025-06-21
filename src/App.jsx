import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
  Routes,
} from "react-router-dom";
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
import AppLayout from "./Components/AppLayout";
import { TokenProvider } from "./Components/TokenContext";
import { CartProvider } from "./Components/Cart/CartContext";
import { WishListProvider } from "./Components/WishList/WishListContext";
import QRCode from "./Pages/QRCode";
import ControlPage from "./Pages/Control";

const Product = lazy(() => import("./Pages/Product"));

const Cart = lazy(() => import("./Pages/Cart"));

// export const ProductsContext = createContext();
function App() {
  const { user, isLoaded } = useUser(); // Get the current user

  // If the user data is not loaded yet, you can show a loading spinner or something else
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  console.log(user);

  // Check if the user has an "admin" role
  const isAdmin = user?.publicMetadata?.example === "admin"; // Assuming 'example' stores the role
  // console.log(isAdmin);

  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/HomePage",
          element: <HomePage />,
        },
        {
          path: "/Cart",
          element: <Cart />,
        },
        {
          path: "/product/:id", // 👈 fixed
          element: <Product />,
        },
        {
          path: "/wishlist",
          element: <WishList />,
        },

        {
          path: "/category/:category",
          element: <Category />,
        },
        {
          path: "/scan",
          element: <QRCode />,
        },
        {
          path: "/control",
          element: <ControlPage />,
        },
      ],
    },
    {
      path: "/",
      element: user ? (
        isAdmin ? (
          <Navigate to="/DashBoard" />
        ) : (
          <Navigate to="/HomePage" />
        )
      ) : (
        <CustomSignIn />
      ),
    },
    {
      path: "/sign-up",
      element: <CustomSignUp signInUrl="/" redirectUrl="/HomePage" />,
    },
    {
      path: "/DashBoard",
      element: isAdmin ? <DashBoard /> : <Navigate to="/" />,
    },
  ]);

  return (
    <CartProvider>
      <TokenProvider>
        <WishListProvider>
          <WishProvider>
            <QunatityProvider>
              <ProductsProvider>
                <Suspense fallback={<div>Loading...</div>}>
                  <RouterProvider router={router} />
                </Suspense>
              </ProductsProvider>
            </QunatityProvider>
          </WishProvider>
        </WishListProvider>
      </TokenProvider>
    </CartProvider>
  );

  // <HomePage />;

  // {/* <Login /> */}
}

export default App;
