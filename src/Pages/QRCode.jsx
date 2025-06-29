// // src/pages/ConnectPage.js
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Capacitor } from "@capacitor/core";
// import { BluetoothLe } from "@capacitor-community/bluetooth-le";
// import { BarcodeScanner } from "@capacitor-community/barcode-scanner";

// export default function QRCode() {
//   const [inputValue, setInputValue] = useState("");
//   const [deviceId, setDeviceId] = useState("");
//   const navigate = useNavigate();

//   const handleQRScan = async () => {
//     try {
//       await BarcodeScanner.checkPermission({ force: true });
//       const result = await BarcodeScanner.startScan();
//       if (result.hasContent) {
//         setInputValue(result.content);
//         setDeviceId(result.content);
//         alert("QR Code Scanned: " + result.content);
//       }
//     } catch (error) {
//       console.error("QR scan failed:", error);
//       alert("QR scan failed.");
//     }
//   };

//   const handleConnect = async () => {
//     try {
//       const result = await BluetoothLe.requestDevice({
//         filters: [{ name: inputValue }],
//       });

//       await BluetoothLe.connect({ deviceId: result.deviceId });
//       localStorage.setItem("ble-device-id", result.deviceId);
//       alert("Connected to " + result.deviceId);
//       navigate("/control");
//     } catch (err) {
//       console.error("Connection error:", err);
//       alert("Failed to connect to device.");
//     }
//   };

//   //   if (Capacitor.getPlatform() === "web") {
//   //     return <p>This page is only available on mobile devices.</p>;
//   //   }

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Connect to ESP32</h2>
//       <input
//         type="text"
//         placeholder="Enter BLE Name or MAC"
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//       />
//       <br />
//       <br />
//       <button onClick={handleConnect}>Connect</button>
//       <br />
//       <br />
//       <button onClick={handleQRScan}>Scan QR Code</button>
//     </div>
//   );
// }
// // This component allows users to connect to an ESP32 device via Bluetooth or QR code scanning.
// // It uses the Capacitor Bluetooth LE and Barcode Scanner plugins to facilitate the connection process.

// src/pages/ConnectPage.js
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Capacitor } from "@capacitor/core";
// import { BluetoothLe } from "@capacitor-community/bluetooth-le";
// import { BarcodeScanner } from "@capacitor-community/barcode-scanner";

// export default function ConnectPage() {
//   const [inputValue, setInputValue] = useState("");
//   const navigate = useNavigate();

//   // 👁 Automatically start QR scan when the component mounts
//   useEffect(() => {
//     if (Capacitor.getPlatform() === "web") {
//       startQRScan();
//     }
//   }, []);

//   const startQRScan = async () => {
//     try {
//       await BarcodeScanner.checkPermission({ force: true });
//       const result = await BarcodeScanner.startScan(); // Open camera immediately
//       if (result.hasContent) {
//         setInputValue(result.content);
//         alert("Scanned: " + result.content);
//       }
//     } catch (error) {
//       console.error("QR scan failed:", error);
//     }
//   };

//   const handleConnect = async () => {
//     try {
//       const result = await BluetoothLe.requestDevice({
//         filters: [{ name: inputValue }],
//       });

//       await BluetoothLe.connect({ deviceId: result.deviceId });
//       localStorage.setItem("ble-device-id", result.deviceId);
//       alert("Connected to " + result.deviceId);
//       navigate("/control");
//     } catch (err) {
//       console.error("Connection error:", err);
//       alert("Failed to connect to device.");
//     }
//   };

//   // if (Capacitor.getPlatform() === "web") {
//   //   return <p>This page is only available on mobile devices.</p>;
//   // }

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Connect to ESP32</h2>

//       <input
//         type="text"
//         placeholder="Enter BLE Name or MAC"
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//         style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
//       />

//       <button
//         onClick={handleConnect}
//         style={{
//           width: "100%",
//           padding: "12px",
//           backgroundColor: "#4CAF50",
//           color: "white",
//           border: "none",
//           marginBottom: "10px",
//         }}
//       >
//         Connect
//       </button>

//       <button
//         onClick={startQRScan}
//         style={{
//           width: "100%",
//           padding: "12px",
//           backgroundColor: "#007BFF",
//           color: "white",
//           border: "none",
//         }}
//       >
//         Scan
//       </button>
//     </div>
//   );
// }

// src/pages/ConnectPage.js

// /////////////////////////////////////////////////////////////
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Capacitor } from "@capacitor/core";
// import { BluetoothLe } from "@capacitor-community/bluetooth-le";
// import { BarcodeScanner } from "@capacitor-community/barcode-scanner";

// export default function ConnectPage() {
//   const [inputValue, setInputValue] = useState("");
//   const [scanning, setScanning] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (Capacitor.getPlatform() !== "web") {
//       startQRScan();
//     }
//     return () => {
//       BarcodeScanner.stopScan();
//       BarcodeScanner.hideBackground();
//       document.body.classList.remove("scanner-active");
//     };
//   }, []);

//   const startQRScan = async () => {
//     try {
//       await BarcodeScanner.checkPermission({ force: true });
//       await BarcodeScanner.showBackground();
//       document.body.classList.add("scanner-active");
//       setScanning(true);

//       const result = await BarcodeScanner.startScan({
//         targetedFormats: ["QR_CODE"],
//       });

//       if (result.hasContent) {
//         const scannedContent = result.content.trim();
//         console.log("QR Scanned Content:", scannedContent);

//         setInputValue(scannedContent);
//         localStorage.setItem("esp32-mac", scannedContent);
//         alert("Scanned: " + scannedContent);

//         await BarcodeScanner.stopScan();
//         BarcodeScanner.hideBackground();
//         document.body.classList.remove("scanner-active");
//         setScanning(false);

//         navigate("/control"); // ✅ only navigate after everything else
//       }
//     } catch (error) {
//       console.error("Scan error:", error);
//     }
//   };

//   const handleConnect = async () => {
//     try {
//       const result = await BluetoothLe.requestDevice({
//         filters: [{ name: inputValue }],
//       });

//       await BluetoothLe.connect({ deviceId: result.deviceId });
//       localStorage.setItem("ble-device-id", result.deviceId);
//       alert("Connected to " + result.deviceId);
//       navigate("/control");
//     } catch (err) {
//       console.error("Connection error:", err);
//       alert("Failed to connect to device.");
//     }
//   };

//   // if (Capacitor.getPlatform() === "web") {
//   //   return <p>This page is only available on mobile devices.</p>;
//   // }

//   return (
//     <div
//       style={{
//         padding: "20px",
//         backgroundColor: "transparent",
//         color: "white",
//       }}
//     >
//       <h2 className="text-center text-[blueviolet] font-bold">
//         Connect to ESP32
//       </h2>

//       {/* Scan Area */}
//       <div className="h-[250px] w-[250px] !mx-auto !my-[20px] rounded-lg border-4 border-[var(--main-color)] flex items-center justify-center">
//         {scanning ? null : (
//           <p className="text-[blueviolet] text-center font-bold">Camera View</p>
//         )}
//       </div>

//       <input
//         type="text"
//         placeholder="Enter BLE MAC Address"
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//         className="text-2xl font-bold text-[blueviolet] w-full !p-2.5 !m-2.5 outline-0 border-b-[1px] border-[blueviolet] caret-inherit"
//       />

//       <button
//         onClick={handleConnect}
//         className="w-full !p-3 !mb-2.5 bg-[blueviolet] text-white font-bold rounded-lg"
//       >
//         Connect
//       </button>

//       {!scanning && (
//         <button
//           onClick={startQRScan}
//           className="w-full !p-3  bg-[blueviolet] text-white font-bold rounded-lg"
//         >
//           Scan
//         </button>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Capacitor } from "@capacitor/core";
import { BluetoothLe } from "@capacitor-community/bluetooth-le";
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";

export default function ConnectPage() {
  const [inputValue, setInputValue] = useState("");
  const [scanning, setScanning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (Capacitor.getPlatform() !== "web") {
      startQRScan();
    }

    return () => {
      BarcodeScanner.stopScan().catch(() => {});
      BarcodeScanner.hideBackground().catch(() => {});
      document.body.classList.remove("scanner-active");
    };
  }, []);

  const startQRScan = async () => {
    try {
      await BarcodeScanner.checkPermission({ force: true });
      await BarcodeScanner.showBackground();
      document.body.classList.add("scanner-active");
      setScanning(true);

      const result = await BarcodeScanner.startScan({
        targetedFormats: ["QR_CODE"],
      });

      if (result.hasContent) {
        const scannedContent = result.content.trim();
        console.log("QR Scanned Content:", scannedContent);

        setInputValue(scannedContent);
        localStorage.setItem("esp32-mac", scannedContent);
        alert("Scanned: " + scannedContent);

        await BarcodeScanner.stopScan();
        await BarcodeScanner.hideBackground();
        document.body.classList.remove("scanner-active");
        setScanning(false);

        // ✅ Delay ensures smooth navigation after releasing camera
        setTimeout(() => {
          navigate("/control");
        }, 300);
      } else {
        await BarcodeScanner.stopScan();
        await BarcodeScanner.hideBackground();
        document.body.classList.remove("scanner-active");
        setScanning(false);
      }
    } catch (error) {
      console.error("Scan error:", error);
      setScanning(false);
    }
  };

  const handleConnect = async () => {
    try {
      const result = await BluetoothLe.requestDevice({
        filters: [{ name: inputValue }],
      });

      await BluetoothLe.connect({ deviceId: result.deviceId });
      localStorage.setItem("ble-device-id", result.deviceId);
      alert("Connected to " + result.deviceId);
      navigate("/control");
    } catch (err) {
      console.error("Connection error:", err);
      alert("Failed to connect to device.");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "transparent",
        color: "white",
      }}
    >
      <h2 className="text-center text-[blueviolet] font-bold">
        Connect to ESP32
      </h2>

      {/* Camera Preview Area */}
      <div className="h-[250px] w-[250px] !mx-auto !my-[20px] rounded-lg border-4 border-[var(--main-color)] flex items-center justify-center">
        {scanning ? null : (
          <p className="text-[blueviolet] text-center font-bold">Camera View</p>
        )}
      </div>

      <input
        type="text"
        placeholder="Enter BLE MAC Address"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="text-2xl font-bold text-[blueviolet] w-full !p-2.5 !m-2.5 outline-0 border-b-[1px] border-[blueviolet] caret-inherit"
      />

      <button
        onClick={handleConnect}
        className="w-full !p-3 !mb-2.5 bg-[blueviolet] text-white font-bold rounded-lg"
      >
        Connect
      </button>

      {!scanning && (
        <button
          onClick={startQRScan}
          className="w-full !p-3 bg-[blueviolet] text-white font-bold rounded-lg"
        >
          Scan
        </button>
      )}
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Capacitor } from "@capacitor/core";
// import { BarcodeScanner } from "@capacitor-mlkit/barcode-scanning";
// import { BluetoothLe } from "@capacitor-community/bluetooth-le";

// export default function ConnectPage() {
//   const [inputValue, setInputValue] = useState("");
//   const [scanning, setScanning] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (Capacitor.getPlatform() !== "web") {
//       startQRScan(); // 🔁 Start scan automatically like old code
//     }

//     return () => {
//       BarcodeScanner.stopScan().catch(() => {});
//       BarcodeScanner.hidePreview().catch(() => {});
//     };
//   }, []);

//   const startQRScan = async () => {
//     try {
//       const permission = await BarcodeScanner.requestPermissions();

//       if (permission.camera?.granted !== true) {
//         alert("Camera permission is required to scan QR codes.");
//         return;
//       }

//       setScanning(true);

//       const result = await BarcodeScanner.scanBarcode();

//       if (result?.barcodes?.length > 0) {
//         const scannedContent = result.barcodes[0].rawValue.trim();
//         console.log("QR Scanned Content:", scannedContent);

//         setInputValue(scannedContent);
//         localStorage.setItem("esp32-mac", scannedContent);
//         alert("Scanned: " + scannedContent);

//         setScanning(false);
//         navigate("/control");
//       } else {
//         setScanning(false);
//       }
//     } catch (error) {
//       console.error("Scan error:", error);
//       alert("QR Scan failed.");
//       setScanning(false);
//     }
//   };

//   const handleConnect = async () => {
//     try {
//       const result = await BluetoothLe.requestDevice({
//         filters: [{ name: inputValue }],
//       });

//       await BluetoothLe.connect({ deviceId: result.deviceId });
//       localStorage.setItem("ble-device-id", result.deviceId);
//       alert("Connected to " + result.deviceId);
//       navigate("/control");
//     } catch (err) {
//       console.error("Connection error:", err);
//       alert("Failed to connect to device.");
//     }
//   };

//   return (
//     <div
//       style={{
//         padding: "20px",
//         backgroundColor: "transparent",
//         color: "white",
//       }}
//     >
//       <h2 className="text-center text-[blueviolet] font-bold">
//         Connect to ESP32
//       </h2>

//       <div className="h-[250px] w-[250px] !mx-auto !my-[20px] rounded-lg border-4 border-[var(--main-color)] flex items-center justify-center">
//         {scanning ? null : (
//           <p className="text-[blueviolet] text-center font-bold">Camera View</p>
//         )}
//       </div>

//       <input
//         type="text"
//         placeholder="Enter BLE Name"
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//         className="text-2xl font-bold text-[blueviolet] w-full !p-2.5 !m-2.5 outline-0 border-b-[1px] border-[blueviolet] caret-inherit"
//       />

//       <button
//         onClick={handleConnect}
//         className="w-full !p-3 !mb-2.5 bg-[blueviolet] text-white font-bold rounded-lg"
//       >
//         Connect
//       </button>

//       {!scanning && (
//         <button
//           onClick={startQRScan}
//           className="w-full !p-3 bg-[blueviolet] text-white font-bold rounded-lg"
//         >
//           Scan
//         </button>
//       )}
//     </div>
//   );
// }
