const mongoose = require('mongoose');
require('dotenv').config();

// Cadena de conexión a MongoDB
const mongoURI = process.env.MONGO_URI;  // Cambia esto por tu URI de MongoDB

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Conectado a MongoDB');
  } catch (err) {
    console.error('Error de conexión a MongoDB', err);
    process.exit(1); // Detener la aplicación si no se puede conectar
  }
};

module.exports = connectDB;