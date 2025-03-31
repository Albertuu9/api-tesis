const express = require('express');
const Ceramics = require('../models/schema'); // Modelo Ceramics
const router = express.Router();
const upload = require('../../config/multer-config');
const { uploadToCloudinary } = require('../../config/cloudinary');

// Crear una nueva cerámica
router.post('/save', upload.single('image'), async (req, res) => {
  try {
    let imageUrl = null;

    // Verificar si se ha enviado un archivo
    if (req.file && !req.ce_img_schedule) {
      imageUrl = await uploadToCloudinary(req.file.buffer); // Subir imagen a Cloudinary
      // Agregar la URL de la imagen a los datos del cuerpo
      req.body.ce_img_schedule = imageUrl;
    }

    if (req.body.ce_iconographic_elements) {
      const arrayData = req.body.ce_iconographic_elements.split(',');
      req.body.ce_iconographic_elements = arrayData;
    }

    if (req.body.ce_musical_instruments) {
      const arrayData = req.body.ce_musical_instruments.split(',');
      req.body.ce_musical_instruments = arrayData;
    }

    if (req.body.ce_measures) {
      req.body.ce_measures = JSON.parse(req.body.ce_measures);
    }

    if(req.body && req.body.ce_id && req.body.ce_id > 0) {
      // Si existe ce_id, actualizar la cerámica
      const updatedCeramic = await Ceramics.findOneAndUpdate(
        { ce_id: req.body.ce_id },  // Condición de búsqueda
        req.body,                   // Datos nuevos
        { new: true, runValidators: true } // Retorna el objeto actualizado y valida datos
      );
      if (!updatedCeramic) {
        return res.status(404).json({ message: 'Cerámica no encontrada', code: 404 });
      }
      res.status(201).json({
        message: 'Ceramic updated successfull'
      });
    } else {
      const newCeramic = new Ceramics(req.body);
      await newCeramic.save();
      res.status(201).json({
        message: 'Ceramic saved successfull'
      });
    }
    
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Error al crear cerámica' });
  }
});

// Obtener todas las cerámicas
router.post('/get', async (req, res) => {
  try {
    const ceramics = await Ceramics.aggregate([
      {
        $lookup: {
          from: 'typologies',  // Nombre de la colección en MongoDB
          localField: 'ce_typology', // Campo en Ceramics que almacena el ID de la tipología
          foreignField: 'ty_id', // Campo en Typologies que contiene el ID real
          as: 'typology' // Nombre del campo donde se guardará la relación
        }
      },
      {
        $unwind: {
          path: '$typology',
          preserveNullAndEmptyArrays: true // Evita errores si no hay coincidencia
        }
      }
    ]);
    res.status(200).json({data: ceramics, message: 'Cerámicas obtenidas correctamente', code: 200});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener cerámicas' });
  }
});

// Obtener cerámica por ID
router.post('/get/:id', async (req, res) => {
  try {
    const ceramic = await Ceramics.findById(req.params.id);
    if (!ceramic) {
      return res.status(404).json({ error: 'Cerámica no encontrada' });
    }
    res.status(200).json({data: ceramic, message: 'Cerámicas obtenidas correctamente', code: 200});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener la cerámica' });
  }
});

// Actualizar cerámica por ID
router.post('/update/:id', async (req, res) => {
  try {
    const updatedCeramic = await Ceramics.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Devolver el documento actualizado
    );
    if (!updatedCeramic) {
      return res.status(404).json({ error: 'Cerámica no encontrada' });
    }
    res.status(200).json(updatedCeramic);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Error al actualizar cerámica' });
  }
});

// Eliminar cerámica por ID
router.post('/delete/:id', async (req, res) => {
  try {
    const deletedCeramic = await Ceramics.findByIdAndDelete(req.params.id);
    if (!deletedCeramic) {
      return res.status(404).json({ error: 'Cerámica no encontrada' });
    }
    res.status(200).json({ message: 'Cerámica eliminada' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar cerámica' });
  }
});

module.exports = router;
