import { useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { memo } from "react";

function BreadCrumbWish() {
  const location = useLocation();

  // Optional: Guard to render only on /cart route
  if (location.pathname !== "/wishlist") return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            className="font-extrabold text-[blueviolet]"
            href="/HomePage"
          >
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink className="text-[blueviolet] font-semibold cursor-default">
            wishlist
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default memo(BreadCrumbWish);
