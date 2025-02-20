import { NavLink } from "react-router-dom";

const CustomSidebar = ({
	role,
	sidebarOptions,
	isSidebarOpen,
	toggleSidebar,
}) => {
	return (
		<div>
			<div
				className={`fixed top-0 left-0 w-64 bg-gray-800 text-white p-4 h-full transition-all duration-300
          ${isSidebarOpen ? "block" : "hidden"} md:block z-50`}>
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
								}>
								{item.name}
							</NavLink>
						</li>
					))}
				</ul>
			</div>

			<button
				className="md:hidden fixed top-10 left-2 bg-black text-white p-2 rounded-full z-50"
				onClick={toggleSidebar}>
				{isSidebarOpen ? "X" : "☰"}
			</button>

			{isSidebarOpen && (
				<div
					className="fixed inset-0 bg-gray-600 bg-opacity-60"
					onClick={toggleSidebar}
				/>
			)}
		</div>
	);
};

export default CustomSidebar;
