import { memo, useState } from "react";
import { OutOfStock } from "./OutOfStock";
import { Quantity } from "./Quantity";
import "./styles.css";
import { CardActions } from "./CardActions";
import FavBtn from "./FavBtn";
import { Offer } from "./Offer";
import { GoArrowUpRight } from "react-icons/go";
import GoToPopup from "./GoToPopUp";
import socket from "../../WebSockets/ScannerSocket"; // ✅ Import socket

function ProductCard({
  productImg,
  name,
  stockAvailability,
  children,
  id,
  prodCtegory = false,
  offers,
  comingFromSmScreensCategoryPage = false,
  commingFromScanPopUp = false,
  onCardClick, // ✅ Add this
  x,
  y,
}) {
  const [showGoToPopup, setShowGoToPopup] = useState(false);

  return (
    <>
      <div
        className={`card ${
          comingFromSmScreensCategoryPage ? "!w-[143px]" : "!w-[200px]"
        } h-[399px] ${prodCtegory ? "relative" : ""} ${
          commingFromScanPopUp ? "relative" : ""
        }`}
      >
        <FavBtn
          id={id}
          prodCtegory={prodCtegory}
          commingFromScanPopUp={commingFromScanPopUp}
          onCardClick={onCardClick} // ✅ Add this line
        />
        {offers > 0 && <Offer offers={offers} prodCtegory={prodCtegory} />}

        <div>
          <figure className="relative flex items-center justify-center">
            {stockAvailability === 0 && <OutOfStock />}
            <img loading="lazy" src={productImg} alt={name} />
            <GoArrowUpRight
              onClick={() => setShowGoToPopup(true)}
              className="absolute animate-bounce bottom-0 right-0 text-2xl text-white cursor-pointer transition-all  hover:scale-110"
            />
          </figure>
        </div>
        <div
          className={`card-content ${
            comingFromSmScreensCategoryPage ? "h-[190px]" : "h-[180px]"
          }  flex flex-col justify-between items-start`}
        >
          {children}
        </div>
        <CardActions>
          <Quantity
            id={id}
            stockAvailability={stockAvailability}
            comingFromSmScreensCategoryPage={comingFromSmScreensCategoryPage}
          />
        </CardActions>
      </div>
      {showGoToPopup && (
        <GoToPopup
          onClose={() => setShowGoToPopup(false)}
          name={name}
          x={x}
          y={y}
        />
      )}
    </>
  );
}
export default memo(ProductCard);
