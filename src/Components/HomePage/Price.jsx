function Price({ price, offers, className }) {
  const offer = ((offers / 100) * price).toFixed(2);

  const afterOffer = (price - offer).toFixed(2);
  return (
    <div className={`price w-full flex justify-between ${className}`}>
      <span className="font-bold">{offers > 0 ? afterOffer : price}</span>
      {offers > 0 && <span className="line-through">{price}</span>}
    </div>
  );
}

export default Price;
