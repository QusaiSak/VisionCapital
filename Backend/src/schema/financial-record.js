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


// Create the Mongoose models using the schemas
const ExpenseRecordModel = mongoose.model("ExpenseRecord", ExpenseRecordSchema);
const IncomeRecordModel = mongoose.model("IncomeRecord", IncomeRecordSchema);
module.exports = { ExpenseRecordModel, IncomeRecordModel, SavingsGoalModel };
