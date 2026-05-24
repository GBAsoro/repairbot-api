require('dotenv').config();
const { connectMongo } = require('./src/config/db');
const WarrantyRecord = require('./src/models/WarrantyRecord');

async function seed() {
  await connectMongo();

  const records = [
    {
      serial_number: 'SM100-ABC-001',
      product_category: 'it_hardware',
      warranty_status: 'In Warranty',
      warranty_expiry_date: new Date('2027-01-01'),
      claim_eligible: true,
      purchase_date: new Date('2024-01-01')
    },
    {
      serial_number: 'SM100-XYZ-002',
      product_category: 'home_appliance',
      warranty_status: 'In Warranty',
      warranty_expiry_date: new Date('2023-01-01'),
      claim_eligible: false,
      purchase_date: new Date('2022-05-15')
    },
    {
      serial_number: 'SM100-DEF-003',
      product_category: 'auto_body',
      warranty_status: 'Service Plan Active',
      service_plan_type: 'Premium Cover',
      warranty_expiry_date: new Date('2028-06-01'),
      claim_eligible: true,
      purchase_date: new Date('2025-02-01')
    }
  ];

  try {
    await WarrantyRecord.deleteMany({});
    await WarrantyRecord.insertMany(records);
    console.log('Seed data inserted successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    process.exit(1);
  }
}

seed();
