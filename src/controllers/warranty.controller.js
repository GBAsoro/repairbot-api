const {
  findBySerialNumberAndCategory,
} = require("../repositories/warranty.repository");

async function checkWarranty(req, res, next) {
  try {
    const { serial_number, product_category } = req.query;

    const record = await findBySerialNumberAndCategory(
      serial_number,
      product_category,
    );

    if (!record) {
      return res.status(404).json({
        error: true,
        code: "WARRANTY_NOT_FOUND",
        message: `No warranty record found for serial number: ${serial_number}`,
        retryable: false,
      });
    }

    const warrantyStatus =
      record.warranty_expiry_date &&
      new Date(record.warranty_expiry_date) < new Date()
        ? "Out of Warranty"
        : record.warranty_status;

    return res.status(200).json({
      serial_number: record.serial_number,
      product_category: record.product_category,
      warranty_status: warrantyStatus,
      warranty_expiry_date: record.warranty_expiry_date
        ? new Date(record.warranty_expiry_date).toISOString().split("T")[0]
        : undefined,
      service_plan_type: record.service_plan_type,
      claim_eligible: record.claim_eligible,
      purchase_date: record.purchase_date
        ? new Date(record.purchase_date).toISOString().split("T")[0]
        : undefined,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  checkWarranty,
};
