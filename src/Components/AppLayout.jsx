import { Outlet } from "react-router-dom";
import Header from "./HomePage/Header/Header";
import Footer from "./HomePage/Footer";
import BottomBar from "./Mobile/BottomBar";
import { useState } from "react";
import SocketManager from "../WebSockets/SocketManager";
import ScanPopup from "../WebSockets/ScanPopUp";

function AppLayout() {
  const [scannedProduct, setScannedProduct] = useState(null);

  return (
    <>
      <Header />
      <main>
        <Outlet />
        <SocketManager onScan={setScannedProduct} />
        {scannedProduct && (
          <ScanPopup
            product={scannedProduct}
            onClose={() => setScannedProduct(null)}
          />
        )}
      </main>
      <Footer />
      <BottomBar />
    </>
  );
}

export default AppLayout;
