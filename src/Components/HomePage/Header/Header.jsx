import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useProducts } from "../../useProducts";
import IconsGroup from "./IconsGroup";
import { SmallHeader } from "./SmallHeader";
import SearchContainer from "./SearchContainer";
import { LowCategories } from "./LowCategories";
function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); // State to control drawer visibility
  const { products } = useProducts();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  return (
    <header className=" w-full header sticky lg:relative top-0 z-50 shadow lg:shadow-none">
      <UpperContainer>
        {/* small header that appears in small screens */}
        <SmallHeader
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        >
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
      <LowCategories
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
        products={products}
      />
    </header>
  );
}

function UpperContainer({ children }) {
  return (
    <div className="containerr upper-header flex align-middle flex-col w- ">
      {children}
    </div>
  );
}

export default Header;
