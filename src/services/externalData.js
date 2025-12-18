// Importar librerías necesarias
const axios = require('axios');              // Cliente HTTP para consumir APIs externas
const Prediction = require('../models/Prediction'); // Modelo Prediction (aunque aquí no se usa directamente)

// Crear una instancia de Axios configurada para la API de football-data.org
const api = axios.create({
  baseURL: 'https://api.football-data.org/v4', // URL base de la API
  headers: { 
    'X-Auth-Token': process.env.FOOTBALL_DATA_KEY // Token de autenticación desde variables de entorno
  }
});

/**
 * Obtener partidos de LaLiga en una fecha específica.
 * 
 * @param {String} date - Fecha en formato YYYY-MM-DD
 * @returns {Array} Lista de partidos programados en esa fecha
 * 
 * Flujo:
 * - Llama al endpoint /competitions/PD/matches de la API externa.
 * - Usa parámetros dateFrom y dateTo para filtrar solo los partidos de esa fecha.
 * - Devuelve el arreglo data.matches con los partidos encontrados.
 */
async function getMatchesByDate(date) {
  const { data } = await api.get(`/competitions/PD/matches`, {
    params: { dateFrom: date, dateTo: date } // 🔑 filtra solo esa fecha
  });
  return data.matches;
}

// Exportar la función para usarla en otros módulos (ej. analysisRoutes.js)
module.exports = { getMatchesByDate };
