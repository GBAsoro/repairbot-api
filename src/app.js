require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectMongo } = require("./config/db");
const { validateEnv } = require("./config/env");
const { toolsRouter, adminRouter } = require("./routes");
const authorize = require("./middleware/authorize");
const errorHandler = require("./middleware/errorHandler");
const { sendSuccess } = require("./utils/responseBuilder");

const env = validateEnv();
const app = express();

connectMongo();

app.use(
  cors({
    origin: [env.CORS_ORIGIN],
  }),
);

app.get("/", (req, res) => {
  sendSuccess(res, 200, {
    message: "Repair Cost AI Agent API",
  });
});

app.use(express.json());
app.use("/tools", authorize, toolsRouter);
app.use("/admin/api-keys", adminRouter);
app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});
