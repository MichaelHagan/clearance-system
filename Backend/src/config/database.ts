import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

// Connect to the database
export const sequelize = new Sequelize(process.env.DATABASE_NAME!, process.env.DATABASE_USER!, process.env.DATABASE_PASSWORD!, {
  host: process.env.DATABASE_HOST,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
