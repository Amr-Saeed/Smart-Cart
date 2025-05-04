"use client";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
} from "../ui/drawer";

export default function BottomDrawerFilters({ open }) {
  return (
    <Drawer
      open={open}
      position="bottom"
      className="lg:hidden block !h-[100vh] max-h-[100vh]"
      style={{ backgroundColor: "#ffe6e6" }}
    >
      <DrawerContent>
        <DrawerTitle>Filter Mode</DrawerTitle>
        <DrawerDescription>
          This is the filter drawer content.
        </DrawerDescription>
        {/* Add your filter UI here */}
      </DrawerContent>
    </Drawer>
  );
}
