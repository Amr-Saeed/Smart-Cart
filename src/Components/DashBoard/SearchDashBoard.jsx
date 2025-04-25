import { UserButton } from "@clerk/clerk-react";

function SearchDashBoard({ handleUserSearch, searchDashQuery }) {
  return (
    <form className="!mt-[10px] border-b border-[blueviolet] flex justify-between items-center ">
      <input
        type="text"
        placeholder="Search Products"
        className="text-3xl font-bold text-[blueviolet] !mb-4 w-[70%] !pl-[25px] outline-0  !pb-[10px] !pt-[15px] caret-inherit"
        onChange={handleUserSearch}
        value={searchDashQuery}
      />
      <div className="welcome bg-[var(--main-color)] !p-[15px] rounded-[10px] !mr-[15px]">
        <span className="text-white font-bold flex items-center justify-center gap-[8px]">
          <UserButton />
          Welcome
        </span>
      </div>
    </form>
  );
}

export default SearchDashBoard;
