const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars views and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Filipe Bessa",
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About page",
        name: "Filipe Bessa",
    })
})
app.get('/weather', (req,res) => {
    if (!req.query.address){
        return res.send({
            error: "You must provide an address",
        })
    }
    geoCode(req.query.address, ({ error, data: { latitude, longitude, location } = {} }) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
            })
        })
    })
    // res.send({
    //     location: "Recife",
    //     weather: "Cloudy",
    //     name: "Filipe Bessa",
    //     address: req.query.address,
    // })
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({error: "You must provide a search term."})
    }
    console.log(req.query)
    res.send({
        products: [],
    })
})

app.get('/about/*', (req, res) => {
    res.render('404', {
        errorMessage: "About article not found.",
        name: "Filipe Bessa",
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: "Page not found.",
        name: "Filipe Bessa",
    })
})
// app.com
// app.com/help
// app.com/about

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})