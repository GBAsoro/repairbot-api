const { query, body, param, validationResult } = require("express-validator");

const serialNumberValidator = query("serial_number")
  .exists({ checkFalsy: true })
  .withMessage("serial_number is required")
  .bail()
  .isString()
  .withMessage("serial_number must be a string")
  .bail()
  .isLength({ min: 8, max: 20 })
  .withMessage("serial_number must be between 8 and 20 characters")
  .bail()
  .matches(/^SM100[A-Za-z0-9\-]+$/)
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

const createWarrantyValidator = [
  body("serial_number")
    .exists({ checkFalsy: true })
    .withMessage("serial_number is required")
    .bail()
    .isString()
    .withMessage("serial_number must be a string")
    .bail()
    .isLength({ min: 8, max: 20 })
    .withMessage("serial_number must be between 8 and 20 characters")
    .bail()
    .matches(/^SM100[A-Za-z0-9\-]+$/)
    .withMessage(
      "Invalid serial number format. Serial numbers must begin with SM100.",
    ),
  body("warranty_status")
    .optional()
    .isIn(["In Warranty", "Out of Warranty", "Service Plan Active", "Unknown"])
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

const updateWarrantyValidator = [
  idParamValidator,
  body("warranty_status")
    .optional()
    .isIn(["In Warranty", "Out of Warranty", "Service Plan Active", "Unknown"])
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

function validateWarrantyQuery(req, res, next) {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const errorArray = errors.array();
  const serialNumberError = errorArray.find(
    (error) => error.param === "serial_number",
  );

  if (serialNumberError) {
    return res.status(400).json({
      error: true,
      code: "INVALID_SERIAL_NUMBER",
      message:
        "Invalid serial number format. Serial numbers must begin with SM100.",
      retryable: false,
    });
  }

  return res.status(400).json({
    error: true,
    code: "VALIDATION_ERROR",
    message: "Invalid request parameters",
    retryable: false,
    details: errorArray.map((err) => ({ field: err.param, message: err.msg })),
  });
}

function validateWarrantyRequest(req, res, next) {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const errorArray = errors.array();
  return res.status(400).json({
    error: true,
    code: "VALIDATION_ERROR",
    message: "Invalid request parameters",
    retryable: false,
    details: errorArray.map((err) => ({ field: err.param, message: err.msg })),
  });
}

module.exports = {
  serialNumberValidator,
  purchaseDateValidator,
  validateWarrantyQuery,
  idParamValidator,
  createWarrantyValidator,
  updateWarrantyValidator,
  validateWarrantyRequest,
};
