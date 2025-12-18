// Importar la librería Mongoose, que permite interactuar con MongoDB
const mongoose = require('mongoose');

/**
 * Función asincrónica para conectar la aplicación a la base de datos MongoDB.
 * 
 * - Usa la URI definida en las variables de entorno (.env).
 * - Si la conexión es exitosa, muestra un mensaje en consola.
 * - Si ocurre un error, lo captura, lo muestra en consola y detiene la ejecución del servidor.
 */
const connectDB = async () => {
  try {
    // Intentar conectar a MongoDB usando la URI definida en MONGO_URI
    await mongoose.connect(process.env.MONGO_URI);

    // Mensaje de confirmación en consola
    console.log('✅ MongoDB conectado');
  } catch (error) {
    // Mostrar el error en consola si la conexión falla
    console.error('❌ Error de conexión:', error);

    // Finalizar el proceso con código de error (1)
    process.exit(1);
  }
};

// Exportar la función para poder usarla en server.js u otros archivos
module.exports = connectDB;
