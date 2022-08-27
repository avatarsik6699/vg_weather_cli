export const config = {
  regex: {
    arg: /^-{1,2}(\w+)$/,
    prefix: /^-+/gi
  },
  constants: {
    EXAMPLE: 'example',
    TOKEN: 'token',
    CITY: 'city',
    STORAGE: 'weather-cli.data.json'
  },
  urls: {
    getCity: 'http://api.openweathermap.org/geo/1.0/direct',
    getWeather: 'https://api.openweathermap.org/data/2.5/weather'
  }
};
