const mongoose = require("mongoose");

const WarrantyRecordSchema = new mongoose.Schema(
  {
    serial_number: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    warranty_status: {
      type: String,
      enum: [
        "In Warranty",
        "Out of Warranty",
        "Service Plan Active",
        "Unknown",
      ],
    },
    warranty_expiry_date: {
      type: Date,
    },
    service_plan_type: {
      type: String,
    },
    claim_eligible: {
      type: Boolean,
      default: false,
    },
    purchase_date: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

const WarrantyRecord = mongoose.model("WarrantyRecord", WarrantyRecordSchema);
module.exports = WarrantyRecord;
