import { useMemo, useState } from "react";
import { useProductsContext } from "../HomePage/ProductsContext";
import ProdutCard from "../HomePage/ProdutCard";
import Price from "../HomePage/Price";
import NoResult from "../HomePage/NoResult";
import Modal from "./Modal";
import inputFields from "./InputFields";
import InputField from "./InputField";
import OverView from "./OverView";
import SearchDashBoard from "./SearchDashBoard";
import SelectMenu from "./SelectMenu";
import { useAuth } from "@clerk/clerk-react";

function DashHome({
  product,
  handleChange,
  products,
  selectedCategory,
  setSelectedCategory,
  handleCategoryChange,
  defaultProduct,
}) {
  const [searchDashQuery, setDashSearchQuery] = useState("");
  //start Modal control
  const { getToken } = useAuth();

  // State for selected category

  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const [productToEdit, setProductToEdit] = useState(defaultProduct);

  //Edit Modal
  // function handlEditeSubmit(e) {
  //   e.preventDefault();
  //   console.log(productToEdit); //HERE WE WILL POST TO THE API
  // }
  // async function handlEditeSubmit(e) {
  //   e.preventDefault();

  //   console.log(productToEdit); // Confirm it contains id and other fields

  //   try {
  //     const token = await getToken();

  //     const response = await fetch(
  //       `https://nutrigeen.com/api/products/${productToEdit.id}`,
  //       {
  //         method: "PUT", // or 'PATCH' depending on your API
  //         headers: {
  //           // "Content-Type": "application/json",
  //           // Add authorization headers if needed
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify(productToEdit),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to update product");
  //     }

  //     const updatedProduct = await response.json();
  //     console.log("Product updated successfully:", updatedProduct);
  //     // Optionally, close modal and refresh the product list
  //     CloseEditModal();
  //   } catch (error) {
  //     console.error("Error updating product:", error);
  //   }
  // }

  async function handlEditeSubmit(e) {
    e.preventDefault();

    console.log(productToEdit); // Confirm it contains id and other fields

    try {
      const token = await getToken();

      // Create FormData to simulate a form submission
      const formData = new FormData();

      // Append your product data to FormData
      for (const key in productToEdit) {
        if (productToEdit.hasOwnProperty(key)) {
          formData.append(key, productToEdit[key]);
        }
      }

      // Add the authorization token to headers
      const response = await fetch(
        `https://nutrigeen.com/api/products/${productToEdit.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            // 'Content-Type' should NOT be set here when using FormData
            // The browser will automatically set it correctly
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      const updatedProduct = await response.json();
      console.log("Product updated successfully:", updatedProduct);
      // Optionally, close modal and refresh the product list
      CloseEditModal();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  }

  console.log("productToEdit", productToEdit);

  function openEditModal() {
    setIsOpenEdit(true);
  }

  function CloseEditModal() {
    setIsOpenEdit(false);
  }
  //Edit Modal

  //End Modal control
  function handleCancel() {
    setProductToEdit(defaultProduct);
    CloseEditModal();
  }
  // Handle category selection

  function handleEditChange(e) {
    const { value, name } = e.target;

    setProductToEdit((product) => ({
      ...product,
      [name]: value,
      category: selectedCategory,
    }));
  }

  //------------------start search------------------------
  function handleUserSearch(e) {
    e.preventDefault();
    setDashSearchQuery(e.target.value);
  }
  const searchedDashProducts = useMemo(() => {
    if (!products || products.length === 0) return []; // Don't compute categories if products are null

    return searchDashQuery.length > 0
      ? products.filter((product) =>
          product.name.toLowerCase().includes(searchDashQuery.toLowerCase())
        )
      : products;
  }, [products, searchDashQuery]);
  //------------------End search------------------------
  console.log("productToEdit", productToEdit);

  return (
    <div className="bg-[#f9faf7] basis-[80%]">
      <SearchDashBoard
        products={products}
        searchedDashProducts={searchedDashProducts}
        handleUserSearch={handleUserSearch}
      />
      <OverView products={products} />

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
                product={product}
                key={product.id}
                openEditModal={openEditModal}
                setProductToEdit={setProductToEdit}
                productToEdit={productToEdit}
              />
            ))
          )}
        </div>

        {/* Edit Product Modal */}
        <Modal
          isOpen={isOpenEdit}
          close={CloseEditModal}
          title={"Edit Product"}
        >
          <form onSubmit={handlEditeSubmit}>
            {inputFields.map((input) => (
              <div className="!mb-[10px] flex flex-col" key={input.id}>
                <label
                  htmlFor={input.id}
                  className="text-[#0000009c] font-bold"
                >
                  {input.label}
                </label>
                <InputField
                  input={input}
                  value={productToEdit[input.name]}
                  onChange={handleEditChange}
                />
              </div>
            ))}
            <SelectMenu
              products={products}
              value={productToEdit.category}
              onValueChange={handleCategoryChange}
            />
            <div className="flex gap-2 !mt-[20px]">
              <button
                className="w-[50%] justify-center inline-flex items-center gap-2 rounded-md bg-gray-700 !py-1.5 !px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button className="w-[50%] justify-center inline-flex items-center gap-2 rounded-md bg-gray-700 !py-1.5 !px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700">
                Submit
              </button>
            </div>
          </form>
        </Modal>

        {/* Edit Product Modal */}
      </section>
    </div>
  );
}

function DashProducts({
  product,
  openModal,
  setProductToEdit,
  productToEdit,
  openEditModal,
}) {
  function handleEdit() {
    // console.log(product);
    setProductToEdit(product);
    openEditModal();
  }
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
            // onClick={openModal}
            onClick={handleEdit}
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
