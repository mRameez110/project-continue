// import { useNavigate } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";

// const BackButton = () => {
//   const navigate = useNavigate();

//   return (
//     <button
//       onClick={() => navigate(-1)}
//       className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
//     >
//       <ArrowLeft size={18} />
//       <span>Back</span>
//     </button>
//   );
// };

// export default BackButton;

import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Last visited page pe le jayega
  };

  return (
    <button
      onClick={handleBack}
      className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded shadow-lg hover:bg-gray-700 transition"
    >
      Back
    </button>
  );
};

export default BackButton;
