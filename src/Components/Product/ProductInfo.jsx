import FavBtn from "../HomePage/FavBtn";
import { OutOfStock } from "../HomePage/OutOfStock";
import Price from "../HomePage/Price";
import { CardActions } from "../HomePage/CardActions";
import { Quantity } from "../HomePage/Quantity";
import { memo } from "react";
function ProductInfo({ currentProduct, id }) {
  const {
    name,
    description,
    imageUrl,
    price,
    stockAvailability,
    unit,
    offers,
  } = currentProduct;
  return (
    <section className="Product containerr">
      <div className="flex w-full lg:gap-[50px] lg:flex-row flex-col gap-[30px] place-items-center md:place-items-start">
        {/* w-[70%] */}
        <picture className="relative flex bg-[blueviolet] rounded-2xl lg:w-[350px] md:w-full lg:order-0 md:h-[350px] items-center justify-center order-2 w-full h-[250px]">
          <FavBtn id={id} prod={true} />
          {stockAvailability === false && <OutOfStock />}
          <img
            loading="lazy"
            src={imageUrl}
            alt={name}
            className="lg:w-full w-[80%] md:w-[55%] "
          />
        </picture>

        <div className="data flex flex-col justify-between lg:w-[40%] lg:h-[340px]">
          <div className="productData flex flex-col justify-between h-[50%]">
            <div className="namePrice flex justify-between items-center lg:gap-[46px] gap-[40px]">
              <h1 className="text-[2rem] font-bold text-[var(--category-color)]">{`${name} - Per ${unit}`}</h1>
              <span className="font-bold">
                <Price showContent={true} price={price} offers={offers} />
              </span>
            </div>
            <p className="des">{description}</p>
            {/* <TitleandDes name={name} description={description} unit={unit} /> */}
          </div>
          <div
            className="productBtn"
            // onClick={(e) => {
            //   // Check if the clicked button contains "Notify Me"
            //   if (e.target.textContent === "Notify Me") {
            //     return; // Do nothing if the button is "Notify Me"
            //   }
            //   setIsAddCart(!isAddCart);
            // }}
          >
            {/* {isAddCart ? (
                  <Quantity
                    atProduct={stockAvailability ? true : false}
                    id={id}
                  />
                ) : (
                  <CardActions>
                    <Quantity id={id} stockAvailability={stockAvailability} />
                  </CardActions>
                )} */}
            <div className="hidden lg:flex justify-between items-center gap-[50px]">
              <CardActions>
                <Quantity id={id} stockAvailability={stockAvailability} />
              </CardActions>
            </div>
            <CardActions comingFromSmallScreenProduct={true}>
              <Quantity
                id={id}
                stockAvailability={stockAvailability}
                comingFromSmallScreenProduct={true}
              />
            </CardActions>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(ProductInfo);
