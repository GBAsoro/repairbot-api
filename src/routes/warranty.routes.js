const express = require("express");
const { checkWarranty } = require("../controllers/warranty.controller");
const {
  serialNumberValidator,
  productCategoryValidator,
  purchaseDateValidator,
  validateWarrantyQuery,
} = require("../validators/warranty.validator");

const router = express.Router();

router.get(
  "/check",
  [
    serialNumberValidator,
    productCategoryValidator,
    purchaseDateValidator,
    validateWarrantyQuery,
  ],
  checkWarranty,
);

module.exports = router;
