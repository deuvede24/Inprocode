import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE!,
  process.env.USER_NAME!,
  process.env.PASSWORD!,
  {
    host: process.env.HOST_NAME,
    dialect: 'mysql'
  }
);

const syncroModel = async () => {
  try {
    await sequelize.sync({ force: false }).then(() => {
      console.log('Modelos sincronizado con la base de datos');
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await syncroModel();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export { sequelize, testConnection };
