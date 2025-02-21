const express = require('express');
const app = express();
const port = 7777;

// Ruta básica
app.get('/', (req, res) => {
  res.send('¡Hola, mundo con Express!');
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});