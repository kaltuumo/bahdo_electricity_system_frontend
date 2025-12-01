// src/pages/dashboard/GenderPieChart.jsx
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Tusaale data
const genderData = [
  { name: "Male", value: 40 },
  { name: "Female", value: 35 },
  { name: "Other", value: 25 },
];

const COLORS = ["#0088FE", "#FF8042", "#00C49F"];

const GenderPieChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={genderData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {genderData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default GenderPieChart;
