import { memo } from "react";

function SearchMenu({ children, searchOpen }) {
  console.log("searchOpensssssssssssssssssssssss");
  return (
    <div
      className={`searchMenu  rounded-[10px] w-[844px] h-[573px] z-[51] right-0 absolute top-full 
      overflow-y-auto shadow-lg rounded-b-lg hidden lg:block
      ${
        searchOpen
          ? "opacity-100 max-h-[573px] transition-all duration-500 ease-linear "
          : "opacity-0 max-h-0 hidden transition-all duration-500 ease-linear"
      }`}
    >
      {/* <SearchList /> */}
      {children}
    </div>
  );
}

export default memo(SearchMenu);
