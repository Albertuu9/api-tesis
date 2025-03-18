const express = require('express');
const Typologies = require('../models/schema');
const router = express.Router();

// Obtener todas las tipologías
router.post('/get', async (req, res) => {
  try {
    const typologies = await Typologies.find();
    res.status(200).json(typologies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener tipologías' });
  }
});

module.exports = router;
