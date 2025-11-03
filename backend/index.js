const express = require("express");
const cors = require("cors");
require("dotenv").config();
const dotenv = require("dotenv");
const db = require("./config/db");
const authRoutes = require("./routes/authRoutes");




dotenv.config();


const app = express();


app.use(cors());
app.use(express.json());


db.connect();


app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
  res.send("Backend server is running successfully 🚀");
});

const taskRoutes = require("./routes/taskRoutes");
app.use("/api/tasks", taskRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
