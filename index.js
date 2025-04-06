const express = require('express');
const connectDB = require('./modules/config/db');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const bodyParser = require('body-parser');
const ceramicsRoutes = require('./modules/ceramics/routes/routes'); // Rutas CRUD
const cors = require('cors');

// Middleware para parsear datos JSON y URL
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Habilitar CORS para que Angular pueda hacer peticiones
app.use(cors());

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(bodyParser.json()); // Para manejar los cuerpos de las solicitudes en formato JSON

// Rutas
app.use('/ceramics', ceramicsRoutes); // Ruta para las operaciones CRUD

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});