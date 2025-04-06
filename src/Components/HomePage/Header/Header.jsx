import { useNavigate } from "react-router-dom";
import { memo, useState } from "react";
import { useProducts } from "../../useProducts";
import IconsGroup from "./IconsGroup";
import SmallHeader from "./SmallHeader";
import SearchContainer from "./SearchContainer";
import LowCategories from "./LowCategories";
import { lazy, Suspense } from "react";

const SideBar = lazy(() => import("../SideBar"));
function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); // State to control drawer visibility
  const { products } = useProducts();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  console.log("Header re-rendered");
  return (
    <header className=" w-full header sticky lg:relative top-0 z-50 shadow lg:shadow-none">
      <UpperContainer>
        {/* small header that appears in small screens */}
        <SmallHeader setIsSideBarOpen={setIsSideBarOpen}>
          <IconsGroup navigate={navigate} className="icons  mr-0 " />
        </SmallHeader>
        {/* Search Container is the same of the whole upper header that appears in large screens */}
        <SearchContainer open={open} setOpen={setOpen}>
          <IconsGroup
            navigate={navigate}
            className="iconsLG  lg:flex hidden "
          />
        </SearchContainer>
      </UpperContainer>
      <LowCategories setIsSideBarOpen={setIsSideBarOpen} products={products}>
        {isSideBarOpen && (
          <Suspense fallback={<div>Loading...</div>}>
            <SideBar isOpen={isSideBarOpen} setIsOpen={setIsSideBarOpen} />
          </Suspense>
        )}
      </LowCategories>
    </header>
  );
}

const UpperContainer = memo(({ children }) => {
  console.log("UpperContainer re-rendered");

  return (
    <div className="containerr upper-header flex align-middle flex-col w- ">
      {children}
    </div>
  );
});

export default Header;
