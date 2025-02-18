import React, { useState } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

function Dashboard() {
  const [expensesData, setExpensesData] = useState([
    { name: 'Travel', value: 500 },
    { name: 'Food', value: 300 },
    { name: 'Rent', value: 1000 },
    { name: 'Utility Bills', value: 200 },
    { name: 'Remaining Balance', value: 1000 },
    { name: 'Miscellaneous', value: 300 },
  ]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const [selectedCategory, setSelectedCategory] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (value >= 0) {
      setInputValue(value);
    }
  };

  const handleUpdateValue = () => {
    const amount = parseFloat(inputValue);
    if (selectedCategory && !isNaN(amount) && amount >= 0) {
      const updatedData = expensesData.map((item) =>
        item.name === selectedCategory
          ? { ...item, value: item.value + amount }
          : item
      );
      setExpensesData(updatedData);
      setInputValue('');
    } else {
      alert('Please enter a valid amount (must be 0 or greater).');
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">User Dashboard</h1>
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Expenses Breakdown</h2>

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

        {selectedCategory && (
          <div className="mb-4">
            <label htmlFor="amount-input" className="block text-sm font-medium text-gray-700">
              Enter Amount (€) to Add to {selectedCategory}
            </label>
            <input
              id="amount-input"
              type="number"
              min="0"
              value={inputValue}
              onChange={handleInputChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              placeholder="Enter amount in euros"
            />
            <button
              onClick={handleUpdateValue}
              className="mt-2 w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Update Value
            </button>
          </div>
        )}

        <div className="w-full h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expensesData}
                cx="50%"
                cy="40%"
                outerRadius="70%"
                fill="#8884d8"
                dataKey="value"
                label={({ name, value, percent }) =>
                  `${name}: €${value} (${(percent * 100).toFixed(2)}%)`
                }
              >
                {expensesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;