const { body, validationResult } = require("express-validator");

const generateApiKeyValidator = body("name")
  .exists({ checkFalsy: true })
  .withMessage("name is required")
  .bail()
  .isString()
  .withMessage("name must be a string")
  .bail()
  .isLength({ min: 3, max: 50 })
  .withMessage("name must be between 3 and 50 characters");

function validateApiKeyRequest(req, res, next) {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const firstError = errors.array({ onlyFirstError: true })[0];

  return res.status(400).json({
    error: true,
    code: "VALIDATION_ERROR",
    message: firstError.msg,
    retryable: false,
  });
}

module.exports = {
  generateApiKeyValidator,
  validateApiKeyRequest,
};
