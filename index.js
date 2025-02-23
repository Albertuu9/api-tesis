const express = require('express');
const connectDB = require('./modules/config/db');
const app = express();
const port = 7777;
const bodyParser = require('body-parser');
const ceramicsRoutes = require('./modules/ceramics/routes/routes'); // Rutas CRUD

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(bodyParser.json()); // Para manejar los cuerpos de las solicitudes en formato JSON

// Rutas
app.use('/api/ceramics', ceramicsRoutes); // Ruta para las operaciones CRUD


// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});