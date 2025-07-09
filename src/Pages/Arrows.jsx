import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Html5Qrcode } from "html5-qrcode";
import { bluetoothManager } from "../BluetoothManager";

export default function Arrows() {
  return (
    <div className="text-white !p-4 flex flex-col items-center justify-center relative">
      {/* ✅ Modal popup after scan */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div className="bg-white text-black !p-6 rounded-lg shadow-xl text-center w-[90%] max-w-sm">
          <h2 className="font-bold text-lg !mb-4 text-blueviolet">
            Device scanned. Click below to connect.
          </h2>
          <button className="w-full bg-[blueviolet] text-white font-bold rounded-lg !px-4 !py-2 !mb-3">
            Connect to ESP32
          </button>
          <button className="w-full border border-[blueviolet] text-[blueviolet] font-bold rounded-lg !px-4 !py-2">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
