import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	return (
		<div className="flex flex-col min-h-screen">
			<Navbar setIsMenuOpen={setIsMenuOpen} />

			<div className={`flex-grow p-6  ${isMenuOpen ? "mt-40" : "mt-20"}`}>
				<Outlet />
			</div>
			<Footer />
		</div>
	);
};

export default PublicLayout;
