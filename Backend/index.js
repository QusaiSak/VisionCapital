const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const financialRecordRouter = require('./src/routes/financial-records');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors({
  origin: ["https://vision-capital-frontend.vercel.app/"],
  methods: ["POST", "GET"],
  credentials: true
}));

const mongoURI = process.env.mongoURI

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/financial-records", financialRecordRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
