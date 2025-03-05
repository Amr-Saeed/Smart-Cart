import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "../../lib/utils";

function Drawer({ className, ...props }) {
  return (
    <DrawerPrimitive.Root
      data-slot="drawer"
      className={cn("fixed inset-0 h-[100dvh] bg-black/50", className)} // 🚀 This ensures full height
      {...props}
    />
  );
}

// function DrawerTrigger({ ...props }) {
//   return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
// }

// function DrawerPortal({ ...props }) {
//   return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
// }

function DrawerClose({ ...props }) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

// function DrawerOverlay({ className, ...props }) {
//   return (
//     <DrawerPrimitive.Overlay
//       data-slot="drawer-overlay"
//       className={cn(
//         "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80",
//         className
//       )}
//       {...props}
//     />
//   );
// }

function DrawerContent({ className, children, ...props }) {
  return (
    <DrawerPrimitive.Content
      data-slot="drawer-content"
      className={cn(
        "group/drawer-content fixed z-50 flex flex-col bg-[var(--main-color-alt)]",
        "inset-x-0 bottom-0  shadow-lg",
        "h-[100dvh] max-h-[100dvh] overflow-hidden", // 🚀 Keeps drawer full height
        "translate-y-0", // 🚀 Prevents it from moving when keyboard opens
        "overscroll-none", // 🚀 Stops weird scrolling issues
        className
      )}
      {...props}
    >
      {/* Search Bar (Fixed at the Top) */}
      <div className="w-full p-4 hidden">
        {children[0]} {/* Assuming the first child is the search bar */}
      </div>

      {/* Product List (Takes Full Remaining Space & Scrolls) */}
      <div className="flex-1 w-full overflow-y-auto overflow-x-hidden place-items-center">
        {children.slice(1)} {/* Rest of the content (products) */}
      </div>
    </DrawerPrimitive.Content>
  );
}

// function DrawerHeader({ className, ...props }) {
//   return (
//     <div
//       data-slot="drawer-header"
//       className={cn("flex flex-col gap-1.5 p-4", className)}
//       {...props}
//     />
//   );
// }

// function DrawerFooter({ className, ...props }) {
//   return (
//     <div
//       data-slot="drawer-footer"
//       className={cn("mt-auto flex flex-col gap-2 p-4", className)}
//       {...props}
//     />
//   );
// }

function DrawerTitle({ className, ...props }) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn("text-foreground font-semibold hidden", className)}
      {...props}
    />
  );
}

function DrawerDescription({ className, ...props }) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-muted-foreground text-sm hidden", className)}
      {...props}
    />
  );
}

export { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerTitle };
