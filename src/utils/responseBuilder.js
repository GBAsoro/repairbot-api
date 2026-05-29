const { ERROR_MESSAGES } = require('./constants');

function sendSuccess(res, statusCode, data) {
  res.status(statusCode).json(data);
}

function sendError(res, statusCode, code, message, retryable = false, details) {
  const response = {
    error: true,
    code,
    message,
    retryable,
  };
  if (details) {
    response.details = details;
  }
  res.status(statusCode).json(response);
}

function sendNotFound(res, code, customMessage) {
  const message = customMessage || ERROR_MESSAGES[code] || 'Not found';
  sendError(res, 404, code, message, false);
}

function sendValidationError(res, errors) {
  const details = errors.array().map(err => ({
    field: err.path || err.param,
    message: err.msg,
  }));
  sendError(res, 400, 'VALIDATION_ERROR', 'Validation failed', false, details);
}

module.exports = {
  sendSuccess,
  sendError,
  sendNotFound,
  sendValidationError,
};
