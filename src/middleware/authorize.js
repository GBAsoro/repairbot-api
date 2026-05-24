const {
  findByKey,
  updateLastUsed,
} = require("../repositories/apiKey.repository");

async function authorize(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: true,
      code: "MISSING_API_KEY",
      message: "Authorization header is required.",
      retryable: false,
    });
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: true,
      code: "INVALID_AUTH_FORMAT",
      message: "Authorization header must use Bearer token format",
      retryable: false,
    });
  }

  const apiKey = authHeader.slice(7).trim();
  const record = await findByKey(apiKey);

  if (!record) {
    return res.status(401).json({
      error: true,
      code: "INVALID_API_KEY",
      message: "The provided API key is invalid",
      retryable: false,
    });
  }

  if (!record.active) {
    return res.status(403).json({
      error: true,
      code: "API_KEY_DISABLED",
      message: "This API key has been disabled. Contact your administrator.",
      retryable: false,
    });
  }

  updateLastUsed(record._id)
    .then(() => {})
    .catch(() => {});

  req.client = {
    name: record.name,
    key: record.key,
  };

  next();
}

module.exports = authorize;
