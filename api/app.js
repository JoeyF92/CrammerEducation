const express = require("express");
const cors = require("cors");

const logRoutes = require("./middleware/logger");
const userRouter = require("./routers/user");
const deckRouter = require ("./routers/decks");

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
<<<<<<< HEAD
app.use("/cards", userRouter);
=======
app.use("/decks", deckRouter)
>>>>>>> d48102f2c6aabfd9e956fc2b9351b79733e33907

module.exports = app;
