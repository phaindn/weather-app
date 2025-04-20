import axios from "axios";

const apiClient = axios.create({
  baseURL: 'https://api.openweathermap.org',
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
});

apiClient.interceptors.request.use(
  (config) => {
    if (!config.params) {
      config.params = {
        appid: import.meta.env.VITE_OPEN_WEATHER_API_KEY,
      }
    }
    else {
      config.params.appid = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
    }
    return config;
  }
)
export default apiClient;
