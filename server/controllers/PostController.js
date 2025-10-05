import PostModel from "../models/PostModel.js";
import geminiInstance from "../config/gemini.js";

const apiKey = process.env.OPEN_WEATHER_KEY

export const initRecommendation = async (req, res) => {
    try {
        const {latitude, longitude, preferences} = req.body;

        const responsePollution = await fetch(
            `http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&lang=es&appid=${apiKey}`
        );

        const dataPollution = await responsePollution.json();

        const components = dataPollution?.list?.[0]?.components || {};
        const pollutionText = `
    Niveles actuales de contaminación del aire:
    - PM2.5: ${components.pm2_5 || "N/A"}
    - PM10: ${components.pm10 || "N/A"}
    - Ozono (O3): ${components.o3 || "N/A"}
    - Dióxido de nitrógeno (NO2): ${components.no2 || "N/A"}
    - Monóxido de carbono (CO): ${components.co || "N/A"}
    `;
        const preferenceDescriptions = [];

        if (preferences?.has_asthma) preferenceDescriptions.push("El usuario tiene asma.");
        if (preferences?.has_allergies) preferenceDescriptions.push("El usuario sufre de alergias.");
        if (preferences?.has_cardiovascular_conditions)
            preferenceDescriptions.push("El usuario tiene condiciones cardiovasculares.");
        if (preferences?.is_pregnant) preferenceDescriptions.push("El usuario está embarazada.");
        if (preferences?.is_athlete) preferenceDescriptions.push("El usuario es deportista.");
        if (preferences?.has_kids_at_home) preferenceDescriptions.push("Hay niños en casa.");
        if (preferences?.has_seniors_at_home) preferenceDescriptions.push("Hay personas mayores en casa.");
        if (preferences?.spends_time_outdoors)
            preferenceDescriptions.push("El usuario pasa mucho tiempo al aire libre.");

        const preferencesText =
            preferenceDescriptions.length > 0
                ? `Preferencias y condiciones del usuario:\n${preferenceDescriptions.join("\n")}`
                : "";

        const prompt = `
    res un asistente ambiental.
    Da una recomendación personalizada para hoy considerando la calidad del aire y las características del usuario.
    Sé breve, empático y específico sobre qué debería o no hacer hoy.
    Resume tu respuesta en máximo 2 líneas.

    ${pollutionText}
    ${preferencesText}
    `;


        const response = await geminiInstance.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [{parts: [{text: prompt}]}]
        });

        const geminiResult = response?.text || response?.candidates?.[0]?.content?.parts?.map(p => p.text).join("") || "";


        return res.status(200).json({
            data: geminiResult,
            msg: "Se creó el post",
            success: true,
        })
    } catch (error) {
        res.status(500).json({success: false, msg: error, errors: []})
    }
};

export const getPosts = async (req, res) => {
    try {

        const posts = await PostModel.findAll();
        return res.status(200).json({
            data: posts,
            msg: "Se obtuvieron los posts",
            success: true,
        })
    } catch (error) {
        res.status(500).json({success: false, msg: error, errors: []})
    }
};
