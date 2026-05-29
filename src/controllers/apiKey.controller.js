const crypto = require("crypto");
const apiKeyRepository = require("../repositories/apiKey.repository");
const { sendSuccess, sendNotFound } = require("../utils/responseBuilder");
const { ERROR_CODES } = require("../utils/constants");

const generateKey = () => `rb_${crypto.randomBytes(32).toString("hex")}`;

async function generateKeyController(req, res, next) {
  try {
    const { name } = req.body;
    const key = generateKey();
    const apiKey = await apiKeyRepository.createKey(name, key);

    return sendSuccess(res, 201, {
      message: "API key generated successfully",
      name: apiKey.name,
      key: apiKey.key,
      active: apiKey.active,
      created_at: apiKey.created_at,
    });
  } catch (error) {
    next(error);
  }
}

async function listKeys(req, res, next) {
  try {
    const keys = await apiKeyRepository.findAll();

    return sendSuccess(res, 200, {
      keys: keys.map((item) => ({
        id: item._id.toString(),
        name: item.name,
        active: item.active,
        last_used_at: item.last_used_at,
        created_at: item.created_at,
      })),
    });
  } catch (error) {
    next(error);
  }
}

async function disableKey(req, res, next) {
  try {
    const { id } = req.params;
    const key = await apiKeyRepository.disableKey(id);

    if (!key) {
      return sendNotFound(res, ERROR_CODES.API_KEY_NOT_FOUND);
    }

    return sendSuccess(res, 200, {
      message: "API key disabled successfully",
    });
  } catch (error) {
    next(error);
  }
}

async function enableKey(req, res, next) {
  try {
    const { id } = req.params;
    const key = await apiKeyRepository.enableKey(id);

    if (!key) {
      return sendNotFound(res, ERROR_CODES.API_KEY_NOT_FOUND);
    }

    return sendSuccess(res, 200, {
      message: "API key enabled successfully",
    });
  } catch (error) {
    next(error);
  }
}

async function deleteKey(req, res, next) {
  try {
    const { id } = req.params;
    const key = await apiKeyRepository.deleteKey(id);

    if (!key) {
      return sendNotFound(res, ERROR_CODES.API_KEY_NOT_FOUND);
    }

    return sendSuccess(res, 200, {
      message: "API key deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  generateKeyController,
  listKeys,
  disableKey,
  enableKey,
  deleteKey,
};
