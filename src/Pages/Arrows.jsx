import {
  FaArrowRight,
  FaArrowLeft,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

function Arrows() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-black text-white gap-6 !p-6">
      {/* Up Arrow */}
      <div className="w-64 h-24 flex items-center justify-center bg-[blueviolet] border border-gray-600 text-6xl hover:bg-[blueviolet]/90 transition-colors duration-300">
        <FaArrowUp />
      </div>

      {/* Left and Right Arrows */}
      <div className="flex justify-between w-64 gap-6">
        <div className="w-64 h-24 flex items-center justify-center bg-[blueviolet] border border-gray-600 text-6xl hover:bg-[blueviolet]/90 transition-colors duration-300">
          <FaArrowLeft />
        </div>
        <div className="w-64 h-24 flex items-center justify-center bg-[blueviolet] border border-gray-600 text-6xl hover:bg-[blueviolet]/90 transition-colors duration-300">
          <FaArrowRight />
        </div>
      </div>

      {/* Down Arrow */}
      <div className="w-64 h-24 flex items-center justify-center bg-[blueviolet] border border-gray-600 text-6xl hover:bg-[blueviolet]/90 transition-colors duration-300">
        <FaArrowDown />
      </div>
    </div>
  );
}

export default Arrows;
