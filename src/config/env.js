function validateEnv() {
  const required = ['MONGODB_URI', 'ADMIN_SECRET'];
  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    console.error(`❌ Missing required environment variables: ${missing.join(', ')}`);
    process.exit(1);
  }

  return {
    PORT: parseInt(process.env.PORT || '3000', 10),
    MONGODB_URI: process.env.MONGODB_URI,
    ADMIN_SECRET: process.env.ADMIN_SECRET,
    CORS_ORIGIN: process.env.CORS_ORIGIN || 'https://repair-bot-frontend-1.onrender.com',
    NODE_ENV: process.env.NODE_ENV || 'development',
  };
}

module.exports = {
  validateEnv,
};
