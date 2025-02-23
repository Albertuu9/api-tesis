const mongoose = require('mongoose');

// Definición del esquema de Usuario
const ceramicsSchema = new mongoose.Schema({
  ce_id: { type: Number, unique: true },
  ce_title: { type: String, required: true },
  ce_description: { type: String},
  ce_img_schedule: { type: String},
  ce_location: { type: String},
  ce_creation_date: { type: String, required: true },
  ce_category: { type: String},
  ce_measures: { type: String},
  ce_school: { type: String},
  ce_image: { type: String},
});

// Middleware para asignar ce_id
ceramicsSchema.pre('save', async function (next) {
  if (this.isNew) {  // Solo se ejecuta si el documento es nuevo
    try {
      // Obtener el número total de documentos en la colección
      const count = await mongoose.model('Ceramics').countDocuments();

      // Asignar el valor de ce_id, que será el siguiente número
      this.ce_id = count + 1;  // El primer documento tendrá ce_id = 1

      next();  // Continuar con el proceso de guardado
    } catch (error) {
      return next(error);  // Si hay un error, lo pasamos al siguiente middleware
    }
  } else {
    next();  // Si no es un nuevo documento, no hacemos nada
  }
});

// Crear el modelo de Cerámicas
const Ceramics = mongoose.model('Ceramics', ceramicsSchema);

module.exports = Ceramics;