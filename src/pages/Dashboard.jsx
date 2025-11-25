import React from "react";
import Sidebar from "../components/Sidebar";
import { FaUsers, FaBox, FaShoppingCart, FaDollarSign } from "react-icons/fa";
import Card from "../components/ui/Card";

const Dashboard = () => {
  const cards = [
    {
      icon: FaUsers,
      title: "Total Customer",
      value: 75,
      borderColor: "#3B82F6", // blue-500
      iconColor: "text-blue-500",
    },
    {
      icon: FaBox,
      title: "Total Rest",
      value: 75,
      borderColor: "#10B981", // green-500
      iconColor: "text-green-500",
    },
    {
      icon: FaShoppingCart,
      title: "New Orders",
      value: 50,
      borderColor: "#F59E0B", // yellow-500
      iconColor: "text-yellow-500",
    },
    {
      icon: FaDollarSign,
      title: "Revenue",
      value: "$1200",
      borderColor: "#EF4444", // red-500
      iconColor: "text-red-500",
    },
  ];

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-100 p-8 overflow-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-700">Dashboard</h1>
        <div className="grid grid-cols-4 gap-3">
          {cards.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
