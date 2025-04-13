import apiClient from ".";

type WeatherForecastExclude = 'current' | 'minutely' | 'hourly' | 'daily' | 'alerts';
type WeatherForecaseUnit = 'standard' | 'metric' | 'imperial';


export function getWeatherForecast({ lat, lon }: OpenWeather.GeoPosition, excludes?: WeatherForecastExclude[], units?: WeatherForecaseUnit, lang?: string) {
  return apiClient.get<OpenWeather.OneCall3[]>('/data/3.0/onecall', {
    params: {
      lat,
      lon,
      exclude: excludes?.join(','),
      units,
      lang,
    }
  })
}
