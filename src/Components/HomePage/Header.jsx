import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useProducts } from "../useProducts";
import { useTotalQuantity } from "./TotalQuantityContext";
import { useTotalWish } from "./TotalWishQuantity";
import { BottomDrawer } from "./BottomDrawer";
import SearchList from "./SearchList";
import SearchItems from "./SearchItems";
import NoResult from "./NoResult";
import SideBar from "./SideBar";

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
function SmallHeader({ isSideBarOpen, setIsSideBarOpen, children }) {
  return (
    <>
      <div className="logo-container w-full    flex justify-between items-center lg:hidden ">
        <button
          className="basis-0 md:basis-24"
          onClick={() => setIsSideBarOpen((open) => !open)}
        >
          <i className="bx bx-menu-alt-left md:text-3xl text-[1.3rem] "></i>
        </button>
        <Logo
          src="/logo.png"
          alt="Smart-Cart"
          className="md:w-24 md:h-24  logo left-[12px] md:left-0 relative"
        />
        {children}
      </div>
    </>
  );
}
function SearchContainer({ children, products, open, setOpen }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchedProducts =
    searchQuery.length > 0
      ? products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : products.slice(0, 10);

  function handleSearchOpen() {
    setSearchOpen((searchOpen) => !searchOpen);
  }

  function handleUserSearch(e) {
    e.preventDefault();
    setSearchQuery(e.target.value);
  }

  function handleInputBlur() {
    // Only close the dropdown menu on desktop, not the mobile drawer
    setTimeout(() => {
      setSearchOpen(false);
    }, 200);
  }

  function handleDrawer() {
    setOpen((open) => !open);
  }

  // }
  return (
    <div className="search lg:grid lg:grid-cols-3 ">
      <Logo
        src="/logo.webp"
        alt="Smart-Cart"
        className="w-24 h-24  logoLG hidden lg:flex "
      />
      <div className="searchBar overflow-visible relative flex justify-center items-center">
        {/* Button for Small/Medium Screens */}

        <form
          id="searchForm"
          className="searchBar relative flex justify-center items-center"
        >
          <input
            type="text"
            placeholder="Search Products"
            className="searchInput w-[13rem] hidden lg:flex  p-2.5 bg-white outline-none md:w-[50%] lg:w-full h-12 lg:rounded-lg rounded-l-lg shadow "
            onBlur={handleSearchOpen}
            onChange={handleUserSearch}
            onFocus={handleSearchOpen}
          />
          <button
            type="button"
            className="searchInput text-gray-400 font-normal w-[13rem] lg:hidden  p-2.5 bg-white outline-none md:w-[50%] lg:w-full h-12 lg:rounded-lg rounded-l-lg shadow flex items-center"
            onClick={handleDrawer}
            disabled={open}
          >
            Search Products
          </button>
          <button
            type="submit"
            className="searchButton lg:absolute right-0 h-12 rounded-r-lg  w-[4rem] md:w-12 flex justify-center items-center"
            onClick={(e) => e.preventDefault()}
          >
            <i className="bx bx-search text-black"></i>
          </button>

          <SearchMenu searchOpen={searchOpen}>
            <SearchList>
              {/* searchedProducts.length === 0 this means that what users entered isn't in out ptoducts so the searchedProducts will be empty so it's length is 0*/}
              {searchQuery.length > 0 && searchedProducts.length === 0 ? (
                <NoResult />
              ) : (
                searchedProducts.map((product) => (
                  <SearchItems
                    img={product.imageUrl}
                    name={product.name}
                    unit={product.unit}
                    key={product.id}
                    price={product.price}
                    offers={product.offers}
                  />
                ))
              )}
            </SearchList>
          </SearchMenu>
        </form>
        <BottomDrawer open={open} setOpen={setOpen} />

        {/* <div className="absolute top-[72%] left-0 right-0 z-51">
          <SearchMenu />
        </div> */}
      </div>
      {children}
    </div>
  );
}

function SearchMenu({ children, searchOpen }) {
  return (
    <div
      className={`searchMenu rounded-[10px] w-[844px] h-[573px] z-[51] right-0 absolute top-full 
      overflow-y-auto shadow-lg rounded-b-lg hidden lg:block
      ${
        searchOpen
          ? "opacity-100 max-h-[573px] transition-all duration-500 ease-linear "
          : "opacity-0 max-h-0 pointer-events-none transition-all duration-500 ease-linear"
      }`}
    >
      {/* <SearchList /> */}
      {children}
    </div>
  );
}

function LowCategories({ isSideBarOpen, setIsSideBarOpen, products }) {
  // const [categoryDrawerOpen, setCategoryDrawerOpen] = useState(false);

  const productsCategories = products
    .reduce((arr, product) => {
      if (!arr.map((el) => el.category).includes(product.category)) {
        return [...arr, { category: product.category }];
      } else return arr;
    }, [])
    .slice(0, 4);
  // console.log(productsCategories);
  return (
    // <div className="containerr low sticky top-0 z-50">
    <div className="containerr low sticky top-0 z-50">
      <div className="lower-header hidden lg:flex  items-center">
        <ul className="categories lg:flex justify-center items-center gap-12 hidden  ">
          <li className="min-w-max">
            <button
              // onClick={() => setOpen((open) => !open)}
              onClick={() => setIsSideBarOpen(true)}
              className="flex justify-center items-center gap-1 !cursor-pointer"
            >
              <i className="bx bx-menu-alt-left"></i>
              All Categories
            </button>
          </li>
          {productsCategories.map((category) => (
            <FirstCategory
              key={category.category}
              category={category.category}
            />
          ))}

          <li className="min-w-max flex justify-center items-center">
            <a href="#" className="flex justify-center items-center gap-1">
              <i className="bx bxs-offer "></i>
              Deals
            </a>
          </li>
        </ul>
      </div>
      {/* <BottomDrawer open={open} setOpen={setOpen} />*/}
      <SideBar isOpen={isSideBarOpen} setIsOpen={setIsSideBarOpen} />
    </div>
  );
}

function FirstCategory({ category }) {
  return (
    <li className="min-w-max">
      <a href="#">{category}</a>
    </li>
  );
}

function IconsGroup({ className, navigate }) {
  const { totalQuantity } = useTotalQuantity();
  const { totalWish } = useTotalWish();
  // console.log(totalWish, totalQuantity);

  return (
    <div
      className={` ${className} icons  flex justify-end items-center  gap-2.5`}
    >
      <div>
        <i
          onClick={() => navigate(-1)}
          className="bx bx-user md:text-3xl text-[1.3rem] cursor-pointer"
        ></i>
      </div>

      <div className="relative cart text-center">
        <i className="bx bx-heart md:text-3xl text-[1.3rem] cursor-pointer"></i>
        {totalWish > 0 && <Value value={totalWish} />}
      </div>
      <div className="relative cart text-center">
        <i className="bx bx-cart md:text-3xl text-[1.3rem] cursor-pointer"></i>
        {totalQuantity > 0 && <Value value={totalQuantity} />}
      </div>
    </div>
  );
}

function Value({ value }) {
  // console.log(`Total is: ${totalQuantity}`);

  return (
    <span className="value md:w-[1.1rem] md:h-[1.1rem] md:left-4 md:top-[-2px] absolute lg:w-[1.2rem] lg:h-[1.2rem] flex items-center justify-center  text-center rounded-[50%] left-5 top-[-3px] text-white ">
      {value}
    </span>
  );
}

function Logo({ className, src, alt }) {
  return (
    <img
      loading="lazy"
      src={src}
      alt={alt}
      className={`p-2 m-2.5 w-16 h-16  ${className}`}
    />
  );
}

export default Header;
