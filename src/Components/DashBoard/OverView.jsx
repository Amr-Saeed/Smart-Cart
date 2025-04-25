import { useMemo } from "react";

function OverView({ products }) {
  const productsWithOffers = useMemo(() => {
    if (!products || products.length === 0) return []; // Don't compute categories if products are null

    return products.filter((product) => product.offers > 0);
  }, [products]);

  const productsInStock = useMemo(() => {
    if (!products || products.length === 0) return []; // Don't compute categories if products are null

    return products.filter((product) => product.stockAvailability === true);
  }, [products]);

  const productOutOfStock = useMemo(() => {
    if (!products || products.length === 0) return []; // Don't compute categories if products are null
    return products.length - productsInStock.length;
  }, [products, productsInStock]);

  return (
    <section className="overView flex items-center justify-center !mt-[70px]">
      <div className="overViewContent w-[90%]">
        <h1 className="!mb-[10px] text-[blueviolet] text-[1.4rem] font-bold text-[2rem]">
          OverView
        </h1>
        <div className="overViewCards grid grid-cols-2 gap-[10px] lg:grid-cols-4 lg:gap-[20px]">
          <div className="productsCount  h-[120px] md:h-[100px] !p-[10px] bg-[blueviolet]">
            <p className="text-black !mb-[10px] font-bold">Products Count:</p>
            <span className="text-white font-bold text-[1.2rem]">
              {products.length}
            </span>
          </div>
          <div className="productsWithOffers    h-[120px] md:h-[100px] !p-[10px] bg-[#8a2be2a3]">
            <p className="text-[#0000009c] !mb-[10px] font-bold">
              Products With Offers:
            </p>
            <span className="text-white font-bold text-[1.2rem]">
              {productsWithOffers.length}
            </span>
          </div>
          <div className="productsInStock   h-[120px] md:h-[100px] !p-[10px] bg-[#8a2be2a3]">
            <p className="text-[#0000009c] !mb-[10px] font-bold">
              Products in Stock:
            </p>
            <span className="text-white font-bold text-[1.2rem]">
              {productsInStock.length}
            </span>
          </div>
          <div className="productsOutOfStock   h-[120px] md:h-[100px] !p-[10px] bg-[#8a2be2a3]">
            <p className="text-[#0000009c] !mb-[10px] font-bold">
              Products Out Of Stock:
            </p>
            <span className="text-white font-bold text-[1.2rem]">
              {productOutOfStock}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OverView;
