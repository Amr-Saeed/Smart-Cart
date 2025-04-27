import { Outlet } from "react-router-dom";
import Header from "./HomePage/Header/Header";
import Footer from "./HomePage/Footer";

function AppLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default AppLayout;
