const express = require("express");
const {
  generateKeyController,
  listKeys,
  disableKey,
  enableKey,
  deleteKey,
} = require("../controllers/apiKey.controller");
const {
  generateApiKeyValidator,
} = require("../validators/apiKey.validator");
const adminGuard = require("../middleware/adminGuard");
const validationHandler = require("../middleware/validationHandler");

const router = express.Router();

router.use(adminGuard);
router.post(
  "/generate",
  generateApiKeyValidator,
  validationHandler,
  generateKeyController,
);
router.get("/", listKeys);
router.patch("/:id/disable", disableKey);
router.patch("/:id/enable", enableKey);
router.delete("/:id", deleteKey);

module.exports = router;
