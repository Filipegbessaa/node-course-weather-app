const request = require('postman-request')

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZmlsaXBlZ2Jlc3NhIiwiYSI6ImNrbW5ybHpkMDA5amoyd216aHB5NzAyaWwifQ.R7WNWAneidjgG9hMJUAf2g&limit=1`

    request({url, json: true}, (error, { body }) =>{
    if (error){
        callback({error:"Unable to connect to location services"})
    } else if (body.features.length === 0) {
        callback({error:"Unable to find location. Try again!"})
    } else{
        const data = {
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            location: body.features[0].place_name,
        }
        callback({data})
    }
    })
}

module.exports = geoCode

