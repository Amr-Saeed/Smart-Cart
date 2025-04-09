import { memo } from "react";
import { OutOfStock } from "./OutOfStock";
import { Quantity } from "./Quantity";
import "./styles.css";
import { CardActions } from "./CardActions";

function ProductCard({ productImg, name, stockAvailability, children, id }) {
  return (
    <>
      <div className="card h-[399px]">
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
