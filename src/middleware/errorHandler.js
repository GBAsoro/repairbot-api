function errorHandler(err, req, res, next) {
  res.status(500).json({
    error: true,
    code: 'UNHANDLED_ERROR',
    message: 'Something went wrong',
    retryable: true
  });
}

module.exports = errorHandler;
