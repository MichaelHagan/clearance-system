import dotenv from 'dotenv';
import pgtools from 'pgtools';
import User from '@src/models/user';
import Role  from '@src/models/role';
import { roleSeeder } from '@src/seeders/roleSeeder';
import { userSeeder } from '@src/seeders/userSeeder';
import { departmentSeeder } from '@src/seeders/departmentSeeder';
import Department from '@src/models/department';

dotenv.config();

const dbName = process.env.DATABASE_NAME as string;
const dbConfig = {
  user: process.env.DATABASE_USER as string,
  password: process.env.DATABASE_PASSWORD as string,
  port: 5432,
  host: '127.0.0.1'
};

const initializeDatabase = async (): Promise<void> => {
  try {
    // Create database if not present
    await pgtools.createdb(dbConfig, dbName);
    console.log(`Database ${dbName} created`);
  } catch (error: any) {
    if (error.message === "Attempted to create a duplicate database.") {
      console.log("Database Already Exists");
    } else {
      console.error('An error occurred:', error);
      throw error;
    }
  }
};

const runSeeders = async (): Promise<void> =>{
    //Check user table, if empty, run seeders
  try {
    let countResponse = await User.count();
    if(countResponse === 0){
    // Run seeders sequentially
    await roleSeeder.up(null, Role.sequelize);
    await userSeeder.up(null, User.sequelize);
    await departmentSeeder.up(null,Department.sequelize);
    console.log('Seeders completed successfully');
    }
  } catch (error) {
    console.error('Error running seeders:', error);
  }

}

export { initializeDatabase, runSeeders };