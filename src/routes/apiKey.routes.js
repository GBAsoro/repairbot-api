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
  validateApiKeyRequest,
} = require("../validators/apiKey.validator");

const router = express.Router();

const adminGuard = (req, res, next) => {
  const secret = req.headers["x-admin-secret"];

  if (!secret || secret !== process.env.ADMIN_SECRET) {
    return res.status(403).json({
      error: true,
      code: "UNAUTHORIZED_ADMIN",
      message: "Invalid or missing admin secret",
      retryable: false,
    });
  }

  next();
};

router.use(adminGuard);
router.post(
  "/generate",
  generateApiKeyValidator,
  validateApiKeyRequest,
  generateKeyController,
);
router.get("/", listKeys);
router.patch("/:id/disable", disableKey);
router.patch("/:id/enable", enableKey);
router.delete("/:id", deleteKey);

module.exports = router;
