// import { useEffect, useState } from "react";
// import socket from "./scannerSocket";

// function ScannerData() {
//   const [product, setProduct] = useState(null);

//   function sendMsg() {
//     socket.emit("Testing", { message: "Hello" });
//     console.log("Message sent to server");
//   }

//   useEffect(() => {
//     socket.on("connect", () => {
//       console.log("✅ Connected to WebSocket server");
//     });

//     socket.on("scanner-data", (data) => {
//       setProduct(data);
//       alert("📦 New scan received: " + data.name);
//       console.log("Data received:", data);
//     });

//     return () => {
//       socket.off("scanner-data");
//       socket.off("connect");
//     };
//   }, []);

//   return (
//     <div>
//       <h1>Live Scanner Data</h1>
//       {product ? (
//         <div>
//           <h2>Product Scanned:</h2>
//           <p>
//             <strong>Name:</strong> {product.name}
//           </p>
//           <p>
//             <strong>Code:</strong> {product.code}
//           </p>
//         </div>
//       ) : (
//         <p>Waiting for scan...</p>
//       )}
//     </div>
//   );
// }

// export default ScannerData;
