// Importar Mongoose
const mongoose = require('mongoose');
/**
 * Definición del esquema de predicciones.
 * 
 * Campos:
 * - match: Nombre del partido (ejemplo: "Real Madrid vs Barcelona").
 * - expectedGoals: Número esperado de goles (puede usarse para cálculos más avanzados).
 * - prediction: Texto con el pronóstico simplificado (ejemplo: "Más de 1.5 goles").
 * - confidence: Nivel de confianza en la predicción (ejemplo: porcentaje o valor numérico).
 * - date: Fecha y hora del partido en formato Date.
 * 
 * Opciones:
 * - collection: 'predictions' → nombre fijo de la colección en MongoDB.
 */
const PredictionSchema = new mongoose.Schema({
    match: String,
    expectedGoals: Number,
    prediction: String,
    confidence: Number,
    date: Date
}, {
    collection: 'predictions' // 👈 nombre fijo de la colección
});

/**
 * Exportar el modelo Prediction.
 * 
 * - El primer argumento 'Prediction' es el nombre del modelo.
 * - El segundo argumento es el esquema definido arriba.
 * - Mongoose usará este modelo para interactuar con la colección 'predictions'.
 */
module.exports = mongoose.model('Prediction', PredictionSchema);
