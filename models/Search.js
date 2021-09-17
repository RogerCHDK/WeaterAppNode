const axios = require('axios');
class Search{

    history = ['Mexico', 'Durango','Toluca']
    latitud;
    longitud;
    constructor(){
        // Read if exist some records in the database
    }

    set latitud ( latitud ){
        this.latitud = latitud;
    }
    set longitud ( longitud ){
        this.longitud = longitud;
    }

    get latitud(){
        return this.latitud;
    }

    get longitud(){
        return this.longitud;
    }

    get paramsMapBox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': '5',
            'language':'es'
        };
    }

    // set paramsOpenWeather(latitud, longitud) {
    //     this.paramsOpenWeatherProperty = 
    // }

    get paramsOpenWeather( ){
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'es',
            'lat': this.latitud,
            'lon': this.longitud
        };
    }

    async city( place = ''){
        try {
            // request http to the api
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                timeout: 1000,
                params : this.paramsMapBox
              });
            const resp = await instance.get();
            
             // return all the places that it match wiht the search
            return resp.data.features.map( place => ({
                'id': place.id,
                'name': place.place_name,
                'lng': place.center[0],
                'lat': place.center[1]
            }))
        } catch (error) {
            return [];
        }
    }

    async weatherPlace( lat = 0, lng = 0 ){
        try {
        // Set the latitude and longitud
        this.latitud= lat;
        this.longitud = lng;
        // Create instance axios
        const instance = axios.create({
            baseURL: `https://api.openweathermap.org/data/2.5/weather`,
            timeout: 1000,
            params : this.paramsOpenWeather
          });
        // Send request to server
        const resp = await instance.get();
        // Handle the response
        const { temp, temp_max, temp_min } = resp.data.main;
        const { description } = resp.data.weather[0];
        // return the data necessary
        return {
            temp,
            temp_max,
            temp_min,
            description
        };
        } catch (error) {
            console.log(error);
        }
        
    }

}

module.exports = Search;