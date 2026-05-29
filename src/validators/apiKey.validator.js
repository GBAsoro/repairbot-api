const { body } = require("express-validator");
const { VALIDATION_PATTERNS } = require("../utils/constants");

const generateApiKeyValidator = body("name")
  .exists({ checkFalsy: true })
  .withMessage("name is required")
  .bail()
  .isString()
  .withMessage("name must be a string")
  .bail()
  .isLength(VALIDATION_PATTERNS.API_KEY_NAME)
  .withMessage("name must be between 3 and 50 characters");

module.exports = {
  generateApiKeyValidator,
};
