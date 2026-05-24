const express = require("express");
const { checkWarranty } = require("../controllers/warranty.controller");
const {
  serialNumberValidator,
  purchaseDateValidator,
  validateWarrantyQuery,
} = require("../validators/warranty.validator");

const router = express.Router();

router.get(
  "/check",
  [serialNumberValidator, purchaseDateValidator, validateWarrantyQuery],
  checkWarranty,
);

module.exports = router;
