const fs = require('fs');

const axios = require('axios');
class Search{

    history = [];
    latitud;
    longitud;
    pathDataBase = './db/database.json';

    constructor(){
        // Read if exist some records in the database
        this.readDataBase();
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

    get paramsOpenWeather( ){
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'es',
            'lat': this.latitud,
            'lon': this.longitud
        };
    }

    get historyUpper(){
        return this.history.map( place => place.toUpperCase());
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

    addHistory( place = '' ){
        // Validate if the place already exist in the history
        // my form
        // this.history.indexOf(place) !== -1 ?
        //                         this.history.splice( this.history.indexOf(place), 1 ) && this.history.unshift( place ):
        //                         this.history.unshift( place );
        if (this.history.includes( place.toLowerCase()) ) {
            return;
        }          
        this.history.unshift( place.toLowerCase() );
        this.saveDataBase();              
    }

    saveDataBase(){
        const payload = {
            'history': this.history
        };

        fs.writeFileSync( this.pathDataBase, JSON.stringify( payload ));
    }

    readDataBase(){
        if( !fs.existsSync(this.pathDataBase) ){
            return null;
        }
        
        const info = fs.readFileSync(this.pathDataBase, { encoding: 'utf-8' });
        const data = JSON.parse( info );
        console.log(data.history)
        if (data.history) {
            this.history = data.history;
        }
    }

}

module.exports = Search;