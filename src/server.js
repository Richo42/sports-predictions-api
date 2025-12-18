// Importar dependencias principales
const express = require('express');          // Framework para crear el servidor y manejar rutas
const mongoose = require('mongoose');        // Librería para conectarse y trabajar con MongoDB
require('dotenv').config();                  // Cargar variables de entorno desde el archivo .env

// Importar las rutas de análisis (predicciones deportivas)
const analysisRoutes = require('./routes/analysisRoutes');

// Crear instancia de la aplicación Express
const app = express();

// Definir el puerto del servidor (desde .env o por defecto 5000)
const PORT = process.env.PORT || 5000;

/**
 * Conexión a MongoDB
 * - Usa la URI definida en el archivo .env (MONGO_URI).
 * - Si la conexión es exitosa, muestra un mensaje en consola.
 * - Si falla, muestra el error y detiene la ejecución.
 */
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Conectado a MongoDB'))
    .catch(err => console.error('❌ Error de conexión a MongoDB:', err));

/**
 * Middleware
 * - express.json() permite que el servidor procese datos en formato JSON
 *   enviados en el cuerpo de las solicitudes HTTP.
 */
app.use(express.json());

/**
 * Montar rutas
 * - Todas las rutas definidas en analysisRoutes estarán disponibles bajo el prefijo /api/analyze
 *   Ejemplo: GET /api/analyze/:date
 */
app.use('/api/analyze', analysisRoutes);

/**
 * Iniciar el servidor
 * - Escucha en el puerto definido y muestra un mensaje en consola confirmando que está activo.
 */
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
