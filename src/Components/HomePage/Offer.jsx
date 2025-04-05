import React from "react";

export function Offer({ offers }) {
  return (
    <div className="offers left-0 top-[-27px] absolute z-50 ">
      <span className="flex align-middle justify-center  w-[3.875rem] h-[1.9375rem] ">
        {`-${offers}%`}
      </span>
    </div>
  );
}
