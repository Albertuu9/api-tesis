const multer = require('multer');

const storage = multer.memoryStorage(); // Almacena en memoria, no en disco
const upload = multer({ storage });

module.exports = upload;
