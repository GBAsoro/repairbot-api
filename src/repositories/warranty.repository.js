const WarrantyRecord = require("../models/WarrantyRecord");

async function findBySerialNumber(serialNumber) {
  return WarrantyRecord.findOne({
    serial_number: serialNumber.trim(),
  }).lean();
}

async function findAll(filter = {}) {
  return WarrantyRecord.find(filter).lean();
}

async function findById(id) {
  return WarrantyRecord.findById(id).lean();
}

async function createWarranty(payload) {
  return WarrantyRecord.create(payload);
}

async function updateById(id, updates) {
  return WarrantyRecord.findByIdAndUpdate(id, updates, { new: true }).lean();
}

async function deleteById(id) {
  return WarrantyRecord.findByIdAndDelete(id).lean();
}

module.exports = {
  findBySerialNumber,
  findAll,
  findById,
  createWarranty,
  updateById,
  deleteById,
};
