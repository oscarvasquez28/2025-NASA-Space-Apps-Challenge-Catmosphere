import geminiInstance from "../config/gemini.js";

export const getLocation = async (req, res) => {
    try {
        const errores = {}

        const response = await geminiInstance.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [{parts: [{text: "De acuerdo a la siguiente información dame un consejo"}]}]
        });

        const geminiResult = response?.text || response?.candidates?.[0]?.content?.parts?.map(p => p.text).join("") || "";

        return res.status(201).json({
            geminiResult,
            msg: "Respuesta generada exitosamente",
            success: true
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, msg: error, errores: []})
    }
};