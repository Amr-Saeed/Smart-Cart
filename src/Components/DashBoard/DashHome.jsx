import { useMemo, useState, useEffect } from "react";
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
import axios from "axios";
import { SignIn, useUser, SignUp } from "@clerk/clerk-react";
import { useToken } from "../TokenContext";
import ImgDropZone from "./ImgDropZone";
import { CgSpinner } from "react-icons/cg";

function DashHome({
  product,
  handleChange,
  products,
  defaultProduct,
  selectedCategory,
  setSelectedCategory,
  setProducts,
}) {
  const [searchDashQuery, setDashSearchQuery] = useState("");
  const [newImageFile, setNewImageFile] = useState(null);

  //start Modal control
  const { getToken } = useAuth();
  const { user, isLoaded } = useUser(); // Get the current user
  const { token } = useToken(); // Get the token from context

  // State for selected category

  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const [productToEdit, setProductToEdit] = useState(defaultProduct);

  const [isLoading, setIsLoading] = useState(false);

  // Update selectedCategory whenever productToEdit changes
  useEffect(() => {
    if (productToEdit && productToEdit.category !== selectedCategory) {
      setSelectedCategory(productToEdit.category);
    }
  }, [productToEdit]);

  async function handlEditeSubmit(e) {
    e.preventDefault();
    setIsLoading(true); // Start loading state

    if (!productToEdit.id) {
      console.error("No product ID provided");
      return;
    }

    try {
      // Update stockAvailability in the productToEdit object
      const updatedProduct = {
        ...productToEdit,
        stockAvailability: Number(productToEdit.inStock) > 1 ? 1 : 0,
      };

      const formData = new FormData();

      // Only send new file if user uploaded it
      if (newImageFile) {
        formData.append("imageUrl", newImageFile);
      }

      for (const key in updatedProduct) {
        if (key !== "imageUrl" && updatedProduct.hasOwnProperty(key)) {
          formData.append(key, updatedProduct[key]);
        }
      }

      // Add the authorization token to headers
      console.log("Token:", token); // Debug token
      const response = await axios.post(
        `https://nutrigeen.com/api/products/${productToEdit.id}`, //  `https://nutrigeen.com/public/api/products/${productToEdit.id}`,

        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to update product");
      }

      // Log the API response
      console.log("Product updated successfully:", response.data);

      // Update local products list with the updated product
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p
        )
      );

      CloseEditModal();
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setIsLoading(false); // End loading state
    }
  }

  // async function handlEditeSubmit(e) {
  //   e.preventDefault();

  //   if (!productToEdit.id) {
  //     console.error("No product ID provided");
  //     return;
  //   }

  //   console.log("Product to edit:", productToEdit);

  //   try {
  //     const token = localStorage.getItem("auth_token");
  //     if (!token) {
  //       console.error("No token found. Please log in again.");
  //       return;
  //     }

  //     console.log("Token from localStorage:", token);

  //     const formData = new FormData();
  //     for (const key in productToEdit) {
  //       if (productToEdit.hasOwnProperty(key)) {
  //         formData.append(key, productToEdit[key]);
  //       }
  //     }

  //     const response = await axios.put(
  //       `https://nutrigeen.com/api/products/${productToEdit.id}`,
  //       formData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     if (response.status !== 200) {
  //       throw new Error(`Failed to update product: ${response.statusText}`);
  //     }

  //     console.log("Product updated successfully:", response.data);
  //     // ✅ Update local products list
  //     setProducts((prevProducts) =>
  //       prevProducts.map((p) =>
  //         p.id === productToEdit.id ? { ...p, ...productToEdit } : p
  //       )
  //     );
  //     CloseEditModal();
  //   } catch (error) {
  //     console.error(
  //       "Error updating product:",
  //       error.response?.data || error.message
  //     );
  //   }
  // }

  async function handleDeleteProduct(e) {
    e.preventDefault();

    if (!productToEdit.id) {
      console.error("No product ID provided");
      return;
    }

    try {
      // const token = localStorage.getItem("auth_token");
      if (!token) {
        console.error("No token found. Please log in again.");
        return;
      }

      console.log("Token from localStorage:", token);

      const response = await axios.delete(
        `https://nutrigeen.com/api/products/${productToEdit.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error(`Failed to update product: ${response.statusText}`);
      }
      // ✅ Remove the product from local state
      setProducts((prevProducts) =>
        prevProducts.filter((p) => p.id !== productToEdit.id)
      );
      CloseEditModal();
    } catch (error) {
      console.error(
        "Error updating product:",
        error.response?.data || error.message
      );
    }
  }

  function openEditModal() {
    setNewImageFile(null); // ✅ Clear previously selected image

    setIsOpenEdit(true);
  }

  function CloseEditModal() {
    setIsOpenEdit(false);
  }
  //Edit Modal

  //End Modal control
  function handleCancel() {
    setProductToEdit(defaultProduct);
    setNewImageFile(null); // ✅ Reset new image on cancel

    CloseEditModal();
  }
  // Handle category selection

  function handleEditChange(e) {
    const { name, type, checked, value } = e.target;

    setProductToEdit((product) => ({
      ...product,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
      category: selectedCategory,
    }));
  }

  function handleCategoryChange(category) {
    console.log("Selected category:", category);
    setSelectedCategory(category);

    // Update the product immediately when the category changes
    setProductToEdit((product) => ({
      ...product,
      category: category, // Directly set the category here
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
    <div className="bg-[#f9faf7] basis-[100%]">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-[100px] gap-x-[145px] lg:gap-x-[5px] h-[400px] md:h-[750px] lg:h-[500px] grid-rows-[350px] overflow-y-scroll w-full place-items-center">
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
                handleDeleteProduct={handleDeleteProduct}
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
            {/* 🆕 Dropzone for uploading the product image (match Add Product layout) */}
            <div className="!mb-[10px] flex flex-col">
              <label className="text-[#0000009c] font-bold">Upload Image</label>
              {/* <ImgDropZone
                onFileAccepted={(file) =>
                  setProductToEdit((prev) => ({ ...prev, imageUrl: file }))
                }
              /> */}
              <ImgDropZone onFileAccepted={(file) => setNewImageFile(file)} />
            </div>

            {/* 🧾 Input fields layout (same as Add Product) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    value={productToEdit[input.name] || ""}
                    onChange={handleEditChange}
                  />
                </div>
              ))}
            </div>

            {/* 🏷️ Category select menu */}
            <SelectMenu
              products={products}
              value={selectedCategory || ""}
              onValueChange={handleCategoryChange}
            />

            {/* 🔘 Action buttons */}
            <div className="flex gap-2 !mt-[20px]">
              <button
                className="w-[50%] justify-center inline-flex items-center gap-2 rounded-md bg-[blueviolet] !py-1.5 !px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                onClick={handleCancel}
                type="button"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="w-[50%] justify-center inline-flex items-center gap-2 rounded-md bg-[blueviolet] !py-1.5 !px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
              >
                {isLoading ? (
                  <CgSpinner className="animate-spin text-blueviolet text-lg" />
                ) : (
                  "Submit"
                )}
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
  handleDeleteProduct,
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
    <div className="card bg-base-100 w-[200px] shadow-sm   relative h-[400px]">
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
          <button
            className="text-white font-bold rounded-[10px] bg-[#ff3333] !p-[10px]  text-center w-[50%]"
            onClick={(e) => {
              setProductToEdit(product);
              handleDeleteProduct(e);
            }}
          >
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
