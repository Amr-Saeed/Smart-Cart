// src/Components/GoToPopup.jsx
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";
import socket from "../../WebSockets/ScannerSocket"; // ✅ Import socket
import { CgSpinner } from "react-icons/cg";

function GoToPopup({ onClose, name }) {
  const [loading, setLoading] = useState(false);
  const [imagePath, setImagePath] = useState(null);

  const handleGoToClick = () => {
    setLoading(true);
    setImagePath(null); // reset image

    const coords = {
      productName: name,
      x: 10, // hardcoded for now or pass as props
      y: 20,
    };

    console.log("📤 Sending go-to-request with:", coords);
    socket.emit("product_location", coords);
  };

  useEffect(() => {
    const handleRouteImage = (data) => {
      if (data.imageData) {
        setImagePath(`data:image/jpeg;base64,${data.imageData}`);
      }
      setLoading(false);
    };

    socket.on("route-image", handleRouteImage);

    return () => {
      socket.off("route-image", handleRouteImage);
    };
  }, []);

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`bg-white rounded-xl shadow-lg p-8 w-full text-center transition-all duration-500 ease-in-out ${
          imagePath
            ? "max-h-screen max-w-2xl overflow-y-auto"
            : "h-[20%] max-w-md"
        }`}
      >
        <div className="flex items-center justify-between !mb-4 !mt-2">
          <h2 className="text-2xl font-semibold  text-[blueviolet]">
            🗺️ Need To Go?
          </h2>

          <button
            onClick={onClose}
            className="text-[2.25rem] text-[blueviolet]"
          >
            <IoClose />
          </button>
        </div>
        {/* ✅ Show loading spinner */}
        {loading && (
          <div className="w-full flex justify-center items-center mt-4">
            <CgSpinner className="animate-spin text-[blueviolet] w-10 h-10" />
          </div>
        )}

        {/* ✅ Show image if received */}
        {!loading && imagePath && (
          <div className="w-full flex justify-center items-center mt-4 px-4">
            <img
              src={imagePath}
              alt="Route"
              className="max-w-full max-h-[500px] w-auto h-auto object-contain rounded-md"
            />
          </div>
        )}

        {/* ✅ Show button if not loading and no image yet */}
        {!loading && !imagePath && (
          <button
            onClick={handleGoToClick}
            className="w-[250px] !mt-[15px] bg-[blueviolet] text-white font-bold text-[1.4rem] h-12 rounded-[20px] hover:bg-[#aa8cee] transition duration-300"
          >
            GoTo {name} Location
          </button>
        )}
      </div>
    </div>,
    document.body
  );
}

export default GoToPopup;
