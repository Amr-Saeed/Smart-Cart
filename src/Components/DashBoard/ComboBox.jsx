import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
} from "@headlessui/react";
import { FaChevronDown, FaCheck } from "react-icons/fa";
import { useMemo, useState } from "react";

export default function Combo({ products, value, onValueChange }) {
  const [query, setQuery] = useState("");

  const allCategories = useMemo(() => {
    const categories = products.map((p) => p.category);
    return [...new Set(categories)].filter(Boolean);
  }, [products]);

  const filteredCategories =
    query === ""
      ? allCategories
      : allCategories.filter((cat) =>
          cat.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div className="w-full">
      <label className="block text-[#0000009c] font-bold mb-1">Category</label>

      <Combobox
        value={value}
        onChange={(val) => {
          onValueChange(val);
          setQuery("");
        }}
      >
        <div className="relative w-full">
          {" "}
          {/* 🔧 Scoped relative container */}
          <ComboboxInput
            className="border flex items-center justify-between shadow-md border-[blueviolet] rounded-md !p-2 w-full text-sm text-gray-900 shadw-md !shadow-gray-700/10 focus:outline-none focus:ring-2 focus:ring-[var(--main-color)] focus:border-transparent"
            displayValue={(val) => val}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Select or type a category"
          />
          <ComboboxButton className="absolute inset-y-0 right-2 flex items-center pr-2">
            <FaChevronDown className="text-[blueviolet]" />
          </ComboboxButton>
          {filteredCategories.length > 0 && (
            <ComboboxOptions className="absolute w-full z-10 mt-1 max-h-60 overflow-auto rounded-md border border-[blueviolet] bg-white py-1 shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              <div className="!p-2.5 flex flex-col gap-1.5">
                {filteredCategories.map((cat) => (
                  <ComboboxOption
                    key={cat}
                    value={cat}
                    className={({ selected }) =>
                      `cursor-pointer select-none flex justify-between items-center !p-2 border-b-[1px] rounded-md transition  ${
                        selected ? "font-bold text-[blueviolet]" : ""
                      }`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span>{cat}</span>
                        {selected && <FaCheck className="text-[blueviolet]" />}
                      </>
                    )}
                  </ComboboxOption>
                ))}
              </div>
            </ComboboxOptions>
          )}
        </div>
      </Combobox>
    </div>
  );
}
