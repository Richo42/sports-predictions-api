// Importar dependencias principales
const express = require('express');
const router = express.Router();

// Importar servicio externo para obtener partidos por fecha
const { getMatchesByDate } = require('../services/externalData');

// Importar el modelo Prediction (colección 'predictions' en MongoDB)
const Prediction = require('../models/Prediction');

/**
 * Endpoint GET /:date
 * 
 * Funcionalidad:
 * - Recibe una fecha como parámetro en la URL.
 * - Consulta partidos programados en esa fecha usando el servicio externo.
 * - Genera predicciones simplificadas para cada partido.
 * - Guarda las predicciones en MongoDB (evitando duplicados).
 * - Devuelve las predicciones ordenadas cronológicamente y con campos limpios.
 */
router.get('/:date', async (req, res) => {
  try {
    // Extraer la fecha desde los parámetros de la URL
    const { date } = req.params;

    // Obtener partidos desde la API externa
    const matches = await getMatchesByDate(date);

    // Si no hay partidos, devolver mensaje informativo
    if (!matches || matches.length === 0) {
      return res.json({ mensaje: `No hay partidos programados para la fecha ${date}` });
    }

    // Array para almacenar predicciones
    const predictions = [];

    // Recorrer cada partido y generar predicción
    for (const match of matches) {
      // Buscar si ya existe una predicción para ese partido y fecha
      const existing = await Prediction.findOne({
        match: `${match.homeTeam.name} vs ${match.awayTeam.name}`,
        date: new Date(match.utcDate)
      });

      if (!existing) {
        // Crear nueva predicción si no existe
        const predictionDoc = new Prediction({
          match: `${match.homeTeam.name} vs ${match.awayTeam.name}`,
          prediction: "Pronóstico simplificado: Más de 1.5 goles",
          date: new Date(match.utcDate)
        });

        // Guardar en MongoDB
        await predictionDoc.save();
        console.log("✅ Guardado en MongoDB:", predictionDoc);

        predictions.push(predictionDoc);
      } else {
        // Si ya existe, reutilizar el documento
        console.log("ℹ️ Ya existía:", existing);
        predictions.push(existing);
      }
    }

    // 👉 Ordenar las predicciones por fecha y limpiar campos antes de enviar
    const cleanSorted = predictions
      .sort((a, b) => new Date(a.date) - new Date(b.date)) // orden ascendente
      .map(p => ({
        match: p.match,
        prediction: p.prediction,
        date: p.date
      }));

    // Responder al cliente con JSON ordenado y limpio
    res.json(cleanSorted);

  } catch (error) {
    // Manejo de errores: log en consola y respuesta HTTP 500
    console.error('Error en análisis:', error.response?.data || error.message);
    res.status(500).json({ error: 'Error al generar pronósticos', detalle: error.message });
  }
});

// Exportar el router para usarlo en server.js
module.exports = router;
