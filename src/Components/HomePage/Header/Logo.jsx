import { memo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Logo({ className, src, alt }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/HomePage";

  function handleClick() {
    if (!isHomePage) {
      navigate("/HomePage");
    }
  }
  return (
    <img
      loading="lazy"
      src={src}
      alt={alt}
      className={`p-2 cursor-pointer m-2.5 w-16 h-16  ${className}`}
      onClick={handleClick}
    />
  );
}

export default memo(Logo);
