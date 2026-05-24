const WarrantyRecord = require("../models/WarrantyRecord");

async function findBySerialNumberAndCategory(serialNumber, productCategory) {
  return WarrantyRecord.findOne({
    serial_number: serialNumber.trim(),
    product_category: productCategory,
  }).lean();
}

module.exports = {
  findBySerialNumberAndCategory,
};
