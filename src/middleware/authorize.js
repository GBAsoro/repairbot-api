const {
  findByKey,
  updateLastUsed,
} = require("../repositories/apiKey.repository");
const { sendError } = require("../utils/responseBuilder");
const { logError } = require("../utils/errorBuilder");
const { ERROR_CODES } = require("../utils/constants");

async function authorize(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return sendError(res, 401, ERROR_CODES.MISSING_API_KEY, "Authorization header is required", false);
  }

  if (!authHeader.startsWith("Bearer ")) {
    return sendError(res, 401, ERROR_CODES.INVALID_AUTH_FORMAT, "Authorization header must use Bearer token format", false);
  }

  const apiKey = authHeader.slice(7).trim();
  const record = await findByKey(apiKey);

  if (!record) {
    return sendError(res, 401, ERROR_CODES.INVALID_API_KEY, "The provided API key is invalid", false);
  }

  if (!record.active) {
    return sendError(res, 403, ERROR_CODES.API_KEY_DISABLED, "This API key has been disabled. Contact your administrator", false);
  }

  try {
    await updateLastUsed(record._id);
  } catch (error) {
    logError(error, "Failed to update API key last_used");
  }

  req.client = {
    name: record.name,
    key: record.key,
  };

  next();
}

module.exports = authorize;
