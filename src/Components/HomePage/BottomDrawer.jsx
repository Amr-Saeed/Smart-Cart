"use client";

import { useState } from "react";
import SearchList from "./SearchList";
import { useProducts } from "../useProducts";
import SearchItems from "./SearchItems";
import NoResult from "./NoResult";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
} from "../ui/drawer";

export function BottomDrawer({ open, setOpen }) {
  const { products } = useProducts();
  const [searchQuery2, setSearchQuery2] = useState("");
  const searchedProducts2 =
    searchQuery2.length > 0
      ? products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery2.toLowerCase())
        )
      : products.slice(0, 10);

  // const handleClose = () => setOpen(false);
  function handleClose(e) {
    e.stopPropagation(); // Prevents event bubbling
    e.preventDefault(); // Stops default behavior
    setOpen(false);
  }

  return (
    <Drawer
      open={open}
      position="bottom"
      className=" lg:hidden block place-items-center !h-[100vh] max-h-[100vh]"
      style={{ backgroundColor: "#e6dbff" }}
    >
      <DrawerContent>
        <DrawerTitle>My Dialog</DrawerTitle>
        <DrawerDescription>This is the dialog description.</DrawerDescription>
        <SearchBaring
          searchQuery2={searchQuery2}
          setSearchQuery2={setSearchQuery2}
          handleClose={handleClose}
        />
        <SearchMenu2>
          <SearchList>
            {/* searchedProducts.length === 0 this means that what users entered isn't in out ptoducts so the searchedProducts will be empty so it's length is 0*/}
            {searchQuery2.length > 0 && searchedProducts2.length === 0 ? (
              <NoResult />
            ) : (
              searchedProducts2.map((product) => (
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
        </SearchMenu2>
      </DrawerContent>
    </Drawer>
  );
}


function SearchMenu2({ children }) {
  return (
    <div
      className={`searchMenu w-full rounded-[10px] top-full
      overflow-y-auto shadow-lg rounded-b-lg !mt-[-25px] `}
    >
      {/* <SearchList /> */}
      {children}
    </div>
  );
}
function SearchBaring({ searchQuery2, setSearchQuery2, handleClose }) {
  function handleUserSearch(e) {
    e.preventDefault();
    setSearchQuery2(e.target.value);
  }
  return (
    <div
      className="searchBar !m-5 overflow-visible relative flex justify-center items-center w-[95%]"
      onClick={(e) => e.stopPropagation()}
    >
      <form
        className="searchBar  flex justify-center items-center sticky top-0 z-50"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          placeholder="Search Products"
          className="searchInput   p-2.5 bg-white outline-none w-full h-12 rounded-lg shadow "
          onChange={handleUserSearch}
          value={searchQuery2}
          onClick={(e) => e.stopPropagation()} // Prevent clicks from bubbling
          onFocus={(e) => e.stopPropagation()}
        />
        <button
          type="submit"
          className="searchButton absolute right-0 h-12 rounded-r-lg  w-12 flex justify-center items-center"
          onClick={handleClose}
        >
          <i className="bx bx-x text-3xl"></i>
        </button>
      </form>
    </div>
  );
}
