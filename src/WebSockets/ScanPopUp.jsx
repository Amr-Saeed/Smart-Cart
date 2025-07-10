// src/Components/ScanPopup.jsx

import ProdutCard from "../Components/HomePage/ProdutCard";
import { IoClose } from "react-icons/io5";
import TitleandDes from "../Components/HomePage/TitleandDes";
import Price from "../Components/HomePage/Price";

function ScanPopup({
  product,
  onClose,
  recommendations, // ✅ add this prop
  allProducts, // pass all products if needed
}) {
  if (!product) return null;

  console.log("recommend AIai", recommendations);
  console.log("Scanned Product:", product);
  // Take the first object from recommendations array (safely)
  // Fallback: if no AI recommendations, use products from same category

  const recommended = recommendations.recommended_products || [];

  const fallbackRecommended =
    recommended.length === 0 && allProducts && product?.category
      ? allProducts.filter(
          (p) => p.category === product.category && p.id !== product.id
        )
      : [];

  console.log("asasd", recommended);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white h-[80%] rounded-xl shadow-lg p-8 w-[50%] overflow-y-auto">
        <div>
          <div className="flex items-center justify-between !mb-4 !mt-2">
            <h2 className="text-2xl font-semibold  text-[blueviolet]">
              📦 Product Scanned
            </h2>

            <button
              onClick={onClose}
              className="text-[2.25rem] text-[blueviolet]"
            >
              <IoClose />
            </button>
          </div>
          <div className="flex items-center justify-center !mb-[30px]">
            <ProdutCard
              productImg={product.imageUrl}
              name={product.name}
              stockAvailability={product.stockAvailability}
              id={product.id}
              x={product.x} // Pass x coordinate
              y={product.y} // Pass y coordinate
              commingFromScanPopUp={true}
            >
              <TitleandDes
                name={product.name}
                unit={product.unit}
                description={product.description}
                id={product.id}
                onCardClick={onClose} // ✅ Add this line
              />
              <Price price={product.price} offers={product.offers} />
            </ProdutCard>
          </div>
          {(recommended.length > 0 || fallbackRecommended.length > 0) && (
            <div>
              <span className="text-2xl font-semibold  text-[blueviolet] !mb-[30px] inline-block">
                🤖AI Recommendations:
              </span>
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-2.5 gap-y-10 !p-2.5 place-items-center">
                {recommended.map((item) => (
                  <ProdutCard
                    key={item.id}
                    productImg={item.imageUrl}
                    name={item.name}
                    stockAvailability={item.stockAvailability}
                    id={item.id}
                    x={item.x} // Pass x coordinate
                    y={item.y} // Pass y coordinate
                    commingFromScanPopUp={true}
                  >
                    <TitleandDes
                      name={item.name}
                      unit={item.unit}
                      description={item.description}
                      id={item.id}
                      onCardClick={onClose} // ✅ Add this line
                    />
                    <Price price={item.price} offers={item.offers} />
                  </ProdutCard>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ScanPopup;
