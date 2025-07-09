import { TiHomeOutline } from "react-icons/ti";
import { BsQrCode } from "react-icons/bs";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useMedia from "use-media";

function BottomBar() {
  const [activeBar, setActiveBar] = useState("Home");
  const isSmallScreen = useMedia({ maxWidth: "640px" });

  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/HomePage";
  const isScanPage = location.pathname === "/scan";

  function handleNavigation(bar) {
    setActiveBar(bar);
    if (bar === "Home" && !isHomePage) {
      navigate("/HomePage");
    } else if (bar === "Scan" && !isScanPage) {
      navigate("/scan");
    }
  }

  return (
    isSmallScreen && (
      <div className="sticky bottom-0 h-[60px] left-0 right-0 z-50 bg-white shadow-lg flex justify-between items-center p-4">
        <div className="flex w-full justify-around items-center ">
          <div
            className={`place-items-center cursor-pointer ${
              activeBar === "Home" ? "!text-[blueviolet]" : "text-gray-600"
            }`}
            onClick={() => handleNavigation("Home")}
          >
            <TiHomeOutline className={`w-6 h-6 text-inherit`} />
            <span className={`text-xs text-inherit`}>Home</span>
          </div>
          <div
            className={`place-items-center cursor-pointer ${
              activeBar === "Scan" ? "!text-[blueviolet]" : "text-gray-600"
            }`}
            onClick={() => handleNavigation("Scan")}
          >
            <BsQrCode className="w-6 h-6 text-inherit" />
            <span className="text-xs text-inherit">Scan</span>
          </div>
        </div>
      </div>
    )
  );
}

export default BottomBar;
