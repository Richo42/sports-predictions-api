⚽ Football Analyzer

Un sistema web en Node.js + Express + MongoDB que genera pronósticos simplificados de partidos de fútbol usando la API de football-data.org.

🚀 Instalación

Clona el repositorio:

git clone https://github.com/tuusuario/football-analyzer.git
cd football-analyzer

Instala dependencias:

npm install

Configura tu archivo .env:

FOOTBALL_DATA_KEY=tu_api_key
MONGO_URI=tu_conexion_mongo
PORT=5000

Inicia el servidor:

npm start

📌 Endpoints principales

GET /api/analyze/:date

Genera pronósticos para los partidos de LaLiga en la fecha indicada.

Ejemplo:

http://localhost:5000/api/analyze/2025-12-19

Respuesta:

[
  {
    "match": "Real Madrid vs Sevilla",
    "expectedGoals": 2.8,
    "prediction": "Más de 2.5 goles",
    "confidence": 0.7
  }
]

🛠 Tecnologías usadas

Node.js + Express → servidor web.

MongoDB → almacenamiento y caché.

Axios → consumo de la API externa.

football-data.org → fuente de datos de fútbol.

📊 Lógica de pronóstico

Se obtienen los partidos de la fecha desde /competitions/PD/matches.

Se consultan las estadísticas de la tabla (/competitions/PD/standings).

Se calculan promedios de goles a favor de cada equipo.

Se genera un pronóstico simple:

Si la suma de promedios > 1.5 → “Más de 1.5 goles”.

Si no → “Menos de 1.5 goles”.

📌 Notas importantes

El plan Free de football-data.org tiene límites de peticiones muy bajos.

Para pruebas, se recomienda usar pocas fechas y cachear resultados en MongoDB.

Para un modelo más avanzado (últimos partidos, estadísticas detalladas), se requiere un plan superior.
