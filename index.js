require('dotenv').config();
const { leerInput, inquirerMenu, pausa, listPlaces } = require("./helpers/inquirer");
const Search = require("./models/Search");

const main = async () => {
    let opcionMenu;
    const search = new Search();
    do {
        opcionMenu = await inquirerMenu();
        switch (opcionMenu) {
            case 1:
            //Show message to the user 
            const placeToSearch = await leerInput('Enter the name of the place to search:')
            
            // Search the differents places
            const places = await search.city(placeToSearch);
            // console.log(places);

            // Select the correct place
            const idPlaceSelect = await listPlaces(places);
            const placeSelect = places.find( place => place.id === idPlaceSelect);
            console.log(placeSelect);

            // Show the weater

            // Show general information about the place
            console.log('\n Information of the place \n'.green);
            console.log('City: ', placeSelect.name);
            console.log('Latitude: ', placeSelect.lat);
            console.log('Longitude: ', placeSelect.lng);
            console.log('Temperature: ',)
            console.log('Min: ',);
            console.log('Max: ',);
            break;
            case 2:
                console.log('opt 2');
            break;
            case 3:
                console.log('Adioss');
            break;
                    
            default:
            break;

        }    
        if(opcionMenu !== 3) await pausa();
    } while (opcionMenu !== 3);
    
}

main();