const express = require("express");
const warrantyRoutes = require("./warranty.routes");
const apiKeyRoutes = require("./apiKey.routes");

const toolsRouter = express.Router();
toolsRouter.use("/warranty", warrantyRoutes);

const adminRouter = express.Router();
adminRouter.use("/", apiKeyRoutes);

module.exports = {
  toolsRouter,
  adminRouter,
};
