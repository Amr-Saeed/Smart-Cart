// src/Components/QRPopup.jsx
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import socket from "../WebSockets/ScannerSocket";

function QRPopup() {
  const [show, setShow] = useState(false);
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const handleQR = (data) => {
      if (data.imageData) {
        setImageData(`data:image/jpeg;base64,${data.imageData}`);
        setShow(true);
      }
    };

    socket.on("qrcode", handleQR);

    return () => {
      socket.off("qrcode", handleQR);
    };
  }, []);

  if (!show || !imageData) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg !p-6 max-w-xl w-full text-center relative">
        <button
          className="absolute top-2 right-2 text-3xl text-[blueviolet]"
          onClick={() => setShow(false)}
        >
          <IoClose />
        </button>
        <h2 className="text-xl font-bold text-[blueviolet] !mb-4">
          Scanned QR
        </h2>
        <img
          src={"/png.png"} // Replace with actual QR image path
          alt="QR"
          className="max-w-full max-h-[500px] !mx-auto rounded-md"
        />
      </div>
    </div>,
    document.body
  );
}

export default QRPopup;
