import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white py-4 shadow-md">
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
          className={`absolute top-16 left-0 w-full bg-blue-600  transition-all duration-300 ${
            open ? "block" : "hidden"
          } md:flex md:static md:w-auto md:space-x-4 md:bg-transparent`}
        >
          <Link to="/" className="block md:inline hover:underline py-2 px-4">
            Home
          </Link>
          <Link
            to="/about"
            className="block md:inline hover:underline py-2 px-4"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block md:inline hover:underline py-2 px-4"
          >
            Contact
          </Link>
          <Link
            to="/login"
            className="block md:inline bg-white text-blue-600 px-4 py-2 rounded"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="block md:inline bg-white text-blue-600 px-4 py-2 rounded"
          >
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
