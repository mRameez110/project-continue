// import { Link } from "react-router-dom";

// const HomePage = () => {
// 	return (
// 		<div className="bg-gray-50">
// 			<section
// 				id="home"
// 				className="h-screen bg-green-400 flex flex-col justify-center items-center text-white px-4">
// 				<h1 className="text-5xl font-extrabold mb-6">
// 					Welcome to Smart Health
// 				</h1>
// 				<p className="text-xl mb-8 max-w-2xl text-center">
// 					Smart Health is an OPMS (Online Pharmacy Management System) is your
// 					trusted platform to manage pharmacy services and customer care.
// 				</p>
// 				<div className="space-x-4">
// 					<Link
// 						to="/login"
// 						className="bg-white text-blue-600 px-6 py-3 rounded-full text-lg font-semibold">
// 						Login
// 					</Link>
// 					<Link
// 						to="/signup"
// 						className="bg-transparent text-white border-2 border-white px-6 py-3 rounded-full text-lg font-semibold">
// 						Signup
// 					</Link>
// 				</div>
// 			</section>
// 		</div>
// 	);
// };

// export default HomePage;

import { Link } from "react-router-dom";

const HomePage = () => {
	return (
		<div className="bg-gray-50">
			<section
				id="home"
				className="h-screen bg-gradient-to-r from-teal-900 to-green-600 flex flex-col justify-center items-center text-white px-4 relative">
				<div className="absolute top-6 right-4 w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-xl animate-spin-slow overflow-hidden">
					<img
						src="https://scontent.flhe33-1.fna.fbcdn.net/v/t39.30808-6/305281591_457677309710839_4955375767644067415_n.png?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=zUtmUBwkZjwQ7kNvgGQare5&_nc_oc=Adgk6gerTXwBXH9-TEYcWecAgC47R6L0SLuMG-SRoPFPNciS0aOuFm0T6Dk79uS_a3I&_nc_zt=23&_nc_ht=scontent.flhe33-1.fna&_nc_gid=ARe-8FbD7tDxLfRgsjgUAuv&oh=00_AYAmREMdBF_0YGdvo3yA8KJke1IJD9v12W_GXbq9RDn4sw&oe=67C1F3A9"
						alt="Logo"
						className="w-full h-full object-cover"
					/>
				</div>

				<h1 className="text-5xl font-extrabold mb-6 text-center text-white drop-shadow-lg animate-fadeIn">
					Welcome to Smart Health
				</h1>
				<p className="text-xl mb-8 max-w-2xl text-center animate-slideInUp delay-200">
					Smart Health is an OPMS (Online Pharmacy Management System) that is
					your trusted platform to manage pharmacy services and customer care.
				</p>
				<div className="space-x-4 animate-slideInUp delay-400">
					<Link
						to="/login"
						className="bg-white text-blue-600 px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in-out">
						Login
					</Link>
					<Link
						to="/signup"
						className="bg-transparent text-white border-2 border-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 ease-in-out">
						Signup
					</Link>
				</div>
			</section>
		</div>
	);
};

export default HomePage;
