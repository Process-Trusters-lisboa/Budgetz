import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

function Dashboard() {
  const [expensesData, setExpensesData] = useState([
    { name: 'Food', value: 0 },
    { name: 'Rent', value: 0 },
    { name: 'Utility Bills', value: 0 },
    { name: 'Travel', value: 0 },
    { name: 'Miscellaneous', value: 0 },
  ]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(true);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const categories = ['food', 'rent', 'utilitybills', 'travel', 'miscellaneous'];

  // axios fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataPromises = categories.map(async (category) => {
          const response = await axios.get(
            `https://firestore.googleapis.com/v1/projects/budgetz-7b9d9/databases/(default)/documents/newusers/user1/${category}`
          );
    
     
          if (response.data && response.data.documents) {
            const amount = response.data.documents.reduce(
              (total, document) => {
                //value to a number
                const amountValue = document.fields.amount ? parseFloat(document.fields.amount.integerValue) : 0;
                return total + amountValue;
              },
              0
            );
            return { name: category.charAt(0).toUpperCase() + category.slice(1), value: amount };
          } else {
            console.warn(`No data found for category: ${category}`);
            return { name: category.charAt(0).toUpperCase() + category.slice(1), value: 0 }; 
          }
        });
    
        const fetchedData = await Promise.all(dataPromises);
        console.log(fetchedData); 
        setExpensesData(fetchedData); 
        setLoading(false);
      } catch (error) {
        console.error('We can’t fetch data right now', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (value >= 0) {
      setInputValue(value);
    }
  };

  // add amount to firestore using axios
  const handleAddAmount = async () => {
    const amount = parseFloat(inputValue);
    if (selectedCategory && !isNaN(amount) && amount >= 0) {
      try {
      
        await axios.post(
          `https://firestore.googleapis.com/v1/projects/budgetz-7b9d9/databases/(default)/documents/newusers/user1/${selectedCategory}`,
          {
            fields: {
              amount: { integerValue: amount },
            },
          }
        );

        await fetchUpdatedData();
        
        
        setInputValue('');
      } catch (error) {
        console.error('Error adding amount:', error);
      }
    } else {
      alert('Please enter a valid amount (must be 0 or greater).');
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
          const amount = response.data.documents.reduce(
            (total, document) => {
              
              const amountValue = document.fields.amount ? parseFloat(document.fields.amount.integerValue) : 0;
              return total + amountValue;
            },
            0
          );
          return { name: category.charAt(0).toUpperCase() + category.slice(1), value: amount };
        } else {
          console.warn(`No data found for category: ${category}`);
          return { name: category.charAt(0).toUpperCase() + category.slice(1), value: 0 }; 
        }
      });
  
      const fetchedData = await Promise.all(dataPromises);
      setExpensesData(fetchedData); 
    } catch (error) {
      console.error('Error fetching updated data:', error);
    }
  };
  

  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleAddAmount();
  };

  // If data is still loading, show loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <div className="p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-bold mb-4">User Dashboard</h1>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Expenses Breakdown</h2>

            {/* Form to update selected category and amount */}
            <form onSubmit={handleFormSubmit} className="mb-4">
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
                  <option key={index} value={expense.name.toLowerCase()}>
                    {expense.name}
                  </option>
                ))}
              </select>

              {selectedCategory && (
                <div className="mt-4">
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
                </div>
              )}

              <button
                type="submit"
                className="mt-4 w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Add Amount
              </button>
            </form>

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
                  <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;