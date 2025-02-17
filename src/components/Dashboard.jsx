import React, { useState } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

function Dashboard() {
  // Sample data for expenses
  const expensesData = [
    { name: 'Travel', value: 500 },
    { name: 'Food', value: 300 },
    { name: 'Rent', value: 1000 },
    { name: 'Utility Bills', value: 200 },
    { name: 'Remaining Balance', value: 1000 },
  ];

  // Colors for each category in the pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  // State to manage the selected category
  const [selectedCategory, setSelectedCategory] = useState('');

  // Handler for dropdown change
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Expenses Breakdown</h2>
        
        {/* Dropdown menu */}
        <div className="mb-4">
          <label htmlFor="category-select" className="block text-sm font-medium text-gray-700">
            Select a Category
          </label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">All Categories</option>
            {expensesData.map((expense, index) => (
              <option key={index} value={expense.name}>
                {expense.name}
              </option>
            ))}
          </select>
        </div>

        <PieChart width={600} height={600}>
          <Pie
            data={expensesData.filter(expense => selectedCategory === '' || expese.name === selectedCategory)}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(2)}%`}
          >
            {expensesData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
}

export default Dashboard;