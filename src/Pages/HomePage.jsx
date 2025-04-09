import "./home.css";
// import Header from "../Components/HomePage/Header/Header";
// import Slider from "../Components/HomePage/Slider";
// import CategorySection from "../Components/HomePage/CategorySection";
import EveryDayNeeds from "../Components/HomePage/EveryDayNeeds";
import BestDeals from "../Components/HomePage/BestDeals";
import Footer from "../Components/HomePage/Footer";
import LandingSection from "../Components/HomePage/LandingSection";

import { lazy, Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProductsProvider } from "../Components/HomePage/ProductsContext";

const Header = lazy(() => import("../Components/HomePage/Header/Header"));
const CategorySection = lazy(() =>
  import("../Components/HomePage/CategorySection")
);

function HomePage() {
  useEffect(() => {
    document.body.classList.add("Homebody");

    return () => {
      document.body.classList.remove("Homebody");
    };
  }, []);
  function handleNav() {
    navigate(-1);
  }
  return (
    // <ProductsProvider>
    <Suspense fallback={<div>Loading...</div>}>
      <Header />
      <LandingSection />
      <Suspense fallback={<div>Loading...</div>}>
        <CategorySection />
      </Suspense>
      <EveryDayNeeds />
      {/* <CategorySection /> */}
      <BestDeals />
      <Footer />
    </Suspense>
    // </ProductsProvider>
  );
}

export default HomePage;
