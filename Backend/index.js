const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const financialRecordRouter = require('./src/routes/financial-records');
const app = express();
require('dotenv').config()
const port = process.env.port
;

app.use(express.json());
app.use(cors());

// Use the environment variable for the MongoDB URI
const mongoURI = process.env.mongoURI

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Couldn't connect to MongoDB", err));

app.use("/financial-records", financialRecordRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
