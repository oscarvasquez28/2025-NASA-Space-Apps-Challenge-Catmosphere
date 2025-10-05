export const getWeather = async (req, res) => {
    try {
        const errors = {}
        const {
            latitude,
            longitude
        } = req.params;
        const apiKey = process.env.OPEN_WEATHER_KEY

        if (Object.keys(errors) <= 0) {
            const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&units=metric&lang=es&appid=${apiKey}`);
            if (!response.ok) {
                return res.status(400).json({
                    errors: errors,
                    msg: "Ocurrio un error al obtener el clima",
                    success: false
                })

            }

            const data = await response.json();

            const payload = {
                temperature: data?.current?.temp,
                summary: data?.current?.weather[0].description,
            }

            return res.status(200).json({
                data: payload,
                msg: "Se obtuvo la temperatura correctamente",
                success: true,
            })
        }

        return res.status(400).json({errors: errors, msg: "Ocurrio un error al obtener el clima", success: false})
    } catch (error) {
        res.status(500).json({success: false, msg: error, errors: []})
    }
};
