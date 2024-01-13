require('dotenv').config()

const { leerInput, inquirerMenu, pausa, listarLugares} = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

//console.log(process.env.MAPBOX_KEY)

const main = async() => {

    const busquedas = new Busquedas();
    let opt;
    
    do{
        opt = await inquirerMenu();

        switch(opt){
            case 1:
                //Mostrar mensaje
                const termino = await leerInput('Ciudad: ');
                
                //console.log(lugares);
                //Buscar los lugares
                const lugares = await busquedas.ciudad(termino);
               
                //Seleccionar el lugar
                const id = await listarLugares(lugares);
                const lugarSel = lugares.find( l => l.id === id)
                //console.log( lugarSel);


                //Clima
                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);
                //console.log(clima)

                //Mostrar resultados
                console.log('Informacion de la ciudad'.green)
                console.log('Ciudad: ',lugarSel.nombre.green )
                console.log('Lat: ', lugarSel.lat)
                console.log('Lng: ', lugarSel.lng)
                console.log('Temperatura: ', clima.temp )
                console.log('Minima: ', clima.min)
                console.log('Maxima: ', clima.max)
                console.log('Como esta el clima: ', clima.descripcion.green)

            break;
        }


        if(opt !== 0) await pausa();

    } while (opt!==0)

}

main()


////////////////////////////////////////
