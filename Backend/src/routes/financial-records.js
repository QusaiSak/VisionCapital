const express = require("express");
const { ExpenseRecordModel, IncomeRecordModel } = require("../schema/financial-record"); // Adjust the path based on your project structure

const router = express.Router();

// Routes for Expense Records

// Get all expense records by user ID
router.get("/expense/getAllByUserID/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const records = await ExpenseRecordModel.find({ userId: userId });
    if (records.length === 0) {
      return res.status(404).send("No expense records found for the user.");
    }
    res.status(200).send(records);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Create a new expense record
router.post("/expense", async (req, res) => {
  try {
    const newRecordBody = req.body;
    const newRecord = new ExpenseRecordModel(newRecordBody);
    const savedRecord = await newRecord.save();

    res.status(201).send(savedRecord); // 201 Created
  } catch (err) {
    res.status(500).send(err);
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
    const userId = req.params.userId;
    const records = await IncomeRecordModel.find({ userId: userId });
    if (records.length === 0) {
      return res.status(404).send("No income records found for the user.");
    }
    res.status(200).send(records);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Create a new income record
router.post("/income", async (req, res) => {
  try {
    const newRecordBody = req.body;
    const newRecord = new IncomeRecordModel(newRecordBody);
    const savedRecord = await newRecord.save();

    res.status(201).send(savedRecord); // 201 Created
  } catch (err) {
    res.status(500).send(err);
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

module.exports = router;
