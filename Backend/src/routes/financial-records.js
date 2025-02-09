const express = require("express");
const { ExpenseRecordModel, IncomeRecordModel, SavingsGoalModel } = require("../schema/financial-record"); // Adjust the path based on your project structure

const router = express.Router();

// Routes for Expense Records

// Get all expense records by user ID
router.get("/expense/getAllByUserID/:userId", async (req, res) => {
  try {
    const records = await ExpenseRecordModel.find({ userId: req.params.userId });
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new expense record
router.post("/expense", async (req, res) => {
  try {
    const newRecord = new ExpenseRecordModel(req.body);
    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an expense record by ID
router.put("/expense/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const newRecordBody = req.body;
    const record = await ExpenseRecordModel.findByIdAndUpdate(
      id,
      newRecordBody,
      { new: true }
    );

    if (!record) return res.status(404).send("Expense record not found.");

    res.status(200).send(record);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete an expense record by ID
router.delete("/expense/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const record = await ExpenseRecordModel.findByIdAndDelete(id);
    if (!record) return res.status(404).send("Expense record not found.");
    res.status(200).send(record);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Routes for Income Records

// Get all income records by user ID
router.get("/income/getAllByUserID/:userId", async (req, res) => {
  try {
    const records = await IncomeRecordModel.find({ userId: req.params.userId });
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new income record
router.post("/income", async (req, res) => {
  try {
    const newRecord = new IncomeRecordModel(req.body);
    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an income record by ID
router.put("/income/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const newRecordBody = req.body;
    const record = await IncomeRecordModel.findByIdAndUpdate(
      id,
      newRecordBody,
      { new: true }
    );

    if (!record) return res.status(404).send("Income record not found.");

    res.status(200).send(record);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete an income record by ID
router.delete("/income/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const record = await IncomeRecordModel.findByIdAndDelete(id);
    if (!record) return res.status(404).send("Income record not found.");
    res.status(200).send(record);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Savings Goal Routes
router.get("/savings-goal/:userId", async (req, res) => {
  try {
    const goal = await SavingsGoalModel.findOne({ userId: req.params.userId });
    if (!goal) {
      return res.status(404).json({ message: "No savings goal found" });
    }
    res.status(200).json(goal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
