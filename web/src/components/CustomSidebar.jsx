import { NavLink } from "react-router-dom";

const CustomSidebar = ({ role, sidebarOptions }) => {
  return (
    <div className="flex flex-col w-64 bg-gray-800 text-white p-4 h-full fixed top-0 left-0">
      <h2 className="text-xl font-bold mb-6 capitalize">{role} Panel</h2>

      <ul className="mt-4 space-y-2">
        {sidebarOptions[role]?.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "block p-3 hover:bg-gray-700 bg-gray-600 rounded-md"
                  : "block p-3 hover:bg-gray-700 rounded-md"
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomSidebar;
