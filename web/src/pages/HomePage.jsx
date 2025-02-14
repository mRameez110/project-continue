import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-6">Welcome to the App</h1>
      <div className="space-x-4">
        <Link
          to="/login"
          className="bg-blue-600 text-white px-6 py-3 rounded text-lg"
        >
          Login
        </Link>
        <Link
          to="/about"
          className="bg-gray-600 text-white px-6 py-3 rounded text-lg"
        >
          About
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
