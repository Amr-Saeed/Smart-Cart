// src/pages/ControlPage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BluetoothLe } from "@capacitor-community/bluetooth-le";
import { Capacitor } from "@capacitor/core";

export default function ControlPage() {
  const [connected, setConnected] = useState(false);
  const [deviceId, setDeviceId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const connectToDevice = async () => {
      const espName = localStorage.getItem("esp32-mac");

      if (!espName) {
        alert("No device name found. Please scan again.");
        navigate("/connect");
        return;
      }

      try {
        const result = await BluetoothLe.requestDevice({
          filters: [{ name: espName }],
        });

        await BluetoothLe.connect({ deviceId: result.deviceId });
        setDeviceId(result.deviceId);
        setConnected(true);
        console.log("✅ Connected to", result.deviceId);
      } catch (err) {
        console.error("❌ Connection failed:", err);
        alert("Failed to connect to ESP32.");
        navigate("/connect");
      }
    };

    if (Capacitor.getPlatform() !== "web") {
      connectToDevice();
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
        service: "your-service-uuid", // Replace this
        characteristic: "your-characteristic-uuid", // Replace this
        value: Buffer.from(value).toString("base64"),
      });

      console.log("Command sent:", command);
    } catch (err) {
      console.error("Send error:", err);
      alert("Failed to send command.");
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
