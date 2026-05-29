function createError(statusCode, code, message, retryable = false, details) {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.code = code;
  error.retryable = retryable;
  if (details) {
    error.details = details;
  }
  return error;
}

function logError(err, context = '') {
  const timestamp = new Date().toISOString();
  const contextStr = context ? ` [${context}]` : '';
  const message = err.message || 'Unknown error';
  const code = err.code || 'UNKNOWN';
  console.error(`${timestamp} ERROR${contextStr}: ${code} - ${message}`, err.stack);
}

module.exports = {
  createError,
  logError,
};
