import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="bg-gray-50">
      <section
        id="home"
        className="h-screen bg-green-400 flex flex-col justify-center items-center text-white px-4"
      >
        <h1 className="text-5xl font-extrabold mb-6">
          Welcome to Smart Health
        </h1>
        <p className="text-xl mb-8 max-w-2xl text-center">
          Smart Health is an OPMS (Online Pharmacy Management System) is your
          trusted platform to manage pharmacy services and customer care.
        </p>
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-white text-blue-600 px-6 py-3 rounded-full text-lg font-semibold"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-transparent text-white border-2 border-white px-6 py-3 rounded-full text-lg font-semibold"
          >
            Signup
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
