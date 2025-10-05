### 🛰️ Project Overview

TempoCast is a web application developed for the **NASA Space Apps Challenge 2025**. It allows users to consult, visualize, and share real-time information about air quality and weather, integrating sensor data, open APIs, and smart forecasts.

The goal is to **empower citizens** with clear, visual information about atmospheric pollutants, risks, and daily recommendations, helping people make better decisions for their health and environment.

---

### ⚙️ Technologies Used

#### Frontend
- **React.js** (Vite)
- **Material UI** (MUI)
- **React Leaflet** (interactive maps)
- **Axios** (HTTP requests)
- **Motion** (animations)
- **MUI X Charts** (forecast charts)

#### Backend
- **Node.js / Express** (REST API)
- **OpenWeather API** (weather and air quality)
- **Gemini API** (daily recommendations)
- **Sequelize** (ORM, if used)
- **PostgreSQL** (if used)

---

### 🚀 Main Features

- **Interactive map:** Check air quality and weather at any point in the region.
- **General indicators:** View main pollutants (CO, NO, NO₂, SO₂, PM10, NH₃) with explanations and color-coded risk levels.
- **Daily forecast:** Trend chart for air quality over the next days.
- **Daily recommendation:** Personalized message for the user based on environmental conditions.
- **Explanatory modal:** Clear, simple information about each pollutant and its health impact.
- **Responsive design:** Interface adapts to mobile and desktop devices.
- **Geographic fallback:** If location is unavailable, shows data for Guadalupe, NL.
