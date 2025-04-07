import { HiMenuAlt2 } from "react-icons/hi";
import Logo from "./Logo";
import { memo } from "react";

function SmallHeader({ setIsSideBarOpen, children }) {
  return (
    <>
      <div className="logo-container w-full    flex justify-between items-center lg:hidden ">
        <button
          aria-label="open-SideBar"
          className="basis-0 md:basis-24"
          onClick={() => setIsSideBarOpen((open) => !open)}
        >
          {/* <i className="bx bx-menu-alt-left md:text-3xl text-[1.3rem] "></i> */}
          <HiMenuAlt2 className="bx bx-menu-alt-left text-[1.3rem] md:text-3xl " />
        </button>
        <Logo
          src="/logo.webp"
          alt="Smart-Cart"
          className="md:w-24 md:h-24  logo left-[12px] md:left-0 relative"
        />
        {children}
      </div>
    </>
  );
}

export default memo(SmallHeader); // Use memo to prevent unnecessary re-renders SmallHeader;
