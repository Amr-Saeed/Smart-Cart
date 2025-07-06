// // // src/pages/ControlPage.js
// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { BluetoothLe } from "@capacitor-community/bluetooth-le";
// // import { Capacitor } from "@capacitor/core";

// // export default function ControlPage() {
// //   const [connected, setConnected] = useState(false);
// //   const [deviceId, setDeviceId] = useState(null);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const connectToDevice = async () => {
// //       const espName = localStorage.getItem("esp32-mac");

// //       if (!espName) {
// //         alert("No device name found. Please scan again.");
// //         navigate("/connect");
// //         return;
// //       }

// //       try {
// //         const result = await BluetoothLe.requestDevice({
// //           filters: [{ name: espName }],
// //         });

// //         await BluetoothLe.connect({ deviceId: result.deviceId });
// //         setDeviceId(result.deviceId);
// //         setConnected(true);
// //         console.log("✅ Connected to", result.deviceId);
// //       } catch (err) {
// //         console.error("❌ Connection failed:", err);
// //         alert("Failed to connect to ESP32.");
// //         navigate("/connect");
// //       }
// //     };

// //     if (Capacitor.getPlatform() !== "web") {
// //       connectToDevice();
// //     }
// //   }, [navigate]);

// //   const sendCommand = async (command) => {
// //     if (!deviceId) {
// //       alert("Not connected.");
// //       return;
// //     }

// //     try {
// //       const encoder = new TextEncoder();
// //       const value = encoder.encode(command);

// //       await BluetoothLe.write({
// //         deviceId,
// //         service: "your-service-uuid", // Replace this
// //         characteristic: "your-characteristic-uuid", // Replace this
// //         value: Buffer.from(value).toString("base64"),
// //       });

// //       console.log("Command sent:", command);
// //     } catch (err) {
// //       console.error("Send error:", err);
// //       alert("Failed to send command.");
// //     }
// //   };

// //   return (
// //     <div style={{ padding: 20, color: "white" }}>
// //       <h2 className="text-center text-[blueviolet] font-bold">
// //         {connected ? "Connected ✅" : "Connecting..."}
// //       </h2>

// //       <div className="grid grid-cols-2 gap-4 mt-8">
// //         <button onClick={() => sendCommand("F")} className="btn-control">
// //           Forward
// //         </button>
// //         <button onClick={() => sendCommand("B")} className="btn-control">
// //           Backward
// //         </button>
// //         <button onClick={() => sendCommand("L")} className="btn-control">
// //           Left
// //         </button>
// //         <button onClick={() => sendCommand("R")} className="btn-control">
// //           Right
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // src/pages/ControlPage.js
// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { BluetoothLe } from "@capacitor-community/bluetooth-le";
// // import { Capacitor } from "@capacitor/core";

// // export default function ControlPage() {
// //   const [connected, setConnected] = useState(false);
// //   const [deviceId, setDeviceId] = useState(null);
// //   const navigate = useNavigate();

// //   const SERVICE_UUID = "6E400001-B5A3-F393-E0A9-E50E24DCCA9E";
// //   const CHARACTERISTIC_UUID_RX = "6E400002-B5A3-F393-E0A9-E50E24DCCA9E";

// //   // const espName = "SMARTCART-94B5552CBB4E"; // ✅ use const

// //   useEffect(() => {
// //     const connectToDevice = async () => {
// //       try {
// //         // const result = await BluetoothLe.requestDevice({
// //         //   acceptAllDevices: true, // ✅ more compatible on Android 8
// //         // });

// //         console.log("Discovered Device:", result.name);

// //         if (result.name !== espName) {
// //           alert("ESP32 not found.");
// //           navigate("/HomePage");
// //           return;
// //         }

// //         await BluetoothLe.connect({ deviceId: "94:B5:55:2C:BB:4E" });
// //         setDeviceId("94:B5:55:2C:BB:4E");
// //         setConnected(true);
// //         console.log("✅ Connected to", "94:B5:55:2C:BB:4E");
// //       } catch (err) {
// //         console.error("❌ Connection failed:", err);
// //         alert("Failed to connect to ESP32.");
// //         navigate("/HomePage");
// //       }
// //     };

// //     if (Capacitor.getPlatform() !== "web") {
// //       connectToDevice();
// //     }
// //   }, [navigate]);

// //   const sendCommand = async (command) => {
// //     if (!deviceId) {
// //       alert("Not connected.");
// //       return;
// //     }

// //     try {
// //       const encoder = new TextEncoder();
// //       const value = encoder.encode(command);

// //       await BluetoothLe.write({
// //         deviceId,
// //         service: SERVICE_UUID,
// //         characteristic: CHARACTERISTIC_UUID_RX,
// //         value: Buffer.from(value).toString("base64"),
// //       });

// //       console.log("✅ Command sent:", command);
// //     } catch (err) {
// //       console.error("❌ Send error:", err);
// //       alert("Failed to send command.");
// //       navigate("/HomePage");
// //     }
// //   };

// //   return (
// //     <div style={{ padding: 20, color: "white" }}>
// //       <h2 className="text-center text-[blueviolet] font-bold">
// //         {connected ? "Connected ✅" : "Connecting..."}
// //       </h2>

// //       <div className="grid grid-cols-2 gap-4 mt-8">
// //         <button onClick={() => sendCommand("F")} className="btn-control">
// //           Forward
// //         </button>
// //         <button onClick={() => sendCommand("B")} className="btn-control">
// //           Backward
// //         </button>
// //         <button onClick={() => sendCommand("L")} className="btn-control">
// //           Left
// //         </button>
// //         <button onClick={() => sendCommand("R")} className="btn-control">
// //           Right
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { BluetoothLe } from "@capacitor-community/bluetooth-le";
// // import { Capacitor } from "@capacitor/core";

// // export default function ControlPage() {
// //   const [connected, setConnected] = useState(false);
// //   const [deviceId, setDeviceId] = useState(null);
// //   const navigate = useNavigate();

// //   const SERVICE_UUID = "6E400001-B5A3-F393-E0A9-E50E24DCCA9E";
// //   const CHARACTERISTIC_UUID_RX = "6E400002-B5A3-F393-E0A9-E50E24DCCA9E";

// //   const macAddress = "94:B5:55:2C:BB:4E";

// //   useEffect(() => {
// //     const setupBluetooth = async () => {
// //       try {
// //         await BluetoothLe.requestPermissions();
// //         await BluetoothLe.requestPermissions({
// //           permissions: ["location", "bluetooth", "bluetoothConnect"],
// //         });

// //         await BluetoothLe.initialize();
// //         await BluetoothLe.connect({ deviceId: macAddress });
// //         const permResult = await BluetoothLe.checkPermissions();
// //         console.log("Permission check", permResult);

// //         await BluetoothLe.connect({ deviceId: macAddress });
// //         setDeviceId(macAddress);
// //         setConnected(true);
// //         console.log("✅ Connected to", macAddress);
// //       } catch (err) {
// //         console.error("❌ Connection failed:", err);
// //         alert(
// //           "Failed to connect to ESP32.\n\n" +
// //             (err.message || JSON.stringify(err))
// //         );
// //         navigate("/HomePage");
// //       }
// //     };

// //     if (Capacitor.getPlatform() !== "web") {
// //       setupBluetooth();
// //     }
// //   }, [navigate]);

// //   const sendCommand = async (command) => {
// //     if (!deviceId) {
// //       alert("Not connected.");
// //       return;
// //     }

// //     try {
// //       const encoder = new TextEncoder();
// //       const value = encoder.encode(command);

// //       await BluetoothLe.write({
// //         deviceId,
// //         service: SERVICE_UUID,
// //         characteristic: CHARACTERISTIC_UUID_RX,
// //         value: Buffer.from(value).toString("base64"),
// //       });

// //       console.log("✅ Command sent:", command);
// //     } catch (err) {
// //       console.error("❌ Send error:", err);
// //       alert("Failed to send command.");
// //       navigate("/HomePage");
// //     }
// //   };

// //   return (
// //     <div style={{ padding: 20, color: "white" }}>
// //       <h2 className="text-center text-[blueviolet] font-bold">
// //         {connected ? "Connected ✅" : "Connecting..."}
// //       </h2>

// //       <div className="grid grid-cols-2 gap-4 mt-8">
// //         <button onClick={() => sendCommand("F")} className="btn-control">
// //           Forward
// //         </button>
// //         <button onClick={() => sendCommand("B")} className="btn-control">
// //           Backward
// //         </button>
// //         <button onClick={() => sendCommand("L")} className="btn-control">
// //           Left
// //         </button>
// //         <button onClick={() => sendCommand("R")} className="btn-control">
// //           Right
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { BluetoothLe } from "@capacitor-community/bluetooth-le";
// // import { Capacitor } from "@capacitor/core";

// // export default function ControlPage() {
// //   const [connected, setConnected] = useState(false);
// //   const [deviceId, setDeviceId] = useState(null);
// //   const navigate = useNavigate();

// //   const SERVICE_UUID = "6E400001-B5A3-F393-E0A9-E50E24DCCA9E";
// //   const CHARACTERISTIC_UUID_RX = "6E400002-B5A3-F393-E0A9-E50E24DCCA9E";

// //   const macAddress = "94:B5:55:2C:BB:4E";

// //   useEffect(() => {
// //     const setupBluetooth = async () => {
// //       try {
// //         // Ask for permissions first
// //         await BluetoothLe.requestPermissions({
// //           permissions: ["location", "bluetooth", "bluetoothConnect"],
// //         });

// //         // Log current permission state
// //         const permResult = await BluetoothLe.checkPermissions();
// //         console.log("🔍 Permissions result:", permResult);

// //         // Initialize BLE
// //         await BluetoothLe.initialize();

// //         // Connect to the ESP32
// //         await BluetoothLe.connect({ deviceId: macAddress });

// //         setDeviceId(macAddress);
// //         setConnected(true);
// //         console.log("✅ Connected to", macAddress);
// //       } catch (err) {
// //         console.error("❌ Connection failed:", err);
// //         alert(
// //           "Failed to connect to ESP32.\n\n" +
// //             (err.message || JSON.stringify(err))
// //         );
// //         navigate("/HomePage");
// //       }
// //     };

// //     if (Capacitor.getPlatform() !== "web") {
// //       setupBluetooth();
// //     }
// //   }, [navigate]);

// //   const sendCommand = async (command) => {
// //     if (!deviceId) {
// //       alert("Not connected.");
// //       return;
// //     }

// //     try {
// //       const encoder = new TextEncoder();
// //       const value = encoder.encode(command);

// //       await BluetoothLe.write({
// //         deviceId,
// //         service: SERVICE_UUID,
// //         characteristic: CHARACTERISTIC_UUID_RX,
// //         value: Buffer.from(value).toString("base64"),
// //       });

// //       console.log("✅ Command sent:", command);
// //     } catch (err) {
// //       console.error("❌ Send error:", err);
// //       alert("Failed to send command.");
// //       navigate("/HomePage");
// //     }
// //   };

// //   return (
// //     <div style={{ padding: 20, color: "white" }}>
// //       <h2 className="text-center text-[blueviolet] font-bold">
// //         {connected ? "Connected ✅" : "Connecting..."}
// //       </h2>

// //       <div className="grid grid-cols-2 gap-4 mt-8">
// //         <button onClick={() => sendCommand("F")} className="btn-control">
// //           Forward
// //         </button>
// //         <button onClick={() => sendCommand("B")} className="btn-control">
// //           Backward
// //         </button>
// //         <button onClick={() => sendCommand("L")} className="btn-control">
// //           Left
// //         </button>
// //         <button onClick={() => sendCommand("R")} className="btn-control">
// //           Right
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { BluetoothLe } from "@capacitor-community/bluetooth-le";
// import { Capacitor } from "@capacitor/core";

// export default function ControlPage() {
//   const [connected, setConnected] = useState(false);
//   const navigate = useNavigate();

//   const SERVICE_UUID = "6E400001-B5A3-F393-E0A9-E50E24DCCA9E";
//   const CHARACTERISTIC_UUID_RX = "6E400002-B5A3-F393-E0A9-E50E24DCCA9E";
//   const macAddress = "94:B5:55:2C:BB:4E"; // Your ESP32 MAC Address

//   useEffect(() => {
//     const setupBluetooth = async () => {
//       try {
//         const platform = Capacitor.getPlatform();
//         if (platform !== "android") {
//           alert("Bluetooth is only supported on Android.");
//           return;
//         }

//         // Request location permission first
//         const locPerm = await BluetoothLe.checkPermission({
//           permission: "location",
//         });
//         if (!locPerm) {
//           const res = await BluetoothLe.requestPermission({
//             permission: "location",
//           });
//           if (!res.result) throw new Error("Location permission denied");
//         }

//         // Request Bluetooth permissions
//         const neededPerms = {
//           permissions: ["bluetooth", "bluetoothScan", "bluetoothConnect"],
//         };
//         const permResult = await BluetoothLe.requestPermissions(neededPerms);

//         if (
//           !permResult.bluetooth ||
//           !permResult.bluetoothScan ||
//           !permResult.bluetoothConnect
//         ) {
//           throw new Error("Required Bluetooth permissions not granted");
//         }

//         // Initialize Bluetooth
//         await BluetoothLe.initialize();

//         // Connect to the device
//         await BluetoothLe.connect({ deviceId: macAddress });

//         setConnected(true);
//         console.log("✅ Connected to ESP32:", macAddress);
//       } catch (err) {
//         console.error(
//           "❌ Connection failed:",
//           err.message || JSON.stringify(err)
//         );
//         alert(
//           "Failed to connect to ESP32:\n\n" + (err.message || "Unknown error")
//         );
//         navigate("/HomePage");
//       }
//     };

//     setupBluetooth();
//   }, [navigate]);

//   const sendCommand = async (command) => {
//     if (!connected) {
//       alert("Not connected to a device.");
//       return;
//     }

//     try {
//       const encoder = new TextEncoder();
//       const value = encoder.encode(command);

//       await BluetoothLe.write({
//         deviceId: macAddress,
//         service: SERVICE_UUID,
//         characteristic: CHARACTERISTIC_UUID_RX,
//         value: Buffer.from(value).toString("base64"),
//       });

//       console.log("✅ Command sent:", command);
//     } catch (err) {
//       console.error(
//         "❌ Failed to send command:",
//         err.message || JSON.stringify(err)
//       );
//       alert("Error sending command. Please reconnect.");
//       navigate("/HomePage");
//     }
//   };

//   return (
//     <div
//       style={{
//         padding: 20,
//         color: "white",
//         backgroundColor: "#1e1e2f",
//         minHeight: "100vh",
//       }}
//     >
//       <h2 className="text-center text-[blueviolet] font-bold text-xl mb-4">
//         {connected ? "Connected ✅" : "Connecting..."}
//       </h2>

//       <div className="grid grid-cols-2 gap-4 mt-8">
//         <button onClick={() => sendCommand("F")} className="btn-control">
//           Forward
//         </button>
//         <button onClick={() => sendCommand("B")} className="btn-control">
//           Backward
//         </button>
//         <button onClick={() => sendCommand("L")} className="btn-control">
//           Left
//         </button>
//         <button onClick={() => sendCommand("R")} className="btn-control">
//           Right
//         </button>
//       </div>
//     </div>
//   );
// }

// ✅ ControlPage.jsx using Web Bluetooth API
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function ControlPage() {
//   const [connected, setConnected] = useState(false);
//   const [device, setDevice] = useState(null);
//   const [characteristic, setCharacteristic] = useState(null);
//   const navigate = useNavigate();

//   const SERVICE_UUID = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
//   const CHARACTERISTIC_UUID_RX = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";

//   useEffect(() => {
//     const connectToDevice = async () => {
//       try {
//         const mac = localStorage.getItem("esp32-mac") || "";

//         const device = await navigator.bluetooth.requestDevice({
//           filters: [{ name: mac }],
//           optionalServices: [SERVICE_UUID],
//         });

//         const server = await device.gatt.connect();
//         const service = await server.getPrimaryService(SERVICE_UUID);
//         const char = await service.getCharacteristic(CHARACTERISTIC_UUID_RX);

//         setDevice(device);
//         setCharacteristic(char);
//         setConnected(true);
//         console.log("✅ Connected to ESP32:", device.name);
//       } catch (err) {
//         console.error("❌ Connection failed:", err);
//         alert(
//           "Failed to connect to ESP32: " + (err.message || "Unknown error")
//         );
//         navigate("/HomePage");
//       }
//     };

//     connectToDevice();
//   }, [navigate]);

//   const sendCommand = async (command) => {
//     if (!connected || !characteristic) {
//       alert("Not connected to a device.");
//       return;
//     }

//     try {
//       const encoder = new TextEncoder();
//       await characteristic.writeValue(encoder.encode(command));
//       console.log("✅ Command sent:", command);
//     } catch (err) {
//       console.error("❌ Failed to send command:", err);
//       alert("Error sending command. Please reconnect.");
//       navigate("/HomePage");
//     }
//   };

//   return (
//     <div
//       style={{
//         padding: 20,
//         color: "white",
//         backgroundColor: "#1e1e2f",
//         minHeight: "100vh",
//       }}
//     >
//       <h2 className="text-center text-[blueviolet] font-bold text-xl mb-4">
//         {connected ? "Connected ✅" : "Connecting..."}
//       </h2>

//       <div className="grid grid-cols-2 gap-4 mt-8">
//         <button onClick={() => sendCommand("F")} className="btn-control">
//           Forward
//         </button>
//         <button onClick={() => sendCommand("B")} className="btn-control">
//           Backward
//         </button>
//         <button onClick={() => sendCommand("L")} className="btn-control">
//           Left
//         </button>
//         <button onClick={() => sendCommand("R")} className="btn-control">
//           Right
//         </button>
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function ControlPage() {
//   const [connected, setConnected] = useState(false);
//   const [device, setDevice] = useState(null);
//   const [characteristic, setCharacteristic] = useState(null);
//   const navigate = useNavigate();

//   const SERVICE_UUID = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
//   const CHARACTERISTIC_UUID_RX = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";

//   useEffect(() => {
//     const connectToDevice = async () => {
//       try {
//         const mac = localStorage.getItem("esp32-mac") || "94:B5:55:2C:BB:4E";

//         const device = await navigator.bluetooth.requestDevice({
//           filters: [{ name: mac }],
//           optionalServices: [SERVICE_UUID],
//         });

//         const server = await device.gatt.connect();
//         const service = await server.getPrimaryService(SERVICE_UUID);
//         const char = await service.getCharacteristic(CHARACTERISTIC_UUID_RX);

//         setDevice(device);
//         setCharacteristic(char);
//         setConnected(true);
//         console.log("✅ Connected to ESP32:", device.name);
//       } catch (err) {
//         console.error("❌ Connection failed:", err);
//         alert(
//           "Failed to connect to ESP32: " + (err.message || "Unknown error")
//         );
//         navigate("/HomePage");
//       }
//     };

//     connectToDevice();
//   }, [navigate]);

//   const sendCommand = async (command) => {
//     if (!connected || !characteristic) {
//       alert("Not connected to a device.");
//       return;
//     }

//     try {
//       const encoder = new TextEncoder();
//       await characteristic.writeValue(encoder.encode(command));
//       console.log("✅ Command sent:", command);
//     } catch (err) {
//       console.error("❌ Failed to send command:", err);
//       alert("Error sending command. Please reconnect.");
//       navigate("/HomePage");
//     }
//   };

//   return (
//     <div
//       style={{
//         padding: 20,
//         color: "white",
//         backgroundColor: "#1e1e2f",
//         minHeight: "100vh",
//       }}
//     >
//       <h2 className="text-center text-[blueviolet] font-bold text-xl mb-4">
//         {connected ? "Connected ✅" : "Connecting..."}
//       </h2>

//       <div className="grid grid-cols-2 gap-4 mt-8">
//         <button onClick={() => sendCommand("F")} className="btn-control">
//           Forward
//         </button>
//         <button onClick={() => sendCommand("B")} className="btn-control">
//           Backward
//         </button>
//         <button onClick={() => sendCommand("L")} className="btn-control">
//           Left
//         </button>
//         <button onClick={() => sendCommand("R")} className="btn-control">
//           Right
//         </button>
//       </div>
//     </div>
//   );
// }

// src/Pages/Control.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaArrowLeft,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

export default function ControlPage() {
  const [connected, setConnected] = useState(false);
  const [device, setDevice] = useState(null);
  const [characteristic, setCharacteristic] = useState(null);
  const navigate = useNavigate();

  const SERVICE_UUID = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
  const CHARACTERISTIC_UUID_RX = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";

  const connectToDevice = async () => {
    try {
      const mac = localStorage.getItem("esp32-mac") || "94:B5:55:2C:BB:4E";

      //   const device = await navigator.bluetooth.requestDevice({
      //     filters: [{ name: "SmartCart-ESP32" }],
      //     optionalServices: [SERVICE_UUID],
      //   });

      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: [SERVICE_UUID],
      });

      const server = await device.gatt.connect();
      const service = await server.getPrimaryService(SERVICE_UUID);
      const char = await service.getCharacteristic(CHARACTERISTIC_UUID_RX);

      setDevice(device);
      setCharacteristic(char);
      setConnected(true);
      console.log("✅ Connected to ESP32:", device.name);
    } catch (err) {
      console.error("❌ Connection failed:", err);
      alert("Failed to connect to ESP32: " + (err.message || "Unknown error"));
      navigate("/HomePage");
    }
  };

  const sendCommand = async (command) => {
    if (!connected || !characteristic) {
      alert("Not connected to a device.");
      return;
    }

    try {
      const encoder = new TextEncoder();
      await characteristic.writeValue(encoder.encode(command));
      console.log("✅ Command sent:", command);
    } catch (err) {
      console.error("❌ Failed to send command:", err);
      alert("Error sending command. Please reconnect.");
      navigate("/HomePage");
    }
  };

  return (
    <div
      style={{
        padding: 20,
        color: "white",
        backgroundColor: "#1e1e2f",
        minHeight: "100vh",
      }}
    >
      <h2 className="text-center text-[blueviolet] font-bold text-xl mb-4">
        {connected ? "Connected ✅" : "Tap Connect to Start"}
      </h2>

      {!connected && (
        <button
          onClick={connectToDevice}
          className="w-full p-3 bg-[blueviolet] text-white font-bold rounded-lg"
        >
          Connect to ESP32
        </button>
      )}

      {connected && (
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-black text-white gap-6 !p-6">
          {/* Up Arrow */}
          <button
            onClick={() => sendCommand("F")}
            className="w-64 h-24 flex items-center justify-center bg-[blueviolet] border border-gray-600 text-6xl hover:bg-[blueviolet]/90 transition-colors duration-300"
          >
            <FaArrowUp />
          </button>

          {/* Left and Right Arrows */}
          <div className="flex justify-between w-64 gap-6">
            <button
              onClick={() => sendCommand("L")}
              className="w-64 h-24 flex items-center justify-center bg-[blueviolet] border border-gray-600 text-6xl hover:bg-[blueviolet]/90 transition-colors duration-300"
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={() => sendCommand("R")}
              className="w-64 h-24 flex items-center justify-center bg-[blueviolet] border border-gray-600 text-6xl hover:bg-[blueviolet]/90 transition-colors duration-300"
            >
              <FaArrowRight />
            </button>
          </div>

          {/* Down Arrow */}
          <button
            onClick={() => sendCommand("B")}
            className="w-64 h-24 flex items-center justify-center bg-[blueviolet] border border-gray-600 text-6xl hover:bg-[blueviolet]/90 transition-colors duration-300"
          >
            <FaArrowDown />
          </button>
        </div>
      )}
    </div>
  );
}
