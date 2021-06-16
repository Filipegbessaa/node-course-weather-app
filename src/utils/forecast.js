const request = require('postman-request');

const forecast = (latitude, longitude, callback ) => {
    const url = `http://api.weatherstack.com/current?access_key=56e7c3188498caa253228702cbd6babe&query=${latitude},${longitude}`

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback(`Can't access weather api.`)
        } else if (body.error) {
            callback('Unable to find location.')
        } else {
            const temperature = body.current.temperature
            const feelsLike = body.current.feelslike
            callback(undefined, `${body.current.weather_descriptions[0]}. It's current ${temperature} degrees out. It feels like ${feelsLike} degrees out.`)
        }
    })
}

module.exports = forecast
