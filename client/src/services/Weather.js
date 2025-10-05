import api from '../lib/axios'

export default {
    async getWeather(location){
      const { data } = await api.get(`/weather/${location.lat}/${location.lng}`);
        return data;
    },
    async getIndicators(location){
        const { data } = await api.get(`/weather/indicators/${location.lat}/${location.lng}`);
        return data;
    },
}