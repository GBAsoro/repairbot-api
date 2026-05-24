const mongoose = require('mongoose');
const { MONGODB_URI } = process.env;

function connectMongo() {
  if (!MONGODB_URI) {
    console.error('MONGODB_URI is required');
    process.exit(1);
  }

  return mongoose
    .connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log('MongoDB connected');
    })
    .catch((error) => {
      console.error('MongoDB connection error:', error.message);
      process.exit(1);
    });
}

module.exports = {
  connectMongo
};
