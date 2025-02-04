import { Outlet } from "react-router-dom";
import Navbar from "../pages/Home/Navbar/Navbar";
import Footer from "../pages/Home/Footer/Footer";

const Main = () => {
  return (
    <div>
      <Navbar />
      <div className="w-11/12 mx-auto min-h-[calc(100vh-68px)] ">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
