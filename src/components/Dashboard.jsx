import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { auth } from "../config/firebase";
import axios from "axios";

const categories = ["Travel", "Food", "Rent", "Utility Bills", "Miscellaneous"];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

function Dashboard() {
  const [expensesData, setExpensesData] = useState(categories.map(category => ({ name: category, value: 0 })));
  const [selectedCategory, setSelectedCategory] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [expensesList, setExpensesList] = useState([]);
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [initialBalance, setInitialBalance] = useState(() => {
    const savedInitialBalance = localStorage.getItem('initialBalance');
    return savedInitialBalance ? parseFloat(savedInitialBalance) : "";
  });
  const [remainingBalance, setRemainingBalance] = useState(() => {
    const savedRemainingBalance = localStorage.getItem('remainingBalance');
    return savedRemainingBalance ? parseFloat(savedRemainingBalance) : 1000;
  });

  useEffect(() => {
    localStorage.setItem('initialBalance', initialBalance);
  }, [initialBalance]);

  useEffect(() => {
    localStorage.setItem('remainingBalance', remainingBalance);
  }, [remainingBalance]);

  useEffect(() => {
    const totalExpenses = expensesData.reduce((total, item) => total + item.value, 0);
    const newBalance = (initialBalance || 0) - totalExpenses;
    setRemainingBalance(newBalance);
  }, [expensesData, initialBalance]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await Promise.all(categories.map(async category => {
          const response = await axios.get(`https://firestore.googleapis.com/v1/projects/budgetz-7b9d9/databases/(default)/documents/newusers/user1/${category}`);
          if (response.data?.documents) {
            const expenseItems = response.data.documents.map(document => ({
              category: category.charAt(0).toUpperCase() + category.slice(1),
              amount: parseFloat(document.fields.amount?.integerValue || 0),
              color: COLORS[categories.indexOf(category) % COLORS.length],
              dateTime: new Date().toLocaleString(),
              docid: document.name.split("/").pop(),
            }));
            const totalAmount = expenseItems.reduce((total, item) => total + item.amount, 0);
            return { name: category.charAt(0).toUpperCase() + category.slice(1), value: totalAmount, expenseItems };
          }
          return { name: category.charAt(0).toUpperCase() + category.slice(1), value: 0, expenseItems: [] };
        }));
        setExpensesData(fetchedData.map(item => ({ name: item.name, value: item.value })));
        setExpensesList(fetchedData.flatMap(item => item.expenseItems));
      } catch (error) {
        console.error("We can’t fetch data right now", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddAmount = async () => {
    const amount = parseFloat(inputValue);
    if (selectedCategory && !isNaN(amount) && amount > 0) {
      try {
        await axios.post(`https://firestore.googleapis.com/v1/projects/budgetz-7b9d9/databases/(default)/documents/newusers/user1/${selectedCategory}`, {
          fields: { amount: { integerValue: amount } },
        });
        await fetchUpdatedData();
        setInputValue("");
      } catch (error) {
        console.error("Error adding amount:", error);
      }
    } else {
      alert("Please enter a valid amount (must be greater than 0).");
    }
  };

  const fetchUpdatedData = async () => {
    try {
      const fetchedData = await Promise.all(categories.map(async category => {
        const response = await axios.get(`https://firestore.googleapis.com/v1/projects/budgetz-7b9d9/databases/(default)/documents/newusers/user1/${category}`);
        if (response.data?.documents) {
          const expenseItems = response.data.documents.map(document => ({
            category: category.charAt(0).toUpperCase() + category.slice(1),
            amount: parseFloat(document.fields.amount?.integerValue || 0),
            color: COLORS[categories.indexOf(category) % COLORS.length],
            dateTime: new Date().toLocaleString(),
            docId: document.name.split("/").pop(),
          }));
          const totalAmount = expenseItems.reduce((total, item) => total + item.amount, 0);
          return { name: category.charAt(0).toUpperCase() + category.slice(1), value: totalAmount, expenseItems };
        }
        return { name: category.charAt(0).toUpperCase() + category.slice(1), value: 0, expenseItems: [] };
      }));
      setExpensesData(fetchedData.map(item => ({ name: item.name, value: item.value })));
      setExpensesList(fetchedData.flatMap(item => item.expenseItems));
    } catch (error) {
      console.error("Error fetching updated data:", error);
    }
  };

  const handleEditExpense = (docid) => {
    const expense = expensesList.find(expense => expense.docid === docid);
    if (expense) {
      setEditingIndex(docid);
      setEditValue(expense.amount.toString());
    }
  };

  const handleSaveEdit = async (docid) => {
    const parsedValue = parseFloat(editValue.replace(/^0+/, ''));

    if (isNaN(parsedValue) || parsedValue <= 0) {
      alert("Please enter a valid amount greater than 0.");
      return;
    }

    const expense = expensesList.find(expense => expense.docid === docid);
    if (!expense) return;

    try {
      await axios.patch(`https://firestore.googleapis.com/v1/projects/budgetz-7b9d9/databases/(default)/documents/newusers/user1/${expense.category}/${docid}`, {
        fields: { amount: { integerValue: parsedValue } },
      });
      const updatedExpensesList = expensesList.map(expense => expense.docid === docid ? { ...expense, amount: parsedValue } : expense);
      setExpensesList(updatedExpensesList);
      setExpensesData(expensesData.map(item => item.name === expense.category ? { ...item, value: item.value - expense.amount + parsedValue } : item));
      setEditingIndex(null);
      setEditValue("");
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  const handleDeleteExpense = async (docId) => {
    try {
      const deletedExpense = expensesList.find(expense => expense.docid === docId);
      if (!deletedExpense) return;
      await axios.delete(`https://firestore.googleapis.com/v1/projects/budgetz-7b9d9/databases/(default)/documents/newusers/user1/${deletedExpense.category}/${docId}`);
      setExpensesList(expensesList.filter(expense => expense.docid !== docId));
      setExpensesData(expensesData.map(item => item.name === deletedExpense.category ? { ...item, value: item.value - deletedExpense.amount } : item));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleInitialBalanceChange = (e) => {
    const value = e.target.value;
    if (value === "" || (!isNaN(value) && parseFloat(value) >= 0)) {
      setInitialBalance(value === "" ? "" : parseFloat(value));
    }
  };

  const isAllZero = expensesData.every(item => item.value === 0);

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">User Dashboard</h1>
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Expenses Breakdown</h2>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Remaining Balance</h3>
          <div className="bg-gray-100 p-4 rounded-lg">
            <span className="text-2xl font-bold">€{remainingBalance}</span>
          </div>
          <div className="mt-2">
            <label htmlFor="initial-balance" className="block text-sm font-medium text-gray-700 mb-2">Edit Initial Balance</label>
            <input
              id="initial-balance"
              type="number"
              min="0"
              value={initialBalance}
              onChange={handleInitialBalanceChange}
              className="block w-full p-3 border border-gray-300 rounded-md bg-gray-50 shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter initial balance"
            />
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Remaining Balance</h3>
          <div className="w-full h-[300px] sm:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[{ name: "Remaining Balance", value: remainingBalance }]} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <form onSubmit={e => { e.preventDefault(); handleAddAmount(); }} className="mb-6">
          <label htmlFor="category-select" className="block text-sm font-medium text-gray-700 mb-2">Select a Category</label>
          <select id="category-select" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="block w-full p-3 border border-gray-300 rounded-md bg-gray-50 shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
            <option value="">All Categories</option>
            {expensesData.map((expense, index) => <option key={index} value={expense.name}>{expense.name}</option>)}
          </select>
          {selectedCategory && (
            <div className="mt-4">
              <label htmlFor="amount-input" className="block text-sm font-medium text-gray-700 mb-2">Enter Amount (€) to Add to {selectedCategory}</label>
              <input id="amount-input" type="number" min="0.01" step="0.01" value={inputValue} onChange={e => setInputValue(e.target.value)} className="block w-full p-3 border border-gray-300 rounded-md bg-gray-50 shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter amount in euros" />
            </div>
          )}
          <div className="mt-4">
            <label htmlFor="date-time-picker" className="block text-sm font-medium text-gray-700 mb-2">Select Date and Time</label>
            <DatePicker id="date-time-picker" selected={selectedDateTime} onChange={date => setSelectedDateTime(date)} showTimeSelect timeFormat="HH:mm" timeIntervals={15} timeCaption="Time" dateFormat="MMMM d, yyyy h:mm aa" className="block w-full p-3 border border-gray-300 rounded-md bg-gray-50 shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <button type="submit" className="mt-6 w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition">Update Value</button>
        </form>
        <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
          <ResponsiveContainer width="100%" height="100%">
            {isAllZero ? <div className="flex items-center justify-center h-full text-gray-500">No data to display</div> : (
              <PieChart>
                <Pie data={expensesData} cx="50%" cy="50%" outerRadius="70%" fill="#8884d8" dataKey="value" label={({ name, value, percent }) => value > 0 ? `${name}: €${value} (${(percent * 100).toFixed(2)}%)` : ""}>
                  {expensesData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            )}
          </ResponsiveContainer>
        </div>
        <div className="mt-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Expenses List</h2>
          <ul>
            {expensesList.map((expense, index) => (
              <li key={index} className="flex flex-col sm:flex-row items-center justify-between mb-2 p-2 border-b border-gray-200">
                <div className="flex items-center mb-2 sm:mb-0">
                  <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: expense.color }}></div>
                  {editingIndex === expense.docid ? (
                    <div className="flex items-center">
                      <input
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={editValue}
                        onChange={e => setEditValue(e.target.value)}
                        className="mr-2 p-1 border border-gray-300 rounded"
                      />
                      <button onClick={() => handleSaveEdit(expense.docid)} className="px-2 py-1 bg-green-500 text-white rounded">Save</button>
                    </div>
                  ) : (
                    <span>{expense.category}: €{expense.amount} (Added on {expense.dateTime})</span>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => handleEditExpense(expense.docid)} className="px-2 py-1 bg-blue-500 text-white rounded">Edit</button>
                  <button onClick={() => handleDeleteExpense(expense.docid)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;