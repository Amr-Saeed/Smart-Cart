// import socket from "./scannerSocket";

// export function setupScannerListener() {
//   socket.on("connect", () => {
//     console.log("✅ Connected to WebSocket server");
//   });

//   socket.on("scanner-data", (data) => {
//     console.log("📦 Data received from backend:", data);
//     alert(`📦 New scan: ${data.name} (${data.code})`);
//   });

//   socket.on("connect_error", (err) => {
//     console.error("❌ WebSocket connection error:", err.message);
//   });
// }

import socket from "./scannerSocket";
import { toast } from "react-toastify";

let alreadyListening = false;

export function setupScannerListener() {
  if (alreadyListening) return;
  alreadyListening = true;

  socket.on("connect", () => {
    console.log("✅ Connected to WebSocket server");
  });

  socket.on("scanner-data", (data) => {
    console.log("📦 Data received:", data);
    toast.success(`📦 Scanned: ${data.name} (${data.code})`, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  });

  socket.on("connect_error", (err) => {
    console.error("❌ WebSocket error:", err.message);
  });
}

// import socket from "./scannerSocket";

// let alreadyListening = false;

// export function setupScannerListener(onDataReceived) {
//   if (alreadyListening) return;
//   alreadyListening = true;

//   socket.on("connect", () => {
//     console.log("✅ Connected to WebSocket server");
//   });

//   socket.on("scanner-data", (data) => {
//     console.log("📦 Received:", data);
//     if (onDataReceived) onDataReceived(data); // pass to App.jsx
//   });

//   socket.on("connect_error", (err) => {
//     console.error("❌ WebSocket error:", err.message);
//   });
// }
