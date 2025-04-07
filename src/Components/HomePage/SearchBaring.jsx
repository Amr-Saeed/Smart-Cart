"use client";
import { memo } from "react";
import { HiOutlineX } from "react-icons/hi";

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
          <HiOutlineX className="text-3xl text-white stroke-[2.5]" />
        </button>
      </form>
    </div>
  );
}
export default memo(SearchBaring);
