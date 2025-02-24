import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

const PublicLayout = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const location = useLocation();

	const isAboutPage = location.pathname === "/about";

	return (
		<div className="flex flex-col min-h-screen">
			<Navbar setIsMenuOpen={setIsMenuOpen} />

			<div
				className={`${isAboutPage ? "p-0 mt-0" : "p-6"} ${
					!isAboutPage && (isMenuOpen ? "mt-40" : "mt-20")
				} w-full flex-grow`}>
				<Outlet />
			</div>

			<Footer />
		</div>
	);
};

export default PublicLayout;
