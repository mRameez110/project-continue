// /** @type {import('tailwindcss').Config} */
// export default {
// 	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
// 	theme: {
// 		extend: {},
// 	},
// 	plugins: [],
// };

module.exports = {
	content: [
		"./src/**/*.{html,js,jsx}", // Update with your paths if necessary
	],
	theme: {
		extend: {
			animation: {
				"spin-slow": "spin 10s linear infinite", // Adjust the speed for the logo's rotation
				fadeIn: "fadeIn 1.5s ease-out forwards",
				slideInUp: "slideInUp 1s ease-out forwards",
			},
			keyframes: {
				fadeIn: {
					"0%": { opacity: 0 },
					"100%": { opacity: 1 },
				},
				slideInUp: {
					"0%": { transform: "translateY(20px)", opacity: 0 },
					"100%": { transform: "translateY(0)", opacity: 1 },
				},
			},
		},
	},
	plugins: [],
};
