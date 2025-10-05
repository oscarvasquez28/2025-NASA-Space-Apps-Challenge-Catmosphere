const apiKey = process.env.OPEN_WEATHER_KEY

export const getWeather = async (req, res) => {
    try {
        const errors = {}
        const {
            latitude,
            longitude
        } = req.params;

        if (Object.keys(errors) <= 0) {
            const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&units=metric&lang=es&appid=${apiKey}`);
            const responsePollution = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&lang=es&appid=${apiKey}`);


            if (!response.ok || !responsePollution.ok) {
                return res.status(400).json({
                    errors: errors,
                    msg: "Ocurrio un error al obtener el clima",
                    success: false
                })

            }

            const data = await response.json();
            const dataPollution = await responsePollution.json();

            const payload = {
                temperature: data?.current?.temp,
                wind_speed: data?.current?.wind_speed,
                uvi_index: data?.current?.uvi,
                humidity: data?.current?.humidity,
                air_quality_index: dataPollution?.list[0]?.main?.aqi,
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

export const getGeneralIndicators = async (req, res) => {
    try {
        const errors = {}
        const {
            latitude,
            longitude
        } = req.params;

        if (Object.keys(errors) <= 0) {
            const responsePollution = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&lang=es&appid=${apiKey}`);


            if (!responsePollution.ok) {
                return res.status(400).json({
                    errors: errors,
                    msg: "Ocurrio un error al obtener los indicadores",
                    success: false
                })

            }

            const dataPollution = await responsePollution.json();

            const payload = {
                co: dataPollution?.list[0].components.co,
                no: dataPollution?.list[0].components.no,
                no2: dataPollution?.list[0].components.no2,
                so2: dataPollution?.list[0].components.so2,
                pm10: dataPollution?.list[0].components.pm10,
                nh3: dataPollution?.list[0].components.nh3,

            }

            return res.status(200).json({
                data: payload,
                msg: "Se obtuvo los indicadores correctamente",
                success: true,
            })
        }

        return res.status(400).json({
            errors: errors,
            msg: "Ocurrio un error al obtener los inidcadores",
            success: false
        })
    } catch (error) {
        res.status(500).json({success: false, msg: error, errors: []})
    }
};