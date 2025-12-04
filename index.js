import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { sequelize } from './config/db.js';

dotenv.config();

console.log('------------ VARIABLES .ENV -------------');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASS:', process.env.DB_PASS ? '(oculta)' : 'NO LEÍDA');
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('----------------------------------------');

// 🔥 Conexión a AWS RDS
const conectarDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('🟢 Conexión a RDS (MariaDB) exitosa');
  } catch (error) {
    console.error('🔴 Error conectando a RDS:', error);
    process.exit(1);
  }
};

conectarDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());

// Ruta de prueba
app.get('/api/status', (req, res) => {
  res.json({ ok: true, mensaje: 'Servidor FastOrder funcionando 🚀' });
});

// Servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor FastOrder corriendo en puerto ${PORT}`);
});
