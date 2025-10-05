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
            msg: "Se realizo una recomendación",
            success: true,
        })
    } catch (error) {
        res.status(500).json({success: false, msg: error, errors: []})
    }
};

export const initPost = async (req, res) => {
    try {
        const {latitude, longitude, email, preferences} = req.body;

        if (email) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const existingPost = await PostModel.findOne({
                email,
                createdAt: {$gte: today}
            });

            if (existingPost) {
                return res.status(200).json({
                    data: existingPost,
                    msg: "Ya existe un post generado hoy",
                    success: true,
                });
            }
        }

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
Eres un asistente ambiental.
Da un dato curioso, sorprendente o interesante sobre la contaminación o el aire,
usando la información actual de calidad del aire y el contexto del usuario.
Evita dar consejos o recomendaciones. Sé breve y atractivo (máximo 2 líneas).

${pollutionText}
${preferencesText}
`;

        const response = await geminiInstance.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [{parts: [{text: prompt}]}],
        });

        const geminiResult =
            response?.text ||
            response?.candidates?.[0]?.content?.parts?.map(p => p.text).join("") ||
            "";

        let newPost = null;
        if (email) {
            newPost = await PostModel.create({
                email,
                content: geminiResult,
                pollution_data: components,
            });
        }

        return res.status(200).json({
            data: newPost || geminiResult,
            msg:"Se inicializo el post",
            success: true,
        });
    } catch (error) {
        console.error("Error en initPost:", error);
        res.status(500).json({success: false, msg: "Error en initPost", errors: [error.message]});
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
