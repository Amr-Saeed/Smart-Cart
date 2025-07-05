// import React, { useState } from "react";
// import { LayoutDashboard, UserCog, Settings, LogOut } from "lucide-react";
// import { motion } from "framer-motion";
// import { cn } from "@/lib/utils"; // make sure this util exists or remove `cn()`
// import Dashboard from "./DashHome"; // Your real dashboard component
// import "@/styles/sidebar.css"; // Optional: style your hover sidebar

// // Sidebar link component
// const SidebarLink = ({ link, open }) => (
//   <a
//     href={link.href}
//     className="flex items-center gap-3 px-4 py-2 hover:bg-gray-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 transition-all duration-300"
//   >
//     {link.icon}
//     {open && <span>{link.label}</span>}
//   </a>
// );

// // Main component
// function DashLayout() {
//   const [open, setOpen] = useState(false);

//   const links = [
//     {
//       label: "Dashboard",
//       href: "#",
//       icon: (
//         <LayoutDashboard className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
//       ),
//     },
//     {
//       label: "Profile",
//       href: "#",
//       icon: (
//         <UserCog className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
//       ),
//     },
//     {
//       label: "Settings",
//       href: "#",
//       icon: (
//         <Settings className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
//       ),
//     },
//     {
//       label: "Logout",
//       href: "#",
//       icon: (
//         <LogOut className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
//       ),
//     },
//   ];

//   return (
//     <div
//       className={cn(
//         "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-7xl mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
//         "h-screen" // full page height
//       )}
//       onMouseEnter={() => setOpen(true)}
//       onMouseLeave={() => setOpen(false)}
//     >
//       {/* Sidebar */}
//       <div
//         className={cn(
//           "flex flex-col justify-between transition-all duration-300 ease-in-out",
//           open ? "w-64" : "w-16",
//           "bg-white dark:bg-neutral-900 border-r border-gray-200 dark:border-neutral-700 h-full"
//         )}
//       >
//         <div className="flex flex-col gap-4 overflow-y-auto">
//           {open ? <Logo /> : <LogoIcon />}
//           <nav className="mt-4 flex flex-col gap-1">
//             {links.map((link, idx) => (
//               <SidebarLink key={idx} link={link} open={open} />
//             ))}
//           </nav>
//         </div>

//         {/* User avatar or footer */}
//         <div className="mb-4 px-4">
//           <SidebarLink
//             link={{
//               label: "Smart Cart Admin",
//               href: "#",
//               icon: (
//                 <img
//                   src="/logo.webp"
//                   alt="Admin Avatar"
//                   className="h-7 w-7 rounded-full"
//                 />
//               ),
//             }}
//             open={open}
//           />
//         </div>
//       </div>

//       {/* Main dashboard area */}
//       <div className="flex-1 overflow-y-auto">
//         <Dashboard />
//       </div>
//     </div>
//   );
// }

// export default DashLayout;
