import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { createContext, useContext, useState } from "react";

const BASE_URL = import.meta.env.BASE_URL; // Make sure this matches your backend URL

// Create the context for financial records
export const FinancialRecordsContext = createContext(undefined);

// FinancialRecordsProvider component to manage state and provide context
export const FinancialRecordsProvider = ({ children }) => {
  const [expenseRecords, setExpenseRecords] = useState([]);
  const [incomeRecords, setIncomeRecords] = useState([]);
  const { user } = useUser();
  axios.defaults.withCredentials = true;

  const fetchRecords = async () => {
    if (!user) return;
    
    try {
      // Get expense records
      const expenseResponse = await axios.get(`${BASE_URL}/expense/getAllByUserID/${user.id}`);
      setExpenseRecords(expenseResponse.data);

      // Get income records
      const incomeResponse = await axios.get(`${BASE_URL}/income/getAllByUserID/${user.id}`);
      setIncomeRecords(incomeResponse.data);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  // Add expense record
  const addExpenseRecord = async (record) => {
    try {
      const response = await axios.post(`${BASE_URL}/expense`, record);
      setExpenseRecords(prev => [...prev, response.data]);
      await fetchRecords(); // Refresh records after adding
      return response.data;
    } catch (error) {
      console.error('Error adding expense record:', error);
      throw error;
    }
  };

  // Add income record
  const addIncomeRecord = async (record) => {
    try {
      const response = await axios.post(`${BASE_URL}/income`, record);
      setIncomeRecords(prev => [...prev, response.data]);
      await fetchRecords(); // Refresh records after adding
      return response.data;
    } catch (error) {
      console.error('Error adding income record:', error);
      throw error;
    }
  };

  // Update an existing expense record
  const updateExpenseRecord = async (id, newRecord) => {
    try {
      const response = await axios.put(`${BASE_URL}/expense/${id}`, newRecord);
      setExpenseRecords(prev =>
        prev.map(record => record._id === id ? response.data : record)
      );
    } catch (error) {
      console.error('Error updating expense record:', error);
      throw error;
    }
  };

  // Update an existing income record
  const updateIncomeRecord = async (id, newRecord) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/income/${id}`,
        newRecord
      );
      setIncomeRecords((prev) =>
        prev.map((record) => (record._id === id ? response.data : record))
      );
    } catch (err) {
      console.error("Error updating income record:", err);
    }
  };

  // Delete an expense record
  const deleteExpenseRecord = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/expense/${id}`);
      setExpenseRecords(prev => prev.filter(record => record._id !== id));
    } catch (error) {
      console.error('Error deleting expense record:', error);
      throw error;
    }
  };

  // Delete an income record
  const deleteIncomeRecord = async (id) => {
    console.log("Attempting to delete income record with ID:", id); // Log the ID being deleted
    try {
      await axios.delete(`${BASE_URL}/income/${id}`);
      setIncomeRecords((prev) => prev.filter((record) => record._id !== id));
      console.log("Successfully deleted income record with ID:", id); // Confirm deletion
    } catch (err) {
      console.error("Error deleting income record:", err);
    }
  };

  // Add state and functions for savings goal


  // Provide context values
  return (
    <FinancialRecordsContext.Provider
      value={{
        expenseRecords,
        incomeRecords,
        addExpenseRecord,
        addIncomeRecord,
        updateExpenseRecord,
        updateIncomeRecord,
        deleteExpenseRecord,
        deleteIncomeRecord,
      }}
    >
      {children} {/* Ensure children are rendered */}
    </FinancialRecordsContext.Provider>
  );
};

// Custom hook to use the FinancialRecords context
export const useFinancialRecords = () => {
  const context = useContext(FinancialRecordsContext);

  if (!context) {
    throw new Error(
      "useFinancialRecords must be used within a FinancialRecordsProvider"
    );
  }

  return context;
};
