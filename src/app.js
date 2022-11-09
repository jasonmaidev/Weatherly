const express = require('express')
const path = require('path')
const hbs = require('hbs')
const getGeocode = require('./utils/geocode')
const forecast = require('./utils/weather')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'JM'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'JM'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    name: 'JM',
    title: 'Help',
    message: 'How can I help?'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please enter a search address.'
    })
  }
  getGeocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error })
    }
    forecast(longitude, latitude, (error, forecastResponse) => {
      if (error) {
        return res.send({ error })
      }
      res.send({
        location: location,
        forecast: forecastResponse,
        address: req.query.address
      })
      console.log(location)
      console.log(forecastResponse)
    })
  })
})

app.get('/help/*', (req, res) => {
  res.status(404).render('404', {
    error: 'Help article not found.',
    name: 'JM',
    title: 'Help/404',
  })
})

app.get('*', (req, res) => {
  res.status(404).render('404', {
    error: 'Page not found.',
    name: 'JM',
    title: '404',
  })
})

app.listen(port, () => {
  console.log('Up and running on Port 3000!')
})

