import SearchList from "../SearchList";
import SearchItems from "../SearchItems";
import NoResult from "../NoResult";
import { BottomDrawer } from "../BottomDrawer";
import { HiOutlineSearch } from "react-icons/hi";
import SearchBaring from "../SearchBaring";
import SearchMenu from "../Header/SearchMenu";
import Logo from "../Header/Logo";
import { useProducts } from "../../useProducts";
import { useState, useEffect, useCallback } from "react";
export default function SearchContainer({ children, open, setOpen }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { products } = useProducts();

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  console.log("SearchContainer re-rendered");

  useEffect(() => {
    // Define the media query
    const mediaQuery = window.matchMedia("(max-width: 1024px)");

    // Function to update the state based on the media query
    const handleResize = () => {
      setIsSmallScreen(mediaQuery.matches);
    };

    // Initial check
    handleResize();

    // Set up the listener for screen size changes
    mediaQuery.addEventListener("change", handleResize);

    // Clean up the listener on component unmount
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

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

  function handleDrawer() {
    setOpen((open) => !open);
  }

  const handleClose = useCallback(function handleClose(e) {
    e.stopPropagation(); // Prevents event bubbling
    e.preventDefault(); // Stops default behavior
    setOpen(false);
  }, []);

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
            className="searchInput w-[13rem] hidden lg:flex  p-2.5 bg-white outline-none md:w-[50%] lg:w-full h-12 lg:rounded-lg rounded-l-lg "
            onBlur={handleSearchOpen}
            onChange={handleUserSearch}
            onFocus={handleSearchOpen}
          />
          <button
            type="button"
            className="searchInput text-gray-400 font-normal w-[13rem] lg:hidden  p-2.5 bg-white outline-none md:w-[50%] lg:w-full h-12 lg:rounded-lg rounded-l-lg flex items-center"
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
            {/* <i className="bx bx-search text-black"></i> */}
            <HiOutlineSearch className="bx bx-search text-white font-bold stroke-[4]" />
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
        {isSmallScreen && (
          <BottomDrawer
            open={open}
            searchQuery2={searchQuery}
            searchedProducts2={searchedProducts}
          >
            <SearchBaring
              searchQuery2={searchQuery}
              setSearchQuery2={setSearchQuery}
              handleClose={handleClose}
            />
          </BottomDrawer>
        )}

        {/* <div className="absolute top-[72%] left-0 right-0 z-51">
            <SearchMenu />
          </div> */}
      </div>
      {children}
    </div>
  );
}
