import Logo from "../HomePage/Header/Logo";
import { FaHome } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { useState } from "react";

function DashSideBar() {
  const [activeTab, setActiveTab] = useState("Home");

  function handleTabClick(tab) {
    setActiveTab(tab);
  }
  return (
    <div className="bg-[#ededed] flex flex-col  basis-[20%] place-items-center ">
      <Logo
        src="/logo.webp"
        alt="Smart-Cart"
        className="w-24 h-24   logoLG hidden lg:flex   !mb-[30px]"
      />
      <Logo
        src="/logo.webp"
        alt="Smart-Cart"
        className="md:w-24 md:h-24 lg:hidden  logo left-[12px] md:left-0 relative   !mb-[30px]"
      />
      <div
        className={`Home transition-all duration-500 cursor-pointer ${
          activeTab === "Home" ? "bg-[#7a4ae569]" : "bg-transparent"
        } flex items-center gap-[10px] text-[1.4rem] !mb-[20px] text-[blueviolet] w-full justify-center  h-[40px]`}
        onClick={() => handleTabClick("Home")}
      >
        <FaHome />
        <span>Home</span>
      </div>
      <div
        className={`addProduct transition-all duration-500 cursor-pointer ${
          activeTab === "addProduct" ? "bg-[#7a4ae569] " : "bg-transparent"
        } flex items-center gap-[10px] text-[1.4rem]  text-[blueviolet] w-full justify-center  h-40px`}
        onClick={() => handleTabClick("addProduct")}
      >
        <IoIosAddCircle />
        <span>Add Product</span>
      </div>
    </div>
  );
}

export default DashSideBar;
