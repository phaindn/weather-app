import apiClient from ".";

export function findCity(query: string, limit = 10) {
  return apiClient.get<OpenWeather.Location[]>('/geo/1.0/direct', {
    params: {
      q: query,
      limit,
    }
  })
}

export function findCityByCoords(lat: number, lon: number, limit = 10) {
  return apiClient.get<OpenWeather.Location[]>('/geo/1.0/reverse', {
    params: {
      lat,
      lon,
      limit,
    }
  })
}
