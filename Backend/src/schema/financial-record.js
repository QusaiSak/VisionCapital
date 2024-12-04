const mongoose = require('mongoose');

// Define the financial record schemas
const ExpenseRecordSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  paymentMethod : { type: String, required: true },
});

const IncomeRecordSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  incomeSource : { type: String, required: true },
});
const savingsGoalSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  goalName: { type: String, required: true },
  goalAmount: { type: Number, required: true },
  targetDate: { type: Date, required: true },
  requiredMonthlySavings: { type: Number, required: true },
  additionalSavingsNeeded: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Create the Mongoose models using the schemas
const ExpenseRecordModel = mongoose.model("ExpenseRecord", ExpenseRecordSchema);
const IncomeRecordModel = mongoose.model("IncomeRecord", IncomeRecordSchema);
const SavingsGoalModel = mongoose.model("SavingsGoal", savingsGoalSchema);
module.exports = { ExpenseRecordModel, IncomeRecordModel, SavingsGoalModel };
