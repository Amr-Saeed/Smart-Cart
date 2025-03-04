// "use client";

// import { Button, Drawer } from "flowbite-react";
// import { useState } from "react";
// import SearchList from "./SearchList";
// import { div } from "framer-motion/client";
// import { useProducts } from "../useProducts";
// import SearchItems from "./SearchItems";
// import NoResult from "./NoResult";

// export function BottomDrawer({ open, setOpen }) {
//   //   const [isOpen, setIsOpen] = useState(true);
//   const { products } = useProducts();
//   const [searchQuery2, setSearchQuery2] = useState("");
//   const searchedProducts2 =
//     searchQuery2.length > 0
//       ? products.filter((product) =>
//           product.name.toLowerCase().includes(searchQuery2.toLowerCase())
//         )
//       : products.slice(0, 10);

//   // const handleClose = () => setOpen(false);
//   function handleClose(e) {
//     e.stopPropagation(); // Prevents event bubbling
//     e.preventDefault(); // Stops default behavior
//     setOpen(false);
//   }

//   return (
//     <>
//       {/* <div className="flex min-h-[50vh] items-center justify-center"></div> */}
//       <Drawer
//         open={open}
//         onClose={handleClose}
//         position="bottom"
//         className="h-full lg:hidden block"
//         style={{ backgroundColor: "#e6dbff" }}
//       >
//         {/* <Drawer.Header title="Drawer" /> */}
//         <Drawer.Items>
//           <SearchBaring
//             searchQuery2={searchQuery2}
//             setSearchQuery2={setSearchQuery2}
//             handleClose={handleClose}
//           />
//           <SearchMenu2>
//             <SearchList>
//               {/* searchedProducts.length === 0 this means that what users entered isn't in out ptoducts so the searchedProducts will be empty so it's length is 0*/}
//               {searchQuery2.length > 0 && searchedProducts2.length === 0 ? (
//                 <NoResult />
//               ) : (
//                 searchedProducts2.map((product) => (
//                   <SearchItems
//                     img={product.imageUrl}
//                     name={product.name}
//                     unit={product.unit}
//                     key={product.id}
//                     price={product.price}
//                     offers={product.offers}
//                   />
//                 ))
//               )}
//             </SearchList>
//           </SearchMenu2>
//         </Drawer.Items>
//       </Drawer>
//     </>
//   );
// }
// function SearchMenu2({ children }) {
//   return (
//     <div
//       className={`searchMenu w-full rounded-[10px] top-full
//       overflow-y-auto shadow-lg rounded-b-lg !mt-[-25px] `}
//     >
//       {/* <SearchList /> */}
//       {children}
//     </div>
//   );
// }
// function SearchBaring({ searchQuery2, setSearchQuery2, handleClose }) {
//   function handleUserSearch(e) {
//     e.preventDefault();
//     setSearchQuery2(e.target.value);
//   }
//   return (
//     <div
//       className="searchBar !m-5 overflow-visible relative flex justify-center items-center"
//       onClick={(e) => e.stopPropagation()}
//     >
//       <form
//         className="searchBar relative flex justify-center items-center"
//         onSubmit={(e) => e.preventDefault()}
//       >
//         <input
//           type="text"
//           placeholder="Search Products"
//           className="searchInput   p-2.5 bg-white outline-none w-full h-12 rounded-lg shadow "
//           onChange={handleUserSearch}
//           value={searchQuery2}
//           onClick={(e) => e.stopPropagation()} // Prevent clicks from bubbling
//           onFocus={(e) => e.stopPropagation()}
//         />
//         <button
//           type="submit"
//           className="searchButton absolute right-0 h-12 rounded-r-lg  w-12 flex justify-center items-center"
//           onClick={handleClose}
//         >
//           <i className="bx bx-x text-3xl"></i>
//         </button>
//       </form>
//     </div>
//   );
// }

// // export function BottomDrawer() {
// //   const [isOpen, setIsOpen] = useState(true);

// //   const handleClose = () => setIsOpen(false);

// //   return (
// //     <>
// //       <div className="flex min-h-[50vh] items-center justify-center">
// //         <Button onClick={() => setIsOpen(true)}>Show bottom drawer</Button>
// //       </div>
// //       <Drawer open={isOpen} onClose={handleClose} position="bottom">
// //         <Drawer.Header title="Drawer" />
// //         <Drawer.Items>
// //           <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
// //             Supercharge your hiring by taking advantage of our&nbsp;
// //             <a
// //               href="#"
// //               className="text-cyan-600 underline hover:no-underline dark:text-cyan-500"
// //             >
// //               limited-time sale
// //             </a>
// //             &nbsp;for Flowbite Docs + Job Board. Unlimited access to over 190K
// //             top-ranked candidates and the #1 design job board.
// //           </p>
// //           <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
// //             <a
// //               href="#"
// //               className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-cyan-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
// //             >
// //               Learn more
// //             </a>
// //             <a
// //               href="#"
// //               className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
// //             >
// //               Get access&nbsp;
// //               <svg
// //                 className="ms-2 h-3.5 w-3.5 rtl:rotate-180"
// //                 aria-hidden="true"
// //                 xmlns="http://www.w3.org/2000/svg"
// //                 fill="none"
// //                 viewBox="0 0 14 10"
// //               >
// //                 <path
// //                   stroke="currentColor"
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                   strokeWidth="2"
// //                   d="M1 5h12m0 0L9 1m4 4L9 9"
// //                 />
// //               </svg>
// //             </a>
// //           </div>
// //         </Drawer.Items>
// //       </Drawer>
// //     </>
// //   );
// // }
