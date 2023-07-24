const express = require("express");
const cors = require("cors");

const logRoutes = require("./middleware/logger");
const userRouter = require("./routers/user");

const app = express();

app.use(cors());
app.use(express.json());
app.use(logRoutes);

app.get("/", (req, res) => {
  res.json({
    name: "BrainBoost",
    description: "Time to test your knowledge!",
  });
});

app.use("/users", userRouter);

module.exports = app;
