import { memo } from "react";
import { OutOfStock } from "./OutOfStock";
import { Quantity } from "./Quantity";
import "./styles.css";
import { CardActions } from "./CardActions";
import FavBtn from "./FavBtn";
import { Offer } from "./Offer";

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
}) {
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

        <figure className="relative flex items-center justify-center">
          {stockAvailability === false && <OutOfStock />}
          <img loading="lazy" src={productImg} alt={name} />
        </figure>
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
    </>
  );
}
export default memo(ProductCard);
