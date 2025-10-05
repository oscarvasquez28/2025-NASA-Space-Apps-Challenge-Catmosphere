import api from '../lib/axios';

export default {
    async getGeminiRecommendation( {userPreferences}){
        try {
      const coords = JSON.parse(sessionStorage.getItem('userLocation')) ?? { lat: 19.4326, lng: -99.1332 }; // Fallback a CDMX

            const { data } = await api.post(`/posts/recommendation/`,{
                latitude: coords.lat,
                longitude: coords.lng,
                preferences: userPreferences
            });
            console.log(data);
            return data;
        } catch (error) {
            console.error("Error fetching Gemini recommendation:", error);
            throw error;
        }
    }
};
