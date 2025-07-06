import { useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { memo } from "react";

function BreadCrumbCart() {
  const location = useLocation();

  // Optional: Guard to render only on /cart route
  if (location.pathname !== "/cart") return null;

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
            Cart
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default memo(BreadCrumbCart);
