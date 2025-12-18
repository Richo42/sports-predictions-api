# ⚽ Sports Predictions API

API RESTful para generar y consultar pronósticos deportivos simplificados.
Construida con Node.js, Express y MongoDB, integra datos externos de partidos y guarda las predicciones en una base de datos para consulta posterior.

## 🚀 Características

- Consulta partidos por fecha desde una API externa.
- Genera predicciones simplificadas (ejemplo: Más de 1.5 goles).
- Valida si el partido ya existe en la base de datos antes de guardar la predicción.
  - Si existe, reutiliza el documento almacenado.
  - Si no existe, crea una nueva predicción.

- Guarda las predicciones en MongoDB evitando duplicados.
- Devuelve resultados ordenados cronológicamente.
- Endpoints RESTful listos para integrarse en aplicaciones frontend o móviles.

## 📦 Instalación

### 1. Clonar el repositorio

        git clone https://github.com/tuusuario/sports-predictions-api.git 
        cd sports-predictions-api

### 2. Instalar dependencias

        npm install

### 3. Configurar variables de entorno en .env

        PORT=5000 
        MONGO_URI=mongodb+srv://usuario:clave@cluster.mongodb.net/sports
        API_KEY=tu_api_key_externa

### 4. Iniciar el servidor

        node src/server.js

### 5. Verás en Consola

        🚀 Servidor corriendo en puerto 5000
        ✅ Conectado a MongoDB

## 🔗 Endpoints

### 1. Obtener predicciones por fecha

        GET /api/analyze/:date

- Parámetro: date en formato YYYY-MM-DD

  - Ejemplo:

            GET http://localhost:5000/api/analyze/2025-12-20

  - Respuesta:

            [ 
                { 
                    "match": "Real Madrid CF vs Sevilla FC", 
                    "prediction": "Pronóstico simplificado: Más de 1.5 goles", 
                    "date": "2025-12-20T20:00:00.000Z" 
                } 
            ]

## 📂 Estructura del proyecto

        sports-predictions-api/ 
        ├── src/ 
        │   ├── server.js           # Configuración principal del servidor 
        │   ├── routes/ 
        │   │   └── analysisRoutes.js  # Rutas de análisis y predicciones 
        │   ├── models/ 
        │   │   └── Prediction.js      # Modelo de predicciones en MongoDB 
        │   └── services/ 
        │       └── externalData.js    # Lógica para consumir API externa 
        ├── .env                    # Variables de entorno 
        ├── package.json 
        └── README.md

## 🛠️  Tecnologías

- Node.js + Express → servidor y rutas REST
- MongoDB Atlas → base de datos en la nube
- Mongoose → ODM para definir modelos y esquemas
- dotenv → gestión de variables de entorno

## ✅ Próximos pasos

- Añadir más lógica de predicción (ejemplo: estadísticas avanzadas).
- Implementar autenticación para proteger endpoints.
- Desplegar en servicios como Render, Railway o Heroku.

## 👨‍💻 Autor del Proyecto

### Ricardo Alberto Castillo Pérez

Desarrollador en transición hacia TI
Especializado en Node.js, Express y MongoDB, con experiencia en integración de APIs externas, optimización de flujos de datos y documentación técnica clara.
Este proyecto forma parte de mi portafolio para mostrar competencias prácticas en arquitectura backend y persistencia de datos.
