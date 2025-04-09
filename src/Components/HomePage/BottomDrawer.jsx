"use client";
import SearchList from "./SearchList";
import SearchItems from "./SearchItems";
import NoResult from "./NoResult";
// import SearchMenu2 from "./SearchMenu2";
import { lazy, Suspense } from "react";

const SearchMenu2 = lazy(() => import("./SearchMenu2"));

import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
} from "../ui/drawer";

export default function BottomDrawer({
  open,
  children,
  searchQuery2,
  searchedProducts2,
}) {
  console.log("BottomDrawer re-rendered");
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
        {/* <SearchBaring
          searchQuery2={searchQuery2}
          setSearchQuery2={setSearchQuery2}
          handleClose={handleClose}
        /> */}
        {children}
        <Suspense fallback={<div>Loading...</div>}>
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
                    id={product.id}
                  />
                ))
              )}
            </SearchList>
          </SearchMenu2>
        </Suspense>
      </DrawerContent>
    </Drawer>
  );
}
