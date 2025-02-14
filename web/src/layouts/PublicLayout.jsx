import { Outlet, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const PublicLayout = () => {
  return (
    <div>
      <Navbar />

      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default PublicLayout;
