import { useState, useEffect } from "react";

const AboutPage = () => {
	const images = [
		"https://imageio.forbes.com/specials-images/imageserve/651bbeb1c78cc403f92a6abd/The-10-Biggest-Trends-Revolutionizing-Healthcare-In-2024/0x0.jpg?format=jpg&crop=2500,1405,x0,y0,safe&width=1440",
		"https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		"https://images.pexels.com/photos/139398/thermometer-headache-pain-pills-139398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
	];

	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const intervalId = setInterval(() => {
			goToNext();
		}, 3000);
		return () => clearInterval(intervalId);
	}, [currentIndex]);

	const goToNext = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
	};

	const goToPrev = () => {
		setCurrentIndex(
			(prevIndex) => (prevIndex - 1 + images.length) % images.length
		);
	};

	return (
		<section className="p-0 min-h-screen flex flex-col items-center justify-center bg-white mt-0 py-0 px-0">
			<div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] mb-12 overflow-hidden rounded-lg shadow-lg">
				<img
					src={images[currentIndex]}
					alt="Health Care"
					className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
				/>

				<div
					className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-4xl cursor-pointer z-10"
					onClick={goToPrev}>
					&lt;
				</div>
				<div
					className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-4xl cursor-pointer z-10"
					onClick={goToNext}>
					&gt;
				</div>
			</div>

			<h1 className="text-5xl font-extrabold text-center text-gray-800 mb-8 px-4">
				About OPMS
			</h1>
			<p className="text-lg text-gray-700 text-center mb-12 max-w-3xl mx-auto px-4">
				OPMS (Online Pharmacy Management System) is a comprehensive platform
				designed to provide easy and efficient access to healthcare services.
				Our goal is to streamline pharmacy operations and enhance customer
				experience.
			</p>

			<div className="bg-gray-50 p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
				<h3 className="text-3xl font-semibold mb-6 text-center text-gray-800">
					Key Features of OPMS
				</h3>
				<ul className="list-disc pl-5 text-left text-gray-600 space-y-2">
					<li>Manage prescriptions and orders with ease</li>
					<li>Track inventory in real-time and avoid shortages</li>
					<li>Secure online payments and checkout process</li>
					<li>Comprehensive customer account management</li>
					<li>Automated reminders for medication refills</li>
				</ul>
			</div>
		</section>
	);
};

export default AboutPage;
