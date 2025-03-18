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
    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file.buffer); // Subir imagen a Cloudinary
    }

    // Agregar la URL de la imagen a los datos del cuerpo
    req.body.ce_img_schedule = imageUrl;

    const newCeramic = new Ceramics(req.body);
    const savedCeramic = await newCeramic.save();
    res.status(201).json(savedCeramic);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Error al crear cerámica' });
  }
});

// Obtener todas las cerámicas
router.post('/get', async (req, res) => {
  try {
    const ceramics = await Ceramics.find();
    res.status(200).json(ceramics);
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
    res.status(200).json(ceramic);
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
