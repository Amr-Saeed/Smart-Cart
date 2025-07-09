import ProductCard from "../HomePage/ProdutCard";
import TitleandDes from "../HomePage/TitleandDes";
import Price from "../HomePage/Price";
import { Offer } from "../HomePage/Offer";
import useMedia from "use-media";

function MainProducts({ filteredProducts = [] }) {
  const isSmallScreen = useMedia({ maxWidth: "640px" });
  const isMediumScreen = useMedia({ minWidth: "641px", maxWidth: "1024px" });
  if (filteredProducts.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div
      className={`mainProducts ${
        isSmallScreen || isMediumScreen ? "place-items-center" : ""
      } grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px] mt-[30px]`}
    >
      {filteredProducts.map((product) => (
        <div className="relative !mb-[20px]" key={product.id}>
          {product.offers > 0 && (
            <Offer offers={product.offers} prodCategory={true} />
          )}
          <ProductCard
            productImg={product.imageUrl}
            name={product.name}
            key={product.id}
            id={product.id}
            x={product.x}
            y={product.y}
            stockAvailability={product.stockAvailability}
            prodCtegory={true}
            comingFromSmScreensCategoryPage={isSmallScreen}
          >
            <TitleandDes
              name={product.name}
              unit={product.unit}
              description={product.description}
              id={product.id}
              comingFromSmScreensCategoryPage={isSmallScreen}
            />
            <Price price={product.price} offers={product.offers} />
          </ProductCard>
        </div>
      ))}
    </div>
  );
}

export default MainProducts;
