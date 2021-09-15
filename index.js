require('dotenv').config();
const { leerInput, inquirerMenu, pausa } = require("./helpers/inquirer");
const Search = require("./models/Search");

const main = async () => {
    let opcionMenu;
    const search = new Search();
    do {
        opcionMenu = await inquirerMenu();
        switch (opcionMenu) {
            case 1:
            //Show message to the user 
            const place = await leerInput('Enter the name of the place to search:')
            await search.city(place);
            // Search the differents places

            // Select the correct place

            // Show the weater

            // Show general information about the place
            console.log('\n Information of the place \n'.green);
            console.log('City: ', place);
            console.log('Latitude: ',);
            console.log('Longitude: ',);
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