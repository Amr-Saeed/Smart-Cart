import { useMemo, useState } from "react";
import { useProductsContext } from "../HomePage/ProductsContext";
import ProdutCard from "../HomePage/ProdutCard";
import Price from "../HomePage/Price";
import NoResult from "../HomePage/NoResult";
import Modal from "./Modal";
import inputFields from "./InputFields";
import InputField from "./InputField";
import { UserButton } from "@clerk/clerk-react";

function DashHome() {
  const [searchDashQuery, setDashSearchQuery] = useState("");
  const { products } = useProductsContext();
  //start Modal control
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  //End Modal control

  const searchedDashProducts = useMemo(() => {
    if (!products || products.length === 0) return []; // Don't compute categories if products are null

    return searchDashQuery.length > 0
      ? products.filter((product) =>
          product.name.toLowerCase().includes(searchDashQuery.toLowerCase())
        )
      : products;
  }, [products, searchDashQuery]);

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

  function handleUserSearch(e) {
    e.preventDefault();
    setDashSearchQuery(e.target.value);
  }
  return (
    <div className="bg-[#f9faf7] basis-[80%]">
      <form className="!mt-[10px] border-b border-[blueviolet] flex justify-between items-center ">
        <input
          type="text"
          placeholder="Search Products"
          className="text-3xl font-bold text-[blueviolet] !mb-4 w-[70%] !pl-[25px] outline-0  !pb-[10px] !pt-[15px] caret-inherit"
          onChange={handleUserSearch}
          value={searchDashQuery}
        />
        <div className="welcome bg-[var(--main-color)] !p-[15px] rounded-[10px] !mr-[15px]">
          <span className="text-white font-bold flex items-center justify-center gap-[8px]">
            <UserButton />
            Welcome
          </span>
        </div>
      </form>

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

      <section className="dashProducts  items-center justify-center ">
        <h1 className="!mb-[10px] text-[blueviolet]  font-bold text-[2rem] !m-[auto] w-[90%]">
          Products
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-[100px] gap-x-[5px] h-[400px] md:h-[750px] lg:h-[500px] grid-rows-[350px] overflow-y-scroll w-[90%] !mx-auto">
          {searchDashQuery.length > 0 && searchedDashProducts.length === 0 ? (
            <p className="col-span-4 bg-[blueviolet] flex items-center justify-center text-white font-bold text-[1.3rem]">
              No results found
            </p>
          ) : (
            searchedDashProducts.map((product) => (
              <DashProducts
                // img={product.imageUrl}
                // name={product.name}
                // unit={product.unit}
                // key={product.id}
                // price={product.price}
                // offers={product.offers}
                // id={product.id}
                // stockAvailability={product.stockAvailability}
                // desc={product.description}
                product={product}
                key={product.id}
                openModal={openModal}
              />
            ))
          )}
        </div>
        <Modal isOpen={isOpen} close={close} title={"Add Product"}>
          {inputFields.map((input) => (
            <div className="!mb-[10px] flex flex-col" key={input.id}>
              <label htmlFor={input.id} className="text-[#0000009c] font-bold">
                {input.label}
              </label>
              <InputField input={input} />
            </div>
          ))}
          <div className="flex gap-2 !mt-[20px]">
            <button className="w-[50%] justify-center inline-flex items-center gap-2 rounded-md bg-gray-700 !py-1.5 !px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700">
              Cancel
            </button>
            <button className="w-[50%] justify-center inline-flex items-center gap-2 rounded-md bg-gray-700 !py-1.5 !px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700">
              Submit
            </button>
          </div>
        </Modal>
        <UserButton />
      </section>
    </div>
  );
}

function DashProducts({
  // img,
  // name,
  // unit,
  // price,
  // offers,
  // id,
  // stockAvailability,
  // desc,
  product,
  openModal,
}) {
  const {
    imageUrl: img,
    name,
    unit,
    price,
    offers,
    id,
    stockAvailability,
    description,
  } = product;
  return (
    <div className="card bg-base-100 w-96 shadow-sm   relative h-[400px]">
      <figure>
        <img src={img} alt={name} />
      </figure>
      <div className="card-content flex flex-col justify-between items-start !h-[230px]">
        <h2 className="card-title">{name}</h2>
        <p className="h-[50px]">{description}</p>
        <Price price={price} offers={offers} className={"h-[20px]"} />
        {/* <div className="price justify-end">
          {offers ? <p>Offer: {`${offers}%`}</p> : null}
        </div> */}
        <div className=" flex  items-center justify-center gap-[10px] h-[90px] w-full ">
          <button
            className="text-white font-bold rounded-[10px] bg-[#ffc107] !p-[10px]  text-center w-[50%]"
            onClick={openModal}
          >
            Edit
          </button>
          <button className="text-white font-bold rounded-[10px] bg-[#ff3333] !p-[10px]  text-center w-[50%]">
            Delete
          </button>
        </div>
      </div>
      {/* overlay */}
      {/* <div className="overlay bg-[#8153e8ad] opacity-0  absolute inset-0 flex flex-col items-center justify-center gap-[30px]">
        <button className="text-white font-bold rounded-[10px] bg-[#ff3333] !p-[10px] w-[70px] text-center">
          Delete
        </button>
        <button className="text-white font-bold rounded-[10px] bg-[#ffc107] !p-[10px] w-[70px] text-center">
          Edit
        </button>
      </div> */}
    </div>
  );
}

export default DashHome;
