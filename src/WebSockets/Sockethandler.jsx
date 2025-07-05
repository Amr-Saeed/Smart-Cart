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

// import socket from "./scannerSocket";
import socket from "./ScannerSocket";

import { toast } from "react-toastify";
import axios from "axios";

let alreadyListening = false;

export function setupScannerListener(
  products = [],
  user = null,
  cartItems = [],
  fetchCart,
  getTokenFn,
  setScannedProduct // ✅ Add this
) {
  if (!products || products.length === 0) {
    console.warn("⚠️ Products not loaded yet. Listener not set.");
    return;
  }

  // Prevent duplicate listeners
  socket.off("scanner-data");
  socket.off("connect");

  console.log("🔄 Setting up scanner listener...");

  socket.on("connect", () => {
    console.log("✅ Connected to WebSocket server");
  });

  socket.on("scanner-data", async (data) => {
    console.log("📦 Data received:", data);

    const matchedProduct = products.find(
      (product) => String(product.barcode) === String(data.code)
    );

    if (!matchedProduct) {
      toast.error(`❌ No product found for barcode ${data.code}`, {
        position: "top-right",
        autoClose: 4000,
      });
      return;
    }

    setScannedProduct(matchedProduct);

    toast.success(
      `✅ Scanned: ${matchedProduct.name} (${matchedProduct.barcode})`,
      {
        position: "top-right",
        autoClose: 3000,
      }
    );

    // 🔁 Now add or update in cart
    try {
      if (user) {
        // ✅ LOGGED IN
        const token = await getTokenFn();

        const existingItem = cartItems.find(
          (item) => item.product_id === matchedProduct.id
        );

        if (existingItem) {
          // Update quantity
          await axios.put(
            `https://nutrigeen.com/api/cart/${user.id}/${matchedProduct.id}`,
            {
              quantity: existingItem.quantity + 1,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } else {
          // Add new product to cart
          await axios.post(
            `https://nutrigeen.com/api/cart`,
            {
              user_id: user.id,
              product_id: matchedProduct.id,
              quantity: 1,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }

        // 🔄 Refresh cart
        await fetchCart({ userId: user.id });
      } else {
        // ✅ GUEST USER — localStorage-based per-product quantities
        const quantityKey = `quantity-${matchedProduct.id}`;
        const currentQty = Number(localStorage.getItem(quantityKey)) || 0;
        const newQty = currentQty + 1;
        localStorage.setItem(quantityKey, newQty);

        // Optional: Update total quantity if needed
        const totalQuantityKey = "total-quantity";
        const totalQuantity =
          Number(localStorage.getItem(totalQuantityKey)) || 0;
        if (currentQty === 0) {
          // Only increase if this is a new product in cart
          localStorage.setItem(totalQuantityKey, totalQuantity + 1);
        }

        // Optional: Log result
        console.log(
          `🛒 Guest cart updated: ${matchedProduct.name} → ${newQty}`
        );
      }
    } catch (err) {
      console.error("🛑 Error handling cart from scanner:", err);
    }
  });

  socket.on("connect_error", (err) => {
    console.error("❌ WebSocket error:", err.message);
  });

  alreadyListening = true;
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
