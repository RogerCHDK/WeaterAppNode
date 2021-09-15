const axios = require('axios');
class Search{

    history = ['Mexico', 'Durango','Toluca']
    constructor(){
        // Read if exist some records in the database
    }

    get paramsMapBox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': '5',
            'language':'es'
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
            console.log(resp.data);
    
            // return all the places that it match wiht the search
            return [];
        } catch (error) {
            return [];
        }
    }

}

module.exports = Search;