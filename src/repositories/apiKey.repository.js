const ApiKey = require("../models/ApiKey");

async function findByKey(key) {
  return ApiKey.findOne({ key: key.trim() }).lean();
}

async function findAll() {
  return ApiKey.find({}).select("name active last_used_at created_at").lean();
}

async function updateLastUsed(id) {
  return ApiKey.findByIdAndUpdate(
    id,
    { last_used_at: new Date() },
    { new: true },
  ).lean();
}

async function disableKey(id) {
  return ApiKey.findByIdAndUpdate(id, { active: false }, { new: true }).lean();
}

async function enableKey(id) {
  return ApiKey.findByIdAndUpdate(id, { active: true }, { new: true }).lean();
}

async function deleteKey(id) {
  return ApiKey.findByIdAndDelete(id).lean();
}

async function createKey(name, key) {
  return ApiKey.create({ name, key });
}

module.exports = {
  findByKey,
  findAll,
  updateLastUsed,
  disableKey,
  enableKey,
  deleteKey,
  createKey,
};
