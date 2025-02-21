import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ setIsMenuOpen }) => {
	const [isMenuOpenLocal, setIsMenuOpenLocal] = useState(false);

	const toggleMenu = () => {
		const newState = !isMenuOpenLocal;
		setIsMenuOpen(newState);
		setIsMenuOpenLocal(newState);
	};

	return (
		<nav className="bg-blue-800 text-white py-2 shadow-md fixed w-full top-0 z-50">
			<div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
				<div className="relative flex items-center justify-between h-12">
					<div className="flex-shrink-0">
						<h1 className="text-2xl font-bold">Smart Health</h1>
					</div>

					<div className="hidden sm:flex sm:ml-6 space-x-4 text-white">
						<Link
							to="/"
							className="hover:text-blue-600 px-3 py-2 rounded-md text-lg font-medium">
							Home
						</Link>
						<Link
							to="/about"
							className=" hover:text-blue-600 px-3 py-2 rounded-md text-lg font-medium">
							About
						</Link>
						<Link
							to="/contact"
							className=" hover:text-blue-600 px-3 py-2 rounded-md text-lg font-medium">
							Contact
						</Link>
						<Link
							to="/login"
							className="hover:text-blue-600 px-3 py-2 rounded-md text-lg font-medium bg-green-500">
							Login
						</Link>
						<Link
							to="/signup"
							className=" hover:text-blue-600 px-3 py-2 rounded-md text-lg font-medium bg-yellow-500 ">
							Signup
						</Link>
					</div>

					<div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
						<button
							type="button"
							className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
							aria-controls="mobile-menu"
							aria-expanded={isMenuOpenLocal ? "true" : "false"}
							onClick={toggleMenu}>
							<svg
								className="block h-6 w-6"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>

			<div
				className={`${
					isMenuOpenLocal ? "block" : "hidden"
				} sm:hidden bg-gray-800 text-white space-y-4 px-4 py-4`}>
				<Link
					to="/"
					className="block text-gray-200 hover:text-blue-500"
					onClick={toggleMenu}>
					Home
				</Link>
				<Link
					to="/about"
					className="block text-gray-200 hover:text-blue-500"
					onClick={toggleMenu}>
					About
				</Link>
				<Link
					to="/contact"
					className="block text-gray-200 hover:text-blue-500"
					onClick={toggleMenu}>
					Contact
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;
