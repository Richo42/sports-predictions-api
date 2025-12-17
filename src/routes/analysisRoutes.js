const express = require('express');
const router = express.Router();
const { getMatchesByDate } = require('../services/externalData');

router.get('/:date', async (req, res) => {
  try {
    const { date } = req.params;
    const matches = await getMatchesByDate(date);

    if (!matches || matches.length === 0) {
      return res.json({ mensaje: `No hay partidos programados para la fecha ${date}` });
    }

    const predictions = matches.map(match => ({
      match: `${match.homeTeam.name} vs ${match.awayTeam.name}`,
      prediction: "Pronóstico simplificado: Más de 1.5 goles"
    }));

    res.json(predictions);
  } catch (error) {
    console.error('Error en análisis:', error.response?.data || error.message);
    res.status(500).json({ error: 'Error al generar pronósticos', detalle: error.message });
  }
});

module.exports = router;