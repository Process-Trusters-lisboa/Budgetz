import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

function Dashboard() {
  const categories = [
    "Travel",
    "Food",
    "Rent",
    "Utility Bills",
    "Remaining Balance",
    "Miscellaneous",
  ];

  const [expensesData, setExpensesData] = useState(
    categories.map((category) => ({ name: category, value: 0 }))
  );

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  const [selectedCategory, setSelectedCategory] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [expensesList, setExpensesList] = useState([]);
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [loading, setLoading] = useState(true);

  //axios fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataPromises = categories.map(async (category) => {
          const response = await axios.get(
            `https://firestore.googleapis.com/v1/projects/budgetz-7b9d9/databases/(default)/documents/newusers/user1/${category}`
          );

          if (response.data && response.data.documents) {
            // Store all expense entries, including docId
            const expenseItems = response.data.documents.map((document) => {
              const amount = document.fields.amount
                ? parseFloat(document.fields.amount.integerValue)
                : 0;

              return {
                category: category.charAt(0).toUpperCase() + category.slice(1),
                amount: amount,
                color: COLORS[categories.indexOf(category) % COLORS.length], // Assign a color based on the category
                dateTime: new Date().toLocaleString(),
                docid: document.name.split("/").pop(), // Extract docId from the document's name
              };
            });

            // Sum the expenses for each category
            const totalAmount = expenseItems.reduce(
              (total, item) => total + item.amount,
              0
            );

            return {
              name: category.charAt(0).toUpperCase() + category.slice(1),
              value: totalAmount,
              expenseItems, // Store individual expense items
            };
          } else {
            console.warn(`No data found for category: ${category}`);
            return {
              name: category.charAt(0).toUpperCase() + category.slice(1),
              value: 0,
              expenseItems: [],
            };
          }
        });

        const fetchedData = await Promise.all(dataPromises);

        console.log(`Fetched data: `, fetchedData);
        setExpensesData(
          fetchedData.map((item) => ({ name: item.name, value: item.value }))
        ); // Note: Use just the totals for the chart
        setExpensesList(fetchedData.flatMap((item) => item.expenseItems));
        setLoading(false);
      } catch (error) {
        console.error("We can’t fetch data right now", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // add amount to firestore using axios
  const handleAddAmount = async () => {
    const amount = parseFloat(inputValue);
    if (selectedCategory && !isNaN(amount) && amount >= 0) {
      try {
        // Add the new amount to Firestore
        await axios.post(
          `https://firestore.googleapis.com/v1/projects/budgetz-7b9d9/databases/(default)/documents/newusers/user1/${selectedCategory}`,
          {
            fields: {
              amount: { integerValue: amount },
            },
          }
        );

        await fetchUpdatedData();

        setInputValue("");
      } catch (error) {
        console.error("Error adding amount:", error);
      }
    } else {
      alert("Please enter a valid amount (must be 0 or greater).");
    }
  };

  // fetching data after update
  const fetchUpdatedData = async () => {
    try {
      const dataPromises = categories.map(async (category) => {
        const response = await axios.get(
          `https://firestore.googleapis.com/v1/projects/budgetz-7b9d9/databases/(default)/documents/newusers/user1/${category}`
        );

        if (response.data && response.data.documents) {
          const expenseItems = response.data.documents.map((document) => {
            const amount = document.fields.amount
              ? parseFloat(document.fields.amount.integerValue)
              : 0;
            return {
              category: category.charAt(0).toUpperCase() + category.slice(1),
              amount: amount,
              color: COLORS[categories.indexOf(category) % COLORS.length],
              dateTime: new Date().toLocaleString(),
              docId: document.name.split("/").pop(), // Extracting the document ID from Firestore path
            };
          });

          const totalAmount = expenseItems.reduce(
            (total, item) => total + item.amount,
            0
          );

          return {
            name: category.charAt(0).toUpperCase() + category.slice(1),
            value: totalAmount,
            expenseItems,
          };
        } else {
          console.warn(`No data found for category: ${category}`);
          return {
            name: category.charAt(0).toUpperCase() + category.slice(1),
            value: 0,
            expenseItems: [],
          };
        }
      });

      const fetchedData = await Promise.all(dataPromises);

      setExpensesData(
        fetchedData.map((item) => ({ name: item.name, value: item.value }))
      );
      setExpensesList(fetchedData.flatMap((item) => item.expenseItems));
    } catch (error) {
      console.error("Error fetching updated data:", error);
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (value >= 0) {
      setInputValue(value);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleAddAmount();
  };

  const handleEditExpense = (docid) => {
    const expense = expensesList.find((expense) => expense.docid === docid);
    if (expense) {
      setEditingIndex(docid);
      setEditValue(expense.amount);
    }
  };

  const handleSaveEdit = async (docid) => {
    if (editValue === "") return;

    const expense = expensesList.find((expense) => expense.docid === docid);
    if (!expense) return;

    try {
      const category = expense.category;
      const docId = expense.docid;

      const updatedData = {
        fields: {
          amount: { integerValue: editValue },
        },
      };

      // edit/patch
      const response = await axios.patch(
        `https://firestore.googleapis.com/v1/projects/budgetz-7b9d9/databases/(default)/documents/newusers/user1/${category}/${docId}`,
        updatedData
      );

      if (response.status === 200) {
        console.log("Expense successfully updated in Firestore");

        const updatedExpensesList = expensesList.map((expense) =>
          expense.docid === docid ? { ...expense, amount: editValue } : expense
        );
        setExpensesList(updatedExpensesList);

        const updatedDataForCategory = expensesData.map((item) =>
          item.name === expense.category
            ? {
                ...item,
                value: item.value - expense.amount + editValue,
              }
            : item
        );
        setExpensesData(updatedDataForCategory);

        setEditingIndex(null);
        setEditValue("");
      } else {
        console.error("Failed to update expense in Firestore.");
      }
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  const handleDeleteExpense = async (docId) => {
    console.log("Attempting to delete expense with docId:", docId);
    try {
      // Find the expense to delete by docId
      const deletedExpense = expensesList.find(
        (expense) => expense.docid === docId
      );

      if (!deletedExpense) {
        console.log("Expense not found in the list.");
        return;
      }

      // Get the category (converted to lowercase) for the Firestore collection
      const category = deletedExpense.category;
      console.log(`Categories: ${category}`);

      // Perform the delete operation using the document ID in Firestore
      const response = await axios.delete(
        `https://firestore.googleapis.com/v1/projects/budgetz-7b9d9/databases/(default)/documents/newusers/user1/${category}/${docId}`
      );

      if (response.status === 200) {
        console.log(`Expense with docId: ${docId} deleted from Firestore.`);

        // Update local state only after successful deletion
        const updatedExpensesList = expensesList.filter(
          (expense) => expense.docid !== docId
        );
        setExpensesList(updatedExpensesList);

        // Update the total value for the category in expensesData
        const updatedData = expensesData.map((item) =>
          item.name === deletedExpense.category
            ? { ...item, value: item.value - deletedExpense.amount } // Subtract the deleted amount from the category's total
            : item
        );
        setExpensesData(updatedData);
      } else {
        console.error("Failed to delete expense from Firestore.");
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const isAllZero = expensesData.every((item) => item.value === 0);

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">User Dashboard</h1>
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">
          Expenses Breakdown
        </h2>

        <form onSubmit={handleFormSubmit} className="mb-6">
          <label
            htmlFor="category-select"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
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
              <label
                htmlFor="amount-input"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
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
            <label
              htmlFor="date-time-picker"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
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
              style={{ width: "100%", minWidth: "280px", padding: "10px" }}
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
              <div className="flex items-center justify-center h-full text-gray-500">
                No data to display
              </div>
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
                    value > 0
                      ? `${name}: €${value} (${(percent * 100).toFixed(2)}%)`
                      : ""
                  }
                >
                  {expensesData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                />
              </PieChart>
            )}
          </ResponsiveContainer>
        </div>

        <div className="mt-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">
            Expenses List
          </h2>
          <ul>
            {expensesList.map((expense, index) => (
              <li key={index} className="flex items-center mb-2">
                <div
                  className="w-4 h-4 rounded-full mr-2"
                  style={{ backgroundColor: expense.color }}
                ></div>
                {editingIndex === expense.docid ? (
                  <div className="flex items-center">
                    <input
                      type="number"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="mr-2 p-1 border border-gray-300 rounded"
                    />
                    <button
                      onClick={() => handleSaveEdit(expense.docid)}
                      className="px-2 py-1 bg-green-500 text-white rounded"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <span>
                    {expense.category}: €{expense.amount} (Added on{" "}
                    {expense.dateTime})
                  </span>
                )}

                <button
                  onClick={() => handleEditExpense(expense.docid)}
                  className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteExpense(expense.docid)}
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
