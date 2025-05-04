// "use client";

import { useMemo, useState } from "react";
// import {
//   Label,
//   Listbox,
//   ListboxButton,
//   ListboxOption,
//   ListboxOptions,
// } from "@headlessui/react";
// import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
// import { CheckIcon } from "@heroicons/react/20/solid";

// export default function SelectMenu({ products }) {
//   const allCategories = useMemo(() => {
//     const categories = products.map((product) => product.category);
//     return [...new Set(categories)];
//   }, [products]);

//   const [selected, setSelected] = useState(
//     allCategories.length > 0 ? allCategories[3] || allCategories[0] : null
//   );

//   console.log("selected", selected);
//   return (
//     <Listbox value={selected} onChange={setSelected}>
//       <Label className="block text-[#0000009c] font-bold">Category</Label>
//       <div className="relative mt-2">
//         <ListboxButton className="border flex items-center  justify-between  shadow-md border-[blueviolet] rounded-md !p-2 w-full  shadw-md !shadow-gray-700/10 focus:outline-none focus:ring-2 focus:ring-[var(--main-color)] focus:border-transparent data-[hover]:bg-gray-100 data-[focus]:outline-1 data-[focus]:outline-[var(--main-color)]">
//           <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
//             <span className="block truncate">{selected}</span>
//           </span>
//           <ChevronUpDownIcon
//             aria-hidden="true"
//             className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
//           />
//         </ListboxButton>

//         <ListboxOptions
//           transition
//           className="absolute !p-2.5 z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
//         >
//           {allCategories.map((category) => (
//             <ListboxOption
//               key={category}
//               value={category}
//               className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
//             >
//               <div className="flex items-center">
//                 <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">
//                   {category}
//                 </span>
//               </div>

//               <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
//                 <CheckIcon aria-hidden="true" className="size-5" />
//               </span>
//             </ListboxOption>
//           ))}
//         </ListboxOptions>
//       </div>
//     </Listbox>
//   );
// }

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function SelectMenu({ products, value, onValueChange }) {
  const allCategories = useMemo(() => {
    const categories = products.map((product) => product.category);
    return [...new Set(categories)];
  }, [products]);

  return (
    <Select value={value} onValueChange={onValueChange}>
      <label className="block text-[#0000009c] font-bold">Category</label>
      <SelectTrigger className="border flex items-center  justify-between  shadow-md border-[blueviolet] rounded-md !p-2 w-full  shadw-md !shadow-gray-700/10 focus:outline-none focus:ring-2 focus:ring-[var(--main-color)] focus:border-transparent data-[hover]:bg-gray-100 data-[focus]:outline-1 data-[focus]:outline-[var(--main-color)]">
        <SelectValue placeholder={"Select Category"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="!p-2.5 border-1 border-[blueviolet] flex flex-col gap-1.5">
          {allCategories.map((category) => (
            <SelectItem
              key={category}
              value={category}
              className="border-b-[1px] !p-2"
            >
              {category}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
