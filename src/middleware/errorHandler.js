const { sendError } = require("../utils/responseBuilder");
const { logError } = require("../utils/errorBuilder");
const { ERROR_CODES } = require("../utils/constants");

function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const code = err.code || ERROR_CODES.UNHANDLED_ERROR;
  const message = err.message || 'Something went wrong';
  const retryable = err.retryable !== undefined ? err.retryable : (statusCode >= 500);
  const details = err.details;

  logError(err, `${req.method} ${req.path}`);

  sendError(res, statusCode, code, message, retryable, details);
}

module.exports = errorHandler;
