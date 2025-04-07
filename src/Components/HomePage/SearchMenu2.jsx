"use client";
export default function SearchMenu2({ children }) {
  console.log("SearchMenu2 re-rendered");
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
