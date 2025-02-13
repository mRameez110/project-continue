// // src/components/DataCard.jsx
// const DataCard = ({ title, description, icon, link }) => {
//   return (
//     <div className="bg-white shadow-lg rounded-lg p-6 m-4 w-64">
//       <div className="text-xl text-center">{icon}</div>
//       <h2 className="font-semibold text-lg text-center mt-2">{title}</h2>
//       <p className="text-gray-500 text-sm text-center mt-2">{description}</p>
//       <div className="text-center mt-4">
//         <a href={link} className="text-blue-500 hover:underline">
//           Learn More
//         </a>
//       </div>
//     </div>
//   );
// };

// export default DataCard;

// src/components/DataCard.jsx

// const DataCard = ({ title, description, name, link, type }) => {
//   return (
//     <div className="bg-white shadow-lg rounded-lg p-6 m-4 w-64">
//       <div className="text-xl text-center">
//         {type === "pharmacist" ? "👨‍⚕️" : "💊"}
//       </div>
//       <h2 className="font-semibold text-lg text-center mt-2">{title}</h2>
//       {type === "pharmacist" ? (
//         <p className="text-gray-500 text-sm text-center mt-2">Dr. {name}</p>
//       ) : (
//         <p className="text-gray-500 text-sm text-center mt-2">{description}</p>
//       )}
//       <div className="text-center mt-4">
//         <a href={link} className="text-blue-500 hover:underline">
//           View {type === "pharmacist" ? "Profile" : "Prescription"}
//         </a>
//       </div>
//     </div>
//   );
// };

// export default DataCard;
