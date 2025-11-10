import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Render provides the connection string in the DB_HOST environment variable
// based on the render.yaml configuration.
const connectionString = process.env.DB_HOST;

if (!connectionString) {
  // Fallback for local development if DB_HOST (the connection string) isn't available
  // Assumes local setup uses separate variables.
  console.log("DB_HOST connection string not found, attempting to connect with local variables.");
  const dbConfig = {
    host: process.env.DB_HOST_LOCAL,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  };

  if (!dbConfig.name || !dbConfig.user || !dbConfig.password || !dbConfig.host) {
    throw new Error("Database configuration is incomplete. Connection string or individual DB variables must be set.");
  }

  const sequelize = new Sequelize(
    dbConfig.name,
    dbConfig.user,
    dbConfig.password,
    {
      host: dbConfig.host,
      dialect: 'mysql',
      logging: false,
    }
  );
  
  module.exports = { sequelize };

} else {
  console.log("Connecting to the database using the provided connection string.");
  const sequelize = new Sequelize(connectionString, {
    dialect: 'mysql',
    logging: false, // Disable logging in production for cleaner logs
    dialectOptions: {
      // Render's MySQL databases might require SSL. 
      // If you still have connection issues, you might need to enable this.
      // ssl: {
      //   require: true,
      //   rejectUnauthorized: false 
      // }
    }
  });

  module.exports = { sequelize };
}
