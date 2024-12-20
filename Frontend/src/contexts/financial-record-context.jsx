import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
const BASE_URL = "https://visioncapital-backend.onrender.com"



// Create the context for financial records
export const FinancialRecordsContext = createContext(undefined);

// FinancialRecordsProvider component to manage state and provide context
export const FinancialRecordsProvider = ({ children }) => {
  const [expenseRecords, setExpenseRecords] = useState([]);
  const [incomeRecords, setIncomeRecords] = useState([]);
  const { user } = useUser();

  // Fetch financial records based on the user's ID
  const fetchRecords = async () => {
    if (!user) return;

    try {
      const expenseResponse = await axios.get(
        `${BASE_URL}/expense/getAllByUserID/${user.id}`
      );
      const incomeResponse = await axios.get(
        `${BASE_URL}/income/getAllByUserID/${user.id}`
      );

      setExpenseRecords(expenseResponse.data);
      setIncomeRecords(incomeResponse.data);
    } catch (err) {
      console.error("Error fetching records:", err);
    }
  };

  // Fetch records whenever the user changes
  useEffect(() => {
    fetchRecords();
  }, [user]); // Ensure to include user in the dependency array

  // Add a new expense record
  const addExpenseRecord = async (record) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/expense`,
        record
      );
      setExpenseRecords((prev) => [...prev, response.data]);
    } catch (err) {
      console.error("Error adding expense record:", err);
    }
  };

  // Add a new income record
  const addIncomeRecord = async (record) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/income`,
        record
      );
      setIncomeRecords((prev) => [...prev, response.data]);
    } catch (err) {
      console.error("Error adding income record:", err);
    }
  };

  // Update an existing expense record
  const updateExpenseRecord = async (id, newRecord) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/expense/${id}`,
        newRecord
      );
      setExpenseRecords((prev) =>
        prev.map((record) => (record._id === id ? response.data : record))
      );
    } catch (err) {
      console.error("Error updating expense record:", err);
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
    console.log("Attempting to delete expense record with ID:", id); // Log the ID being deleted
    try {
      await axios.delete(`${BASE_URL}/expense/${id}`);
      setExpenseRecords((prev) => prev.filter((record) => record._id !== id));
      console.log("Successfully deleted expense record with ID:", id); // Confirm deletion
    } catch (err) {
      console.error("Error deleting expense record:", err);
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
  const [savingsGoal, setSavingsGoal] = useState(null);

  const addSavingsGoal = async (goalData) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/savings-goal`, goalData);
      setSavingsGoal(response.data);
    } catch (error) {
      console.error("Error adding savings goal:", error);
    }
  };

  const getSavingsGoal = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/savings-goal/${user.id}`);
      setSavingsGoal(response.data);
    } catch (error) {
      console.error("Error fetching savings goal:", error);
    }
  };

  const updateSavingsGoal = async (goalId, updatedData) => {
    try {
      const response = await axios.put(`${BASE_URL}/api/savings-goal/${goalId}`, updatedData);
      setSavingsGoal(response.data);
    } catch (error) {
      console.error("Error updating savings goal:", error);
    }
  };

  const deleteSavingsGoal = async (goalId) => {
    try {
      await axios.delete(`${BASE_URL}/api/savings-goal/${goalId}`);
      setSavingsGoal(null);
    } catch (error) {
      console.error("Error deleting savings goal:", error);
    }
  };

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
        savingsGoal,
        addSavingsGoal,
        getSavingsGoal,
        updateSavingsGoal,
        deleteSavingsGoal,
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
