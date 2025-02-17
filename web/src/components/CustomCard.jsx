import { Link } from "react-router-dom";

// CustomCard now expects 'pharmacist' as a prop
const CustomCard = ({ pharmacist }) => {
  return (
    <div className="max-w-xl bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105">
      <Link to={`/topphardetails/${pharmacist.id}`}>
        {/* Profile Image */}
        <img
          className="rounded-t-lg w-full h-64 object-cover"
          src="https://images.pexels.com/photos/2324837/pexels-photo-2324837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" // Replace with dynamic image if available
          alt={pharmacist.name}
        />
      </Link>
      <div className="p-6 space-y-4">
        <Link to={`/topphardetails/${pharmacist.id}`}>
          <h5 className="text-3xl font-semibold text-gray-900 dark:text-white hover:text-blue-600 transition duration-200">
            {pharmacist.name}
          </h5>
        </Link>
        <p className="font-medium text-gray-600 dark:text-gray-300">
          <strong className="font-bold text-gray-800">Email:</strong>{" "}
          {pharmacist.email}
        </p>
        <p className="font-medium text-gray-600 dark:text-gray-300">
          <strong className="font-bold text-gray-800">Phone:</strong>{" "}
          {pharmacist.phone}
        </p>
        <div className="flex justify-between items-center">
          <Link
            to={`/topphardetails/${pharmacist.id}`}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 transition duration-200"
          >
            View Profile
            <svg
              className="ml-2 w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomCard;
