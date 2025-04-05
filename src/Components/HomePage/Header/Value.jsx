export default function Value({ value }) {
  // console.log(`Total is: ${totalQuantity}`);
  return (
    <span className="value md:w-[1.1rem] md:h-[1.1rem] md:left-4 md:top-[-2px] absolute lg:w-[1.2rem] lg:h-[1.2rem] flex items-center justify-center  text-center rounded-[50%] left-5 top-[-3px] text-white ">
      {value}
    </span>
  );
}
