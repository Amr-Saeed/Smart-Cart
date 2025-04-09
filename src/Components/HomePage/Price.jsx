import { useMemo } from "react";

function Price({ price, offers, className, showContent = false }) {
  const offer = useMemo(() => {
    return ((offers / 100) * price).toFixed(2);
  }, [offers, price]);

  const afterOffer = useMemo(() => {
    return (price - offer).toFixed(2);
  }, [offer, price]);
  return (
    <div
      className={`price w-full ${
        showContent ? "flex-col text-[1.3rem]" : "flex-row"
      } flex justify-between ${className}`}
    >
      <span className="font-bold">{offers > 0 ? afterOffer : price}</span>
      {offers > 0 && <span className="line-through">{price}</span>}
    </div>
  );
}

export default Price;
