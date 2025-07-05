// src/Components/ScanPopup.jsx

import ProdutCard from "../Components/HomePage/ProdutCard";
import { IoClose } from "react-icons/io5";
import TitleandDes from "../Components/HomePage/TitleandDes";
import Price from "../Components/HomePage/Price";

function ScanPopup({ product, onClose }) {
  if (!product) return null;

  console.log("Scanned Product:", product);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white h-[65%] rounded-xl shadow-lg p-8 w-full max-w-md text-center">
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
          <div className="flex items-center justify-center">
            <ProdutCard
              productImg={product.imageUrl}
              name={product.name}
              stockAvailability={product.stockAvailability}
              id={product.id}
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
        </div>
      </div>
    </div>
  );
}

export default ScanPopup;
