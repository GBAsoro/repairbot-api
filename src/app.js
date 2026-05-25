require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectMongo } = require("./config/db");
const { toolsRouter, adminRouter } = require("./routes");
const authorize = require("./middleware/authorize");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

connectMongo();

app.use(
  cors({
    origin: ["https://repairbot-api.onrender.com"],
  }),
);

app.get("/", (req, res) => {
  res.json({
    message: "Repair Cost AI Agent API",
  });
});

app.use(express.json());
app.use("/tools", authorize, toolsRouter);
app.use("/admin/api-keys", adminRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
