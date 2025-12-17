const axios = require('axios');

const api = axios.create({
  baseURL: 'https://api.football-data.org/v4',
  headers: { 'X-Auth-Token': process.env.FOOTBALL_DATA_KEY }
});

// Obtener partidos de LaLiga en una fecha específica
async function getMatchesByDate(date) {
  const { data } = await api.get(`/competitions/PD/matches`, {
    params: { dateFrom: date, dateTo: date } // 🔑 filtra solo esa fecha
  });
  return data.matches;
}

module.exports = { getMatchesByDate };