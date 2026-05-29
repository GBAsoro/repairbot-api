const {
  findBySerialNumber,
  findAll,
  findById,
  createWarranty,
  updateById,
  deleteById,
} = require("../repositories/warranty.repository");
const { sendSuccess, sendNotFound } = require("../utils/responseBuilder");
const { formatToDateOnly } = require("../utils/dateFormatter");
const { ERROR_CODES } = require("../utils/constants");

async function checkWarranty(req, res, next) {
  try {
    const { serial_number } = req.query;

    const record = await findBySerialNumber(serial_number);

    if (!record) {
      return sendNotFound(res, ERROR_CODES.WARRANTY_NOT_FOUND);
    }

    const warrantyStatus =
      record.warranty_expiry_date &&
      new Date(record.warranty_expiry_date) < new Date()
        ? "Out of Warranty"
        : record.warranty_status;

    return sendSuccess(res, 200, {
      serial_number: record.serial_number,
      warranty_status: warrantyStatus,
      warranty_expiry_date: formatToDateOnly(record.warranty_expiry_date),
      service_plan_type: record.service_plan_type,
      claim_eligible: record.claim_eligible,
      purchase_date: formatToDateOnly(record.purchase_date),
    });
  } catch (error) {
    next(error);
  }
}

async function listWarranties(req, res, next) {
  try {
    const records = await findAll();

    return sendSuccess(res, 200, {
      keys: records.map((record) => ({
        id: record._id.toString(),
        serial_number: record.serial_number,
        warranty_status: record.warranty_status,
        warranty_expiry_date: formatToDateOnly(record.warranty_expiry_date),
        service_plan_type: record.service_plan_type,
        claim_eligible: record.claim_eligible,
        purchase_date: formatToDateOnly(record.purchase_date),
      })),
    });
  } catch (error) {
    next(error);
  }
}

async function createWarrantyRecord(req, res, next) {
  try {
    const payload = req.body;
    const created = await createWarranty(payload);

    return sendSuccess(res, 201, {
      message: "Warranty record created successfully",
      id: created._id.toString(),
    });
  } catch (error) {
    next(error);
  }
}

async function updateWarrantyRecord(req, res, next) {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updated = await updateById(id, updates);

    if (!updated) {
      return sendNotFound(res, ERROR_CODES.WARRANTY_NOT_FOUND);
    }

    return sendSuccess(res, 200, {
      message: "Warranty record updated successfully",
    });
  } catch (error) {
    next(error);
  }
}

async function deleteWarrantyRecord(req, res, next) {
  try {
    const { id } = req.params;
    const deleted = await deleteById(id);

    if (!deleted) {
      return sendNotFound(res, ERROR_CODES.WARRANTY_NOT_FOUND);
    }

    return sendSuccess(res, 200, {
      message: "Warranty record deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  checkWarranty,
  listWarranties,
  createWarrantyRecord,
  updateWarrantyRecord,
  deleteWarrantyRecord,
};
