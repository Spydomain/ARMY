import { Sequelize } from 'sequelize';
import functions from 'firebase-functions';

// Get database configuration from Firebase Functions config
const dbConfig = functions.config().db;

// Create Sequelize instance
const sequelize = new Sequelize(
  dbConfig.name,
  dbConfig.user,
  dbConfig.pass,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: 'mysql',
    timezone: '+00:00',
    logging: (msg) => console.log(`[Sequelize] ${msg}`),

    // Other options
    benchmark: false,
    isolationLevel: 'READ COMMITTED',
    minifyAliases: true,
    dialectOptions: {
      connectTimeout: 60000,
      dateStrings: true,
      typeCast: true,
      decimalNumbers: true
    },
    logQueryParameters: false,
  }
);

// Test the database connection with detailed error handling
const testConnection = async () => {
  console.log('🔍 Testing database connection...');

  try {
    const startTime = Date.now();

    // Test connection
    await sequelize.authenticate();

    const endTime = Date.now();
    console.log(`✅ Database connection established successfully in ${endTime - startTime}ms`);

    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', {
      name: error.name,
      message: error.message,
      code: error.parent?.code,
      address: error.parent?.address,
      port: error.parent?.port,
    });
  }
};

export { sequelize, testConnection };
