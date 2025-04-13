import apiClient from ".";

export function findCity(query: string) {
  return apiClient.get<OpenWeather.Location[]>('/geo/1.0/direct', {
    params: {
      q: query,
      limit: 5,
    }
  })
}
