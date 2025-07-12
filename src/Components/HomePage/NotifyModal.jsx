// NotifyModal.jsx
import React from "react";

export default function NotifyModal({ onClose, onLogin }) {
  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-100 w-full h-full">
      <div className="bg-white !p-6 rounded-xl shadow-2xl w-[90%] max-w-sm">
        <h2 className="text-lg font-bold !mb-4 text-center">
          You must log in to use this feature
        </h2>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-300 !px-4 !py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onLogin}
            className="bg-[blueviolet] text-white !px-4 !py-2 rounded hover:bg-[blueviolet]/90"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}
