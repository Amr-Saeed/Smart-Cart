import "./home.css";
import Header from "../Components/HomePage/Header/Header";
// import Slider from "../Components/HomePage/Slider";
import CategorySection from "../Components/HomePage/CategorySection";
import EveryDayNeeds from "../Components/HomePage/EveryDayNeeds";
import BestDeals from "../Components/HomePage/BestDeals";
import Footer from "../Components/HomePage/Footer";
import LandingSection from "../Components/HomePage/LandingSection";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProductsProvider } from "../Components/HomePage/ProductsContext";

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
    <ProductsProvider>
      <Header />
      <LandingSection />
      {/* <Slider /> */}
      <CategorySection />
      <EveryDayNeeds />
      {/* <CategorySection /> */}
      <BestDeals />
      <Footer />
    </ProductsProvider>
  );
}

export default HomePage;
