const express = require("express");
const warrantyRoutes = require("./warranty.routes");

const router = express.Router();

router.use("/warranty", warrantyRoutes);

module.exports = router;
