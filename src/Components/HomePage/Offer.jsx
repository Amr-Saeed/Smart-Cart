import React from "react";

export function Offer({ offers, prodCategory = false }) {
  return (
    <div
      className={`offers ${
        prodCategory ? "top-0" : "top-[-27px]"
      } left-0  absolute z-50`}
    >
      <span className="flex align-middle justify-center  w-[3.875rem] h-[1.9375rem] ">
        {`-${offers}%`}
      </span>
    </div>
  );
}
