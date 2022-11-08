const request = require('request')

const forecast = (longitude, latitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=5a29b4e6d4148ec286d85cb973f27c23&query='
    + latitude
    + ','
    + longitude
    + '&units=f';

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Could not connect to WeatherApp', undefined)
    } else if (response.body.error) {
      callback('Unable to find location', undefined)
    } else {
      const { temperature, feelslike, weather_descriptions, humidity } = response.body.current
      callback(undefined,
        `${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} with a humidity level of ${humidity}.`);
    }
  });
}

module.exports = forecast