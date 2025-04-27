import Logo from "../HomePage/Header/Logo";
import { FaHome } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { useState } from "react";
import Modal from "./Modal";
import inputFields from "./InputFields";
import InputField from "./InputField";
import SelectMenu from "./SelectMenu";
import { useAuth } from "@clerk/clerk-react";

function DashSideBar({
  product,
  setProduct,
  products,
  selectedCategory,
  handleCategoryChange,
  defaultProduct,
}) {
  const [activeTab, setActiveTab] = useState("Home");
  const [isOpen, setIsOpen] = useState(false);
  const { getToken } = useAuth();

  console.log("productsssssssss", product);
  //Add Modal
  function openModal() {
    handleTabClick("addProduct");
    setIsOpen(true);
  }

  function CloseAddModal() {
    setIsOpen(false);
  }
  //Add Modal

  function handleCancel() {
    setProduct(defaultProduct);
    CloseAddModal();
  }
  // function handleSubmit(e) {
  //   e.preventDefault();
  //   console.log(product); //HERE WE WILL POST TO THE API
  // }
  async function handleSubmit(e) {
    e.preventDefault();

    console.log(product); // Confirm it contains id and other fields

    try {
      const token = await getToken();

      // Create FormData to simulate a form submission
      const formData = new FormData();

      // Append your product data to FormData
      for (const key in product) {
        if (product.hasOwnProperty(key)) {
          formData.append(key, product[key]);
        }
      }

      // Add the authorization token to headers
      const response = await fetch(`https://nutrigeen.com/api/products`, {
        method: "POST", // or 'PATCH' depending on your API
        headers: {
          Authorization: `Bearer ${token}`,
          // 'Content-Type' should NOT be set here when using FormData
          // The browser will automatically set it correctly
        },
        body: formData,
      });

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

  function handleTabClick(tab) {
    setActiveTab(tab);
  }

  function handleChange(e) {
    const { value, name } = e.target;

    setProduct((product) => ({
      ...product,
      [name]: value,
      category: selectedCategory,
    }));
  }
  return (
    <div className="bg-[#ededed] flex flex-col  basis-[20%] place-items-center ">
      <Logo
        src="/logo.webp"
        alt="Smart-Cart"
        className="w-24 h-24   logoLG hidden lg:flex   !mb-[30px]"
      />
      <Logo
        src="/logo.webp"
        alt="Smart-Cart"
        className="md:w-24 md:h-24 lg:hidden  logo left-[12px] md:left-0 relative   !mb-[30px]"
      />
      <div
        className={`Home transition-all duration-500 cursor-pointer ${
          activeTab === "Home" ? "bg-[#7a4ae569]" : "bg-transparent"
        } flex items-center gap-[10px] text-[1.4rem] !mb-[20px] text-[blueviolet] w-full justify-center  h-[40px]`}
        onClick={() => handleTabClick("Home")}
      >
        <FaHome />
        <span>Home</span>
      </div>
      <div
        className={`addProduct transition-all duration-500 cursor-pointer ${
          activeTab === "addProduct" ? "bg-[#7a4ae569] " : "bg-transparent"
        } flex items-center gap-[10px] text-[1.4rem]  text-[blueviolet] w-full justify-center  h-40px`}
        onClick={openModal}
      >
        <IoIosAddCircle />
        <span>Add Product</span>
      </div>
      {/* Add Product Modal */}
      <Modal isOpen={isOpen} close={CloseAddModal} title={"Add Product"}>
        <form onSubmit={handleSubmit}>
          {inputFields.map((input) => (
            <div className="!mb-[10px] flex flex-col" key={input.id}>
              <label htmlFor={input.id} className="text-[#0000009c] font-bold">
                {input.label}
              </label>
              <InputField
                input={input}
                value={product?.[input.name] || ""}
                onChange={handleChange}
              />
            </div>
          ))}
          <SelectMenu
            products={products}
            value={selectedCategory}
            onValueChange={handleCategoryChange}
          />
          <div className="flex gap-2 !mt-[20px]">
            <button
              className="w-[50%] justify-center inline-flex items-center gap-2 rounded-md bg-gray-700 !py-1.5 !px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
              onClick={handleCancel}
              type="button"
            >
              Cancel
            </button>
            <button className="w-[50%] justify-center inline-flex items-center gap-2 rounded-md bg-gray-700 !py-1.5 !px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700">
              Submit
            </button>
          </div>
        </form>
      </Modal>
      {/* Add Product Modal */}
    </div>
  );
}

export default DashSideBar;
