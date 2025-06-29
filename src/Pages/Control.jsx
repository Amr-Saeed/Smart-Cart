// // src/pages/ControlPage.js
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { BluetoothLe } from "@capacitor-community/bluetooth-le";
// import { Capacitor } from "@capacitor/core";

// export default function ControlPage() {
//   const [connected, setConnected] = useState(false);
//   const [deviceId, setDeviceId] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const connectToDevice = async () => {
//       const espName = localStorage.getItem("esp32-mac");

//       if (!espName) {
//         alert("No device name found. Please scan again.");
//         navigate("/connect");
//         return;
//       }

//       try {
//         const result = await BluetoothLe.requestDevice({
//           filters: [{ name: espName }],
//         });

//         await BluetoothLe.connect({ deviceId: result.deviceId });
//         setDeviceId(result.deviceId);
//         setConnected(true);
//         console.log("✅ Connected to", result.deviceId);
//       } catch (err) {
//         console.error("❌ Connection failed:", err);
//         alert("Failed to connect to ESP32.");
//         navigate("/connect");
//       }
//     };

//     if (Capacitor.getPlatform() !== "web") {
//       connectToDevice();
//     }
//   }, [navigate]);

//   const sendCommand = async (command) => {
//     if (!deviceId) {
//       alert("Not connected.");
//       return;
//     }

//     try {
//       const encoder = new TextEncoder();
//       const value = encoder.encode(command);

//       await BluetoothLe.write({
//         deviceId,
//         service: "your-service-uuid", // Replace this
//         characteristic: "your-characteristic-uuid", // Replace this
//         value: Buffer.from(value).toString("base64"),
//       });

//       console.log("Command sent:", command);
//     } catch (err) {
//       console.error("Send error:", err);
//       alert("Failed to send command.");
//     }
//   };

//   return (
//     <div style={{ padding: 20, color: "white" }}>
//       <h2 className="text-center text-[blueviolet] font-bold">
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

// src/pages/ControlPage.js
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { BluetoothLe } from "@capacitor-community/bluetooth-le";
// import { Capacitor } from "@capacitor/core";

// export default function ControlPage() {
//   const [connected, setConnected] = useState(false);
//   const [deviceId, setDeviceId] = useState(null);
//   const navigate = useNavigate();

//   const SERVICE_UUID = "6E400001-B5A3-F393-E0A9-E50E24DCCA9E";
//   const CHARACTERISTIC_UUID_RX = "6E400002-B5A3-F393-E0A9-E50E24DCCA9E";

//   // const espName = "SMARTCART-94B5552CBB4E"; // ✅ use const

//   useEffect(() => {
//     const connectToDevice = async () => {
//       try {
//         // const result = await BluetoothLe.requestDevice({
//         //   acceptAllDevices: true, // ✅ more compatible on Android 8
//         // });

//         console.log("Discovered Device:", result.name);

//         if (result.name !== espName) {
//           alert("ESP32 not found.");
//           navigate("/HomePage");
//           return;
//         }

//         await BluetoothLe.connect({ deviceId: "94:B5:55:2C:BB:4E" });
//         setDeviceId("94:B5:55:2C:BB:4E");
//         setConnected(true);
//         console.log("✅ Connected to", "94:B5:55:2C:BB:4E");
//       } catch (err) {
//         console.error("❌ Connection failed:", err);
//         alert("Failed to connect to ESP32.");
//         navigate("/HomePage");
//       }
//     };

//     if (Capacitor.getPlatform() !== "web") {
//       connectToDevice();
//     }
//   }, [navigate]);

//   const sendCommand = async (command) => {
//     if (!deviceId) {
//       alert("Not connected.");
//       return;
//     }

//     try {
//       const encoder = new TextEncoder();
//       const value = encoder.encode(command);

//       await BluetoothLe.write({
//         deviceId,
//         service: SERVICE_UUID,
//         characteristic: CHARACTERISTIC_UUID_RX,
//         value: Buffer.from(value).toString("base64"),
//       });

//       console.log("✅ Command sent:", command);
//     } catch (err) {
//       console.error("❌ Send error:", err);
//       alert("Failed to send command.");
//       navigate("/HomePage");
//     }
//   };

//   return (
//     <div style={{ padding: 20, color: "white" }}>
//       <h2 className="text-center text-[blueviolet] font-bold">
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

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BluetoothLe } from "@capacitor-community/bluetooth-le";
import { Capacitor } from "@capacitor/core";

export default function ControlPage() {
  const [connected, setConnected] = useState(false);
  const [deviceId, setDeviceId] = useState(null);
  const navigate = useNavigate();

  const SERVICE_UUID = "6E400001-B5A3-F393-E0A9-E50E24DCCA9E";
  const CHARACTERISTIC_UUID_RX = "6E400002-B5A3-F393-E0A9-E50E24DCCA9E";

  const macAddress = "94:B5:55:2C:BB:4E";

  useEffect(() => {
    const setupBluetooth = async () => {
      try {
        await BluetoothLe.requestPermissions();

        await BluetoothLe.connect({ deviceId: macAddress });
        setDeviceId(macAddress);
        setConnected(true);
        console.log("✅ Connected to", macAddress);
      } catch (err) {
        console.error("❌ Connection failed:", err);
        alert(
          "Failed to connect to ESP32.\n\n" +
            (err.message || JSON.stringify(err))
        );
        navigate("/HomePage");
      }
    };

    if (Capacitor.getPlatform() !== "web") {
      setupBluetooth();
    }
  }, [navigate]);

  const sendCommand = async (command) => {
    if (!deviceId) {
      alert("Not connected.");
      return;
    }

    try {
      const encoder = new TextEncoder();
      const value = encoder.encode(command);

      await BluetoothLe.write({
        deviceId,
        service: SERVICE_UUID,
        characteristic: CHARACTERISTIC_UUID_RX,
        value: Buffer.from(value).toString("base64"),
      });

      console.log("✅ Command sent:", command);
    } catch (err) {
      console.error("❌ Send error:", err);
      alert("Failed to send command.");
      navigate("/HomePage");
    }
  };

  return (
    <div style={{ padding: 20, color: "white" }}>
      <h2 className="text-center text-[blueviolet] font-bold">
        {connected ? "Connected ✅" : "Connecting..."}
      </h2>

      <div className="grid grid-cols-2 gap-4 mt-8">
        <button onClick={() => sendCommand("F")} className="btn-control">
          Forward
        </button>
        <button onClick={() => sendCommand("B")} className="btn-control">
          Backward
        </button>
        <button onClick={() => sendCommand("L")} className="btn-control">
          Left
        </button>
        <button onClick={() => sendCommand("R")} className="btn-control">
          Right
        </button>
      </div>
    </div>
  );
}
