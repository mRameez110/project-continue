import { Link } from "react-router-dom";

const CustomCard = ({ pharmacist }) => {
  return (
    <div className="max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto p-4 bg-white border  break-all border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105">
      <Link to={`/top_pharmacists_details/${pharmacist.id}`}>
        <img
          className="rounded-t-lg w-full object-cover h-48 md:h-56 lg:h-64"
          src={pharmacist.image}
          alt={pharmacist.name}
        />
      </Link>
      <div className="p-5 space-y-3">
        <Link to={`/topphardetails/${pharmacist.id}`}>
          <h5 className="text-xl font-semibold text-gray-900 dark:text-white hover:text-blue-600 transition duration-200">
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
        <div className="flex justify-between items-center mt-4">
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
