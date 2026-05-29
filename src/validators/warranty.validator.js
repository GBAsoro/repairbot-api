const { query, body, param } = require("express-validator");
const { WARRANTY_STATUS, VALIDATION_PATTERNS } = require("../utils/constants");

const serialNumberValidator = query("serial_number")
  .exists({ checkFalsy: true })
  .withMessage("serial_number is required")
  .bail()
  .isString()
  .withMessage("serial_number must be a string")
  .bail()
  .isLength(VALIDATION_PATTERNS.SERIAL_NUMBER_LENGTH)
  .withMessage("serial_number must be between 8 and 20 characters")
  .bail()
  .matches(VALIDATION_PATTERNS.SERIAL_NUMBER)
  .withMessage(
    "Invalid serial number format. Serial numbers must begin with SM100.",
  );

const purchaseDateValidator = query("purchase_date")
  .optional()
  .isISO8601({ strict: true, strictSeparator: true })
  .withMessage("purchase_date must be a valid date in YYYY-MM-DD format");

const idParamValidator = param("id")
  .exists({ checkFalsy: true })
  .withMessage("id is required")
  .bail()
  .isMongoId()
  .withMessage("id must be a valid Mongo ID");

const warrantyBodyValidator = [
  body("warranty_status")
    .optional()
    .isIn(WARRANTY_STATUS)
    .withMessage("Invalid warranty_status"),
  body("warranty_expiry_date")
    .optional()
    .isISO8601()
    .withMessage("warranty_expiry_date must be a valid date"),
  body("purchase_date")
    .optional()
    .isISO8601()
    .withMessage("purchase_date must be a valid date"),
];

const createWarrantyValidator = [
  body("serial_number")
    .exists({ checkFalsy: true })
    .withMessage("serial_number is required")
    .bail()
    .isString()
    .withMessage("serial_number must be a string")
    .bail()
    .isLength(VALIDATION_PATTERNS.SERIAL_NUMBER_LENGTH)
    .withMessage("serial_number must be between 8 and 20 characters")
    .bail()
    .matches(VALIDATION_PATTERNS.SERIAL_NUMBER)
    .withMessage(
      "Invalid serial number format. Serial numbers must begin with SM100.",
    ),
  ...warrantyBodyValidator,
];

const updateWarrantyValidator = [
  idParamValidator,
  ...warrantyBodyValidator,
];

module.exports = {
  serialNumberValidator,
  purchaseDateValidator,
  idParamValidator,
  createWarrantyValidator,
  updateWarrantyValidator,
};
