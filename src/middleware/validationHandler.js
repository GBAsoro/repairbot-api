const { validationResult } = require("express-validator");
const { sendValidationError } = require("../utils/responseBuilder");

function validationHandler(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  sendValidationError(res, errors);
}

module.exports = validationHandler;
