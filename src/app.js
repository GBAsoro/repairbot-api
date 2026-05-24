require("dotenv").config();
const express = require("express");
const { connectMongo } = require("./config/db");
const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

connectMongo();

app.use(express.json());
app.use("/tools", routes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
