const {
  findBySerialNumber,
  findAll,
  findById,
  createWarranty,
  updateById,
  deleteById,
} = require("../repositories/warranty.repository");

async function checkWarranty(req, res, next) {
  try {
    const { serial_number } = req.query;

    const record = await findBySerialNumber(serial_number);

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
  listWarranties: async (req, res, next) => {
    try {
      const records = await findAll();

      return res.status(200).json({
        keys: records.map((record) => ({
          id: record._id.toString(),
          serial_number: record.serial_number,
          warranty_status: record.warranty_status,
          warranty_expiry_date: record.warranty_expiry_date
            ? new Date(record.warranty_expiry_date).toISOString().split("T")[0]
            : undefined,
          service_plan_type: record.service_plan_type,
          claim_eligible: record.claim_eligible,
          purchase_date: record.purchase_date
            ? new Date(record.purchase_date).toISOString().split("T")[0]
            : undefined,
        })),
      });
    } catch (error) {
      next(error);
    }
  },
  createWarranty: async (req, res, next) => {
    try {
      const payload = req.body;
      const created = await createWarranty(payload);

      return res.status(201).json({
        message: "Warranty record created successfully",
        id: created._id.toString(),
      });
    } catch (error) {
      next(error);
    }
  },
  updateWarranty: async (req, res, next) => {
    try {
      const { id } = req.params;
      const updates = req.body;

      const updated = await updateById(id, updates);

      if (!updated) {
        return res.status(404).json({
          error: true,
          code: "WARRANTY_NOT_FOUND",
          message: "Warranty record not found",
          retryable: false,
        });
      }

      return res.status(200).json({
        message: "Warranty record updated successfully",
      });
    } catch (error) {
      next(error);
    }
  },
  deleteWarranty: async (req, res, next) => {
    try {
      const { id } = req.params;
      const deleted = await deleteById(id);

      if (!deleted) {
        return res.status(404).json({
          error: true,
          code: "WARRANTY_NOT_FOUND",
          message: "Warranty record not found",
          retryable: false,
        });
      }

      return res
        .status(200)
        .json({ message: "Warranty record deleted successfully" });
    } catch (error) {
      next(error);
    }
  },
};
