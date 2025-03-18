const mongoose = require('mongoose');

// Definición del esquema de Usuario
const typologiesSchema = new mongoose.Schema({
  ty_id: { type: Number, unique: true },
  ty_name: { type: String }
});

// Crear el modelo de Cerámicas
const Typologies = mongoose.model('Typologies', typologiesSchema);

module.exports = Typologies;