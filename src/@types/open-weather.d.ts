
namespace OpenWeather {
  type GeoPosition = {
    lat: number;
    lon: number;
  }

  interface Location {
    name: string;
    local_names: Record<string, string>;
    lat: number;
    lon: number;
    country: string;
  }

  interface OneCall3 {
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
    current: Current;
    minutely: Minutely[];
    hourly: Hourly[];
    daily: Daily[];
    alerts: Alert[];
  }

  interface Current {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: Weather[];
  }

  interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
  }

  interface Minutely {
    dt: number;
    precipitation: number;
  }

  interface Hourly {
    dt: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: Weather[];
    pop: number;
  }

  interface Daily {
    dt: number;
    sunrise: number;
    sunset: number;
    moonrise: number;
    moonset: number;
    moon_phase: number;
    summary: string;
    temp: Temp;
    feels_like: FeelsLike;
    pressure: number;
    humidity: number;
    dew_point: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: Weather[];
    clouds: number;
    pop: number;
    rain: number;
    uvi: number;
  }

  interface Temp extends FeelsLike {
    min: number;
    max: number;
  }

  interface FeelsLike {
    day: number;
    night: number;
    eve: number;
    morn: number;
  }

  interface Alert {
    sender_name: string;
    event: string;
    start: number;
    end: number;
    description: string;
    tags: any[];
  }

}
