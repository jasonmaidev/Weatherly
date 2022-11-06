const request = require('request')

const getGeocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
    + encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1IjoiamF5bWNyZWF0aXZlIiwiYSI6ImNsOXJpbXFubTEyczgzb3JvcDVtejhsOWYifQ.ytTtJcDg0x-xzI_dB86jjA&limit=1'

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Could not connect to Geocoding services.', undefined)
    } else if (response.body.features.length === 0) {
      callback('Please enter a valid address.', undefined)
    } else {
      callback(undefined, {
        longitude: response.body.features[0].center[0],
        latitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name
      })
    }
  })
}

module.exports = getGeocode