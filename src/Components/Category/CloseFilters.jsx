import { useMemo } from "react";
import { IoClose } from "react-icons/io5";

export function CloseFilters({
  hasDeal,
  stores,
  sort,
  minPrice,
  maxPrice,
  dispatch,
  setMinPrice,
  setMaxPrice,
}) {
  const filters = useMemo(() => {
    const filters = [];

    if (hasDeal === "Yes" || hasDeal === "No") {
      filters.push({ value: hasDeal, type: "SET_DEAL" });
    }
    if (stores) {
      filters.push({ value: stores, type: "SET_STORE" });
    }
    if (sort && sort !== "Default") {
      filters.push({ value: sort, type: "SET_SORT" });
    }
    if (minPrice !== 0 || maxPrice !== 1000) {
      filters.push({
        value: `Min:${minPrice}EGP | Max:${maxPrice}EGP`,
        type: "SET_PRICE",
      });
    }

    return filters;
  }, [hasDeal, stores, sort, minPrice, maxPrice]);
  console.log(filters);
  return (
    <div className="closeFilters !mt-[15px] flex gap-[10px] ">
      {filters.length > 0
        ? filters.map((filter, index) => (
            <div
              className="bg-[#b076e78a] flex w-fit !py-1.5 !px-2.5 rounded-[8px] text-[#6208b6] font-semibold"
              key={index}
            >
              <span>{filter.value}</span>
              <IoClose
                className="text-2xl cursor-pointer"
                onClick={() => {
                  dispatch({
                    type: filter.type,
                    payload: null,
                  });
                  if (filter.type === "SET_PRICE") {
                    setMinPrice(0);
                    setMaxPrice(1000);
                  }
                }}
              />
            </div>
          ))
        : null}
    </div>
  );
}
