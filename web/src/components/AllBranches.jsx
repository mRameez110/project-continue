// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { getToken, getUserRole } from "../utils/auth";
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const AllBranches = () => {
//   console.log("see on top of all branches.jsx ");
//   const [branches, setBranches] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const token = getToken();
//   const loggedUserRole = getUserRole();

//   useEffect(() => {
//     const fetchBranches = async () => {
//       try {
//         if (!token) throw new Error("Token not found");

//         const response = await axios.get(
//           `${API_BASE_URL}/api/pharmacy-branches`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         console.log("see branches report in all branches.jsx ", response);
//         if (response.data && response.data.branches) {
//           setBranches(response.data.branches);
//         } else {
//           console.error("No branches data in response");
//         }
//       } catch (error) {
//         console.error("Error fetching branches", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBranches();
//   }, [token]);

//   const handleViewBranch = (branchId) => {
//     navigate(`/${loggedUserRole}/branch-details/${branchId}`);
//   };

//   const renderBranches = () => {
//     if (!branches || branches.length === 0) {
//       return (
//         <tr>
//           <td colSpan="4" className="text-center p-4">
//             No branches found.
//           </td>
//         </tr>
//       );
//     }

//     return branches.reverse().map((branch, index) => (
//       <tr key={branch._id} className="border-b hover:bg-gray-100">
//         <td className="py-3 px-4">{index + 1}</td>
//         <td className="py-3 px-4">{branch.name}</td>
//         <td className="py-3 px-4">{branch.address}</td>
//         <td className="py-3 px-4">
//           {new Date(branch.createdAt).toLocaleString()}
//         </td>
//         <td className="py-3 px-4 text-center">
//           <button
//             onClick={() => handleViewBranch(branch._id)}
//             className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600"
//           >
//             View
//           </button>
//         </td>
//       </tr>
//     ));
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center py-4">
//         <div className="loader">Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg mt-6">
//       <h1 className="text-3xl font-semibold text-center mb-6">
//         All Pharmacy Branches
//       </h1>
//       <table className="min-w-full table-auto">
//         <thead className="bg-green-500 text-white">
//           <tr>
//             <th className="py-3 px-4">#</th>
//             <th className="py-3 px-4">Name</th>
//             <th className="py-3 px-4">Address</th>
//             <th className="py-3 px-4">Created At</th>
//             <th className="py-3 px-4">Action</th>
//           </tr>
//         </thead>
//         <tbody>{renderBranches()}</tbody>
//       </table>
//     </div>
//   );
// };

// export default AllBranches;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getToken, getUserRole } from "../utils/auth";
import CreateBranchModal from "../components/CreateBranchModel";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AllBranches = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  const navigate = useNavigate();
  const token = getToken();
  const loggedUserRole = getUserRole();

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        if (!token) throw new Error("Token not found");

        const response = await axios.get(
          `${API_BASE_URL}/api/pharmacy-branches`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data && response.data.branches) {
          setBranches(response.data.branches);
        }
      } catch (error) {
        console.error("Error fetching branches", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, [token]);

  const handleViewBranch = (branchId) => {
    navigate(`/${loggedUserRole}/branch-details/${branchId}`);
  };

  const renderBranches = () => {
    if (!branches || branches.length === 0) {
      return (
        <tr>
          <td colSpan="5" className="text-center p-4">
            No branches found.
          </td>
        </tr>
      );
    }

    return branches.reverse().map((branch, index) => (
      <tr key={branch._id} className="border-b hover:bg-gray-100">
        <td className="py-3 px-4">{index + 1}</td>
        <td className="py-3 px-4">{branch.name}</td>
        <td className="py-3 px-4">{branch.address}</td>
        <td className="py-3 px-4">
          {new Date(branch.createdAt).toLocaleString()}
        </td>
        <td className="py-3 px-4 text-center">
          <button
            onClick={() => handleViewBranch(branch._id)}
            className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600"
          >
            View
          </button>
        </td>
      </tr>
    ));
  };

  const handleCreateBranch = () => {
    setIsBranchModalOpen(true); // Open modal to create a branch
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-4">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg mt-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-center">
          All Pharmacy Branches
        </h1>

        {/* Only show the Create Branch button if the user is an admin */}
        {loggedUserRole === "admin" && (
          <button
            onClick={handleCreateBranch}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Create Branch
          </button>
        )}
      </div>

      {/* Modal to create a branch */}
      {isBranchModalOpen && (
        <CreateBranchModal
          isOpen={isBranchModalOpen}
          onClose={() => setIsBranchModalOpen(false)} // Close modal
        />
      )}

      <table className="min-w-full table-auto">
        <thead className="bg-green-500 text-white">
          <tr>
            <th className="py-3 px-4">#</th>
            <th className="py-3 px-4">Name</th>
            <th className="py-3 px-4">Address</th>
            <th className="py-3 px-4">Created At</th>
            <th className="py-3 px-4">Action</th>
          </tr>
        </thead>
        <tbody>{renderBranches()}</tbody>
      </table>
    </div>
  );
};

export default AllBranches;
