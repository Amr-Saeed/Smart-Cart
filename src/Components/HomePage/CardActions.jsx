export function CardActions({
  children,
  comingFromSmallScreenProduct = false,
  commingfromcartProd = false,
}) {
  return (
    <div
      className={`${
        comingFromSmallScreenProduct
          ? "fixed z-20 w-full !px-4 !py-8 lg:hidden flex items-center justify-center bottom-0 left-0 right-0  text-white text-sm"
          : `${
              commingfromcartProd && "!mb-[36px]"
            } card-actions flex items-center  h-10`
      } ${commingfromcartProd && "card-actions flex items-center  h-10 "}`}
    >
      {children}
    </div>
  );
}
