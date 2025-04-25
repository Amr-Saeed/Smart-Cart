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
}) {
  return (
    <>
      <div className={`card h-[399px] ${prodCtegory ? "relative" : ""}`}>
        <FavBtn id={id} prodCtegory={prodCtegory} />
        {offers > 0 && <Offer offers={offers} prodCtegory={prodCtegory} />}

        <figure className="relative flex items-center justify-center">
          {stockAvailability === false && <OutOfStock />}
          <img loading="lazy" src={productImg} alt={name} />
        </figure>
        <div className="card-content flex flex-col justify-between items-start">
          {children}
        </div>
        <CardActions>
          <Quantity id={id} stockAvailability={stockAvailability} />
        </CardActions>
      </div>
    </>
  );
}
export default memo(ProductCard);
