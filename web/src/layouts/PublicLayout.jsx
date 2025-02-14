import { Outlet, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {" "}
      <Navbar />
      <div className="flex-grow p-6">
        {" "}
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default PublicLayout;
