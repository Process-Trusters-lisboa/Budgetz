import React, { useState } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
function Dashboard() {
  const initialCategories = [
    'Travel',
    'Food',
    'Rent',
    'Utility Bills',
    'Remaining Balance',
    'Miscellaneous',
  ];

  const [expensesData, setExpensesData] = useState(
    initialCategories.map((category) => ({ name: category, value: 0 }))
  );

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const [selectedCategory, setSelectedCategory] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [expensesList, setExpensesList] = useState([]);
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

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

      const categoryIndex = initialCategories.indexOf(selectedCategory);
      const newExpense = {
        category: selectedCategory,
        amount: amount,
        color: COLORS[categoryIndex % COLORS.length],
        dateTime: selectedDateTime.toLocaleString(),
      };
      setExpensesList([...expensesList, newExpense]);

      setInputValue('');
    } else {
      alert('Please enter a valid amount (must be 0 or greater).');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleUpdateValue();
  };

  const handleEditExpense = (index) => {
    setEditingIndex(index);
    setEditValue(expensesList[index].amount);
  };

  const handleSaveEdit = (index) => {
    const updatedExpensesList = [...expensesList];
    const oldAmount = updatedExpensesList[index].amount;
    updatedExpensesList[index].amount = parseFloat(editValue);

    const updatedData = expensesData.map((item) =>
      item.name === updatedExpensesList[index].category
        ? { ...item, value: item.value - oldAmount + parseFloat(editValue) }
        : item
    );
    setExpensesData(updatedData);

    setExpensesList(updatedExpensesList);
    setEditingIndex(null);
  };

  const handleDeleteExpense = (index) => {
    const deletedExpense = expensesList[index];
    const updatedExpensesList = expensesList.filter((_, i) => i !== index);

    const updatedData = expensesData.map((item) =>
      item.name === deletedExpense.category
        ? { ...item, value: item.value - deletedExpense.amount }
        : item
    );
    setExpensesData(updatedData);

    setExpensesList(updatedExpensesList);
  };

  const isAllZero = expensesData.every((item) => item.value === 0);

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">User Dashboard</h1>
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Expenses Breakdown</h2>

        <form onSubmit={handleFormSubmit} className="mb-6">
          <label htmlFor="category-select" className="block text-sm font-medium text-gray-700 mb-2">
            Select a Category
          </label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="block w-full p-3 border border-gray-300 rounded-md bg-gray-50 shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Categories</option>
            {expensesData.map((expense, index) => (
              <option key={index} value={expense.name}>
                {expense.name}
              </option>
            ))}
          </select>

          {selectedCategory && (
            <div className="mt-4">
              <label htmlFor="amount-input" className="block text-sm font-medium text-gray-700 mb-2">
                Enter Amount (€) to Add to {selectedCategory}
              </label>
              <input
                id="amount-input"
                type="number"
                min="0"
                value={inputValue}
                onChange={handleInputChange}
                className="block w-full p-3 border border-gray-300 rounded-md bg-gray-50 shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter amount in euros"
              />
            </div>
          )}

          <div className="mt-4">
            <label htmlFor="date-time-picker" className="block text-sm font-medium text-gray-700 mb-2">
              Select Date and Time
            </label>
            <DatePicker
              id="date-time-picker"
              selected={selectedDateTime}
              onChange={(date) => setSelectedDateTime(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="block w-full p-3 border border-gray-300 rounded-md bg-gray-50 shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              style={{ width: '100%', minWidth: '280px', padding: '10px' }}
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition"
          >
            Update Value
          </button>
        </form>

        <div className="w-full h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
          <ResponsiveContainer width="100%" height="100%">
            {isAllZero ? (
              <div className="flex items-center justify-center h-full text-gray-500">No data to display</div>
            ) : (
              <PieChart>
                <Pie
                  data={expensesData}
                  cx="50%"
                  cy="40%"
                  outerRadius="70%"
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value, percent }) =>
                    value > 0 ? `${name}: €${value} (${(percent * 100).toFixed(2)}%)` : ''
                  }
                >
                  {expensesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" />
              </PieChart>
            )}
          </ResponsiveContainer>
        </div>

        <div className="mt-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Expenses List</h2>
          <ul>
            {expensesList.map((expense, index) => (
              <li key={index} className="flex items-center mb-2">
                <div
                  className="w-4 h-4 rounded-full mr-2"
                  style={{ backgroundColor: expense.color }}
                ></div>
                {editingIndex === index ? (
                  <div className="flex items-center">
                    <input
                      type="number"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="mr-2 p-1 border border-gray-300 rounded"
                    />
                    <button
                      onClick={() => handleSaveEdit(index)}
                      className="px-2 py-1 bg-green-500 text-white rounded"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <span>
                    {expense.category}: €{expense.amount.toFixed(2)} (Added on {expense.dateTime})
                  </span>
                )}
                <button
                  onClick={() => handleEditExpense(index)}
                  className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteExpense(index)}
                  className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;