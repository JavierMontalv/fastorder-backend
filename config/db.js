import dotenv from 'dotenv';
dotenv.config(); // 👈 Cargar .env aquí también

import Sequelize from 'sequelize';

console.log('🔍 Sequelize recibió desde db.js:');
console.log('DB_HOST =', process.env.DB_HOST);
console.log('DB_USER =', process.env.DB_USER);
console.log('DB_NAME =', process.env.DB_NAME);
console.log('DB_PORT =', process.env.DB_PORT);

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    dialect: 'mariadb',
    logging: false
  }
);
