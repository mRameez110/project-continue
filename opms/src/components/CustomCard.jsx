import React from "react";

const CustomCard = ({ title, subtitle, link, linkText }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h4 className="font-semibold">{title}</h4>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      <a href={link} className="text-blue-600 text-sm mt-2 block">
        {linkText}
      </a>
    </div>
  );
};

export default CustomCard;
