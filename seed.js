require("dotenv").config();
const { connectMongo } = require("./src/config/db");
const WarrantyRecord = require("./src/models/WarrantyRecord");
const ApiKey = require("./src/models/ApiKey");

async function seed() {
  await connectMongo();

  const records = [
    {
      serial_number: "SM100-ABC-001",
      warranty_status: "In Warranty",
      warranty_expiry_date: new Date("2027-01-01"),
      claim_eligible: true,
      purchase_date: new Date("2024-01-01"),
    },
    {
      serial_number: "SM100-XYZ-002",
      warranty_status: "In Warranty",
      warranty_expiry_date: new Date("2025-09-30"),
      claim_eligible: true,
      purchase_date: new Date("2023-10-10"),
    },
    {
      serial_number: "SM100-DEF-003",
      warranty_status: "Service Plan Active",
      service_plan_type: "Premium Cover",
      warranty_expiry_date: new Date("2028-06-01"),
      claim_eligible: true,
      purchase_date: new Date("2025-02-01"),
    },
    {
      serial_number: "SM100-GHI-004",
      warranty_status: "Out of Warranty",
      warranty_expiry_date: new Date("2024-05-20"),
      claim_eligible: false,
      purchase_date: new Date("2021-05-20"),
    },
    {
      serial_number: "SM100-JKL-005",
      warranty_status: "In Warranty",
      warranty_expiry_date: new Date("2026-12-12"),
      claim_eligible: true,
      purchase_date: new Date("2024-12-12"),
    },
    {
      serial_number: "SM100-MNO-006",
      warranty_status: "Out of Warranty",
      warranty_expiry_date: new Date("2024-02-14"),
      claim_eligible: false,
      purchase_date: new Date("2022-02-14"),
    },
    {
      serial_number: "SM100-PQR-007",
      warranty_status: "Service Plan Active",
      service_plan_type: "Standard Cover",
      warranty_expiry_date: new Date("2029-03-15"),
      claim_eligible: true,
      purchase_date: new Date("2026-03-15"),
    },
    {
      serial_number: "SM100-STU-008",
      warranty_status: "In Warranty",
      warranty_expiry_date: new Date("2025-11-05"),
      claim_eligible: true,
      purchase_date: new Date("2023-11-05"),
    },
    {
      serial_number: "SM100-VWX-009",
      warranty_status: "Unknown",
      warranty_expiry_date: new Date("2023-07-01"),
      claim_eligible: false,
      purchase_date: new Date("2021-07-01"),
    },
    {
      serial_number: "SM100-YZA-010",
      warranty_status: "In Warranty",
      warranty_expiry_date: new Date("2026-04-20"),
      claim_eligible: true,
      purchase_date: new Date("2024-04-20"),
    },
  ];

  try {
    await WarrantyRecord.deleteMany({});
    await WarrantyRecord.insertMany(records);

    const apiKeys = [
      {
        name: "RepairBot Dev Key",
        key: "rb_2d8f4b6e1c9a305d7f2b8e4c1a906d3f",
        active: true,
      },
    ];

    await ApiKey.deleteMany({});
    await ApiKey.insertMany(apiKeys);

    console.log("Seed data inserted successfully");
    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error.message);
    process.exit(1);
  }
}

seed();
