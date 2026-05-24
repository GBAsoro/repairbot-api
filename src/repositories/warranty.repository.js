const WarrantyRecord = require("../models/WarrantyRecord");

async function findBySerialNumber(serialNumber) {
  return WarrantyRecord.findOne({
    serial_number: serialNumber.trim(),
  }).lean();
}

module.exports = {
  findBySerialNumber,
};
