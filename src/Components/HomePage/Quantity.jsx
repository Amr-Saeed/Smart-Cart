import { useUser } from "@clerk/clerk-react";
import { useQuantity } from "./useQuantity";
import { useCartContext } from "../Cart/CartContext";
import { CgSpinner } from "react-icons/cg";
import NotifyModal from "./NotifyModal";
import { useClerk } from "@clerk/clerk-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

export function Quantity({
  stockAvailability,
  id,
  productName,
  atProduct = false,
  comingFromSmallScreenProduct = false,
  comingFromSmScreensCategoryPage = false,
}) {
  const {
    quantity,
    handleAdd,
    handleDec,
    handleChange,
    handleFocus,
    handleBlur,
    isLoading,
    inputValue,
    handleEnter,
  } = useQuantity(id);

  const { cartItems } = useCartContext();
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const navigate = useNavigate();
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const [showNotifyModal, setShowNotifyModal] = useState(false);
  // const newQuantity = user ? cartQuantity : quantity; // Assuming 'example' stores the role
  const cartItem = cartItems.find((item) => item.product_id === id);
  const newQuantity = user ? cartItem?.quantity ?? 0 : quantity;

  function sendNotificationEmail(user) {
    const templateParams = {
      user_name: user.fullName || "Customer",
      user_email: user.emailAddresses[0]?.emailAddress,
      title: "Back in Stock Notification",
      product_name: productName,
    };

    return emailjs
      .send(
        "service_7z0eqfg", // ✅ Your actual Service ID
        "template_avrdwh1", // ✅ Your actual Template ID
        templateParams,
        "9acUAv24_ue659yoM" // ✅ Your actual Public Key
      )
      .then((response) => {
        console.log("✅ Email sent:", response.status, response.text);
        toast.success("Please check your email 🙂");
      })
      .catch((error) => {
        console.error("❌ Email failed:", error);
        toast.error("Failed to send notification. Please try again.");
      });
  }
  const handleNotifyClick = () => {
    if (!user) {
      console.log("No user — showing modal");

      setShowNotifyModal(true);
    } else {
      setIsSendingEmail(true);
      sendNotificationEmail(user).finally(() => setIsSendingEmail(false));
    }
  };
  console.log("Quantity about to send:", cartItem?.quantity, "id:", id);

  // const newQuantity = user ? quantityByProductId[id] || 0 : quantity;
  return (
    <>
      {/* ✅ Modal popup for guest users */}
      {showNotifyModal && (
        <NotifyModal
          onClose={() => setShowNotifyModal(false)}
          onLogin={() => navigate("/")} // or openSignIn()
        />
      )}
      <div
        className={`QuantityInput  self-center ${
          comingFromSmallScreenProduct
            ? "w-full"
            : comingFromSmScreensCategoryPage
            ? "w-[135px]"
            : "w-[187px]"
        } relative rounded-[15px] flex items-center justify-center `}
      >
        {stockAvailability ? (
          <>
            <div
              className={`expandInput ${
                comingFromSmallScreenProduct
                  ? "w-full"
                  : "flex justify-center items-center"
              } `}
            >
              <button
                aria-label="decrease-quantity"
                onClick={() => handleDec(id)}
                className="dec w-10 h-10 rounded-[15px] absolute left-0  text-[2rem] flex items-center justify-center"
              >
                -
              </button>
              <span>
                <input
                  type="number"
                  step={1}
                  min={1}
                  value={isLoading ? "" : inputValue}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={(e) => {
                    // Delay to let visibilityState settle
                    setTimeout(() => {
                      if (document.visibilityState === "visible") {
                        handleBlur(e);
                      }
                    }, 100); // 100ms delay to allow for tab switching
                  }}
                  onKeyDown={(e) => {
                    handleEnter(e, id);
                  }}
                  className="w-[100%] font-bold  h-10 rounded-[15px] input outline-none text-center"
                />
                {isLoading && (
                  <CgSpinner className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin text-[blueviolet]" />
                )}
              </span>
            </div>
            <button
              aria-label="increase-quantity"
              onClick={() => handleAdd(id)}
              className={` inc absolute ${
                isLoading ? "bg-[#c9b2ff]" : "bg-[var(--main-color-2)]"
              } right-0 w-10 h-10  rounded-[15px] text-white text-[2rem] flex items-center justify-center`}
              disabled={isLoading}
            >
              +
            </button>

            {/* {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-60 rounded-[15px]">
            <span className="loader" />{" "}
            <span className="sr-only">Loading...</span>
            </div>
            )} */}
          </>
        ) : (
          <button
            onClick={handleNotifyClick}
            disabled={isSendingEmail || showNotifyModal}
            className={`Notify text-white 
    ${comingFromSmScreensCategoryPage ? "w-[135px]" : "w-full"} 
    rounded-2xl !p-2.5 font-bold text-center
    ${isSendingEmail || showNotifyModal ? "opacity-50 !cursor-not-allowed" : ""}
  `}
            aria-label="Notify-Button"
          >
            {atProduct ? "Add to Cart" : "Notify Me"}
          </button>
        )}
      </div>
    </>
  );
}
