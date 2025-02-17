import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-blue-600 text-white py-4 shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="block md:inline hover:underline py-2 px-4">
          <h1 className="text-2xl font-bold">Smart Health</h1>
        </Link>
        <div
          className="md:hidden cursor-pointer text-3xl"
          onClick={() => setOpen(!open)}
        >
          {open ? "X" : "☰"}
        </div>
        <div
          className={`absolute top-16 left-0 w-full bg-blue-600 transition-all duration-300 ${
            open ? "block" : "hidden"
          } md:flex md:static md:w-auto md:space-x-4 md:bg-transparent`}
        >
          <Link
            to="/"
            className={`block md:inline py-2 px-4 hover:underline ${
              location.pathname === "/" ? "underline font-bold" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`block md:inline py-2 px-4 hover:underline ${
              location.pathname === "/about" ? "underline font-bold" : ""
            }`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`block md:inline py-2 px-4 hover:underline ${
              location.pathname === "/contact" ? "underline font-bold" : ""
            }`}
          >
            Contact
          </Link>
          <Link
            to="/login"
            className={`block md:inline bg-green-500 text-white px-4 py-2 rounded ${
              location.pathname === "/login" ? "underline font-bold" : ""
            }`}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className={`block md:inline bg-green-500 text-white px-4 py-2 rounded ${
              location.pathname === "/signup" ? "underline font-bold" : ""
            }`}
          >
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
