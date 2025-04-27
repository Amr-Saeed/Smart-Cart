import { useLocation, useParams } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { memo } from "react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "../ui/dropdown-menu";

function BreadcrumbDemo() {
  const { category } = useParams();
  const location = useLocation();

  const isCategory = location.pathname === `/${category}`;
  console.log("categosssssssssssry", category);
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink className="font-extrabold text-[blueviolet]" href="/">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink className="cursor-pointer text-[blueviolet]">
            {category}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default memo(BreadcrumbDemo); // Use memo to prevent unnecessary re-renders BreadcrumbDemo;
