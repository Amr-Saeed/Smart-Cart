import { Outlet } from "react-router-dom";
import Header from "./HomePage/Header/Header";
import Footer from "./HomePage/Footer";
import BottomBar from "./Mobile/BottomBar";

function AppLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <BottomBar />
    </>
  );
}

export default AppLayout;
