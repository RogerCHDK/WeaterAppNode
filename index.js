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
            const placeToSearch = await leerInput('Enter the name of the place to search:');
            // Search the differents places
            const places = await search.city(placeToSearch);
            // console.log(places);

            // Select the correct place
            const idPlaceSelect = await listPlaces(places);
            // if user select cancel (option 0) exit the case
            if (idPlaceSelect === 0) continue;
            // otherwise search the place in a list
            const placeSelect = places.find( place => place.id === idPlaceSelect);
            // Show the weater
            const weather = await search.weatherPlace(placeSelect.lat, placeSelect.lng);
            // Show general information about the place
            console.clear();
            console.log('\n Information of the place \n'.green);
            console.log('City: ', placeSelect.name);
            console.log('Latitude: ', placeSelect.lat);
            console.log('Longitude: ', placeSelect.lng);
            console.log('Temperature: ')
            console.log('Currently: ', weather.temp);
            console.log('Min: ',weather.temp_min);
            console.log('Max: ', weather.temp_max);
            console.log('Description: ', weather.description.green)
            break;
            case 2:
                console.log('opt 2');
            break;
            case 3:
                console.log('Good Bye');
            break;
                    
            default:
            break;
        }    
        if(opcionMenu !== 3) await pausa();
    } while (opcionMenu !== 3);
    
}

main();