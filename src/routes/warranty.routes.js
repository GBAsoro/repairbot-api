const express = require("express");
const {
  checkWarranty,
  listWarranties,
  createWarrantyRecord,
  updateWarrantyRecord,
  deleteWarrantyRecord,
} = require("../controllers/warranty.controller");
const {
  serialNumberValidator,
  purchaseDateValidator,
  createWarrantyValidator,
  updateWarrantyValidator,
  idParamValidator,
} = require("../validators/warranty.validator");
const validationHandler = require("../middleware/validationHandler");

const router = express.Router();

router.get(
  "/check",
  [serialNumberValidator, purchaseDateValidator],
  validationHandler,
  checkWarranty,
);

router.get("/", listWarranties);
router.post(
  "/",
  createWarrantyValidator,
  validationHandler,
  createWarrantyRecord,
);
router.patch(
  "/:id",
  updateWarrantyValidator,
  validationHandler,
  updateWarrantyRecord,
);
router.delete(
  "/:id",
  idParamValidator,
  validationHandler,
  deleteWarrantyRecord,
);

module.exports = router;
