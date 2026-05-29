const { sendError } = require("../utils/responseBuilder");
const { ERROR_CODES } = require("../utils/constants");

function adminGuard(req, res, next) {
  const secret = req.headers["x-admin-secret"];

  if (!secret || secret !== process.env.ADMIN_SECRET) {
    return sendError(res, 403, ERROR_CODES.UNAUTHORIZED_ADMIN, 'Invalid or missing admin secret', false);
  }

  next();
}

module.exports = adminGuard;
