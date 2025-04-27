import React from "react";

export function Offer({ offers, prodCategory = false }) {
  return (
    <div
      className={`offers ${
        prodCategory ? "top-0 z-20" : "top-[-27px] z-50"
      } left-0  absolute `}
    >
      <span className="flex align-middle justify-center  w-[3.875rem] h-[1.9375rem] ">
        {`-${offers}%`}
      </span>
    </div>
  );
}
