import api from '../lib/axios';

export default {
    async getGeminiRecommendation({location, userPreferences}){ {
        const { data } = await api.post(`/post/recommendation/`,{
            latitude: location.lat,
            longitude: location.lng,
            preferences: userPreferences
        });
        return data;
    }
}
}
