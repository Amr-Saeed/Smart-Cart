import Logo from "../HomePage/Header/Logo";
import { FaHome } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { useState } from "react";
import Modal from "./Modal";
import inputFields from "./InputFields";
import InputField from "./InputField";
import SelectMenu from "./SelectMenu";
import { useAuth } from "@clerk/clerk-react";
import ImgDropZone from "./ImgDropZone";
import { useEffect } from "react";
import { useToken } from "../TokenContext";
import axios from "axios";
import { motion } from "framer-motion";
import Combo from "./ComboBox";
import { CgSpinner } from "react-icons/cg";

function DashSideBar({
  product,
  setProduct,
  products,
  selectedCategory,
  handleCategoryChange,
  defaultProduct,
  setSelectedCategory,
  setProducts,
}) {
  const [activeTab, setActiveTab] = useState("Home");
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // const { getToken } = useAuth();
  const { token } = useToken(); // Assuming you're using a custom hook to get the token
  // Update selectedCategory whenever productToEdit changes
  useEffect(() => {
    if (product && product.category !== selectedCategory) {
      setSelectedCategory(product.category);
    }
  }, [product]);

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
    handleTabClick("Home");
  }
  // function handleSubmit(e) {
  //   e.preventDefault();
  //   console.log(product); //HERE WE WILL POST TO THE API
  // }

  function handleFileChange(file) {
    setProduct((prevProduct) => ({
      ...prevProduct,
      imageUrl: file, // Save the file in the imageUrl field
    }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    console.log(product); // Confirm it contains id and other fields

    try {
      // const token = await getToken();

      console.log("Token:", token); // Check if token is retrieved

      // Create FormData to simulate a form submission
      const formData = new FormData();

      // Append your product data to FormData
      // for (const key in product) {
      //   if (product.hasOwnProperty(key)) {
      //     formData.append(key, product[key]);
      //   }
      // }

      const finalProduct = {
        ...product,
        stockAvailability: Number(product.inStock) > 0 ? 1 : 0,
      };

      for (const key in finalProduct) {
        if (finalProduct.hasOwnProperty(key)) {
          const value = finalProduct[key];
          if (value instanceof File) {
            // If it's a File object, append it directly
            formData.append(key, value);
          } else {
            // Otherwise, append it as text
            formData.append(key, value);
          }
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
      CloseAddModal();
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setIsLoading(false);
    }
    handleTabClick("Home");
  }

  function handleTabClick(tab) {
    setActiveTab(tab);
  }

  function handleChange(e) {
    const { name, type, checked, value } = e.target;

    setProduct((product) => ({
      ...product,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
      category: selectedCategory,
    }));
  }

  return (
    <motion.div
      onMouseEnter={() => setSidebarOpen(true)}
      onMouseLeave={() => setSidebarOpen(false)}
      animate={{ width: sidebarOpen ? 220 : 70 }}
      transition={{ duration: 0.3 }}
      className="bg-[#ededed] flex flex-col overflow-hidden place-items-center"
    >
      <Logo
        src="/logo.webp"
        alt="Smart-Cart"
        className="w-[58px] h-[58px]   logoLG hidden lg:flex   !mb-[30px]"
      />
      <Logo
        src="/logo.webp"
        alt="Smart-Cart"
        className="w-[58px] h-[58px] lg:hidden  logo   relative   !mb-[30px]"
      />
      <div
        className={`Home transition-all duration-500 cursor-pointer ${
          activeTab === "Home" ? "bg-[#7a4ae569]" : "bg-transparent"
        } flex items-center gap-[10px] text-[1.4rem] !mb-[20px] text-[blueviolet] w-full justify-center  h-[40px]`}
        onClick={() => handleTabClick("Home")}
      >
        <FaHome />
        <motion.span
          initial={false}
          animate={{
            opacity: sidebarOpen ? 1 : 0,
            x: sidebarOpen ? 0 : -10,
            display: sidebarOpen ? "inline-block" : "none",
          }}
          transition={{ duration: 0.2 }}
          className="text-[blueviolet] text-[1.4rem] whitespace-nowrap"
        >
          Home
        </motion.span>
      </div>
      <div
        className={`addProduct transition-all duration-500 cursor-pointer ${
          activeTab === "addProduct" ? "bg-[#7a4ae569] " : "bg-transparent"
        } flex items-center gap-[10px] text-[1.4rem]  text-[blueviolet] w-full justify-center  h-40px`}
        onClick={openModal}
      >
        <IoIosAddCircle />
        <motion.span
          initial={false}
          animate={{
            opacity: sidebarOpen ? 1 : 0,
            x: sidebarOpen ? 0 : -10,
            display: sidebarOpen ? "inline-block" : "none",
          }}
          transition={{ duration: 0.2 }}
          className="text-[blueviolet] text-[1.4rem] whitespace-nowrap"
        >
          Add Product
        </motion.span>
      </div>
      {/* Add Product Modal */}
      <Modal isOpen={isOpen} close={CloseAddModal} title={"Add Product"}>
        <form onSubmit={handleSubmit}>
          {/* 🆕 Dropzone for uploading the product image */}
          <div className="!mb-[10px] flex flex-col">
            <label className="text-[#0000009c] font-bold">Upload Image</label>
            <ImgDropZone onFileAccepted={handleFileChange} />
          </div>
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
                  value={product?.[input.name] || ""}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>

          <Combo
            products={products}
            value={selectedCategory}
            onValueChange={handleCategoryChange}
          />
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
              )}{" "}
            </button>
          </div>
        </form>
      </Modal>
      {/* Add Product Modal */}
    </motion.div>
  );
}

export default DashSideBar;
