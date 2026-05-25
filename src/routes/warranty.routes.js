const express = require("express");
const {
  checkWarranty,
  listWarranties,
  createWarranty,
  updateWarranty,
  deleteWarranty,
} = require("../controllers/warranty.controller");
const {
  serialNumberValidator,
  purchaseDateValidator,
  validateWarrantyQuery,
  createWarrantyValidator,
  updateWarrantyValidator,
  idParamValidator,
  validateWarrantyRequest,
} = require("../validators/warranty.validator");

const router = express.Router();

router.get(
  "/check",
  [serialNumberValidator, purchaseDateValidator, validateWarrantyQuery],
  checkWarranty,
);

// CRUD routes for warranty records
router.get("/", listWarranties);
router.post(
  "/",
  createWarrantyValidator,
  validateWarrantyRequest,
  createWarranty,
);
router.patch(
  "/:id",
  updateWarrantyValidator,
  validateWarrantyRequest,
  updateWarranty,
);
router.delete(
  "/:id",
  idParamValidator,
  validateWarrantyRequest,
  deleteWarranty,
);

module.exports = router;
