import React from "react";

const Card = ({ icon: Icon, title, value, borderColor, iconColor }) => {
  return (
    <div
      className={`bg-white shadow-lg rounded-xl p-5 flex items-center gap-4 border-l-4 hover:shadow-xl transition`}
      style={{ borderColor: borderColor }}
    >
      <Icon className={`${iconColor} text-4xl opacity-80`} />
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-700">{value}</p>
      </div>
    </div>
  );
};

export default Card;
