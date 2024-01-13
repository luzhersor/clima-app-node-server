const axios = require('axios');

class Busquedas{

    historial = [''];

    constructor(){
        //Leer DB
    }

    get paramsMapbox(){
        return{
            'language':'es',
            'access_token': process.env.MAPBOX_KEY,
            'limit':5
        }
    }

    //Voy a tener que hacer una peticion asincrona
    async ciudad(lugar = ' '){

        try{
            //peticion http
            const instance = axios.create({
                baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox,
            })

            const resp = await instance.get();
            //console.log(resp.data.features)
            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],

            }));

            
        } catch(error) {
            return []
        }
        
    }

    get paramsOpenWeather(){
        return{
            'lang':'es',
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric'
        }
    }

    async climaLugar(lat, lon){

        try{

            //instace axios.create()
            const instance = axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/weather',
                params: {...this.paramsOpenWeather, lat, lon}
            })

            //resp.data
            const resp = await instance.get();
            const {weather, main} = resp.data
            //console.log(resp)

            return {
                descripcion: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }

        } catch (error){
            console.log(error)
        }
    }

}

module.exports = Busquedas;