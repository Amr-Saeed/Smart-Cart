import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";

function FilterDropDown({ label, name, options, isOpen, onToggle, onSelect }) {
  const [selectedOption, setSelectedOption] = useState(null);
  function handleSeletedOption(option) {
    setSelectedOption(option);
    onSelect(option); // Call the onSelect function with the selected value
  }
  return (
    <div className="relative">
      <button
        className={`flex lg:h-auto h-[69.6px] ${
          name === "Sort" ? "w-[160px] " : ""
        } items-center justify-center gap-1.5 border-1  border-[blueviolet] !p-2.5 rounded-[8px] text-[var(--main-color)] font-semibold ${
          isOpen ? "bg-white" : ""
        } `}
        onClick={() => onToggle(name)}
      >
        <span>{label}</span>
        <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
          <IoIosArrowDown />
        </span>
      </button>

      {isOpen && (
        <ul className="filersList z-50 absolute border-1 border-[blueviolet] bg-white w-full border-t-0 rounded-br-[8px] rounded-bl-[8px]">
          {options.map((option) => (
            <li
              key={option}
              className={`!pl-[0.75rem] ${
                selectedOption === option ? "bg-[blueviolet] text-white" : ""
              } hover:bg-[blueviolet] hover:text-white !cursor-pointer !py-[6px] border-b-1 border-b-[blueviolet] last:border-b-0`}
              onClick={() => handleSeletedOption(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FilterDropDown;
