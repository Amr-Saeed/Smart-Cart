import { useNavigate } from "react-router-dom";
import { memo, useEffect, useState } from "react";
import IconsGroup from "./IconsGroup";
import SmallHeader from "./SmallHeader";
import SearchContainer from "./SearchContainer";
import LowCategories from "./LowCategories";
import { lazy, Suspense } from "react";
import { useProductsContext } from "../ProductsContext";
import { useAuth } from "@clerk/clerk-react";
import Loader from "../../Loader";
// import ScannerData from "../../../WebSockets/ScannerData";

const SideBar = lazy(() => import("../SideBar"));
function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); // State to control drawer visibility
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const { products } = useProductsContext();
  const { getToken } = useAuth();
  const token = getToken();
  console.log("token", token); // This will log the token to the console

  console.log("products", products);
  return (
    <header className=" w-full header sticky lg:relative top-0 z-50 shadow lg:shadow-none">
      <UpperContainer>
        {/* small header that appears in small screens */}
        <SmallHeader setIsSideBarOpen={setIsSideBarOpen}>
          <IconsGroup navigate={navigate} className="icons  mr-0 " />
        </SmallHeader>
        {/* Search Container is the same of the whole upper header that appears in large screens */}
        <SearchContainer open={open} setOpen={setOpen} products={products}>
          <IconsGroup
            navigate={navigate}
            className="iconsLG  lg:flex hidden "
          />
        </SearchContainer>
      </UpperContainer>
      <LowCategories setIsSideBarOpen={setIsSideBarOpen} products={products}>
        {isSideBarOpen && (
          <Suspense fallback={<Loader className="w-10 h-10 animate-spin" />}>
            <SideBar
              isOpen={isSideBarOpen}
              setIsOpen={setIsSideBarOpen}
              products={products}
            />
          </Suspense>
        )}
      </LowCategories>
    </header>
  );
}

const UpperContainer = memo(({ children }) => {
  return (
    <div className="containerr upper-header flex align-middle flex-col w- ">
      {children}
    </div>
  );
});

export default memo(Header);
