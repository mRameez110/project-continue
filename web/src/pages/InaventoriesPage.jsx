import { useNavigate } from "react-router-dom";

const InvantoriesPage = () => {
  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg mt-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-center">Inventories</h1>
      </div>

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
        <tbody>
          <tr>
            <td colSpan="5" className="text-center p-4">
              Comming Soon .......
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InvantoriesPage;
