const mongoose = require('mongoose');

// Cadena de conexión a MongoDB
const mongoURI = 'mongodb+srv://albertuu9:Montady95@app.sghh9.mongodb.net/app?retryWrites=true&w=majority';  // Cambia esto por tu URI de MongoDB

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